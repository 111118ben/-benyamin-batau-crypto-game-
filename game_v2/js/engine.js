// ============================================================
// BENYAMIN BATAU CRYPTO GAME — ENGINE.JS
// Core game logic: state, idle engine, calculations, events
// ============================================================

// ─── DEFAULT STATE ────────────────────────────────────────────
const DEFAULT_STATE = {
  // Resources
  capital: 50000,
  dataMarket: 100,
  processingPower: 10,
  researchPoints: 50,
  aiTokens: 0,
  // Progress
  level: 1, xp: 0, xpMax: 100,
  infraLevel: 0,
  totalCapitalEarned: 50000,
  // Cards
  ownedCards: ['cek_status','poll_saldo','check_pond'],
  equippedCards: [],
  cardLevels: {},
  cardDuplicates: {},
  // Research
  unlockedResearch: [],
  // Crafted cards
  craftedCards: [],
  totalCrafts: 0,
  // Boss
  bossIndex: 0,
  bossHP: 100000,
  bossesKilled: [],
  // Events
  activeEvent: null, eventTimer: 0,
  // Achievements
  achievedIds: [],
  // Daily
  loginStreak: 0,
  lastLogin: null,
  dailyPackClaimed: false,
  // Story
  unlockedChapters: [1],
  // Stats
  peakHourLogins: 0,
  flashCrashSurvived: 0,
  totalTrades: 0,
  // Market
  coinPrices: {},
  // Prestige
  prestigeLevel: 0, prestigeMult: 1,
  // Time
  lastSaveTime: Date.now(),
};

// ─── GAME STATE ───────────────────────────────────────────────
let G = JSON.parse(JSON.stringify(DEFAULT_STATE));

function saveGame() {
  G.lastSaveTime = Date.now();
  G.unlockedResearch = [...new Set(G.unlockedResearch)];
  localStorage.setItem('bbcg_save', JSON.stringify(G));
}

function loadGame() {
  const raw = localStorage.getItem('bbcg_save');
  if (!raw) return false;
  try {
    const saved = JSON.parse(raw);
    G = Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), saved);
    // Ensure arrays
    if (!Array.isArray(G.ownedCards)) G.ownedCards = DEFAULT_STATE.ownedCards;
    if (!Array.isArray(G.unlockedResearch)) G.unlockedResearch = [];
    if (!Array.isArray(G.equippedCards)) G.equippedCards = [];
    return true;
  } catch(e) { return false; }
}

function resetGame() {
  G = JSON.parse(JSON.stringify(DEFAULT_STATE));
  localStorage.removeItem('bbcg_save');
}

// ─── OFFLINE REWARD ───────────────────────────────────────────
function calcOfflineReward() {
  const now = Date.now();
  const offMs = now - (G.lastSaveTime || now);
  const offHrs = Math.min(offMs / 3600000, 24);
  if (offHrs < 0.02) return null; // < 1 min, no reward
  const cps = getCapPerSecond();
  const rate = 0.60;
  const comeback = offHrs > 12 ? 2.0 : offHrs > 6 ? 1.5 : 1.0;
  return {
    hours: offHrs.toFixed(1),
    capital: Math.floor(cps * 3600 * offHrs * rate * comeback),
    research: Math.floor(getResearchPerSecond() * 3600 * offHrs * rate),
    data: Math.floor(getDataPerSecond() * 3600 * offHrs * rate),
    comeback,
  };
}

// ─── RATE CALCULATIONS ────────────────────────────────────────
function getCapPerSecond() {
  const infra = INFRA_LEVELS[G.infraLevel];
  let rate = infra.rateBase * G.prestigeMult;
  // Research bonuses
  if (isResearched('rsi'))    rate *= 1.10;
  if (isResearched('macd'))   rate *= 1.15;
  if (isResearched('bb'))     rate *= 1.20;
  if (isResearched('ema'))    rate *= 1.25;
  if (isResearched('coiled')) rate *= 2.00;
  if (isResearched('neural')) rate *= 1.50;
  if (isResearched('claude_ai')) rate *= 2.50;
  if (isResearched('quantum_ai')) rate *= 5.00;
  if (isResearched('multi_src')) rate *= 3.00;
  // Equipped card bonuses
  for (const cid of G.equippedCards) {
    const card = CARDS_DB.find(c => c.id === cid);
    if (!card) continue;
    const cardLv = (G.cardLevels[cid] || 1);
    const mult = 1 + (card.rarity * 0.1 + cardLv * 0.05);
    rate *= mult;
  }
  // Special cards
  if (G.ownedCards.includes('master_bot'))  rate *= isPeakHour() ? 4 : 1.5;
  if (G.ownedCards.includes('war_machine')) rate *= 3;
  if (G.ownedCards.includes('claude_brain')) rate *= 2;
  if (G.ownedCards.includes('sensor'))      rate *= 1.8;
  // Events
  if (G.activeEvent === 'bull') rate *= 2;
  if (G.activeEvent === 'ai_rev') rate *= 1;
  if (G.activeEvent === 'crash') rate *= 0.1;
  return rate / 60; // per second
}

