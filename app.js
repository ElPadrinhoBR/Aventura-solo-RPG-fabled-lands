/**
 * FABLED LANDS 02: CIDADES DE OURO E GLÓRIA (GOLNIR)
 * Motor do Livro-Jogo Web Browser
 */

// LISTA OFICIAL DE CODEWORDS DO LIVRO 2 (GOLNIR)
const GOLNIR_CODEWORDS = [
  "Baluster", "Barnacle", "Barrage", "Baron", "Bastion", "Beam", "Beef",
  "Blemish", "Bounty", "Boysen", "Brag", "Branch", "Breeze", "Brevity",
  "Brick", "Brimstone", "Bronze", "Bruise", "Bull", "Bumper", "Bung",
  "Bunting", "Bush"
];

// PERSONAGENS PRÉ-GERADOS
const PREMADE_HEROES = [
  {
    name: "Liana, a Veloz",
    profession: "Andarilha",
    rank: 2,
    staminaMax: 13,
    staminaCurrent: 13,
    shards: 20,
    abilities: {
      COMBAT: 3,
      MAGIC: 2,
      SANCTITY: 2,
      THIEVERY: 4,
      SCOUTING: 6,
      STREETWISE: 3
    },
    inventory: ["Espada (+0 Combate)", "Casaco de Couro (+1 Defesa)", "Bússola (+1 Exploração)"],
    blessing: "",
    titles: ""
  },
  {
    name: "Ignatius, o Devoto",
    profession: "Sacerdote",
    rank: 2,
    staminaMax: 14,
    staminaCurrent: 14,
    shards: 15,
    abilities: {
      COMBAT: 4,
      MAGIC: 2,
      SANCTITY: 6,
      THIEVERY: 2,
      SCOUTING: 3,
      STREETWISE: 3
    },
    inventory: ["Maça (+0 Combate)", "Cota de Malha (+2 Defesa)", "Símbolo Sagrado"],
    blessing: "Alvir",
    titles: ""
  },
  {
    name: "Asteroth, o Arcano",
    profession: "Mago",
    rank: 2,
    staminaMax: 11,
    staminaCurrent: 11,
    shards: 25,
    abilities: {
      COMBAT: 2,
      MAGIC: 6,
      SANCTITY: 1,
      THIEVERY: 3,
      SCOUTING: 4,
      STREETWISE: 4
    },
    inventory: ["Cajado (+0 Combate)", "Veste Protetora (+1 Defesa)", "Amuleto Mágico"],
    blessing: "",
    titles: ""
  },
  {
    name: "Marlo, a Sombra",
    profession: "Ladino",
    rank: 2,
    staminaMax: 12,
    staminaCurrent: 12,
    shards: 30,
    abilities: {
      COMBAT: 4,
      MAGIC: 1,
      SANCTITY: 1,
      THIEVERY: 6,
      SCOUTING: 3,
      STREETWISE: 5
    },
    inventory: ["Adaga (+0 Combate)", "Armadura de Couro Fervido (+1 Defesa)", "Gazua (+1 Ladinagem)"],
    blessing: "",
    titles: ""
  }
];

// ESTADO GLOBAL DO JOGO
let gameState = {
  currentSection: 1,
  lang: "pt", // "pt" ou "en"
  history: [],
  hero: JSON.parse(JSON.stringify(PREMADE_HEROES[0])),
  codewords: {},
  ship: {
    type: "none",
    crew: "Media",
    port: "",
    cargo: ""
  },
  notes: "",
  currentLandmark: "shipwreck_beach",
  visitedLandmarks: ["shipwreck_beach"],
  travelHistory: ["shipwreck_beach"],
  visitedChoices: {},
  awardedSections: {}
};

// CACHE DAS SEÇÕES
let sectionsData = {
  pt: {},
  en: {}
};

// ESTADO DO COMBATE ATUAL
let activeCombat = null;

// ÍCONES DE DADOS UNICODE
const DICE_FACES = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

/* ==========================================================
   INICIALIZAÇÃO DO JOGO
   ========================================================== */
document.addEventListener("DOMContentLoaded", async () => {
  initCodewordsList();
  setupEventListeners();
  setupAudioControls();
  setupStartMenu();
  loadSavedGame();
  await loadSectionsData();
  renderHeroSheet();
  initMapSystem();
  renderCurrentSection();

  // Inicializa e mantém o motor de áudio ativo em qualquer interação do usuário
  const ensureAudioActive = () => {
    if (window.soundEngine) {
      window.soundEngine.resume();
    }
  };
  document.addEventListener("click", ensureAudioActive);
  document.addEventListener("keydown", ensureAudioActive);
  document.addEventListener("touchstart", ensureAudioActive);
});

/* ==========================================================
   CARREGAMENTO DE DADOS (JSON)
   ========================================================== */
async function loadSectionsData() {
  if (window.FL_DATA && window.FL_DATA.pt && window.FL_DATA.en) {
    sectionsData.pt = window.FL_DATA.pt;
    sectionsData.en = window.FL_DATA.en;
    return;
  }

  try {
    const resPt = await fetch("data/sections_pt.json");
    if (resPt.ok) {
      sectionsData.pt = await resPt.json();
    }
  } catch (e) {
    console.warn("Aviso ao carregar sections_pt.json:", e);
  }

  try {
    const resEn = await fetch("data/sections.json");
    if (resEn.ok) {
      sectionsData.en = await resEn.json();
    }
  } catch (e) {
    console.warn("Aviso ao carregar sections.json:", e);
  }

  // Fallback cruzado
  if (Object.keys(sectionsData.pt).length === 0 && Object.keys(sectionsData.en).length > 0) {
    sectionsData.pt = sectionsData.en;
  } else if (Object.keys(sectionsData.en).length === 0 && Object.keys(sectionsData.pt).length > 0) {
    sectionsData.en = sectionsData.pt;
  }
}

/* ==========================================================
   RENDERIZAÇÃO DA SEÇÃO DA AVENTURA
   ========================================================== */
// TÍTULOS TEMÁTICOS DOS LOCAIS DE GOLNIR
const LOCATION_TITLES = {
  1: "O Naufrágio nas Falésias Brancas",
  559: "Praia dos Naufrágios",
  705: "A Costa Deserta",
  373: "A Estrada do Forte Costeiro",
  9: "O Forte Abandonado",
  497: "A Antecâmara da Esquerda",
  522: "O Corredor Central",
  547: "A Câmara da Serpente Marinha",
  572: "O Santuário Oculto",
  596: "A Câmara das Pedras Esculpidas",
  78: "Os Campos e Colinas de Golnir",
  32: "A Estrada para Ringhorn",
  140: "A Trilha das Florestas Ocidentais",
  511: "Os Destroços na Praia Rochosa",
  413: "A Torre do Cavaleiro Renegado",
  200: "A Libertação da Donzela",
  268: "O Acampamento dos Contrabandistas"
};

/* ==========================================================
   RENDERIZAÇÃO DA HISTÓRIA (NARRATIVA PURA)
   ========================================================== */
