const REGIONS_DB={
france:{name:"France",emoji:"🇫🇷",regions:[
{name:"Bordeaux",grapes:["cabernet_sauvignon","merlot"],desc:"Home of Cab and Merlot blends"},
{name:"Burgundy",grapes:["pinot_noir","chardonnay"],desc:"Pinot Noir and Chardonnay perfection"},
{name:"Champagne",grapes:["chardonnay","pinot_noir"],desc:"The only true Champagne"},
{name:"Loire Valley",grapes:["chenin_blanc","sauvignon_blanc"],desc:"Chenin and Sauv Blanc paradise"},
{name:"Rhône Valley",grapes:["grenache","shiraz","viognier"],desc:"GSM blends and Viognier"},
{name:"Alsace",grapes:["riesling","gewurztraminer"],desc:"Aromatic whites on German border"},
{name:"Provence",grapes:["grenache"],desc:"World's rosé capital"},
{name:"Languedoc",grapes:["grenache","shiraz","mourvedre"],desc:"Value wines from the south"}
]},
italy:{name:"Italy",emoji:"🇮🇹",regions:[
{name:"Tuscany",grapes:["sangiovese"],desc:"Chianti and Brunello territory"},
{name:"Piedmont",grapes:["nebbiolo","barbera"],desc:"Barolo and Barbaresco heartland"},
{name:"Veneto",grapes:["pinot_grigio"],desc:"Prosecco and Soave country"},
{name:"Sicily",grapes:["grenache"],desc:"Volcanic wines from Etna"},
{name:"Alto Adige",grapes:["pinot_grigio","pinot_noir"],desc:"Alpine whites with Austrian flair"},
{name:"Puglia",grapes:["primitivo"],desc:"Southern sunshine and value"}
]},
spain:{name:"Spain",emoji:"🇪🇸",regions:[
{name:"Rioja",grapes:["tempranillo"],desc:"Spain's most famous red region"},
{name:"Ribera del Duero",grapes:["tempranillo"],desc:"Bold Tempranillo at altitude"},
{name:"Priorat",grapes:["grenache"],desc:"Intense reds from slate terraces"},
{name:"Rías Baixas",grapes:["albarino"],desc:"Albariño and Atlantic seafood"},
{name:"Penedès",grapes:["chardonnay"],desc:"Home of Cava"}
]},
germany:{name:"Germany",emoji:"🇩🇪",regions:[
{name:"Mosel",grapes:["riesling"],desc:"Steep slate slopes, electric Riesling"},
{name:"Rheingau",grapes:["riesling"],desc:"Rich Riesling with structure"},
{name:"Pfalz",grapes:["riesling","gewurztraminer"],desc:"Warm and generous German wines"},
{name:"Baden",grapes:["pinot_noir"],desc:"Germany's warmest wine region"}
]},
portugal:{name:"Portugal",emoji:"🇵🇹",regions:[
{name:"Douro Valley",grapes:["touriga_nacional"],desc:"Port wine homeland"},
{name:"Alentejo",grapes:["touriga_nacional"],desc:"Plains of rich red wines"},
{name:"Vinho Verde",grapes:["albarino"],desc:"Fresh, light, slightly fizzy"},
{name:"Dão",grapes:["touriga_nacional"],desc:"Elegant granite-grown reds"}
]},
australia:{name:"Australia",emoji:"🇦🇺",regions:[
{name:"Barossa Valley",grapes:["shiraz","grenache"],desc:"Bold Shiraz, old vines"},
{name:"McLaren Vale",grapes:["shiraz","grenache"],desc:"Beach meets vine GSM blends"},
{name:"Margaret River",grapes:["cabernet_sauvignon","chardonnay"],desc:"Bordeaux-style blends and Chardonnay"},
{name:"Yarra Valley",grapes:["pinot_noir","chardonnay"],desc:"Cool climate elegance near Melbourne"},
{name:"Hunter Valley",grapes:["semillon","shiraz"],desc:"Semillon that ages forever"},
{name:"Adelaide Hills",grapes:["sauvignon_blanc","pinot_noir"],desc:"Cool altitude freshness"},
{name:"Coonawarra",grapes:["cabernet_sauvignon"],desc:"Terra rossa Cabernet country"},
{name:"Tasmania",grapes:["pinot_noir","chardonnay"],desc:"Cool island sparkling and Pinot"},
{name:"Frankland River",grapes:["riesling","cabernet_sauvignon"],desc:"WA's cool continental gem"},
{name:"Eden Valley",grapes:["riesling","shiraz"],desc:"High elevation Riesling and Shiraz"}
]},
newzealand:{name:"New Zealand",emoji:"🇳🇿",regions:[
{name:"Marlborough",grapes:["sauvignon_blanc"],desc:"World-famous Sauv Blanc"},
{name:"Central Otago",grapes:["pinot_noir"],desc:"World's southernmost Pinot Noir"},
{name:"Hawkes Bay",grapes:["chardonnay","merlot"],desc:"Bordeaux-style blends"},
{name:"Martinborough",grapes:["pinot_noir"],desc:"Boutique cool climate Pinot"}
]},
usa:{name:"USA",emoji:"🇺🇸",regions:[
{name:"Napa Valley",grapes:["cabernet_sauvignon"],desc:"California's premier Cab region"},
{name:"Sonoma",grapes:["pinot_noir","chardonnay"],desc:"Diverse and quality focused"},
{name:"Willamette Valley",grapes:["pinot_noir"],desc:"Oregon Pinot rivals Burgundy"},
{name:"Paso Robles",grapes:["zinfandel","grenache"],desc:"Bold Rhône and Zin blends"},
{name:"Santa Barbara",grapes:["pinot_noir","chardonnay"],desc:"Sideways country, cool and elegant"}
]},
argentina:{name:"Argentina",emoji:"🇦🇷",regions:[
{name:"Mendoza",grapes:["malbec","torrontes"],desc:"High altitude Malbec capital"},
{name:"Salta",grapes:["torrontes"],desc:"Highest vineyards on Earth"},
{name:"Patagonia",grapes:["pinot_noir","merlot"],desc:"Cool winds and clean fruit"}
]},
chile:{name:"Chile",emoji:"🇨🇱",regions:[
{name:"Maipo Valley",grapes:["cabernet_sauvignon","carmenere"],desc:"Chile's Napa equivalent"},
{name:"Colchagua",grapes:["carmenere","shiraz"],desc:"Rich reds in warm valleys"},
{name:"Casablanca",grapes:["sauvignon_blanc","chardonnay"],desc:"Cool coastal whites"},
{name:"Leyda",grapes:["sauvignon_blanc","pinot_noir"],desc:"Pacific-cooled freshness"}
]},
southafrica:{name:"South Africa",emoji:"🇿🇦",regions:[
{name:"Stellenbosch",grapes:["cabernet_sauvignon","pinotage"],desc:"Premium reds near Cape Town"},
{name:"Swartland",grapes:["chenin_blanc","shiraz"],desc:"Trendy natural wine hub"},
{name:"Walker Bay",grapes:["pinot_noir","chardonnay"],desc:"Cool Burgundy styles"},
{name:"Constantia",grapes:["sauvignon_blanc"],desc:"Historic sweet wine estate"}
]},
austria:{name:"Austria",emoji:"🇦🇹",regions:[
{name:"Wachau",grapes:["gruner_veltliner","riesling"],desc:"Terraced vineyards along the Danube"},
{name:"Kamptal",grapes:["gruner_veltliner"],desc:"Löss soil Grüner specialist"},
{name:"Burgenland",grapes:["pinot_noir"],desc:"Sweet wines and reds around lake"}
]},
greece:{name:"Greece",emoji:"🇬🇷",regions:[
{name:"Santorini",grapes:["albarino"],desc:"Volcanic Assyrtiko, saline and intense"},
{name:"Naoussa",grapes:["nebbiolo"],desc:"Xinomavro, Greece's answer to Nebbiolo"},
{name:"Nemea",grapes:["sangiovese"],desc:"Agiorgitiko, velvet reds"}
]}
};