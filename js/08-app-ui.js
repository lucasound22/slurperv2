/* Slurper v4 - UI & Ecom - FIXED */

function addToCart(id){
var wine=JOVAL_WINES.find(function(j){return j.id===id});
if(!wine){showToast("Wine not found");return;}
var s=getStock(id);if(s<=0){showToast("Out of stock!");return;}
var existing=state.cart.find(function(c){return c.id===id});
if(existing){
if(existing.qty>=s){showToast("Max stock reached");return;}
existing.qty++;
}else{
state.cart.push({id:id,name:wine.name,price:wine.price,qty:1,grape:wine.grape});
}
reserveStock(id,1);
saveState();updateCartBadge();showToast("Added to cart!");addXP(1);
}

function removeFromCart(idx){
var item=state.cart[idx];
if(item){reserveStock(item.id,-item.qty)}
state.cart.splice(idx,1);
saveState();updateCartBadge();renderCart();
}

function changeCartQty(idx,delta){
var item=state.cart[idx];if(!item)return;
var newQty=item.qty+delta;
if(newQty<=0){removeFromCart(idx);return;}
var s=getStock(item.id);
if(delta>0&&item.qty>=s){showToast("Max stock");return;}
item.qty=newQty;
reserveStock(item.id,delta);
saveState();updateCartBadge();renderCart();
}

function getCartTotal(){
var sub=0;
state.cart.forEach(function(c){sub+=c.price*c.qty});
var disc=0;
if(state.checkoutCoupon){
var cp=state.adminCoupons.find(function(x){return x.code===state.checkoutCoupon});
if(cp){
if(cp.type==="dollar")disc=cp.pct;
else disc=sub*(cp.pct/100);
}}
return{subtotal:sub,discount:disc,total:Math.max(0,sub-disc),shipping:sub>=100?0:9.95};
}

function getCartCount(){
var c=0;state.cart.forEach(function(i){c+=i.qty});return c;
}

function updateCartBadge(){
var c=getCartCount();
var badge=document.getElementById("nav-cart-badge");
if(badge){badge.textContent=c;badge.style.display=c>0?"inline":"none";}
}

function renderCart(){
var el=document.getElementById("cart-items");
var empty=document.getElementById("cart-empty");
var summary=document.getElementById("cart-summary");
if(!el)return;
if(!state.cart.length){
el.innerHTML="";
if(empty)empty.style.display="block";
if(summary)summary.classList.add("hid");
return;
}
if(empty)empty.style.display="none";
if(summary)summary.classList.remove("hid");
el.innerHTML=state.cart.map(function(item,idx){
return'<div class="gi"><div class="gi-c" style="background:var(--sunbg)">'+String.fromCodePoint(0x1F377)+'</div><div class="gi-i"><div class="gi-n">'+item.name+'</div><div class="gi-s">$'+item.price+' each</div><div style="display:flex;align-items:center;gap:8px;margin-top:6px"><button class="btn btn-xs btn-ghost" onclick="changeCartQty('+idx+',-1)">-</button><span style="font-weight:900">'+item.qty+'</span><button class="btn btn-xs btn-ghost" onclick="changeCartQty('+idx+',1)">+</button><button class="btn btn-xs btn-ghost" onclick="removeFromCart('+idx+')" style="margin-left:auto;color:var(--coral)">Remove</button></div></div></div>';
}).join("");
var totals=getCartTotal();
var ct=document.getElementById("cart-total");if(ct)ct.textContent="$"+totals.total.toFixed(2);
var cc=document.getElementById("cart-count-badge");if(cc)cc.textContent=getCartCount();
var cs=document.getElementById("cart-savings");
if(cs)cs.textContent=totals.discount>0?"You save $"+totals.discount.toFixed(2):"";
var pb=document.getElementById("cart-promo-banner");
if(pb&&state.promoBanner&&state.promoBanner.text){
pb.innerHTML='<div class="promo-banner" onclick="nav(\''+state.promoBanner.link+'\')">'+state.promoBanner.text+'</div>';
}
}

