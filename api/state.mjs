import { getPublicState, tickWorld } from '../simulation.js';
let lastTickAt=Date.now();
export default function handler(req,res){
  if(req.method!=='GET') return res.status(405).json({error:'method_not_allowed'});
  const now=Date.now();
  if(now-lastTickAt>=7000){ tickWorld(); lastTickAt=now; }
  res.setHeader('Cache-Control','no-store');
  res.status(200).json({...getPublicState(),capabilities:{publicReset:false},deployment:{mode:'vercel-serverless',sharedPersistence:false}});
}
