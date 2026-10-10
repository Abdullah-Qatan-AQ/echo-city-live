const citizenSeeds = [
  ['ARIN','Cafe worker','$82','Mellow','thoughtful',['Soft-spoken','Curious','Protective of Sol'],['Keep the cafe open before sunrise','Find someone who understands the quiet'],['The city is kinder when people share a table.']],
  ['SORA','Market trader','$146','Restless','hopeful',['Ambitious','Quick-witted','Loyal to Nia'],['Open a second market stall','Never owe the bank again'],['A fair price is a promise.']],
  ['VESPER','Workshop maker','$238','Focused','proud',['Inventive','Stubborn','Watches over Pax'],['Build something that outlives me','Earn the workshop guild seal'],['Most problems are just unfinished machines.']],
  ['JUNE','Town clerk','$410','Calm','observant',['Patient','Precise','Protective of Orla'],['Make the first fair tax plan','Record every voice in the city'],['Rules should make room for people.']],
  ['KITO','Courier','$67','Bright','energetic',['Fearless','Social','Crush on Yara'],['Deliver every parcel before dusk','Learn every shortcut in Echo City'],['You can know a city by how it carries its letters.']],
  ['MAREK','Gardener','$93','Tired','gentle',['Kind-hearted','Private','Trusts Arin'],['Grow a roof garden','Save enough for a warm room'],['Nothing grows on a deadline.']],
  ['ELIO','Clinic aide','$118','Worried','caring',['Empathic','Anxious','Admires June'],['Keep the clinic stocked','Teach Sol first aid'],['People hide pain in very ordinary places.']],
  ['NIA','Market trader','$204','Happy','bold',['Charismatic','Ambitious','Loyal to Sora'],['Win the market vote','Make the night market permanent'],['A good market is a thousand small hellos.']],
  ['ORLA','Teacher','$171','Curious','inspired',['Imaginative','Patient','Protective of June'],['Open a free evening class','Collect stories from every block'],['The future starts as a question.']],
  ['PAX','Workshop maker','$56','Frustrated','brave',['Risk-taker','Inventive','Watches over Vesper'],['Repair the old arcade sign','Pay back the workshop loan'],['If it breaks, it is asking to be understood.']],
  ['YARA','Courier','$131','Mellow','playful',['Optimistic','Restless','Crush on Kito'],['Map the city in color','Carry one good secret'],['There is always another route.']],
  ['TAVI','Cafe worker','$74','Hungry','warm',['Generous','Dreamer','Trusts Arin'],['Save for culinary school','Make the best citrus bread'],['A meal is a memory you can pass around.']],
  ['LEX','Town clerk','$288','Focused','serious',['Analytical','Ambitious','Distrusts DEX'],['Audit the city accounts','Find the missing permit'],['Numbers remember what people forget.']],
  ['RUNE','Teacher','$102','Restless','hopeful',['Idealist','Talkative','Admires Nia'],['Start a debate club','Make the school a shelter at night'],['Every rule deserves one honest question.']],
  ['CALA','Clinic aide','$61','Lonely','tender',['Sensitive','Brave','Protective of Marek'],['Make one real friend','Keep the clinic lights on'],['Care is work, even when nobody claps.']],
  ['DEX','Workshop maker','$319','Proud','defiant',['Competitive','Resourceful','Rival of Lex'],['Win the maker contract','Prove the workshop needs no clerk'],['A city should reward the ones who build it.']],
  ['IMANI','Gardener','$89','Calm','hopeful',['Patient','Community-minded','Trusts Orla'],['Turn the empty lot green','Teach children to grow food'],['The smallest garden is still a vote.']],
  ['SOL','Courier','$37','Worried','quiet',['Observant','Kind-hearted','Protective of Arin'],['Find a stable room','Return every lost thing'],['Some lives are made of tiny returns.']]
];