function startCheckout(){
var el=document.getElementById("checkout-content");if(!el)return;
var totals=getCartTotal();
var h='<div class="card"><div class="sect">Order Summary</div>';
state.cart.forEach(function(item){h+='<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0e8e0"><span style="font-weight:700">'+item.name+' x'+item.qty+'</span><span style="font-weight:800">$'+(item.price*item.qty).toFixed(2)+'</span></div>'});
h+='<div style="display:flex;justify-content:space-between;padding:8px 0;font-weight:900;font-size:1.1rem;border-top:2px solid var(--coral);margin-top:8px"><span>Total</span><span>$'+totals.total.toFixed(2)+'</span></div>';
if(totals.shipping>0)h+='<div style="font-size:.78rem;color:#999">+ $'+totals.shipping.toFixed(2)+' shipping (free over $100)</div>';
else h+='<div style="font-size:.78rem;color:var(--mint);font-weight:700">Free shipping!</div>';
h+='</div>';
h+='<div class="card"><div class="sect">Your Details</div>';
h+='<input type="text" id="checkout-name" placeholder="Full name">';
h+='<input type="email" id="checkout-email" placeholder="Email">';
h+='<input type="tel" id="checkout-phone" placeholder="Phone">';
h+='<input type="text" id="checkout-address" placeholder="Delivery address">';
h+='<input type="text" id="checkout-coupon" placeholder="Promo code (optional)" style="text-transform:uppercase">';
h+='<button class="btn btn-sun mt2" onclick="applyCheckoutCoupon()">Apply Code</button>';
h+='</div>';
h+='<button class="btn btn-coral mt2" onclick="placeOrder()">Place Order - $'+totals.total.toFixed(2)+'</button>';
el.innerHTML=h;
nav("screen-checkout");
}

function applyCheckoutCoupon(){
var code=(document.getElementById("checkout-coupon").value||"").toUpperCase().trim();
if(!code)return;
var c=state.adminCoupons.find(function(x){return x.code===code&&!x.used});
if(c){state.checkoutCoupon=code;showToast(c.pct+(c.type==="dollar"?"$ off":"% off")+" applied!");startCheckout();}
else{showToast("Invalid code")}
}

function placeOrder(){
var name=(document.getElementById("checkout-name").value||"").trim();
var email=(document.getElementById("checkout-email").value||"").trim();
if(!name||!email){showToast("Name and email required!");return;}
state.cart.forEach(function(item){commitStock(item.id,item.qty)});
var totals=getCartTotal();
var order={id:Date.now(),items:state.cart.slice(),total:totals.total,name:name,email:email,date:Date.now()};
state.orders.push(order);
state.totalRevenue=(state.totalRevenue||0)+totals.total;
if(state.emailSubs.indexOf(email)<0)state.emailSubs.push(email);
state.cart=[];state.checkoutCoupon=null;
saveState();updateCartBadge();
addXP(20);checkBadges();
showToast("Order placed!");
document.getElementById("checkout-content").innerHTML='<div class="tc"><div style="font-size:4rem;margin:20px 0">'+String.fromCodePoint(0x1F389)+'</div><h2 style="font-weight:900">Order Confirmed!</h2><p style="color:#999;margin:12px 0">Order #'+order.id+'</p><p style="font-weight:700">$'+totals.total.toFixed(2)+'</p><button class="btn btn-purple mt3" onclick="nav(\'screen-splash\')">Home</button></div>';
}

/* ===== LEVELS & XP ===== */
var LEVELS=[
{name:"Newbie",emoji:String.fromCodePoint(0x1F331),min:0},
{name:"Sipper",emoji:String.fromCodePoint(0x1F377),min:10},
{name:"Taster",emoji:String.fromCodePoint(0x1F942),min:25},
{name:"Enthusiast",emoji:String.fromCodePoint(0x2B50),min:50},
{name:"Explorer",emoji:String.fromCodePoint(0x1F30D),min:80},
{name:"Connoisseur",emoji:String.fromCodePoint(0x1F3C6),min:120},
{name:"Sommelier",emoji:String.fromCodePoint(0x1F451),min:200}
];

function getLevel(xp){
var lvl=LEVELS[0];
for(var i=0;i<LEVELS.length;i++){if(xp>=LEVELS[i].min)lvl=LEVELS[i];}
return lvl;
}
function getNextLevel(xp){
for(var i=0;i<LEVELS.length;i++){if(xp<LEVELS[i].min)return LEVELS[i];}
return null;
}
function addXP(amount){
state.xp=(state.xp||0)+amount;saveState();
var lvl=getLevel(state.xp);
var el=document.getElementById("level-emoji");if(el)el.textContent=lvl.emoji;
var en=document.getElementById("level-name");if(en)en.textContent=lvl.name;
var next=getNextLevel(state.xp);
var bar=document.getElementById("level-progress");
var xpEl=document.getElementById("level-xp");
if(next&&bar){
var pct=((state.xp-lvl.min)/(next.min-lvl.min)*100).toFixed(0);
bar.style.width=pct+"%";
if(xpEl)xpEl.textContent=state.xp+" / "+next.min+" XP";
}else if(bar){bar.style.width="100%";if(xpEl)xpEl.textContent=state.xp+" XP - MAX!";}
}