function renderCurrentSection() {
  const secNum = gameState.currentSection;
  const sec = sectionsData.pt?.[secNum] || sectionsData.en?.[secNum];

  // Trocar tema musical por contexto de seção
  if (window.soundEngine) {
    const seaSections = [1, 559, 705, 511];
    const mysterySections = [9, 497, 522, 547, 572, 596];
    if (activeCombat && activeCombat.staminaCurrent > 0) {
      soundEngine.setTheme("combat");
    } else if (seaSections.includes(secNum)) {
      soundEngine.setTheme("sea");
    } else if (mysterySections.includes(secNum)) {
      soundEngine.setTheme("mystery");
    } else {
      soundEngine.setTheme("exploration");
    }
  }

  // Atualizar título narrativo no cabeçalho
  const titleEl = document.getElementById("story-location-title");
  if (titleEl) {
    titleEl.textContent = LOCATION_TITLES[secNum] || "Crônicas de Golnir";
  }

  // Atualizar texto (sempre em português)
  const textEl = document.getElementById("section-text");
  if (sec) {
    let rawText = sec.text || sec.text_en || "";
    // Formatar quebras de linha em parágrafos
    const paragraphs = rawText
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    textEl.innerHTML = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join("");
  } else {
    textEl.innerHTML = `<p><em>A névoa do destino oculta este caminho. Retorne pelos caminhos conhecidos de Golnir.</em></p>`;
  }

  // Atualizar rastreamento geográfico no mapa e na bússola
  updateLocationTracking(secNum, sec);

  // Resetar / Configurar Painel de Testes
  setupSectionChecks(sec);

  // Resetar / Configurar Painel de Combate
  setupSectionCombat(sec);

  // Processar recompensas automáticas da seção (itens, cacos, palavras-código)
  autoProcessSectionRewards(secNum, sec);

  // Renderizar Escolhas
  renderChoices(sec);

  // Salvar automaticamente a cada transição
  saveGameToLocalStorage();

  // Rolagem suave para o topo da história
  document.querySelector(".story-column").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ==========================================================
   ESCOLHAS, REQUISITOS E DECISÕES
   ========================================================== */

/**
 * Retorna a classe CSS de "calor" baseada em quantas vezes
 * aquele destino já foi visitado:
 *   0 = nunca  → sem classe (visual padrão)
 *   1 = 1 vez  → choice-visited-1 (levemente diferente)
 *   2 = 2 vezes → choice-visited-2 (mais quente)
 *   3+ = 3 vezes → choice-visited-3 (bem quente)
 */
function getChoiceHeatClass(targetNum) {
  const key = String(targetNum);
  const count = (gameState.visitedChoices && gameState.visitedChoices[key]) || 0;
  if (count === 0) return "";
  if (count === 1) return "choice-visited-1";
  if (count === 2) return "choice-visited-2";
  return "choice-visited-3";
}

/**
 * Avalia se o jogador atende aos requisitos de uma escolha (itens, cacos, palavras-código, postos)
 */
function evaluateChoiceRequirement(choiceText) {
  if (!choiceText) return { met: true };
  const lower = choiceText.toLowerCase();

  // 1. Verificação de Itens Notáveis de Golnir
  const knownItems = [
    { key: "ferradura de prata", name: "Ferradura de Prata" },
    { key: "pé de coelho", name: "Pé de Coelho" },
    { key: "trevo de quatro folhas", name: "Trevo de Quatro Folhas" },
    { key: "medalhão verde", name: "Medalhão Verde" },
    { key: "chave das estrelas", name: "Chave das Estrelas" },
    { key: "cabeça decepada", name: "Cabeça Decepada" },
    { key: "cabeça de dragão", name: "Cabeça de Dragão" },
    { key: "carta diplomática", name: "Carta Diplomática" },
    { key: "amuleto de escaravelho", name: "Amuleto de Escaravelho" }
  ];

  for (const item of knownItems) {
    if (lower.includes(item.key)) {
      const isNegative = lower.includes("não possua") || lower.includes("não tiver") || lower.includes("não carregue");
      const hasItem = (gameState.hero.inventory || []).some(inv => inv.toLowerCase().includes(item.key));
      const met = isNegative ? !hasItem : hasItem;
      return {
        type: "item",
        name: item.name,
        met: met,
        reason: isNegative
          ? (hasItem ? `Você possui ${item.name}` : `Não possui ${item.name}`)
          : (hasItem ? `Item: ${item.name}` : `Necessita: ${item.name}`)
      };
    }
  }

  // 2. Verificação de Palavras-Código
  const codeMatch = lower.match(/palavra-código\s+([A-Za-z]+)/i);
  if (codeMatch) {
    const code = codeMatch[1].charAt(0).toUpperCase() + codeMatch[1].slice(1).toLowerCase();
    const isNegative = lower.includes("não tiver") || lower.includes("não possua");
    const hasCode = !!(gameState.codewords && gameState.codewords[code]);
    const met = isNegative ? !hasCode : hasCode;
    return {
      type: "codeword",
      name: code,
      met: met,
      reason: isNegative
        ? (hasCode ? `Possui código ${code}` : `Não possui código ${code}`)
        : (hasCode ? `Código: ${code}` : `Necessita código: ${code}`)
    };
  }

  // 3. Verificação de Título
  if (lower.includes("paladino de ravayne")) {
    const isNegative = lower.includes("não possuir") || lower.includes("não tiver");
    const hasTitle = (gameState.hero.titles || "").toLowerCase().includes("paladino de ravayne");
    const met = isNegative ? !hasTitle : hasTitle;
    return {
      type: "title",
      name: "Paladino de Ravayne",
      met: met,
      reason: isNegative ? (hasTitle ? `Você é Paladino` : `Não é Paladino`) : (hasTitle ? `Paladino de Ravayne` : `Necessita título de Paladino`)
    };
  }

  // 4. Verificação de Posto
  if (lower.includes("4º posto")) {
    const isNegative = lower.includes("inferior") || lower.includes("não for");
    const hasRank = (gameState.hero.rank || 1) >= 4;
    const met = isNegative ? !hasRank : hasRank;
    return {
      type: "rank",
      met: met,
      reason: isNegative ? (hasRank ? `4º Posto ou maior` : `Posto inferior`) : (hasRank ? `4º Posto verificado` : `Necessita de 4º Posto`)
    };
  }

  // 5. Custo em Cacos de Ouro
  const shardsMatch = lower.match(/(\d+)\s+cacos/i);
  if (shardsMatch && (lower.includes("pag") || lower.includes("cust") || lower.includes("compr"))) {
    const cost = parseInt(shardsMatch[1]);
    const hasShards = (gameState.hero.shards || 0) >= cost;
    return {
      type: "shards",
      cost: cost,
      met: hasShards,
      reason: hasShards ? `${gameState.hero.shards}/${cost} Cacos` : `Necessita de ${cost} Cacos (Você tem ${gameState.hero.shards})`
    };
  }

  return { met: true };
}

/**
 * Processa aquisições automáticas da seção (itens, cacos, palavras-código)
 */
function autoProcessSectionRewards(secNum, sec) {
  const rewardBanner = document.getElementById("reward-banner-container");
  if (rewardBanner) rewardBanner.classList.add("hidden");

  if (!sec || !sec.text) return;
  if (!gameState.awardedSections) gameState.awardedSections = {};
  const sKey = String(secNum);
  if (gameState.awardedSections[sKey]) return; // Já concedido nesta aventura

  const txt = sec.text;
  let rewardsGiven = [];

  // 1. Palavras-Código automáticas
  const codeMatches = txt.matchAll(/(?:anote|obtenha|tome|registre)\s+(?:a\s+)?palavra-código\s+([A-Z][a-z]+)/gi);
  for (const m of codeMatches) {
    const code = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
    if (!gameState.codewords[code]) {
      gameState.codewords[code] = true;
      rewardsGiven.push(`Palavra-código: ${code}`);
      updateCodewordsUI();
    }
  }

  // 2. Cacos de Ouro automáticos
  const shardMatches = txt.matchAll(/(?:você encontra|você ganha|você recebe|pegue|receba|tome)\s+(\d+)\s+cacos/gi);
  for (const m of shardMatches) {
    const amount = parseInt(m[1]);
    if (amount > 0) {
      gameState.hero.shards = (gameState.hero.shards || 0) + amount;
      rewardsGiven.push(`+${amount} Cacos de Ouro`);
      renderHeroSheet();
    }
  }

  // 3. Itens Notáveis automáticos
  const rewardItems = [
    { pattern: /(?:ganha|recebe|encontra|pegue|obtenha)\s+(?:uma?\s+)?ferradura de prata/i, name: "Ferradura de prata" },
    { pattern: /(?:ganha|recebe|encontra|pegue|obtenha)\s+(?:um\s+)?amuleto de escaravelho/i, name: "Amuleto de escaravelho" },
    { pattern: /(?:ganha|recebe|encontra|pegue|obtenha)\s+(?:um\s+)?amuleto de pé de coelho/i, name: "Pé de coelho" },
    { pattern: /(?:ganha|recebe|encontra|pegue|obtenha)\s+(?:um\s+)?trevo de quatro folhas/i, name: "Trevo de quatro folhas" },
    { pattern: /(?:ganha|recebe|encontra|pegue|obtenha)\s+(?:um\s+)?medalhão verde/i, name: "Medalhão verde" },
    { pattern: /(?:ganha|recebe|encontra|pegue|obtenha)\s+(?:a\s+)?chave das estrelas/i, name: "Chave das estrelas" },
    { pattern: /(?:ganha|recebe|encontra|pegue|obtenha)\s+(?:uma\s+)?carta diplomática/i, name: "Carta diplomática" }
  ];

  for (const item of rewardItems) {
    if (item.pattern.test(txt)) {
      const alreadyHas = (gameState.hero.inventory || []).some(inv => inv.toLowerCase().includes(item.name.toLowerCase()));
      if (!alreadyHas && gameState.hero.inventory.length < 12) {
        gameState.hero.inventory.push(item.name);
        rewardsGiven.push(`Item: ${item.name}`);
        renderHeroSheet();
      }
    }
  }

  if (rewardsGiven.length > 0) {
    gameState.awardedSections[sKey] = true;
    if (rewardBanner) {
      const titleEl = document.getElementById("reward-banner-title");
      const descEl = document.getElementById("reward-banner-desc");
      if (titleEl) titleEl.textContent = "🎁 Recompensa Adquirida!";
      if (descEl) descEl.textContent = rewardsGiven.join(" • ");
      rewardBanner.classList.remove("hidden");
    }
    if (window.soundEngine) soundEngine.playSuccess();
    saveGameToLocalStorage();
  }
}

function renderChoices(sec) {
  const container = document.getElementById("choices-list");
  container.innerHTML = "";

  if (!sec || !sec.choices || sec.choices.length === 0) {
    container.innerHTML = `<p style="color: #887463; font-style: italic;">Sua jornada neste local chegou a um momento de reflexão. Escolha um novo rumo.</p>`;
    appendFallbackReturn(container);
    return;
  }

  const isCombatLocked = activeCombat && activeCombat.staminaCurrent > 0;
  let unblockedCount = 0;

  sec.choices.forEach(ch => {
    const heatClass = getChoiceHeatClass(ch.target);
    const visitCount = (gameState.visitedChoices && gameState.visitedChoices[String(ch.target)]) || 0;
    const req = evaluateChoiceRequirement(ch.text);

    const isLocked = isCombatLocked || !req.met;
    if (!isLocked) unblockedCount++;

    const btn = document.createElement("button");
    const lockClass = !req.met ? "choice-locked" : "";
    btn.className = `choice-btn ${isCombatLocked ? "combat-locked" : ""} ${lockClass} ${heatClass}`.trim();

    if (isLocked) {
      btn.disabled = true;
      btn.title = isCombatLocked
        ? "Você precisa resolver o combate antes de tomar uma decisão!"
        : `Requisito não atendido: ${req.reason}`;
    }

    // Texto da escolha com tags visuais claras
    let labelHtml = escapeHtml(ch.text || "Avançar na jornada");
    if (req.reason) {
      const tagClass = req.met ? "unlocked" : "locked";
      const tagIcon = req.met ? "✨" : "🔒";
      labelHtml += ` <span class="choice-req-tag ${tagClass}">${tagIcon} ${escapeHtml(req.reason)}</span>`;
    }
    btn.innerHTML = labelHtml;

    // Indicador visual de repetição (tooltip discreto)
    if (visitCount > 0 && req.met) {
      btn.title = visitCount === 1
        ? "Você já percorreu este caminho antes."
        : `Você já percorreu este caminho ${visitCount} vezes.`;
    }

    btn.addEventListener("click", () => {
      if (activeCombat && activeCombat.staminaCurrent > 0) {
        alert("Você está em combate! Termine a luta ou fuja antes de avançar.");
        return;
      }
      if (!req.met) {
        alert(`Caminho bloqueado: ${req.reason}`);
        return;
      }

      // Dedução de cacos se a escolha tiver custo pago
      if (req.cost && req.cost > 0) {
        gameState.hero.shards = Math.max(0, (gameState.hero.shards || 0) - req.cost);
        renderHeroSheet();
      }

      if (window.soundEngine) soundEngine.playClick();
      goToSection(ch.target);
    });

    container.appendChild(btn);
  });

  // Se todas as escolhas estiverem bloqueadas por falta de itens/requisitos, oferece retorno seguro
  if (unblockedCount === 0 && !isCombatLocked) {
    appendFallbackReturn(container);
  }
}

function appendFallbackReturn(container) {
  const fallbackBtn = document.createElement("button");
  fallbackBtn.className = "choice-btn choice-fallback-return";
  const fallbackTarget = gameState.history.length > 0 ? gameState.history[gameState.history.length - 1] : 2;
  fallbackBtn.innerHTML = `↩️ Retornar pelo caminho anterior (Você não possui os itens para avançar aqui)`;
  fallbackBtn.title = "Permite voltar com segurança para o local anterior de sua jornada.";
  fallbackBtn.addEventListener("click", () => {
    if (window.soundEngine) soundEngine.playClick();
    goToSection(fallbackTarget);
  });
  container.appendChild(fallbackBtn);
}

function goToSection(targetNum) {
  if (targetNum <= 0 || isNaN(targetNum)) return;

  // Registrar que esta seção-destino foi escolhida
  if (!gameState.visitedChoices) gameState.visitedChoices = {};
  const key = String(targetNum);
  gameState.visitedChoices[key] = (gameState.visitedChoices[key] || 0) + 1;

  if (gameState.currentSection !== targetNum) {
    gameState.history.push(gameState.currentSection);
    if (gameState.history.length > 20) gameState.history.shift();
  }

  gameState.currentSection = targetNum;
  renderCurrentSection();
}


/* ==========================================================
   TESTES DE HABILIDADE DINÂMICOS
   ========================================================== */
function setupSectionChecks(sec) {
  const panel = document.getElementById("check-panel");
  const resultBox = document.getElementById("check-result-box");
  resultBox.classList.add("hidden");

  if (!sec || !sec.checks || sec.checks.length === 0) {
    panel.classList.add("hidden");
    return;
  }

  panel.classList.remove("hidden");
  const check = sec.checks[0]; // Primeiro teste da seção
  const statKey = check.ability.toUpperCase();
  const diff = check.difficulty;

  const statNamesPt = {
    COMBAT: "COMBATE",
    MAGIC: "MAGIA",
    SANCTITY: "SANTIDADE",
    THIEVERY: "LADINAGEM",
    SCOUTING: "EXPLORAÇÃO",
    STREETWISE: "SOBREVIVÊNCIA URBANA"
  };

  document.getElementById("check-stat-name").textContent = statNamesPt[statKey] || statKey;
  document.getElementById("check-difficulty").textContent = diff;
  document.getElementById("check-desc").textContent = `Faça um teste de ${statNamesPt[statKey] || statKey} com Dificuldade ${diff}.`;

  const btnRoll = document.getElementById("btn-roll-check");
  btnRoll.onclick = () => {
    if (window.soundEngine) soundEngine.playDiceRoll();
    const d1 = rollD6();
    const d2 = rollD6();
    const sumDice = d1 + d2;
    const heroStat = gameState.hero.abilities[statKey] || 0;
    const total = sumDice + heroStat;
    const success = total >= diff;

    const diceDisplay = document.getElementById("check-dice-display");
    diceDisplay.innerHTML = `<span style="font-size:2rem">${DICE_FACES[d1]}</span> + <span style="font-size:2rem">${DICE_FACES[d2]}</span> = <strong>${sumDice}</strong> + Bônus (${heroStat}) = <strong>${total}</strong> vs Dif ${diff}`;

    const msgEl = document.getElementById("check-outcome-message");
    if (success) {
      msgEl.className = "outcome-msg outcome-success";
      msgEl.innerHTML = `🎉 SUCESSO! (${total} ≥ ${diff})`;
    } else {
      msgEl.className = "outcome-msg outcome-fail";
      msgEl.innerHTML = `💀 FALHA! (${total} < ${diff})`;
    }

    resultBox.classList.remove("hidden");
  };
}

/* ==========================================================
   SISTEMA DE COMBATE DINÂMICO
   ========================================================== */
function setupSectionCombat(sec) {
  const panel = document.getElementById("combat-panel");
  const logEl = document.getElementById("combat-log");
  const victoryBox = document.getElementById("combat-victory-box");
  const defeatBox = document.getElementById("combat-defeat-box");
  
  logEl.innerHTML = "";
  if (victoryBox) victoryBox.classList.add("hidden");
  if (defeatBox) defeatBox.classList.add("hidden");

  if (!sec || !sec.combats || sec.combats.length === 0) {
    panel.classList.add("hidden");
    activeCombat = null;
    return;
  }

  panel.classList.remove("hidden");
  const enemy = sec.combats[0];
  activeCombat = {
    name: enemy.enemy,
    combat: enemy.combat,
    defence: enemy.defence,
    staminaCurrent: enemy.stamina,
    staminaMax: enemy.stamina,
    section: sec
  };

  document.getElementById("enemy-name").textContent = activeCombat.name;
  document.getElementById("enemy-combat-val").textContent = activeCombat.combat;
  document.getElementById("enemy-defence-val").textContent = activeCombat.defence;
  document.getElementById("enemy-stamina-val").textContent = activeCombat.staminaCurrent;

  updateHeroCombatStats();

  // Mudar para tema musical de combate
  if (window.soundEngine) soundEngine.setTheme("combat");

  document.getElementById("btn-attack-round").onclick = fightRound;
  
  // Configurar botão de fuga
  const btnFlee = document.getElementById("btn-flee-combat");
  if (btnFlee) {
    btnFlee.classList.remove("hidden");
    btnFlee.onclick = fleeCombat;
  }
  
  // Configurar botões de derrota
  const fatePanel = document.getElementById("resurrection-fate-panel");
  if (fatePanel) {
    fatePanel.classList.add("hidden");
    fatePanel.innerHTML = "";
  }
  const btnResurrect = document.getElementById("btn-resurrect");
  if (btnResurrect) {
    btnResurrect.disabled = false;
    btnResurrect.classList.remove("hidden");
    btnResurrect.style.opacity = "1";
    btnResurrect.style.cursor = "pointer";
    btnResurrect.textContent = "✨ Suplicar aos Deuses (Ressurreição)";
    btnResurrect.onclick = handleResurrection;
  }
  const btnRestartDeath = document.getElementById("btn-restart-after-death");
  if (btnRestartDeath) {
    btnRestartDeath.onclick = () => {
      document.getElementById("btn-restart-game").click();
    };
  }
}

function fleeCombat() {
  if (!activeCombat || gameState.hero.staminaCurrent <= 0) return;

  if (window.soundEngine) {
    if (window.soundEngine.playFlee) window.soundEngine.playFlee();
    else window.soundEngine.playClick();
  }

  const logEl = document.getElementById("combat-log");
  const defeatBox = document.getElementById("combat-defeat-box");

  // Regras de fuga de Fabled Lands: o oponente ganha UM golpe de oportunidade livre enquanto você foge!
  const ed1 = rollD6();
  const ed2 = rollD6();
  const enemyRoll = ed1 + ed2 + activeCombat.combat;
  const heroDef = calculateHeroDefence();

  let msg = `<p><strong>🏃 Tentativa de Fuga!</strong> Você vira as costas para escapar!</p>`;
  msg += `<p>${activeCombat.name} desfere um golpe de oportunidade: rolou [${ed1}+${ed2}]+${activeCombat.combat} = <strong>${enemyRoll}</strong> vs sua Defesa ${heroDef}. `;

  if (enemyRoll > heroDef) {
    const dmg = enemyRoll - heroDef;
    gameState.hero.staminaCurrent = Math.max(0, gameState.hero.staminaCurrent - dmg);
    msg += `<span style="color:#b31e1e">Acertou você causando ${dmg} de dano na fuga!</span></p>`;
    if (window.soundEngine) window.soundEngine.playHurt();
  } else {
    msg += `<span style="color:#1c5e32">Errou o golpe! Você consegue se esquivar e correr!</span></p>`;
  }

  updateHeroCombatStats();
  renderHeroSheet();
  saveGameToLocalStorage(true);

  if (gameState.hero.staminaCurrent <= 0) {
    msg += `<p style="color:#b31e1e;font-weight:bold">💀 Você foi abatido durante a retirada!</p>`;
    logEl.innerHTML = msg + `<hr style="border-color:#e0c8c8;margin:6px 0;">` + logEl.innerHTML;
    if (defeatBox) defeatBox.classList.remove("hidden");
    document.querySelectorAll(".choice-btn").forEach(btn => btn.classList.add("combat-locked"));
    return;
  }

  msg += `<p style="color:#2a7a40;font-weight:bold">💨 Você conseguiu escapar com vida da batalha! Suas opções de caminho foram liberadas.</p>`;
  logEl.innerHTML = msg + `<hr style="border-color:#e0c8c8;margin:6px 0;">` + logEl.innerHTML;

  // Desativar combate e voltar tema de exploração
  const currentSec = activeCombat.section || sectionsData.pt?.[gameState.currentSection] || sectionsData.en?.[gameState.currentSection];
  activeCombat = null;

  if (window.soundEngine) window.soundEngine.setTheme("exploration");

  // Esconder botão de fuga
  const btnFlee = document.getElementById("btn-flee-combat");
  if (btnFlee) btnFlee.classList.add("hidden");

  // Liberar botões de escolha
  renderChoices(currentSec);
}

function handleResurrection() {
  const fatePanel = document.getElementById("resurrection-fate-panel");
  const btnResurrect = document.getElementById("btn-resurrect");
  if (!fatePanel) return;

  fatePanel.classList.remove("hidden");

  // Rolar julgamento divino 2d6
  if (window.soundEngine) window.soundEngine.playDiceRoll();

  const d1 = rollD6();
  const d2 = rollD6();
  const sumDice = d1 + d2;
  
  const sanctityBonus = Math.floor((gameState.hero.abilities.SANCTITY || 0) / 2);
  const hasBlessing = !!gameState.hero.blessing;
  const blessingBonus = hasBlessing ? 3 : 0;
  const total = sumDice + sanctityBonus + blessingBonus;
  const difficulty = 7; // Dificuldade do julgamento dos deuses

  const isFavor = total >= difficulty;

  let breakdown = `[${d1}] + [${d2}] = ${sumDice}`;
  if (sanctityBonus > 0) breakdown += ` + Santidade (${sanctityBonus})`;
  if (hasBlessing) breakdown += ` + Bênção de ${gameState.hero.blessing} (+3)`;
  breakdown += ` = <strong>${total}</strong> vs Julgamento Divino (${difficulty})`;

  if (isFavor) {
    // OS DEUSES LHE CONCEDERAM UMA SEGUNDA CHANCE!
    if (window.soundEngine) {
      window.soundEngine.playVictoryFanfare();
      window.soundEngine.setTheme("exploration");
    }

    gameState.hero.staminaCurrent = Math.max(1, Math.floor(gameState.hero.staminaMax / 2));
    let blessingNote = "";
    if (hasBlessing) {
      blessingNote = `<p style="font-size:0.85rem; margin-top:6px;"><em>✨ A bênção divina de ${gameState.hero.blessing} intercedeu por sua alma e foi consumida!</em></p>`;
      gameState.hero.blessing = "";
    }

    fatePanel.className = "resurrection-fate-panel fate-success";
    fatePanel.innerHTML = `
      <div class="fate-card">
        <h4>✨ OS DEUSES LHE CONCEDERAM UMA SEGUNDA CHANCE!</h4>
        <div class="fate-dice">${DICE_FACES[d1]} ${DICE_FACES[d2]}</div>
        <p>${breakdown}</p>
        <p>Um calor celestial dissipa as garras gélidas da morte! As divindades de Harkuna acolhem sua alma com misericórdia e decidem que sua lenda ainda não terminou. Você desperta ferido, mas vivo e pronto para retomar sua jornada!</p>
        ${blessingNote}
        <button id="btn-resume-after-grace" class="btn btn-action" style="margin-top:10px;">🌊 Despertar e Retomar a Jornada</button>
      </div>
    `;

    if (btnResurrect) btnResurrect.classList.add("hidden");

    renderHeroSheet();
    saveGameToLocalStorage(true);

    const btnResume = document.getElementById("btn-resume-after-grace");
    if (btnResume) {
      btnResume.onclick = () => {
        activeCombat = null;
        const panel = document.getElementById("combat-panel");
        if (panel) panel.classList.add("hidden");
        // Levar a um ponto seguro (histórico anterior ou Seção 373)
        const safeTarget = gameState.history.length > 0 ? gameState.history[gameState.history.length - 1] : 373;
        goToSection(safeTarget || 373);
      };
    }
  } else {
    // OS DEUSES NÃO ESTÃO FELIZES COM VOCÊ: MORTE FINAL!
    if (window.soundEngine) {
      window.soundEngine.playHurt();
    }

    fatePanel.className = "resurrection-fate-panel fate-doom";
    fatePanel.innerHTML = `
      <div class="fate-card">
        <h4>💀 OS DEUSES NÃO ESTÃO FELIZES COM VOCÊ: MORTE FINAL!</h4>
        <div class="fate-dice">${DICE_FACES[d1]} ${DICE_FACES[d2]}</div>
        <p>${breakdown}</p>
        <p>Os céus permanecem silenciosos e gélidos. As divindades rejeitam sua súplica e voltam-lhe as costas. Sua alma é reclamada pelas profundezas do esquecimento. <strong>O destino deste aventureiro selou-se para sempre.</strong></p>
      </div>
    `;

    if (btnResurrect) {
      btnResurrect.disabled = true;
      btnResurrect.textContent = "🔒 Os Deuses Rejeitaram seu Apelo";
      btnResurrect.style.opacity = "0.5";
      btnResurrect.style.cursor = "not-allowed";
    }

    // Travar permanentemente as escolhas da seção
    document.querySelectorAll(".choice-btn").forEach(btn => btn.classList.add("combat-locked"));
  }
}

function updateHeroCombatStats() {
  const heroDef = calculateHeroDefence();
  document.getElementById("hero-combat-defence").textContent = heroDef;
  document.getElementById("hero-combat-stamina").textContent = gameState.hero.staminaCurrent;
}

function fightRound() {
  if (!activeCombat || activeCombat.staminaCurrent <= 0 || gameState.hero.staminaCurrent <= 0) return;

  const logEl = document.getElementById("combat-log");
  const victoryBox = document.getElementById("combat-victory-box");
  const defeatBox = document.getElementById("combat-defeat-box");

  // SFX: som de espada ao iniciar a rodada
  if (window.soundEngine) soundEngine.playSwordHit();
  
  // 1. ATAQUE DO JOGADOR
  const d1 = rollD6();
  const d2 = rollD6();
  const heroRoll = d1 + d2 + gameState.hero.abilities.COMBAT;
  let heroMsg = `Você rolou [${d1}+${d2}]+${gameState.hero.abilities.COMBAT} = <strong>${heroRoll}</strong> vs Defesa ${activeCombat.defence}. `;

  if (heroRoll > activeCombat.defence) {
    const dmg = heroRoll - activeCombat.defence;
    activeCombat.staminaCurrent = Math.max(0, activeCombat.staminaCurrent - dmg);
    heroMsg += `<span style="color:#1c5e32">Acertou! Causou ${dmg} de dano!</span>`;
  } else {
    heroMsg += `<span style="color:#777">Errou o golpe!</span>`;
  }

  // 2. ATAQUE DO INIMIGO (se ainda estiver vivo)
  let enemyMsg = "";
  if (activeCombat.staminaCurrent > 0) {
    const ed1 = rollD6();
    const ed2 = rollD6();
    const enemyRoll = ed1 + ed2 + activeCombat.combat;
    const heroDef = calculateHeroDefence();
    enemyMsg = `${activeCombat.name} rolou [${ed1}+${ed2}]+${activeCombat.combat} = <strong>${enemyRoll}</strong> vs sua Defesa ${heroDef}. `;

    if (enemyRoll > heroDef) {
      const eDmg = enemyRoll - heroDef;
      gameState.hero.staminaCurrent = Math.max(0, gameState.hero.staminaCurrent - eDmg);
      enemyMsg += `<span style="color:#b31e1e">Acertou você causando ${eDmg} de dano!</span>`;
      // SFX: dano sofrido
      if (window.soundEngine) soundEngine.playHurt();
    } else {
      enemyMsg += `<span style="color:#1c5e32">Errou o golpe em você!</span>`;
    }
  } else {
    enemyMsg = `<strong>🏆 ${activeCombat.name} foi derrotado! Você venceu a batalha!</strong>`;
    if (victoryBox) victoryBox.classList.remove("hidden");
    // SFX: fanfarra de vitória + voltar tema de exploração
    if (window.soundEngine) {
      soundEngine.playVictoryFanfare();
      setTimeout(() => soundEngine.setTheme("exploration"), 1000);
    }
    // Desbloquear escolhas de caminho pós-vitória
    const currentSec = activeCombat.section || sectionsData.pt?.[gameState.currentSection] || sectionsData.en?.[gameState.currentSection];
    renderChoices(currentSec);
  }

  // Atualizar UI
  document.getElementById("enemy-stamina-val").textContent = activeCombat.staminaCurrent;
  updateHeroCombatStats();
  renderHeroSheet();
  saveGameToLocalStorage(true);

  logEl.innerHTML = `<p>${heroMsg}</p><p>${enemyMsg}</p><hr style="border-color:#e0c8c8;margin:6px 0;">` + logEl.innerHTML;

  if (gameState.hero.staminaCurrent <= 0) {
    logEl.innerHTML = `<p style="color:#b31e1e;font-weight:bold">💀 Você sucumbiu aos ferimentos! Seu Vigor chegou a zero.</p>` + logEl.innerHTML;
    if (defeatBox) defeatBox.classList.remove("hidden");
    // Travar escolhas permanentemente
    document.querySelectorAll(".choice-btn").forEach(btn => btn.classList.add("combat-locked"));
  }
}

/* ==========================================================
   FICHA DO PERSONAGEM (HERO SHEET)
   ========================================================== */
function calculateHeroDefence() {
  const rank = parseInt(gameState.hero.rank) || 1;
  const combat = parseInt(gameState.hero.abilities.COMBAT) || 0;
  
  // Calcular bônus de armaduras no inventário
  let armorBonus = 0;
  gameState.hero.inventory.forEach(item => {
    const m = item.match(/\+(\d+)\s*defesa/i);
    if (m) armorBonus += parseInt(m[1]);
  });

  return rank + combat + armorBonus;
}

function renderHeroSheet() {
  const h = gameState.hero;
  document.getElementById("char-name").value = h.name;
  document.getElementById("char-profession").textContent = h.profession;
  document.getElementById("char-rank").textContent = h.rank;
  document.getElementById("char-stamina-current").textContent = h.staminaCurrent;
  document.getElementById("char-stamina-max").textContent = h.staminaMax;
  document.getElementById("char-defence-total").textContent = calculateHeroDefence();
  document.getElementById("char-shards-input").value = h.shards;

  // Habilidades
  document.getElementById("stat-combat").textContent = h.abilities.COMBAT;
  document.getElementById("stat-magic").textContent = h.abilities.MAGIC;
  document.getElementById("stat-sanctity").textContent = h.abilities.SANCTITY;
  document.getElementById("stat-thievery").textContent = h.abilities.THIEVERY;
  document.getElementById("stat-scouting").textContent = h.abilities.SCOUTING;
  document.getElementById("stat-streetwise").textContent = h.abilities.STREETWISE;

  // Bênçãos e Títulos
  document.getElementById("char-blessing").value = h.blessing || "";
  document.getElementById("char-titles").value = h.titles || "";

  // Inventário
  renderInventory();

  // Frota & Diário
  document.getElementById("ship-type").value = gameState.ship.type || "none";
  document.getElementById("ship-crew").value = gameState.ship.crew || "Media";
  document.getElementById("ship-docked-port").value = gameState.ship.port || "";
  document.getElementById("ship-cargo").value = gameState.ship.cargo || "";
  document.getElementById("player-notes").value = gameState.notes || "";
}

function renderInventory() {
  const listEl = document.getElementById("inventory-list");
  const countEl = document.getElementById("inv-count");
  listEl.innerHTML = "";

  const items = gameState.hero.inventory || [];
  countEl.textContent = items.length;

  items.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "inv-item";
    li.innerHTML = `
      <span>${escapeHtml(item)}</span>
      <button class="btn-remove-item" data-idx="${idx}" title="Descartar item">&times;</button>
    `;
    listEl.appendChild(li);
  });

  // Eventos de descarte
  listEl.querySelectorAll(".btn-remove-item").forEach(btn => {
    btn.onclick = (e) => {
      const idx = parseInt(e.target.dataset.idx);
      gameState.hero.inventory.splice(idx, 1);
      renderHeroSheet();
      saveGameToLocalStorage();
    };
  });
}

