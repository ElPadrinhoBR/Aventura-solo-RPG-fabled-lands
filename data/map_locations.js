// Mapeamento Geográfico Fiel e Gravuras de Golnir (Fabled Lands II)
// 100% em Português

const GOLNIR_LANDMARKS = {
  "shipwreck_beach": {
    "id": "shipwreck_beach",
    "name": "Falésias Brancas (Praia do Naufrágio)",
    "type": "costa",
    "icon": "⚓",
    "x": 24.0,
    "y": 64.0,
    "description": "Praia desolada aos pés de imponentes falésias de giz branco, onde os destroços do seu navio naufragado foram lançados pelas ondas violentas.",
    "primarySection": "1",
    "sections": [
      "1",
      "217",
      "559",
      "705"
    ]
  },
  "ringhorn": {
    "id": "ringhorn",
    "name": "Porto de Ringhorn",
    "type": "porto",
    "icon": "🏛️",
    "x": 45.0,
    "y": 60.5,
    "description": "A orgulhosa e movimentada capital marítima de Golnir. Repleta de navios mercantes, armazéns de especiarias, tavernas de marinheiros e a sede dos mestres das docas.",
    "primarySection": "2",
    "sections": [
      "2",
      "26",
      "32",
      "50",
      "88",
      "112",
      "140",
      "180",
      "255",
      "300",
      "402",
      "450",
      "500"
    ]
  },
  "ravayne": {
    "id": "ravayne",
    "name": "Castelo Ravayne",
    "type": "castelo",
    "icon": "🏰",
    "x": 40.0,
    "y": 56.0,
    "description": "Fortaleza ancestral e austera do Barão Aldred. Seus baluartes de pedra vigiam a estrada costeira e abrigam cavaleiros leais ao governante de Golnir.",
    "primarySection": "11",
    "sections": [
      "11",
      "25",
      "44",
      "66",
      "110",
      "155",
      "210",
      "320",
      "411",
      "520"
    ]
  },
  "delpton": {
    "id": "delpton",
    "name": "Vilarejo de Delpton",
    "type": "cidade",
    "icon": "🏘️",
    "x": 42.0,
    "y": 45.0,
    "description": "Pequeno povoado tranquilo banhado pelo Rio Rese, cercado por pastos verdejantes e bosques no coração ocidental de Golnir.",
    "primarySection": "6",
    "sections": [
      "6",
      "75",
      "97",
      "144",
      "212",
      "281",
      "360",
      "440"
    ]
  },
  "chard_inn": {
    "id": "chard_inn",
    "name": "Estalagem de Chard",
    "type": "estalagem",
    "icon": "🍺",
    "x": 47.0,
    "y": 50.5,
    "description": "Conhecida estalagem e ponto de encontro na encruzilhada das rotas centrais, famosa pelas suas canecas de cerveja escura e notícias de viajantes.",
    "primarySection": "120",
    "sections": [
      "120",
      "189",
      "625"
    ]
  },
  "troilus_inn": {
    "id": "troilus_inn",
    "name": "Estalagem de Troilus",
    "type": "estalagem",
    "icon": "🍻",
    "x": 49.5,
    "y": 56.0,
    "description": "Acolhedor refúgio à beira da charneca, oferecendo hidromel e camas de palha seca a quem cavalga rumo a Ringhorn.",
    "primarySection": "218",
    "sections": [
      "218",
      "330"
    ]
  },
  "whistling_heath": {
    "id": "whistling_heath",
    "name": "A Charneca Sussurrante",
    "type": "selvagem",
    "icon": "🌾",
    "x": 62.0,
    "y": 53.5,
    "description": "Vasta extensão de urzes e ventos constantes que assobiam nas noites escuras. Viajantes apressam o passo com receio de salteadores e feras.",
    "primarySection": "35",
    "sections": [
      "35",
      "71",
      "149",
      "225",
      "338"
    ]
  },
  "wheatfields": {
    "id": "wheatfields",
    "name": "Campos de Trigo (Wheatfields)",
    "type": "cidade",
    "icon": "🌾",
    "x": 57.0,
    "y": 39.5,
    "description": "Celeiro dourado do reino. Aldeia próspera cercada por infindáveis lavouras de trigo dourado, moinhos de vento e fazendas prósperas.",
    "primarySection": "78",
    "sections": [
      "29",
      "31",
      "64",
      "78",
      "166",
      "230",
      "310",
      "380"
    ]
  },
  "goldfall": {
    "id": "goldfall",
    "name": "Cidade de Goldfall",
    "type": "cidade",
    "icon": "💰",
    "x": 71.5,
    "y": 43.0,
    "description": "Rica cidade comercial edificada onde as águas cristalinas do Rio Rainbow correm rumo ao sul. Centro de grandes feirantes, curtidores e ourives.",
    "primarySection": "81",
    "sections": [
      "58",
      "81",
      "104",
      "201",
      "349",
      "356",
      "412"
    ]
  },
  "conflass": {
    "id": "conflass",
    "name": "Posto Fronteiriço de Conflass",
    "type": "cidade",
    "icon": "🚩",
    "x": 84.0,
    "y": 47.0,
    "description": "Cidade fortificada junto ao Rio Grimm, na fronteira oriental. Sentinelas atentas vigiam a passagem e pontes entre Golnir e o Velho Sokar.",
    "primarySection": "94",
    "sections": [
      "74",
      "94",
      "130",
      "131",
      "145",
      "240"
    ]
  },
  "molhern": {
    "id": "molhern",
    "name": "Mosteiro de Molhern",
    "type": "sagrado",
    "icon": "⛪",
    "x": 75.0,
    "y": 51.0,
    "description": "Abadia isolada de monges devotos a Molhern, deus da cura e do conhecimento. Oferecem bênçãos restauradoras e abrigo aos peregrinos sinceros.",
    "primarySection": "8",
    "sections": [
      "8",
      "28",
      "62",
      "118",
      "190",
      "270"
    ]
  },
  "haggart_corner": {
    "id": "haggart_corner",
    "name": "Esquina de Haggart",
    "type": "estalagem",
    "icon": "🛖",
    "x": 73.5,
    "y": 58.5,
    "description": "Arraial e cruzamento vital de caravanas de mercadores que ligam Wishport a Goldfall e à Charneca Sussurrante.",
    "primarySection": "79",
    "sections": [
      "79",
      "127",
      "150",
      "173",
      "216"
    ]
  },
  "magwort_fens": {
    "id": "magwort_fens",
    "name": "Pântanos de Magwort",
    "type": "selvagem",
    "icon": "🌫️",
    "x": 74.0,
    "y": 63.5,
    "description": "Mangues e pântanos enevoados repletos de sanguessugas gigantes, juncos venenosos e brumas pestilentas ao norte de Wishport.",
    "primarySection": "142",
    "sections": [
      "142",
      "248",
      "335",
      "415"
    ]
  },
  "metriciens": {
    "id": "metriciens",
    "name": "Metrópole Real de Metriciens",
    "type": "cidade",
    "icon": "👑",
    "x": 65.5,
    "y": 67.0,
    "description": "A magnífica capital de Golnir, cercada por muralhas douradas. Palácios de nobres, praça de torneios, grandes bazares e o centro político do reino.",
    "primarySection": "10",
    "sections": [
      "10",
      "16",
      "33",
      "48",
      "90",
      "135",
      "160",
      "200",
      "250",
      "325",
      "400",
      "460",
      "510"
    ]
  },
  "wishport": {
    "id": "wishport",
    "name": "Porto dos Desejos (Wishport)",
    "type": "porto",
    "icon": "⛵",
    "x": 78.5,
    "y": 69.5,
    "description": "Cidade portuária vibrante na foz do Rio das Almas. Barcos pesqueiros, navios negreiros do além-mar e bazares de especiarias raras.",
    "primarySection": "3",
    "sections": [
      "3",
      "14",
      "36",
      "73",
      "96",
      "152",
      "208",
      "264",
      "340",
      "420",
      "485"
    ]
  },
  "orlock": {
    "id": "orlock",
    "name": "Ruínas do Castelo Orlock",
    "type": "castelo",
    "icon": "🏚️",
    "x": 74.5,
    "y": 73.5,
    "description": "As sombrias ruínas de uma fortaleza devastada em tempos remotos. Dizem que suas catacumbas guardam segredos e maldições ancestrais.",
    "primarySection": "291",
    "sections": [
      "291",
      "314",
      "651",
      "699"
    ]
  },
  "endless_plains": {
    "id": "endless_plains",
    "name": "Planícies Sem Fim",
    "type": "selvagem",
    "icon": "🌄",
    "x": 58.0,
    "y": 32.5,
    "description": "Vastidão aberta de campinas selvagens varridas pelo vento, habitat de manadas selvagens e cavaleiros arqueiros.",
    "primarySection": "355",
    "sections": [
      "45",
      "99",
      "188",
      "258",
      "355",
      "410"
    ]
  },
  "marmorek": {
    "id": "marmorek",
    "name": "Fortaleza de Marmorek",
    "type": "cidade",
    "icon": "🛡️",
    "x": 37.0,
    "y": 18.5,
    "description": "Baluarte setentrional encravado nos contrafortes rochosos. Patrulha as passagens montanhosas e defende as minas de ferro.",
    "primarySection": "167",
    "sections": [
      "167",
      "212",
      "236",
      "350",
      "493"
    ]
  },
  "tower_despair": {
    "id": "tower_despair",
    "name": "A Torre do Desespero",
    "type": "castelo",
    "icon": "🗼",
    "x": 42.5,
    "y": 26.5,
    "description": "Uma agulha misteriosa de pedra negra que se ergue imponente na solidão das planícies. Lar de perigos sobrenaturais.",
    "primarySection": "236",
    "sections": [
      "77",
      "100",
      "139",
      "236",
      "279",
      "431"
    ]
  },
  "haunted_hills": {
    "id": "haunted_hills",
    "name": "As Colinas Assombradas",
    "type": "selvagem",
    "icon": "👻",
    "x": 60.0,
    "y": 19.5,
    "description": "Túmulos ancestrais e montes rochosos envoltos em névoa perene, assombrados por almas penadas e aparições etéreas.",
    "primarySection": "199",
    "sections": [
      "175",
      "199",
      "305",
      "326",
      "349",
      "429"
    ]
  },
  "forsaken_forest": {
    "id": "forsaken_forest",
    "name": "Floresta dos Abandonados",
    "type": "selvagem",
    "icon": "🌲",
    "x": 80.0,
    "y": 20.0,
    "description": "Bosque colossal e escuro onde a luz do sol quase não toca o chão. Repleto de feras perigosas, bandidos e altares druídicos.",
    "primarySection": "7",
    "sections": [
      "7",
      "22",
      "23",
      "185",
      "321",
      "372",
      "716"
    ]
  },
  "lacuna": {
    "id": "lacuna",
    "name": "Abadia de Lacuna",
    "type": "sagrado",
    "icon": "🕍",
    "x": 82.5,
    "y": 29.5,
    "description": "Santuário sagrado no vale alpino de Lacuna. Os monges guardam pergaminhos arcanos e relíquias de valor inestimável.",
    "primarySection": "38",
    "sections": [
      "38",
      "61",
      "84",
      "122",
      "242",
      "294",
      "367"
    ]
  },
  "sky_mountain": {
    "id": "sky_mountain",
    "name": "Montanha Celeste (Sky Mountain)",
    "type": "selvagem",
    "icon": "🏔️",
    "x": 81.5,
    "y": 12.5,
    "description": "O cume mais alto da Espinha de Harkun, encoberto por geleiras eternas onde poucos ousam pisar.",
    "primarySection": "350",
    "sections": [
      "350",
      "480",
      "512"
    ]
  },
  "violet_ocean": {
    "id": "violet_ocean",
    "name": "Oceano Violeta",
    "type": "mar",
    "icon": "🌊",
    "x": 48.0,
    "y": 78.0,
    "description": "As vastas águas salgadas ao sul de Golnir. Aqui navegam navios mercantes, esquadras de corsários e monstros marítimos.",
    "primarySection": "73",
    "sections": [
      "73",
      "101",
      "165",
      "222",
      "315",
      "432"
    ]
  },
  "dweomer": {
    "id": "dweomer",
    "name": "Ilha dos Feiticeiros (Dweomer)",
    "type": "mar",
    "icon": "🔮",
    "x": 34.0,
    "y": 91.5,
    "description": "Ilha lendária cercada de brumas arcanas, onde sábios conjuradores dominam as artes ocultas da feitiçaria elemental.",
    "primarySection": "169",
    "sections": [
      "169",
      "261",
      "525",
      "742",
      "755"
    ]
  },
  "sea_of_weeds": {
    "id": "sea_of_weeds",
    "name": "Mar das Algas",
    "type": "mar",
    "icon": "🌿",
    "x": 55.0,
    "y": 92.0,
    "description": "Águas calmas e traiçoeiras cobertas por espessa camada de sargaços esmeralda, armadilha para marinheiros desavisados.",
    "primarySection": "261",
    "sections": [
      "261",
      "389"
    ]
  },
  "unnumbered_isles": {
    "id": "unnumbered_isles",
    "name": "Ilhas Inumeráveis (Reino dos Saqueadores)",
    "type": "mar",
    "icon": "🏴‍☠️",
    "x": 82.0,
    "y": 88.0,
    "description": "Labirinto de ilhotas escarpadas que servem de abrigo para temíveis frotas de piratas saqueadores.",
    "primarySection": "450",
    "sections": [
      "450",
      "499",
      "580"
    ]
  },
  "western_forest": {
    "id": "western_forest",
    "name": "Grande Floresta Ocidental",
    "type": "selvagem",
    "icon": "🌳",
    "x": 19.0,
    "y": 45.0,
    "description": "Vasta e inexplorada selva ao oeste do Rio Rese, fronteira com terras bárbaras.",
    "primarySection": "373",
    "sections": [
      "9",
      "373",
      "547",
      "572"
    ]
  }
};