/* ===== BADGES ===== */
var ALL_BADGES=[
{id:"first_scan",name:"First Sip",emoji:String.fromCodePoint(0x1F377),desc:"Scan your first wine",check:function(){return(state.totalScans||0)>=1}},
{id:"five_scans",name:"Wine Curious",emoji:String.fromCodePoint(0x1F50D),desc:"Scan 5 wines",check:function(){return(state.totalScans||0)>=5}},
{id:"ten_scans",name:"Label Reader",emoji:String.fromCodePoint(0x1F4F7),desc:"Scan 10 wines",check:function(){return(state.totalScans||0)>=10}},
{id:"first_fav",name:"Heart Breaker",emoji:String.fromCodePoint(0x2764),desc:"Fave your first wine",check:function(){return state.favorites.length>=1}},
{id:"five_favs",name:"Wine Lover",emoji:String.fromCodePoint(0x1F495),desc:"Fave 5 wines",check:function(){return state.favorites.length>=5}},
{id:"first_review",name:"Critic",emoji:String.fromCodePoint(0x2B50),desc:"Write your first review",check:function(){return state.reviews.length>=1}},
{id:"five_reviews",name:"Reviewer",emoji:String.fromCodePoint(0x1F4DD),desc:"Write 5 reviews",check:function(){return state.reviews.length>=5}},
{id:"quiz_done",name:"Wine Twin",emoji:String.fromCodePoint(0x1F9E0),desc:"Complete the quiz",check:function(){return state.quizAnswers&&state.quizAnswers.length>=5}},
{id:"first_order",name:"Shopper",emoji:String.fromCodePoint(0x1F6D2),desc:"Place your first order",check:function(){return state.orders.length>=1}},
{id:"big_spender",name:"Big Spender",emoji:String.fromCodePoint(0x1F4B0),desc:"Spend over $200",check:function(){return(state.totalRevenue||0)>=200}},
{id:"vibe_check",name:"Vibe Master",emoji:String.fromCodePoint(0x1F49C),desc:"Use vibe match 3 times",check:function(){return(state.vibeUsed||0)>=3}},
{id:"coupon_king",name:"Coupon King",emoji:String.fromCodePoint(0x1F39F),desc:"Redeem a coupon",check:function(){return state.coupons.length>=1}},
{id:"social",name:"Influencer",emoji:String.fromCodePoint(0x1F4E4),desc:"Share a wine",check:function(){return(state.shares||0)>=1}},
{id:"cellar_start",name:"Cellar Starter",emoji:String.fromCodePoint(0x1F3F0),desc:"Add to cellar",check:function(){return state.cellar.length>=1}},
{id:"streak3",name:"On a Roll",emoji:String.fromCodePoint(0x1F525),desc:"3-day streak",check:function(){return(state.streak||0)>=3}},
{id:"explorer",name:"Globe Trotter",emoji:String.fromCodePoint(0x1F30D),desc:"Try 10 regions",check:function(){return state.journey&&state.journey.regions&&state.journey.regions.size>=10}}
];

function checkBadges(){
ALL_BADGES.forEach(function(b){
if(state.badges.indexOf(b.id)<0&&b.check()){
state.badges.push(b.id);showToast(b.emoji+" "+b.name+" unlocked!");addXP(5);
}});saveState();
}

function renderBadges(){
var eg=document.getElementById("badges-grid");
var lg=document.getElementById("badges-locked");
if(!eg||!lg)return;
var earned=ALL_BADGES.filter(function(b){return state.badges.indexOf(b.id)>-1});
var locked=ALL_BADGES.filter(function(b){return state.badges.indexOf(b.id)<0});
eg.innerHTML=earned.length?earned.map(function(b){return'<div class="cc"><div style="font-size:1.8rem">'+b.emoji+'</div><div style="font-size:.7rem;font-weight:800;margin-top:4px">'+b.name+'</div></div>'}).join(""):'<div class="tc" style="grid-column:1/-1;color:#999;padding:12px">None yet!</div>';
lg.innerHTML=locked.map(function(b){return'<div class="cc" style="opacity:.4"><div style="font-size:1.8rem">'+String.fromCodePoint(0x1F512)+'</div><div style="font-size:.7rem;font-weight:800;margin-top:4px">'+b.desc+'</div></div>'}).join("");
addXP(0);
}

/* ===== DAILY CHALLENGE ===== */
function getDailyChallenge(){
var challenges=["Try a wine you've never had","Rate 3 wines today","Use the vibe matcher","Find a wine under $20","Explore a new region","Share a wine with a friend","Add something to your cellar","Take the quiz again","Try the roulette wheel","Match wine to your dinner"];
var idx=new Date().getDate()%challenges.length;
state.dailyChallenge=challenges[idx];
var el=document.getElementById("challenge-preview");
if(el)el.textContent=challenges[idx];
return challenges[idx];
}

function renderChallenge(){
var el=document.getElementById("challenge-content");if(!el)return;
var ch=state.dailyChallenge||getDailyChallenge();
var done=state.challengeDone&&state.challengeDay===new Date().toDateString();
el.innerHTML='<div class="card tc"><div style="font-size:3rem;margin-bottom:8px">'+String.fromCodePoint(0x1F3AF)+'</div><h2 style="font-weight:900">Today\'s Challenge</h2><p style="color:#999;margin:12px 0;font-size:1rem;line-height:1.6">'+ch+'</p>'+(done?'<div class="badge badge-mint" style="font-size:.9rem;padding:8px 20px">Completed!</div>':'<button class="btn btn-purple mt2" onclick="completeChallenge()">Done!</button>')+'</div>';
}

