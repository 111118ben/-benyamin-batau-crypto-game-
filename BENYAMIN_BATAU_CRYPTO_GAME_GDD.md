# BENYAMIN BATAU CRYPTO GAME
## Game Design Document (GDD) — Lengkap
**Versi:** 1.0 | **Tanggal:** 30 Mei 2026 | **Developer:** Benyamin Batau
**Platform:** Android (Google Play Store 2026) | **Engine:** Unity 6 | **Bahasa:** C#

---

# BAGIAN 1 — GAME DESIGN DOCUMENT (GDD)

## 1.1 Identitas Game
| Field | Detail |
|-------|--------|
| Nama | Benyamin Batau Crypto Game |
| Genre | Idle Tycoon + AI Developer Simulator + Card Collection |
| Platform | Android (Portrait Mode, Mobile First) |
| Engine | Unity 6 |
| Bahasa | C# |
| Target Rating | PEGI 3 / Google Play Everyone |
| Monetisasi | Free to Play + IAP + Rewarded Ads |
| Sesi Ideal | 3–10 menit per sesi |

## 1.2 Konsep Inti
Pemain berperan sebagai programmer muda yang memulai dari laptop bekas di kamar kos, dengan hanya beberapa script sederhana. Tujuannya membangun **Quantum Trading Corporation** terbesar di dunia dengan mengumpulkan, meneliti, menggabungkan, dan mengembangkan ribuan modul script asli menjadi bot trading AI yang semakin kuat.

**Keunikan Utama:** Setiap kartu teknologi dalam game adalah **script asli dari sistem trading nyata Benyamin Batau** — file Python, modul bot, algoritma AI — diubah menjadi collectible card dengan statistik nyata.

## 1.3 Pillars Desain
1. **Authentic** — Script asli = kartu nyata, bukan fiksi
2. **Progressive** — Dari laptop → Quantum Corp, smooth curve
3. **Idle-Friendly** — Bot tetap profit saat offline
4. **Accessible** — Tidak perlu mengerti trading/coding
5. **Social** — Leaderboard, guild, event bersama

---

# BAGIAN 2 — STORYLINE

## 2.1 Prolog
> *"Makassar, 2024. Seorang guru SMK bernama Benyamin Batau duduk di depan laptop lusuh di malam hari. Di layarnya: terminal Python, log trading, dan angka-angka yang bergerak. Dia bukan trader profesional. Dia hanya guru yang ingin tahu — bisa kah sebuah kode kecil mengubah nasib?"*

Pemain mewarisi **USB Drive** berisi 5 script pertama Benyamin — `cek_status.py`, `poll_saldo.py`, `check_pond.py`, `scan_pump.py`, `monitor_vex.py` — dan harus mengembangkannya menjadi empire.

## 2.2 Babak Cerita

### Babak 1: "The Sleeping Coder" (Level 1–10)
Laptop tua, kamar kos, script sederhana. Belajar membaca pasar.
- Unlock: `cek_status.py`, `poll_saldo.py`, `monitor_vex.py`
- Plot twist: Script `cek_status.py` pertama kali jalan dan **menemukan profit Rp127,000** dari coin POND yang terlupakan.

### Babak 2: "The Signal Hunter" (Level 11–25)
Pindah ke kantor kecil. Mulai memahami pola pasar.
- Unlock: `analisis_strategi.py`, `scanner_strategi.py`, `scan_pump.py`
- Plot: Mendeteksi **"Sleeping Coin"** pertama — coin VEX sebelum pump 40%

### Babak 3: "The Brain Awakens" (Level 26–50)
Data Center pertama. AI mulai berbicara.
- Unlock: `CLAUDE_BRAIN.py`, `SENSOR.py`
- Plot: `CLAUDE_BRAIN` pertama kali merekomendasikan BUY dan **benar** — ONDO +28% dalam 3 hari

### Babak 4: "War Machine Rising" (Level 51–75)
AI Laboratory. 10 strategi berjalan bersamaan.
- Unlock: `WAR_MACHINE.py`, `BENYAMIN_MASTER_BOT.py`
- Plot: **The Whale King** menyerang — market manipulator mencoba menghancurkan portfolio

### Babak 5: "Quantum Ascension" (Level 76–100)
Quantum Trading Corporation. Benyamin Batau menjadi legenda.
- Unlock: Quantum Processor, Full AI Stack
- Plot: Melawan **Flash Crash Titan** — crash pasar global, bot survival test

---

# BAGIAN 3 — GAMEPLAY LOOP

## 3.1 Core Loop (Setiap Sesi)
```
BUKA APP
    ↓
KLAIM OFFLINE REWARD (Capital + Research + Data)
    ↓
LIHAT DASHBOARD — Bot berjalan, profit mengalir
    ↓
PILIH AKSI:
    ├── CRAFTING: Gabungkan 2 kartu → kartu baru
    ├── RESEARCH: Invest Research Point ke Tech Tree
    ├── UPGRADE: Tingkatkan infrastruktur (Laptop → Server)
    ├── CARD HUNT: Buka Card Pack (gratis/premium)
    └── EVENT: Flash Crash / Bull Run / Boss Battle
    ↓
BOT JALAN OTOMATIS (Idle)
    ↓
TUTUP APP (Bot tetap jalan offline)
```

## 3.2 Resource Economy
| Resource | Ikon | Cara Dapat | Cara Pakai |
|----------|------|-----------|-----------|
| Capital (IDR) | 💰 | Bot profit, trade | Beli upgrade, pack |
| Data Market | 📊 | Scanner, SENSOR | Research, craft |
| Processing Power | ⚡ | Hardware upgrade | Jalankan lebih banyak bot |
| Research Point | 🔬 | Lab, idle | Unlock di Tech Tree |
| AI Token | 🤖 | CLAUDE_BRAIN aktif | Aktifkan AI cards |

## 3.3 Progression Stages
| Level | Stage | Infrastruktur | Bot Aktif |
|-------|-------|--------------|-----------|
| 1–5 | Kamar Kos | Laptop Bekas | 1 script |
| 6–10 | Kos Upgrade | Laptop Gaming | 3 script |
| 11–25 | Trading Office | PC Workstation | 5 bot |
| 26–50 | Data Center | Server Farm | 10 bot |
| 51–75 | AI Laboratory | GPU Cluster | 20 bot |
| 76–100 | Quantum Corp | Quantum Computer | Unlimited |

## 3.4 Idle Mechanics
- **Offline Cap:** 24 jam reward maksimum
- **Offline Rate:** Berdasarkan level infrastruktur + kartu aktif
- **Comeback Bonus:** Lebih dari 12 jam offline → +50% reward pertama
- **Sleep Bonus:** Offline 23:00–06:00 WIB → +20% extra (simulating peak-hour logic dari MASTER_BOT)

---

# BAGIAN 4 — UI/UX FLOW

## 4.1 Layar Utama
```
┌─────────────────────────────────┐
│  [LOGO] BENYAMIN BATAU CRYPTO   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  💰 Rp 12.847.000    ⚡ 450     │
│  📊 3.200 DM   🔬 780 RP       │
│                                 │
│  ┌───────────────────────────┐  │
│  │   🤖 BOT STATUS: ACTIVE   │  │
│  │   VEX +12.4% ▲  ONDO +8% │  │
│  │   ████████░░ 08:00 WIB    │  │
│  └───────────────────────────┘  │
│                                 │
│  [CARDS] [LAB] [MARKET] [EVENT] │
│                                 │
│  ┌─────────┐  ┌─────────────┐  │
│  │ CRAFT   │  │ RESEARCH    │  │
│  │   🔨    │  │    🔬       │  │
│  └─────────┘  └─────────────┘  │
└─────────────────────────────────┘
```

## 4.2 Card Collection Screen
```
┌─────────────────────────────────┐
│ ◄ TECH LIBRARY          🔍 [  ] │
│  ─────────────────────────────  │
│  [ALL] [COMMON] [RARE] [EPIC+]  │
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ 🟢   │ │ 🔵   │ │ 🟣   │   │
│  │cek_  │ │SENSOR│ │CLAUDE│   │
│  │status│ │.py   │ │BRAIN │   │
│  │COMMON│ │LEGEND│ │LEGEND│   │
│  │ ★1   │ │ ★5   │ │ ★5   │   │
│  └──────┘ └──────┘ └──────┘   │
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ 🔴   │ │ 🟡   │ │ 🌟   │   │
│  │WAR   │ │MASTER│ │QUANT │   │
│  │MACHIN│ │ BOT  │ │ UM   │   │
│  │MYTHIC│ │MYTHIC│ │?????│   │
│  │ ★6   │ │ ★6   │ │LOCKED│   │
│  └──────┘ └──────┘ └──────┘   │
└─────────────────────────────────┘
```

