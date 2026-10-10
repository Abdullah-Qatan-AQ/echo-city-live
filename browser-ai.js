import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2';

export const browserModel = 'onnx-community/Qwen2.5-0.5B-Instruct';
env.allowLocalModels = false;
env.useBrowserCache = true;
let generatorPromise;
async function getGenerator(onProgress) {
  generatorPromise ||= pipeline('text-generation', browserModel, { dtype:'q4', progress_callback:onProgress });
  return generatorPromise;
}
export async function askCitizen({citizen,message,onProgress}) {
  const generator = await getGenerator(onProgress);
  const system = `أنت شخصية خيالية اسمها ${citizen.name} تعيش في مدينة صدى المدينة. أجب بالعربية الفصحى البسيطة دائمًا، بجملة إلى ثلاث جمل قصيرة، وبصوت شخصيتك لا بصوت مساعد عام. لا تدّعِ أنك إنسان حقيقي. طباعك: ${citizen.personality.join('، ')}. عملك: ${citizen.job}. مزاجك: ${citizen.mood}. شعورك: ${citizen.emotion}. آمالك: ${citizen.goals.join('؛ ')}. ما تؤمن به: ${citizen.beliefs[0]}. صديقك: ${citizen.friend}. مكانك: ${citizen.location}.`;
  const result = await generator([{role:'system',content:system},{role:'user',content:message}], {max_new_tokens:120,temperature:.75,top_p:.9,do_sample:true});
  const generated=result?.[0]?.generated_text;
  const text=Array.isArray(generated)?generated.at(-1)?.content:generated;
  if(!text)throw new Error('لم يُرجع النموذج نصًا');
  return String(text).trim();
}