/* ==========================================================
   PALAVRAS-CÓDIGO (CODEWORDS)
   ========================================================== */
function initCodewordsList() {
  const container = document.getElementById("codewords-grid");
  container.innerHTML = "";

  GOLNIR_CODEWORDS.forEach(cw => {
    const item = document.createElement("div");
    item.className = `cw-item ${gameState.codewords[cw] ? "checked" : ""}`;
    item.id = `cw-box-${cw}`;
    item.innerHTML = `
      <input type="checkbox" id="check-${cw}" ${gameState.codewords[cw] ? "checked" : ""}>
      <label for="check-${cw}">${cw}</label>
    `;

    const checkbox = item.querySelector("input");
    checkbox.onchange = (e) => {
      gameState.codewords[cw] = e.target.checked;
      item.classList.toggle("checked", e.target.checked);
      saveGameToLocalStorage();
    };

    container.appendChild(item);
  });

  // Filtro de codewords
  const filterInput = document.getElementById("filter-codewords");
  filterInput.oninput = (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll(".cw-item").forEach(el => {
      const name = el.textContent.toLowerCase();
      el.style.display = name.includes(q) ? "flex" : "none";
    });
  };
}

function updateCodewordsUI() {
  GOLNIR_CODEWORDS.forEach(cw => {
    const box = document.getElementById(`cw-box-${cw}`);
    const input = document.getElementById(`check-${cw}`);
    if (box && input) {
      input.checked = !!gameState.codewords[cw];
      box.classList.toggle("checked", !!gameState.codewords[cw]);
    }
  });
}