## 4.3 Research Tree Screen
```
┌─────────────────────────────────┐
│ ◄ RESEARCH TREE     🔬 780 RP  │
│                                 │
│  MARKET ANALYSIS ────────────   │
│  [RSI✓]─[MACD✓]─[BB]─[EMA]─[Vol]│
│                                 │
│  EXECUTION SYSTEM ───────────   │
│  [WS]─[Router]─[Smart]─[HFT]   │
│                                 │
│  RISK MANAGEMENT ────────────   │
│  [SL✓]─[TP✓]─[PosSize]─[Hedge] │
│                                 │
│  ARTIFICIAL INTELLIGENCE ─────  │
│  [Neural]─[ML]─[DL]─[Quantum]  │
│                                 │
│       [INVEST 200 RP]           │
└─────────────────────────────────┘
```

## 4.4 Crafting Screen
```
┌─────────────────────────────────┐
│ ◄ CRAFTING LAB                  │
│                                 │
│   ┌──────┐    ┌──────┐         │
│   │ RSI  │ +  │MACD  │         │
│   │ANALYZ│    │ENGINE│         │
│   └──────┘    └──────┘         │
│          ↓ FORGE ↓              │
│      ┌──────────────┐          │
│      │ TREND        │          │
│      │ DETECTOR     │          │
│      │ [RARE] ★3    │          │
│      └──────────────┘          │
│                                 │
│   [🔨 CRAFT — 500 Capital]      │
└─────────────────────────────────┘
```

## 4.5 Navigation Flow
```
SPLASH → LOADING → HOME
HOME → CARDS → CARD_DETAIL → EQUIP
HOME → LAB → RESEARCH_TREE → UNLOCK
HOME → CRAFT → RECIPE → CONFIRM
HOME → MARKET → PACK_STORE → OPEN_PACK
HOME → EVENT → BOSS_BATTLE / FLASH_CRASH
HOME → SETTINGS → AUDIO / ACCOUNT / HELP
```

---

# BAGIAN 5 — DATABASE STRUCTURE

## 5.1 Tabel Cards
```sql
CREATE TABLE cards (
    id              TEXT PRIMARY KEY,     -- "sensor_py"
    display_name    TEXT NOT NULL,        -- "SENSOR.py"
    real_filename   TEXT,                 -- "SENSOR.py"
    description     TEXT,
    rarity          INTEGER,              -- 1=Common, 2=Uncommon, 3=Rare, 4=Epic, 5=Legendary, 6=Mythic
    category        TEXT,                 -- "Execution", "Analysis", "AI", "Monitor", "Risk"
    stat_1_name     TEXT,                 -- "Scan Speed"
    stat_1_value    REAL,                 -- 85.0
    stat_2_name     TEXT,
    stat_2_value    REAL,
    stat_3_name     TEXT,
    stat_3_value    REAL,
    passive_effect  TEXT,                 -- JSON string
    craft_recipe    TEXT,                 -- JSON: ["rsi_analyzer", "macd_engine"]
    unlock_level    INTEGER,
    lines_of_code   INTEGER,              -- Real LOC dari script asli
    real_functions  TEXT                  -- JSON: ["get_summaries()", "private()"]
);
```

## 5.2 Tabel Player
```sql
CREATE TABLE player (
    id                  TEXT PRIMARY KEY DEFAULT 'local',
    level               INTEGER DEFAULT 1,
    xp                  INTEGER DEFAULT 0,
    capital             REAL DEFAULT 50000,
    data_market         INTEGER DEFAULT 100,
    processing_power    INTEGER DEFAULT 10,
    research_points     INTEGER DEFAULT 0,
    ai_tokens           INTEGER DEFAULT 0,
    last_online         TEXT,             -- ISO8601
    total_playtime_min  INTEGER DEFAULT 0,
    infrastructure_id   TEXT DEFAULT 'laptop_bekas',
    prestige_level      INTEGER DEFAULT 0
);
```

## 5.3 Tabel Player_Cards
```sql
CREATE TABLE player_cards (
    player_id   TEXT,
    card_id     TEXT,
    count       INTEGER DEFAULT 1,       -- Duplikat untuk upgrade
    level       INTEGER DEFAULT 1,       -- Max 10
    is_equipped INTEGER DEFAULT 0,
    obtained_at TEXT,
    PRIMARY KEY (player_id, card_id)
);
```

## 5.4 Tabel Research_Progress
```sql
CREATE TABLE research_progress (
    player_id   TEXT,
    node_id     TEXT,                    -- "rsi_analyzer", "quantum_ai"
    unlocked    INTEGER DEFAULT 0,
    level       INTEGER DEFAULT 0,       -- 0–5
    PRIMARY KEY (player_id, node_id)
);
```

## 5.5 Tabel Active_Positions (Idle Bot State)
```sql
CREATE TABLE active_positions (
    id          TEXT PRIMARY KEY,
    player_id   TEXT,
    coin        TEXT,                    -- "vex", "ondo"
    buy_price   REAL,
    amount      REAL,
    tp_pct      REAL,
    sl_pct      REAL,
    opened_at   TEXT,
    bot_card_id TEXT                     -- Kartu bot yang mengelola posisi ini
);
```

## 5.6 Tabel Achievements
```sql
CREATE TABLE achievements (
    id          TEXT PRIMARY KEY,
    player_id   TEXT,
    achieved    INTEGER DEFAULT 0,
    progress    REAL DEFAULT 0,
    achieved_at TEXT
);
```

## 5.7 Tabel Daily_Rewards
```sql
CREATE TABLE daily_rewards (
    player_id   TEXT PRIMARY KEY,
    streak      INTEGER DEFAULT 0,
    last_claim  TEXT,
    total_claims INTEGER DEFAULT 0
);
```

---

# BAGIAN 6 — CARD SYSTEM

## 6.1 Rarity Tiers
| Tier | Nama | Warna | Drop Rate | Sumber Asli |
|------|------|-------|-----------|-------------|
| 1 | Common | Abu-abu | 60% | Script utilitas (cek_status, poll_saldo) |
| 2 | Uncommon | Hijau | 25% | Monitor scripts (monitor_vex, check_pond) |
| 3 | Rare | Biru | 10% | Analysis scripts (analisis_strategi, scan_pump) |
| 4 | Epic | Ungu | 4% | Trading bots (bot_aktif, claude_pro_trader) |
| 5 | Legendary | Emas | 0.9% | Core engines (CLAUDE_BRAIN, SENSOR, bot_engine) |
| 6 | Mythic | Pelangi | 0.1% | Master systems (WAR_MACHINE, BENYAMIN_MASTER_BOT) |

## 6.2 Kartu Asli dari Repository

### MYTHIC CARDS (0.1% drop rate)
```
┌────────────────────────────────────┐
│ 🌈 WAR MACHINE                     │
│ Rarity: MYTHIC ★★★★★★              │
│ File Asli: WAR_MACHINE.py (123K)   │
├────────────────────────────────────┤
│ "10 strategi berjalan bersamaan.   │
│  War Machine = Tangan dari AI."    │
├────────────────────────────────────┤
│ ⚡ Voting Strategies: +10          │
│ 🎯 Regime Detection: ACTIVE        │
│ 💰 Kelly Position Size: ENABLED    │
│ 🛡️ Sacred Reserve: 10% LOCKED      │
├────────────────────────────────────┤
│ PASSIVE: "Ammo System"             │
│ Active 60% | Reserve 30% | Sacred 10% │
│ Max 3 concurrent positions         │
├────────────────────────────────────┤
│ SPECIAL: Market Regime Auto-Switch │
│ Trending → Ranging → Chaos → Accum │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ 🌈 BENYAMIN MASTER BOT             │
│ Rarity: MYTHIC ★★★★★★              │
│ File Asli: BENYAMIN_MASTER_BOT.py  │
│ Lines of Code: 1,012               │
├────────────────────────────────────┤
│ "Puncak dari semua bot. Bekerja    │
│  di 08:00 dan 20:00 WIB setiap    │
│  hari tanpa gagal."                │
├────────────────────────────────────┤
│ 🕗 Peak Hour Trading: +300%        │
│ 😴 Sleeping Coin Detect: +200%    │
│ 🔄 Auto-Loop on TP: ENABLED        │
│ 📈 Budget Deploy: 95%              │
├────────────────────────────────────┤
│ PASSIVE: "Coiled Spring"           │
│ Deteksi konsolidasi rendah sebelum │
│ pump besar. Profit Multiplier 5x   │
└────────────────────────────────────┘
```