function completeChallenge(){
state.challengeDone=true;state.challengeDay=new Date().toDateString();
state.streak=(state.streak||0)+1;
saveState();addXP(8);checkBadges();renderChallenge();showToast("Challenge complete! +8 XP");
}

/* ===== SHAKE ===== */
function initShake(){
if(window.DeviceMotionEvent){
window.addEventListener("devicemotion",function(e){
var a=e.accelerationIncludingGravity;
if(a&&(Math.abs(a.x)>25||Math.abs(a.y)>25||Math.abs(a.z)>25)){
var keys=Object.keys(WINE_DB);
var rk=keys[Math.floor(Math.random()*keys.length)];
showWineResult(rk,"shake");showToast("Shake detected!");}
});}
}

/* ===== CHEESE ===== */
function renderCheese(){
var el=document.getElementById("cheese-grid");if(!el)return;
if(typeof CHEESE_DB==="undefined"||!CHEESE_DB){el.innerHTML='<p style="color:#999;text-align:center">Cheese data loading...</p>';return;}
el.innerHTML=CHEESE_DB.map(function(c){return'<div class="cc" onclick="selectCheese(this,\''+c.name+'\')"><div style="font-size:1.5rem">'+c.emoji+'</div><div style="font-size:.72rem;font-weight:800;margin-top:4px">'+c.name+'</div></div>'}).join("");
}
function selectCheese(el,name){
document.querySelectorAll("#cheese-grid .cc").forEach(function(c){c.classList.remove("selected")});
el.classList.add("selected");
if(typeof CHEESE_DB==="undefined")return;
var cheese=CHEESE_DB.find(function(c){return c.name===name});
if(!cheese)return;
var rEl=document.getElementById("cheese-results");if(!rEl)return;
rEl.innerHTML='<div class="card bounce"><h3>'+cheese.emoji+' '+cheese.name+'</h3><p style="color:#999;margin:6px 0">'+cheese.desc+'</p><div class="mt2">'+cheese.wines.map(function(w){var wd=WINE_DB[w]||{};return'<button class="btn btn-xs btn-ghost" onclick="demoScan(\''+w+'\')" style="margin:2px">'+(wd.emoji||"")+' '+(wd.name||w)+'</button>'}).join("")+'</div></div>';
}

/* ===== HANGOVER ===== */
function changeDrink(delta){
state.drinkCount=(state.drinkCount||0)+delta;
if(state.drinkCount<0)state.drinkCount=0;
document.getElementById("drink-count").textContent=state.drinkCount;
updateBAC();
}
function updateBAC(){
var drinks=state.drinkCount||0;
var bac=Math.max(0,(drinks*0.015)-0.005).toFixed(3);
var el=document.getElementById("bac-value");
if(el){el.textContent=bac+"%";el.style.color=bac>0.05?"var(--coral)":"var(--mint)";}
var tips=document.getElementById("hangover-tips");
if(!tips)return;
if(drinks===0){tips.innerHTML="";return;}
var h='<div class="sect">Tips</div>';
h+='<div class="co">Drink '+drinks+' glass'+(drinks>1?"es":"")+' of water before bed</div>';
if(drinks>=3)h+='<div class="co">Eat something carby before sleeping</div>';
if(drinks>=5)h+='<div class="co">Tomorrow you: take ibuprofen + electrolytes + sleep in</div>';
h+='<div class="co">Estimated time to sober: ~'+(drinks*1.5).toFixed(1)+' hours</div>';
tips.innerHTML=h;
}

/* ===== JOURNEY ===== */
function renderJourney(){
if(!state.journey)state.journey={countries:new Set(),regions:new Set(),wines:new Set()};
var jc=document.getElementById("journey-countries");
var jr=document.getElementById("journey-regions");
var jw=document.getElementById("journey-wines");
if(jc)jc.textContent=state.journey.countries?state.journey.countries.size||0:0;
if(jr)jr.textContent=state.journey.regions?state.journey.regions.size||0:0;
if(jw)jw.textContent=state.journey.wines?state.journey.wines.size||0:0;
}

/* ===== PRONUNCIATION ===== */
function renderPronunciation(){
var el=document.getElementById("pron-list");if(!el)return;
if(typeof PRONUNCIATION_DB==="undefined")return;
el.innerHTML=PRONUNCIATION_DB.map(function(p){
return'<div class="gi" onclick="speak(\''+p.word+'\')"><div class="gi-c" style="background:var(--lilac)">'+String.fromCodePoint(0x1F5E3)+'</div><div class="gi-i"><div class="gi-n">'+p.word+'</div><div class="gi-s">'+p.phonetic+' · '+p.lang+'</div></div></div>'}).join("");
}
function speak(text){
if(window.speechSynthesis){var u=new SpeechSynthesisUtterance(text);u.rate=0.8;u.lang="en-AU";window.speechSynthesis.speak(u);}
}

