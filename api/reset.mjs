export default function handler(req,res){res.status(403).json({error:'reset_disabled_on_serverless_deployment',message:'إعادة الضبط العام معطلة في نسخة Vercel.'});}
