/* Slurper v4 - App Core — Production */
var state={
currentWine:null,scanSide:"front",drinkCount:0,quizStep:0,quizAnswers:[],
currentStars:0,currentEmoji:"",favorites:[],reviews:[],cellar:[],
coupons:[],adminCoupons:[],cart:[],orders:[],
journey:{countries:new Set(),regions:new Set(),wines:new Set()},
budgetVal:25,featuredWine:null,totalScans:0,totalCouponsUsed:0,
cameraStream:null,cameraFacing:"environment",exploreFilter:"all",
xp:0,badges:[],streak:0,challengeDate:"",lastChallengeDate:"",
ordersPlaced:0,cheeseUsed:0,musicUsed:0,vibeUsed:0,
/* Ecom */
stock:{},revenue:0,emailSubs:[],referrals:[],
promoBanner:null,recentlyViewed:[],wishlist:[]
};

/* Initialize stock for all Joval wines */
function initStock(){
if(!state.stock||!Object.keys(state.stock).length){
state.stock={};
JOVAL_WINES.forEach(function(w){
state.stock[w.id]={qty:Math.floor(Math.random()*40)+10,reserved:0};
});
saveState();
}
}

function getStock(wineId){
if(!state.stock[wineId])state.stock[wineId]={qty:24,reserved:0};
return state.stock[wineId].qty-state.stock[wineId].reserved;
}

function reserveStock(wineId,qty){
if(!state.stock[wineId])state.stock[wineId]={qty:24,reserved:0};
state.stock[wineId].reserved+=qty;
saveState();
}

function commitStock(wineId,qty){
if(!state.stock[wineId])return;
state.stock[wineId].qty=Math.max(0,state.stock[wineId].qty-qty);
state.stock[wineId].reserved=Math.max(0,state.stock[wineId].reserved-qty);
saveState();
}

function loadState(){
try{
var s=localStorage.getItem("slurper_state");
if(s){var d=JSON.parse(s);
state.favorites=d.favorites||[];
state.reviews=d.reviews||[];
state.cellar=d.cellar||[];
state.coupons=d.coupons||[];
state.adminCoupons=d.adminCoupons||[];
state.cart=d.cart||[];
state.orders=d.orders||[];
state.totalScans=d.totalScans||0;
state.totalCouponsUsed=d.totalCouponsUsed||0;
state.featuredWine=d.featuredWine||null;
state.xp=d.xp||0;
state.badges=d.badges||[];
state.streak=d.streak||0;
state.challengeDate=d.challengeDate||"";
state.lastChallengeDate=d.lastChallengeDate||"";
state.ordersPlaced=d.ordersPlaced||0;
state.cheeseUsed=d.cheeseUsed||0;
state.musicUsed=d.musicUsed||0;
state.vibeUsed=d.vibeUsed||0;
state.stock=d.stock||{};
state.revenue=d.revenue||0;
state.emailSubs=d.emailSubs||[];
state.referrals=d.referrals||[];
state.promoBanner=d.promoBanner||null;
state.recentlyViewed=d.recentlyViewed||[];
state.wishlist=d.wishlist||[];
state.journey={
countries:new Set(d.jCountries||[]),
regions:new Set(d.jRegions||[]),
wines:new Set(d.jWines||[])
};}
}catch(e){}
}

function saveState(){
try{
localStorage.setItem("slurper_state",JSON.stringify({
favorites:state.favorites,reviews:state.reviews,cellar:state.cellar,
coupons:state.coupons,adminCoupons:state.adminCoupons,cart:state.cart,
orders:state.orders,
totalScans:state.totalScans,totalCouponsUsed:state.totalCouponsUsed,
featuredWine:state.featuredWine,
xp:state.xp,badges:state.badges,streak:state.streak,
challengeDate:state.challengeDate,lastChallengeDate:state.lastChallengeDate,
ordersPlaced:state.ordersPlaced||0,
cheeseUsed:state.cheeseUsed||0,
musicUsed:state.musicUsed||0,
vibeUsed:state.vibeUsed||0,
stock:state.stock,revenue:state.revenue,
emailSubs:state.emailSubs,referrals:state.referrals,
promoBanner:state.promoBanner,
recentlyViewed:state.recentlyViewed,wishlist:state.wishlist,
jCountries:[...state.journey.countries],
jRegions:[...state.journey.regions],
jWines:[...state.journey.wines]
}));
}catch(e){}
}

/* Nav map: Home, Explore, Quiz, Cart, More */
var NAV_MAP={
"screen-splash":0,
"screen-explore":1,
"screen-quiz":2,
"screen-cart":3,
"screen-more":4
};

