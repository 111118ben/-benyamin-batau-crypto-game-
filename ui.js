// ============================================================
// BENYAMIN BATAU CRYPTO GAME — UI.JS
// All DOM rendering, screen management, animations
// ============================================================

const UI = {
  currentTab: 'dashboard',
  achievementQueue: [],
  achievementShowing: false,
  chartHistory: {}, // coin -> price array
  currentFilter: 'all',

  // ── INIT ──────────────────────────────────────────────────
  init() {
    this.renderAll();
    this.startPriceChartLoop();
    this.checkPeakHour();
    this.checkDailyLogin();
    setInterval(() => { gameTick(); this.renderResources(); this.renderMarketPrices(); }, 250);
    setInterval(() => { this.renderAll(); }, 5000);
    setInterval(() => { this.checkPeakHour(); }, 30000);
    setInterval(() => { saveGame(); }, 30000);
    window.addEventListener('beforeunload', () => saveGame());
  },

  renderAll() {
    this.renderResources();
    this.renderDashboard();
    if (this.currentTab === 'cards')    this.renderCards();
    if (this.currentTab === 'craft')    this.renderCraft();
    if (this.currentTab === 'research') this.renderResearch();
    if (this.currentTab === 'events')   this.renderEvents();
  },

  // ── RESOURCES BAR ─────────────────────────────────────────
  renderResources() {
    const cps = getCapPerSecond();
    document.getElementById('res-capital').textContent = fmtCap(G.capital);
    document.getElementById('res-data').textContent    = fmtNum(G.dataMarket);
    document.getElementById('res-research').textContent= fmtNum(G.researchPoints);
    document.getElementById('res-ai').textContent      = G.aiTokens;
    document.getElementById('cps-label').textContent   = fmtCap(cps) + '/dtk';
    document.getElementById('level-display').textContent = 'Lv.' + G.level;
    const xpPct = (G.xp / G.xpMax) * 100;
    document.getElementById('xp-fill').style.width = xpPct + '%';
    // WIB clock
    const wib = new Date(Date.now() + 7 * 3600000);
    const hh = String(wib.getUTCHours()).padStart(2,'0');
    const mm = String(wib.getUTCMinutes()).padStart(2,'0');
    const ss = String(wib.getUTCSeconds()).padStart(2,'0');
    document.getElementById('clock').textContent = hh + ':' + mm + ':' + ss + ' WIB';
  },

  // ── DASHBOARD ─────────────────────────────────────────────
  renderDashboard() {
    const infra = INFRA_LEVELS[G.infraLevel];
    const cps = getCapPerSecond();
    // Bot status
    document.getElementById('infra-display').textContent = infra.icon + ' ' + infra.name;
    document.getElementById('cps-big').textContent = fmtCap(cps * 60) + '/mnt';
    document.getElementById('slots-used').textContent = G.equippedCards.length + '/' + infra.botSlots + ' bot aktif';

    // Equipped cards
    const equippedEl = document.getElementById('equipped-cards');
    equippedEl.innerHTML = '';
    if (G.equippedCards.length === 0) {
      equippedEl.innerHTML = '<div style="color:var(--text2);font-size:10px;padding:8px">Belum ada kartu terpasang. Buka tab Kartu → tap kartu → Pasang.</div>';
    } else {
      G.equippedCards.forEach(cid => {
        const card = CARDS_DB.find(c => c.id === cid);
        if (!card) return;
        const lv = G.cardLevels[cid] || 1;
        const div = document.createElement('div');
        div.className = 'equipped-chip';
        div.innerHTML = `${card.emoji} <span>${card.name}</span> <small>Lv${lv}</small>`;
        div.onclick = () => { equipCard(cid); this.renderDashboard(); this.showToast(`🔌 ${card.name} dilepas`, 'info'); };
        equippedEl.appendChild(div);
      });
    }

    // Stats
    document.getElementById('stat-profit').textContent  = fmtCap(G.totalCapitalEarned);
    document.getElementById('stat-cards').textContent   = G.ownedCards.length + '/' + CARDS_DB.length;
    document.getElementById('stat-research').textContent= G.unlockedResearch.length;
    document.getElementById('stat-prestige').textContent= G.prestigeLevel + 'x';

    // Upgrade button
    const nextInfra = INFRA_LEVELS[G.infraLevel + 1];
    if (nextInfra) {
      document.getElementById('upgrade-btn-text').textContent = infra.icon + '→' + nextInfra.icon + ' ' + nextInfra.name;
      document.getElementById('upgrade-cost').textContent = fmtCap(nextInfra.cost);
      document.getElementById('upgrade-btn').disabled = G.capital < nextInfra.cost;
    } else {
      document.getElementById('upgrade-btn-text').textContent = '✅ MAX — Quantum Computer';
      document.getElementById('upgrade-cost').textContent = 'Level tertinggi!';
      document.getElementById('upgrade-btn').disabled = true;
    }

    // Current chapter
    const lastChapter = CHAPTERS.filter(ch => G.unlockedChapters.includes(ch.id)).pop();
    if (lastChapter) {
      document.getElementById('chapter-title').textContent = lastChapter.emoji + ' ' + lastChapter.title;
    }

    // Event bar
    const evBar = document.getElementById('event-bar');
    if (G.activeEvent && G.eventTimer > 0) {
      const evNames = { bull:'🐂 BULL RUN', crash:'🚨 FLASH CRASH', whale:'🐳 WHALE ATTACK', ai_rev:'🧠 AI REVOLUTION' };
      evBar.style.display = 'block';
      evBar.textContent = (evNames[G.activeEvent]||'EVENT') + ' — ' + fmtTime(G.eventTimer) + ' tersisa';
    } else {
      evBar.style.display = 'none';
    }

    // Peak hour
    const peakBadge = document.getElementById('peak-indicator');
    if (isPeakHour()) {
      peakBadge.style.display = 'block';
      peakBadge.innerHTML = '⚡ PEAK HOUR! Capital 2×!';
    } else {
      peakBadge.style.display = 'none';
    }

    // Market ticker (scrolling)
    this.renderMarketPrices();
  },

  renderMarketPrices() {
    const ticker = document.getElementById('market-ticker');
    if (!ticker) return;
    ticker.innerHTML = MARKET_COINS.map(coin => {
      const price = G.coinPrices[coin.id] || coin.basePrice;
      const change = ((price / coin.basePrice) - 1) * 100;
      const sign = change >= 0 ? '+' : '';
      const col = change >= 0 ? 'var(--neon2)' : 'var(--red)';
      return `<span style="color:${col};margin-right:16px">${coin.name} ${fmtCap(price)} <small>${sign}${change.toFixed(1)}%</small></span>`;
    }).join('');
  },

  // ── MINI CHART ────────────────────────────────────────────
  startPriceChartLoop() {
    const coinId = 'vex';
    if (!this.chartHistory[coinId]) this.chartHistory[coinId] = [];
    setInterval(() => {
      const price = G.coinPrices[coinId] || MARKET_COINS[0].basePrice;
      this.chartHistory[coinId].push(price);
      if (this.chartHistory[coinId].length > 60) this.chartHistory[coinId].shift();
      this.drawChart(coinId);
    }, 1000);
  },

  drawChart(coinId) {
    const canvas = document.getElementById('price-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prices = this.chartHistory[coinId] || [];
    if (prices.length < 2) return;
    const W = canvas.width, H = canvas.height;
    const minP = Math.min(...prices) * 0.999;
    const maxP = Math.max(...prices) * 1.001;
    ctx.clearRect(0, 0, W, H);
    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const y = (i / 3) * H;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    // Price line
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    const lastP = prices[prices.length - 1];
    const isUp = lastP >= prices[0];
    grad.addColorStop(0, isUp ? 'rgba(0,255,136,0.3)' : 'rgba(255,56,96,0.3)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    prices.forEach((p, i) => {
      const x = (i / (prices.length - 1)) * W;
      const y = H - ((p - minP) / (maxP - minP)) * H;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    const lineColor = isUp ? '#00ff88' : '#ff3860';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    // Fill
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  },

  // ── CARDS ─────────────────────────────────────────────────
  renderCards() {
    const grid = document.getElementById('card-grid');
    if (!grid) return;
    grid.innerHTML = '';
    let cards = [...CARDS_DB];
    if (this.currentFilter === 'owned')    cards = cards.filter(c => G.ownedCards.includes(c.id));
    if (this.currentFilter === 'common')   cards = cards.filter(c => c.rarity === 1);
    if (this.currentFilter === 'rare')     cards = cards.filter(c => c.rarity === 3);
    if (this.currentFilter === 'epic_up')  cards = cards.filter(c => c.rarity >= 4);

    // Sort: owned first, then by rarity desc
    cards.sort((a, b) => {
      const ao = G.ownedCards.includes(a.id) ? 1 : 0;
      const bo = G.ownedCards.includes(b.id) ? 1 : 0;
      if (ao !== bo) return bo - ao;
      return b.rarity - a.rarity;
    });

    cards.forEach(card => {
      const owned = G.ownedCards.includes(card.id);
      const lv = G.cardLevels[card.id] || 1;
      const dups = G.cardDuplicates[card.id] || 0;
      const equipped = G.equippedCards.includes(card.id);
      const col = rarityColor(card.rarity);
      const div = document.createElement('div');
      div.className = 'card-tile' + (owned ? ' owned' : ' locked');
      div.style.setProperty('--card-color', col);
      div.innerHTML = `
        ${equipped ? '<div class="equipped-badge">⚡</div>' : ''}
        ${!owned ? '<div class="lock-badge">🔒</div>' : ''}
        ${dups > 0 ? `<div class="dup-badge">×${dups+1}</div>` : ''}
        <div class="card-emoji-big">${card.emoji}</div>
        <div class="card-tile-name">${card.name}</div>
        <div class="card-tile-rarity" style="color:${col}">${rarityName(card.rarity)}</div>
        ${owned ? `<div class="card-tile-lv">Lv ${lv}</div>` : ''}
      `;
      if (owned) div.onclick = () => this.showCardModal(card);
      grid.appendChild(div);
    });
  },

  showCardModal(card) {
    const col = rarityColor(card.rarity);
    const lv = G.cardLevels[card.id] || 1;
    const dups = G.cardDuplicates[card.id] || 0;
    const equipped = G.equippedCards.includes(card.id);
    const neededForUpgrade = lv;
    const modal = document.getElementById('card-modal');
    document.getElementById('card-modal-body').innerHTML = `
      <div style="text-align:center;padding:16px 16px 0">
        <div style="font-size:48px">${card.emoji}</div>
        <div style="font-size:18px;font-weight:700;color:${col};margin:6px 0">${card.name}</div>
        <div style="font-family:monospace;font-size:10px;color:var(--text2)">📁 ${card.file} • ${card.loc.toLocaleString()} bytes</div>
        <div style="display:inline-block;background:${col}22;border:1px solid ${col};color:${col};border-radius:12px;padding:2px 10px;font-size:10px;font-weight:700;margin:6px 0">${rarityName(card.rarity).toUpperCase()}</div>
      </div>
      <div style="padding:0 16px">
        <div style="font-size:11px;color:var(--text2);line-height:1.6;margin-bottom:10px">${card.desc}</div>
        <div style="font-style:italic;font-size:10px;color:${col};margin-bottom:12px">${card.flavor}</div>
        <div style="background:var(--bg3);border-radius:8px;padding:10px;margin-bottom:10px">
          <div style="font-size:10px;color:var(--text2);margin-bottom:6px">📊 STATISTIK</div>
          ${['scanSpeed','prediction','execSpeed','protection'].map(s =>
            `<div style="display:flex;justify-content:space-between;font-size:11px;padding:3px 0;border-bottom:1px solid var(--border)">
              <span>${{scanSpeed:'Scan Speed',prediction:'Prediction',execSpeed:'Exec Speed',protection:'Protection'}[s]}</span>
              <span style="color:var(--neon2);font-weight:700">${card.stats[s]}</span>
            </div>`
          ).join('')}
        </div>
        <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.2);border-radius:8px;padding:8px;margin-bottom:8px;font-size:10px">
          ⭐ <strong style="color:var(--gold)">PASSIVE:</strong> ${card.passive}
        </div>
        ${card.special ? `<div style="background:rgba(0,229,255,0.05);border:1px solid rgba(0,229,255,0.2);border-radius:8px;padding:8px;margin-bottom:8px;font-size:10px">
          ✨ <strong style="color:var(--neon)">SPECIAL:</strong> ${card.special}
        </div>` : ''}
        <div style="background:var(--bg3);border-radius:8px;padding:8px;margin-bottom:12px;font-family:monospace;font-size:9px;color:var(--text2)">
          <div style="color:var(--neon);font-size:10px;margin-bottom:4px">📝 Real Functions:</div>
          ${card.funcs.map(f => `<div style="margin:2px 0">→ ${f}</div>`).join('')}
        </div>
        <div style="display:flex;gap:8px;margin-bottom:8px">
          <div style="flex:1;background:var(--bg3);border-radius:8px;padding:8px;font-size:10px;text-align:center">
            <div style="color:var(--text2)">Level</div>
            <div style="font-size:18px;font-weight:700;color:${col}">${lv}/10</div>
          </div>
          <div style="flex:1;background:var(--bg3);border-radius:8px;padding:8px;font-size:10px;text-align:center">
            <div style="color:var(--text2)">Duplikat</div>
            <div style="font-size:18px;font-weight:700;color:var(--neon)">${dups}</div>
          </div>
        </div>
        <div style="display:flex;gap:8px;padding-bottom:16px">
          <button onclick="UI.doEquip('${card.id}')" class="btn-action ${equipped ? 'btn-danger' : 'btn-primary'}" style="flex:1">
            ${equipped ? '🔌 Lepas' : '⚡ Pasang'}
          </button>
          <button onclick="UI.doUpgradeCard('${card.id}')" class="btn-action btn-secondary" style="flex:1" ${dups < neededForUpgrade || lv >= 10 ? 'disabled' : ''}>
            ⬆️ Upgrade (${dups}/${neededForUpgrade})
          </button>
        </div>
      </div>
    `;
    modal.classList.add('active');
  },

  doEquip(cardId) {
    const res = equipCard(cardId);
    const card = CARDS_DB.find(c => c.id === cardId);
    if (res.error) { this.showToast('❌ ' + res.error, 'error'); return; }
    if (res.equipped) this.showToast(`⚡ ${card.name} dipasang!`, 'success');
    if (res.unequipped) this.showToast(`🔌 ${card.name} dilepas`, 'info');
    this.closeModal('card-modal');
    this.renderCards();
    this.renderDashboard();
  },

  doUpgradeCard(cardId) {
    const res = upgradeCard(cardId);
    const card = CARDS_DB.find(c => c.id === cardId);
    if (res.error) { this.showToast('❌ ' + res.error, 'error'); return; }
    this.showToast(`⬆️ ${card.name} → Level ${res.newLevel}!`, 'success');
    this.showCardModal(card);
  },

  // ── CRAFT ─────────────────────────────────────────────────
  renderCraft() {
    const el = document.getElementById('recipe-list');
    if (!el) return;
    el.innerHTML = '';
    RECIPES.forEach(recipe => {
      const canCraft = recipe.ingredients.every(ing => G.ownedCards.includes(ing));
      const canAfford = G.capital >= recipe.capital;
      const alreadyHave = G.ownedCards.includes(recipe.id) || G.craftedCards.includes(recipe.id);
      const col = rarityColor(recipe.rarity);
      const div = document.createElement('div');
      div.className = 'recipe-card' + (canCraft && canAfford ? ' craftable' : '');
      div.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px">
          <div style="font-size:28px">${recipe.emoji}</div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:700;color:${col}">${recipe.name}</div>
            <div style="font-size:10px;color:var(--text2)">${recipe.desc}</div>
            <div style="font-size:10px;color:var(--neon2);margin-top:3px">✨ ${recipe.bonus}</div>
          </div>
          <div style="text-align:right;font-size:10px">
            <div style="color:${col}">${rarityName(recipe.rarity)}</div>
            <div style="color:var(--gold)">${fmtCap(recipe.capital)}</div>
          </div>
        </div>
        <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px">
          ${recipe.ingredients.map(ing => {
            const c = CARDS_DB.find(x => x.id === ing);
            const has = G.ownedCards.includes(ing);
            return `<span style="background:${has ? 'rgba(0,255,136,0.1)' : 'rgba(255,56,96,0.1)'};border:1px solid ${has ? 'var(--neon2)' : 'var(--red)'};color:${has ? 'var(--neon2)' : 'var(--red)'};border-radius:4px;padding:2px 6px;font-size:9px">${c ? c.emoji + c.name : ing}</span>`;
          }).join('')}
        </div>
        ${alreadyHave ? '<div style="color:var(--neon2);font-size:10px;margin-top:6px">✓ Sudah dimiliki</div>'
          : `<button onclick="UI.doCraft('${recipe.id}')" class="btn-craft" ${!(canCraft && canAfford) ? 'disabled' : ''}>
              ${!canCraft ? '🔒 Butuh semua bahan' : !canAfford ? '💸 Capital kurang' : '🔨 CRAFT'}
            </button>`}
      `;
      el.appendChild(div);
    });
  },

  doCraft(recipeId) {
    const res = craftCard(recipeId);
    if (res.error) { this.showToast('❌ ' + res.error, 'error'); return; }
    this.showToast(`✅ Berhasil craft: ${res.recipe.name}!`, 'success');
    this.renderCraft();
  },

  // ── RESEARCH ──────────────────────────────────────────────
  renderResearch() {
    const el = document.getElementById('research-content');
    if (!el) return;
    el.innerHTML = '';
    RESEARCH_DATA.forEach(branch => {
      const sec = document.createElement('div');
      sec.className = 'branch-section';
      sec.innerHTML = `<div class="branch-title" style="border-color:${branch.color};color:${branch.color}">${branch.branch}</div>`;
      const row = document.createElement('div');
      row.className = 'node-row';
      branch.nodes.forEach((node, idx) => {
        const unlocked = G.unlockedResearch.includes(node.id);
        const reqMet = !node.req || G.unlockedResearch.includes(node.req);
        const lvMet = G.level >= node.lvReq;
        const canAfford = G.researchPoints >= node.cost;
        const locked = !reqMet || !lvMet;
        const div = document.createElement('div');
        div.className = 'research-node' + (unlocked ? ' unlocked' : (locked ? ' locked' : ' available'));
        div.style.setProperty('--node-color', branch.color);
        div.innerHTML = `
          ${idx > 0 ? '<div class="node-connector"></div>' : ''}
          <div class="node-inner">
            <div class="node-icon-big">${node.icon}</div>
            <div class="node-name-text">${node.name}</div>
            <div class="node-status">
              ${unlocked ? `<span style="color:var(--neon2)">✓ Unlocked</span>` :
                locked ? (lvMet ? '<span style="color:var(--text2)">🔒 Req prev</span>' : `<span style="color:var(--red)">Lv${node.lvReq}</span>`) :
                `<span style="color:var(--gold)">🔬${node.cost} RP</span>`}
            </div>
            <div class="node-bonus" style="color:${branch.color}">${node.bonus}</div>
          </div>
        `;
        if (!unlocked && !locked) div.onclick = () => this.doUnlockResearch(node.id);
        row.appendChild(div);
      });
      sec.appendChild(row);
      el.appendChild(sec);
    });
  },

  doUnlockResearch(nodeId) {
    const res = unlockResearch(nodeId);
    if (res.error) { this.showToast('❌ ' + res.error, 'error'); return; }
    this.showToast(`✅ ${res.node.name} unlocked! ${res.node.bonus}`, 'success');
    this.renderResearch();
    this.renderResources();
  },

  // ── EVENTS ────────────────────────────────────────────────
  renderEvents() {
    const boss = BOSSES[G.bossIndex];
    // Boss HP
    if (boss) {
      const pct = (G.bossHP / boss.hp * 100).toFixed(1);
      document.getElementById('boss-name').textContent = boss.emoji + ' ' + boss.name;
      document.getElementById('boss-hp-text').textContent = fmtNum(G.bossHP) + ' / ' + fmtNum(boss.hp);
      document.getElementById('boss-hp-fill').style.width = pct + '%';
      document.getElementById('boss-lore').textContent = boss.lore;
      document.getElementById('boss-dps').textContent = 'DPS: ' + fmtNum(getDPS());
      const eta = getDPS() > 0 ? fmtTime(G.bossHP / getDPS()) : '∞';
      document.getElementById('boss-eta').textContent = 'ETA: ' + eta;
    }
  },

  doBossAttack() {
    const res = attackBoss();
    if (!res) return;
    if (res.hit) {
      const dmgEl = document.getElementById('boss-dmg-flash');
      if (dmgEl) { dmgEl.textContent = '-' + fmtNum(res.dmg); dmgEl.classList.add('flash'); setTimeout(() => dmgEl.classList.remove('flash'), 500); }
    }
    if (res.killed) {
      this.showToast(`🎉 ${res.boss.name} DIKALAHKAN!`, 'levelup');
      addCard(res.dropCard);
      setTimeout(() => this.showPackReveal(CARDS_DB.find(c => c.id === res.dropCard)), 800);
    }
    this.renderEvents();
  },

  doTriggerEvent(type) {
    const res = triggerEvent(type);
    if (res.error) { this.showToast('❌ ' + res.error, 'error'); return; }
    this.showToast(res.msg, res.damage ? 'error' : 'success');
    this.renderDashboard();
  },

  // ── PACK REVEAL ───────────────────────────────────────────
  showPackReveal(card) {
    if (!card) return;
    const col = rarityColor(card.rarity);
    const overlay = document.getElementById('pack-overlay');
    document.getElementById('reveal-emoji').textContent = card.emoji;
    document.getElementById('reveal-name').textContent = card.name;
    document.getElementById('reveal-file').textContent = card.file;
    document.getElementById('reveal-rarity').textContent = rarityName(card.rarity).toUpperCase();
    document.getElementById('reveal-rarity').style.background = col + '33';
    document.getElementById('reveal-rarity').style.color = col;
    document.getElementById('reveal-rarity').style.borderColor = col;
    document.getElementById('reveal-desc').textContent = card.desc;
    document.getElementById('reveal-box').style.borderColor = col;
    document.getElementById('reveal-box').style.boxShadow = `0 0 40px ${col}55`;
    // Stats
    document.getElementById('reveal-stats').innerHTML =
      Object.entries(card.stats).map(([k,v]) =>
        `<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid var(--border);font-size:11px">
          <span>${{scanSpeed:'Scan',prediction:'Predict',execSpeed:'Exec',protection:'Guard'}[k]}</span>
          <span style="color:var(--neon2);font-weight:700">${v}</span>
        </div>`
      ).join('');
    // Particles
    this.createParticles(col);
    overlay.classList.add('active');
  },

  closePackReveal() {
    document.getElementById('pack-overlay').classList.remove('active');
    this.renderCards();
    this.renderDashboard();
  },

  createParticles(color) {
    const c = document.getElementById('reveal-particles');
    c.innerHTML = '';
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;background:${color};animation-delay:${Math.random()}s;animation-duration:${1+Math.random()*1.5}s`;
      c.appendChild(p);
    }
  },

  doOpenPack(type) {
    const res = openPack(type);
    if (res.error) { this.showToast('❌ ' + res.error, 'error'); return; }
    this.showPackReveal(res.card);
  },

  // ── ACHIEVEMENT POPUP ─────────────────────────────────────
  showAchievement(ach) {
    this.achievementQueue.push(ach);
    if (!this.achievementShowing) this.nextAchievement();
  },

  nextAchievement() {
    if (this.achievementQueue.length === 0) { this.achievementShowing = false; return; }
    this.achievementShowing = true;
    const ach = this.achievementQueue.shift();
    const el = document.getElementById('achievement-popup');
    document.getElementById('ach-emoji').textContent = ach.emoji;
    document.getElementById('ach-name').textContent  = ach.name;
    document.getElementById('ach-desc').textContent  = ach.desc;
    document.getElementById('ach-reward').textContent = '🎁 ' + ach.reward;
    el.classList.add('show');
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => this.nextAchievement(), 400); }, 3500);
  },

  // ── CHAPTER UNLOCK ────────────────────────────────────────
  showChapterUnlock(ch) {
    const el = document.getElementById('chapter-modal');
    document.getElementById('chapter-emoji').textContent = ch.emoji;
    document.getElementById('chapter-title-modal').textContent = 'Chapter ' + ch.id + ': ' + ch.title;
    document.getElementById('chapter-story').textContent = ch.story;
    document.getElementById('chapter-reward').textContent = '🎁 Reward: ' + ch.reward;
    el.classList.add('active');
  },

  // ── STORY MODAL ───────────────────────────────────────────
  showStory() {
    const ch = CHAPTERS.filter(c => G.unlockedChapters.includes(c.id)).pop();
    if (ch) this.showChapterUnlock(ch);
  },

  // ── DAILY REWARD ──────────────────────────────────────────
  checkDailyLogin() {
    const today = new Date().toDateString();
    const last = G.lastLogin ? new Date(G.lastLogin).toDateString() : null;
    if (last !== today) {
      setTimeout(() => {
        document.getElementById('daily-modal').classList.add('active');
      }, 2000);
    }
  },

  doDailyReward() {
    const res = claimDailyReward();
    if (res.error) { this.showToast('❌ ' + res.error, 'error'); this.closeModal('daily-modal'); return; }
    this.showToast(`📅 Streak ${res.streak}! ${res.reward.label}`, 'success');
    this.closeModal('daily-modal');
    this.renderResources();
  },

  // ── UPGRADE INFRA ─────────────────────────────────────────
  doUpgradeInfra() {
    const res = upgradeInfra();
    if (res.error) { this.showToast('❌ ' + res.error, 'error'); return; }
    this.showToast(`🏗️ Upgrade ke ${res.infra.name}!`, 'levelup');
    this.renderDashboard();
    this.renderResources();
  },

  // ── TABS ──────────────────────────────────────────────────
  showTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('screen-' + tab).classList.add('active');
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    this.renderAll();
  },

  // ── MISC ──────────────────────────────────────────────────
  closeModal(id) { document.getElementById(id).classList.remove('active'); },

  checkPeakHour() {
    const peak = isPeakHour();
    if (peak && !this._lastPeak) {
      G.peakHourLogins++;
      this.showToast('⚡ PEAK HOUR AKTIF! Capital 2× selama 30 menit!', 'levelup');
    }
    this._lastPeak = peak;
  },

  showToast(msg, type = 'info') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast show toast-' + type;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
  },

  doPrestige() {
    if (G.level < 100) { this.showToast('❌ Butuh Level 100 untuk Prestige!', 'error'); return; }
    G.prestigeLevel++;
    G.prestigeMult *= 2;
    const cards = [...G.ownedCards];
    const research = [...G.unlockedResearch];
    Object.assign(G, JSON.parse(JSON.stringify(DEFAULT_STATE)));
    G.prestigeLevel = G.prestigeLevel;
    G.prestigeMult = G.prestigeMult;
    G.ownedCards = cards.filter(id => ['war_machine','master_bot'].includes(id));
    G.unlockedResearch = [];
    G.capital = 50000 * G.prestigeMult;
    this.showToast(`🌌 PRESTIGE ${G.prestigeLevel}! Semua reset. Multiplier ${G.prestigeMult}×!`, 'levelup');
    this.renderAll();
  },
};