const SECTION_TO_LANDMARK = {
  "1": "shipwreck_beach",
  "217": "shipwreck_beach",
  "559": "shipwreck_beach",
  "705": "shipwreck_beach",
  "2": "ringhorn",
  "26": "ringhorn",
  "32": "ringhorn",
  "50": "ringhorn",
  "88": "ringhorn",
  "112": "ringhorn",
  "140": "ringhorn",
  "180": "ringhorn",
  "255": "ringhorn",
  "300": "ringhorn",
  "402": "ringhorn",
  "450": "unnumbered_isles",
  "500": "ringhorn",
  "11": "ravayne",
  "25": "ravayne",
  "44": "ravayne",
  "66": "ravayne",
  "110": "ravayne",
  "155": "ravayne",
  "210": "ravayne",
  "320": "ravayne",
  "411": "ravayne",
  "520": "ravayne",
  "6": "delpton",
  "75": "delpton",
  "97": "delpton",
  "144": "delpton",
  "212": "marmorek",
  "281": "delpton",
  "360": "delpton",
  "440": "delpton",
  "120": "chard_inn",
  "189": "chard_inn",
  "625": "chard_inn",
  "218": "troilus_inn",
  "330": "troilus_inn",
  "35": "whistling_heath",
  "71": "whistling_heath",
  "149": "whistling_heath",
  "225": "whistling_heath",
  "338": "whistling_heath",
  "29": "wheatfields",
  "31": "wheatfields",
  "64": "wheatfields",
  "78": "wheatfields",
  "166": "wheatfields",
  "230": "wheatfields",
  "310": "wheatfields",
  "380": "wheatfields",
  "58": "goldfall",
  "81": "goldfall",
  "104": "goldfall",
  "201": "goldfall",
  "349": "haunted_hills",
  "356": "goldfall",
  "412": "goldfall",
  "74": "conflass",
  "94": "conflass",
  "130": "conflass",
  "131": "conflass",
  "145": "conflass",
  "240": "conflass",
  "8": "molhern",
  "28": "molhern",
  "62": "molhern",
  "118": "molhern",
  "190": "molhern",
  "270": "molhern",
  "79": "haggart_corner",
  "127": "haggart_corner",
  "150": "haggart_corner",
  "173": "haggart_corner",
  "216": "haggart_corner",
  "142": "magwort_fens",
  "248": "magwort_fens",
  "335": "magwort_fens",
  "415": "magwort_fens",
  "10": "metriciens",
  "16": "metriciens",
  "33": "metriciens",
  "48": "metriciens",
  "90": "metriciens",
  "135": "metriciens",
  "160": "metriciens",
  "200": "metriciens",
  "250": "metriciens",
  "325": "metriciens",
  "400": "metriciens",
  "460": "metriciens",
  "510": "metriciens",
  "3": "wishport",
  "14": "wishport",
  "36": "wishport",
  "73": "violet_ocean",
  "96": "wishport",
  "152": "wishport",
  "208": "wishport",
  "264": "wishport",
  "340": "wishport",
  "420": "wishport",
  "485": "wishport",
  "291": "orlock",
  "314": "orlock",
  "651": "orlock",
  "699": "orlock",
  "45": "endless_plains",
  "99": "endless_plains",
  "188": "endless_plains",
  "258": "endless_plains",
  "355": "endless_plains",
  "410": "endless_plains",
  "167": "marmorek",
  "236": "tower_despair",
  "350": "sky_mountain",
  "493": "marmorek",
  "77": "tower_despair",
  "100": "tower_despair",
  "139": "tower_despair",
  "279": "tower_despair",
  "431": "tower_despair",
  "175": "haunted_hills",
  "199": "haunted_hills",
  "305": "haunted_hills",
  "326": "haunted_hills",
  "429": "haunted_hills",
  "7": "forsaken_forest",
  "22": "forsaken_forest",
  "23": "forsaken_forest",
  "185": "forsaken_forest",
  "321": "forsaken_forest",
  "372": "forsaken_forest",
  "716": "forsaken_forest",
  "38": "lacuna",
  "61": "lacuna",
  "84": "lacuna",
  "122": "lacuna",
  "242": "lacuna",
  "294": "lacuna",
  "367": "lacuna",
  "480": "sky_mountain",
  "512": "sky_mountain",
  "101": "violet_ocean",
  "165": "violet_ocean",
  "222": "violet_ocean",
  "315": "violet_ocean",
  "432": "violet_ocean",
  "169": "dweomer",
  "261": "sea_of_weeds",
  "525": "dweomer",
  "742": "dweomer",
  "755": "dweomer",
  "389": "sea_of_weeds",
  "499": "unnumbered_isles",
  "580": "unnumbered_isles",
  "9": "western_forest",
  "373": "western_forest",
  "547": "western_forest",
  "572": "western_forest"
};

