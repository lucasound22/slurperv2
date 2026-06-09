/* Slurper v5 - Misc Data - FIXED */
var LABEL_TERMS=["Terroir","Tannin","Appellation","Cuv\u00e9e","Brut","Demi-Sec","Grand Cru","Premier Cru","Reserva","Crianza","Denominazione","Classico","Superiore","Riserva","Sp\u00e4tlese","Auslese","Trocken","Kabinett","Vendange Tardive","Botrytis","Mise en Bouteille","Ch\u00e2teau","Domaine","Bodega","Tenuta","Weingut","Clos","Vignoble","Estate","Single Vineyard"];

var VIBES_DB={
romantic:{name:"Date Night",emoji:"\u{1F495}",desc:"Wines to set the mood",wines:["pinot_noir","chardonnay","grenache"],jovalPick:"Domaines Ott Clos Mireille Rose"},
party:{name:"Party Time",emoji:"\u{1F389}",desc:"Fun, easy-drinking crowd-pleasers",wines:["gamay","grenache","sauvignon_blanc"],jovalPick:"All Saints Estate Prosecco NV"},
chill:{name:"Netflix & Sip",emoji:"\u{1F60C}",desc:"Easy wines for a relaxed evening",wines:["merlot","pinot_grigio","gamay"],jovalPick:"Sticks Pinot Noir"},
fancy:{name:"Dress Up",emoji:"\u{1F3A9}",desc:"Impress someone special",wines:["nebbiolo","chardonnay","cabernet_sauvignon"],jovalPick:"Pierro Chardonnay"},
outdoor:{name:"Picnic Vibes",emoji:"\u{1F33F}",desc:"Fresh and portable wines",wines:["sauvignon_blanc","gamay","grenache"],jovalPick:"AIX Rose"},
adventurous:{name:"Try Something New",emoji:"\u{1F920}",desc:"Unusual grapes and styles",wines:["torrontes","gruner_veltliner","carmenere"],jovalPick:"LAS Vino Albino PNO"},
cozy:{name:"Fireside",emoji:"\u{1F525}",desc:"Rich and warming winter wines",wines:["shiraz","malbec","touriga_nacional"],jovalPick:"MMAD Vineyard Shiraz"},
celebration:{name:"Pop the Cork",emoji:"\u{1F942}",desc:"Sparkling and celebratory wines",wines:["chardonnay","muscat","pinot_noir"],jovalPick:"Audrey Wilkinson Brut Reserve NV"}
};

var QUIZ_QUESTIONS=[
{q:"It's Friday night. What are you doing?",options:[
{text:"\u{1F37D}\uFE0F Cooking a fancy dinner for two",value:"A"},
{text:"\u{1F389} Hosting a big party \u2014 the more the merrier",value:"B"},
{text:"\u{1F60C} Couch, blanket, Netflix, sorted",value:"C"},
{text:"\u{1F33F} Picnic in the park with a good book",value:"D"}
]},
{q:"Pick a holiday destination:",options:[
{text:"\u{1F1EB}\u{1F1F7} French countryside \u2014 vineyards and cheese",value:"A"},
{text:"\u{1F1E6}\u{1F1F7} Argentina \u2014 steak, tango, adventure",value:"B"},
{text:"\u{1F1EE}\u{1F1F9} Italian coast \u2014 pasta, sun, naps",value:"C"},
{text:"\u{1F1F3}\u{1F1FF} New Zealand \u2014 mountains and fresh air",value:"D"}
]},
{q:"What's your toast style?",options:[
{text:"\u{1F9C8} Sourdough with fancy butter and sea salt",value:"A"},
{text:"\u{1F525} Loaded with chilli jam and everything on it",value:"B"},
{text:"\u{1F36F} Simple with honey \u2014 nothing wrong with that",value:"C"},
{text:"\u{1F951} Smashed avo, lemon, done properly",value:"D"}
]},
{q:"Pick a music vibe:",options:[
{text:"\u{1F3B7} Jazz \u2014 smooth, complex, timeless",value:"A"},
{text:"\u{1F3B8} Rock \u2014 bold, loud, unapologetic",value:"B"},
{text:"\u{1F3B5} Indie folk \u2014 chill, earthy, soulful",value:"C"},
{text:"\u{1F3B9} Classical \u2014 elegant, refined, beautiful",value:"D"}
]},
{q:"Your ideal Sunday morning?",options:[
{text:"\u2615 Farmers market and flat white",value:"A"},
{text:"\u{1F3CB}\uFE0F Gym then a massive brunch",value:"B"},
{text:"\u{1F634} Sleep in until noon, no regrets",value:"C"},
{text:"\u{1F6B6} Long walk along the river",value:"D"}
]}
];

