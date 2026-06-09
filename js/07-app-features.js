/* Slurper v4 - Features - FIXED */

function getMatchScore(key){
var score=72;
if(state.favorites.indexOf(key)>-1)score+=14;
if(state.reviews.some(function(r){return r.wine===(WINE_DB[key]||{}).name&&r.stars>=4}))score+=10;
var w=WINE_DB[key];if(!w)return score;
if(state.quizAnswers&&state.quizAnswers.length){
var last=state.quizAnswers[state.quizAnswers.length-1];
if(last==="A"&&(key==="pinot_noir"||key==="nebbiolo"||key==="chardonnay"))score+=12;
if(last==="B"&&(key==="shiraz"||key==="malbec"||key==="merlot"))score+=12;
if(last==="C"&&(key==="grenache"||key==="tempranillo"||key==="gamay"))score+=12;
if(last==="D"&&(key==="riesling"||key==="sauvignon_blanc"||key==="albarino"))score+=12;
}
return Math.min(99,score+Math.floor(Math.random()*8));
}

function stockLabel(wineId){
var s=getStock(wineId);
if(s<=0)return'<span class="stock-out">Out of stock</span>';
if(s<=5)return'<span class="stock-low">Only '+s+' left!</span>';
return'<span class="stock-ok">In stock</span>';
}

function cartBtn(wineId,size){
var s=getStock(wineId);
var cls=size==="xs"?"btn-xs":"btn-sm";
if(s<=0)return'<button class="btn '+cls+' btn-ghost" disabled style="opacity:.4">Sold out</button>';
return'<button class="btn '+cls+' btn-coral" onclick="event.stopPropagation();addToCart('+wineId+')">Add</button>';
}

