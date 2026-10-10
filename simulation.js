const citizenSeeds = [
  ['آرين','عامل مقهى',82,'هادئ','متأمّل',['ودود','فضولي','يحمي سول'],['إبقاء المقهى مفتوحًا قبل الشروق','العثور على شخصٍ يفهم الصمت'],['تصير المدينة أحنّ حين يتقاسم الناس مائدة.'],'سول'],
  ['سورا','تاجرة في السوق',146,'متقلّبة','طموح',['طموحة','سريعة البديهة','وفية لنيا'],['فتح بسطةٍ ثانية في السوق','التخلّص من الدَّين'],['السعر العادل وعدٌ لا يُكسر.'],'نيا'],
  ['ڤيسبر','صانع في الورشة',238,'مركّز','فخور',['مبتكر','عنيد','يرعى باكس'],['صنع شيءٍ يعمّر طويلًا','نيل ختم نقابة الحرفيين'],['أغلب المشكلات آلاتٌ لم تكتمل بعد.'],'باكس'],
  ['جُون','موظفة بلدية',410,'مطمئن','ملاحظ',['صبورة','دقيقة','تحمي أورلا'],['وضع أول خطةٍ عادلة للضرائب','تسجيل صوت كل شخصٍ في المدينة'],['القواعد الجيدة تترك متّسعًا للناس.'],'أورلا'],
  ['كيتو','مندوب توصيل',67,'نشيط','متحمّس',['جريء','اجتماعي','معجب بيارا'],['تسليم كل الطرود قبل الغروب','اكتشاف كل دربٍ مختصر'],['تعرف المدينة من طريقة حملها للرسائل.'],'يارا'],
  ['مارِك','بستاني',93,'مرهق','لطيف',['طيّب','كتوم','يثق بآرين'],['زراعة سطح البيت','ادّخار ما يكفي لغرفةٍ دافئة'],['لا شيء ينمو تحت التهديد بالمواعيد.'],'آرين'],
  ['إليو','مساعد صحي',118,'قلق','مُراعٍ',['متعاطف','حذر','يقدّر جون'],['تأمين مستلزمات العيادة','تعليم سول الإسعافات الأولية'],['يخفي الناس وجعهم في أماكن عادية.'],'جُون'],
  ['نيا','تاجرة في السوق',204,'سعيدة','جريئة',['جذّابة','طموحة','وفية لسورا'],['الفوز بتصويت السوق','جعل السوق الليلي دائمًا'],['السوق الطيب ألف تحيةٍ صغيرة.'],'سورا'],
  ['أورلا','معلّمة',171,'فضولية','مُلهمة',['خيالية','صبورة','تحمي جون'],['فتح صفٍ مسائي مجاني','جمع حكايات كل حيّ'],['يبدأ المستقبل بسؤال.'],'جُون'],
  ['باكس','صانع في الورشة',56,'محبط','شجاع',['مجازف','مبتكر','يرعى ڤيسبر'],['إصلاح لافتة صالة الألعاب القديمة','سداد قرض الورشة'],['حين ينكسر شيءٌ فهو يطلب أن نفهمه.'],'ڤيسبر'],
  ['يارا','مندوبة توصيل',131,'مرحة','لعوب',['متفائلة','قلقة الحركة','معجبة بكيتو'],['رسم خريطةٍ ملوّنة للمدينة','حمل سرٍّ جميل إلى وجهته'],['هناك دائمًا طريقٌ آخر.'],'كيتو'],
  ['تافي','عامل مقهى',74,'جائع','حنون',['كريم','حالم','يثق بآرين'],['الادّخار لدراسة الطهي','صنع ألذّ خبزٍ بالحمضيات'],['الوجبة ذكرى يمكن أن نتقاسمها.'],'آرين'],
  ['ليكس','موظف بلدية',288,'مركّز','جاد',['تحليلي','طموح','لا يثق بديكس'],['مراجعة حسابات المدينة','العثور على التصريح المفقود'],['تتذكر الأرقام ما ينساه الناس.'],'ديكس'],
  ['رون','معلّم',102,'متململ','متفائل',['مثالي','ثرثار','يقدّر نيا'],['بدء نادٍ للنقاش','جعل المدرسة ملجأً ليليًا'],['يستحق كل قانون سؤالًا صادقًا.'],'نيا'],
  ['كالا','مساعدة صحية',61,'وحيدة','رقيقة',['مرهفة','شجاعة','تحمي مارِك'],['العثور على صديقٍ حقيقي','إبقاء أضواء العيادة مضاءة'],['الرعاية عملٌ حتى حين لا يصفق أحد.'],'مارِك'],
  ['ديكس','صانع في الورشة',319,'فخورة','متمرّدة',['تنافسية','عملية','تنافس ليكس'],['الفوز بعقد التصنيع','إثبات أن الورشة لا تحتاج موظفًا بلديًا'],['ينبغي للمدينة مكافأة من يبنيها.'],'ليكس'],
  ['إيماني','بستانية',89,'مطمئنة','متفائلة',['صبورة','تحب الجماعة','تثق بأورلا'],['تحويل الأرض الخالية إلى حديقة','تعليم الأطفال زراعة الطعام'],['أصغر حديقةٍ تصويتٌ أيضًا.'],'أورلا'],
  ['سول','مندوب توصيل',37,'قلق','كتوم',['ملاحظ','طيّب','يحمي آرين'],['العثور على غرفةٍ مستقرة','إعادة كل شيءٍ ضائع إلى صاحبه'],['تُبنى بعض الحيوات من أشياء صغيرة تعود.'],'آرين']
];

