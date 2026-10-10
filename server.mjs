import http from 'node:http';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPublicState, resetWorld, restoreWorldSnapshot, tickWorld } from './simulation.js';

const root=resolve(fileURLToPath(new URL('.',import.meta.url)));
const publicRoot=join(root,'public');
const port=Number(process.env.PORT||3000);
const stateFile=resolve(process.env.ECHO_STATE_FILE||join(root,'data','world.json'));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
const inside=(base,candidate)=>candidate===base||candidate.startsWith(`${base}${sep}`);
let lastPersistedAt=0,persistError=null,persistQueue=Promise.resolve(),simulationTimer;
const sendJson=(res,code,body)=>{res.writeHead(code,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'});res.end(JSON.stringify(body));};

function persistWorld(){
  const snapshot=JSON.stringify(getPublicState());
  const operation=persistQueue.then(async()=>{
    await mkdir(dirname(stateFile),{recursive:true});
    const temporary=`${stateFile}.${process.pid}.tmp`;
    await writeFile(temporary,snapshot,{encoding:'utf8',mode:0o600});
    await rename(temporary,stateFile);
    lastPersistedAt=Date.now();persistError=null;
  });
  persistQueue=operation.catch(error=>{persistError=error;console.error('State persistence failed:',error);});
  return operation;
}
async function loadWorld(){
  try{
    const saved=JSON.parse(await readFile(stateFile,'utf8'));
    if(restoreWorldSnapshot(saved))console.log(`Restored city snapshot at tick ${saved.tick}`);
    else console.warn('Saved snapshot is incompatible; starting a new world.');
  }catch(error){if(error.code!=='ENOENT')console.error('Could not read city snapshot:',error);}
  await persistWorld();
}

const server=http.createServer(async(req,res)=>{
  try{
    const requestPath=decodeURIComponent((req.url||'/').split('?')[0]);
    if(req.method==='GET'&&requestPath==='/health'){
      const healthy=!persistError&&lastPersistedAt>0;
      sendJson(res,healthy?200:503,{ok:healthy,uptimeSeconds:Math.floor(process.uptime()),tick:getPublicState().tick,lastPersistedAt:lastPersistedAt?new Date(lastPersistedAt).toISOString():null,stateFile:persistError?'write-failed':'ready'});return;
    }
    if(req.method==='GET'&&requestPath==='/api/state'){sendJson(res,200,{...getPublicState(),capabilities:{publicReset:process.env.ALLOW_PUBLIC_RESET==='true'}});return;}
    if(req.method==='GET'&&requestPath==='/api/ai-status'){
      sendJson(res,200,{provider:'Transformers.js in the visitor browser',model:'onnx-community/Qwen2.5-0.5B-Instruct',license:'Apache-2.0 (base model; review ONNX repository terms)',secretRequired:false,sources:['https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct','https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct','https://huggingface.co/docs/transformers.js/en/index']});return;
    }
    if(requestPath==='/api/tick'){res.writeHead(405,{allow:'GET'});res.end('Simulation ticks are server-managed');return;}
    if(req.method==='POST'&&requestPath==='/api/reset'&&process.env.ALLOW_PUBLIC_RESET!=='true'){sendJson(res,403,{error:'reset_disabled'});return;}
    if(req.method==='POST'&&requestPath==='/api/reset'){
      const state=resetWorld();await persistWorld();sendJson(res,200,state);return;
    }
    const normalized=normalize(requestPath==='/'?'/index.html':requestPath);
    const relativePath=normalized.replace(/^[/\\]+/,'');
    const candidates=[resolve(publicRoot,relativePath),resolve(root,relativePath)];
    let filePath;
    for(const candidate of candidates){
      const base=candidate.startsWith(`${publicRoot}${sep}`)?publicRoot:root;
      if(!inside(base,candidate))continue;
      try{await readFile(candidate);filePath=candidate;break;}catch{/* try the next safe root */}
    }
    if(!filePath){res.writeHead(404,{'content-type':'text/plain; charset=utf-8'});res.end('Not found');return;}
    const body=await readFile(filePath);
    res.writeHead(200,{'content-type':types[extname(filePath)]||'application/octet-stream','cache-control':'no-cache'});res.end(body);
  }catch(error){console.error('Request failed:',error);if(!res.headersSent)res.writeHead(500,{'content-type':'text/plain; charset=utf-8'});res.end('Internal server error');}
});

async function start(){
  await loadWorld();
  server.listen(port,'0.0.0.0',()=>console.log(`صدى المدينة تعمل على المنفذ ${port}; الحالة محفوظة في ${stateFile}`));
  simulationTimer=setInterval(()=>{
    try{tickWorld();persistWorld().catch(()=>{});}catch(error){console.error('Simulation tick failed:',error);}
  },7000);
  simulationTimer.unref();
}
let closing=false;
async function shutdown(){
  if(closing)return;closing=true;
  if(simulationTimer)clearInterval(simulationTimer);
  server.close(async()=>{try{await persistWorld();process.exitCode=0;}catch{process.exitCode=1;}});
  setTimeout(()=>process.exit(1),15000).unref();
}
process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
start().catch(error=>{console.error('Startup failed:',error);process.exit(1);});