var TWIN_RESULTS={
A:{name:"Pinot Noir",emoji:"\u{1F377}",grape:"pinot_noir",desc:"Elegant, thoughtful, and deeply layered. You radiate quiet confidence. Like Pinot Noir, you're versatile \u2014 equally at home at a dinner party or a cozy night in. People are drawn to your complexity and warmth."},
B:{name:"Shiraz",emoji:"\u{1F377}",grape:"shiraz",desc:"Bold, generous, and the life of the party. You go big or go home. You're warm, spicy, and people always remember you. Like Shiraz, you've got depth beneath that fun exterior \u2014 there's more to you than meets the eye."},
C:{name:"Grenache",emoji:"\u{1F377}",grape:"grenache",desc:"Laid back, easy-going, and universally loved. You don't try too hard and that's exactly why people love you. Like Grenache, you're approachable, fruity, and perfect for any occasion. Zero pretension, maximum good vibes."},
D:{name:"Riesling",emoji:"\u{1F942}",grape:"riesling",desc:"Fresh, bright, and full of surprises. People underestimate you, but you've got incredible depth and age beautifully. Like Riesling, you're versatile, vibrant, and way more interesting than people first think."}
};

var PRONUNCIATION_DB=[
{word:"Chardonnay",phonetic:"shar-duh-NAY",lang:"French"},
{word:"Sauvignon Blanc",phonetic:"SO-vee-nyon BLONK",lang:"French"},
{word:"Gew\u00fcrztraminer",phonetic:"geh-VURTS-trah-mee-ner",lang:"German"},
{word:"Nebbiolo",phonetic:"neh-bee-OH-lo",lang:"Italian"},
{word:"Tempranillo",phonetic:"tem-prah-NEE-yo",lang:"Spanish"},
{word:"Gr\u00fcner Veltliner",phonetic:"GREW-ner FELT-lee-ner",lang:"German"},
{word:"Sangiovese",phonetic:"san-joh-VAY-zeh",lang:"Italian"},
{word:"Viognier",phonetic:"vee-on-YAY",lang:"French"},
{word:"Mourv\u00e8dre",phonetic:"moor-VED-ruh",lang:"French"},
{word:"Albari\u00f1o",phonetic:"al-bah-REE-nyo",lang:"Spanish"},
{word:"Torront\u00e9s",phonetic:"tor-ron-TESS",lang:"Spanish"},
{word:"Carm\u00e9n\u00e8re",phonetic:"car-men-YAIR",lang:"French"},
{word:"Pinotage",phonetic:"pee-no-TAHJ",lang:"South African"},
{word:"Touriga Nacional",phonetic:"too-REE-gah nah-see-oh-NAL",lang:"Portuguese"},
{word:"Riesling",phonetic:"REEZ-ling",lang:"German"},
{word:"Pinot Grigio",phonetic:"PEE-no GREE-joe",lang:"Italian"},
{word:"Pinot Noir",phonetic:"PEE-no NWAR",lang:"French"},
{word:"Merlot",phonetic:"mer-LOW",lang:"French"},
{word:"Cabernet Sauvignon",phonetic:"cab-er-NAY SO-vee-nyon",lang:"French"},
{word:"Malbec",phonetic:"mal-BEK",lang:"French"},
{word:"Chianti",phonetic:"kee-AN-tee",lang:"Italian"},
{word:"Barolo",phonetic:"bah-ROH-lo",lang:"Italian"},
{word:"Brunello",phonetic:"brew-NEL-lo",lang:"Italian"},
{word:"Beaujolais",phonetic:"bo-jo-LAY",lang:"French"},
{word:"Chenin Blanc",phonetic:"SHEN-in BLONK",lang:"French"},
{word:"Prosecco",phonetic:"pro-SEH-ko",lang:"Italian"},
{word:"Chablis",phonetic:"shah-BLEE",lang:"French"},
{word:"S\u00e9millon",phonetic:"SEM-ee-yon",lang:"French"},
{word:"Rioja",phonetic:"ree-OH-ha",lang:"Spanish"},
{word:"Ch\u00e2teauneuf-du-Pape",phonetic:"shah-toh-NUHF-doo-POP",lang:"French"}
];

