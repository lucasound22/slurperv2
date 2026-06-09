const MEALS_DB={
red_meat:[
{emoji:"🥩",name:"Ribeye Steak",wines:["cabernet_sauvignon","shiraz","malbec"],jovalPick:"Shaw Smith Shiraz"},
{emoji:"🐑",name:"Lamb Rack",wines:["cabernet_sauvignon","tempranillo","nebbiolo"],jovalPick:"Alkoomi Icon Blackbutt Cabernet Sauvignon"},
{emoji:"🥩",name:"Beef Bourguignon",wines:["pinot_noir","merlot","grenache"],jovalPick:"Yabby Lake Pinot Noir"},
{emoji:"🍖",name:"Osso Buco",wines:["nebbiolo","sangiovese","barbera"],jovalPick:"Heathcote Estate Nebbiolo"},
{emoji:"🥩",name:"Wagyu Burger",wines:["malbec","shiraz","zinfandel"],jovalPick:"Days and Daze Freethinker Shiraz"}
],
white_meat:[
{emoji:"🐔",name:"Roast Chicken",wines:["chardonnay","viognier","pinot_noir"],jovalPick:"Pierro Chardonnay"},
{emoji:"🦃",name:"Turkey",wines:["pinot_noir","gamay","chenin_blanc"],jovalPick:"Chatto Intrigue Pinot Noir"},
{emoji:"🐷",name:"Pork Belly",wines:["riesling","chenin_blanc","grenache"],jovalPick:"Alkoomi Collection Riesling"},
{emoji:"🐔",name:"Chicken Parmigiana",wines:["sangiovese","barbera","merlot"],jovalPick:"Tar and Roses Tempranillo"},
{emoji:"🐷",name:"Pulled Pork",wines:["shiraz","grenache","zinfandel"],jovalPick:"Whistler Get In My Belly Grenache"}
],
seafood:[
{emoji:"🦞",name:"Lobster",wines:["chardonnay","semillon","viognier"],jovalPick:"Craggy Range Kidnappers Chardonnay"},
{emoji:"🐟",name:"Grilled Salmon",wines:["pinot_noir","chardonnay","gamay"],jovalPick:"Alta Pinot Noir"},
{emoji:"🦐",name:"Garlic Prawns",wines:["sauvignon_blanc","albarino","pinot_grigio"],jovalPick:"Te Mata Cape Crest Sauvignon Blanc"},
{emoji:"🦪",name:"Oysters",wines:["semillon","sauvignon_blanc","muscat"],jovalPick:"Audrey Wilkinson Semillon"},
{emoji:"🐟",name:"Fish & Chips",wines:["sauvignon_blanc","riesling","pinot_grigio"],jovalPick:"Shaw Smith Sauvignon Blanc"}
],
pasta:[
{emoji:"🍝",name:"Bolognese",wines:["sangiovese","barbera","merlot"],jovalPick:"The Pawn Montepulciano"},
{emoji:"🍝",name:"Carbonara",wines:["chardonnay","viognier","pinot_grigio"],jovalPick:"Amelia Park Reserve Chardonnay"},
{emoji:"🍝",name:"Truffle Pasta",wines:["nebbiolo","pinot_noir","sangiovese"],jovalPick:"Giovanni Rosso Roero Arneis"},
{emoji:"🍝",name:"Puttanesca",wines:["sangiovese","barbera","grenache"],jovalPick:"Tar and Roses Tempranillo"},
{emoji:"🍝",name:"Arrabbiata",wines:["sangiovese","primitivo","barbera"],jovalPick:"The Pawn Montepulciano"}
],
pizza:[
{emoji:"🍕",name:"Margherita",wines:["sangiovese","barbera","gamay"],jovalPick:"Tar and Roses Tempranillo"},
{emoji:"🍕",name:"Pepperoni",wines:["zinfandel","shiraz","primitivo"],jovalPick:"Days and Daze Freethinker Shiraz"},
{emoji:"🍕",name:"Four Cheese",wines:["pinot_noir","barbera","merlot"],jovalPick:"Sticks Pinot Noir"},
{emoji:"🍕",name:"Prosciutto",wines:["sangiovese","gamay","pinot_noir"],jovalPick:"Big Buffalo Pinot Noir"},
{emoji:"🍕",name:"Hawaiian",wines:["riesling","sauvignon_blanc","gamay"],jovalPick:"Alkoomi Grazing Riesling"}
],
asian:[
{emoji:"🍛",name:"Thai Green Curry",wines:["riesling","gewurztraminer","torrontes"],jovalPick:"Pollen Gewurztraminer"},
{emoji:"🍣",name:"Sushi",wines:["sauvignon_blanc","riesling","pinot_grigio"],jovalPick:"Ashbrook Estate Sauvignon Blanc"},
{emoji:"🥟",name:"Dumplings",wines:["riesling","pinot_noir","gamay"],jovalPick:"Alkoomi Collection Riesling"},
{emoji:"🍜",name:"Pho",wines:["riesling","gewurztraminer","pinot_noir"],jovalPick:"Pollen Gewurztraminer"},
{emoji:"🦆",name:"Peking Duck",wines:["pinot_noir","gewurztraminer","grenache"],jovalPick:"In Dreams Pinot Noir"}
],
vegetarian:[
{emoji:"🥗",name:"Greek Salad",wines:["sauvignon_blanc","albarino","pinot_grigio"],jovalPick:"Sigalas Assyrtiko"},
{emoji:"🍄",name:"Mushroom Risotto",wines:["pinot_noir","nebbiolo","chardonnay"],jovalPick:"Burton McMahon Pinot Noir"},
{emoji:"🧆",name:"Falafel",wines:["sauvignon_blanc","grenache","gamay"],jovalPick:"Maison Saint Aix Dry White"},
{emoji:"🌽",name:"Grilled Vegetables",wines:["sauvignon_blanc","viognier","grenache"],jovalPick:"Aphelion Callow Grenache Blanc"},
{emoji:"🍆",name:"Eggplant Parmigiana",wines:["sangiovese","barbera","merlot"],jovalPick:"Tar and Roses Tempranillo"}
],
cheese:[
{emoji:"🧀",name:"Cheese Board",wines:["pinot_noir","riesling","chardonnay"],jovalPick:"Yabby Lake Pinot Noir"},
{emoji:"🧀",name:"Fondue",wines:["gruner_veltliner","chardonnay","pinot_noir"],jovalPick:"Inama Vin Soave Classico"},
{emoji:"🧀",name:"Cheese Toastie",wines:["merlot","gamay","sauvignon_blanc"],jovalPick:"Sticks Pinot Noir"},
{emoji:"🧀",name:"Baked Camembert",wines:["chardonnay","pinot_noir","gamay"],jovalPick:"Leeuwin Estate Prelude Chardonnay"},
{emoji:"🧀",name:"Blue Cheese Platter",wines:["riesling","muscat","touriga_nacional"],jovalPick:"All Saints The Keep Tawny Port"}
],
dessert:[
{emoji:"🍰",name:"Pavlova",wines:["muscat","riesling","semillon"],jovalPick:"Audrey Wilkinson Moscato"},
{emoji:"🍫",name:"Chocolate Fondant",wines:["touriga_nacional","shiraz","malbec"],jovalPick:"All Saints The Keep Tawny Port"},
{emoji:"🍓",name:"Strawberries & Cream",wines:["muscat","gamay","pinot_noir"],jovalPick:"Audrey Wilkinson Moscato"},
{emoji:"🍎",name:"Apple Crumble",wines:["riesling","chenin_blanc","muscat"],jovalPick:"Alkoomi Grazing Late Harvest"},
{emoji:"🍮",name:"Creme Brulee",wines:["semillon","muscat","chenin_blanc"],jovalPick:"Alkoomi Icon Wandoo Semillon"}
],
bbq:[
{emoji:"🔥",name:"BBQ Ribs",wines:["shiraz","zinfandel","malbec"],jovalPick:"MMAD Vineyard Shiraz"},
{emoji:"🌭",name:"Snags",wines:["grenache","gamay","merlot"],jovalPick:"Whistler Get In My Belly Grenache"},
{emoji:"🍗",name:"BBQ Chicken",wines:["chardonnay","grenache","shiraz"],jovalPick:"Credaro 1000 Crowns Chardonnay"},
{emoji:"🥩",name:"Lamb Chops",wines:["cabernet_sauvignon","tempranillo","shiraz"],jovalPick:"Hesketh Coonawarra Cabernet"},
{emoji:"🌽",name:"Corn on the Cob",wines:["sauvignon_blanc","viognier","chardonnay"],jovalPick:"Printhie Mountain Range Sauvignon Blanc"}
]
};

