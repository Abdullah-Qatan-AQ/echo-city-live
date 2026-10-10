import { addLabFeedback, createLabState, getLabState, trainLab } from '../lab.js';
let state = createLabState();
export const readLab = () => getLabState(state);
export const trainSharedLab = epochs => { state = trainLab(state, epochs); return readLab(); };
export const feedbackSharedLab = input => { state = addLabFeedback(state, input); return readLab(); };