/* ==========================================================
   HISTÓRICO E NAVEGAÇÃO (ANTI-CHEAT: SEM VOLTAR)
   ========================================================== */
function renderHistory() {
  const container = document.getElementById("history-breadcrumb");
  container.innerHTML = "";

  const hist = gameState.history.slice(-6); // Últimos 6
  hist.forEach((sec, idx) => {
    const span = document.createElement("span");
    span.style.color = "#7d6957";
    span.style.fontSize = "0.82rem";
    span.textContent = `#${sec}${idx < hist.length - 1 ? " → " : ""}`;
    container.appendChild(span);
  });
}

/* ==========================================================
   ROLADOR DE DADOS
   ========================================================== */
function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function showDiceModal(diceCount = 2) {
  const modal = document.getElementById("dice-modal");
  modal.classList.remove("hidden");
  rollModalDice(diceCount);
}

function rollModalDice(diceCount = 2) {
  if (window.soundEngine) soundEngine.playDiceRoll();
  const d1 = rollD6();
  const d2 = diceCount === 2 ? rollD6() : 0;
  
  const face1 = document.getElementById("modal-die-1");
  const face2 = document.getElementById("modal-die-2");
  const totalBox = document.getElementById("modal-dice-total");

  face1.textContent = DICE_FACES[d1];
  if (diceCount === 2) {
    face2.style.display = "inline-block";
    face2.textContent = DICE_FACES[d2];
    totalBox.textContent = d1 + d2;
  } else {
    face2.style.display = "none";
    totalBox.textContent = d1;
  }
}