const jobs = {
  'Cafe worker': { pay: 7, color: '#ffad63' }, 'Market trader': { pay: 9, color: '#f3de70' }, 'Workshop maker': { pay: 11, color: '#8bd3ff' }, 'Town clerk': { pay: 12, color: '#d59bff' }, 'Courier': { pay: 8, color: '#ff8bb4' }, 'Gardener': { pay: 6, color: '#8fe49a' }, 'Clinic aide': { pay: 10, color: '#a7f0df' }, 'Teacher': { pay: 9, color: '#c7b6ff' }
};
const mapSpots = [
  [12,18,'CAFE'],[34,18,'TOWN HALL'],[67,18,'BANK'],[83,18,'CLINIC'],[13,50,'GARDEN'],[37,50,'FOUNTAIN'],[67,50,'MARKET'],[84,50,'SCHOOL'],[13,79,'ARCADE'],[38,79,'WORKSHOP'],[66,79,'APARTMENTS'],[84,79,'DEPOT']
];
const relationSeeds = [['ARIN','SOL',52,'Close friend','PROTECT'],['SORA','NIA',67,'Close friend','ALLY'],['VESPER','PAX',49,'Friend','MENTOR'],['JUNE','ORLA',58,'Close friend','PROTECT'],['KITO','YARA',42,'Friend','CRUSH'],['LEX','DEX',-36,'Rival','RIVAL'],['MAREK','IMANI',35,'Friend','TRUST'],['ELIO','CALA',61,'Close friend','PROTECT'],['RUNE','NIA',38,'Friend','ADMIRE'],['TAVI','ARIN',46,'Friend','TRUST'],['SOL','CALA',28,'Friend','ADMIRE'],['PAX','DEX',-18,'Distrustful','RIVAL'],['KITO','SORA',24,'Friendly','ALLY'],['YARA','MAREK',19,'Friendly','TRUST']];
const liveTemplates = [
  (c) => `${c.name} clocked in as ${c.job.toLowerCase()} · earned $${jobs[c.job].pay}`,
  (c) => `${c.name} stopped to think about: “${c.beliefs[0]}”`,
  (c) => `${c.name} moved through ${c.location} · mood is ${c.mood.toLowerCase()}`,
  (c) => `${c.name} sent a quiet message to ${c.friend}`,
  (c) => `${c.name} found $${6 + Math.floor(Math.random()*18)} near the fountain · deciding what to do`,
  (c) => `${c.name} missed a shift · energy is running low`,
  (c) => `${c.name} changed their plan for today: ${c.goals[0].toLowerCase()}`
];
let world;

const pick = (list) => list[Math.floor(Math.random() * list.length)];
function createCitizen(seed, index) {
  const [name, job, money, mood, emotion, personality, goals, beliefs] = seed;
  const friend = personality.at(-1).replace(/^(Protective of |Loyal to |Trusts |Admires |Watches over |Crush on |Rival of |Distrusts |Protective of )/,'');
  return { id:name, name, job, money:Number(money.slice(1)), bank: index * 13, mood, emotion, personality, goals, beliefs, friend: friend || 'the city', location: mapSpots[index % mapSpots.length][2], x: mapSpots[index % mapSpots.length][0] + (index % 3) * 2, y: mapSpots[index % mapSpots.length][1] + (index % 2) * 2, needs:{hunger: 58 + index % 24, energy: 46 + (index*7)%35, social: 34 + (index*5)%50, stress: 16 + (index*4)%42, health: 82 + index%16}, reputation: 38 + (index*9)%58, autonomy:'Independent', mayor: index === 3, memories:[`Arrived in Echo City on the first morning.`, beliefs[0]], voiceStats:{spoken:0, listened:0} };
}
function resetWorld() {
  const characters = citizenSeeds.map(createCitizen);
  world = { season:'NEW BEGINNINGS', tick:0, day:1, hour:7, minute:12, weather:'CLEAR', connected:true, mindEnabled:true, characters, events:[], relationships:relationSeeds.map(([from,to,score,label,stance])=>({from,to,score,label,stance})), poll:{question:'What should Echo City build first?', options:[['Public garden',42],['Night market',31],['Free clinic wing',27]]}, daily:[['07:12','The city wakes under a clear sky.'],['07:18','The first cafe lights come on.'],['07:26','A new season begins with 18 citizens.']], newspaper:{headline:'A new city, written by its people.', subhead:'Season 01 · Day 01 · The first morning'}, lastReset:new Date().toISOString() };
  addEvent('WORLD_RESET','A new life begins: 18 citizens enter Echo City.','WORLD', 'high');
  return getPublicState();
}
function addEvent(type, text, actor='WORLD', importance='normal') {
  world.events.unshift({ id:`e-${Date.now()}-${Math.random().toString(16).slice(2)}`, type, text, actor, day:world.day, time:`${String(world.hour).padStart(2,'0')}:${String(world.minute).padStart(2,'0')}`, importance });
  world.events = world.events.slice(0, 45);
}
function tickWorld() {
  if (!world) resetWorld();
  world.minute += 5;
  if (world.minute >= 60) { world.minute = 0; world.hour += 1; }
  if (world.hour >= 24) { world.hour = 0; world.day += 1; }
  world.tick += 1;
  const c = pick(world.characters);
  const spot = pick(mapSpots);
  c.location = spot[2]; c.x = Math.max(5, Math.min(95, spot[0] + Math.floor(Math.random()*9)-4)); c.y = Math.max(10, Math.min(88, spot[1] + Math.floor(Math.random()*7)-3));
  c.needs.energy = Math.max(4, c.needs.energy - 1); c.needs.hunger = Math.min(100, c.needs.hunger + 1); c.needs.social = Math.max(2, c.needs.social + (Math.random() > .55 ? 2 : -1));
  if (Math.random() > .58) { c.money += jobs[c.job]?.pay || 0; c.voiceStats.spoken += 1; }
  addEvent('LIFE', pick(liveTemplates)(c), c.id, Math.random() > .84 ? 'high' : 'normal');
  return getPublicState();
}
function getPublicState() {
  return JSON.parse(JSON.stringify(world));
}
function getCitizen(id) { return world.characters.find(c => c.id === id); }
resetWorld();
export { world, resetWorld, tickWorld, getPublicState, getCitizen };
