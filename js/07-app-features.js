/* Slurper v5.1 - Features - FIXED */
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
if(s<=0)return "<span class=\"stock-out\">Out of stock</span>";
if(s<=5)return "<span class=\"stock-low\">Only "+s+" left!</span>";
return "<span class=\"stock-ok\">In stock</span>";
}
function cartBtn(wineId,size){
var s=getStock(wineId);
var cls=size==="xs"?"btn-xs":"btn-sm";
if(s<=0)return "<span class=\"btn "+cls+" btn-ghost\" style=\"opacity:.5\">Sold out</span>";
return "<button class=\"btn "+cls+" btn-coral\" onclick=\"addToCart("+wineId+")\">Add</button>";
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
var h="<div class=\"hdr\"><button class=\"hdr-back\" onclick=\"nav('screen-explore')\">&larr;</button>";
h+="<div class=\"hdr-title\">"+w.name+"</div></div>";
h+="<div class=\"rh\"><div style=\"display:inline-block;background:"+mc+";color:#fff;padding:4px 14px;border-radius:50px;font-size:.78rem;font-weight:800;margin-bottom:8px\">"+matchPct+"% match</div>";
h+="<div class=\"re\">"+w.emoji+"</div>";
h+="<div class=\"rn\">"+w.name+"</div>";
h+="<div class=\"rg\">"+(w.type==="red"?"Red":w.type==="white"?"White":"Rosé")+" · "+(w.priceRange||"$$")+"</div></div>";
h+="<div class=\"pad\">";
h+="<div class=\"rs\"><h3>In Plain English</h3><div class=\"pe\">"+w.plainEnglish+"</div></div>";
h+="<div class=\"rs\"><h3>Taste Profile</h3>";
[["Body",w.body,"#C4603C"],["Sweet",w.sweetness,"#6B7F5E"],["Zing",w.acidity,"#A3B18A"],["Grip",w.tannin,"#3D5A80"],["Booze",w.alcohol,"#D4856B"]].forEach(function(b){
h+="<div class=\"tm\"><span class=\"tml\">"+b[0]+"</span><div class=\"tmb\"><div class=\"tmf\" style=\"width:"+(b[1]/5*100)+"%;background:"+b[2]+"\"></div></div></div>";
});
h+="</div>";
h+="<div class=\"rs\"><h3>Aromas</h3>"+(w.aromas||[]).map(function(a){return "<span class=\"badge badge-mint\">"+a+"</span>"}).join(" ")+"</div>";
h+="<div class=\"rs\"><h3>Regions</h3>"+(w.regions||[]).map(function(r){return "<span class=\"badge badge-purple\">"+r+"</span>"}).join(" ")+"</div>";
if(w.foodPairings&&w.foodPairings.length){
h+="<div class=\"rs\"><h3>Perfect With</h3>";
w.foodPairings.forEach(function(p){h+="<div class=\"gi\"><div class=\"gi-c\" style=\"background:var(--peach)\">"+p.emoji+"</div><div class=\"gi-i\"><div class=\"gi-n\">"+p.name+"</div><div class=\"gi-s\">"+p.desc+"</div></div></div>"});
h+="</div>";
}
if(w.cheese){h+="<div class=\"rs\"><h3>Cheese</h3>"+w.cheese.map(function(c){return "<span class=\"badge badge-sun\">"+c+"</span>"}).join(" ")+"</div>";}
if(w.funFact){h+="<div class=\"rs\"><h3>Fun Fact</h3><div class=\"pe\">"+w.funFact+"</div></div>";}
if(jMatches.length){
h+="<div class=\"rs\"><h3>JOVAL — Buy These</h3>";
jMatches.forEach(function(j){
h+="<div class=\"gi\" style=\"flex-wrap:wrap\"><div class=\"gi-c\" style=\"background:var(--peach)\">"+w.emoji+"</div><div class=\"gi-i\"><div class=\"gi-n\">"+j.name+" <span class=\"joval-tag\">JOVAL</span></div><div class=\"gi-s\">"+j.brand+" · "+j.region+" · "+j.points+"pts</div><div style=\"margin-top:6px\"><span class=\"price-tag\">$"+j.price+"</span> "+stockLabel(j.id)+" "+cartBtn(j.id,"sm")+"</div></div></div>";
});
h+="</div>";
}
h+="<div class=\"g2 mt3\">";
h+="<button class=\"btn btn-ghost\" onclick=\"nav('screen-reviews')\">💬 Review</button>";
h+="<button class=\"btn "+(isFav?"btn-coral":"btn-ghost")+"\" onclick=\"toggleFav('"+key+"')\">"+(isFav?"❤️ Faved":"🤍 Fave")+"</button>";
h+="</div>";
h+="<div class=\"g2 mt2\">";
h+="<button class=\"btn btn-ghost btn-sm\" onclick=\"addToCellar()\">🏰 Cellar</button>";
h+="<button class=\"btn btn-ghost btn-sm\" onclick=\"shareWine()\">📤 Share</button>";
h+="</div>";
h+="</div>";
document.getElementById("screen-result").innerHTML=h;
document.getElementById("review-wine-name").textContent=w.name;
nav("screen-result");addXP(2);
}
function demoScan(key){showWineResult(key,"demo");}
function toggleFav(key){
var i=state.favorites.indexOf(key);
if(i>-1){state.favorites.splice(i,1);showToast("Removed")}
else{state.favorites.push(key);showToast("Faved!");addXP(3);if(typeof logActivity==="function")logActivity("fav","Favourited "+(WINE_DB[key]||{}).name)}
saveState();checkBadges();showWineResult(key,"fav");
}
function renderFavorites(){
var el=document.getElementById("fav-list");if(!el)return;
if(!state.favorites.length){el.innerHTML="<div class=\"card tc\"><p style=\"color:#7A8A8A\">No favorites yet</p><p style=\"font-size:.85rem;color:#aaa\">Tap hearts to save wines</p></div>";return;}
el.innerHTML=state.favorites.map(function(k){var w=WINE_DB[k];if(!w)return"";var bg=w.type==="red"?"var(--peach)":"var(--lilac)";return "<div class=\"gi\" onclick=\"showWineResult('"+k+"','fav')\"><div class=\"gi-c\" style=\"background:"+bg+"\">"+w.emoji+"</div><div class=\"gi-i\"><div class=\"gi-n\">"+w.name+"</div><div class=\"gi-s\">"+w.type+" · "+((w.regions||[])[0]||"")+"</div></div></div>"}).join("");
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
if(w.isJoval){return "<div class=\"gi\" onclick=\"showWineResult('"+w.key+"','explore')\"><div class=\"gi-c\" style=\"background:var(--peach)\">"+String.fromCodePoint(0x1F377)+"</div><div class=\"gi-i\"><div class=\"gi-n\">"+w.name+" <span class=\"joval-tag\">JOVAL</span></div><div class=\"gi-s\">"+w.brand+" · "+w.region+" · "+w.points+"pts</div><div style=\"margin-top:4px\"><span class=\"price-tag\">$"+w.price+"</span> "+stockLabel(w.id)+" "+cartBtn(w.id,"xs")+"</div></div></div>";}
var bg=w.type==="red"?"var(--peach)":w.type==="white"?"var(--lilac)":"var(--mintbg)";
return "<div class=\"gi\" onclick=\"showWineResult('"+w.key+"','explore')\"><div class=\"gi-c\" style=\"background:"+bg+"\">"+w.emoji+"</div><div class=\"gi-i\"><div class=\"gi-n\">"+w.name+"</div><div class=\"gi-s\">"+w.type+" · "+w.region+"</div></div></div>";
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
return "<div class=\"card\"><div style=\"display:flex;align-items:center;gap:10px;margin-bottom:8px\"><span style=\"font-size:1.8rem\">"+m.emoji+"</span><strong style=\"font-size:1rem\">"+m.name+"</strong></div><div style=\"margin-bottom:8px\">"+m.wines.map(function(w){var wd=WINE_DB[w]||{};return "<span class=\"badge badge-coral\" onclick=\"showWineResult('"+w+"','meal')\" style=\"cursor:pointer\">"+(wd.emoji||"")+" "+(wd.name||w)+"</span>"}).join(" ")+"</div>"+(jp?"<div style=\"background:var(--sunbg);padding:10px 14px;border-radius:12px\"><span class=\"joval-tag\">JOVAL</span> <strong>"+jp.name+"</strong> <span class=\"price-tag\">$"+jp.price+"</span> "+cartBtn(jp.id,"xs")+"</div>":"")+"</div>"
}).join("");
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
if(typeof logActivity==="function")logActivity("review","Reviewed "+(state.currentWine.name||"a wine")+" - "+state.currentStars+" stars");
if(typeof checkAdventureProgress==="function")checkAdventureProgress();
document.getElementById("review-text").value="";state.currentStars=0;state.currentEmoji="";
checkBadges();
}
function redeemCoupon(){
var code=(document.getElementById("coupon-input").value||"").toUpperCase().trim();
if(!code){showToast("Enter a code!");return}
var c=state.adminCoupons.find(function(x){return x.code===code&&!x.used});
if(c){
if(c.limit&&c.timesUsed>=c.limit)c.used=true;
state.coupons.push({code:c.code,pct:c.pct,type:c.type||"percent",date:Date.now()});
state.totalCouponsUsed=(state.totalCouponsUsed||0)+1;
c.timesUsed=(c.timesUsed||0)+1;
saveState();showToast(c.pct+(c.type==="dollar"?"$ off":"% off")+"!");}
else{showToast("Invalid or expired")}
document.getElementById("coupon-input").value="";renderVouchers();
}
function renderVouchers(){
var el=document.getElementById("voucher-list");if(!el)return;
el.innerHTML=state.coupons.length?state.coupons.map(function(c){return "<div class=\"card\"><strong>"+c.code+"</strong> — "+(c.type==="dollar"?"$":"")+c.pct+(c.type!=="dollar"?"%":"")+" off<div style=\"font-size:.75rem;color:#7A8A8A;margin-top:3px\">"+new Date(c.date).toLocaleDateString()+"</div></div>"}).join(""):"<div class=\"card tc\"><p style=\"color:#7A8A8A\">No vouchers yet</p></div>";
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
var h="<div class=\"card\"><h3 style=\"font-weight:900\">"+v.emoji+" "+v.name+"</h3><p style=\"color:#7A8A8A;margin:6px 0\">"+v.desc+"</p>";
if(jp)h+="<div style=\"background:var(--sunbg);padding:10px 14px;border-radius:12px;margin:8px 0\"><span class=\"joval-tag\">JOVAL</span> <strong>"+jp.name+"</strong> <span class=\"price-tag\">$"+jp.price+"</span> "+cartBtn(jp.id,"xs")+"</div>";
h+="<div style=\"margin-top:8px\">"+v.wines.map(function(w){var wd=WINE_DB[w]||{};return "<span class=\"badge badge-coral\" onclick=\"showWineResult('"+w+"','vibe')\" style=\"cursor:pointer\">"+(wd.emoji||"")+" "+(wd.name||w)+"</span>"}).join(" ")+"</div></div>";
document.getElementById("vibe-results").innerHTML=h;
}
function drawRouletteWheel(){
var c=document.getElementById("roulette-canvas");if(!c)return;
var ctx=c.getContext("2d");
var grapes=["shiraz","pinot_noir","chardonnay","malbec","riesling","grenache","sauvignon_blanc","gamay"];
var colors=["#C4603C","#3D5A80","#6B7F5E","#D4856B","#A3B18A","#F0E5DA","#D5DFE8","#E5EDE0"];
var n=grapes.length,a=2*Math.PI/n;
ctx.clearRect(0,0,300,300);
grapes.forEach(function(g,i){
ctx.beginPath();ctx.moveTo(150,150);ctx.arc(150,150,145,a*i,a*(i+1));
ctx.fillStyle=colors[i];ctx.fill();ctx.save();ctx.translate(150,150);ctx.rotate(a*i+a/2);
ctx.fillStyle="#1B2838";ctx.font="bold 11px Nunito";ctx.fillText((WINE_DB[g]||{}).name||g,35,4);ctx.restore();
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
document.getElementById("roulette-result").innerHTML="<div class=\"card tc bounce\"><div style=\"font-size:3rem\">"+w.emoji+"</div><h3 style=\"font-weight:900\">"+w.name+"</h3><p style=\"color:#7A8A8A;margin:8px 0;font-size:.9rem\">"+w.plainEnglish+"</p>"+(jp?"<div style=\"margin:8px 0\"><span class=\"price-tag\">$"+jp.price+"</span> "+cartBtn(jp.id,"sm")+"</div>":"")+"<button class=\"btn btn-purple btn-sm mt2\" onclick=\"showWineResult('"+winner+"','roulette')\">Details</button></div>";
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
if(!matches.length){el.innerHTML="<div class=\"card tc\"><p style=\"color:#7A8A8A\">Nothing under $"+b+"</p><p style=\"font-size:.85rem;color:#aaa\">Bump it up a bit</p></div>";return}
el.innerHTML="<div class=\"sect\">"+matches.length+" wines under $"+b+"</div>"+matches.map(function(j){
var bg=j.type==="red"?"var(--peach)":j.type==="white"?"var(--lilac)":"var(--mintbg)";
return "<div class=\"gi\" onclick=\"showWineResult('"+j.grape+"','budget')\"><div class=\"gi-c\" style=\"background:"+bg+"\">"+String.fromCodePoint(0x1F377)+"</div><div class=\"gi-i\"><div class=\"gi-n\">"+j.name+"</div><div class=\"gi-s\">"+j.brand+" · "+j.region+" · "+j.points+"pts</div><div style=\"margin-top:4px\"><span class=\"price-tag\">$"+j.price+"</span> "+stockLabel(j.id)+" "+cartBtn(j.id,"xs")+"</div></div></div>"
}).join("");
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
el.innerHTML="<div style=\"background:var(--lilac);border-radius:50px;height:8px;overflow:hidden;margin-bottom:16px\"><div style=\"height:100%;background:var(--purple);width:"+pct+"%\"></div></div><div style=\"font-size:.78rem;color:#7A8A8A;font-weight:700;margin-bottom:10px\">"+(state.quizStep+1)+" of "+QUIZ_QUESTIONS.length+"</div><h3 style=\"font-weight:900;font-size:1.2rem;margin-bottom:16px\">"+q.q+"</h3>"+q.options.map(function(o,i){
return "<div class=\"qo\" onclick=\"answerQuiz('"+o.value+"')\" style=\"border-left:4px solid "+colors[i%colors.length]+"\">"+o.text+"</div>";
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
el.innerHTML="<div class=\"rh bounce\" style=\"background:linear-gradient(135deg,var(--peach),var(--lilac))\"><div style=\"font-size:4rem\">"+r.emoji+"</div><div style=\"font-size:1.6rem;font-weight:900;margin-top:8px\">You are "+r.name+"!</div></div>"+
"<div class=\"pe\" style=\"margin:16px 0;font-size:.95rem;line-height:1.7\">"+r.desc+"</div>"+
(jp?"<div class=\"card\" style=\"border-left:4px solid var(--coral)\"><span class=\"joval-tag\">JOVAL</span> <strong>"+jp.name+"</strong> <span class=\"price-tag\">$"+jp.price+"</span><div style=\"font-size:.82rem;color:#7A8A8A;margin:4px 0\">"+jp.desc+"</div>"+cartBtn(jp.id,"sm")+"</div>":"")+
"<button class=\"btn btn-purple mt3\" onclick=\"showWineResult('"+r.grape+"','quiz')\">Meet Your Twin</button>"+
"<button class=\"btn btn-ghost mt2\" onclick=\"startQuiz()\">🔄 Again</button>"+
"<button class=\"btn btn-ghost mt2\" onclick=\"nav('screen-splash')\">🏠 Home</button>";
addXP(10);checkBadges();if(typeof logActivity==="function")logActivity("quiz","Completed Wine Twin Quiz");
}

/* ===== v5 NEW FEATURES ===== */
function renderFeed(){
var el=document.getElementById("feed-list");if(!el)return;
if(!state.activityLog||!state.activityLog.length){
el.innerHTML="<div class=\"card tc\"><p style=\"color:#7A8A8A;font-weight:600\">No activity yet</p><p style=\"font-size:.85rem;color:#aaa\">Start exploring wines to see your feed!</p></div>";return;}
var icons={review:"\u2B50",fav:"\u2764\uFE0F",order:"\uD83D\uDED2",badge:"\uD83C\uDFC5",crew:"\uD83E\uDEC2",adventure:"\uD83C\uDFD4\uFE0F",journal:"\uD83D\uDCD3",quiz:"\uD83E\uDDE0",general:"\uD83D\uDC41\uFE0F"};
el.innerHTML=state.activityLog.slice(0,50).map(function(a){
var icon=icons[a.type]||icons.general;
var d=new Date(a.date);
var time=d.toLocaleDateString()+" "+d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
return "<div class=\"mi\"><div style=\"font-size:1.6rem;width:40px;text-align:center\">"+icon+"</div><div style=\"flex:1\"><div style=\"font-weight:700;font-size:.88rem\">"+a.detail+"</div><div style=\"font-size:.72rem;color:#8A9494\">"+time+"</div></div></div>";
}).join("");
}
function calculateTasteDNA(){
var totals={body:0,sweetness:0,acidity:0,tannin:0,alcohol:0};
var count=0;
if(state.reviews&&state.reviews.length){
state.reviews.forEach(function(r){
var w=null;
Object.keys(WINE_DB).forEach(function(k){if(WINE_DB[k].name===r.wine)w=WINE_DB[k]});
if(w){totals.body+=w.body;totals.sweetness+=w.sweetness;totals.acidity+=w.acidity;totals.tannin+=w.tannin;totals.alcohol+=w.alcohol;count++}
});}
if(count===0)return{body:3,sweetness:2,acidity:3,tannin:2,alcohol:3};
return{body:totals.body/count,sweetness:totals.sweetness/count,acidity:totals.acidity/count,tannin:totals.tannin/count,alcohol:totals.alcohol/count};
}
function drawRadarChart(canvasId,data){
var c=document.getElementById(canvasId);if(!c)return;
var ctx=c.getContext("2d");
var W=c.width,H=c.height,cx=W/2,cy=H/2,R=Math.min(W,H)/2-40;
ctx.clearRect(0,0,W,H);
var labels=["Body","Sweet","Zing","Grip","Booze"];
var vals=[data.body,data.sweetness,data.acidity,data.tannin,data.alcohol];
var n=5,angle=2*Math.PI/n,startAngle=-Math.PI/2;
[0.2,0.4,0.6,0.8,1.0].forEach(function(scale){
ctx.beginPath();
for(var i=0;i<n;i++){var a=startAngle+angle*i;ctx.lineTo(cx+R*scale*Math.cos(a),cy+R*scale*Math.sin(a))}
ctx.closePath();ctx.strokeStyle="rgba(27,40,56,.12)";ctx.lineWidth=1;ctx.stroke();
});
ctx.beginPath();
for(var i=0;i<n;i++){var a=startAngle+angle*i;var v=Math.max(0,Math.min(5,vals[i]))/5;ctx.lineTo(cx+R*v*Math.cos(a),cy+R*v*Math.sin(a))}
ctx.closePath();ctx.fillStyle="rgba(196,96,60,.25)";ctx.fill();ctx.strokeStyle="#C4603C";ctx.lineWidth=2.5;ctx.stroke();
for(var i=0;i<n;i++){var a=startAngle+angle*i;var v=Math.max(0,Math.min(5,vals[i]))/5;ctx.beginPath();ctx.arc(cx+R*v*Math.cos(a),cy+R*v*Math.sin(a),4,0,2*Math.PI);ctx.fillStyle="#C4603C";ctx.fill();}
ctx.fillStyle="#1B2838";ctx.font="bold 12px Nunito,sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";
for(var i=0;i<n;i++){var a=startAngle+angle*i;var lx=cx+(R+22)*Math.cos(a);var ly=cy+(R+22)*Math.sin(a);ctx.fillText(labels[i],lx,ly);}
}
function renderTasteDNA(){
var data=calculateTasteDNA();
drawRadarChart("dna-canvas",data);
var sumEl=document.getElementById("dna-summary");
if(sumEl){
var bodyDesc=data.body>3.5?"full-bodied":data.body>2.5?"medium-bodied":"light-bodied";
var acidDesc=data.acidity>3.5?"high acidity":data.acidity>2.5?"balanced acidity":"soft acidity";
var tanninDesc=data.tannin>3?"firm tannins":"gentle tannins";
sumEl.innerHTML="<div class=\"card\"><div class=\"sect\">Your Taste Profile</div><p style=\"font-size:.9rem;line-height:1.6\">You tend to prefer <strong>"+bodyDesc+"</strong> wines with <strong>"+acidDesc+"</strong> and <strong>"+tanninDesc+"</strong>. "+(data.sweetness>2?"You enjoy a touch of sweetness.":"You lean towards dry styles.")+"</p></div>";
}
var recEl=document.getElementById("dna-recs");
if(recEl){
var recs=JOVAL_WINES.filter(function(j){var w=WINE_DB[j.grape];if(!w)return false;var diff=Math.abs(w.body-data.body)+Math.abs(w.acidity-data.acidity)+Math.abs(w.tannin-data.tannin);return diff<4}).slice(0,6);
if(recs.length){
recEl.innerHTML="<div class=\"sect\">Recommended for You</div>"+recs.map(function(j){return "<div class=\"gi\" onclick=\"showWineResult('"+j.grape+"','dna')\"><div class=\"gi-c\" style=\"background:var(--peach)\">\uD83D\uDC8E</div><div class=\"gi-i\"><div class=\"gi-n\">"+j.name+"</div><div class=\"gi-s\">"+j.brand+" \u00B7 "+j.region+"</div></div></div>"}).join("");
}else{recEl.innerHTML="<div class=\"card tc\"><p style=\"color:#7A8A8A\">Rate more wines to get personalised recommendations!</p></div>";}
}
}
function renderAdventures(){
var el=document.getElementById("adventures-list");if(!el)return;
if(typeof ADVENTURES_DB==="undefined"){el.innerHTML="<div class=\"card tc\">Adventures loading...</div>";return;}
el.innerHTML=ADVENTURES_DB.map(function(adv){
var prog=state.adventures[adv.id]||{started:false,progress:[]};
var done=prog.progress?prog.progress.length:0;
var total=adv.wines.length;
var pct=Math.round(done/total*100);
var complete=done>=total;
return "<div class=\"card\" style=\"border-left:4px solid "+(complete?"var(--mint)":"var(--coral)")+"\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><div><span style=\"font-size:1.3rem\">"+adv.emoji+"</span> <strong>"+adv.name+"</strong></div><span class=\"points-badge\">"+(complete?"\u2705 Done":done+"/"+total)+"</span></div><p style=\"font-size:.82rem;color:#7A8A8A;margin:6px 0\">"+adv.desc+"</p><div class=\"tmb\" style=\"margin:6px 0\"><div class=\"tmf\" style=\"width:"+pct+"%;background:"+(complete?"var(--mint)":"var(--coral)")+"\"></div></div>"+(prog.started?"<div style=\"margin-top:6px\">Progress: "+adv.wines.map(function(w){var found=prog.progress&&prog.progress.indexOf(w)>-1;return "<span style=\"opacity:"+(found?1:0.3)+";font-size:1.2rem\">"+(WINE_DB[w]?WINE_DB[w].emoji:"\uD83C\uDF77")+"</span>"}).join(" ")+"</div>":"<button class=\"btn btn-sm btn-coral\" onclick=\"startAdventure('"+adv.id+"')\">Start Adventure</button>")+"</div>"
}).join("");
}
function startAdventure(id){
if(!state.adventures)state.adventures={};
if(state.adventures[id]&&state.adventures[id].started){showToast("Already started!");return;}
state.adventures[id]={started:true,progress:[],startDate:Date.now()};
saveState();
if(typeof logActivity==="function")logActivity("adventure","Started adventure: "+(ADVENTURES_DB.find(function(a){return a.id===id})||{}).name);
showToast("\uD83C\uDFD4\uFE0F Adventure started!");
renderAdventures();
}
function checkAdventureProgress(){
if(typeof ADVENTURES_DB==="undefined")return;
if(!state.adventures)return;
ADVENTURES_DB.forEach(function(adv){
var prog=state.adventures[adv.id];
if(!prog||!prog.started)return;
if(!prog.progress)prog.progress=[];
var wines=state.journey&&state.journey.wines?[...state.journey.wines]:[];
adv.wines.forEach(function(w){
if(wines.indexOf(w)>-1&&prog.progress.indexOf(w)<0){prog.progress.push(w)}
});
if(prog.progress.length>=adv.wines.length&&!prog.completed){
prog.completed=true;
addXP(adv.reward);
showToast("\uD83C\uDF89 Adventure complete! +"+adv.reward+" XP");
if(typeof logActivity==="function")logActivity("adventure","Completed adventure: "+adv.name);
}
});
saveState();
}
function renderRestaurant(){
var el=document.getElementById("restaurant-scenarios");if(!el)return;
if(typeof RESTAURANT_DB==="undefined"){el.innerHTML="<div class=\"card tc\">Loading...</div>";return;}
var h="";
Object.keys(RESTAURANT_DB).forEach(function(key){
var r=RESTAURANT_DB[key];
h+="<div class=\"vc\" onclick=\"selectRestaurantScenario('"+key+"')\"><span style=\"font-size:2rem;display:block;margin-bottom:4px\">"+r.emoji+"</span>"+r.name+"</div>";
});
el.innerHTML=h;
}
function selectRestaurantScenario(key){
if(typeof RESTAURANT_DB==="undefined")return;
var r=RESTAURANT_DB[key];if(!r)return;
var el=document.getElementById("restaurant-results");if(!el)return;
el.innerHTML="<div class=\"card\"><h3 style=\"font-weight:900\">"+r.emoji+" "+r.name+"</h3></div>"+r.courses.map(function(c,i){
var jp=c.jovalPick?JOVAL_WINES.find(function(j){return j.name===c.jovalPick}):null;
return "<div class=\"card\" style=\"border-left:4px solid var(--coral)\"><div style=\"font-size:.65rem;color:var(--purple);font-weight:900;letter-spacing:2px\">COURSE "+(i+1)+"</div><h4 style=\"font-weight:900;margin:4px 0\">"+c.course+"</h4><div style=\"margin:8px 0\">"+c.wines.map(function(w){var wd=WINE_DB[w]||{};return "<span class=\"badge badge-coral\">"+(wd.emoji||"")+" "+(wd.name||w)+"</span>"}).join(" ")+"</div>"+(jp?"<div style=\"background:var(--sunbg);padding:10px 14px;border-radius:12px\"><span class=\"joval-tag\">JOVAL</span> <strong>"+jp.name+"</strong> <span class=\"price-tag\">$"+jp.price+"</span></div>":"")+"</div>";
}).join("");
}
function renderCrew(){
var el=document.getElementById("crew-list");if(!el)return;
if(!state.crews||!state.crews.length){
el.innerHTML="<div class=\"card tc\" style=\"color:#7A8A8A\">No crews yet. Create or join one above!</div>";return;}
el.innerHTML=state.crews.map(function(crew){
return "<div class=\"card\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>\uD83E\uDEC2 "+crew.name+"</strong><span class=\"badge badge-purple\">"+crew.members.length+" member"+(crew.members.length>1?"s":"")+"</span></div><div style=\"font-size:.78rem;color:#7A8A8A;margin:6px 0\">Code: <strong>"+crew.code+"</strong> \u2014 share with friends!</div><div style=\"font-size:.78rem\">Members: "+crew.members.join(", ")+"</div>"+(crew.sharedFavs&&crew.sharedFavs.length?"<div class=\"sect mt2\">Shared Favourites</div><div>"+crew.sharedFavs.map(function(f){return "<span class=\"badge badge-mint\">"+f+"</span>"}).join(" ")+"</div>":"")+"</div>";
}).join("");
}
function createCrew(){
var nameInput=document.getElementById("crew-name-input");
var name=(nameInput?nameInput.value:"").trim();
if(!name){showToast("Enter a crew name!");return}
var chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
var code="";for(var i=0;i<6;i++)code+=chars.charAt(Math.floor(Math.random()*chars.length));
if(!state.crews)state.crews=[];
state.crews.push({name:name,code:code,members:["You"],sharedFavs:[],created:Date.now()});
saveState();
if(typeof logActivity==="function")logActivity("crew","Created crew: "+name);
showToast("\uD83E\uDEC2 Crew created! Code: "+code);
if(nameInput)nameInput.value="";
renderCrew();
}
function joinCrew(){
var codeInput=document.getElementById("crew-code-input");
var code=(codeInput?codeInput.value:"").toUpperCase().trim();
if(!code){showToast("Enter a crew code!");return}
if(!state.crews)state.crews=[];
var found=state.crews.find(function(c){return c.code===code});
if(found){
if(found.members.indexOf("Friend")<0)found.members.push("Friend");
saveState();
showToast("Joined "+found.name+"!");
if(typeof logActivity==="function")logActivity("crew","Joined crew: "+found.name);
}else{showToast("Crew not found \u2014 ask for the code!")}
if(codeInput)codeInput.value="";
renderCrew();
}
function renderJournal(){
var sel=document.getElementById("journal-wine");
if(sel&&sel.options.length<=1){
var opts="<option value=\"\">Select a wine...</option>";
JOVAL_WINES.forEach(function(j){opts+="<option value=\""+j.name+"\">"+j.name+"</option>"});
Object.keys(WINE_DB).forEach(function(k){opts+="<option value=\""+WINE_DB[k].name+"\">"+WINE_DB[k].name+"</option>"});
sel.innerHTML=opts;
}
var moodEl=document.getElementById("journal-mood");
if(moodEl&&typeof JOURNAL_MOODS!=="undefined"){
moodEl.innerHTML=JOURNAL_MOODS.map(function(m){
return "<span style=\"font-size:1.8rem;cursor:pointer;opacity:"+(state.journalMood===m.emoji?"1":".3")+";margin:0 4px\" onclick=\"selectJournalMood('"+m.emoji+"')\">"+m.emoji+"</span>";
}).join("");
}
var el=document.getElementById("journal-entries");if(!el)return;
if(!state.journal||!state.journal.length){
el.innerHTML="<div class=\"card tc\" style=\"color:#7A8A8A\">No entries yet. Start your wine diary!</div>";return;}
el.innerHTML=state.journal.slice().reverse().map(function(e){
return "<div class=\"card\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>"+e.wine+"</strong><span style=\"font-size:1.4rem\">"+e.mood+"</span></div><div style=\"font-size:.78rem;color:#7A8A8A;margin:4px 0\">"+e.date+(e.occasion?" \u00B7 "+e.occasion:"")+"</div>"+(e.notes?"<div class=\"pe\" style=\"margin-top:6px;font-size:.85rem\">"+e.notes+"</div>":"")+"</div>";
}).join("");
}
function selectJournalMood(emoji){
state.journalMood=emoji;
renderJournal();
}
function addJournalEntry(){
var wine=(document.getElementById("journal-wine")||{}).value||"";
var date=(document.getElementById("journal-date")||{}).value||new Date().toISOString().slice(0,10);
var occasion=(document.getElementById("journal-occasion")||{}).value||"";
var notes=(document.getElementById("journal-notes")||{}).value||"";
var mood=state.journalMood||"\uD83D\uDE0A";
if(!wine){showToast("Select a wine!");return}
if(!state.journal)state.journal=[];
state.journal.push({wine:wine,date:date,occasion:occasion,notes:notes,mood:mood,created:Date.now()});
state.journalMood="";
saveState();
if(typeof logActivity==="function")logActivity("journal","Journal entry: "+wine);
showToast("\uD83D\uDCD3 Entry saved!");
addXP(3);
var d=document.getElementById("journal-date");if(d)d.value="";
var w=document.getElementById("journal-wine");if(w)w.selectedIndex=0;
var o=document.getElementById("journal-occasion");if(o)o.value="";
var n=document.getElementById("journal-notes");if(n)n.value="";
renderJournal();
}