/* ==========================================================
   EVENT LISTENERS E CONTROLES
   ========================================================== */
function setupEventListeners() {
  // Botão Menu Principal
  const btnMainMenu = document.getElementById("btn-main-menu");
  if (btnMainMenu) {
    btnMainMenu.onclick = () => {
      setupStartMenu();
      document.getElementById("start-menu-screen").classList.remove("hidden");
    };
  }



  // Vigor (+ / -)
  document.getElementById("btn-stamina-plus").onclick = () => {
    if (gameState.hero.staminaCurrent < gameState.hero.staminaMax) {
      gameState.hero.staminaCurrent++;
      renderHeroSheet();
      saveGameToLocalStorage();
    }
  };
  document.getElementById("btn-stamina-minus").onclick = () => {
    if (gameState.hero.staminaCurrent > 0) {
      gameState.hero.staminaCurrent--;
      renderHeroSheet();
      saveGameToLocalStorage();
    }
  };

  // Cacos de Ouro (+ / -)
  document.getElementById("btn-shards-plus").onclick = () => {
    gameState.hero.shards++;
    renderHeroSheet();
    saveGameToLocalStorage();
  };
  document.getElementById("btn-shards-minus").onclick = () => {
    if (gameState.hero.shards > 0) {
      gameState.hero.shards--;
      renderHeroSheet();
      saveGameToLocalStorage();
    }
  };
  document.getElementById("char-shards-input").onchange = (e) => {
    gameState.hero.shards = Math.max(0, parseInt(e.target.value) || 0);
    renderHeroSheet();
    saveGameToLocalStorage();
  };

  // Edição do Nome do Personagem
  document.getElementById("char-name").onchange = (e) => {
    gameState.hero.name = e.target.value;
    saveGameToLocalStorage();
  };

  // Modificadores de Habilidades (+ / -)
  document.querySelectorAll(".ability-mod-btn").forEach(btn => {
    btn.onclick = (e) => {
      const card = e.target.closest(".ability-card");
      const stat = card.dataset.ability;
      const op = e.target.dataset.op;
      if (op === "+") {
        gameState.hero.abilities[stat]++;
      } else if (op === "-" && gameState.hero.abilities[stat] > 1) {
        gameState.hero.abilities[stat]--;
      }
      renderHeroSheet();
      saveGameToLocalStorage();
    };
  });

  // Botões de rolagem rápida na ficha
  document.querySelectorAll(".btn-roll-stat").forEach(btn => {
    btn.onclick = (e) => {
      const stat = e.target.dataset.stat;
      const d1 = rollD6();
      const d2 = rollD6();
      const heroVal = gameState.hero.abilities[stat];
      const sum = d1 + d2 + heroVal;
      alert(`🎲 Rolagem de ${stat}:\n[${d1}] + [${d2}] = ${d1+d2} + Bônus (${heroVal}) = ${sum}`);
    };
  });

  // Adição de Item no Inventário
  const addItemInput = document.getElementById("new-item-input");
  const btnAddItem = document.getElementById("btn-add-item");
  const doAddItem = () => {
    const val = addItemInput.value.trim();
    if (val && gameState.hero.inventory.length < 12) {
      gameState.hero.inventory.push(val);
      addItemInput.value = "";
      renderHeroSheet();
      saveGameToLocalStorage();
    } else if (gameState.hero.inventory.length >= 12) {
      alert("Sua mochila está cheia! (Máximo de 12 itens)");
    }
  };
  btnAddItem.onclick = doAddItem;
  addItemInput.onkeydown = (e) => { if (e.key === "Enter") doAddItem(); };

  // Sub-Abas do Painel Lateral (Mochila / Frota / Diário)
  document.querySelectorAll(".subtab-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".subtab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".subtab-content").forEach(c => c.classList.add("hidden"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.subtab).classList.remove("hidden");
    };
  });

  // Alterações de Frota e Diário
  document.getElementById("ship-type").onchange = (e) => {
    gameState.ship.type = e.target.value;
    saveGameToLocalStorage();
  };
  document.getElementById("ship-crew").onchange = (e) => {
    gameState.ship.crew = e.target.value;
    saveGameToLocalStorage();
  };
  document.getElementById("ship-docked-port").onchange = (e) => {
    gameState.ship.port = e.target.value;
    saveGameToLocalStorage();
  };
  document.getElementById("ship-cargo").onchange = (e) => {
    gameState.ship.cargo = e.target.value;
    saveGameToLocalStorage();
  };
  document.getElementById("player-notes").oninput = (e) => {
    gameState.notes = e.target.value;
    saveGameToLocalStorage();
  };

  // Bênçãos e Títulos
  document.getElementById("char-blessing").onchange = (e) => {
    gameState.hero.blessing = e.target.value;
    saveGameToLocalStorage();
  };
  document.getElementById("char-titles").onchange = (e) => {
    gameState.hero.titles = e.target.value;
    saveGameToLocalStorage();
  };

  // Mobile Tabs
  document.querySelectorAll(".mobile-tab-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".mobile-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.target;

      const storyCol = document.getElementById("story-column");
      const sidebarCol = document.querySelector(".sidebar-column");

      if (target === "story-column") {
        storyCol.classList.remove("mobile-hidden");
        sidebarCol.classList.remove("mobile-active");
      } else {
        storyCol.classList.add("mobile-hidden");
        sidebarCol.classList.add("mobile-active");

        // Scroll para a sub-seção desejada na sidebar
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };
  });

  // Modais
  setupModals();
}