### LEGENDARY CARDS (0.9% drop rate)
```
┌────────────────────────────────────┐
│ 🟡 CLAUDE BRAIN                    │
│ Rarity: LEGENDARY ★★★★★            │
│ File Asli: CLAUDE_BRAIN.py (28K)   │
├────────────────────────────────────┤
│ 🧠 AI Decision Power: +150%        │
│ 🔮 Market Prediction: 78%          │
│ 💬 Multi-turn Analysis: ACTIVE     │
│ 🚨 Risk Level Detector: AUTO       │
├────────────────────────────────────┤
│ DECISION TYPES: BUY/SELL/HOLD      │
│ URGENCY: NOW/WAIT/MONITOR/STOP     │
│ CONFIDENCE: 0.0 → 1.0              │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ 🟡 SENSOR.py                       │
│ Rarity: LEGENDARY ★★★★★            │
│ File Asli: SENSOR.py (70K)         │
├────────────────────────────────────┤
│ 📡 Data Sources: 4 APIs            │
│ ⏱️ Scan Interval: 10 detik         │
│ 📰 News Sentiment: ACTIVE          │
│ 🌙 Social Signal (LunarCrush): ON  │
├────────────────────────────────────┤
│ SOURCES: Indodax + CoinGecko       │
│          + NewsAPI + LunarCrush    │
│ HISTORY: 2000 ticks per coin       │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ 🟡 BOT ENGINE HF                   │
│ Rarity: LEGENDARY ★★★★★            │
│ File Asli: bot_engine.py (731 ln)  │
├────────────────────────────────────┤
│ ☁️ Cloud Deploy: HuggingFace       │
│ 💾 Persistent State: ENABLED       │
│ 🔄 Auto-Recovery: ON               │
│ 📊 Trade History Log: ACTIVE       │
└────────────────────────────────────┘
```

### EPIC CARDS (4% drop rate)
```
┌─────────────────────────┐  ┌─────────────────────────┐
│ 🟣 BOT AKTIF            │  │ 🟣 CLAUDE PRO TRADER    │
│ EPIC ★★★★               │  │ EPIC ★★★★               │
│ bot_aktif.py (26K)      │  │ claude_pro_trader.py    │
│ ─────────────────────── │  │ ─────────────────────── │
│ Multi-Coin: +5 pairs    │  │ AI Decision: +100%      │
│ ONDO Regime: SPECIAL    │  │ Market Scan: AUTO       │
│ Dynamic Exit: ON        │  │ State Persist: ON       │
└─────────────────────────┘  └─────────────────────────┘

┌─────────────────────────┐  ┌─────────────────────────┐
│ 🟣 ANALISIS STRATEGI    │  │ 🟣 EKSEKUSI ANALISIS    │
│ EPIC ★★★★               │  │ EPIC ★★★★               │
│ analisis_strategi.py    │  │ eksekusi_analisis.py    │
│ ─────────────────────── │  │ ─────────────────────── │
│ RSI Analysis: +40%      │  │ Execution Speed: +60%   │
│ EMA Momentum: +30%      │  │ Slippage Control: ON    │
│ Market Regime: DETECT   │  │ AI Recommend: FOLLOW    │
└─────────────────────────┘  └─────────────────────────┘
```

### RARE CARDS (10% drop rate)
| Kartu | File Asli | Stat Utama |
|-------|-----------|-----------|
| Scanner Strategi | scanner_strategi.py | Regime Detect +25% |
| Jual Paksa Semua | jual_paksa_semua.py | Emergency Exit Speed |
| Emergency Close | emergency_close.py | Capital Protection +50 |
| Monitor Pump | monitor_pump.py | Pump Detection +35% |
| Monitor VEX | monitor_vex.py | VEX-specific +40% |
| Monitor ONDO | monitor_ondo.py | ONDO Regime +30% |
| Analyze Trades | analyze_trades.py | P&L Accuracy +20% |

### UNCOMMON CARDS (25% drop rate)
| Kartu | File Asli | Stat Utama |
|-------|-----------|-----------|
| Monitor LINK | monitor_link.py | LINK tracking +15% |
| Monitor Pippin | monitor_pippin.py | PIPPIN SL +20% |
| Ubah Target | ubah_target.py | TP Flexibility +10% |
| Pantau Posisi | pantau_posisi.py | Multi-pos Monitor |
| Scan Pump | scan_pump.py | Pump Scanner |
| Cek Lengkap | cek_lengkap.py | Full Audit |

### COMMON CARDS (60% drop rate)
| Kartu | File Asli | Stat Utama |
|-------|-----------|-----------|
| Cek Status | cek_status.py | Status Check +5% |
| Poll Saldo | poll_saldo.py | Balance Monitor |
| Check Pond | check_pond.py | POND Tracking |
| Cek History | cek_history.py | History View |
| Beli Pump | beli_pump.py | Basic Buy +5% |
| Ubah Target TLM | ubah_target_tlm.py | TLM Targeting |

## 6.3 Card Pack System
| Pack | Harga | Isi | Guaranteed |
|------|-------|-----|-----------|
| Starter Pack | Free (daily) | 3 cards | 1 Uncommon+ |
| Data Pack | 5,000 Capital | 5 cards | 1 Rare+ |
| AI Pack | 50,000 Capital | 10 cards | 1 Epic+ |
| Legendary Cache | 10 AI Token | 5 cards | 1 Legendary+ |
| Mythic Archive | 50 AI Token | 3 cards | 1 Mythic (50% chance) |

## 6.4 Card Level System
- Setiap kartu bisa diupgrade Level 1–10
- Butuh duplikat kartu: Level 2 = 2x duplikat, Level 5 = 5x, Level 10 = 20x
- Setiap level: +10% semua stats kartu

---

# BAGIAN 7 — UPGRADE SYSTEM

## 7.1 Infrastructure Upgrades
```
LAPTOP BEKAS (Start)
    → Cost: Free
    → Processing: 10, Bot Slots: 1, Idle Rate: 1x

LAPTOP GAMING (Level 5)
    → Cost: Rp 500,000
    → Processing: 50, Bot Slots: 3, Idle Rate: 2x

PC WORKSTATION (Level 10)
    → Cost: Rp 5,000,000
    → Processing: 200, Bot Slots: 5, Idle Rate: 5x

SERVER FARM (Level 25)
    → Cost: Rp 50,000,000
    → Processing: 1,000, Bot Slots: 10, Idle Rate: 15x

GPU CLUSTER (Level 50)
    → Cost: Rp 500,000,000
    → Processing: 5,000, Bot Slots: 20, Idle Rate: 50x

QUANTUM COMPUTER (Level 100)
    → Cost: Rp 10,000,000,000
    → Processing: ∞, Bot Slots: Unlimited, Idle Rate: 200x
```

## 7.2 Office/Location Upgrades
| Level | Lokasi | Bonus |
|-------|--------|-------|
| 1 | Kamar Kos | - |
| 10 | Trading Office | +20% Research Speed |
| 25 | Data Center | +50% Data Market |
| 50 | AI Laboratory | +100% AI Token |
| 100 | Quantum Corp | +500% semua |

## 7.3 API Connection Upgrades
Mengacu langsung ke API asli yang digunakan bot:
| API | Unlock Level | Bonus |
|-----|-------------|-------|
| Indodax Basic | 1 | Base trading |
| Grok AI | 15 | +40% Prediction |
| Claude AI | 20 | +60% Decision |
| NewsAPI | 30 | +30% Sentiment |
| LunarCrush | 35 | +25% Social Signal |
| CoinGecko | 25 | +20% Trend Data |
| Telegram Bot | 10 | Notifications |
| HuggingFace | 40 | Cloud Save |

