import test from 'node:test';
import assert from 'node:assert/strict';
import {getPublicState,restoreWorldSnapshot,tickWorld} from '../simulation.js';

test('المدينة تبدأ بثمانية عشر ساكنًا وبيانات عربية',()=>{
  const state=getPublicState();
  assert.equal(state.characters.length,18);
  assert.match(state.characters[0].name,/\p{Script=Arabic}/u);
  assert.match(state.events[0].text,/\p{Script=Arabic}/u);
  assert.equal(state.schemaVersion,2);
});

test('الخادم يقدّم نبضة واحدة ويضيف حدثًا عربيًا',()=>{
  const before=getPublicState();
  const after=tickWorld();
  assert.equal(after.tick,before.tick+1);
  assert.equal(after.events.length,before.events.length+1);
  assert.match(after.events[0].text,/\p{Script=Arabic}/u);
  assert.ok(after.characters.some(person=>person.location));
});

test('لقطة الحالة الصالحة تستعاد وغير الصالحة تُرفض',()=>{
  const snapshot=getPublicState();
  const changed={...snapshot,tick:snapshot.tick+12};
  assert.equal(restoreWorldSnapshot(changed),true);
  assert.equal(getPublicState().tick,changed.tick);
  assert.equal(restoreWorldSnapshot({schemaVersion:99}),false);
  assert.equal(restoreWorldSnapshot(snapshot),true);
  assert.equal(getPublicState().tick,snapshot.tick);
});
