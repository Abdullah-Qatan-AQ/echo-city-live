import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2';

const MODEL_ID = 'onnx-community/Qwen2.5-0.5B-Instruct';
env.allowLocalModels = false;
env.useBrowserCache = true;
let generatorPromise;

async function getGenerator(onProgress) {
  generatorPromise ||= pipeline('text-generation', MODEL_ID, {
    dtype: 'q4',
    progress_callback: onProgress,
  });
  return generatorPromise;
}

export async function askCitizen({ citizen, message, onProgress }) {
  const generator = await getGenerator(onProgress);
  const system = `You are ${citizen.name}, a fictional citizen in Echo City. Stay in character. Never claim to be a real human. Be natural and concise in 1-3 sentences. Public state: job=${citizen.job}; mood=${citizen.mood}; emotion=${citizen.emotion}; personality=${citizen.personality.join(', ')}; goals=${citizen.goals.join(' | ')}; belief=${citizen.beliefs[0]}; friend=${citizen.friend}; location=${citizen.location}.`;
  const result = await generator([
    { role: 'system', content: system },
    { role: 'user', content: message },
  ], { max_new_tokens: 120, temperature: 0.75, top_p: 0.9, do_sample: true });
  const generated = result?.[0]?.generated_text;
  const text = Array.isArray(generated) ? generated.at(-1)?.content : generated;
  if (!text) throw new Error('The browser model returned no text');
  return String(text).trim();
}

export const browserModel = MODEL_ID;