---

# BAGIAN 8 — RESEARCH TREE

## 8.1 Market Analysis Branch
```
RSI ANALYZER (Level 1)
    Cost: 50 RP | Bonus: Detect Overbought/Oversold +10%
    ↓
MACD ENGINE (Level 5)
    Cost: 150 RP | Bonus: Trend Detection +15%
    ↓
BOLLINGER BAND (Level 10)
    Cost: 300 RP | Bonus: Volatility Measure +20%
    ↓
EMA CROSS (Level 15)
    Cost: 600 RP | Bonus: Trend Confirmation +25%
    ↓
VOLUME ANALYZER (Level 20)
    Cost: 1000 RP | Bonus: Volume Confirmation +30%
    ↓
COILED SPRING DETECTOR (Level 25) ← DARI MASTER_BOT ASLI
    Cost: 2000 RP | Bonus: Sleeping Coin +100%
    Formula: log(vol)*0.3 + (18-range)/18*0.4 + sideways*0.1
```

## 8.2 Execution System Branch
```
WEBSOCKET ENGINE (Level 8)
    Cost: 200 RP | Bonus: Real-time Data +20%
    ↓
ORDER ROUTER (Level 15)
    Cost: 500 RP | Bonus: Execution Speed +30%
    ↓
SMART EXECUTION (Level 25)
    Cost: 1200 RP | Bonus: Slippage Control +40%
    ↓
HMAC API SIGNER (Level 30) ← DARI private() FUNCTION ASLI
    Cost: 2000 RP | Bonus: API Security +50%
    ↓
HIGH SPEED TRADING (Level 40)
    Cost: 5000 RP | Bonus: Trade Speed +100%
```

## 8.3 Risk Management Branch
```
STOP LOSS (Level 3)
    Cost: 100 RP | Bonus: Capital Protection +20%
    ↓
TAKE PROFIT (Level 5)
    Cost: 150 RP | Bonus: Profit Lock +25%
    ↓
TRAILING SL (Level 20) ← DARI MASTER_BOT ASLI
    Cost: 800 RP | Bonus: Dynamic SL +/−5%/+8%/+15%/+25%
    ↓
POSITION SIZING (Level 35)
    Cost: 3000 RP | Bonus: Kelly Criterion sizing
    ↓
AMMO MANAGEMENT (Level 50) ← DARI WAR_MACHINE ASLI
    Cost: 8000 RP | Active 60%/Reserve 30%/Sacred 10%
    ↓
HEDGING (Level 70)
    Cost: 20000 RP | Bonus: Correlated risk reduction
```

## 8.4 Artificial Intelligence Branch
```
NEURAL NETWORK (Level 30)
    Cost: 5000 RP | Bonus: Pattern Recognition +50%
    ↓
MACHINE LEARNING (Level 40)
    Cost: 10000 RP | Bonus: Adaptive Strategy +75%
    ↓
GROK AI INTEGRATION (Level 45) ← DARI MASTER_BOT ASLI
    Cost: 15000 RP | Bonus: call_grok() +100% accuracy
    ↓
CLAUDE AI INTEGRATION (Level 50) ← DARI CLAUDE_BRAIN ASLI
    Cost: 20000 RP | Bonus: Multi-turn decision +150%
    ↓
DEEP LEARNING (Level 60)
    Cost: 30000 RP | Bonus: Complex pattern +200%
    ↓
QUANTUM AI (Level 100)
    Cost: 100000 RP | Bonus: Profit Multiplier +500%
```

## 8.5 Data Infrastructure Branch (BARU)
```
TELEGRAM NOTIF (Level 10) ← DARI telegram() ASLI
    Cost: 300 RP | Bonus: Event notification
    ↓
HUGGINGFACE SYNC (Level 40) ← DARI upload_to_huggingface() ASLI
    Cost: 6000 RP | Bonus: Cloud persistent state
    ↓
MULTI-SOURCE DATA (Level 50) ← DARI SENSOR.py ASLI
    Cost: 12000 RP | NewsAPI + LunarCrush + CoinGecko
    ↓
MARKET REGIME DETECTOR (Level 60) ← DARI WAR_MACHINE ASLI
    Cost: 25000 RP | Trending/Ranging/Chaos/Accumulation
```

---

# BAGIAN 9 — ECONOMY DESIGN

## 9.1 Capital Flow
```
INCOME:
+ Bot Trading Profit (base: 1,000/menit × Bot Level × Card Bonus)
+ Offline Reward (capped 24 jam)
+ Event Bonus (Bull Run: 2x, AI Revolution: Research 3x)
+ Daily Reward
+ Ad Reward (2x untuk 30 menit)

EXPENSE:
− Card Pack Purchase
− Infrastructure Upgrade
− Research Unlock
− Crafting Fee
```

## 9.2 Produksi Idle per Level
| Level | Capital/jam | Data Market/jam | Research/jam |
|-------|------------|----------------|-------------|
| 1 | 10,000 | 20 | 5 |
| 10 | 150,000 | 300 | 80 |
| 25 | 5,000,000 | 5,000 | 800 |
| 50 | 200,000,000 | 100,000 | 15,000 |
| 100 | 50,000,000,000 | 5,000,000 | 500,000 |

## 9.3 Soft Currency vs Hard Currency
| Jenis | Nama | Cara Dapat | IAP |
|-------|------|-----------|-----|
| Soft | Capital (IDR) | Idle, bot, trade | Tidak |
| Soft | Research Point | Lab, idle | Tidak |
| Soft | Data Market | Scanner | Tidak |
| Hard | AI Token | Daily, achievement | YA |
| Hard | Premium Pack | - | YA |

## 9.4 Inflation Control
- **Prestige System:** Level 100 → Reset ke Level 1, dapat Prestige Multiplier permanent
- **Sink Mekanik:** Legendary crafting mahal, boss counter butuh resource besar
- **Daily Cap:** Offline reward capped 24 jam mencegah AFKer permanen

---

# BAGIAN 10 — BALANCING FORMULA

## 10.1 Formula Produksi Bot
```
Capital_per_minute = Base_Rate × Level_Mult × Card_Bonus × Infra_Mult × Event_Mult

Base_Rate = 1000 IDR
Level_Mult = 1 + (Level × 0.15)
Card_Bonus = Product of all equipped card bonuses
Infra_Mult = [1.0, 2.0, 5.0, 15.0, 50.0, 200.0] (sesuai infrastruktur)
Event_Mult = [1.0 normal, 2.0 Bull Run, 0.1 Flash Crash]
```

## 10.2 Formula XP & Level Up
```
XP_required(level) = 100 × level^1.8

Level 1→2: 100 XP
Level 10→11: 12,589 XP
Level 50→51: 831,764 XP
Level 99→100: 9,479,682 XP
```

## 10.3 Formula Crafting Success Rate
```
Base_Success = 80%
+ Research Bonus (max +15%)
+ Card Level Bonus (+1% per level kartu bahan)
- Rarity Penalty (Mythic craft: -30%)

Min Success = 30%
Max Success = 99%
```

## 10.4 Formula Boss Damage
```
Player_DPS = Sum(equipped_cards_attack) × Bot_Level × Infra_Mult
Boss_HP:
    Whale King: 100,000
    Market Manipulator: 500,000
    Flash Crash Titan: 1,000,000

Time_to_Kill = Boss_HP / Player_DPS (dalam detik game-time)
Target TTK: 180–600 detik per boss
```

## 10.5 Formula Drop Rate (Pity System)
```
Base_Drop_Rates: Common 60%, Uncommon 25%, Rare 10%, Epic 4%, Legendary 0.9%, Mythic 0.1%

PITY: 
- Setelah 50 pack tanpa Epic+: +2% Epic per pack berikutnya
- Setelah 100 pack tanpa Legendary+: +1% Legendary per pack
- Setelah 300 pack tanpa Mythic: Mythic guaranteed pada pack ke-300

Pity reset setelah mendapat rarity tersebut.
```

## 10.6 Formula Offline Reward
```
Offline_Hours = min(hours_offline, 24)
Offline_Rate = 0.60  // 60% dari rate online

Offline_Capital = Capital_per_minute × 60 × Offline_Hours × Offline_Rate

Comeback_Bonus:
    > 12 jam: × 1.5
    > 20 jam: × 2.0
```