const jobs = {
  'عامل مقهى': { pay: 7, color: '#e77d58' }, 'تاجرة في السوق': { pay: 9, color: '#bd8d39' }, 'صانع في الورشة': { pay: 11, color: '#538d91' }, 'موظفة بلدية': { pay: 12, color: '#756690' }, 'موظف بلدية': { pay: 12, color: '#756690' }, 'مندوب توصيل': { pay: 8, color: '#cc6174' }, 'مندوبة توصيل': { pay: 8, color: '#cc6174' }, 'بستاني': { pay: 6, color: '#547a54' }, 'بستانية': { pay: 6, color: '#547a54' }, 'مساعد صحي': { pay: 10, color: '#458b83' }, 'مساعدة صحية': { pay: 10, color: '#458b83' }, 'معلّمة': { pay: 9, color: '#867257' }, 'معلّم': { pay: 9, color: '#867257' }
};

const mapSpots = [
  [12,18,'المقهى'],[34,18,'دار البلدية'],[67,18,'المصرف'],[83,18,'العيادة'],[13,50,'الحديقة'],[37,50,'الساحة'],[67,50,'السوق'],[84,50,'المدرسة'],[13,79,'المسرح'],[38,79,'الورشة'],[66,79,'المساكن'],[84,79,'المرفأ']
];
const relationSeeds = [
  ['آرين','سول',52,'صداقة مقرّبة','حماية'],['سورا','نيا',67,'صداقة مقرّبة','حلف'],['ڤيسبر','باكس',49,'صداقة','إرشاد'],['جُون','أورلا',58,'صداقة مقرّبة','رعاية'],['كيتو','يارا',42,'صداقة','إعجاب'],['ليكس','ديكس',-36,'خصومة','تنافس'],['مارِك','إيماني',35,'صداقة','ثقة'],['إليو','كالا',61,'صداقة مقرّبة','رعاية'],['رون','نيا',38,'صداقة','تقدير'],['تافي','آرين',46,'صداقة','ثقة'],['سول','كالا',28,'صداقة','تقدير'],['باكس','ديكس',-18,'ريبة','تنافس'],['كيتو','سورا',24,'ودّ','حلف'],['يارا','مارِك',19,'ودّ','ثقة']
];
const liveTemplates = [
  (c) => `${c.name} بدأ ورديته في ${c.job} وربح ${jobs[c.job]?.pay || 8} دولارات.`,
  (c) => `${c.name} توقّف ليفكّر: «${c.beliefs[0]}»`,
  (c) => `مرّ ${c.name} بـ${c.location} وكان مزاجه ${c.mood}.`,
  (c) => `أرسل ${c.name} رسالةً هادئة إلى ${c.friend}.`,
  (c) => `عثر ${c.name} على ${6 + Math.floor(Math.random()*18)} دولارًا قرب النافورة؛ وراح يفكّر ماذا يفعل.`,
  (c) => `فاتت ${c.name} ورديةٌ اليوم؛ طاقته توشك أن تنفد.`,
  (c) => `غيّر ${c.name} خطته لهذا اليوم: ${c.goals[0]}.`
];
let world;
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const clone = (value) => JSON.parse(JSON.stringify(value));