/* ===== DINNER PARTY ===== */
function genDinnerParty(num){
var el=document.getElementById("dinner-plan");if(!el)return;
if(typeof DINNER_PARTY_DB==="undefined")return;
var courses=DINNER_PARTY_DB.courses.slice(0,num);
el.innerHTML=courses.map(function(c,i){
var jp=c.jovalPick?JOVAL_WINES.find(function(j){return j.name===c.jovalPick}):null;
return'<div class="co"><div style="font-weight:900;color:var(--purple);font-size:.7rem;letter-spacing:1px">COURSE '+(i+1)+'</div><h3 style="margin:4px 0;font-weight:900">'+c.course+'</h3><p style="color:#999;margin:4px 0;font-size:.85rem">'+c.desc+'</p><div style="margin-top:6px">'+c.wines.map(function(w){var wd=WINE_DB[w]||{};return'<button class="btn btn-xs btn-ghost" onclick="demoScan(\''+w+'\')" style="margin:2px">'+(wd.emoji||"")+' '+(wd.name||w)+'</button>'}).join("")+'</div>'+(jp?'<div style="margin-top:6px"><span class="joval-tag">JOVAL</span> <span style="font-weight:700;font-size:.82rem">'+jp.name+'</span> <span class="price-tag" style="font-size:.9rem">$'+jp.price+'</span></div>':'')+'</div>'}).join("");
}

/* ===== SEASON ===== */
function renderSeason(){
var el=document.getElementById("season-content");if(!el)return;
if(typeof SEASON_DB==="undefined"||typeof getSeason==="undefined")return;
var s=getSeason();var sd=SEASON_DB[s];if(!sd)return;
var jp=sd.jovalPick?JOVAL_WINES.find(function(j){return j.name===sd.jovalPick}):null;
el.innerHTML='<div class="card tc bounce"><div style="font-size:3rem">'+sd.emoji+'</div><h2 style="font-weight:900;margin:8px 0">'+sd.name+'</h2><p style="color:#999">'+sd.desc+'</p></div><div class="mt2">'+sd.wines.map(function(w){var wd=WINE_DB[w]||{};return'<button class="btn btn-ghost mb2" onclick="demoScan(\''+w+'\')" style="text-align:left;width:100%">'+(wd.emoji||"")+' '+(wd.name||w)+'</button>'}).join("")+'</div>'+(jp?'<div class="card-sun" style="border-radius:var(--r);margin-top:12px"><span class="joval-tag">JOVAL</span> <strong>'+jp.name+'</strong> <span class="price-tag">$'+jp.price+'</span></div>':'');
}

/* ===== GIFT ===== */
function selectGift(el,type){
document.querySelectorAll("#screen-gift .pp").forEach(function(p){p.classList.remove("selected")});
el.classList.add("selected");
if(typeof GIFT_DB==="undefined")return;
var g=GIFT_DB[type];if(!g)return;
var jp=g.jovalPick?JOVAL_WINES.find(function(j){return j.name===g.jovalPick}):null;
var rEl=document.getElementById("gift-results");if(!rEl)return;
rEl.innerHTML='<div class="card bounce"><h3>'+g.emoji+' Perfect for them</h3><p style="color:#999;margin:6px 0">'+g.desc+'</p>'+(jp?'<div style="margin:8px 0"><span class="joval-tag">JOVAL</span> <strong>'+jp.name+'</strong> <span class="price-tag">$'+jp.price+'</span> '+cartBtn(jp.id,"xs")+'</div>':'')+'<div class="mt2">'+g.wines.map(function(w){var wd=WINE_DB[w]||{};return'<button class="btn btn-xs btn-ghost" onclick="demoScan(\''+w+'\')" style="margin:2px">'+(wd.emoji||"")+' '+(wd.name||w)+'</button>'}).join("")+'</div></div>';
}

/* ===== MUSIC ===== */
function renderMusicPage(){
var el=document.getElementById("music-list");if(!el)return;
if(typeof MUSIC_DB==="undefined")return;
el.innerHTML=MUSIC_DB.map(function(m){
var wd=WINE_DB[m.grape]||{};
return'<div class="gi" onclick="demoScan(\''+m.grape+'\')"><div class="gi-c" style="background:var(--lilac)">'+String.fromCodePoint(0x1F3B5)+'</div><div class="gi-i"><div class="gi-n">'+(wd.name||m.grape)+' = '+m.genre+'</div><div class="gi-s">'+m.artist+' - '+m.song+'</div><div style="font-size:.75rem;color:var(--purple);margin-top:3px;font-weight:600">'+m.why+'</div></div></div>'}).join("");
}