---

# BAGIAN 11 — ACHIEVEMENT SYSTEM

## 11.1 Kategori Achievement
### First Steps
| ID | Nama | Kondisi | Reward |
|----|------|---------|--------|
| ACH_001 | Script Pertama | Kumpulkan 1 kartu | 500 Capital |
| ACH_002 | Saldo Pertama | Raih Rp 100,000 | Starter Pack |
| ACH_003 | Bot Hidup! | Aktifkan bot pertama | 10 AI Token |
| ACH_004 | Peneliti Muda | Unlock node pertama | 1000 Capital |

### Trading Milestones
| ID | Nama | Kondisi | Reward |
|----|------|---------|--------|
| ACH_010 | Rp 1 Juta Club | Total Capital 1M | Rare Pack |
| ACH_011 | Rp 100 Juta Club | Total Capital 100M | Epic Pack |
| ACH_012 | Billionaire | Total Capital 1B | Legendary Pack |
| ACH_013 | Bull Run Survivor | Survive Flash Crash | Special Card |

### Script Collector
| ID | Nama | Kondisi | Reward |
|----|------|---------|--------|
| ACH_020 | Script Nerd | Kumpulkan 10 kartu | 20 AI Token |
| ACH_021 | Programmer Sejati | Kumpulkan semua Common | Uncommon Pack |
| ACH_022 | Bot Hunter | Kumpulkan semua Rare | Rare Pack x3 |
| ACH_023 | AI Master | Kumpulkan CLAUDE BRAIN | 50 AI Token |
| ACH_024 | War Ready | Kumpulkan WAR MACHINE | Mythic Frame |
| ACH_025 | Benyamin Collection | Kumpulkan semua kartu | Exclusive Mythic |

### Bot Master
| ID | Nama | Kondisi | Reward |
|----|------|---------|--------|
| ACH_030 | 08:00 Warrior | Aktif jam 08:00 WIB | Peak Hour +10% |
| ACH_031 | Coiled Spring | Deteksi 10 sleeping coin | MASTER_BOT hint |
| ACH_032 | Whale Slayer | Kalahkan Whale King | Legendary Card |
| ACH_033 | Crash Survivor | Profit saat Flash Crash | Epic Card |
| ACH_034 | Quantum Ready | Capai Level 100 | Quantum Frame |

---

# BAGIAN 12 — DAILY REWARD SYSTEM

## 12.1 Login Streak
| Hari | Reward | Bonus |
|------|--------|-------|
| 1 | 5,000 Capital | - |
| 2 | 10,000 Capital + 50 DM | - |
| 3 | Common Pack | - |
| 4 | 50,000 Capital | - |
| 5 | Uncommon Pack | - |
| 6 | 5 AI Token | - |
| 7 | Rare Pack + 100,000 Capital | **Streak Bonus ×2** |
| 14 | Epic Pack | **2-week trophy** |
| 30 | Legendary Pack + 50 AI Token | **Monthly Champion** |
| 100 | Mythic Archive Pack | **Dedicated Trader** |

## 12.2 Daily Missions
Setiap hari 3 misi acak:
- "Buka 3 Card Pack" → 20 AI Token
- "Craft 2 kartu" → 50,000 Capital
- "Unlock 1 research node" → Rare Pack
- "Aktif selama 10 menit" → 1000 Research Point
- "Kalahkan 1 Boss" → Epic Pack
- "Raih profit 500,000 dari idle" → 10 AI Token

## 12.3 Peak Hour Bonus
Terinspirasi dari `PEAK_HOURS = [8, 20]` di MASTER_BOT:
- **08:00–08:30 WIB:** Login → +100% Capital untuk 30 menit
- **20:00–20:30 WIB:** Login → +100% Research Point untuk 30 menit
- Notifikasi push dikirim 5 menit sebelum peak hour

---

# BAGIAN 13 — MONETIZATION SYSTEM

## 13.1 Free to Play Path
Pemain F2P dapat mencapai Level 100 tanpa bayar, hanya lebih lambat.
- Semua content dapat diakses
- Progress lebih lambat ~3x dibanding premium
- Rewarded ads untuk boost sementara

## 13.2 Rewarded Ads (Non-Intrusive)
| Aksi | Durasi Iklan | Reward |
|------|-------------|--------|
| Double Capital | 30 detik | 2x Capital selama 30 menit |
| Speed Research | 30 detik | 2x Research selama 30 menit |
| Extra Loot | 30 detik | +1 kartu gratis |
| Revive Boss Fight | 15 detik | Nyawa tambahan di boss |
| Offline Extend | 30 detik | +6 jam offline cap (dari 24→30) |

**Batas:** Maksimum 5 iklan per hari per kategori (tidak spam).

## 13.3 IAP Packages (IDR)
| Paket | Harga IDR | Isi | Value |
|-------|-----------|-----|-------|
| Starter Bundle | Rp 15,000 | 10 AI Token + 3 Rare Pack | ★★★ |
| No Ads | Rp 25,000 | Permanent no ads | ★★★★ |
| Research Boost | Rp 35,000 | 2x Research permanent | ★★★★ |
| AI Lab Pass | Rp 75,000 | 50 AI Token + Exclusive Epic card | ★★★★★ |
| Quantum Bundle | Rp 150,000 | 200 AI Token + Exclusive Legendary | ★★★★★ |
| Monthly Pass | Rp 49,000/bulan | Daily 5 AI Token + 2x XP | ★★★★★ |
| Benyamin Pack | Rp 99,000 | Copy BENYAMIN_MASTER_BOT skin + bonus | ★★★★★ |

## 13.4 Battle Pass (Seasonal)
- Durasi: 30 hari
- Harga: Rp 49,000
- 50 Level reward
- Exclusive Legendary card + cosmetic di akhir season

---

# BAGIAN 14 — UNITY PROJECT STRUCTURE

```
Assets/
├── _Game/
│   ├── Scripts/
│   │   ├── Core/
│   │   │   ├── GameManager.cs
│   │   │   ├── SaveManager.cs
│   │   │   ├── EventSystem.cs
│   │   │   └── TimeManager.cs
│   │   ├── Economy/
│   │   │   ├── ResourceManager.cs
│   │   │   ├── CapitalCalculator.cs
│   │   │   ├── IdleEngine.cs
│   │   │   └── OfflineRewardCalc.cs
│   │   ├── Cards/
│   │   │   ├── CardData.cs          (ScriptableObject)
│   │   │   ├── CardCollection.cs
│   │   │   ├── CardPack.cs
│   │   │   ├── CardCrafter.cs
│   │   │   └── CardVisual.cs
│   │   ├── Research/
│   │   │   ├── ResearchTree.cs
│   │   │   ├── ResearchNode.cs
│   │   │   └── TechUnlocker.cs
│   │   ├── Bot/
│   │   │   ├── BotManager.cs
│   │   │   ├── TradingBot.cs
│   │   │   ├── MarketSimulator.cs
│   │   │   └── PositionMonitor.cs
│   │   ├── Events/
│   │   │   ├── EventManager.cs
│   │   │   ├── FlashCrash.cs
│   │   │   ├── BullRun.cs
│   │   │   ├── WhaleAttack.cs
│   │   │   └── BossBattle.cs
│   │   ├── UI/
│   │   │   ├── MainDashboard.cs
│   │   │   ├── CardCollectionUI.cs
│   │   │   ├── ResearchTreeUI.cs
│   │   │   ├── CraftingUI.cs
│   │   │   ├── PackOpeningUI.cs
│   │   │   ├── BossUI.cs
│   │   │   └── ToastNotification.cs
│   │   ├── Monetization/
│   │   │   ├── AdManager.cs         (UnityAds / AdMob)
│   │   │   ├── IAPManager.cs
│   │   │   └── RewardedAd.cs
│   │   └── Data/
│   │       ├── PlayerData.cs
│   │       ├── CardDatabase.cs      (ScriptableObject)
│   │       └── LocalSave.cs
│   │
│   ├── ScriptableObjects/
│   │   ├── Cards/
│   │   │   ├── SO_CommonCards.asset
│   │   │   ├── SO_RareCards.asset
│   │   │   ├── SO_EpicCards.asset
│   │   │   ├── SO_LegendaryCards.asset
│   │   │   └── SO_MythicCards.asset
│   │   ├── Research/
│   │   │   └── SO_ResearchTree.asset
│   │   └── Events/
│   │       └── SO_Events.asset
│   │
│   ├── Prefabs/
│   │   ├── UI/
│   │   │   ├── CardFrame_Common.prefab
│   │   │   ├── CardFrame_Rare.prefab
│   │   │   ├── CardFrame_Epic.prefab
│   │   │   ├── CardFrame_Legendary.prefab
│   │   │   ├── CardFrame_Mythic.prefab
│   │   │   └── ResourceBar.prefab
│   │   ├── Effects/
│   │   │   ├── ProfitEffect.prefab
│   │   │   ├── CardUnlock.prefab
│   │   │   └── BossExplosion.prefab
│   │   └── Screens/
│   │       └── [screen prefabs]
│   │
│   ├── Sprites/
│   │   ├── Cards/           (card artwork per kartu)
│   │   ├── UI/              (buttons, panels, icons)
│   │   ├── Backgrounds/     (cyberpunk scenes)
│   │   └── Icons/           (resource icons)
│   │
│   ├── Audio/
│   │   ├── BGM/
│   │   └── SFX/
│   │
│   └── Scenes/
│       ├── Boot.unity
│       ├── Main.unity
│       └── CardOpen.unity
│
└── Plugins/
    ├── UnityAds/
    ├── UnityIAP/
    └── SQLite/              (untuk local database)
```