function getResearchPerSecond() {
  let base = 0.1 * (G.infraLevel + 1);
  if (G.ownedCards.includes('cek_history')) base *= 1.15;
  if (isResearched('neural')) base *= 1.5;
  if (G.activeEvent === 'ai_rev') base *= 3;
  return base;
}

function getDataPerSecond() {
  let base = 0.5 * (G.infraLevel + 1);
  if (G.ownedCards.includes('sensor')) base *= 3;
  if (isResearched('multi_src')) base *= 4;
  return base;
}

function getDPS() {
  // DPS for boss battle — based on equipped cards + infra
  let dps = 100 * (G.infraLevel + 1) * G.prestigeMult;
  for (const cid of G.equippedCards) {
    const card = CARDS_DB.find(c => c.id === cid);
    if (card) dps += card.stats.execSpeed * 10;
  }
  return Math.floor(dps);
}

function isPeakHour() {
  const now = new Date();
  const wibH = (now.getUTCHours() + 7) % 24;
  const wibM = now.getUTCMinutes();
  return (wibH === 8 || wibH === 20) && wibM < 30;
}

function isResearched(id) { return G.unlockedResearch.includes(id); }

function getXpRequired(level) { return Math.floor(100 * Math.pow(level, 1.8)); }

function getCardBonus(cardId) {
  const card = CARDS_DB.find(c => c.id === cardId);
  if (!card) return 0;
  const lv = G.cardLevels[cardId] || 1;
  return (card.stats.prediction + card.stats.scanSpeed) * lv * 0.01;
}

// ─── MAIN TICK ────────────────────────────────────────────────
let lastTick = Date.now();
let saveTimer = 0;

function gameTick() {
  const now = Date.now();
  const dt = (now - lastTick) / 1000;
  lastTick = now;
  if (dt > 10) return; // Ignore huge dt (tab switch etc.)

  // Resources
  const cps = getCapPerSecond();
  G.capital += cps * dt;
  G.totalCapitalEarned += cps * dt;
  G.researchPoints += getResearchPerSecond() * dt;
  G.dataMarket += getDataPerSecond() * dt;
  G.processingPower = Math.min(G.processingPower + 0.01 * dt, 9999);

  // Event timer
  if (G.activeEvent && G.eventTimer > 0) {
    G.eventTimer -= dt;
    if (G.eventTimer <= 0) {
      G.activeEvent = null;
      UI.showToast('Event berakhir!', 'info');
    }
  }

  // XP
  G.xp += cps * dt * 0.001;
  if (G.xp >= G.xpMax) {
    G.xp -= G.xpMax;
    G.level++;
    G.xpMax = getXpRequired(G.level);
    onLevelUp(G.level);
  }

  // Market simulation
  tickMarket(dt);

  // Save every 30s
  saveTimer += dt;
  if (saveTimer > 30) { saveGame(); saveTimer = 0; }

  // Check achievements
  checkAchievements();

  // Unlock chapters
  checkChapters();
}

function onLevelUp(level) {
  UI.showToast(`🎉 LEVEL ${level}!`, 'levelup');
  if (level === 5)  { G.aiTokens += 5; UI.showToast('🎁 +5 AI Token untuk Level 5!', 'reward'); }
  if (level === 10) { G.aiTokens += 20; }
  if (level === 25) { G.aiTokens += 50; }
}

function checkChapters() {
  CHAPTERS.forEach(ch => {
    if (G.level >= ch.unlockLv && !G.unlockedChapters.includes(ch.id)) {
      G.unlockedChapters.push(ch.id);
      UI.showChapterUnlock(ch);
    }
  });
}

// ─── MARKET SIMULATION ───────────────────────────────────────
function tickMarket(dt) {
  MARKET_COINS.forEach(coin => {
    if (!G.coinPrices[coin.id]) G.coinPrices[coin.id] = coin.basePrice;
    const trend = (Math.random() - 0.48) * 0.002 * dt;
    const noise = (Math.random() - 0.5) * 0.005 * dt;
    G.coinPrices[coin.id] *= (1 + trend + noise);
    G.coinPrices[coin.id] = Math.max(G.coinPrices[coin.id], coin.basePrice * 0.1);
  });
}