/* ==========================================================
   MODAIS (PERSONAGEM, DADOS, REGRAS)
   ========================================================== */
function setupModals() {
  // Modal de Personagem
  const charModal = document.getElementById("char-modal");
  document.getElementById("btn-char-select").onclick = () => {
    renderPremadeHeroes();
    charModal.classList.remove("hidden");
  };
  document.getElementById("btn-close-char-modal").onclick = () => charModal.classList.add("hidden");

  // Modal de Dados
  const diceModal = document.getElementById("dice-modal");
  document.getElementById("btn-dice-roller").onclick = () => showDiceModal(2);
  document.getElementById("btn-close-dice-modal").onclick = () => diceModal.classList.add("hidden");
  document.getElementById("btn-roll-1d6").onclick = () => rollModalDice(1);
  document.getElementById("btn-roll-2d6").onclick = () => rollModalDice(2);

  // Modal de Regras
  const rulesModal = document.getElementById("rules-modal");
  const btnRulesHelp = document.getElementById("btn-rules-help");
  const btnCloseRules = document.getElementById("btn-close-rules-modal");
  if (rulesModal && btnRulesHelp) btnRulesHelp.onclick = () => rulesModal.classList.remove("hidden");
  if (rulesModal && btnCloseRules) btnCloseRules.onclick = () => rulesModal.classList.add("hidden");

  // Modal do Mapa Fiel de Golnir
  const mapModal = document.getElementById("map-modal");
  const btnOpenMap = document.getElementById("btn-open-map");
  const btnQuickMap = document.getElementById("btn-quick-view-map");
  const mobileBtnMap = document.getElementById("mobile-btn-map");
  const btnCloseMap = document.getElementById("btn-close-map-modal");

  if (btnOpenMap) btnOpenMap.onclick = openMapModal;
  if (btnQuickMap) btnQuickMap.onclick = openMapModal;
  if (mobileBtnMap) mobileBtnMap.onclick = openMapModal;
  if (btnCloseMap) btnCloseMap.onclick = closeMapModal;

  // Fechar modais ao clicar no fundo escuro
  const prologueModal = document.getElementById("prologue-modal");
  window.onclick = (e) => {
    if (e.target === charModal) charModal.classList.add("hidden");
    if (e.target === diceModal) diceModal.classList.add("hidden");
    if (rulesModal && e.target === rulesModal) rulesModal.classList.add("hidden");
    if (mapModal && e.target === mapModal) closeMapModal();
  };

  // Botão de início da aventura no prólogo
  const btnStartJourney = document.getElementById("btn-start-prologue-journey");
  if (btnStartJourney) {
    btnStartJourney.onclick = () => {
      if (prologueModal) prologueModal.classList.add("hidden");
      // Resetar estado e iniciar nova aventura
      activeCombat = null;
      gameState.currentSection = 1;
      gameState.history = [];
      gameState.codewords = {};
      gameState.currentLandmark = "shipwreck_beach";
      gameState.visitedLandmarks = ["shipwreck_beach"];
      gameState.travelHistory = ["shipwreck_beach"];
      localStorage.removeItem("fabled_lands_02_save");
      // Abrir seleção de personagem
      renderPremadeHeroes();
      charModal.classList.remove("hidden");
    };
  }

  // Criação de Herói Personalizado
  document.getElementById("btn-create-custom-hero").onclick = () => {
    const name = document.getElementById("custom-hero-name").value.trim() || "Aventureiro de Golnir";
    const prof = document.getElementById("custom-hero-prof").value;
    
    gameState.hero = {
      name: name,
      profession: prof,
      rank: 2,
      staminaMax: 12,
      staminaCurrent: 12,
      shards: 20,
      abilities: {
        COMBAT: 3,
        MAGIC: 3,
        SANCTITY: 3,
        THIEVERY: 3,
        SCOUTING: 3,
        STREETWISE: 3
      },
      inventory: ["Espada (+0 Combate)", "Armadura Leve (+1 Defesa)"],
      blessing: "",
      titles: ""
    };

    renderHeroSheet();
    saveGameToLocalStorage();
    charModal.classList.add("hidden");
  };

  // Botão Reiniciar Jogo
  document.getElementById("btn-restart-game").onclick = () => {
    if (confirm("Deseja realmente reiniciar sua aventura para a Seção 1 com o personagem padrão?")) {
      localStorage.removeItem("fabled_lands_02_save");
      gameState.currentSection = 1;
      gameState.history = [];
      gameState.hero = JSON.parse(JSON.stringify(PREMADE_HEROES[0]));
      gameState.codewords = {};
      gameState.ship = { type: "none", crew: "Media", port: "", cargo: "" };
      gameState.notes = "";
      gameState.currentLandmark = "shipwreck_beach";
      gameState.visitedLandmarks = ["shipwreck_beach"];
      gameState.travelHistory = ["shipwreck_beach"];
      gameState.visitedChoices = {};
      renderHeroSheet();
      updateCodewordsUI();
      renderCurrentSection();
    }
  };

  // Salvar / Carregar Manual (Download / Upload de JSON)
  document.getElementById("btn-save-game").onclick = exportSaveFile;
  document.getElementById("btn-load-game").onclick = importSaveFile;
}

function renderPremadeHeroes() {
  const grid = document.getElementById("premade-grid");
  grid.innerHTML = "";

  PREMADE_HEROES.forEach((h, idx) => {
    const card = document.createElement("div");
    card.className = "premade-card";
    card.innerHTML = `
      <h4>${escapeHtml(h.name)}</h4>
      <div class="premade-stats">
        <strong>${escapeHtml(h.profession)}</strong> • Posto ${h.rank}<br>
        Vigor: ${h.staminaMax} | Cacos: ${h.shards}<br>
        COMB ${h.abilities.COMBAT} | MAG ${h.abilities.MAGIC} | SANT ${h.abilities.SANCTITY}<br>
        LAD ${h.abilities.THIEVERY} | EXP ${h.abilities.SCOUTING} | SOB ${h.abilities.STREETWISE}
      </div>
    `;

    card.onclick = () => {
      gameState.hero = JSON.parse(JSON.stringify(h));
      renderHeroSheet();
      saveGameToLocalStorage();
      document.getElementById("char-modal").classList.add("hidden");
    };

    grid.appendChild(card);
  });
}


/* ==========================================================
   CONTROLES DE ÁUDIO (WIDGET NO HEADER)
   ========================================================== */
function setupAudioControls() {
  const btnMute = document.getElementById("btn-audio-mute");
  const volSlider = document.getElementById("volume-slider");

  if (btnMute) {
    btnMute.onclick = () => {
      if (!window.soundEngine) return;
      window.soundEngine.resume();
      const muted = window.soundEngine.toggleMute();
      btnMute.textContent = muted ? "🔇" : "🔊";
    };
  }

  if (volSlider) {
    volSlider.oninput = (e) => {
      const val = parseFloat(e.target.value);
      if (window.soundEngine) {
        window.soundEngine.resume();
        window.soundEngine.setVolume(val);
      }
    };
  }
}

/* ==========================================================
   MENU INICIAL (START MENU)
   ========================================================== */