---

# BAGIAN 15 — C# CLASS DIAGRAM

## 15.1 Core Classes

```csharp
// ===== DATA MODELS =====

[CreateAssetMenu]
public class CardData : ScriptableObject {
    public string cardId;
    public string displayName;
    public string realFilename;      // "WAR_MACHINE.py"
    public string description;
    public Rarity rarity;
    public CardCategory category;
    public float stat1Value;
    public string stat1Name;
    public float stat2Value;
    public string stat2Name;
    public string passiveEffect;
    public string[] craftRecipe;
    public int unlockLevel;
    public int linesOfCode;          // Real LOC
    public string[] realFunctions;   // ["private()", "get_summaries()"]
    public Sprite cardArtwork;
}

public enum Rarity { Common, Uncommon, Rare, Epic, Legendary, Mythic }
public enum CardCategory { Monitor, Analysis, Execution, AI, Risk, Infrastructure }

// ===== RESOURCE MANAGER =====

public class ResourceManager : MonoBehaviour {
    public static ResourceManager Instance;
    
    public double Capital { get; private set; }
    public long DataMarket { get; private set; }
    public long ProcessingPower { get; private set; }
    public long ResearchPoints { get; private set; }
    public long AITokens { get; private set; }
    
    public void AddCapital(double amount) {...}
    public void SpendCapital(double amount) {...}
    public void AddResearch(long amount) {...}
    public bool CanAfford(double capital) {...}
}

// ===== IDLE ENGINE =====

public class IdleEngine : MonoBehaviour {
    private ResourceManager res;
    private BotManager botMgr;
    
    private double capitalPerSecond;
    private long dataPerSecond;
    private long researchPerSecond;
    
    public void CalculateRates() {
        // Based on: cards equipped + infra level + research bonuses
        capitalPerSecond = BotManager.TotalBots * CardBonus * InfraMultiplier;
    }
    
    public OfflineReward CalculateOfflineReward(TimeSpan offlineTime) {
        double hours = Math.Min(offlineTime.TotalHours, 24.0);
        double rate = capitalPerSecond * 0.6; // 60% offline rate
        float comeback = hours > 12 ? 1.5f : 1.0f;
        return new OfflineReward { 
            capital = rate * 3600 * hours * comeback,
            ...
        };
    }
    
    void Update() {
        // Called every second
        res.AddCapital(capitalPerSecond * Time.deltaTime);
        res.AddResearch((long)(researchPerSecond * Time.deltaTime));
    }
}

// ===== TRADING BOT =====

public class TradingBot {
    public string BotName;
    public int Level;
    public List<CardData> EquippedCards;
    public BotStatus Status;           // Active, Monitoring, Idle
    public string CurrentCoin;         // "VEX", "ONDO"
    public float CurrentPnlPct;
    public float TakeProfitPct;
    public float StopLossPct;
    
    public double GetCapitalPerSecond() { ... }
    public void SimulateTrade(MarketSnapshot market) { ... }
    public void CheckStopLoss() { ... }
    public void AdjustTrailingStop(float pnl) {
        // Mirrors real trailing SL from BENYAMIN_MASTER_BOT:
        // +5% → SL ke breakeven
        // +8% → SL ke +3%
        // +15% → SL ke +10%
        // +25% → SL ke +18%
    }
}

// ===== MARKET SIMULATOR =====

public class MarketSimulator : MonoBehaviour {
    // Simulates price movements for idle bot to "trade against"
    public float GetCoinPrice(string coin) { ... }
    public MarketRegime GetCurrentRegime() { ... } // Trending/Ranging/Chaos/Accumulation
    public bool IsPeakHour() {
        // Mirrors PEAK_HOURS = [8, 20] from MASTER_BOT
        int hour = DateTime.Now.Hour + 7; // WIB
        return (hour % 24 == 8) || (hour % 24 == 20);
    }
}

// ===== CARD COLLECTION =====

public class CardCollection : MonoBehaviour {
    public Dictionary<string, PlayerCard> OwnedCards;
    
    public void AddCard(string cardId) { ... }
    public bool TryCraft(string[] recipeIds, out CardData result) {
        float successRate = CalculateSuccessRate(recipeIds);
        if (Random.value <= successRate) {
            result = GetCraftResult(recipeIds);
            return true;
        }
        return false;
    }
    
    public CardData OpenPack(PackType packType) { ... }
    
    private float CalculateSuccessRate(string[] ids) {
        // Formula dari Bagian 10.3
        float base = 0.80f;
        base += ResearchBonus;
        base += CardLevelBonus(ids);
        base -= RarityPenalty(ids);
        return Mathf.Clamp(base, 0.30f, 0.99f);
    }
}

// ===== RESEARCH TREE =====

public class ResearchTree : MonoBehaviour {
    public Dictionary<string, ResearchNode> Nodes;
    
    public bool CanUnlock(string nodeId) {
        ResearchNode node = Nodes[nodeId];
        return PlayerLevel >= node.RequiredLevel 
            && ResourceManager.Instance.ResearchPoints >= node.Cost
            && ArePrerequisitesMet(node);
    }
    
    public void Unlock(string nodeId) {
        Nodes[nodeId].IsUnlocked = true;
        ResourceManager.Instance.SpendResearch(Nodes[nodeId].Cost);
        ApplyBonus(Nodes[nodeId]);
    }
}

// ===== BOSS BATTLE =====

public class BossBattle : MonoBehaviour {
    public BossData CurrentBoss;   // WhaleKing, MarketManipulator, FlashCrashTitan
    public float CurrentHP;
    
    public void StartBattle(BossData boss) { ... }
    public void AttackBoss() {
        float dps = BotManager.TotalDPS;
        CurrentHP -= dps * Time.deltaTime;
        if (CurrentHP <= 0) OnBossDefeated();
    }
    
    private void OnBossDefeated() {
        // Drop Legendary/Mythic card
        CardCollection.Instance.AddCard(boss.GuaranteedDrop);
    }
}

// ===== EVENT MANAGER =====

public class EventManager : MonoBehaviour {
    public void TriggerFlashCrash() {
        // Capital production ×0.1 for 5 minutes game-time
        // But player with EMERGENCY_CLOSE card → immune
    }
    public void TriggerBullRun() {
        // Capital production ×2 for 10 minutes
    }
    public void TriggerWhaleAttack() {
        // Random bot takes 50% damage if no Risk Manager card
    }
}

// ===== SAVE MANAGER =====

public class SaveManager : MonoBehaviour {
    // Uses SQLite for Android
    public void SaveAll() { ... }
    public void LoadAll() { ... }
    public void ExportSave() { ... }   // Backup ke file
    
    private void OnApplicationPause(bool pausing) {
        if (pausing) {
            SaveAll();
            TimeManager.RecordOfflineStart(DateTime.UtcNow);
        }
    }
}
```

---

# BAGIAN 16 — ASSET LIST

