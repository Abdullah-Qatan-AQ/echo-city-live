import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';

const serverPath=fileURLToPath(new URL('../server.mjs',import.meta.url));
async function freePort(){const probe=createServer();await new Promise((resolve,reject)=>probe.listen(0,'127.0.0.1',resolve).once('error',reject));const port=probe.address().port;await new Promise(resolve=>probe.close(resolve));return port;}
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function waitReady(child,url){const deadline=Date.now()+12000;while(Date.now()<deadline){if(child.exitCode!==null)throw new Error(`server exited with ${child.exitCode}`);try{const response=await fetch(`${url}/health`);if(response.ok)return;}catch{}await pause(100);}throw new Error('server did not become healthy');}
function launch(port,stateFile,allowReset=false){return spawn(process.execPath,[serverPath],{stdio:'ignore',env:{...process.env,PORT:String(port),ECHO_STATE_FILE:stateFile,ALLOW_PUBLIC_RESET:String(allowReset)}});}
async function stop(child,signal='SIGTERM'){if(child.exitCode!==null)return;const exited=once(child,'exit');child.kill(signal);await Promise.race([exited,pause(5000)]);if(child.exitCode===null)child.kill('SIGKILL');}

test('يحفظ الخادم حالة المدينة ويستعيدها بعد إعادة التشغيل',async()=>{
  const directory=await mkdtemp(join(tmpdir(),'echo-city-'));const stateFile=join(directory,'world.json');const port=await freePort();const url=`http://127.0.0.1:${port}`;let child;
  try{
    child=launch(port,stateFile,true);await waitReady(child,url);
    const resetResponse=await fetch(`${url}/api/reset`,{method:'POST'});assert.equal(resetResponse.status,200);const reset=await resetResponse.json();
    assert.equal(reset.tick,0);assert.match(reset.characters[0].name,/\p{Script=Arabic}/u);
    const protectedTick=await fetch(`${url}/api/tick`,{method:'POST'});assert.equal(protectedTick.status,405);
    await stop(child);child=null;
    child=launch(port,stateFile,true);await waitReady(child,url);
    const response=await fetch(`${url}/api/state`);assert.equal(response.status,200);const restored=await response.json();
    assert.equal(restored.lastReset,reset.lastReset);assert.equal(restored.tick,0);assert.equal(restored.characters.length,18);
    await stop(child);child=null;child=launch(port,stateFile);await waitReady(child,url);
    const defaultState=await(await fetch(`${url}/api/state`)).json();assert.equal(defaultState.capabilities.publicReset,false);
    const blocked=await fetch(`${url}/api/reset`,{method:'POST'});assert.equal(blocked.status,403);
  }finally{if(child)await stop(child);await rm(directory,{recursive:true,force:true});}
});
