'use strict';
const TYPES = {
  se:{name:'소음인',caption:'차분하게, 나의 속도로',description:'전통적 설명에서는 신중하고 세심하게 살피는 경향으로 이야기합니다.'},
  sy:{name:'소양인',caption:'가볍게 시작하는 활력',description:'전통적 설명에서는 빠르게 움직이고 밖으로 관심을 넓히는 경향으로 이야기합니다.'},
  te:{name:'태음인',caption:'꾸준히 쌓아가는 안정감',description:'전통적 설명에서는 안정과 끈기를 중시하는 경향으로 이야기합니다.'},
  ty:{name:'태양인',caption:'내 기준으로 여는 새로운 길',description:'전통적 설명에서는 독립성과 주도성을 강조해 이야기합니다.'}
};
const QUESTION_TITLES = [
 '체격이 큰 편이고 살이 잘 찌나요?',
 '상체가 발달하고 하체는 상대적으로 약한가요?',
 '얼굴이 갸름하고 예민해 보인다는 말을 듣나요?',
 '체격이 작고 마른 편인가요?',
 '식욕이 왕성하고 소화가 잘 되나요?',
 '과식하면 속이 불편한가요?',
 '소화력이 약하고 찬 음식에도 속이 불편한가요?',
 '땀이 많고 더위를 잘 타나요?',
 '땀이 적고 추위를 잘 타나요?',
 '더위와 추위 모두에 민감한가요?',
 '느긋하고 끈기 있는 편인가요?',
 '활발하고 성격이 급한 편인가요?',
 '걱정이 많고 예민하며 감정을 속으로 삭이나요?',
 '잠이 많고 깊이 자는 편인가요?',
 '잠이 적어도 활동적인 편인가요?'
];
const PHOTO='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85';
const FOOD=[
 {name:'따뜻한 두부·채소 덮밥',ingredients:'밥, 두부, 당근, 애호박, 간장',allergens:['soy','wheat'],kind:'warm',desc:'밥에 익힌 채소와 두부를 곁들이고 간장은 소량 사용해요. 짠맛은 취향에 맞춰 줄여주세요.'},
 {name:'채소·병아리콩 한 그릇',ingredients:'병아리콩, 잎채소, 토마토, 오이, 올리브유',allergens:[],kind:'fresh',desc:'채소와 콩을 함께 담아 식감과 재료를 다양하게 즐겨요. 충분히 익힌 콩을 사용하세요.'},
 {name:'달걀·채소 볶음밥',ingredients:'밥, 달걀, 당근, 양파, 식물성 기름',allergens:['egg'],kind:'warm',desc:'밥과 채소에 달걀을 더한 간편한 한 끼예요. 달걀은 충분히 익히고 소금은 적게 넣어주세요.'},
 {name:'구운 닭고기와 채소 밥상',ingredients:'닭고기, 밥, 브로콜리, 당근, 소금',allergens:[],kind:'balanced',desc:'곡류·단백질·채소를 함께 준비해요. 닭고기는 속까지 충분히 익혀주세요.'},
 {name:'버섯·채소 밥상',ingredients:'밥, 버섯, 당근, 애호박, 식물성 기름',allergens:[],kind:'warm',desc:'다양한 채소를 익혀 밥과 함께 먹어요. 알레르기에 맞는 단백질 반찬을 별도로 곁들여주세요.'}
];
const NUTRIENT_NOTES = {
 protein:{name:'단백질',condition:'단백질 반찬을 자주 거른다면',text:'매 끼니에 콩·두부·달걀·생선·고기 등 먹을 수 있는 단백질 식품이 있는지 살펴보세요. 식사로 먼저 보완하고, 필요한 양은 나이·활동량·건강 상태에 맞춰 상담하세요.',source:'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',sourceName:'WHO · 균형 잡힌 식사'},
 dairy:{name:'칼슘',condition:'우유·유제품을 거의 먹지 않는다면',text:'유제품을 먹지 않아도 칼슘을 챙길 수 있어요. 칼슘 강화 식물성 음료나 칼슘염으로 만든 두부 등 대체 식품의 영양 표시를 확인하세요. 모든 식물성 음료나 두부에 같은 양이 들어 있는 것은 아니에요.',source:'https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/the-vegan-diet/',sourceName:'NHS · 칼슘의 식품 공급원'},
 plants:{name:'식이섬유',condition:'채소·과일·통곡물·콩을 적게 먹는다면',text:'채소와 과일, 통곡물, 콩류를 식사에 다양하게 더해보세요. 식이섬유를 식품으로 챙기는 방향을 우선 살펴보며, 반복되는 소화 불편이 있다면 식사 조절을 상담하세요.',source:'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',sourceName:'WHO · 식이섬유와 식품 다양성'},
 vegan:{name:'비타민 B12',condition:'동물성 식품을 먹지 않는 완전 채식이라면',text:'비타민 B12를 제공하는 강화 식품 등 확실한 공급원이 있는지 확인하세요. 강화 여부와 함량은 영양 표시에서 확인하고, 식사만으로 충분히 섭취하기 어렵다면 보충 방법을 전문가와 상담하세요.',source:'https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/the-vegan-diet/',sourceName:'NHS · 완전 채식의 영양소'}
};
function nutrientPanel(){
 const selected=state.preferences.nutrition||'unknown';
 const keys=NUTRIENT_NOTES[selected]?[selected]:Object.keys(NUTRIENT_NOTES);
 return `<section class="nutrient-section"><h2>식사에서 살펴볼 영양소</h2><p>체질이 아니라 실제 식사 습관을 기준으로 살펴보는 제안입니다. 영양소 결핍을 판정하거나 영양제 복용을 처방하는 결과는 아니에요.</p><div class="preference-controls">${preferenceControl('nutrition','최근 식사 습관',[['unknown','전체 항목 살펴보기'],['protein','단백질 반찬을 자주 거름'],['dairy','우유·유제품을 거의 먹지 않음'],['plants','채소·과일·통곡물·콩을 적게 먹음'],['vegan','동물성 식품을 먹지 않는 완전 채식']])}</div><div class="health-rows">${keys.map(key=>{const item=NUTRIENT_NOTES[key];return `<section><h3>${item.name}</h3><p class="small">${item.condition}</p><p>${item.text}</p><a class="element-source" href="${item.source}" target="_blank" rel="noopener">${item.sourceName}</a></section>`;}).join('')}</div><p class="notice">음식은 일반적인 예시입니다. 알레르기나 의료진이 정한 식이 제한에 맞는 재료만 선택하세요. 영양소 보충 여부·방법·양은 식사 섭취량, 건강 상태와 필요 시 검사 결과를 함께 확인해 결정하세요. 철분 등은 피로·추위 같은 증상만 보고 임의로 보충하지 마세요.</p></section>`;
}
const BODY_TRAITS = {
 se:[['체격','전통적으로 비교적 작고 아담한 체격으로 설명하지만, 키가 크거나 체격이 큰 경우도 있어요.'],['상하체 균형','가슴보다 골반·엉덩이 부위가 상대적으로 두드러지는 모습으로 설명해요.'],['얼굴 형태','연구에서 얼굴 폭이 좁고 갸름한 경향을 보고했어요.']],
 sy:[['체격','전통적으로 비교적 작은 체격으로 설명하며, 전체 크기보다 몸통의 비율을 함께 살펴요.'],['상하체 균형','가슴 부위가 상대적으로 두드러지고 골반·엉덩이 부위가 작은 모습으로 설명해요.'],['얼굴 형태','연구에서 이마가 상하로 넓거나 눈꼬리가 올라간 경향을 보고했어요.']],
 te:[['체격','전통적으로 비교적 크고 넉넉한 체격으로 설명해요. 비만 여부와 같은 뜻은 아니에요.'],['몸통 균형','허리·복부 부위가 상대적으로 두드러지는 모습으로 설명해요.'],['얼굴 형태','연구에서 얼굴 폭과 코 폭이 비교적 넓은 경향을 보고했어요.']],
 ty:[['체격','몸 전체의 크기보다 목덜미와 허리의 상대적인 비율을 중심으로 설명해요.'],['몸통 균형','목덜미가 상대적으로 두드러지고 허리 부위가 가는 모습으로 설명해요.'],['얼굴 형태','연구에서 이마가 넓고 머리·귀 부위가 두드러지는 특징을 보고했어요.']]
};
const FEATURE_DRAFT = {
 te:['체격이 크고 살이 잘 찜','하체가 튼튼함','식욕 왕성, 소화 잘 됨','땀이 많고 더위를 잘 탐','느긋하고 끈기 있음','잠이 많고 깊음'],
 sy:['상체 발달, 얼굴 갸름','소화는 잘 되지만 과식 시 불편','더위를 잘 타고 땀이 많음','활발하고 성격 급함','화를 바로 표출','잠이 적어도 활동적임'],
 se:['체격이 작고 마른 편','소화력이 약하고 찬 음식에 민감','추위를 잘 탐, 땀 적음','걱정 많고 예민함','화를 속으로 삭임','잠이 많고 피곤 잘 느낌'],
 ty:['상체 발달, 하체 약함','소화는 보통, 과식 시 불편','더위·추위 모두 예민','활동적이고 새로운 것 좋아함','성격 급하고 예민함','잠은 적지만 예민해 쉽게 피곤']
};
function featureDraftPanel(keys){return `<details class="feature-draft"><summary>체질별 특징 연결 · 제공한 비교 초안</summary><p>사용자가 제공한 정리입니다. 항목별 체질 연결은 전문가 검토가 필요하며, 아래 목록 전체가 연구로 확인된 특징이라는 뜻은 아닙니다. 설문 채점에는 사용하지 않습니다.</p>${keys.map(key=>`<section><h2>${TYPES[key].name}</h2><ul>${FEATURE_DRAFT[key].map(text=>`<li>${esc(text)}</li>`).join('')}</ul></section>`).join('')}<p>상체 발달·더위 민감·수면 등은 이 초안에서도 여러 체질에 겹칩니다. 한 가지 특징을 한 체질의 결정적 단서로 해석하지 마세요.</p></details>`;}
const SCORING_DRAFT = [
 {category:'체형·외모',rules:[['체격 크고 살 잘 찜',['te'],2],['상체 발달, 하체 약함',['ty'],2],['얼굴 갸름, 예민해 보임',['sy'],2],['체격 작고 마른 편',['se'],2]]},
 {category:'소화·식습관',rules:[['식욕 왕성, 소화 잘 됨',['te'],2],['과식 시 불편',['sy','ty'],1],['찬 음식에 민감, 소화 약함',['se'],2]]},
 {category:'땀·체온',rules:[['땀 많고 더위 잘 탐',['te','sy'],2],['땀 적고 추위 잘 탐',['se'],2],['더위·추위 모두 예민',['ty'],2]]},
 {category:'성격·기질',rules:[['느긋하고 끈기 있음',['te'],2],['활발하고 성격 급함',['sy','ty'],2],['걱정 많고 예민, 속으로 삭임',['se'],2]]},
 {category:'생활습관·컨디션',rules:[['잠 많고 깊음',['te','se'],2],['잠 적어도 활동적',['sy','ty'],2]]}
];
const QUESTIONS = SCORING_DRAFT.flatMap(group=>group.rules.map(([label,keys,points])=>({label,keys,points,category:group.category,choices:[['그렇다'],['아니다']]}))).map((q,i)=>({...q,title:QUESTION_TITLES[i]}));
function scoringDraftPanel(){return `<details class="feature-draft"><summary>참고 배점표 · 검토 전 초안</summary><p>사용자가 제안한 배점입니다. 검증된 체질 판정 기준은 아니며, 응답 경향을 보여주는 참고용 배점으로만 사용합니다. 여러 체질이 적힌 항목은 각 체질에 해당 점수를 더하는 방식으로 합산합니다.</p>${SCORING_DRAFT.map(group=>`<section><h2>${group.category}</h2><dl class="body-traits">${group.rules.map(([label,keys,points])=>`<div><dt>${esc(label)}</dt><dd>${keys.map(key=>TYPES[key].name+' +'+points+'점').join(' · ')}</dd></div>`).join('')}</dl></section>`).join('')}<p>15문항은 각 배점 조건을 그대로 질문합니다. 복합 조건은 모두 해당할 때만 ‘그렇다’를 선택하세요. ‘아니다’와 ‘모름’은 0점입니다. 원점수를 합산하며 유형별 분모로 나누지 않습니다. 최고점이 하나이고 두 영역 이상에서 단서가 있을 때만 경향을 표시합니다. 동점·단서 부족·서로 반대되는 답변은 판단을 유보합니다. 이 표시 기준은 앱의 자체 규칙이지 임상 기준이 아닙니다.</p></details>`;}
const ELEMENTS = [
  {key:'wood',name:'목',symbol:'木',nature:'나무',organs:'간·담낭',sense:'눈',tissue:'근육·힘줄',taste:'신맛',season:'봄',idea:'자라고 뻗어 나가는 성질을 나무에 비유해요.'},
  {key:'fire',name:'화',symbol:'火',nature:'불',organs:'심장·소장',sense:'혀',tissue:'혈맥',taste:'쓴맛',season:'여름',idea:'따뜻함과 활발한 움직임을 불에 비유해요.'},
  {key:'earth',name:'토',symbol:'土',nature:'흙',organs:'비장·위장',sense:'입',tissue:'살·근육',taste:'단맛',season:'늦여름·환절기',idea:'받아들이고 길러내는 성질을 흙에 비유해요.'},
  {key:'metal',name:'금',symbol:'金',nature:'금속',organs:'폐·대장',sense:'코',tissue:'피부',taste:'매운맛',season:'가을',idea:'거두고 정돈하는 성질을 금속에 비유해요.'},
  {key:'water',name:'수',symbol:'水',nature:'물',organs:'신장·방광',sense:'귀',tissue:'뼈',taste:'짠맛',season:'겨울',idea:'저장하고 가라앉는 성질을 물에 비유해요.'}
];
const state={view:'quiz',index:0,answers:Array(QUESTIONS.length).fill(null),tab:'body',detailKey:null,detailFrom:'result',element:'wood',preferences:{food:'any',move:'unknown',sleep:'unknown',priority:'unknown',nutrition:'unknown'},allergies:new Set()};
const app=document.getElementById('app');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function photo(){return '<img class="photo" src="nourish.png" alt="채소와 콩, 곡류를 함께 담은 균형 잡힌 식사 예시"><div class="photo-credit">식사 이미지 · AI 생성 예시</div>';}
function render(){cancelAdvance();document.body.classList.toggle('quiz-mode',state.view==='quiz');document.body.classList.toggle('result-mode',state.view==='result');document.body.classList.toggle('detail-mode',state.view==='detail');document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active',b.dataset.view===(state.view==='guide'||(state.view==='detail'&&state.detailFrom==='guide')?'guide':'quiz')));if(state.view==='quiz')renderQuiz();else if(state.view==='result')renderResult();else if(state.view==='detail')renderDetail();else renderGuide();}
let advanceTimer=null;
let advancing=false;
function cancelAdvance(){clearTimeout(advanceTimer);advanceTimer=null;advancing=false;}
function renderQuiz(){
 const total=QUESTIONS.length;
 const q=QUESTIONS[state.index];
 document.body.classList.add('quiz-mode');
 app.innerHTML=`<div class="quiz-stage"><section class="simple-quiz"><div class="simple-intro"><p>평소 몸의 반응과 성향을 떠올려 보세요.</p><p>몇 가지 질문으로 체질의 경향을 살펴봅니다.</p><div class="quiz-meta"><span>사상체질 자가 탐색</span><span>${total}문항 · 약 2분</span></div></div><div class="quiz-top"><span>QUESTION ${String(state.index+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}</span><button class="previous-link" id="prev" ${state.index===0?'disabled':''}>이전 질문</button></div><div class="progress" role="progressbar" aria-label="현재 질문" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${state.index+1}"><div class="progress-fill" style="width:${(state.index+1)/total*100}%"></div></div><p class="question-category">${q.category}</p><h1 class="question-title" tabindex="-1">${q.title}</h1><div class="binary-options" role="group" aria-label="${q.title}">${q.choices.map(([label],value)=>`<button class="binary-option ${state.answers[state.index]===value?'selected':''}" data-answer="${value}" aria-pressed="${state.answers[state.index]===value}">${label}</button>`).join('')}</div><button class="skip-answer" data-answer="2">해당 없음 / 잘 모르겠어요</button><p class="quiz-disclaimer">이 결과는 참고용이며 의학적 진단이 아닙니다.<br>몸의 반응과 성격에는 개인차가 있어요. 증상만으로 체질을 확정할 수 없습니다.</p></section><aside class="quiz-companion" aria-label="체질 탐색 영역"><figure class="companion-image"><img src="nourish.png" width="1024" height="1024" alt="채소와 콩, 곡류로 구성한 식사 예시"><figcaption>균형 잡힌 식사 · AI 생성 이미지</figcaption></figure><p class="companion-title">나를 돌보는 작은 균형</p><ol class="companion-domains">${SCORING_DRAFT.map((group,i)=>`<li class="${group.category===q.category?'current':''}" ${group.category===q.category?'aria-current="step"':''}><span>${String(i+1).padStart(2,'0')}</span>${group.category}</li>`).join('')}</ol></aside></div>`;
 app.querySelectorAll('[data-answer]').forEach(button=>button.onclick=()=>{
  if(advancing)return;
  advancing=true;
  state.answers[state.index]=Number(button.dataset.answer);
  app.querySelectorAll('[data-answer]').forEach(item=>{const selected=item===button;item.classList.toggle('selected',selected);item.setAttribute('aria-pressed',selected);item.disabled=true;});
  advanceTimer=setTimeout(()=>{
   advanceTimer=null;advancing=false;
   if(state.index<total-1){state.index++;renderQuiz();focusQuestion();}
   else{state.view='result';state.tab='body';render();window.scrollTo({top:0,behavior:'auto'});app.querySelector('h1').focus({preventScroll:true});}
  },180);
 });
 app.querySelector('#prev').onclick=()=>{cancelAdvance();if(state.index>0){state.index--;renderQuiz();focusQuestion();}};
}
function focusQuestion(){app.querySelector('.question-title').focus({preventScroll:true});}
function calculate(answers){
 // Scores describe matches to the proposed rules, not clinical likelihood.
 const scores={se:0,sy:0,te:0,ty:0};
 const categories=Object.fromEntries(Object.keys(TYPES).map(key=>[key,new Set()]));
 QUESTIONS.forEach((q,i)=>{if(answers[i]===0)for(const key of q.keys){scores[key]+=q.points;categories[key].add(q.category);}});
 const answered=QUESTIONS.filter((q,i)=>answers[i]===0||answers[i]===1).length;
 const unknown=QUESTIONS.filter((q,i)=>answers[i]===2).length;
 const ranked=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
 const top=ranked[0][1];
 const leaders=ranked.filter(([,score])=>score===top).map(([key])=>key);
 const conflict=[[0,3],[7,8],[13,14]].some(pair=>pair.every(i=>answers[i]===0));
 const clear=!conflict&&top>0&&leaders.length===1&&categories[leaders[0]].size>=2;
 return {scores,answered,unknown,total:QUESTIONS.length,leaders,conflict,clear,key:clear?leaders[0]:null};
}
function preference(i){return state.preferences[({2:'food',9:'move',10:'sleep',11:'priority'})[i]]||'unknown';}
function sleepResponseNote(){return state.answers[13]===0?'<p class="drink-note">잠이 많고 깊게 잔다고 답했어요. 수면 시간과 낮 동안의 컨디션을 함께 살펴보세요.</p>':state.answers[14]===0?'<p class="drink-note">잠이 적어도 활동적이라고 답했어요. 피곤하지 않다고 해서 필요한 잠까지 적다는 뜻은 아니에요.</p>':'';}
function mealResponseNote(){return state.answers[5]===0?'<p class="drink-note">과식하면 속이 불편하다고 답했어요. 언제 어떤 음식을 먹었는지와 불편함을 함께 살펴보세요. 붓기나 불편함이 반복되면 의료진에게 확인하세요.</p>':'';}
function preferenceControl(key,label,options){return `<label class="preference-field"><span>${label}</span><select data-preference="${key}">${options.map(([value,text])=>`<option value="${value}" ${state.preferences[key]===value?'selected':''}>${text}</option>`).join('')}</select></label>`;}

function restartQuiz(){cancelAdvance();state.answers.fill(null);state.index=0;state.view='quiz';state.tab='body';state.detailKey=null;state.element='wood';state.preferences={food:'any',move:'unknown',sleep:'unknown',priority:'unknown',nutrition:'unknown'};state.allergies.clear();render();window.scrollTo({top:0,behavior:'auto'});}
function openDetail(key,from='result'){state.detailKey=key;state.detailFrom=from;state.view='detail';state.tab='body';render();window.scrollTo({top:0,behavior:'auto'});app.querySelector('h1').focus({preventScroll:true});}
function renderResult(){
 const result=calculate(state.answers);
 const type=result.key?TYPES[result.key]:null;
 const title=result.clear?type.name+' 경향이 있습니다.':result.conflict?'서로 다른 답변이 함께 있어요.':result.scores[result.leaders[0]]===0?'아직 뚜렷한 경향이 없어요.':'여러 체질의 특징을 함께 살펴봐요.';
 const description=result.clear?'제안한 배점표에서 '+type.name+'에 연결된 답변의 합산 점수가 가장 높았어요. 검증된 임상 판정이 아닌, 이 배점표 기준의 참고용 응답 경향입니다.':result.conflict?'서로 반대되는 조건에 모두 그렇다고 답한 항목이 있어 한 체질을 표시하지 않았어요. 내 답변을 확인해주세요.':'최고점이 같거나, 한 영역에서만 단서가 있어 한 체질을 표시하지 않았어요. 이 배점표는 검증된 체질 판정 기준이 아닙니다.';
 app.innerHTML=`<section class="result-sheet"><p class="result-kicker">온유 체질 노트 · 참고용 응답 경향</p><h1 tabindex="-1">${title}</h1><p class="result-description">${description}</p><div class="result-scoreline" aria-label="제안 배점표의 합산 점수">${Object.entries(TYPES).map(([key,item])=>`<span data-score-type="${key}">${item.name} <strong>${result.scores[key]}점</strong></span>`).join('')}</div><p class="result-score-note">사용자가 제안한 배점표의 원점수입니다. 확률이나 진단 정확도가 아니며, 의료진의 판단을 대체하지 않습니다.</p><button class="result-cta" id="detail-open">${result.clear?type.name+' 알아보기':'네 가지 체질 비교하기'}</button><div class="result-actions"><button id="review-answers">내 답변 확인</button><button id="share-result">답변 공유</button><button id="retry">다시 해보기</button></div><p class="share-status" role="status" aria-live="polite"></p><p class="result-disclaimer">이 설문은 의학적 진단이 아닙니다.<br>체질 판단은 의료진의 상담을 통해 확인하세요.</p></section>`;
 app.querySelector('#detail-open').onclick=()=>openDetail(result.key);
 app.querySelector('#review-answers').onclick=()=>{state.detailKey=null;state.detailFrom='result';state.view='detail';state.tab='reason';render();window.scrollTo({top:0,behavior:'auto'});app.querySelector('h2').focus({preventScroll:true});};
 app.querySelector('#retry').onclick=restartQuiz;
 app.querySelector('#share-result').onclick=async()=>{
  const text='온유 · '+title+'\n제안 배점표에 따른 참고용 응답 경향이며 의학적 진단이 아닙니다.\n'+QUESTIONS.map((q,i)=>`${i+1}. ${q.title}\n${q.choices[state.answers[i]]?.[0]||'해당 없음 / 잘 모르겠어요'}`).join('\n')+'\n이 설문은 체질 판정이나 의학적 진단이 아닙니다.';
  const status=app.querySelector('.share-status');
  try{
   if(navigator.share){await navigator.share({title:'온유 체질 노트',text});status.textContent='결과를 공유했어요.';}
   else{try{await navigator.clipboard.writeText(text);}catch{const field=document.createElement('textarea');field.value=text;field.style.position='fixed';field.style.opacity='0';document.body.append(field);field.select();const copied=document.execCommand('copy');field.remove();if(!copied)throw Error('copy failed');}status.textContent='결과를 복사했어요.';}
  }catch(error){if(error.name!=='AbortError')status.textContent='공유할 수 없어요. 다시 시도해주세요.';}
 };
}
function renderDetail(){
 const type=state.detailKey?TYPES[state.detailKey]:null;
 app.innerHTML=`<div class="detail-heading"><button id="detail-back" class="previous-link">${state.detailFrom==='guide'?'체질 사전':'결과로 돌아가기'}</button><button id="retry" class="previous-link">다시 해보기</button></div><div class="type-switch" role="group" aria-label="살펴볼 체질">${Object.entries(TYPES).map(([key,item])=>`<button data-detail-type="${key}" aria-pressed="${state.detailKey===key}" class="${state.detailKey===key?'selected':''}">${item.name}</button>`).join('')}</div><div class="tabs detail-tabs" role="tablist" aria-label="체질과 생활 제안">${[['body','몸의 특징'],['health','영양과 생활'],['food','음식 제안'],['life','생활 루틴'],['elements','음양오행'],['reason','내 답변']].filter(([key])=>key!=='reason'||state.detailFrom==='result').map(([key,label])=>`<button class="tab ${state.tab===key?'active':''}" role="tab" id="tab-${key}" aria-selected="${state.tab===key}" aria-controls="panel" tabindex="${state.tab===key?0:-1}" data-tab="${key}">${label}</button>`).join('')}</div><section id="panel" role="tabpanel" aria-labelledby="tab-${state.tab}" class="detail-panel">${state.tab==='body'?bodyPanel():state.tab==='health'?healthPanel():state.tab==='food'?foodPanel():state.tab==='life'?lifePanel():state.tab==='elements'?elementsPanel():reasonPanel()}</section>`;
 app.querySelector('#detail-back').onclick=()=>{state.view=state.detailFrom==='guide'?'guide':'result';render();window.scrollTo({top:0,behavior:'auto'});};
 app.querySelectorAll('[data-detail-type]').forEach(button=>button.onclick=()=>{state.detailKey=button.dataset.detailType;renderDetail();app.querySelector(`[data-detail-type="${state.detailKey}"]`).focus({preventScroll:true});});
 bindElements();
 app.querySelector('#retry').onclick=restartQuiz;
 const tabs=Array.from(app.querySelectorAll('[data-tab]'));tabs.forEach((b,i)=>{b.onclick=()=>{state.tab=b.dataset.tab;renderDetail();app.querySelector(`[data-tab="${state.tab}"]`).focus({preventScroll:true});};b.onkeydown=e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();tabs[n].click();};});
 app.querySelectorAll('[data-allergy]').forEach(input=>input.onchange=()=>{const key=input.dataset.allergy;input.checked?state.allergies.add(key):state.allergies.delete(key);const pos=window.scrollY;renderDetail();app.querySelector(`[data-allergy="${key}"]`).focus({preventScroll:true});window.scrollTo(0,pos);});
 app.querySelectorAll('[data-preference]').forEach(input=>input.onchange=()=>{state.preferences[input.dataset.preference]=input.value;const scroll=window.scrollY;renderDetail();app.querySelector(`[data-preference="${input.dataset.preference}"]`).focus({preventScroll:true});window.scrollTo(0,scroll);});
}
function foodPanel(){const pref=preference(2);const labels={warm:'따뜻하고 익힌 식사를 선택한 취향을 반영했어요.',fresh:'신선하고 가벼운 식사를 선택한 취향을 반영했어요.',balanced:'든든하고 다양한 식사를 선택한 취향을 반영했어요.',any:'다양한 재료로 구성한 식사 예시예요.',unknown:'식사 선호 선택이 없어 다양한 식사 예시를 준비했어요.'};const list=FOOD.filter(f=>!f.allergens.some(a=>state.allergies.has(a))).sort((a,b)=>Number(b.kind===pref)-Number(a.kind===pref)).slice(0,3);return `<div class="section-head"><div><h2>내 취향에 맞는 한 끼</h2><p>${labels[pref]}</p></div></div><div class="preference-controls">${preferenceControl('food','편안한 식사',[['any','상관없어요'],['warm','따뜻하고 익힌 음식'],['fresh','신선하고 가벼운 음식'],['balanced','든든한 밥과 반찬']])}</div><fieldset class="allergies"><legend>피해야 하는 알레르기 재료</legend>${[['soy','대두'],['wheat','밀'],['egg','달걀'],['milk','우유'],['nuts','견과류'],['seafood','생선·갑각류']].map(([key,label])=>`<label><input type="checkbox" data-allergy="${key}" ${state.allergies.has(key)?'checked':''}>${label}</label>`).join('')}</fieldset><div class="food-layout"><div class="food-photo">${photo()}<p class="small">사진은 균형 잡힌 식사의 예시입니다.</p></div><div class="food-list">${list.map((f,i)=>`<article class="food-item"><span class="food-number">0${i+1}</span><div><h3>${f.name}</h3><p>${f.desc}</p><div class="ingredient">예시 재료 · ${f.ingredients}</div></div></article>`).join('')}</div></div>${mealResponseNote()}<div class="notice">체질별 치료 식단이 아닌, 취향에 맞춘 식사 예시예요. 선택한 재료가 포함된 예시는 제외하지만, 소스·가공식품·조리 과정의 알레르기와 교차접촉까지 확인할 수는 없어요. 실제 재료 표시를 확인하세요.</div>`;}
function lifePanel(){const move=preference(9),sleep=preference(10),priority=preference(11);const movement=move==='regular'?['익숙한 움직임을 꾸준히','이미 하고 있는 운동을 무리 없는 강도로 이어가고, 몸이 불편한 날은 쉬어주세요.']:move==='sedentary'?['앉아 있는 사이, 잠깐 일어나요','오래 앉아 있었다면 자리에서 일어나 잠깐 걷거나 편안하게 몸을 풀어보세요.']:['편안한 산책을 더해요','가능한 시간에 가벼운 산책을 해보세요. 거리나 속도는 지금의 몸 상태에 맞춰주세요.'];const night=sleep==='screen'?['휴대폰을 내려놓는 시간','잠들기 전 화면을 내려놓고 조용한 활동으로 하루를 마무리해보세요.']:sleep==='steady'?['편안한 수면 리듬 유지하기','지금의 일정한 취침 리듬을 이어가고, 충분히 쉴 수 있는 시간을 확보해보세요.']:['일정한 기상 시간부터','지킬 수 있는 기상 시간을 정하고, 잠들기 전 편안한 준비 시간을 마련해보세요.'];return `<div class="section-head"><div><h2>하루에 더하는 작은 루틴</h2><p>선택한 움직임과 수면 습관을 반영해요. 몸이 편안한 범위에서 조절해주세요.</p></div></div><div class="preference-controls">${preferenceControl('move','평소 움직임',[['unknown','선택해주세요'],['sedentary','앉아 있는 시간이 많아요'],['light','가끔 가볍게 움직여요'],['regular','꾸준히 운동해요']])}${preferenceControl('sleep','수면 습관',[['unknown','선택해주세요'],['steady','취침 시간이 일정해요'],['irregular','매일 시간이 달라요'],['late','늦게 자는 날이 많아요'],['screen','자기 전 휴대폰을 오래 봐요']])}${preferenceControl('priority','챙기고 싶은 것',[['unknown','선택해주세요'],['meals','규칙적인 식사'],['move','더 많이 움직이기'],['rest','마음의 여유'],['sleep','잠과 휴식']])}</div><div class="routine"><article class="routine-item"><span>아침 · 식사</span><h3>규칙적인 한 끼</h3><p>생활 일정에 맞는 식사 시간을 정하고, 곡류·단백질·채소를 다양하게 챙겨보세요.</p></article><article class="routine-item"><span>낮 · 움직임</span><h3>${movement[0]}</h3><p>${movement[1]}</p></article><article class="routine-item"><span>저녁 · 휴식</span><h3>${night[0]}</h3><p>${night[1]}</p></article></div>${sleepResponseNote()}<div class="notice">오늘의 우선순위 · ${{meals:'식사 시간을 하나 정해두기',move:'짧게라도 몸을 움직일 시간 마련하기',rest:'하던 일을 멈추고 조용히 쉬는 시간 마련하기',sleep:'잠들기 전 편안한 준비 시간 마련하기',unknown:'지금 가장 필요한 루틴 하나 고르기'}[priority]}</div>`;}
function reasonPanel(){return `<h2 tabindex="-1">내가 선택한 답변</h2><p>평소 몸의 반응과 성향을 기록한 내용입니다. ‘그렇다’에만 제안 배점표를 적용했어요. 점수는 임상적으로 검증되지 않았습니다.</p><ul class="reasons">${QUESTIONS.map((q,i)=>{const choice=q.choices[state.answers[i]];return `<li><strong>${i+1}. ${q.title}</strong>${choice?choice[0]:'해당 없음 / 잘 모르겠어요'}<span class="small"> · ${state.answers[i]===0?q.keys.map(key=>TYPES[key].name+' +'+q.points+'점').join(' · '):'점수 미반영'}</span></li>`;}).join('')}</ul>`;}
function renderGuide(){app.innerHTML=`<div class="intro"><div class="eyebrow">사상체질과 음양오행</div><h1>나에게 가까운 몸의 특징</h1><p>각 체질의 특징과 일상 제안을 살펴보세요.</p></div><div class="type-directory">${Object.entries(TYPES).map(([key,type],index)=>`<button class="directory-row" data-open-type="${key}"><span class="directory-number">${String(index+1).padStart(2,'0')}</span><span><strong>${type.name}</strong><small>${type.caption}</small></span><span class="directory-action">알아보기</span></button>`).join('')}</div><p class="body-caveat">신체 특징에는 개인차가 있어요. 외형만으로 체질이나 장기 건강을 판단할 수는 없어요.</p>${bodySources()}<section class="guide-elements">${elementsPanel()}</section>`;bindElements();app.querySelectorAll('[data-open-type]').forEach(button=>button.onclick=()=>openDetail(button.dataset.openType,'guide'));}
function bodyTraits(key,compact=false){return `<dl class="body-traits ${compact?'compact':''}">${BODY_TRAITS[key].map(([label,text])=>`<div><dt>${label}</dt><dd>${text}</dd></div>`).join('')}</dl>`;}
function bodySources(){return '<div class="body-sources"><span>참고 자료</span><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4247217/" target="_blank" rel="noopener">사상체질의 체형 특성 연구</a><a href="https://kiom.re.kr/board.es?act=view&bid=0018&list_no=3429&mid=a10502010000" target="_blank" rel="noopener">한국한의학연구원 · 체질별 얼굴 연구</a></div>';}
function bodyPanel(){
 const selected=state.detailKey;
 const keys=selected?[selected]:Object.keys(TYPES);
 return `<p class="detail-eyebrow">특징</p><h1 class="detail-title" tabindex="-1">${selected?TYPES[selected].name+'의 몸을 살펴봐요':'네 가지 체질의 몸을 비교해요'}</h1><p class="detail-lead">전통적 설명과 연구에서 보고한 경향입니다. 실제 모습은 사람마다 다를 수 있어요.</p>${keys.map(key=>`<section class="body-numbered">${selected?'':`<h2>${TYPES[key].name}</h2>`}<ol class="feature-list">${BODY_TRAITS[key].map(([label,text])=>`<li><span class="feature-label">${label}</span><p>${text}</p></li>`).join('')}<li><span class="feature-label">기질과 성향</span><p>${TYPES[key].description}</p></li></ol></section>`).join('')}<p class="body-caveat">이 설문은 몸의 반응·성격·체격을 스스로 답하는 참고용 설문이에요. 실제 몸을 측정하거나, 건강 상태·장기의 강약을 판단하지 않습니다.</p>${bodySources()}${featureDraftPanel(keys)}${scoringDraftPanel()}`;
}
function healthPanel(){return `<p class="detail-eyebrow">영양과 생활</p><h1 class="detail-title" tabindex="-1">내 식사와 몸의 반응을 살펴봐요</h1><p class="detail-lead">체질별로 부족한 영양소를 단정하지 않고, 실제 식사 습관과 현재 건강 상태를 함께 살펴봐요.</p><div class="health-rows"><section><h2>영양 상담이 필요할 때</h2><p>평소 식사 내용과 현재 증상, 복용 중인 약·영양제, 알레르기, 기존 질환을 영양사나 의료진에게 알려주세요. 식사에서 부족할 수 있는 영양소와 보완 방법을 함께 확인하고, 보충이 필요한 경우에는 개인 상태에 맞게 결정하세요.</p></section></div>${nutrientPanel()}<div class="health-rows"><section><h2>식후 더부룩함과 소화 불편</h2><p>언제 불편한지, 식사와 어떤 관련이 있는지 살펴보세요. 소화 불편이 반복되거나 심하면 의료진에게 상담하세요.</p></section><section><h2>손발의 차가움</h2><p>추운 날에는 손발을 따뜻하게 보호해주세요. 통증이나 피부색 변화가 있거나 증상이 심해지면 진료로 확인하세요.</p></section></div><div class="body-sources"><span>증상 참고 자료</span><a href="https://www.nhs.uk/conditions/indigestion/" target="_blank" rel="noopener">NHS · 소화 불편</a><a href="https://www.nhs.uk/conditions/raynauds/" target="_blank" rel="noopener">NHS · 손발의 차가움과 증상 확인</a></div>`;}