function showWineResult(key,src){
var w=WINE_DB[key];if(!w)return;
state.currentWine={key:key,name:w.name,emoji:w.emoji};
state.totalScans=(state.totalScans||0)+1;
if(!state.journey)state.journey={countries:new Set(),regions:new Set(),wines:new Set()};
state.journey.wines.add(key);
(w.regions||[]).forEach(function(r){state.journey.regions.add(r)});
saveState();
var jMatches=JOVAL_WINES.filter(function(j){return j.grape===key});
var isFav=state.favorites.indexOf(key)>-1;
var matchPct=getMatchScore(key);
var mc=matchPct>90?"var(--mint)":matchPct>80?"var(--purple)":"var(--coral)";
var h='<div class="hdr" style="padding:0 0 12px"><button class="hdr-back" onclick="nav(\'screen-splash\')">&larr;</button><div class="hdr-title">'+w.name+'</div></div>';
h+='<div class="rh bounce"><div style="display:inline-block;background:'+mc+';color:#fff;padding:5px 14px;border-radius:50px;font-weight:900;font-size:.8rem;margin-bottom:8px">'+matchPct+'% match</div>';
h+='<div class="re">'+w.emoji+'</div><div class="rn">'+w.name+'</div>';
h+='<div class="rg">'+(w.type==="red"?"Red":w.type==="white"?"White":"Rose")+' · '+(w.priceRange||"$$")+'</div></div>';
h+='<div class="rs"><h3>In Plain English</h3><div class="pe">'+w.plainEnglish+'</div></div>';
h+='<div class="rs"><h3>Taste Profile</h3>';
[["Body",w.body,"#FF6363"],["Sweet",w.sweetness,"#FFD93D"],["Zing",w.acidity,"#6BCB77"],["Grip",w.tannin,"#7C5CFC"],["Booze",w.alcohol,"#FF8FAB"]].forEach(function(b){
h+='<div class="tm"><div class="tml">'+b[0]+'</div><div class="tmb"><div class="tmf" style="width:'+b[1]*20+'%;background:'+b[2]+'"></div></div></div>';
});h+='</div>';
h+='<div class="rs"><h3>Aromas</h3><div>'+(w.aromas||[]).map(function(a){return'<span class="badge badge-coral">'+a+'</span>'}).join(" ")+'</div></div>';
h+='<div class="rs"><h3>Regions</h3><div>'+(w.regions||[]).map(function(r){return'<span class="badge badge-mint">'+r+'</span>'}).join(" ")+'</div></div>';
if(w.foodPairings&&w.foodPairings.length){
h+='<div class="rs"><h3>Perfect With</h3>';
w.foodPairings.forEach(function(p){h+='<div class="gi"><div class="gi-c" style="background:var(--peach)">'+p.emoji+'</div><div class="gi-i"><div class="gi-n">'+p.name+'</div><div class="gi-s">'+p.desc+'</div></div></div>'});h+='</div>';}
if(w.cheese){h+='<div class="rs"><h3>Cheese</h3><div>'+w.cheese.map(function(c){return'<span class="badge badge-sun">'+c+'</span>'}).join(" ")+'</div></div>';}
if(w.funFact){h+='<div class="rs"><h3>Fun Fact</h3><div class="card-purple" style="border-radius:var(--r);padding:16px"><p style="line-height:1.7;font-size:.92rem">'+w.funFact+'</p></div></div>';}
if(jMatches.length){
h+='<div class="rs"><h3><span class="joval-tag">JOVAL</span> Buy These</h3>';
jMatches.forEach(function(j){
h+='<div class="gi"><div class="gi-c" style="background:var(--sunbg)">'+w.emoji+'</div><div class="gi-i"><div class="gi-n">'+j.name+'</div><div class="gi-s">'+j.brand+' · '+j.region+' · <span class="points-badge">'+j.points+'pts</span></div><div style="display:flex;align-items:center;gap:8px;margin-top:6px;flex-wrap:wrap"><span class="price-tag">$'+j.price+'</span>'+stockLabel(j.id)+' '+cartBtn(j.id,"sm")+'</div></div></div>'});h+='</div>';}
h+='<div class="g2 mt3"><button class="btn btn-coral" onclick="nav(\'screen-reviews\')">Review</button><button class="btn '+(isFav?'btn-pink':'btn-ghost')+'" onclick="toggleFav(\''+key+'\')">'+(isFav?'Faved':'Fave')+'</button></div>';
h+='<div class="g2 mt2"><button class="btn btn-sm btn-ghost" onclick="addToCellar()">Cellar</button><button class="btn btn-sm btn-ghost" onclick="shareWine()">Share</button></div>';
document.getElementById("screen-result").innerHTML=h;
document.getElementById("review-wine-name").textContent=w.name;
nav("screen-result");addXP(2);
}

function demoScan(key){showWineResult(key,"demo");}

function toggleFav(key){
var i=state.favorites.indexOf(key);
if(i>-1){state.favorites.splice(i,1);showToast("Removed")}
else{state.favorites.push(key);showToast("Faved!");addXP(3)}
saveState();checkBadges();showWineResult(key,"fav");
}

function renderFavorites(){
var el=document.getElementById("fav-list");if(!el)return;
if(!state.favorites.length){el.innerHTML='<div class="tc card"><p style="font-weight:800">No favorites yet</p><p style="color:#999;font-size:.85rem">Tap hearts to save wines</p></div>';return;}
el.innerHTML=state.favorites.map(function(k){var w=WINE_DB[k];if(!w)return"";var bg=w.type==="red"?"var(--peach)":"var(--lilac)";return'<div class="gi" onclick="demoScan(\''+k+'\')"><div class="gi-c" style="background:'+bg+'">'+w.emoji+'</div><div class="gi-i"><div class="gi-n">'+w.name+'</div><div class="gi-s">'+w.type+' · '+((w.regions||[])[0]||"")+'</div></div></div>'}).join("");
}