const BOOK_ILLUSTRATIONS = [
  {
    "id": "mapa_golnir",
    "title": "Mapa Oficial de Golnir (Cidades de Ouro e Glória)",
    "type": "mapa",
    "src": "assets/images/mapa_golnir.jpg",
    "caption": "O Reino Mercantil de Golnir com todas as cidades, fortalezas, florestas, rios e portos navegáveis."
  },
  {
    "id": "mapa_mundo_oriente",
    "title": "Mapa do Mundo Conhecido: Sokara & Oceanos",
    "type": "mapa",
    "src": "assets/images/mapa_mundo_oriente.jpg",
    "caption": "Mapa náutico abrangendo o Velho Sokara, Mar das Estepes, Akatsurai e as rotas ultramarinas."
  },
  {
    "id": "capa_livro",
    "title": "Capa Original do Livro Solo (Fabled Lands II)",
    "type": "gravura",
    "src": "assets/images/capa_livro.jpg",
    "caption": "As Cidades de Ouro e Glória (Dave Morris & Jamie Thomson) - A clássica aventura solo em mundo aberto."
  },
  {
    "id": "personagem_guerreiro",
    "title": "Gravura: O Cavaleiro de Golnir",
    "type": "gravura",
    "src": "assets/images/gravuras/pag8__im4_norm.png",
    "caption": "Guerreiro de armadura leal aos barões ou mercenário das estradas de Golnir."
  },
  {
    "id": "personagem_feiticeira",
    "title": "Gravura: A Feiticeira de Dweomer",
    "type": "gravura",
    "src": "assets/images/gravuras/pag8__im2_norm.png",
    "caption": "Conjuradora dos mistérios arcanos e guardiã dos tomos sagrados da ilha encantada."
  }
];

