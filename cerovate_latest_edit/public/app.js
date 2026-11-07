// CEROVATE front-end behaviour. Text labels live in this dictionary for easy translation.
const translations = {
  en:{
    navExplore:"Explore",navCompare:"Compare",navMission:"Mission Lab",navResearch:"Research",heroEyebrow:"PLANETARY INTELLIGENCE · MISSION CONCEPTS",
    heroTitle:'A new way to<br><em>think beyond Earth.</em>',heroText:"Explore worlds, compare their environments, and turn the hardest planetary challenges into smarter mission ideas.",
    startExploring:"Start exploring",howItWorks:"How it works",heroFoot:"BUILT FOR THE NEXT FRONTIER",scroll:"SCROLL TO EXPLORE",
    discoverKicker:"DISCOVER THE ENVIRONMENT",discoverTitle:'Every world has<br>a different <em>story.</em>',
    discoverText:"Start with the Moon and Mars, then describe any destination you want to investigate. CEROVATE turns the details into a mission-focused comparison.",
    moon:"The Moon",moonDesc:"Airless. Ancient. Extreme.",mars:"Mars",marsDesc:"Dusty. Cold. Full of questions.",
    yourWorld:"Your world.",yourWorldDesc:"Bring a location into focus.",compareKicker:"COMPARE & UNDERSTAND",
    compareTitle:'Put any place<br>under the <em>lens.</em>',compareText:"Enter a destination and the environmental details you know. Unknown fields are okay — the analysis will flag what still needs evidence.",
    targetDestination:"TARGET DESTINATION",buildComparison:"Build a comparison",destinationName:"Destination name *",terrainType:"Terrain type",
    temperature:"Temperature range",atmosphere:"Atmosphere",gravity:"Gravity",radiation:"Radiation / hazards",extraContext:"Extra notes / known data",
    dataNote:"Only enter values you can support. The system will separate provided data from assumptions.",compareNow:"Compare destination",
    missionKicker:"FROM PROBLEM TO POSSIBILITY",missionTitle:"Don't just explore.<br><em>Imagine what comes next.</em>",
    missionText:"CEROVATE can shape a challenge into a research direction, possible countermeasures, and a robot concept designed around the environment.",
    stepOne:"Understand the challenge",stepOneDesc:"Identify environmental limits and mission risks.",stepTwo:"Research the evidence",stepTwoDesc:"Start from trusted scientific and mission sources.",
    stepThree:"Design a response",stepThreeDesc:"Explore a practical solution and robotic helper.",researchTitle:'Curiosity needs<br><em>credible sources.</em>',
    researchText:"Explore official planetary data and NASA image collections. Search results are useful leads; always open the original record and verify its context.",
    imageSearchTitle:"Bring the universe closer.",searchImages:"Search images ↗",footerText:"A student concept for exploring the next frontier. Not an official NASA product."
  },
  ar:{
    navExplore:"استكشف",navCompare:"قارن",navMission:"مختبر المهمات",navResearch:"المصادر",heroEyebrow:"ذكاء الكواكب · مفاهيم المهمات",
    heroTitle:'طريقة جديدة<br><em>للتفكير خارج الأرض.</em>',heroText:"استكشف العوالم، وقارن بيئاتها، وحوّل أصعب تحديات الكواكب إلى أفكار لمهمات أكثر ذكاءً.",
    startExploring:"ابدأ الاستكشاف",howItWorks:"كيف يعمل",heroFoot:"نستعد للحدود القادمة",scroll:"مرر للاستكشاف",
    discoverKicker:"اكتشف البيئة",discoverTitle:'كل عالم له<br><em>حكايته الخاصة.</em>',
    discoverText:"ابدأ بالقمر والمريخ، ثم أدخل أي مكان تريد دراسته. يحوّل CEROVATE البيانات إلى مقارنة مرتبطة بتخطيط المهمات.",
    moon:"القمر",moonDesc:"بلا غلاف جوي. قديم. قاسٍ.",mars:"المريخ",marsDesc:"مغبر. بارد. مليء بالأسئلة.",
    yourWorld:"عالمك القادم",yourWorldDesc:"أضف المكان الذي تريد دراسته.",compareKicker:"قارن وافهم",
    compareTitle:'ضع أي مكان<br><em>تحت المجهر.</em>',compareText:"أدخل اسم الوجهة والتفاصيل البيئية التي تعرفها. يمكنك ترك الحقول غير المعروفة فارغة، وسيتم توضيح ما يحتاج إلى أدلة.",
    targetDestination:"الوجهة المستهدفة",buildComparison:"أنشئ مقارنة",destinationName:"اسم الوجهة *",terrainType:"نوع التضاريس",
    temperature:"نطاق الحرارة",atmosphere:"الغلاف الجوي",gravity:"الجاذبية",radiation:"الإشعاع / المخاطر",extraContext:"ملاحظات إضافية / بيانات معروفة",
    dataNote:"أدخل فقط القيم التي لديك ما يدعمها. سيفصل النظام بين البيانات المدخلة والافتراضات.",compareNow:"قارن الوجهة",
    missionKicker:"من المشكلة إلى الإمكانية",missionTitle:'لا تكتفِ بالاستكشاف.<br><em>تخيل ما يمكن أن يحدث.</em>',
    missionText:"يساعدك CEROVATE على تحويل التحدي إلى اتجاه بحثي وحلول محتملة وفكرة روبوت مصممة وفقًا للبيئة.",
    stepOne:"افهم التحدي",stepOneDesc:"حدد حدود البيئة ومخاطر المهمة.",stepTwo:"ابحث عن الأدلة",stepTwoDesc:"ابدأ من مصادر علمية ومصادر مهمات موثوقة.",
    stepThree:"صمم استجابة",stepThreeDesc:"استكشف حلًا عمليًا ومساعدًا روبوتيًا.",researchTitle:'الفضول يحتاج إلى<br><em>مصادر موثوقة.</em>',
    researchText:"استكشف بيانات الكواكب الرسمية ومكتبة صور ناسا. نتائج البحث مجرد نقطة بداية؛ افتح المصدر الأصلي وتحقق من سياقه.",
    imageSearchTitle:"قرّب الكون إليك.",searchImages:"ابحث عن صور ↗",footerText:"مشروع طلابي لاستكشاف الحدود القادمة. ليس منتجًا رسميًا تابعًا لناسا."
  }
};
let language = "en";
const $ = s => document.querySelector(s);
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),3200)}
function setLanguage(lang){
  language=lang;document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(translations[lang][key])el.innerHTML=translations[lang][key]});
  $("#languageToggle").textContent=lang==="en"?"عربي":"English";
}
$("#languageToggle").addEventListener("click",()=>setLanguage(language==="en"?"ar":"en"));