function renderGrapeList(){
var el=document.getElementById("grape-list");if(!el)return;
var q=(document.getElementById("explore-search")||{}).value;
q=q?q.toLowerCase():"";
var items=[];
Object.keys(WINE_DB).forEach(function(k){
var w=WINE_DB[k];
if(state.exploreFilter&&state.exploreFilter!=="all"){
if(state.exploreFilter==="joval"){if(!JOVAL_WINES.some(function(j){return j.grape===k}))return}
else if(w.type!==state.exploreFilter)return;
}
if(q&&w.name.toLowerCase().indexOf(q)<0&&!(w.regions||[]).some(function(r){return r.toLowerCase().indexOf(q)>=0}))return;
items.push({key:k,isJoval:false,name:w.name,emoji:w.emoji,type:w.type,region:(w.regions||[])[0]||""});
});
if(!state.exploreFilter||state.exploreFilter==="all"||state.exploreFilter==="joval"){
JOVAL_WINES.forEach(function(j){
if(q&&j.name.toLowerCase().indexOf(q)<0&&j.brand.toLowerCase().indexOf(q)<0&&j.region.toLowerCase().indexOf(q)<0)return;
items.push({key:j.grape,isJoval:true,name:j.name,brand:j.brand,region:j.region,points:j.points,price:j.price,id:j.id});
});}
el.innerHTML=items.slice(0,80).map(function(w){
if(w.isJoval){return'<div class="gi" onclick="demoScan(\''+w.key+'\')"><div class="gi-c" style="background:var(--sunbg)">'+String.fromCodePoint(0x1F377)+'</div><div class="gi-i"><div class="gi-n">'+w.name+' <span class="joval-tag">JOVAL</span></div><div class="gi-s">'+w.brand+' · '+w.region+' · '+w.points+'pts</div><div style="display:flex;align-items:center;gap:6px;margin-top:4px"><span class="price-tag" style="font-size:.95rem">$'+w.price+'</span>'+stockLabel(w.id)+' '+cartBtn(w.id,"xs")+'</div></div></div>';}
var bg=w.type==="red"?"var(--peach)":w.type==="white"?"var(--lilac)":"var(--mintbg)";
return'<div class="gi" onclick="demoScan(\''+w.key+'\')"><div class="gi-c" style="background:'+bg+'">'+w.emoji+'</div><div class="gi-i"><div class="gi-n">'+w.name+'</div><div class="gi-s">'+w.type+' · '+w.region+'</div></div></div>';
}).join("");
}

function filterExplore(){renderGrapeList()}
function setExploreFilter(f,btn){
state.exploreFilter=f;
document.querySelectorAll("#screen-explore .mc").forEach(function(b){b.classList.remove("active")});
if(btn)btn.classList.add("active");
renderGrapeList();
}

function renderMeals(cat){
cat=cat||"all";var el=document.getElementById("meal-list");if(!el)return;
var items=[];
if(cat==="all"){Object.keys(MEALS_DB).forEach(function(c){MEALS_DB[c].forEach(function(m){items.push(m)})})}
else{items=MEALS_DB[cat]||[]}
el.innerHTML=items.map(function(m){
var jp=m.jovalPick?JOVAL_WINES.find(function(j){return j.name===m.jovalPick}):null;
return'<div class="mi"><div style="font-size:1.8rem;flex-shrink:0">'+m.emoji+'</div><div style="flex:1"><div style="font-weight:800;font-size:.9rem">'+m.name+'</div><div style="margin-top:6px">'+m.wines.map(function(w){var wd=WINE_DB[w]||{};return'<button class="btn btn-xs btn-ghost" onclick="demoScan(\''+w+'\')" style="margin:2px">'+(wd.emoji||"")+' '+(wd.name||w)+'</button>'}).join("")+'</div>'+(jp?'<div style="display:flex;align-items:center;gap:6px;margin-top:6px;flex-wrap:wrap"><span class="joval-tag">JOVAL</span><span style="font-size:.8rem;font-weight:700">'+jp.name+'</span><span class="price-tag" style="font-size:.9rem">$'+jp.price+'</span>'+cartBtn(jp.id,"xs")+'</div>':'')+'</div></div>'}).join("");
}