function createCitizen(seed, index) {
  const [name, job, money, mood, emotion, personality, goals, beliefs, friend] = seed;
  const spot = mapSpots[index % mapSpots.length];
  return { id:name, name, job, money, bank:index*13, mood, emotion, personality, goals, beliefs, friend, location:spot[2], x:spot[0]+(index%3)*2, y:spot[1]+(index%2)*2, needs:{hunger:58+index%24,energy:46+(index*7)%35,social:34+(index*5)%50,stress:16+(index*4)%42,health:82+index%16}, reputation:38+(index*9)%58, autonomy:'مستقل', mayor:index===3, memories:[`وصل إلى صدى المدينة في صباحها الأول.`,beliefs[0]], voiceStats:{spoken:0,listened:0} };
}
function resetWorld() {
  const characters = citizenSeeds.map(createCitizen);
  world = { schemaVersion:2, season:'البدايات الجديدة', tick:0, day:1, hour:7, minute:12, weather:'سماء صافية', connected:true, mindEnabled:true, characters, events:[], relationships:relationSeeds.map(([from,to,score,label,stance])=>({from,to,score,label,stance})), poll:{question:'ما الذي تحتاجه المدينة أولًا؟',options:[['حديقة عامة',42],['سوق ليلي',31],['عيادة مجانية',27]]}, daily:[['٠٧:١٢','تستيقظ المدينة على سماءٍ صافية.'],['٠٧:١٨','أضاء المقهى أول مصابيحه.'],['٠٧:٢٦','بدأ موسمٌ جديد مع ثمانية عشر من السكان.']], newspaper:{headline:'مدينةٌ تكتبها حكايات أهلها.',subhead:'الموسم الأول · اليوم الأول · صباحٌ أول'}, lastReset:new Date().toISOString() };
  addEvent('WORLD_RESET','تستيقظ صدى المدينة؛ ثمانية عشر شخصًا يبدؤون حكايةً جديدة.','WORLD','high');
  return getPublicState();
}
function addEvent(type,text,actor='WORLD',importance='normal') {
  world.events.unshift({id:`e-${world.tick}-${Date.now()}-${Math.random().toString(16).slice(2,7)}`,type,text,actor,day:world.day,time:`${String(world.hour).padStart(2,'0')}:${String(world.minute).padStart(2,'0')}`,importance});
  world.events=world.events.slice(0,120);
}
function tickWorld() {
  if(!world) resetWorld();
  world.minute+=5;
  if(world.minute>=60){world.minute=0;world.hour+=1;}
  if(world.hour>=24){world.hour=0;world.day+=1;}
  world.tick+=1;
  const c=pick(world.characters),spot=pick(mapSpots);
  c.location=spot[2];c.x=Math.max(5,Math.min(95,spot[0]+Math.floor(Math.random()*9)-4));c.y=Math.max(10,Math.min(88,spot[1]+Math.floor(Math.random()*7)-3));
  c.needs.energy=Math.max(4,c.needs.energy-1);c.needs.hunger=Math.min(100,c.needs.hunger+1);c.needs.social=Math.max(2,c.needs.social+(Math.random()>.55?2:-1));
  if(Math.random()>.58){c.money+=jobs[c.job]?.pay||0;c.voiceStats.spoken+=1;}
  addEvent('LIFE',pick(liveTemplates)(c),c.id,Math.random()>.84?'high':'normal');
  if(world.tick%12===0){world.daily.push([`${String(world.hour).padStart(2,'0')}:${String(world.minute).padStart(2,'0')}`,world.events[0].text]);world.daily=world.daily.slice(-48);}
  return getPublicState();
}
function getPublicState(){return clone(world);}
function restoreWorldSnapshot(snapshot){
  if(!snapshot||snapshot.schemaVersion!==2||!Array.isArray(snapshot.characters)||snapshot.characters.length!==citizenSeeds.length||!Array.isArray(snapshot.events)||!Array.isArray(snapshot.relationships)||!snapshot.poll||!Number.isFinite(snapshot.tick)||!Number.isFinite(snapshot.day)||!Number.isFinite(snapshot.hour)||!Number.isFinite(snapshot.minute))return false;
  world=clone(snapshot);return true;
}
function getCitizen(id){return world.characters.find(c=>c.id===id);}
resetWorld();
export {world,resetWorld,tickWorld,getPublicState,getCitizen,restoreWorldSnapshot,mapSpots};