var GIFT_DB={
foodie:{emoji:"\u{1F37D}\uFE0F",desc:"Someone who lives for great food and wine pairings",wines:["pinot_noir","sangiovese","riesling"],jovalPick:"Yabby Lake Pinot Noir"},
adventurer:{emoji:"\u{1F30D}",desc:"Always trying new things and exploring",wines:["torrontes","gruner_veltliner","nebbiolo"],jovalPick:"Graci Etna Rosato"},
romantic:{emoji:"\u{1F495}",desc:"Loves elegance and special moments",wines:["pinot_noir","chardonnay","grenache"],jovalPick:"Domaines Ott Clos Mireille Rose"},
boss:{emoji:"\u{1F454}",desc:"Appreciates quality and sophistication",wines:["cabernet_sauvignon","nebbiolo","chardonnay"],jovalPick:"Alkoomi Icon Blackbutt Cabernet Sauvignon"},
newbie:{emoji:"\u{1F331}",desc:"Just starting their wine journey",wines:["sauvignon_blanc","merlot","gamay"],jovalPick:"Audrey Wilkinson Chardonnay"},
snob:{emoji:"\u{1F377}",desc:"Knows their stuff and expects the best",wines:["nebbiolo","pinot_noir","chardonnay"],jovalPick:"Pierro Chardonnay"}
};

function getSeason(){
var m=new Date().getMonth();
if(m>=2&&m<=4)return"autumn";
if(m>=5&&m<=7)return"winter";
if(m>=8&&m<=10)return"spring";
return"summer";
}

var SEASON_DB={
summer:{name:"Summer Sipping",emoji:"\u2600\uFE0F",desc:"Light, refreshing wines for hot days",wines:["sauvignon_blanc","albarino","gamay","pinot_grigio"],jovalPick:"AIX Rose"},
autumn:{name:"Autumn Harvest",emoji:"\u{1F342}",desc:"Medium-bodied wines for cooling evenings",wines:["pinot_noir","grenache","tempranillo","chenin_blanc"],jovalPick:"Chatto Intrigue Pinot Noir"},
winter:{name:"Winter Warmers",emoji:"\u2744\uFE0F",desc:"Rich, bold wines for cold nights by the fire",wines:["shiraz","cabernet_sauvignon","malbec","nebbiolo"],jovalPick:"Shaw Smith Shiraz"},
spring:{name:"Spring Fresh",emoji:"\u{1F338}",desc:"Crisp and aromatic wines for new beginnings",wines:["riesling","sauvignon_blanc","torrontes","gamay"],jovalPick:"Leeuwin Estate Art Series Riesling"}
};

var DINNER_PARTY_DB={courses:[
{course:"Aperitif & Canap\u00e9s",desc:"Sparkling or light white to kick things off",wines:["sauvignon_blanc","muscat","gruner_veltliner"],jovalPick:"Audrey Wilkinson Brut Reserve NV"},
{course:"Entr\u00e9e / Starter",desc:"Fresh white or light red to warm up",wines:["riesling","albarino","gamay"],jovalPick:"Te Mata Cape Crest Sauvignon Blanc"},
{course:"Fish Course",desc:"Delicate seafood with crisp whites",wines:["chardonnay","semillon","pinot_grigio"],jovalPick:"Craggy Range Kidnappers Chardonnay"},
{course:"Main Course",desc:"Match the protein \u2014 go bold for red meat",wines:["cabernet_sauvignon","shiraz","pinot_noir"],jovalPick:"Shaw Smith Shiraz"},
{course:"Cheese Course",desc:"Rich cheeses with elegant wines",wines:["pinot_noir","nebbiolo","riesling"],jovalPick:"Heathcote Estate Nebbiolo"},
{course:"Dessert",desc:"Sweet endings with luscious wines",wines:["muscat","riesling","semillon"],jovalPick:"All Saints The Keep Tawny Port"}
]};

