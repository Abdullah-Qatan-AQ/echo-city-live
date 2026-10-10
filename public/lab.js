const trainingSet = [
  { input: [0.92, 0.15], label: 1, name: 'طاقة مرتفعة' },
  { input: [0.81, 0.24], label: 1, name: 'طاقة جيدة' },
  { input: [0.73, 0.31], label: 1, name: 'جاهز للعمل' },
  { input: [0.35, 0.42], label: 0, name: 'طاقة منخفضة' },
  { input: [0.22, 0.73], label: 0, name: 'توتر مرتفع' },
  { input: [0.46, 0.78], label: 0, name: 'يحتاج راحة' },
  { input: [0.61, 0.38], label: 1, name: 'متوازن' },
  { input: [0.39, 0.61], label: 0, name: 'متوتر' }
];
const clone = value => JSON.parse(JSON.stringify(value));
export function createLabState() {
  return { schemaVersion: 1, epoch: 0, weights: [0, 0], bias: 0, accuracy: 0, samplesSeen: 0, feedback: [], lastPrediction: null, updatedAt: new Date().toISOString() };
}
function predict(state, input) { return state.weights[0] * input[0] + state.weights[1] * input[1] + state.bias >= 0 ? 1 : 0; }
export function trainLab(state, epochs = 1) {
  const next = clone(state?.schemaVersion === 1 ? state : createLabState());
  const count = Math.max(1, Math.min(20, Number(epochs) || 1));
  for (let epoch = 0; epoch < count; epoch += 1) {
    for (const sample of trainingSet) {
      const prediction = predict(next, sample.input);
      const error = sample.label - prediction;
      next.weights[0] += error * sample.input[0];
      next.weights[1] += error * sample.input[1];
      next.bias += error;
      next.samplesSeen += 1;
    }
    next.epoch += 1;
  }
  const correct = trainingSet.filter(sample => predict(next, sample.input) === sample.label).length;
  next.accuracy = Math.round(correct / trainingSet.length * 100);
  next.lastPrediction = { name: trainingSet[next.epoch % trainingSet.length].name, value: predict(next, trainingSet[next.epoch % trainingSet.length].input) ? 'مستعد' : 'يحتاج دعمًا' };
  next.updatedAt = new Date().toISOString();
  return next;
}
export function addLabFeedback(state, feedback) {
  const next = clone(state?.schemaVersion === 1 ? state : createLabState());
  next.feedback = [...next.feedback, { id: `f-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, rating: feedback.rating === 'up' ? 'up' : 'down', note: String(feedback.note || '').slice(0, 300), citizen: String(feedback.citizen || 'مجهول').slice(0, 80), createdAt: new Date().toISOString() }].slice(-100);
  next.updatedAt = new Date().toISOString();
  return next;
}
export const getLabState = state => clone(state?.schemaVersion === 1 ? state : createLabState());
export { trainingSet };