function setupStartMenu() {
  const menuScreen = document.getElementById("start-menu-screen");
  const savePreview = document.getElementById("menu-save-preview");
  const saveDetails = document.getElementById("menu-save-details");
  const btnContinue = document.getElementById("btn-menu-continue");
  const btnNew = document.getElementById("btn-menu-new");
  const btnRules = document.getElementById("btn-menu-rules");

  let savedData = null;
  try {
    const raw = localStorage.getItem("fabled_lands_02_save");
    if (raw) savedData = JSON.parse(raw);
  } catch (e) {
    console.error("Erro ao ler save no menu:", e);
  }

  if (savedData && savedData.hero && savedData.currentSection) {
    const locTitle = LOCATION_TITLES[savedData.currentSection] || "Terras de Golnir";
    savePreview.classList.remove("hidden");
    btnContinue.classList.remove("hidden");
    saveDetails.innerHTML = `
      <strong>${escapeHtml(savedData.hero.name)}</strong> (${escapeHtml(savedData.hero.profession)})<br>
      📍 Local: <strong>${escapeHtml(locTitle)}</strong><br>
      ❤️ Vigor: ${savedData.hero.staminaCurrent}/${savedData.hero.staminaMax} | 🪙 Cacos: ${savedData.hero.shards}
    `;

    btnContinue.onclick = () => {
      menuScreen.classList.add("hidden");
      if (window.soundEngine) {
        soundEngine.resume();
      }
      loadSavedGame();
      renderHeroSheet();
      renderCurrentSection();
      showAutoSaveToast();
    };
  } else {
    savePreview.classList.add("hidden");
    btnContinue.classList.add("hidden");
  }

  btnNew.onclick = () => {
    menuScreen.classList.add("hidden");
    // Mostrar prólogo antes da seleção de personagem
    if (window.soundEngine) {
      soundEngine.resume();
      soundEngine.setTheme("sea");
    }
    document.getElementById("prologue-modal").classList.remove("hidden");
  };

  btnRules.onclick = () => {
    const rm = document.getElementById("rules-modal");
    if (rm) rm.classList.remove("hidden");
  };
}

/* ==========================================================
   TOAST DE SALVAMENTO AUTOMÁTICO
   ========================================================== */