## 16.1 Artwork Cards (44 kartu unik)
Setiap kartu butuh: Portrait 512×768px, cyberpunk/neon style
- 6 Mythic cards (full illustration)
- 8 Legendary cards (detailed illustration)
- 12 Epic cards (detailed sprite)
- 14 Rare cards (medium sprite)
- Semua Common/Uncommon: template-based

## 16.2 UI Assets
- Logo "Benyamin Batau Crypto Game" — neon typography
- Main dashboard background (cyberpunk trading floor)
- Card frame per rarity (6 frame designs)
- Resource icons (Capital/IDR, Data Market, Processing, Research, AI Token)
- Button styles (neon glow, dark glass)
- Notification badges
- Progress bars (neon fill)

## 16.3 Background Scenes
| Scene | Style |
|-------|-------|
| Kamar Kos (Level 1) | Dim room, laptop glow |
| Trading Office (Level 10) | Multi-monitor setup, neon |
| Data Center (Level 25) | Server racks, blue glow |
| AI Laboratory (Level 50) | Holographic displays |
| Quantum Corp (Level 100) | Sci-fi quantum chamber |

## 16.4 Effects / Particles
- Card pack opening burst (rarity-specific color)
- Capital fly-up animation
- Bot active pulse
- Craft success sparkle
- Boss damage flash
- Flash Crash screen shake
- Bull Run golden particles
- Peak Hour clock glow

## 16.5 Character / Mascot
- **Benyamin Bot:** Robot mascot dengan wajah manusia, wearing hoodie programmer, holding laptop
- Expressions: Idle, Happy (profit), Worried (loss), Excited (card pull), Sleeping (offline)

---

# BAGIAN 17 — SOUND EFFECT LIST

## 17.1 UI Sounds
| ID | Nama | Deskripsi |
|----|------|-----------|
| SFX_BTN_TAP | Button Tap | Click ringan metalik |
| SFX_BTN_BACK | Back Button | Soft swoosh |
| SFX_SCREEN_OPEN | Screen Transition | Neon swoosh in |
| SFX_TOAST | Notification Toast | Soft ping |
| SFX_UPGRADE | Upgrade Complete | Power-up ascending |
| SFX_LEVEL_UP | Level Up | Epic fanfare 3 detik |

## 17.2 Card Sounds
| ID | Nama | Deskripsi |
|----|------|-----------|
| SFX_CARD_FLIP | Card Flip | Satisfying flip sound |
| SFX_PACK_OPEN | Pack Opening | Rip + whoosh |
| SFX_COMMON | Common Drop | Soft chime |
| SFX_RARE | Rare Drop | Crystal ding |
| SFX_EPIC | Epic Drop | Electric spark |
| SFX_LEGENDARY | Legendary Drop | Golden trumpet |
| SFX_MYTHIC | Mythic Drop | Epic orchestral hit |
| SFX_CRAFT_SUCCESS | Craft Success | Forging + sparkle |
| SFX_CRAFT_FAIL | Craft Fail | Dull thud |

## 17.3 Trading / Bot Sounds
| ID | Nama | Deskripsi |
|----|------|-----------|
| SFX_PROFIT_TICK | Capital Tick | Coin drop per tick |
| SFX_BOT_ACTIVE | Bot Running | Low hum loop |
| SFX_TRADE_BUY | Buy Order | Cash register |
| SFX_TRADE_SELL | Sell Order | Coins cascade |
| SFX_TP_HIT | Take Profit | Victory bell |
| SFX_SL_HIT | Stop Loss | Sad trombone short |
| SFX_PEAK_HOUR | Peak Hour Start | Alarm + energy up |
| SFX_OFFLINE_RETURN | Return Reward | Multiple coins |

## 17.4 Event / Boss Sounds
| ID | Nama | Deskripsi |
|----|------|-----------|
| SFX_FLASH_CRASH | Flash Crash | Crash + glass break |
| SFX_BULL_RUN | Bull Run | Energetic burst |
| SFX_WHALE_ATTACK | Whale Attack | Deep ocean rumble |
| SFX_BOSS_SPAWN | Boss Spawn | Dramatic entrance |
| SFX_BOSS_HIT | Boss Damage | Impact + digital glitch |
| SFX_BOSS_DEAD | Boss Defeated | Victory fanfare |

## 17.5 Background Music (BGM)
| Track | Scene | Style | BPM |
|-------|-------|-------|-----|
| BGM_MAIN | Main Dashboard | Cyberpunk lofi | 85 |
| BGM_CARD | Card Collection | Synthwave chill | 100 |
| BGM_RESEARCH | Research Tree | Ambient electronic | 70 |
| BGM_BOSS | Boss Battle | Intense EDM | 140 |
| BGM_PEAK | Peak Hour | High energy | 128 |
| BGM_VICTORY | Level Up/Achievement | Triumphant | 120 |

---

# BAGIAN 18 — ROADMAP DEVELOPMENT 6 BULAN

## Bulan 1: Foundation (Minggu 1–4)
**Target:** Prototype dapat dimainkan

### Minggu 1–2: Setup & Core
- [ ] Unity 6 project setup (Android build)
- [ ] Database SQLite integration
- [ ] ResourceManager + IdleEngine dasar
- [ ] SaveManager (load/save)
- [ ] Core game loop (capital tick tiap detik)

### Minggu 3–4: Cards & UI Dasar
- [ ] CardData ScriptableObject (semua 44 kartu input)
- [ ] Card collection screen
- [ ] Pack opening system + animasi
- [ ] Main dashboard UI (saldo, bot status)
- [ ] 3 kartu pertama playable (Common tier)

**Milestone:** Dapat kumpulkan kartu + lihat capital naik

---

## Bulan 2: Gameplay Core (Minggu 5–8)
**Target:** Loop utama berjalan penuh

### Minggu 5–6: Research + Upgrade
- [ ] Research Tree UI + logic (4 branch)
- [ ] Infrastructure upgrade system (6 tier)
- [ ] Level system + XP formula
- [ ] API connection upgrades

### Minggu 7–8: Bot Simulation
- [ ] TradingBot class dengan market simulator
- [ ] Idle production calculation
- [ ] Offline reward system
- [ ] Peak Hour mechanic (08:00 & 20:00 WIB)
- [ ] Trailing Stop Loss simulation

**Milestone:** Idle loop lengkap, research & upgrade berjalan

---

## Bulan 3: Content & Events (Minggu 9–12)
**Target:** Content penuh + events

### Minggu 9–10: Crafting + Events
- [ ] Crafting system + resep (20 resep)
- [ ] Flash Crash event
- [ ] Bull Run event
- [ ] Whale Attack event

### Minggu 11–12: Boss Battle + Achievement
- [ ] Boss Battle system (3 boss)
- [ ] Achievement system (40 achievement)
- [ ] Daily reward system
- [ ] Daily missions

**Milestone:** Game terasa lengkap, bisa dimainkan 30 menit+

---

## Bulan 4: Polish & Monetization (Minggu 13–16)
**Target:** Produksi kualitas

### Minggu 13–14: Visual Polish
- [ ] Artwork semua 44 kartu (gunakan AI art tool)
- [ ] Background scenes (5 lokasi)
- [ ] Particle effects (profit, card pull)
- [ ] Benyamin Bot mascot animasi

### Minggu 15–16: Monetization
- [ ] Unity Ads (Rewarded + Interstitial)
- [ ] Unity IAP setup (semua package)
- [ ] Daily reward UI
- [ ] No-ads functionality

**Milestone:** Game bisa dimonetisasi, visual menarik

---

## Bulan 5: Beta & Balancing (Minggu 17–20)
**Target:** Balanced + siap rilis

### Minggu 17–18: Internal Testing
- [ ] Economy balancing (formula tweaking)
- [ ] Pity system cards
- [ ] Performance optimization (60fps di mid-range)
- [ ] Battery optimization (idle background)

### Minggu 19–20: Beta Testing
- [ ] Closed beta (10–20 tester)
- [ ] Bug fixing
- [ ] Balancing berdasarkan feedback
- [ ] Google Play Console setup
- [ ] Privacy Policy + Terms of Service

**Milestone:** Game siap untuk soft launch

---

## Bulan 6: Launch & Growth (Minggu 21–24)
**Target:** Rilis di Play Store