var MUSIC_DB=[
{grape:"pinot_noir",genre:"Jazz",artist:"Miles Davis",song:"Kind of Blue",why:"Both elegant, complex, and timeless"},
{grape:"shiraz",genre:"Rock",artist:"AC/DC",song:"Highway to Hell",why:"Bold, powerful, and unmistakably Aussie"},
{grape:"cabernet_sauvignon",genre:"Classical",artist:"Beethoven",song:"Symphony No. 5",why:"Structured, commanding, and built to last"},
{grape:"sauvignon_blanc",genre:"Pop",artist:"Dua Lipa",song:"Don't Start Now",why:"Fresh, energetic, and instantly appealing"},
{grape:"chardonnay",genre:"Soul",artist:"Aretha Franklin",song:"Respect",why:"Rich, powerful, and universally loved"},
{grape:"riesling",genre:"Electronic",artist:"Daft Punk",song:"Get Lucky",why:"Electric, versatile, and surprisingly complex"},
{grape:"grenache",genre:"Latin",artist:"Buena Vista Social Club",song:"Chan Chan",why:"Warm, sun-soaked, and generous"},
{grape:"merlot",genre:"R&B",artist:"Frank Ocean",song:"Thinkin Bout You",why:"Smooth, approachable, and deep"},
{grape:"nebbiolo",genre:"Opera",artist:"Pavarotti",song:"Nessun Dorma",why:"Italian, dramatic, and profoundly moving"},
{grape:"gamay",genre:"Indie",artist:"Mac DeMarco",song:"Chamber of Reflection",why:"Light, fun, and effortlessly cool"},
{grape:"malbec",genre:"Tango",artist:"Astor Piazzolla",song:"Libertango",why:"Argentine passion in every note and sip"},
{grape:"tempranillo",genre:"Flamenco",artist:"Paco de Luc\u00eda",song:"Entre dos Aguas",why:"Spanish fire and tradition"},
{grape:"sangiovese",genre:"Italian Pop",artist:"Andrea Bocelli",song:"Con te partir\u00f2",why:"Italian soul, beloved worldwide"},
{grape:"gewurztraminer",genre:"World",artist:"Nusrat Fateh Ali Khan",song:"Mustt Mustt",why:"Exotic, aromatic, and transportive"},
{grape:"viognier",genre:"Bossa Nova",artist:"Astrud Gilberto",song:"Girl from Ipanema",why:"Floral, elegant, and dreamy"},
{grape:"chenin_blanc",genre:"Afrobeat",artist:"Fela Kuti",song:"Water No Get Enemy",why:"Versatile, rhythmic, and South African at heart"},
{grape:"zinfandel",genre:"Blues",artist:"B.B. King",song:"The Thrill Is Gone",why:"Bold, jammy, and full of character"},
{grape:"touriga_nacional",genre:"Fado",artist:"Am\u00e1lia Rodrigues",song:"Estranha Forma de Vida",why:"Portuguese soul, deep and melancholic"},
{grape:"albarino",genre:"Surf Rock",artist:"Beach Boys",song:"Good Vibrations",why:"Salty, breezy, and beachy"},
{grape:"pinot_grigio",genre:"Lounge",artist:"Sade",song:"Smooth Operator",why:"Light, easy, and effortlessly stylish"}
];