function nav(id){
document.querySelectorAll(".screen").forEach(function(s){s.classList.remove("active")});
var el=document.getElementById(id);
if(el){el.classList.add("active");el.scrollTop=0;window.scrollTo(0,0)}
document.querySelectorAll(".nav-item").forEach(function(n,i){
n.classList.toggle("active",NAV_MAP[id]===i);
});
if(id==="screen-explore"&&typeof renderGrapeList==="function")renderGrapeList();
if(id==="screen-meals"&&typeof renderMeals==="function")renderMeals();
if(id==="screen-cheese"&&typeof renderCheese==="function")renderCheese();
if(id==="screen-roulette"&&typeof drawRouletteWheel==="function")drawRouletteWheel();
if(id==="screen-hangover"&&typeof updateBAC==="function")updateBAC();
if(id==="screen-pronounce"&&typeof renderPronunciation==="function")renderPronunciation();
if(id==="screen-season"&&typeof renderSeason==="function")renderSeason();
if(id==="screen-kids"&&typeof renderKids==="function")renderKids();
if(id==="screen-journey"&&typeof renderJourney==="function")renderJourney();
if(id==="screen-cellar"&&typeof renderCellar==="function")renderCellar();
if(id==="screen-social"&&typeof renderSocial==="function")renderSocial();
if(id==="screen-compare"&&typeof populateCompare==="function")populateCompare();
if(id==="screen-timeline"&&typeof renderTimeline==="function")renderTimeline();
if(id==="screen-music"&&typeof renderMusicPage==="function")renderMusicPage();
if(id==="screen-favs"&&typeof renderFavorites==="function")renderFavorites();
if(id==="screen-vouchers"&&typeof renderVouchers==="function")renderVouchers();
if(id==="screen-wotd"&&typeof renderWOTD==="function")renderWOTD();
if(id==="screen-admin"&&typeof renderAdmin==="function")renderAdmin();
if(id==="screen-cart"&&typeof renderCart==="function")renderCart();
if(id==="screen-badges"&&typeof renderBadges==="function")renderBadges();
if(id==="screen-challenge"&&typeof renderChallenge==="function")renderChallenge();
if(id==="screen-scanner")initCamera();else stopCamera();
}

function showToast(msg){
var t=document.getElementById("toast");
t.textContent=msg;t.classList.remove("hidden");
setTimeout(function(){t.classList.add("hidden")},2200);
}

/* Admin tab switching */
function showAdminTab(tab,btn){
["dashboard","stock","orders","promos","marketing"].forEach(function(t){
var el=document.getElementById("admin-tab-"+t);
if(el){if(t===tab)el.classList.remove("hid");else el.classList.add("hid")}
});
document.querySelectorAll("#screen-admin .mc").forEach(function(b){b.classList.remove("active")});
if(btn)btn.classList.add("active");
if(tab==="stock"&&typeof renderAdminStock==="function")renderAdminStock();
if(tab==="orders"&&typeof renderAdminOrders==="function")renderAdminOrders();
if(tab==="promos"&&typeof renderAdminPromos==="function")renderAdminPromos();
if(tab==="marketing"&&typeof renderAdminMarketing==="function")renderAdminMarketing();
}

/* Camera */
function initCamera(){
var v=document.getElementById("scanner-video");
if(!v)return;
if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
navigator.mediaDevices.getUserMedia({video:{facingMode:state.cameraFacing}})
.then(function(s){state.cameraStream=s;v.srcObject=s})
.catch(function(){
document.getElementById("scan-instructions").textContent="Camera not available — use demo scans!";
});
}else{
document.getElementById("scan-instructions").textContent="Camera not supported — use demo scans!";
}
}

function stopCamera(){
if(state.cameraStream){
state.cameraStream.getTracks().forEach(function(t){t.stop()});
state.cameraStream=null;
}
}

function toggleCamera(){
stopCamera();
state.cameraFacing=state.cameraFacing==="environment"?"user":"environment";
initCamera();
}

function captureLabel(){
showToast("📷 Analyzing...");
setTimeout(function(){
var keys=Object.keys(WINE_DB);
demoScan(keys[Math.floor(Math.random()*keys.length)]);
},1200);
}

function demoScan(key){
state.totalScans++;
var w=WINE_DB[key];
if(w){
state.currentWine={key:key,source:"winedb"};
Object.keys(w).forEach(function(k){state.currentWine[k]=w[k]});
if(w.regions)w.regions.forEach(function(r){state.journey.regions.add(r)});
state.journey.wines.add(key);
/* Recently viewed */
if(state.recentlyViewed.indexOf(key)<0){
state.recentlyViewed.unshift(key);
if(state.recentlyViewed.length>20)state.recentlyViewed.pop();
}
saveState();
showWineResult(key,"winedb");
}else{showToast("Wine not found")}
}