/* ===== CELLAR ===== */
function renderCellar(){
var el=document.getElementById("cellar-grid");if(!el)return;
if(!state.cellar.length){el.innerHTML='<div class="tc" style="grid-column:1/-1;color:#999;padding:20px">Cellar empty</div>';return;}
el.innerHTML=state.cellar.map(function(c){return'<div class="cc" onclick="demoScan(\''+c.key+'\')"><div style="font-size:1.5rem">'+(c.emoji||String.fromCodePoint(0x1F377))+'</div><div style="font-size:.65rem;font-weight:800;margin-top:4px">'+(c.name||c.key)+'</div></div>'}).join("");
}
function addToCellar(){
if(!state.currentWine){showToast("Scan a wine first!");return;}
if(state.cellar.some(function(c){return c.key===state.currentWine.key})){showToast("Already in cellar!");return;}
state.cellar.push({key:state.currentWine.key,name:state.currentWine.name,emoji:state.currentWine.emoji,date:Date.now()});
saveState();showToast("Added to cellar!");addXP(2);checkBadges();
}

/* ===== SOCIAL ===== */
function renderSocial(){
var el=document.getElementById("social-feed");if(!el)return;
if(!state.socialPosts||!state.socialPosts.length){el.innerHTML='<div class="tc" style="color:#999;padding:20px">No posts yet. Share a wine!</div>';return;}
el.innerHTML=state.socialPosts.map(function(p){return'<div class="rc"><strong>'+p.wine+'</strong><p style="font-size:.82rem;color:#999;margin-top:3px">'+new Date(p.date).toLocaleDateString()+'</p></div>'}).join("");
}
function shareWine(){
if(!state.currentWine){showToast("Scan a wine first!");return;}
if(!state.socialPosts)state.socialPosts=[];
state.socialPosts.push({wine:state.currentWine.name,date:Date.now()});
state.shares=(state.shares||0)+1;
saveState();checkBadges();
if(navigator.share){navigator.share({title:"Slurper",text:"Check out "+state.currentWine.name+" on Slurper!"}).catch(function(){});}
showToast("Shared!");addXP(2);
}

/* ===== VOICE ===== */
function startVoice(){
if(!window.webkitSpeechRecognition&&!window.SpeechRecognition){showToast("Voice not supported");return;}
var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
var r=new SR();r.lang="en-AU";r.start();
r.onresult=function(e){var t=e.results[0][0].transcript.toLowerCase();fakeVoice(t)};
r.onerror=function(){showToast("Try again")};
}
function fakeVoice(topic){
var el=document.getElementById("voice-result");if(!el)return;
el.classList.remove("hid");
var key="shiraz";
if(topic.indexOf("steak")>-1||topic.indexOf("red")>-1)key="cabernet_sauvignon";
else if(topic.indexOf("pinot")>-1)key="pinot_noir";
else if(topic.indexOf("pasta")>-1||topic.indexOf("italian")>-1)key="sangiovese";
else if(topic.indexOf("budget")>-1||topic.indexOf("cheap")>-1)key="gamay";
else if(topic.indexOf("white")>-1)key="sauvignon_blanc";
else if(topic.indexOf("fish")>-1||topic.indexOf("seafood")>-1)key="chardonnay";
var w=WINE_DB[key]||{};
el.innerHTML='<h3>'+w.emoji+' '+w.name+'</h3><p style="color:#999;margin:6px 0;font-size:.9rem">'+w.plainEnglish+'</p><button class="btn btn-sm btn-purple" onclick="demoScan(\''+key+'\')">Details</button>';
}

/* ===== COMPARE ===== */
function populateCompare(){
var a=document.getElementById("compare-a");
var b=document.getElementById("compare-b");
if(!a||!b)return;
var opts=Object.keys(WINE_DB).map(function(k){return'<option value="'+k+'">'+WINE_DB[k].name+'</option>'}).join("");
a.innerHTML=opts;b.innerHTML=opts;
if(b.options.length>1)b.selectedIndex=1;
}
function doCompare(){
var ka=document.getElementById("compare-a").value;
var kb=document.getElementById("compare-b").value;
var a=WINE_DB[ka],b=WINE_DB[kb];if(!a||!b)return;
var el=document.getElementById("compare-output");if(!el)return;
var bars=["body","sweetness","acidity","tannin","alcohol"];
var labels=["Body","Sweet","Zing","Grip","Booze"];
el.innerHTML='<div class="card"><div style="display:flex;justify-content:space-between;margin-bottom:12px"><strong>'+a.emoji+' '+a.name+'</strong><strong>'+b.emoji+' '+b.name+'</strong></div>'+bars.map(function(k,i){return'<div style="margin-bottom:8px"><div style="font-size:.7rem;color:#999;font-weight:700;text-align:center">'+labels[i]+'</div><div style="display:flex;gap:4px;align-items:center"><div style="flex:1;height:8px;background:#f0e8e0;border-radius:4px;overflow:hidden;direction:rtl"><div style="width:'+a[k]*20+'%;height:100%;background:var(--coral);border-radius:4px"></div></div><div style="width:30px;text-align:center;font-size:.7rem;font-weight:800">'+a[k]+'/'+b[k]+'</div><div style="flex:1;height:8px;background:#f0e8e0;border-radius:4px;overflow:hidden"><div style="width:'+b[k]*20+'%;height:100%;background:var(--purple);border-radius:4px"></div></div></div></div>'}).join("")+'</div>';
}