// ─── ACTIONS ──────────────────────────────────────────────────
function openPack(type) {
  const costs = { free:0, data:5000, ai:50000, legendary_ai:0, mythic:50 };
  const cost = costs[type] || 0;
  if (type === 'data' && G.capital < 5000) return { error:'Capital tidak cukup (butuh 5,000)' };
  if (type === 'ai' && G.capital < 50000) return { error:'Capital tidak cukup (butuh 50,000)' };
  if (type === 'mythic' && G.aiTokens < 50) return { error:'AI Token tidak cukup (butuh 50)' };
  if (type === 'daily') {
    if (G.dailyPackClaimed) return { error:'Daily pack sudah diklaim hari ini!' };
    G.dailyPackClaimed = true;
  }
  if (type === 'data') G.capital -= 5000;
  if (type === 'ai') G.capital -= 50000;
  if (type === 'mythic') G.aiTokens -= 50;

  const card = rollCard(type);
  addCard(card.id);
  G.totalTrades++;
  return { card };
}

function rollCard(packType) {
  const WEIGHTS = { common:60, uncommon:25, rare:10, epic:4, legendary:0.9, mythic:0.1 };
  const RARITY_MAP = { 1:'common', 2:'uncommon', 3:'rare', 4:'epic', 5:'legendary', 6:'mythic' };
  // Pack type determines pool and floor
  let minRarity = 1;
  if (packType === 'data') minRarity = 2;
  if (packType === 'ai') minRarity = 3;
  if (packType === 'legendary_ai') minRarity = 4;
  if (packType === 'mythic') minRarity = 5;

  const pool = CARDS_DB.filter(c => c.rarity >= minRarity);
  const weighted = [];
  pool.forEach(c => {
    const key = RARITY_MAP[c.rarity];
    const w = Math.ceil((WEIGHTS[key] || 1) * 10);
    for (let i = 0; i < w; i++) weighted.push(c);
  });
  return weighted[Math.floor(Math.random() * weighted.length)];
}

function addCard(cardId) {
  if (!G.ownedCards.includes(cardId)) {
    G.ownedCards.push(cardId);
  } else {
    G.cardDuplicates[cardId] = (G.cardDuplicates[cardId] || 0) + 1;
  }
}

function upgradeCard(cardId) {
  const lv = G.cardLevels[cardId] || 1;
  const dups = G.cardDuplicates[cardId] || 0;
  const needed = lv; // Need lv duplicates to upgrade
  if (lv >= 10) return { error:'Sudah level maksimum!' };
  if (dups < needed) return { error:`Butuh ${needed} duplikat (punya ${dups})` };
  G.cardLevels[cardId] = lv + 1;
  G.cardDuplicates[cardId] -= needed;
  return { success: true, newLevel: lv + 1 };
}

function equipCard(cardId) {
  const infra = INFRA_LEVELS[G.infraLevel];
  if (!G.ownedCards.includes(cardId)) return { error:'Kartu tidak dimiliki' };
  if (G.equippedCards.includes(cardId)) {
    G.equippedCards = G.equippedCards.filter(id => id !== cardId);
    return { unequipped: true };
  }
  if (G.equippedCards.length >= infra.botSlots) {
    return { error: `Slot penuh! Upgrade infra untuk lebih banyak slot (${infra.botSlots} max)` };
  }
  G.equippedCards.push(cardId);
  return { equipped: true };
}

function craftCard(recipeId) {
  const recipe = RECIPES.find(r => r.id === recipeId);
  if (!recipe) return { error:'Recipe tidak ditemukan' };
  if (G.capital < recipe.capital) return { error:`Butuh ${fmtCap(recipe.capital)} Capital` };
  for (const ing of recipe.ingredients) {
    if (!G.ownedCards.includes(ing)) {
      const card = CARDS_DB.find(c => c.id === ing);
      return { error: `Butuh kartu: ${card ? card.name : ing}` };
    }
  }
  G.capital -= recipe.capital;
  G.totalCrafts++;
  // Add crafted card (use recipe id as card id, or fallback)
  const existingCard = CARDS_DB.find(c => c.id === recipeId);
  if (existingCard) addCard(recipeId);
  else {
    // Treat craft result as a new entry
    if (!G.ownedCards.includes(recipeId)) G.ownedCards.push(recipeId);
    G.craftedCards.push(recipeId);
  }
  return { success: true, recipe };
}

function unlockResearch(nodeId) {
  const allNodes = RESEARCH_DATA.flatMap(b => b.nodes);
  const node = allNodes.find(n => n.id === nodeId);
  if (!node) return { error:'Node tidak ditemukan' };
  if (G.unlockedResearch.includes(nodeId)) return { error:'Sudah di-unlock' };
  if (G.level < node.lvReq) return { error:`Butuh Level ${node.lvReq}` };
  if (node.req && !G.unlockedResearch.includes(node.req)) return { error:'Prerequisite belum di-unlock' };
  if (G.researchPoints < node.cost) return { error:`Butuh ${node.cost} RP (punya ${Math.floor(G.researchPoints)})` };
  G.researchPoints -= node.cost;
  G.unlockedResearch.push(nodeId);
  return { success: true, node };
}