// Reveal animation is replayed when a section leaves and re-enters the viewport.
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
    else entry.target.classList.remove("visible");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

// Planetary and geographic research: users enter names only; facts are fetched automatically.
function escapeHTML(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function nasaGalleryMarkup(){return `<div class="inline-nasa-gallery"><span class="section-kicker">NASA FIELD PHOTOS</span><div class="inline-nasa-grid"><p class="disclaimer">Loading real NASA mission images…</p></div></div>`}
function placeCard(place){
 if(!place)return "";
 const title=place.title||place.query;
 const celestial=/(moon|luna|mars|earth|terra|venus|mercury|jupiter|saturn|uranus|neptune|sun|solar|planet|asteroid|comet|القمر|المريخ|الأرض|الزهرة|عطارد|المشتري|زحل|أورانوس|نبتون|الشمس|كوكب|كويكب|مذنب)/i.test(`${title} ${place.query||""}`);
 const visual=celestial?`<div class="model3d-wrap"><div class="model3d real-sphere" data-texture="${escapeHTML(place.thumbnail||"")}" data-name="${escapeHTML(title)}" role="img" aria-label="Interactive 3D model of ${escapeHTML(title)}"><span class="model3d-label">DRAG TO ROTATE · TRUE 3D</span></div><small>3D sphere · drag to rotate</small></div>`:`<div class="place-visual"><img loading="lazy" src="${escapeHTML(place.thumbnail||"")}" alt="${escapeHTML(title)}" onerror="this.closest('.place-visual').classList.add('no-photo');this.remove()"><span>REAL-WORLD PLACE · PHOTO / LANDMARK</span></div>`;
 return `<article class="compare-destination ${celestial?"celestial-result":"place-result"}"><h4>${escapeHTML(title)}</h4>${place.description?`<div class="research-meta">${escapeHTML(place.description)}</div>`:""}${visual}${nasaGalleryMarkup()}<p>${escapeHTML(place.extract)}</p><a href="${escapeHTML(place.url)}" target="_blank" rel="noreferrer">Open research source ↗</a></article>`;
}
async function loadNasaGallery(container, query){
 const grid=container.querySelector(".inline-nasa-grid"); if(!grid)return;
 try{const r=await fetch(`/api/nasa-images?q=${encodeURIComponent(query+" surface mission")}`);const d=await r.json();if(!r.ok)throw new Error(d.error||"NASA image search unavailable");
 const items=(d.items||[]).filter(x=>x.image).slice(0,3);
 grid.innerHTML=items.length?items.map(x=>`<a class="inline-nasa-photo" href="${escapeHTML(x.nasaUrl)}" target="_blank" rel="noreferrer"><img loading="lazy" src="${escapeHTML(x.image)}" alt="${escapeHTML(x.title)}"><span>${escapeHTML(x.title)}</span></a>`).join(""):'<p class="disclaimer">No NASA images found for this term. Try the NASA image search below.</p>';
 }catch(e){grid.innerHTML='<p class="disclaimer">NASA photos could not load right now. Check your connection and retry.</p>';}
}
function renderResearch(data){
 const result=$("#comparisonResult");
 result.innerHTML=`<div class="result-head"><div><span class="section-kicker">LIVE RESEARCH / DESTINATION BRIEF</span><h3>Research results</h3><p class="result-summary">${escapeHTML(data.disclaimer||"")}</p></div><span class="result-badge">AUTO SEARCH</span></div>${data.second?`<div class="compare-columns">${placeCard(data.first)}${placeCard(data.second)}</div>`:placeCard(data.first)}${data.second?`<div class="robot-result"><span class="section-kicker">SIDE-BY-SIDE COMPARISON</span><p>Both destinations were searched independently. Compare their summaries, descriptions, available imagery, and source records above. For precise temperature, gravity, and atmospheric values, follow the linked scientific datasets.</p></div>`:""}`;
 result.classList.remove("hidden");
 result.querySelectorAll(".model3d").forEach(enableModelRotation);
 result.querySelectorAll(".compare-destination").forEach(card=>loadNasaGallery(card,card.querySelector("h4")?.textContent||"space"));
 result.scrollIntoView({behavior:"smooth",block:"start"});
}

async function enableModelRotation(model){
 if(model.dataset.ready==="1")return; model.dataset.ready="1";
 try{
  const THREE=await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");
  const width=Math.max(180,model.clientWidth),height=Math.max(180,model.clientHeight);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,width/height,.1,100);camera.position.z=3.5;
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setSize(width,height);renderer.outputColorSpace=THREE.SRGBColorSpace;
  model.prepend(renderer.domElement);renderer.domElement.style.cssText="display:block;width:100%;height:100%;border-radius:50%;touch-action:none";
  scene.add(new THREE.AmbientLight(0xffffff,2.0));const hemi=new THREE.HemisphereLight(0xffffff,0xc7d7e5,1.25);scene.add(hemi);const light=new THREE.DirectionalLight(0xffffff,.65);light.position.set(-3,3,4);scene.add(light);
  const geometry=new THREE.SphereGeometry(1,64,48);let material=new THREE.MeshStandardMaterial({color:0xb8cbd8,roughness:.92,emissive:0x263746,emissiveIntensity:.32});
  if(model.dataset.texture){try{const texture=await new THREE.TextureLoader().loadAsync(model.dataset.texture);texture.colorSpace=THREE.SRGBColorSpace;material=new THREE.MeshStandardMaterial({map:texture,roughness:.92,emissive:0xffffff,emissiveMap:texture,emissiveIntensity:.22});}catch(e){}}
  const sphere=new THREE.Mesh(geometry,material);scene.add(sphere);let down=false,lastX=0,lastY=0;
  renderer.domElement.addEventListener("pointerdown",e=>{down=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId);});
  renderer.domElement.addEventListener("pointermove",e=>{if(!down)return;sphere.rotation.y+=(e.clientX-lastX)*.009;sphere.rotation.x+=(e.clientY-lastY)*.009;lastX=e.clientX;lastY=e.clientY;});
  const stop=()=>down=false;renderer.domElement.addEventListener("pointerup",stop);renderer.domElement.addEventListener("pointercancel",stop);
  const draw=()=>{if(!model.isConnected){renderer.dispose();geometry.dispose();material.dispose();return;}if(!down)sphere.rotation.y+=.0015;renderer.render(scene,camera);requestAnimationFrame(draw);};draw();model.classList.add("sphere-ready");
 }catch(e){model.classList.add("sphere-fallback");}
}
$("#compareForm").addEventListener("submit",async e=>{
 e.preventDefault();const button=e.submitter;const old=button.innerHTML;button.disabled=true;button.innerHTML="SEARCHING THE UNIVERSE…";
 try{const response=await fetch("/api/place-search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({place:$("#place").value.trim(),place2:$("#place2").value.trim()})});const data=await response.json();if(!response.ok)throw new Error(data.error||"Research search failed");renderResearch(data);}
 catch(err){toast(err.message+" — check your connection and try again.");}finally{button.disabled=false;button.innerHTML=old;}
});

// Robot interaction and chat.
const chatPanel=$("#chatPanel"),chatMessages=$("#chatMessages");
function openChat(){chatPanel.classList.add("open");chatPanel.setAttribute("aria-hidden","false");sidekickLauncher?.classList.add("chat-active");$("#chatInput").focus();}
function closeChat(){chatPanel.classList.remove("open");chatPanel.setAttribute("aria-hidden","true");sidekickLauncher?.classList.remove("chat-active");}
$("#robotStage").addEventListener("click",openChat);$("#robotStage").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openChat();}});
$("#closeChat").addEventListener("click",closeChat);
const sidekickLauncher=$("#sidekickLauncher");
sidekickLauncher.addEventListener("click",()=>{
  const opening=!chatPanel.classList.contains("open");
  if(opening) openChat(); else closeChat();
  sidekickLauncher.setAttribute("aria-expanded",String(opening));
  sidekickLauncher.classList.toggle("chat-active",opening);
});
$("#closeChat").addEventListener("click",()=>{sidekickLauncher.setAttribute("aria-expanded","false");sidekickLauncher.classList.remove("chat-active")});