function filterMeals(cat){
document.querySelectorAll("#screen-meals .mc").forEach(function(b){b.classList.remove("active")});
if(event&&event.target)event.target.classList.add("active");
renderMeals(cat);
}

function setStars(n){
state.currentStars=n;
document.querySelectorAll("#star-input span").forEach(function(s,i){s.classList.toggle("active",i<n)});
}
function setEmoji(el,e){
state.currentEmoji=e;
document.querySelectorAll("#emoji-input span").forEach(function(s){s.classList.remove("active")});
el.classList.add("active");
}
function submitReview(){
if(!state.currentWine){showToast("Scan a wine first!");return}
if(!state.currentStars){showToast("Tap some stars!");return}
state.reviews.push({wine:state.currentWine.name||state.currentWine.key,stars:state.currentStars,emoji:state.currentEmoji,text:document.getElementById("review-text").value,date:Date.now()});
saveState();showToast("Review posted!");addXP(5);
document.getElementById("review-text").value="";state.currentStars=0;state.currentEmoji="";
document.querySelectorAll("#star-input span, #emoji-input span").forEach(function(s){s.classList.remove("active")});
checkBadges();
}

function redeemCoupon(){
var code=(document.getElementById("coupon-input").value||"").toUpperCase().trim();
if(!code){showToast("Enter a code!");return}
var c=state.adminCoupons.find(function(x){return x.code===code&&!x.used&&(!x.limit||x.timesUsed<x.limit)});
if(c){if(!c.timesUsed)c.timesUsed=0;c.timesUsed++;state.totalCouponsUsed++;
if(c.limit&&c.timesUsed>=c.limit)c.used=true;
state.coupons.push({code:c.code,pct:c.pct,type:c.type||"percent",date:Date.now()});
saveState();showToast(c.pct+(c.type==="dollar"?"$ off":"% off")+"!");}
else{showToast("Invalid or expired")}
document.getElementById("coupon-input").value="";renderVouchers();
}

function renderVouchers(){
var el=document.getElementById("voucher-list");if(!el)return;
el.innerHTML=state.coupons.length?state.coupons.map(function(c){return'<div class="rc"><strong>'+c.code+'</strong> — '+(c.type==="dollar"?"$":"")+c.pct+(c.type!=="dollar"?"%":"")+ ' off<br><span style="font-size:.7rem;color:#999">'+new Date(c.date).toLocaleDateString()+'</span></div>'}).join(""):'<div class="tc" style="color:#999;padding:20px">No vouchers yet</div>';
}

function updateWOTDHome(){
var keys=Object.keys(WINE_DB);
var dk=state.featuredWine||keys[new Date().getDate()%keys.length];
var w=WINE_DB[dk];if(!w)return;
var e1=document.getElementById("wotd-emoji"),e2=document.getElementById("wotd-name"),e3=document.getElementById("wotd-grape");
if(e1)e1.textContent=w.emoji;if(e2)e2.textContent=w.name;if(e3)e3.textContent=w.type+" · Tap for details";
}
function renderWOTD(){
var keys=Object.keys(WINE_DB);
var dk=state.featuredWine||keys[new Date().getDate()%keys.length];
showWineResult(dk,"wotd");
}

