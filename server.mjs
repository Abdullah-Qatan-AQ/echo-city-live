import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPublicState, resetWorld, tickWorld } from './simulation.js';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const publicRoot = join(root, 'public');
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };
const inside = (base, candidate) => candidate === base || candidate.startsWith(`${base}${sep}`);
const sendJson = (res, code, body) => { res.writeHead(code, { 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store' }); res.end(JSON.stringify(body)); };

const server = http.createServer(async (req, res) => {
  const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (req.method === 'GET' && requestPath === '/health') { res.writeHead(200, {'content-type':'text/plain'}); res.end('ok'); return; }
  if (req.method === 'GET' && requestPath === '/api/state') { sendJson(res, 200, getPublicState()); return; }
  if (req.method === 'GET' && requestPath === '/api/ai-status') { sendJson(res, 200, { provider:'Transformers.js in browser', model:'onnx-community/Qwen2.5-0.5B-Instruct', license:'Apache-2.0 (base model; review ONNX repository terms)', secretRequired:false, sources:['https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct','https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct','https://huggingface.co/docs/transformers.js/en/index'] }); return; }
  if (req.method === 'POST' && requestPath === '/api/tick') { res.writeHead(405, { allow: 'GET' }); res.end('Simulation ticks are server-managed'); return; }
  if (req.method === 'POST' && requestPath === '/api/reset') { sendJson(res, 200, resetWorld()); return; }

  const normalized = normalize(requestPath === '/' ? '/index.html' : requestPath);
  const relativePath = normalized.replace(/^[/\\]+/, '');
  const candidates = [resolve(publicRoot, relativePath), resolve(root, relativePath)];
  let filePath;
  for (const candidate of candidates) { const base = candidate.startsWith(`${publicRoot}${sep}`) ? publicRoot : root; if (!inside(base, candidate)) continue; try { await readFile(candidate); filePath = candidate; break; } catch { /* try next */ } }
  try { const body = await readFile(filePath || join(root, 'index.html')); res.writeHead(200, {'content-type':types[extname(filePath || 'index.html')] || 'application/octet-stream','cache-control':'no-cache'}); res.end(body); }
  catch { res.writeHead(404, {'content-type':'text/plain; charset=utf-8'}); res.end('Not found'); }
});
const simulationTimer = setInterval(() => tickWorld(), 7000);
simulationTimer.unref();
server.listen(port, '0.0.0.0', () => console.log(`Echo City simulation listening on ${port}`));