const CHEESE_DB=[
{emoji:"🧀",name:"Brie",wines:["pinot_noir","chardonnay","gamay"],desc:"Soft, creamy, buttery French classic"},
{emoji:"🧀",name:"Camembert",wines:["pinot_noir","gamay","chenin_blanc"],desc:"Earthy and mushroomy with a bloomy rind"},
{emoji:"🧀",name:"Cheddar",wines:["cabernet_sauvignon","shiraz","malbec"],desc:"Sharp, complex, versatile crowd pleaser"},
{emoji:"🧀",name:"Gruyère",wines:["chardonnay","pinot_noir","gruner_veltliner"],desc:"Nutty, slightly sweet Swiss alpine cheese"},
{emoji:"🧀",name:"Parmesan",wines:["nebbiolo","sangiovese","barbera"],desc:"Salty, crystalline, umami bomb"},
{emoji:"🧀",name:"Blue Cheese",wines:["riesling","muscat","touriga_nacional"],desc:"Bold, pungent, needs sweetness to balance"},
{emoji:"🧀",name:"Gouda",wines:["merlot","viognier","chardonnay"],desc:"Caramel and butterscotch, smooth and rich"},
{emoji:"🧀",name:"Manchego",wines:["tempranillo","grenache","albarino"],desc:"Spanish sheep's milk, nutty and firm"},
{emoji:"🧀",name:"Comté",wines:["chardonnay","viognier","gruner_veltliner"],desc:"Fruity, nutty French Gruyère cousin"},
{emoji:"🧀",name:"Pecorino",wines:["sangiovese","nebbiolo","barbera"],desc:"Sharp Italian sheep cheese, salty and firm"},
{emoji:"🧀",name:"Mozzarella",wines:["pinot_grigio","sauvignon_blanc","gamay"],desc:"Fresh, milky, stretchy Italian classic"},
{emoji:"🧀",name:"Roquefort",wines:["riesling","muscat","semillon"],desc:"King of blue cheeses, tangy and creamy"},
{emoji:"🧀",name:"Goat Cheese",wines:["sauvignon_blanc","chenin_blanc","albarino"],desc:"Tangy, fresh, Loire Valley's best friend"},
{emoji:"🧀",name:"Havarti",wines:["riesling","pinot_grigio","chardonnay"],desc:"Semi-soft, buttery Danish charmer"},
{emoji:"🧀",name:"Stilton",wines:["touriga_nacional","muscat","riesling"],desc:"English blue, complex and crumbly"}
];