function elementsPanel(){
 const e=ELEMENTS.find(item=>item.key===state.element)||ELEMENTS[0];
 return `<div class="section-head"><div><h2>음양오행으로 읽는 전통의 연결</h2><p>음·양은 서로 대비되는 성질을, 오행은 목·화·토·금·수의 성질과 관계를 설명해요.</p></div></div><p class="element-context">사상체질 결과와 함께 살펴보는 참고 자료예요. 소음인 등을 특정 오행으로 바꾸거나, 이 설문으로 오행의 과다·부족을 판정하지 않아요.</p><div class="element-selector" role="group" aria-label="오행 선택">${ELEMENTS.map(item=>`<button class="element-choice element-${item.key} ${item.key===e.key?'selected':''}" data-element="${item.key}" aria-pressed="${item.key===e.key}" aria-controls="element-detail"><span class="element-symbol" aria-hidden="true">${item.symbol}</span><span>${item.name} · ${item.nature}</span></button>`).join('')}</div><section id="element-detail" class="element-detail element-${e.key}" aria-live="polite"><div class="element-title"><span class="element-symbol" aria-hidden="true">${e.symbol}</span><div><h3>${e.name}(${e.symbol}) · ${e.nature}</h3><p>${e.idea}</p></div></div><dl class="element-facts"><div><dt>전통적으로 연결하는 장부</dt><dd>${e.organs}</dd></div><div><dt>감각 부위</dt><dd>${e.sense}</dd></div><div><dt>몸의 조직</dt><dd>${e.tissue}</dd></div><div><dt>맛</dt><dd>${e.taste}</dd></div><div><dt>계절</dt><dd>${e.season}</dd></div></dl></section><p class="element-note">이 연결은 전통 이론의 대응 관계이며, 현대 의학의 장기 기능이나 건강 상태를 뜻하지 않아요. 맛의 연결도 그 맛을 더 많이 먹으라는 권고가 아니에요.</p><div class="element-relations"><section><h3>상생 · 서로 이어지는 관계</h3><p>전통 이론에서 다음 성질을 돕고 길러낸다고 설명하는 순서예요.</p><div class="element-cycle" aria-label="상생: 목에서 화, 토, 금, 수를 거쳐 다시 목">목 → 화 → 토 → 금 → 수 → 목</div></section><section><h3>상극 · 서로 조절하는 관계</h3><p>전통 이론에서 서로 제어하고 조절한다고 설명하는 순서예요.</p><div class="element-cycle" aria-label="상극: 목에서 토, 수, 화, 금을 거쳐 다시 목">목 → 토 → 수 → 화 → 금 → 목</div></section></div><details class="element-extra"><summary>그림 중앙의 심포·삼초는?</summary><p>첨부 그림은 심포·삼초를 별도로 표시하고 있어요. 전통 이론에서는 화(火)와 관련해 설명하지만, 목·화·토·금·수에 더해지는 여섯 번째 오행은 아니에요. 그림의 내분비·면역 등의 문구는 현대 의학의 기관·기능과 같은 의미로 읽기 어려워요.</p></details><details class="element-reference"><summary>첨부한 음양오행 그림 보기</summary><figure><img src="five-elements-reference.jpg" width="1254" height="1254" loading="lazy" alt="사용자가 제공한 음양오행 대응표. 목은 간·담낭, 화는 심장·소장, 토는 비장·위장, 금은 폐·대장, 수는 신장·방광에 연결한 전통 설명."><figcaption>사용자가 제공한 참고 그림 · 그림 속 기능 설명은 전통적 해석으로 살펴보세요.</figcaption></figure></details><a class="element-source" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7356495/" target="_blank" rel="noopener">오행과 장부의 전통적 연결에 관한 문헌</a>`;
}
function bindElements(){app.querySelectorAll('[data-element]').forEach(button=>button.onclick=()=>{state.element=button.dataset.element;const scroll=window.scrollY;render();app.querySelector(`[data-element="${state.element}"]`).focus({preventScroll:true});window.scrollTo(0,scroll);});}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;render();});
document.querySelector('.brand').onclick=e=>{e.preventDefault();state.view='quiz';render();};
const modal=document.getElementById('method');document.getElementById('method-open').onclick=()=>modal.showModal();document.getElementById('method-close').onclick=()=>modal.close();modal.onclick=e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}};
render();