function selectVibe(el,vibe){
if(!state.vibeUsed)state.vibeUsed=0;state.vibeUsed++;saveState();checkBadges();
document.querySelectorAll("#screen-vibe .vc").forEach(function(v){v.classList.remove("selected")});
el.classList.add("selected");
var v=VIBES_DB[vibe];if(!v)return;
var jp=v.jovalPick?JOVAL_WINES.find(function(j){return j.name===v.jovalPick}):null;
var h='<div class="card bounce"><h3>'+v.emoji+' '+v.name+'</h3><p style="color:#999;margin:6px 0">'+v.desc+'</p>';
if(jp)h+='<div style="display:flex;align-items:center;gap:6px;margin:8px 0;flex-wrap:wrap"><span class="joval-tag">JOVAL</span><strong style="font-size:.85rem">'+jp.name+'</strong><span class="price-tag" style="font-size:.9rem">$'+jp.price+'</span>'+cartBtn(jp.id,"xs")+'</div>';
h+='<div class="mt2">'+v.wines.map(function(w){var wd=WINE_DB[w]||{};return'<button class="btn btn-xs btn-ghost" onclick="demoScan(\''+w+'\')" style="margin:2px">'+(wd.emoji||"")+' '+(wd.name||w)+'</button>'}).join("")+'</div></div>';
document.getElementById("vibe-results").innerHTML=h;
}

function drawRouletteWheel(){
var c=document.getElementById("roulette-canvas");if(!c)return;
var ctx=c.getContext("2d");
var grapes=["shiraz","pinot_noir","chardonnay","malbec","riesling","grenache","sauvignon_blanc","gamay"];
var colors=["#FF6363","#7C5CFC","#FFD93D","#FF8FAB","#6BCB77","#FFE5D9","#E8DEFF","#DFFFD6"];
var n=grapes.length,a=2*Math.PI/n;
ctx.clearRect(0,0,300,300);
grapes.forEach(function(g,i){
ctx.beginPath();ctx.moveTo(150,150);ctx.arc(150,150,145,a*i,a*(i+1));
ctx.fillStyle=colors[i];ctx.fill();ctx.save();ctx.translate(150,150);ctx.rotate(a*i+a/2);
ctx.fillStyle="#1A1A2E";ctx.font="bold 11px Nunito";ctx.fillText((WINE_DB[g]||{}).name||g,35,4);ctx.restore();
});
ctx.beginPath();ctx.arc(150,150,20,0,2*Math.PI);ctx.fillStyle="#fff";ctx.fill();
}

function spinRoulette(){
var btn=document.getElementById("spin-btn");if(btn)btn.disabled=true;
var grapes=["shiraz","pinot_noir","chardonnay","malbec","riesling","grenache","sauvignon_blanc","gamay"];
var winner=grapes[Math.floor(Math.random()*grapes.length)];
var w=WINE_DB[winner];
showToast("Spinning...");addXP(1);
setTimeout(function(){
var jp=JOVAL_WINES.find(function(j){return j.grape===winner});
document.getElementById("roulette-result").innerHTML='<div class="card tc bounce"><div style="font-size:3rem">'+w.emoji+'</div><h2 style="color:var(--coral)">'+w.name+'</h2><p style="color:#999;margin:6px 0;font-size:.9rem">'+w.plainEnglish+'</p>'+(jp?'<div style="margin:8px 0"><span class="price-tag">$'+jp.price+'</span> '+cartBtn(jp.id,"sm")+'</div>':'')+'<button class="btn btn-purple mt2" onclick="demoScan(\''+winner+'\')">Details</button></div>';
if(btn)btn.disabled=false;
},1800);
}

function updateBudget(){
state.budgetVal=document.getElementById("budget-range").value;
document.getElementById("budget-val").textContent=state.budgetVal;
}
function findBudgetWines(){
var b=parseInt(state.budgetVal)||25;
var matches=JOVAL_WINES.filter(function(j){return j.price<=b}).sort(function(a,c){return c.points-a.points}).slice(0,12);
var el=document.getElementById("budget-results");if(!el)return;
if(!matches.length){el.innerHTML='<div class="tc card"><p style="font-weight:800">Nothing under $'+b+'</p><p style="color:#999">Bump it up a bit</p></div>';return}
el.innerHTML='<div class="sect">'+matches.length+' wines under $'+b+'</div>'+matches.map(function(j){
var bg=j.type==="red"?"var(--peach)":j.type==="white"?"var(--lilac)":"var(--mintbg)";
return'<div class="gi" onclick="demoScan(\''+j.grape+'\')"><div class="gi-c" style="background:'+bg+'">'+String.fromCodePoint(0x1F377)+'</div><div class="gi-i"><div class="gi-n">'+j.name+'</div><div class="gi-s">'+j.brand+' · '+j.region+' · <span class="points-badge">'+j.points+'pts</span></div><div style="display:flex;align-items:center;gap:6px;margin-top:4px"><span class="price-tag" style="font-size:.95rem">$'+j.price+'</span>'+stockLabel(j.id)+' '+cartBtn(j.id,"xs")+'</div></div></div>'}).join("");
}