const arText=(ar,en)=>language==='ar'?ar:en;
function guideToCompare(){
 closeChat();
 document.querySelector('#compare').scrollIntoView({behavior:'smooth',block:'start'});
 $("#place").focus({preventScroll:true});
}
function wantsCompare(text){return /(compare|comparison|3d|3-d|قارن|مقارنة|ثلاثي|ثلاثى|وريني|وريهالي|اعمل كومبير)/i.test(text)}
function isYes(text){return /^(yes|yeah|yep|okay|ok|sure|show me|go ahead|ماشي|اه|أه|أيوه|ايوه|وريني|ورّيني|تمام|موافق|يلا)$/i.test(text.trim())}
const robotHistory=[];
function addBubble(text,who){const node=document.createElement("div");node.className=`chat-bubble ${who}`;node.textContent=text;chatMessages.appendChild(node);chatMessages.scrollTop=chatMessages.scrollHeight;}
$("#chatForm").addEventListener("submit",async e=>{e.preventDefault();const input=$("#chatInput"),message=input.value.trim();if(!message)return;addBubble(message,"user");input.value="";const pending=document.createElement("div");pending.className="chat-bubble bot";pending.textContent=/[\u0600-\u06FF]/.test(message)?"Cero بيفكر…":"Cero is thinking…";chatMessages.appendChild(pending);chatMessages.scrollTop=chatMessages.scrollHeight;
 try{const r=await fetch("/api/robot-chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message,history:robotHistory})});const data=await r.json();if(!r.ok)throw new Error(data.error||"Chat unavailable");pending.textContent=data.reply;
   if(/(mars|moon|luna|earth|venus|mercury|jupiter|saturn|المريخ|القمر|الأرض|الزهرة|عطارد|المشتري|زحل)/i.test(message)){
     const gallery=document.createElement("div");gallery.className="chat-nasa-gallery";gallery.innerHTML='<small>NASA mission photos · loading…</small>';chatMessages.appendChild(gallery);
     fetch(`/api/nasa-images?q=${encodeURIComponent(message+" surface NASA mission")}`).then(x=>x.json()).then(d=>{const items=(d.items||[]).filter(x=>x.image).slice(0,2);gallery.innerHTML=items.length?items.map(x=>`<a href="${escapeHTML(x.nasaUrl)}" target="_blank" rel="noreferrer"><img src="${escapeHTML(x.image)}" alt="${escapeHTML(x.title)}"><span>${escapeHTML(x.title)}</span></a>`).join(""):'<small>NASA photos are unavailable for this search right now.</small>';chatMessages.scrollTop=chatMessages.scrollHeight;}).catch(()=>gallery.textContent="NASA photos could not load right now.");
   }
   if(wantsCompare(message)){setTimeout(guideToCompare,500);}robotHistory.push({role:"user",content:message},{role:"assistant",content:data.reply});if(robotHistory.length>12)robotHistory.splice(0,robotHistory.length-12);}catch(err){pending.textContent=/[\u0600-\u06FF]/.test(message)?"الإشارة عندي ضعيفة حاليًا. حاول تاني بعد لحظة.":"My signal is weak right now. Please try again in a moment.";}
 chatMessages.scrollTop=chatMessages.scrollHeight;
});

// Cero stays parked quietly; only the separate head-peek animation moves.

// NASA Image and Video Library search, proxied by the local Node server.
$("#imageSearchForm").addEventListener("submit",async e=>{
  e.preventDefault();const query=$("#imageQuery").value.trim();const box=$("#imageResults");
  box.innerHTML='<p class="disclaimer">Searching NASA’s public image collection…</p>';
  try{
    const r=await fetch(`/api/nasa-images?q=${encodeURIComponent(query)}`);const data=await r.json();if(!r.ok)throw new Error(data.error||"Search failed");
    if(!data.items.length){box.innerHTML='<p class="disclaimer">No images found. Try another search phrase.</p>';return}
    box.innerHTML=data.items.map(item=>`<a class="image-tile" href="${escapeHTML(item.nasaUrl)}" target="_blank" rel="noreferrer"><img loading="lazy" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}"><p>${escapeHTML(item.title)}</p></a>`).join("");
  }catch(err){box.innerHTML=`<p class="disclaimer">${escapeHTML(err.message)}. You can browse images.nasa.gov directly.</p>`}
});

// Check whether AI mode is configured, without exposing any key to the browser.
fetch("/api/health").then(r=>r.json()).then(d=>{if(!d.aiEnabled)console.info("CEROVATE is in starter mode. Add OPENAI_API_KEY to .env to enable AI analysis.");}).catch(()=>{});

// Cero intro: robot arrives first, welcome message follows, both leave, then a small helper stays parked.
(()=>{
 const launcher=document.getElementById("sidekickLauncher");
 const bubble=document.getElementById("welcomeBubble");
 const hint=document.getElementById("sidekickHint");
 if(!launcher)return;
 launcher.classList.add("intro-sequence");
 window.setTimeout(()=>launcher.classList.add("intro-robot-in"),500);
 window.setTimeout(()=>launcher.classList.add("intro-message-in"),1450);
 window.setTimeout(()=>launcher.classList.add("intro-exit"),5200);
 window.setTimeout(()=>{launcher.classList.remove("intro-sequence","intro-robot-in","intro-message-in","intro-exit");launcher.classList.add("sidekick-visible","sidekick-ready");if(bubble)bubble.hidden=true;if(hint){hint.textContent="How can I help you?";hint.classList.add("hint-ready");}},6000);
 const peek=document.getElementById("edgePeek");if(peek)peek.hidden=true;
 // A short invitation appears periodically; hovering/focusing the helper reveals it immediately.
 if(hint){window.setInterval(()=>{if(chatPanel?.classList.contains("open"))return;hint.classList.add("hint-periodic");window.setTimeout(()=>hint.classList.remove("hint-periodic"),2600);},10000);}
})();

// Separate plain-text comparison: deliberately does not create or show 3D previews.
function standardTextCard(item){
  return `<article class="standard-result-card"><h3>${escapeHTML(item.title || item.query)}</h3><p>${escapeHTML(item.description || "Reference search result")}</p><p>${escapeHTML(item.extract || "No summary was returned.")}</p>${nasaGalleryMarkup()}<a href="${escapeHTML(item.url)}" target="_blank" rel="noreferrer">Open source ↗</a></article>`;
}
const standardForm = document.getElementById("standardCompareForm");
if (standardForm) standardForm.addEventListener("submit", async event => {
  event.preventDefault();
  const button = standardForm.querySelector('button[type="submit"]');
  const result = document.getElementById("standardCompareResult");
  const original = button.innerHTML;
  button.disabled = true; button.innerHTML = "SEARCHING BOTH ITEMS…";
  result.classList.remove("hidden"); result.innerHTML = '<p class="disclaimer">Searching both items independently…</p>';
  try {
    const response = await fetch("/api/compare-text", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({first:document.getElementById("standardFirst").value.trim(), second:document.getElementById("standardSecond").value.trim()})});
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "The comparison search failed.");
    result.innerHTML = `<div class="result-head"><div><span class="section-kicker">LIVE TEXT SEARCH</span><h3>Standard comparison</h3><p class="result-summary">${escapeHTML(data.disclaimer || "")}</p></div><span class="result-badge">NO 3D</span></div><div class="standard-result-grid">${standardTextCard(data.first)}${standardTextCard(data.second)}</div>`;
    result.querySelectorAll(".standard-result-card").forEach(card=>loadNasaGallery(card,card.querySelector("h3")?.textContent||"space"));
    result.scrollIntoView({behavior:"smooth",block:"start"});
  } catch (error) {
    result.innerHTML = `<p class="disclaimer error-message">${escapeHTML(error.message)}. Check your internet connection and try again.</p>`;
  } finally { button.disabled = false; button.innerHTML = original; }
});
