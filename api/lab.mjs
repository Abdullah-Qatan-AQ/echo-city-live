import { readLab } from './lab-state.mjs';
export default function handler(req,res){res.setHeader('Cache-Control','no-store');res.status(200).json({...readLab(),shared:true,persistence:'vercel-instance'});}