/* ===== QUIZ ===== */
function startQuiz(){
if(typeof QUIZ_QUESTIONS==="undefined"||!QUIZ_QUESTIONS||!QUIZ_QUESTIONS.length){
showToast("Quiz data loading...");return;
}
state.quizStep=0;
state.quizAnswers=[];
showQuizQuestion();
}

function showQuizQuestion(){
if(typeof QUIZ_QUESTIONS==="undefined"||!QUIZ_QUESTIONS)return;
var q=QUIZ_QUESTIONS[state.quizStep];
if(!q){showQuizResult();return;}
var el=document.getElementById("quiz-container");
if(!el)return;
var colors=["var(--coral)","var(--purple)","var(--mint)","var(--sun)","var(--pink)"];
var pct=((state.quizStep)/QUIZ_QUESTIONS.length*100).toFixed(0);
el.innerHTML='<div style="margin-bottom:14px"><div style="background:#ede6de;border-radius:8px;height:6px;overflow:hidden"><div style="width:'+pct+'%;height:100%;background:var(--purple);border-radius:8px;transition:width .4s ease"></div></div><div style="font-size:.7rem;color:#999;font-weight:700;margin-top:4px">'+(state.quizStep+1)+' of '+QUIZ_QUESTIONS.length+'</div></div><h3 style="margin:14px 0;font-size:1.15rem;line-height:1.4">'+q.q+'</h3>'+q.options.map(function(o,i){
return'<div class="qo" onclick="answerQuiz(\''+o.value+'\')" style="border-left:4px solid '+colors[i%colors.length]+'">'+o.text+'</div>';
}).join("");
}

function answerQuiz(val){
state.quizAnswers.push(val);
state.quizStep++;
showQuizQuestion();
}

function showQuizResult(){
if(typeof TWIN_RESULTS==="undefined"||!TWIN_RESULTS)return;
var counts={};
state.quizAnswers.forEach(function(a){counts[a]=(counts[a]||0)+1});
var sorted=Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]});
var winner=sorted[0]||"A";
var r=TWIN_RESULTS[winner];
if(!r){showToast("Result not found!");return;}
var jp=JOVAL_WINES.find(function(j){return j.grape===r.grape});
var el=document.getElementById("quiz-container");
if(!el)return;
el.innerHTML='<div class="rh bounce"><div class="re">'+r.emoji+'</div><div class="rn">You are '+r.name+'!</div></div>'+
'<div class="card"><p style="font-size:1rem;line-height:1.7">'+r.desc+'</p></div>'+
(jp?'<div class="card-sun" style="border-radius:var(--r)"><span class="joval-tag">JOVAL</span> <strong>'+jp.name+'</strong> <span class="price-tag">$'+jp.price+'</span><br><span style="font-size:.82rem">'+jp.desc+'</span><br><div style="margin-top:8px">'+cartBtn(jp.id,"sm")+'</div></div>':'')+
'<button class="btn btn-purple mt2" onclick="demoScan(\''+r.grape+'\')">Meet Your Twin</button>'+
'<button class="btn btn-ghost mt2" onclick="startQuiz()">Again</button>'+
'<button class="btn btn-ghost mt2" onclick="nav(\'screen-splash\')">Home</button>';
addXP(10);checkBadges();
}