### Minggu 21–22: Launch Prep
- [ ] Store listing (screenshots, video trailer, description)
- [ ] ASO optimization (keywords, icon A/B test)
- [ ] Final QA testing (semua device tier)
- [ ] Crash monitoring setup (Firebase Crashlytics)
- [ ] Analytics (Firebase Analytics)

### Minggu 23–24: LAUNCH + Post-Launch
- [ ] **SOFT LAUNCH** (negara terbatas)
- [ ] Monitor retention metrics
- [ ] Hot fix jika ada critical bug
- [ ] **FULL LAUNCH** Global
- [ ] Push notification setup
- [ ] First update plan (Season 2 content)

---

# BAGIAN 19 — STRATEGI AGAR VIRAL DI PLAY STORE

## 19.1 Keunikan Mutlak (USP)
**"Game Idle yang dibuat dari bot trading nyata seorang guru SMK Indonesia"**

Ini bukan marketing tipuan. Script `WAR_MACHINE.py`, `BENYAMIN_MASTER_BOT.py`, `CLAUDE_BRAIN.py` adalah file nyata yang bisa diverifikasi. Ini menciptakan:
1. **Curiosity Factor** — "Script Python jadi game?"
2. **Authenticity** — Kisah nyata lebih menarik dari fiksi
3. **Educational Value** — Pemain belajar konsep trading sambil main

## 19.2 Store Listing Optimization (ASO)
**App Icon:** Robot cyberpunk pegang laptop + neon green trading chart
**Title:** "Benyamin Batau: Crypto Bot Tycoon"
**Short Description:**
> "Bangun empire trading AI dari kode nyata! Idle tycoon game dengan 44 kartu script Python asli."

**Tags/Keywords:**
- idle tycoon, crypto game, trading simulator, card collection
- ai game, bot game, programming game, indonesia game

**Screenshots (8 buah):**
1. Main Dashboard dengan bot aktif
2. Pack opening - Mythic card pull
3. Research tree - cyberpunk style
4. Boss Battle - Whale King
5. Crafting screen
6. Full card collection
7. Infrastructure: Quantum Corp
8. Achievement screen

## 19.3 Pre-Launch Community Building
- **TikTok Series:** "Dari Script Python Jadi Game" — behind-the-scenes
- **Twitter/X:** Post real bot log vs game card comparison
- **Reddit r/IdleGames:** "I turned my real trading bot into a game"
- **GitHub:** Open source beberapa bagian game untuk credibility
- **YouTube:** Dev log series (cerita Benyamin Batau jadi viral)

## 19.4 Launch Strategy
**Soft Launch:** Indonesia, Malaysia, Philippines (komunitas serupa)
**Full Launch:** SEA + Global

**Press/Media Angle:**
> "Indonesian school teacher codes trading bot, turns it into mobile game"

Ini adalah human interest story yang menarik untuk:
- Tech news Indonesia (Kumparan, IDNTimes, Tirto)
- Mobile gaming sites (Pocket Gamer, TouchArcade)
- Crypto gaming communities

## 19.5 Retention Mechanics
- **Push Notif Peak Hour:** "🔔 08:00 WIB! Bot aktif! Klaim bonus 2x sekarang!"
- **FOMO Events:** Flash Crash/Bull Run hanya 2 jam, notif advance
- **Social Proof:** "5 ribu trader sudah join!" counter di lobby
- **Comeback Hook:** "Bot kamu profit Rp 2.4 juta saat kamu tidur!" notifikasi pagi

## 19.6 Review Strategy
- Dalam-game prompt muncul setelah "momen senang" (Mythic card pull, boss kill)
- Tidak muncul di awal, tidak spam
- Respond semua 1-star review dalam 24 jam (Google meperhatikan ini)

---

# BAGIAN 20 — MVP UNTUK 1 DEVELOPER

## 20.1 Scope MVP (3 Bulan)
Fokus pada **core loop yang addictive** saja, potong semua non-essential.

### Yang MASUK ke MVP:
- [x] Idle capital production (bot jalan otomatis)
- [x] 20 kartu (5 Common, 5 Uncommon, 5 Rare, 3 Epic, 2 Legendary)
- [x] Pack opening (2 tipe: free daily + premium)
- [x] Research tree sederhana (2 branch, 5 node each)
- [x] 3 tier upgrade infrastructure
- [x] Offline reward
- [x] Peak Hour bonus (08:00 & 20:00)
- [x] 1 Boss Battle (Whale King)
- [x] Daily login reward (7 hari)
- [x] 10 Achievement dasar
- [x] 1 Rewarded ad type (double capital)
- [x] 1 IAP (No Ads + 10 AI Token)

### Yang DIPOTONG dari MVP:
- [ ] ~~Crafting system~~ (Season 2)
- [ ] ~~Flash Crash/Bull Run events~~ (Season 2)
- [ ] ~~Multiplayer/Leaderboard~~ (Season 3)
- [ ] ~~Guild system~~ (Season 3)
- [ ] ~~42+ kartu sisanya~~ (update bertahap)
- [ ] ~~Market Regime Detector~~ (unlock via research Season 2)

## 20.2 Tools untuk Solo Developer
| Kebutuhan | Tool Gratis/Murah |
|-----------|-----------------|
| Engine | Unity 6 Personal (gratis) |
| Card Art | Midjourney / DALL-E / Canva AI |
| Background | Stable Diffusion (free) |
| Sound FX | Freesound.org + Bfxr |
| BGM | OpenGameArt.org + Incompetech |
| Font | Google Fonts (Rajdhani, Orbitron) |
| Icon | Adobe Express (free tier) |
| Analytics | Firebase (free) |
| Ads | Unity Ads (free, revenue share) |
| IAP | Unity IAP (free) |
| Crash Report | Firebase Crashlytics (free) |

## 20.3 Jadwal Solo Developer (12 Minggu MVP)
| Minggu | Fokus | Output |
|--------|-------|--------|
| 1–2 | Unity setup + ResourceManager | Capital tick berjalan |
| 3–4 | Card system + ScriptableObjects | 20 kartu terdefinisi |
| 5–6 | Pack opening + UI | Bisa buka pack, lihat koleksi |
| 7–8 | Research + Upgrade | Progress naik |
| 9–10 | Offline reward + Peak Hour | Bot jalan saat tidur |
| 11 | Boss Battle + Daily Reward | Loop complete |
| 12 | Polish + Deploy | Play Store submit |

## 20.4 Estimasi Biaya MVP Solo
| Item | Biaya |
|------|-------|
| Unity Personal | Rp 0 |
| Google Play Developer Account | Rp 375,000 (1x) |
| Card Artwork (AI-generated, 20 kartu) | Rp 0–200,000 |
| Sound Assets | Rp 0 (free sources) |
| BGM (lisensi bebas) | Rp 0–150,000 |
| Test Device Android | Sudah punya |
| **Total** | **Rp 375,000 – 725,000** |

## 20.5 Success Metrics MVP
| Metric | Target Bulan 1 | Target Bulan 3 |
|--------|---------------|---------------|
| Install | 1,000 | 10,000 |
| DAU | 100 | 1,000 |
| D1 Retention | >35% | >40% |
| D7 Retention | >15% | >20% |
| Rating | >4.0 | >4.2 |
| Revenue | Rp 500,000 | Rp 5,000,000 |

---

# PENUTUP

Game "**Benyamin Batau Crypto Game**" memiliki sesuatu yang tidak dimiliki idle tycoon lain manapun:
**KEASLIAN.**

Setiap kartu yang pemain kumpulkan adalah representasi nyata dari kode yang pernah berjalan di server, menciptakan profit nyata, dan ditulis oleh tangan nyata seorang guru SMK dari Makassar yang belajar trading dan coding sendiri.

Itu bukan marketing. Itu adalah identitas.

`WAR_MACHINE.py` (123K baris) yang menjadi kartu Mythic — pemain tidak akan pernah tahu betapa rumitnya kode itu. Tapi mereka akan merasakannya saat kartu itu mengalahkan boss.

**Selamat membangun empire. Bot tetap jalan.**

---
*GDD ini dibuat berdasarkan analisis mendalam terhadap repository asli: trading/, INDODAX TRADE API/, hf_space/, gudang/, dan bot_logs/. Setiap referensi ke fungsi, file, dan konfigurasi adalah data nyata dari kode produksi.*