const KIDS_MEALS_DB=[
{emoji:"🍕",kidMeal:"Pizza Night",parentWines:["sangiovese","gamay","barbera"],jovalPick:"Tar and Roses Tempranillo"},
{emoji:"🍔",kidMeal:"Burgers & Chips",parentWines:["malbec","shiraz","merlot"],jovalPick:"Days and Daze Freethinker Shiraz"},
{emoji:"🐔",kidMeal:"Chicken Nuggets",parentWines:["chardonnay","sauvignon_blanc","grenache"],jovalPick:"Alkoomi Grazing Chardonnay"},
{emoji:"🍝",kidMeal:"Mac & Cheese",parentWines:["chardonnay","pinot_grigio","gamay"],jovalPick:"Nanny Goat Vineyard Chardonnay"},
{emoji:"🌭",kidMeal:"Hot Dogs",parentWines:["grenache","gamay","merlot"],jovalPick:"Whistler Get In My Belly Grenache"},
{emoji:"🍗",kidMeal:"Fish Fingers",parentWines:["sauvignon_blanc","riesling","pinot_grigio"],jovalPick:"Shaw Smith Sauvignon Blanc"},
{emoji:"🥞",kidMeal:"Pancakes for Dinner",parentWines:["muscat","riesling","chenin_blanc"],jovalPick:"Audrey Wilkinson Moscato"},
{emoji:"🌮",kidMeal:"Taco Tuesday",parentWines:["grenache","tempranillo","malbec"],jovalPick:"Karman Tinto Rioja Tempranillo"}
];