function upgradeInfra() {
  const next = INFRA_LEVELS[G.infraLevel + 1];
  if (!next) return { error:'Sudah infrastruktur maksimum!' };
  if (G.level < next.lvReq) return { error:`Butuh Level ${next.lvReq}` };
  if (G.capital < next.cost) return { error:`Butuh ${fmtCap(next.cost)}` };
  G.capital -= next.cost;
  G.infraLevel++;
  return { success: true, infra: next };
}

function attackBoss() {
  const boss = BOSSES[G.bossIndex];
  if (!boss) return;
  const dps = getDPS();
  const dmg = dps * 3 + Math.random() * dps;
  G.bossHP -= dmg;
  G.capital += dmg * 0.5; // Reward per hit
  if (G.bossHP <= 0) {
    G.bossHP = 0;
    G.bossesKilled.push(boss.id);
    // Advance to next boss
    const nextIndex = G.bossIndex + 1;
    if (nextIndex < BOSSES.length) {
      G.bossIndex = nextIndex;
      G.bossHP = BOSSES[nextIndex].hp;
    }
    return { killed: true, boss, dropCard: boss.drop };
  }
  return { hit: true, dmg: Math.floor(dmg) };
}

function triggerEvent(type) {
  if (G.activeEvent) return { error:'Event sudah aktif!' };
  G.activeEvent = type;
  if (type === 'bull') {
    G.eventTimer = 600;
    return { msg:'🐂 BULL RUN! Capital 2× selama 10 menit!' };
  }
  if (type === 'crash') {
    G.eventTimer = 120;
    const hasShield = G.ownedCards.includes('emergency_close');
    if (hasShield) {
      G.flashCrashSurvived++;
      return { msg:'🚨 Flash Crash! EMERGENCY CLOSE melindungi 85% capital!' };
    } else {
      G.capital *= 0.6;
      return { msg:'📉 Flash Crash! Capital turun 40%! Butuh Emergency Close card!', damage:true };
    }
  }
  if (type === 'whale') {
    G.eventTimer = 300;
    return { msg:'🐳 Whale Attack! Volatilitas tinggi — profit atau rugi besar!' };
  }
  if (type === 'ai_rev') {
    G.eventTimer = 900;
    G.activeEvent = 'ai_rev';
    return { msg:'🧠 AI Revolution! Research 3× selama 15 menit!' };
  }
  return { error:'Event tidak dikenal' };
}

function claimDailyReward() {
  const today = new Date().toDateString();
  const last = G.lastLogin ? new Date(G.lastLogin).toDateString() : null;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (last === today) return { error:'Sudah klaim hari ini!' };
  if (last === yesterday) G.loginStreak++;
  else G.loginStreak = 1;
  G.lastLogin = Date.now();
  G.dailyPackClaimed = false;
  // Find reward
  const reward = DAILY_REWARDS.find(r => r.day === G.loginStreak) ||
                 DAILY_REWARDS.find(r => r.day === (G.loginStreak % 7 || 7));
  if (reward.type === 'capital') { G.capital += reward.amount; }
  if (reward.type === 'aitoken') { G.aiTokens += reward.amount; }
  if (reward.type === 'special') { G.capital += (reward.capital||0); G.aiTokens += (reward.aiToken||0); }
  return { success:true, streak:G.loginStreak, reward };
}

function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (!G.achievedIds.includes(ach.id) && ach.condition(G)) {
      G.achievedIds.push(ach.id);
      UI.showAchievement(ach);
    }
  });
}

// ─── FORMAT HELPERS ───────────────────────────────────────────
function fmtCap(n) {
  if (n >= 1e12) return 'Rp ' + (n/1e12).toFixed(2) + 'T';
  if (n >= 1e9)  return 'Rp ' + (n/1e9).toFixed(2) + 'M';
  if (n >= 1e6)  return 'Rp ' + (n/1e6).toFixed(2) + 'Jt';
  if (n >= 1e3)  return 'Rp ' + (n/1000).toFixed(1) + 'rb';
  return 'Rp ' + Math.floor(n).toLocaleString('id-ID');
}

function fmtNum(n) {
  if (n >= 1e9) return (n/1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n/1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n/1000).toFixed(1) + 'K';
  return Math.floor(n).toString();
}

function fmtTime(sec) {
  if (sec < 60) return Math.floor(sec) + 's';
  if (sec < 3600) return Math.floor(sec/60) + 'm';
  return Math.floor(sec/3600) + 'h';
}

function rarityName(r) {
  return ['','Common','Uncommon','Rare','Epic','Legendary','Mythic'][r] || '?';
}

function rarityColor(r) {
  return ['','#8a9aa0','#2ecc71','#3498db','#9b59b6','#f39c12','#ff006e'][r] || '#fff';
}