/* ===== KIDS ===== */
function renderKids(){
var el=document.getElementById("kids-list");if(!el)return;
if(typeof KIDS_MEALS_DB==="undefined"){el.innerHTML='<div class="tc" style="color:#999;padding:20px">Kids meals loading...</div>';return;}
el.innerHTML='<div class="sect">Kids eat, you sip</div>'+KIDS_MEALS_DB.map(function(m){
return'<div class="mi"><div style="font-size:1.8rem;flex-shrink:0">'+m.emoji+'</div><div style="flex:1"><div style="font-weight:800;font-size:.9rem">'+m.name+'</div><div style="margin-top:6px">'+m.wines.map(function(w){var wd=WINE_DB[w]||{};return'<button class="btn btn-xs btn-ghost" onclick="demoScan(\''+w+'\')" style="margin:2px">'+(wd.emoji||"")+' '+(wd.name||w)+'</button>'}).join("")+'</div></div></div>'}).join("");
}

/* ===== TIMELINE ===== */
function renderTimeline(){
var el=document.getElementById("tl-total");if(el)el.textContent=state.reviews.length;
var avg=document.getElementById("tl-avg");
if(avg){
if(state.reviews.length){var sum=0;state.reviews.forEach(function(r){sum+=r.stars});avg.textContent=(sum/state.reviews.length).toFixed(1)}
else{avg.textContent="-"}}
var fav=document.getElementById("tl-fav-type");
if(fav)fav.textContent=state.favorites.length>0?(WINE_DB[state.favorites[0]]||{}).type||"-":"-";
}

/* ===== ADMIN ===== */
function openAdmin(){nav("screen-admin");renderAdmin();}

function renderAdmin(){
var el;
el=document.getElementById("admin-scans");if(el)el.textContent=state.totalScans||0;
el=document.getElementById("admin-reviews");if(el)el.textContent=state.reviews.length;
el=document.getElementById("admin-orders");if(el)el.textContent=state.orders.length;
el=document.getElementById("admin-revenue");if(el)el.textContent="$"+(state.totalRevenue||0).toFixed(0);
el=document.getElementById("admin-coupons");if(el)el.textContent=state.totalCouponsUsed||0;
el=document.getElementById("admin-favs");if(el)el.textContent=state.favorites.length;
var sel=document.getElementById("admin-featured-select");
if(sel){sel.innerHTML=Object.keys(WINE_DB).map(function(k){return'<option value="'+k+'"'+(state.featuredWine===k?' selected':'')+'>'+WINE_DB[k].name+'</option>'}).join("");}
var stockSel=document.getElementById("admin-stock-wine");
if(stockSel){stockSel.innerHTML=JOVAL_WINES.map(function(j){return'<option value="'+j.id+'">'+j.name+' ('+getStock(j.id)+')</option>'}).join("");}
renderAdminStock();renderAdminOrders();renderAdminPromos();renderAdminMarketing();
}

function showAdminTab(tab,btn){
["dashboard","stock","orders","promos","marketing"].forEach(function(t){
var el=document.getElementById("admin-tab-"+t);
if(el){if(t===tab)el.classList.remove("hid");else el.classList.add("hid");}
});
document.querySelectorAll("#screen-admin .mc").forEach(function(b){b.classList.remove("active")});
if(btn)btn.classList.add("active");
}

function renderAdminStock(){
var el=document.getElementById("admin-stock-summary");if(!el)return;
var total=0,low=0;
JOVAL_WINES.forEach(function(j){var s=getStock(j.id);total+=s;if(s<=5)low++});
el.innerHTML='<p>Total units: <strong>'+total+'</strong></p><p>Low stock items: <strong style="color:var(--coral)">'+low+'</strong></p>';
var lowEl=document.getElementById("admin-low-stock");
if(lowEl){
var lowItems=JOVAL_WINES.filter(function(j){return getStock(j.id)<=5});
lowEl.innerHTML=lowItems.length?lowItems.map(function(j){return'<div class="rc">'+j.name+' <span class="stock-low">'+getStock(j.id)+' left</span></div>'}).join(""):'<p style="color:var(--mint)">All stocked up!</p>';}
}

function updateStock(){
var id=parseInt(document.getElementById("admin-stock-wine").value);
var qty=parseInt(document.getElementById("admin-stock-qty").value);
if(!id||isNaN(qty)){showToast("Enter valid values");return;}
state.stockLevels[id]=qty;saveState();showToast("Stock updated!");renderAdmin();
}