/**
 * Resolve a localização geográfica do herói baseado na seção atual e histórico
 */
function resolveHeroLocation(sectionId, currentHistory, sectionsData) {
    const sId = String(sectionId || '1');

    // 1. Mapeamento direto por seção
    if (SECTION_TO_LANDMARK[sId]) {
        return GOLNIR_LANDMARKS[SECTION_TO_LANDMARK[sId]];
    }

    // 2. Busca por palavras-chave no texto da seção atual
    if (sectionsData && sectionsData[sId]) {
        const text = (sectionsData[sId].text || '').toLowerCase();
        for (const [key, landmark] of Object.entries(GOLNIR_LANDMARKS)) {
            const nameLower = landmark.name.toLowerCase();
            const idWords = landmark.id.split('_');
            if (text.includes(nameLower)) {
                return landmark;
            }
            for (const word of idWords) {
                if (word.length > 4 && text.includes(word)) {
                    return landmark;
                }
            }
        }
    }

    // 3. Herança do último ponto de interesse visitado no histórico
    if (Array.isArray(currentHistory) && currentHistory.length > 0) {
        for (let i = currentHistory.length - 1; i >= 0; i--) {
            const prevId = String(currentHistory[i]);
            if (SECTION_TO_LANDMARK[prevId]) {
                return GOLNIR_LANDMARKS[SECTION_TO_LANDMARK[prevId]];
            }
        }
    }

    // 4. Local padrão inicial: Praia do Naufrágio / Falésias Brancas
    return GOLNIR_LANDMARKS['shipwreck_beach'];
}

// Exporta globalmente para uso no app.js
window.GOLNIR_LANDMARKS = GOLNIR_LANDMARKS;
window.SECTION_TO_LANDMARK = SECTION_TO_LANDMARK;
window.BOOK_ILLUSTRATIONS = BOOK_ILLUSTRATIONS;
window.resolveHeroLocation = resolveHeroLocation;