/* ===== v5 NEW DATA ===== */
var ADVENTURES_DB=[
{id:"tour_de_france",name:"Tour de France",emoji:"\u{1F1EB}\u{1F1F7}",desc:"Try 5 iconic French wines",wines:["pinot_noir","chardonnay","cabernet_sauvignon","grenache","chenin_blanc"],reward:25},
{id:"italian_job",name:"The Italian Job",emoji:"\u{1F1EE}\u{1F1F9}",desc:"Try 5 classic Italian grapes",wines:["nebbiolo","sangiovese","barbera","pinot_grigio","primitivo"],reward:25},
{id:"aussie_odyssey",name:"Aussie Odyssey",emoji:"\u{1F1E6}\u{1F1FA}",desc:"Try 5 Australian favourites",wines:["shiraz","semillon","chardonnay","grenache","riesling"],reward:25},
{id:"southern_stars",name:"Southern Stars",emoji:"\u2B50",desc:"Wines from the Southern Hemisphere",wines:["malbec","pinotage","torrontes","carmenere","sauvignon_blanc"],reward:20},
{id:"bold_beautiful",name:"Bold & Beautiful",emoji:"\u{1F4AA}",desc:"Try 5 full-bodied reds",wines:["cabernet_sauvignon","shiraz","mourvedre","nebbiolo","touriga_nacional"],reward:20},
{id:"light_bright",name:"Light & Bright",emoji:"\u2728",desc:"Try 5 crisp refreshing whites",wines:["sauvignon_blanc","riesling","pinot_grigio","albarino","gruner_veltliner"],reward:20}
];

var RESTAURANT_DB={
date_night:{name:"Date Night",emoji:"\u{1F495}",courses:[
{course:"Bubbles to Start",wines:["chardonnay","muscat"],jovalPick:"Audrey Wilkinson Brut Reserve NV"},
{course:"Shared Entree",wines:["sauvignon_blanc","pinot_grigio"],jovalPick:"Sigalas Assyrtiko"},
{course:"Mains",wines:["pinot_noir","grenache"],jovalPick:"Yabby Lake Pinot Noir"},
{course:"Dessert",wines:["muscat","riesling"],jovalPick:"Audrey Wilkinson Moscato"}
]},
business_dinner:{name:"Business Dinner",emoji:"\u{1F454}",courses:[
{course:"Aperitif",wines:["chardonnay","gruner_veltliner"],jovalPick:"Audrey Wilkinson Brut Reserve NV"},
{course:"Entree",wines:["riesling","chardonnay"],jovalPick:"Craggy Range Kidnappers Chardonnay"},
{course:"Main",wines:["cabernet_sauvignon","nebbiolo"],jovalPick:"Alkoomi Icon Blackbutt Cabernet Sauvignon"},
{course:"Cheese",wines:["pinot_noir","nebbiolo"],jovalPick:"Heathcote Estate Nebbiolo"}
]},
family_celebration:{name:"Family Celebration",emoji:"\u{1F389}",courses:[
{course:"Welcome Drinks",wines:["sauvignon_blanc","gamay"],jovalPick:"All Saints Estate Prosecco NV"},
{course:"Starters",wines:["riesling","sauvignon_blanc"],jovalPick:"Shaw Smith Sauvignon Blanc"},
{course:"Roast",wines:["shiraz","cabernet_sauvignon"],jovalPick:"Shaw Smith Shiraz"},
{course:"Dessert",wines:["muscat","riesling"],jovalPick:"All Saints The Keep Tawny Port"}
]},
quick_lunch:{name:"Quick Lunch",emoji:"\u{1F96A}",courses:[
{course:"Glass with Lunch",wines:["sauvignon_blanc","pinot_grigio","gamay"],jovalPick:"Printhie Mountain Range Sauvignon Blanc"}
]},
wine_bar:{name:"Wine Bar",emoji:"\u{1F377}",courses:[
{course:"By the Glass - White",wines:["chardonnay","riesling","sauvignon_blanc"],jovalPick:"Rising Chardonnay"},
{course:"By the Glass - Red",wines:["pinot_noir","grenache","shiraz"],jovalPick:"In Dreams Pinot Noir"},
{course:"Something Different",wines:["gewurztraminer","torrontes","gruner_veltliner"],jovalPick:"Pollen Gewurztraminer"}
]}
};

var JOURNAL_MOODS=[
{emoji:"\u{1F60D}",label:"Amazing"},
{emoji:"\u{1F60B}",label:"Delicious"},
{emoji:"\u{1F60A}",label:"Nice"},
{emoji:"\u{1F914}",label:"Interesting"},
{emoji:"\u{1F974}",label:"Not for me"}
];
