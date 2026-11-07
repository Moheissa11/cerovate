/**
 * ORBITMIND — lightweight Node server.
 * NOTES FOR HANDOFF:
 * 1) The browser talks only to /api/* routes; secrets stay in this file/.env.
 * 2) AI mode is optional. Without OPENAI_API_KEY, the app returns a clearly
 *    labelled starter analysis so the UI remains demoable.
 * 3) Research links are primary-source starting points, not a substitute for
 *    checking the exact evidence behind a mission decision.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const ROOT = __dirname;
const PUBLIC = path.join(ROOT, "public");
const PORT = process.env.PORT || 3000;
const MIME = {
  ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8",
  ".js":"text/javascript; charset=utf-8", ".json":"application/json",
  ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg",
  ".svg":"image/svg+xml", ".ico":"image/x-icon"
};

// Minimal .env loader so no package install is needed.
try {
  const envFile = fs.readFileSync(path.join(ROOT, ".env"), "utf8");
  envFile.split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  });
} catch (_) {}

const SOURCES = [
  { name:"NASA Solar System Exploration", url:"https://science.nasa.gov/solar-system/", note:"Planetary facts and mission context" },
  { name:"NASA Planetary Data System", url:"https://pds.nasa.gov/", note:"Archived planetary mission datasets" },
  { name:"NASA Image and Video Library", url:"https://images.nasa.gov/", note:"Searchable NASA imagery and media" },
  { name:"NASA Moon", url:"https://science.nasa.gov/moon/", note:"Lunar environment and exploration" },
  { name:"NASA Mars", url:"https://science.nasa.gov/mars/", note:"Martian environment and exploration" },
  { name:"NASA Human Research Program", url:"https://www.nasa.gov/hrp/", note:"Human-spaceflight risks and countermeasures" }
];

function send(res, status, data, type="application/json; charset=utf-8") {
  res.writeHead(status, {"Content-Type":type, "Cache-Control":"no-store", "Access-Control-Allow-Origin":"*"});
  res.end(type.startsWith("application/json") ? JSON.stringify(data) : data);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => { body += chunk; if (body.length > 1e6) reject(new Error("Request too large")); });
    req.on("end", () => { try { resolve(JSON.parse(body || "{}")); } catch(e) { reject(e); } });
    req.on("error", reject);
  });
}
function fallbackAnalysis(input) {
  const place = input.place || "the selected destination";
  const terrain = input.terrain || "unknown terrain";
  const hazards = input.hazards || "not specified";
  return {
    mode:"starter",
    title:`Mission concept for ${place}`,
    summary:`This is a preliminary concept based on the information entered for ${place}. Validate local measurements, landing constraints, and radiation/weather data before treating any recommendation as mission-ready.`,
    comparison:[
      {label:"Environment", value:`${terrain}; ${hazards}`},
      {label:"Power", value:"Compare sunlight hours, dust/shadow exposure, and storage needs."},
      {label:"Mobility", value:"Match wheel/leg design to slope, rocks, loose regolith, and travel distance."},
      {label:"Communications", value:"Check line-of-sight, relay coverage, and expected data delay."}
    ],
    risks:[
      {level:"High",name:"Unknowns in local conditions",detail:"The submitted location description is not a verified environmental dataset."},
      {level:"Medium",name:"Power and thermal management",detail:"Dust, darkness, extreme temperature swings, or limited sunlight can constrain operations."},
      {level:"Medium",name:"Mobility and mechanical wear",detail:"Loose soil, sharp rocks, slopes, and dust can reduce traction and damage moving parts."}
    ],
    solutions:[
      "Deploy a small scout first to map slopes, obstacles, illumination, and communication visibility.",
      "Use a modular, dust-tolerant rover with replaceable wheel/traction components and a protected electronics bay.",
      "Combine solar generation with rechargeable storage; size the system only after measuring the local light cycle.",
      "Use thermal insulation, heaters, and temperature monitoring selected for the actual destination range."
    ],
    robot:{
      name:"ORBIT Scout",
      purpose:"A modular reconnaissance rover for terrain mapping and environmental sampling.",
      design:"Six-wheel rocker-bogie chassis, stereo cameras, navigation sensors, a compact spectrometer, and a swappable science payload.",
      autonomy:"Obstacle detection, route planning within a human-approved safe zone, health monitoring, and store-and-forward communications.",
      limitation:"Concept only. Payload, mass, power, thermal design, and autonomy must be engineered and tested for the target."
    },
    researchQueries:[
      `${place} surface conditions NASA`,
      `${place} radiation environment NASA`,
      `${place} terrain and landing site data NASA`
    ],
    sources:SOURCES,
    disclaimer:"Starter analysis — no live AI research was performed. Add an AI provider key and verify all findings against primary mission data."
  };
}
async function aiAnalysis(input) {
  if (!process.env.OPENAI_API_KEY) return fallbackAnalysis(input);
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const prompt = `You are a cautious planetary mission research assistant for a student prototype.
Analyze this user-supplied destination. Do not invent measurements or claim a source was checked if it was not.
Clearly distinguish known facts, assumptions, and unknowns. Prefer NASA/PDS primary sources.
Return ONLY valid JSON with keys: title, summary, comparison (array of {label,value}), risks (array of {level,name,detail}), solutions (array of strings), robot ({name,purpose,design,autonomy,limitation}), researchQueries (array of search phrases), sources (array of {name,url,note}), disclaimer.
Destination: ${JSON.stringify(input)}
Use these research starting points where relevant: ${JSON.stringify(SOURCES)}
If no precise coordinates or dataset are supplied, say so and make recommendations conditional.`;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},
    body:JSON.stringify({model,temperature:0.35,response_format:{type:"json_object"},messages:[
      {role:"system",content:"Return careful, evidence-aware mission analysis as JSON only."},
      {role:"user",content:prompt}
    ]})
  });
  if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
  const data = await response.json();
  return JSON.parse(data.choices?.[0]?.message?.content || "{}");
}

const OFFLINE_SPACE_REFERENCE = [
  { names:["mars","المريخ"], title:"Mars", extract:"Mars is a cold, rocky planet with a thin atmosphere made mostly of carbon dioxide. Ancient river channels and minerals indicate that liquid water existed on its surface in the past.", url:"https://science.nasa.gov/mars/" },
  { names:["moon","the moon","القمر"], title:"Moon", extract:"Earth’s Moon is a rocky natural satellite with almost no atmosphere. Its surface experiences extreme day-night temperature changes, and permanently shadowed polar regions may preserve water ice.", url:"https://science.nasa.gov/moon/" },
  { names:["earth","الأرض"], title:"Earth", extract:"Earth is a rocky planet with stable liquid water on its surface and an atmosphere rich in nitrogen and oxygen. It is the only world currently known to support life.", url:"https://science.nasa.gov/earth/" },
  { names:["jupiter","المشتري"], title:"Jupiter", extract:"Jupiter is the largest planet in the Solar System. It is a gas giant with a powerful magnetic field, numerous moons, and the Great Red Spot.", url:"https://science.nasa.gov/jupiter/" },
  { names:["saturn","زحل"], title:"Saturn", extract:"Saturn is a gas giant known for its extensive ring system. Its moons include Titan and Enceladus, both important targets for planetary science.", url:"https://science.nasa.gov/saturn/" },
  { names:["venus","الزهرة"], title:"Venus", extract:"Venus is a rocky planet with a dense carbon-dioxide atmosphere and an extremely hot surface. Its clouds contain sulfuric-acid droplets.", url:"https://science.nasa.gov/venus/" },
  { names:["mercury","عطارد"], title:"Mercury", extract:"Mercury is the smallest planet and the closest to the Sun. It has a heavily cratered surface and large temperature swings.", url:"https://science.nasa.gov/mercury/" },
  { names:["sun","الشمس"], title:"Sun", extract:"The Sun is the star at the center of our Solar System. Its energy is produced by nuclear fusion in its core.", url:"https://science.nasa.gov/sun/" },
  { names:["pluto","بلوتو"], title:"Pluto", extract:"Pluto is a dwarf planet in the Kuiper Belt. It has mountains, glaciers, a thin atmosphere, and several moons.", url:"https://science.nasa.gov/dwarf-planets/pluto/" }
];
function offlineSpaceLookup(query) {
  const normalized = String(query || "").trim().toLowerCase();
  const match = OFFLINE_SPACE_REFERENCE.find(item => item.names.includes(normalized));
  const textures = {moon:"/assets/moon-closeup.png",earth:"/assets/earth-night.png",saturn:"/assets/saturn-reference.png"};
  return match ? {query, title:match.title, found:true, extract:match.extract, description:"Offline reference · NASA topic page", thumbnail:textures[normalized] || "", url:match.url, offline:true} : null;
}

async function encyclopediaLookup(query) {
  const clean = String(query || "").trim();
  if (!clean) throw new Error("Enter something to search for.");
  const endpoint = new URL("https://en.wikipedia.org/w/api.php");
  endpoint.searchParams.set("action", "query");
  endpoint.searchParams.set("list", "search");
  endpoint.searchParams.set("srsearch", clean);
  endpoint.searchParams.set("srlimit", "1");
  endpoint.searchParams.set("format", "json");
  endpoint.searchParams.set("origin", "*");
  let search;
  try { search = await fetch(endpoint, { headers: { "User-Agent": "CEROVATE-Student-Research/1.1 (educational prototype)" }, signal: AbortSignal.timeout(12000) }); }
  catch (error) { const offline = offlineSpaceLookup(clean); if (offline) return offline; throw new Error("Live search could not connect. Check the server internet connection and try again. Known planets and moons can still be searched offline."); }
  if (!search.ok) throw new Error(`Search provider returned ${search.status}. Try again in a moment.`);
  const found = await search.json();
  const page = found?.query?.search?.[0];
  if (!page) return { query: clean, found: false, title: clean, extract: "No matching result was found. Try a more specific spelling or search term.", url: "https://en.wikipedia.org/wiki/Special:Search?search=" + encodeURIComponent(clean), thumbnail: "" };
  const details = new URL("https://en.wikipedia.org/w/api.php");
  details.searchParams.set("action", "query"); details.searchParams.set("prop", "extracts|pageimages|info");
  details.searchParams.set("exintro", "1"); details.searchParams.set("explaintext", "1");
  details.searchParams.set("pithumbsize", "900"); details.searchParams.set("inprop", "url");
  details.searchParams.set("titles", page.title); details.searchParams.set("format", "json"); details.searchParams.set("origin", "*");
  let detailResponse;
  try { detailResponse = await fetch(details, { headers: { "User-Agent": "CEROVATE-Student-Research/1.1 (educational prototype)" }, signal: AbortSignal.timeout(12000) }); }
  catch (error) { const offline = offlineSpaceLookup(clean); if (offline) return offline; throw new Error("Search found a result, but its details could not be loaded. Please retry."); }
  if (!detailResponse.ok) throw new Error(`Could not load the result details (${detailResponse.status}).`);
  const detailJson = await detailResponse.json();
  const record = Object.values(detailJson?.query?.pages || {})[0] || {};
  return { query: clean, title: record.title || page.title, found: true, extract: record.extract || page.snippet?.replace(/<[^>]*>/g, "") || "No summary is available for this result.", description: "Reference result", thumbnail: record.thumbnail?.source || "", url: record.fullurl || "https://en.wikipedia.org/wiki/" + encodeURIComponent(page.title.replace(/ /g, "_")) };
}

function looksLikeUnclearInput(message) {
  const text = String(message || '').trim();
  if (text.length < 2) return true;
  const letters = (text.match(/[a-z\u0600-\u06FF]/gi) || []).length;
  const words = text.split(/\s+/).filter(Boolean);
  if (letters < 3) return true;
  // Catch keyboard mashes such as "jdp" without rejecting short valid words.
  if (words.length === 1 && /^[a-z]{3,8}$/i.test(text) && !/[aeiou]/i.test(text)) return true;
  if (words.length === 1 && /^[a-z]{5,}$/i.test(text) && !/[aeiou]{1,}/i.test(text)) return true;
  return false;
}
function messageLanguage(message) {
  return /[\u0600-\u06FF]/.test(String(message || "")) ? "ar" : "en";
}
function robotReply(message) {
  const q = String(message || '').toLowerCase();
  const ar = messageLanguage(message) === "ar";
  const raw = String(message || '').trim();
  const englishName = raw.match(/\b(?:my name is|i am|i'm)\s+([A-Za-z][A-Za-z'-]{1,24})\b/i);
  const arabicName = raw.match(/(?:اسمي|انا اسمي|أنا اسمي)\s+([\u0621-\u064A]{2,20})/);
  const introducedName = englishName?.[1] || arabicName?.[1];
  if (introducedName) return ar
    ? `تشرفت بيك يا ${introducedName}! 😊 نورت CEROVATE. أنا Cero، صاحبك في رحلة استكشاف الفضاء. تحب نبدأ بأي كوكب أو قمر؟`
    : `Nice to meet you, ${introducedName}! 😊 Welcome to CEROVATE. I’m Cero, your space buddy. Which planet or moon should we explore first?`;
  if (looksLikeUnclearInput(message)) return ar
    ? 'معلش يا مستكشف، مش قادر أفهم الرسالة دي. ممكن توضح قصدك أو تعيد كتابة السؤال؟ 🤖'
    : "Sorry, explorer — I’m not sure what you mean. Could you rephrase your message or clarify your question? 🤖";
  if (/^(hi|hello|hey|مرحبا|اهلا|أهلا|ازيك|السلام عليكم)[!.؟ ]*$/i.test(q)) return ar
    ? 'أهلًا بيك يا مستكشف! 🚀 أنا Cero. اسألني عن الكواكب والأقمار والفضاء والبعثات، وهحاول أجاوبك بدقة وأوضح مصدر المعلومة.'
    : "Hi, explorer! 🚀 I’m Cero. Ask me about planets, moons, space, or missions, and I’ll do my best to give you a clear, accurate answer with sources.";
  if (/^(thanks|thank you|شكرا|شكرًا|تسلم)/i.test(q)) return ar
    ? 'العفو! 🌟 لو عندك سؤال تاني عن الفضاء أنا جاهز.'
    : "You’re welcome! 🌟 I’m here if you have another space question.";
  if (/mars|المريخ/.test(q)) return ar
    ? 'المريخ كوكب صخري بارد، وغلافه الجوي رقيق ويتكوّن معظمه من ثاني أكسيد الكربون. توجد على سطحه آثار جيولوجية تشير إلى وجود مياه سائلة قديمًا. دي معلومات عامة وليست قراءة مباشرة لبيانات لحظية.\nمصدر موثوق: NASA — https://science.nasa.gov/mars/'
    : 'Mars is a cold, rocky planet with a thin atmosphere made mostly of carbon dioxide. Its surface preserves geological evidence that liquid water existed there in the past. This is general background, not a live data reading.\nTrusted source: NASA — https://science.nasa.gov/mars/';
  if (/moon|القمر/.test(q)) return ar
    ? 'القمر لا يملك غلافًا جويًا كثيفًا مثل الأرض، لذلك تتغير حرارة سطحه بشدة بين النهار والليل، وتوجد مناطق قطبية مظللة باستمرار قد تحتوي على جليد مائي.\nمصدر موثوق: NASA — https://science.nasa.gov/moon/'
    : 'The Moon has no thick atmosphere like Earth’s, so its surface temperature changes dramatically between day and night. Permanently shadowed polar regions may contain water ice.\nTrusted source: NASA — https://science.nasa.gov/moon/';
  if (/saturn|زحل/.test(q)) return ar
    ? 'زحل عملاق غازي مشهور بحلقاته الواسعة، وله عائلة كبيرة من الأقمار، من بينها تيتان وإنسيلادوس.\nمصدر موثوق: NASA — https://science.nasa.gov/saturn/'
    : 'Saturn is a gas giant famous for its broad rings. It has many moons, including Titan and Enceladus.\nTrusted source: NASA — https://science.nasa.gov/saturn/';
  if (/earth|الأرض/.test(q)) return ar
    ? 'الأرض كوكب صخري يمتلك ماءً سائلًا على سطحه وغلافًا جويًا غنيًا بالنيتروجين والأكسجين. لو تقصد معلومة محددة—مثل الحرارة أو الغلاف الجوي أو المدار—حددها لي.\nمصدر موثوق: NASA — https://science.nasa.gov/earth/'
    : 'Earth is a rocky planet with liquid water on its surface and an atmosphere rich in nitrogen and oxygen. If you want a specific detail—such as temperature, atmosphere, or orbit—tell me which one.\nTrusted source: NASA — https://science.nasa.gov/earth/';
  return ar
    ? 'أنا متخصص في الفضاء والكواكب والبعثات العلمية. مش عايز أخمّن إجابة مش مرتبطة بسؤالك؛ ممكن توضح سؤالك أو تذكر اسم الكوكب/القمر/المهمة اللي تقصدها؟ وللبيانات الموثوقة نبدأ بمصادر NASA وبيانات المهمات.'
    : "I specialize in space, planets, and scientific missions. I don’t want to guess or give you an unrelated answer. Could you clarify your question or tell me which planet, moon, or mission you mean? For reliable data, we can start with NASA and mission datasets.";
}
async function searchContextForChat(message) {
  // Retrieve a concise encyclopedia record for named space destinations; this is
  // supporting context, not a claim that NASA datasets were queried.
  const q = String(message || '').trim();
  if (!/(mars|moon|luna|earth|venus|mercury|jupiter|saturn|uranus|neptune|pluto|europa|titan|enceladus|المريخ|القمر|الأرض|الزهرة|عطارد|المشتري|زحل|أورانوس|نبتون)/i.test(q)) return null;
  try { return await encyclopediaLookup(q); } catch (_) { return null; }
}

async function nasaImageSearch(q) {
  const endpoint = new URL("https://images-api.nasa.gov/search");
  endpoint.searchParams.set("q", q);
  endpoint.searchParams.set("media_type", "image");
  endpoint.searchParams.set("page_size", "8");
  const r = await fetch(endpoint);
  if (!r.ok) throw new Error("NASA image search unavailable");
  const data = await r.json();
  return (data.collection?.items || []).slice(0,8).map(item => ({
    title:item.data?.[0]?.title || "NASA image",
    description:(item.data?.[0]?.description || "").replace(/<[^>]*>/g,"").slice(0,240),
    date:item.data?.[0]?.date_created || "",
    nasaId:item.data?.[0]?.nasa_id || "",
    image:item.links?.find(x=>x.render==="image")?.href || "",
    nasaUrl:item.href || "https://images.nasa.gov/"
  }));
}
const server = http.createServer(async (req,res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (req.method === "OPTIONS") return send(res,204,{});
  if (url.pathname === "/api/health") return send(res,200,{ok:true,aiEnabled:!!process.env.OPENAI_API_KEY});
  if (url.pathname === "/api/solve" && req.method === "POST") {
    try {
      const input = await readBody(req);
      if (!input.place) return send(res,400,{error:"Please enter a destination name."});
      const result = await aiAnalysis(input);
      return send(res,200,result);
    } catch(e) { return send(res,502,{error:e.message || "Analysis failed"}); }
  }
  if (url.pathname === "/api/place-search" && req.method === "POST") {
    try {
      const input = await readBody(req);
      if (!String(input.place || "").trim()) return send(res,400,{error:"Enter a place or thing to search for."});
      const first = await encyclopediaLookup(input.place);
      const second = String(input.place2 || "").trim() ? await encyclopediaLookup(input.place2) : null;
      return send(res,200,{first,second,source:"Wikimedia search API",disclaimer:(first.offline || second?.offline) ? "Internet connection is unavailable, so a built-in NASA topic reference is being shown for recognized Solar System objects. Other searches require a live connection." : "Search results are retrieved live from Wikipedia/Wikimedia. For scientific decisions, verify measurements with NASA/PDS primary datasets."});
    } catch(e) { return send(res,502,{error:e.message||"Research lookup failed"}); }
  }
  if (url.pathname === "/api/compare-text" && req.method === "POST") {
    try {
      const input = await readBody(req);
      if (!String(input.first || "").trim() || !String(input.second || "").trim()) return send(res,400,{error:"Enter both items to compare."});
      const [first, second] = await Promise.all([encyclopediaLookup(input.first), encyclopediaLookup(input.second)]);
      return send(res,200,{first,second,source:"Wikimedia search API",disclaimer:(first.offline || second.offline) ? "Internet connection is unavailable; built-in NASA topic references are shown for recognized Solar System objects." : "A standard text comparison based on live reference summaries; it is separate from the 3D explorer."});
    } catch(e) { return send(res,502,{error:e.message||"Comparison search failed"}); }
  }
  if (url.pathname === "/api/robot-chat" && req.method === "POST") {
    try {
      const input=await readBody(req); const message=String(input.message||"").trim().slice(0,1200);
      if(!message) return send(res,400,{error:"Type a message first."});
      if(looksLikeUnclearInput(message)) return send(res,200,{reply:robotReply(message),mode:"clarify"});
      if(!process.env.OPENAI_API_KEY) return send(res,200,{reply:robotReply(message),mode:"guided",notice:"For open-ended conversational answers, configure OPENAI_API_KEY on the server."});
      const evidence=await searchContextForChat(message);
      const history=Array.isArray(input.history) ? input.history.slice(-8).map(item=>({role:item.role==="assistant"?"assistant":"user",content:String(item.content||"").slice(0,1200)})) : [];
      const replyLanguage=messageLanguage(message)==="ar" ? "Arabic" : "English";
      const systemPrompt=`You are Cero, the helpful bilingual Arabic/English space-science assistant inside CEROVATE. The required response language for this message is ${replyLanguage}. Always answer entirely in ${replyLanguage}, regardless of previous conversation language. Understand the user's actual intent and answer ONLY what they asked. Keep the answer relevant, clear, and conversational. If the message is ambiguous, malformed, or you cannot understand it, politely ask them to rephrase; do not guess. If the user tells you their name, acknowledge it warmly and use it naturally in later replies in this conversation; do not overuse it or invent a name. Respond conversationally and helpfully to personal introductions too (for example, if they say “my name is Sam,” greet Sam instead of treating it as an invalid question). Keep the conversation context and respond with the same warmth and clarity as a thoughtful human assistant. If the question is unrelated to space, say kindly that your specialty is space and ask how you can help within that topic. Never invent facts, measurements, citations, searches, or sources. Distinguish established facts from estimates and uncertainty. Prefer primary sources: NASA (science.nasa.gov, nasa.gov), NASA Planetary Data System (pds.nasa.gov), ESA (esa.int), and peer-reviewed research. Cite a source URL only if it is supplied in retrieved context or you are confident it directly supports the claim. If no source was retrieved, say so honestly and suggest a relevant official source. Do not switch languages unless the user switches languages in a new message. Do not say you searched NASA unless a NASA source was actually retrieved.`;
      const context=evidence?.found ? `Retrieved background reference (Wikipedia summary, not a NASA dataset): ${JSON.stringify({title:evidence.title,extract:evidence.extract,url:evidence.url})}` : "No external source was successfully retrieved for this turn.";
      const response=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4o-mini",messages:[{role:"system",content:systemPrompt},{role:"system",content:context},...history,{role:"user",content:message}],temperature:.25})});
      if(!response.ok) throw new Error("The AI service is temporarily unavailable. Check the server API key and try again."); const data=await response.json();
      return send(res,200,{reply:data.choices?.[0]?.message?.content||(messageLanguage(message)==="ar" ? "معلش، حصلت مشكلة في فهم السؤال. ممكن تعيده بصياغة تانية؟" : "Sorry, I had trouble understanding that. Could you rephrase your question?"),mode:"ai",reference:evidence?.found?{name:evidence.title,url:evidence.url}:null});
    } catch(e){return send(res,502,{error:e.message||"Chat failed"});}
  }
  if (url.pathname === "/api/nasa-images") {
    try {
      const q = url.searchParams.get("q") || "Mars rover";
      return send(res,200,{items:await nasaImageSearch(q)});
    } catch(e) { return send(res,502,{error:e.message}); }
  }
  let pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const target = path.normalize(path.join(PUBLIC, pathname));
  if (!target.startsWith(PUBLIC)) return send(res,403,{error:"Forbidden"});
  fs.readFile(target,(err,buffer)=>{
    if (err) return send(res,404,"Not found","text/plain; charset=utf-8");
    send(res,200,buffer,MIME[path.extname(target)] || "application/octet-stream");
  });
});
server.listen(PORT,()=>console.log(`ORBITMIND running at http://localhost:${PORT}`));