let toastTimeout = null;
function showAutoSaveToast() {
  const toast = document.getElementById("autosave-toast");
  if (!toast) return;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

/* ==========================================================
   SISTEMA DE SALVAMENTO (LOCALSTORAGE & ARQUIVO JSON)
   ========================================================== */
function saveGameToLocalStorage(showNotification = false) {
  try {
    localStorage.setItem("fabled_lands_02_save", JSON.stringify(gameState));
    if (showNotification) {
      showAutoSaveToast();
    }
  } catch (e) {
    console.error("Erro ao salvar no LocalStorage:", e);
  }
}

function loadSavedGame() {
  try {
    const saved = localStorage.getItem("fabled_lands_02_save");
    if (saved) {
      const parsed = JSON.parse(saved);
      gameState = { ...gameState, ...parsed };
      gameState.lang = "pt"; // Exclusivamente em português
      if (!Array.isArray(gameState.visitedLandmarks)) {
        gameState.visitedLandmarks = ["shipwreck_beach"];
      }
      if (!Array.isArray(gameState.travelHistory)) {
        gameState.travelHistory = ["shipwreck_beach"];
      }
      if (!gameState.visitedChoices || typeof gameState.visitedChoices !== "object") {
        gameState.visitedChoices = {};
      }
      updateCodewordsUI();
    }
  } catch (e) {
    console.error("Erro ao carregar do LocalStorage:", e);
  }
}

function exportSaveFile() {
  saveGameToLocalStorage();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameState, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `fabled_lands_save.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importSaveFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const loaded = JSON.parse(event.target.result);
        gameState = { ...gameState, ...loaded };
        gameState.lang = "pt"; // Exclusivamente em português
        renderHeroSheet();
        updateCodewordsUI();
        renderCurrentSection();
        saveGameToLocalStorage();
        alert("Jogo carregado com sucesso!");
      } catch (err) {
        alert("Erro ao ler o arquivo de save: " + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

/* ==========================================================
   UTILITÁRIOS
   ========================================================== */
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================================
   SISTEMA DE MAPA FIEL DE GOLNIR E GRAVURAS
   ========================================================== */
let mapZoom = 1.0;
let mapPanX = 0;
let mapPanY = 0;
let isPanning = false;
let startPanX = 0;
let startPanY = 0;
let showTrail = true;

function initMapSystem() {
  // Configurar abas do modal de mapa
  document.querySelectorAll(".map-tab-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".map-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".map-view-tab").forEach(tab => tab.classList.add("hidden"));
      btn.classList.add("active");
      const targetTab = document.getElementById(btn.dataset.mapTab);
      if (targetTab) targetTab.classList.remove("hidden");
    };
  });

  // Renderizar galeria de gravuras clássicas do livro
  renderIllustrationsGallery();

  // Renderizar marcadores de pontos de interesse no mapa
  renderLandmarkPins();

  // Configurar controles de Zoom e Pan
  setupMapZoomAndPan();

  // Fechar card de informações da localidade
  const btnCloseCard = document.getElementById("btn-close-landmark-card");
  if (btnCloseCard) {
    btnCloseCard.onclick = () => {
      document.getElementById("map-landmark-card").classList.add("hidden");
    };
  }
}

/**
 * Renderiza os pontos de interesse sobre o mapa de Golnir
 */
function renderLandmarkPins() {
  const container = document.getElementById("map-landmarks-layer");
  if (!container || !window.GOLNIR_LANDMARKS) return;

  container.innerHTML = "";

  Object.values(window.GOLNIR_LANDMARKS).forEach(landmark => {
    const pin = document.createElement("div");
    pin.className = "map-landmark-pin";
    pin.id = `pin-${landmark.id}`;
    pin.style.left = `${landmark.x}%`;
    pin.style.top = `${landmark.y}%`;
    pin.title = landmark.name;
    pin.innerHTML = `<span>${landmark.icon || "📍"}</span>`;

    pin.onclick = (e) => {
      e.stopPropagation();
      showLandmarkCard(landmark);
    };

    container.appendChild(pin);
  });
}

/**
 * Exibe o painel flutuante com detalhes da localidade
 */
function showLandmarkCard(landmark) {
  const card = document.getElementById("map-landmark-card");
  if (!card) return;

  document.getElementById("landmark-card-icon").textContent = landmark.icon || "🏛️";
  document.getElementById("landmark-card-title").textContent = landmark.name;

  const typeLabels = {
    cidade: "Cidade Mercantil",
    porto: "Cidade Portuária",
    castelo: "Fortaleza / Castelo",
    sagrado: "Templo / Santuário Sagrado",
    selvagem: "Região Selvagem / Perigosa",
    estalagem: "Estalagem / Pousada",
    costa: "Costa / Praia",
    mar: "Mar / Oceano"
  };
  document.getElementById("landmark-card-type").textContent = typeLabels[landmark.type] || "Ponto de Interesse";
  document.getElementById("landmark-card-desc").textContent = landmark.description;

  const statusContainer = document.getElementById("landmark-card-status");
  const isCurrent = (gameState.currentLandmark === landmark.id);
  const isVisited = (gameState.visitedLandmarks && gameState.visitedLandmarks.includes(landmark.id));

  if (isCurrent) {
    statusContainer.innerHTML = `<span class="badge-status" style="background:#fff3cd; color:#856404; border-color:#ffeeba;">📍 Localização Atual</span>`;
  } else if (isVisited) {
    statusContainer.innerHTML = `<span class="badge-status" style="background:#d4edda; color:#155724; border-color:#c3e6cb;">✅ Explorado</span>`;
  } else {
    statusContainer.innerHTML = `<span class="badge-status" style="background:#e2e3e5; color:#383d41; border-color:#d6d8db;">🗺️ Descoberto no Mapa</span>`;
  }

  card.classList.remove("hidden");
}

/**
 * Atualiza o rastreamento geográfico do herói (Sidebar, Marcador no mapa e Rastro)
 */
function updateLocationTracking(sectionNum, sec) {
  if (!window.resolveHeroLocation || !window.GOLNIR_LANDMARKS) return;

  const landmark = window.resolveHeroLocation(sectionNum, gameState.history, sectionsData.pt);
  if (!landmark) return;

  gameState.currentLandmark = landmark.id;

  if (!Array.isArray(gameState.visitedLandmarks)) {
    gameState.visitedLandmarks = [];
  }
  if (!gameState.visitedLandmarks.includes(landmark.id)) {
    gameState.visitedLandmarks.push(landmark.id);
  }

  if (!Array.isArray(gameState.travelHistory)) {
    gameState.travelHistory = [];
  }
  const lastLandmark = gameState.travelHistory[gameState.travelHistory.length - 1];
  if (lastLandmark !== landmark.id) {
    gameState.travelHistory.push(landmark.id);
  }

  // 1. Atualizar widget na barra lateral
  const widgetIcon = document.getElementById("widget-loc-icon");
  const widgetName = document.getElementById("widget-loc-name");
  const widgetDesc = document.getElementById("widget-loc-desc");
  if (widgetIcon) widgetIcon.textContent = landmark.icon || "📍";
  if (widgetName) widgetName.textContent = landmark.name;
  if (widgetDesc) widgetDesc.textContent = landmark.description;

  // 2. Atualizar marcador no mapa
  const heroMarker = document.getElementById("hero-map-marker");
  const heroBadge = document.getElementById("map-hero-loc-badge");
  const heroLabel = document.getElementById("hero-marker-label");

  if (heroMarker) {
    heroMarker.style.left = `${landmark.x}%`;
    heroMarker.style.top = `${landmark.y}%`;
  }
  if (heroBadge) heroBadge.textContent = landmark.name;
  if (heroLabel) heroLabel.textContent = `${gameState.hero.name || "Você"}`;

  // 3. Atualizar classes dos pins de marcos
  document.querySelectorAll(".map-landmark-pin").forEach(pin => {
    const lId = pin.id.replace("pin-", "");
    pin.classList.toggle("active-loc", lId === landmark.id);
    pin.classList.toggle("visited", gameState.visitedLandmarks.includes(lId));
  });

  // 4. Redesenhar rastro de viagem
  drawTravelTrail();

  // 5. Atualizar banner de ilustração da cena (D&D Fantasy Art)
  updateSceneIllustration(landmark, sectionNum);
}

// REGISTRO DE ILUSTRAÇÕES DE CENÁRIOS E LOCAIS
const SCENE_IMAGES = {
  shipwreck_beach: {
    src: "assets/images/cenarios/falesias_brancas.jpg",
    caption: "As imponentes Falésias Brancas de Golnir e a praia do naufrágio"
  },
  ringhorn: {
    src: "assets/images/cenarios/porto_ringhorn.jpg",
    caption: "O movimentado Porto de Ringhorn e suas muralhas douradas"
  },
  wishport: {
    src: "assets/images/cenarios/porto_wishport.jpg",
    caption: "O cais enevoado do Porto dos Desejos (Wishport)"
  },
  metriciens: {
    src: "assets/images/cenarios/metropole_metriciens.jpg",
    caption: "A magnífica Metrópole Real de Metriciens"
  },
  delpton: {
    src: "assets/images/cenarios/vilarejo_delpton.jpg",
    caption: "O pacato Vilarejo de Delpton às margens do Rio Rese"
  },
  wheatfields: {
    src: "assets/images/cenarios/campos_de_trigo.jpg",
    caption: "Os vastos Campos de Trigo dourados de Golnir"
  },
  ravayne: {
    src: "assets/images/cenarios/castelo_ravayne.jpg",
    caption: "As imponentes muralhas de pedra do Castelo Ravayne"
  },
  orlock: {
    src: "assets/images/cenarios/castelo_orlock.jpg",
    caption: "As tenebrosas ruínas do Castelo Orlock na costa sul"
  },
  tower_despair: {
    src: "assets/images/cenarios/torre_desespero.jpg",
    caption: "A misteriosa agulha negra da Torre do Desespero"
  },
  forsaken_forest: {
    src: "assets/images/cenarios/floresta_abandonados.jpg",
    caption: "A densa e sombria Floresta dos Abandonados"
  },
  haunted_hills: {
    src: "assets/images/cenarios/colinas_assombradas.jpg",
    caption: "Os montes fúnebres sob as névoas das Colinas Assombradas"
  },
  molhern: {
    src: "assets/images/cenarios/mosteiro_molhern.jpg",
    caption: "O isolado Mosteiro de Molhern, refúgio de cura e saber"
  },
  lacuna: {
    src: "assets/images/cenarios/abadia_lacuna.jpg",
    caption: "A sagrada Abadia de Lacuna no vale alpino"
  },
  violet_ocean: {
    src: "assets/images/cenarios/oceano_violeta.jpg",
    caption: "As águas profundas do Oceano Violeta sob ventos velozes"
  },
  dweomer: {
    src: "assets/images/cenarios/ilha_feiticeiros.jpg",
    caption: "A Ilha dos Feiticeiros (Dweomer), envolta em brumas mágicas"
  }
};

/**
 * Atualiza o banner de ilustração da narrativa se a imagem existir
 */
function updateSceneIllustration(landmark, sectionNum) {
  const container = document.getElementById("story-scene-container");
  const img = document.getElementById("story-scene-img");
  const caption = document.getElementById("story-scene-caption");
  if (!container || !img) return;

  const key = landmark ? landmark.id : `sec_${sectionNum}`;
  const scene = SCENE_IMAGES[key];

  if (scene && scene.src) {
    // Testa carregamento da imagem de forma segura
    const testImg = new Image();
    testImg.onload = () => {
      img.src = scene.src;
      img.alt = scene.caption || landmark?.name || "Cena da Aventura";
      if (caption) {
        caption.textContent = scene.caption || "";
        caption.style.display = scene.caption ? "block" : "none";
      }
      container.classList.remove("hidden");
    };
    testImg.onerror = () => {
      container.classList.add("hidden");
    };
    testImg.src = scene.src;
  } else {
    container.classList.add("hidden");
  }
}

/**
 * Desenha o rastro da rota percorrida pelo herói através de um SVG escalável
 */
function drawTravelTrail() {
  const svg = document.getElementById("map-trail-svg");
  if (!svg || !window.GOLNIR_LANDMARKS) return;

  if (!showTrail || !gameState.travelHistory || gameState.travelHistory.length < 2) {
    svg.innerHTML = "";
    return;
  }

  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");

  const points = gameState.travelHistory
    .map(id => window.GOLNIR_LANDMARKS[id])
    .filter(Boolean)
    .map(loc => `${loc.x},${loc.y}`)
    .join(" ");

  svg.innerHTML = `<polyline points="${points}" class="map-trail-path" />`;
}

/**
 * Configura Zoom (+ / - / reset) e arrasto (pan) do mapa
 */
function setupMapZoomAndPan() {
  const viewport = document.getElementById("map-viewport");
  const container = document.getElementById("map-canvas-container");
  const btnZoomIn = document.getElementById("btn-zoom-in");
  const btnZoomOut = document.getElementById("btn-zoom-out");
  const btnZoomReset = document.getElementById("btn-zoom-reset");
  const btnToggleTrail = document.getElementById("btn-toggle-trail");

  if (btnZoomIn) {
    btnZoomIn.onclick = () => {
      mapZoom = Math.min(2.5, mapZoom + 0.25);
      applyMapTransform();
    };
  }

  if (btnZoomOut) {
    btnZoomOut.onclick = () => {
      mapZoom = Math.max(0.7, mapZoom - 0.25);
      applyMapTransform();
    };
  }

  if (btnZoomReset) {
    btnZoomReset.onclick = () => {
      mapZoom = 1.0;
      mapPanX = 0;
      mapPanY = 0;
      applyMapTransform();
      centerOnHero();
    };
  }

  if (btnToggleTrail) {
    btnToggleTrail.onclick = () => {
      showTrail = !showTrail;
      btnToggleTrail.classList.toggle("active", showTrail);
      const svg = document.getElementById("map-trail-svg");
      if (svg) svg.style.display = showTrail ? "block" : "none";
      if (showTrail) drawTravelTrail();
    };
  }

  if (!viewport || !container) return;

  // Zoom pela roda do mouse
  viewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      mapZoom = Math.min(2.5, mapZoom + 0.15);
    } else {
      mapZoom = Math.max(0.7, mapZoom - 0.15);
    }
    applyMapTransform();
  }, { passive: false });

  // Arrasto com mouse
  viewport.addEventListener("mousedown", (e) => {
    if (e.target.closest(".map-landmark-pin") || e.target.closest(".hero-map-marker")) return;
    isPanning = true;
    startPanX = e.clientX - mapPanX;
    startPanY = e.clientY - mapPanY;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isPanning) return;
    mapPanX = e.clientX - startPanX;
    mapPanY = e.clientY - startPanY;
    applyMapTransform();
  });

  window.addEventListener("mouseup", () => {
    isPanning = false;
  });

  // Arrasto em dispositivos móveis (Touch)
  let touchStartX = 0;
  let touchStartY = 0;
  viewport.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isPanning = true;
      touchStartX = e.touches[0].clientX - mapPanX;
      touchStartY = e.touches[0].clientY - mapPanY;
    }
  }, { passive: true });

  viewport.addEventListener("touchmove", (e) => {
    if (isPanning && e.touches.length === 1) {
      mapPanX = e.touches[0].clientX - touchStartX;
      mapPanY = e.touches[0].clientY - touchStartY;
      applyMapTransform();
    }
  }, { passive: true });

  viewport.addEventListener("touchend", () => {
    isPanning = false;
  });
}

function applyMapTransform() {
  const container = document.getElementById("map-canvas-container");
  if (container) {
    container.style.transform = `translate(${mapPanX}px, ${mapPanY}px) scale(${mapZoom})`;
  }
}

function centerOnHero() {
  const landmark = window.GOLNIR_LANDMARKS && window.GOLNIR_LANDMARKS[gameState.currentLandmark];
  if (!landmark) return;
  mapPanX = 0;
  mapPanY = 0;
  applyMapTransform();
}

/**
 * Abre o Modal do Mapa
 */
function openMapModal() {
  const modal = document.getElementById("map-modal");
  if (!modal) return;

  modal.classList.remove("hidden");

  if (window.soundEngine) {
    soundEngine.playSuccess();
  }

  // Atualiza rastreamento atual
  updateLocationTracking(gameState.currentSection);
  centerOnHero();
}

/**
 * Fecha o Modal do Mapa
 */
function closeMapModal() {
  const modal = document.getElementById("map-modal");
  if (modal) modal.classList.add("hidden");

  const card = document.getElementById("map-landmark-card");
  if (card) card.classList.add("hidden");
}

/**
 * Renderiza a galeria de ilustrações e gravuras do livro original
 */
function renderIllustrationsGallery() {
  const gallery = document.getElementById("illustrations-gallery");
  if (!gallery || !window.BOOK_ILLUSTRATIONS) return;

  gallery.innerHTML = "";

  window.BOOK_ILLUSTRATIONS.forEach(item => {
    const card = document.createElement("div");
    card.className = "illustration-card";
    card.innerHTML = `
      <img src="${item.src}" alt="${escapeHtml(item.title)}" loading="lazy">
      <h4>${escapeHtml(item.title)}</h4>
      <p>${escapeHtml(item.caption)}</p>
    `;
    gallery.appendChild(card);
  });
}