function renderAdminOrders(){
var el=document.getElementById("admin-order-list");if(!el)return;
if(!state.orders.length){el.innerHTML='<p style="color:#999">No orders yet</p>';return;}
el.innerHTML=state.orders.slice(-10).reverse().map(function(o){
return'<div class="rc"><strong>#'+o.id+'</strong> - $'+o.total.toFixed(2)+'<br><span style="font-size:.75rem;color:#999">'+o.name+' · '+new Date(o.date).toLocaleDateString()+'</span></div>'}).join("");
var stats=document.getElementById("admin-order-stats");
if(stats){var avg=state.orders.length?(state.totalRevenue/state.orders.length).toFixed(2):0;
stats.innerHTML='<p>Avg order: <strong>$'+avg+'</strong></p><p>Total orders: <strong>'+state.orders.length+'</strong></p>';}
}

function renderAdminPromos(){
var el=document.getElementById("admin-coupon-list");if(!el)return;
el.innerHTML=state.adminCoupons.length?state.adminCoupons.map(function(c){
return'<div class="rc"><strong>'+c.code+'</strong> - '+c.pct+(c.type==="dollar"?"$":"%")+' off'+(c.used?' <span class="badge badge-pink">Used</span>':'')+'</div>'}).join(""):'<p style="color:#999">No promos</p>';
}

function setFeaturedWine(){
var sel=document.getElementById("admin-featured-select");
if(sel){state.featuredWine=sel.value;saveState();updateWOTDHome();showToast("Featured wine updated!");}
}

function createCoupon(){
var code=(document.getElementById("admin-coupon-code").value||"").toUpperCase().trim();
var pct=parseInt(document.getElementById("admin-coupon-pct").value);
var type=(document.getElementById("admin-promo-type").value||"percent");
var limit=parseInt(document.getElementById("admin-promo-limit").value)||0;
if(!code||!pct){showToast("Code and value required!");return;}
state.adminCoupons.push({code:code,pct:pct,type:type,used:false,limit:limit,timesUsed:0});
saveState();showToast("Promo created!");renderAdmin();
document.getElementById("admin-coupon-code").value="";
document.getElementById("admin-coupon-pct").value="";
}

function setPromoBanner(){
var text=(document.getElementById("admin-banner-text").value||"").trim();
var link=(document.getElementById("admin-banner-link").value||"screen-explore").trim();
state.promoBanner={text:text,link:link};saveState();showToast("Banner set!");
}

function renderAdminMarketing(){
var el=document.getElementById("admin-email-count");
if(el)el.textContent=state.emailSubs.length;
var list=document.getElementById("admin-email-list");
if(list)list.innerHTML=state.emailSubs.map(function(e){return'<div class="rc">'+e+'</div>'}).join("");
var refList=document.getElementById("admin-ref-list");
if(refList)refList.innerHTML=(state.referrals||[]).map(function(r){return'<div class="rc"><strong>'+r.code+'</strong> - '+r.reward+'% reward</div>'}).join("");
}

function createReferral(){
var code=(document.getElementById("admin-ref-code").value||"").toUpperCase().trim();
var reward=parseInt(document.getElementById("admin-ref-reward").value)||10;
if(!code){showToast("Enter a code!");return;}
if(!state.referrals)state.referrals=[];
state.referrals.push({code:code,reward:reward});
saveState();showToast("Referral created!");renderAdminMarketing();
}

function sendPush(){
var msg=(document.getElementById("admin-push-msg").value||"").trim();
if(!msg){showToast("Enter a message!");return;}
if("Notification" in window&&Notification.permission==="granted"){new Notification("Slurper",{body:msg});}
else if("Notification" in window){Notification.requestPermission().then(function(p){if(p==="granted")new Notification("Slurper",{body:msg})});}
showToast("Push sent: "+msg);
document.getElementById("admin-push-msg").value="";
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded",function(){
loadState();
initStock();
try{renderGrapeList()}catch(e){}
try{updateWOTDHome()}catch(e){}
try{renderBadges()}catch(e){}
try{getDailyChallenge()}catch(e){}
try{drawRouletteWheel()}catch(e){}
try{renderPronunciation()}catch(e){}
try{renderSeason()}catch(e){}
try{renderMusicPage()}catch(e){}
try{renderCheese()}catch(e){}
try{renderKids()}catch(e){}
try{populateCompare()}catch(e){}
try{renderJourney()}catch(e){}
try{renderTimeline()}catch(e){}
try{renderCellar()}catch(e){}
try{renderSocial()}catch(e){}
try{renderVouchers()}catch(e){}
try{updateCartBadge()}catch(e){}
try{renderFavorites()}catch(e){}
try{renderMeals()}catch(e){}
try{renderChallenge()}catch(e){}
try{initShake()}catch(e){}
try{addXP(0)}catch(e){}
});