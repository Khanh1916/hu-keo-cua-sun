document.addEventListener("DOMContentLoaded", () => {
  const SAVE_KEY = "hu_keo_cua_sun_save_v1";
  const DATA = window.GAME_DATA;

  const DEFAULT_STATE = {
    candy: 15,
    level: 1,
    xp: 0,
    bestScore: 0,
    bestCrossing: 0,
    bestFlappy: 0,
    bestNonla: 0,
    bestMemory: 0,
    ownedDecor: [],
    placedDecor: [],
    unlockedAchieve: [],
    readLetters: [],
    hugCount: 0,
    petCount: 0,
    foodsFed: [],
    jarReads: 0,
    claimedBirthdays: [],
    timeOverride: "auto",
    freeMealsDate: "",
    freeMealsLeft: 3,
    chineseDailyDoneDate: "",
    dailyInteractions: {
      date: "",
      hugCount: 0,
      petCount: 0
    },
    dailyQuests: {
      date: "",
      hugDone: false,
      feedDone: false,
      gameDone: false,
      claimed: false
    }
  };

  let state = loadState();
  let speechTimeout = null;
  let toastTimeout = null;
  let currentJarKey = null;
  const lastNoteIdx = {};

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return { ...DEFAULT_STATE };
      const parsed = JSON.parse(raw);
      const merged = { ...DEFAULT_STATE, ...parsed };
      if (!merged.dailyInteractions || typeof merged.dailyInteractions !== "object") {
        merged.dailyInteractions = { ...DEFAULT_STATE.dailyInteractions };
      }
      if (!merged.dailyQuests || typeof merged.dailyQuests !== "object") {
        merged.dailyQuests = { ...DEFAULT_STATE.dailyQuests };
      }
      return merged;
    } catch {
      return { ...DEFAULT_STATE };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }

  window.GameState = {
    get: () => state,
    save: saveState,
    renderHUD: () => renderHUD(),
    addXP: (amt) => addRewards(amt, 0)
  };

  function xpNeededForLevel(lvl) {
    // Polynomial cozy progression curve: 50 + 35*lvl + 12*lvl^1.55
    return Math.round(50 + lvl * 35 + Math.pow(lvl, 1.55) * 12);
  }

  function getDaysTogether() {
    const start = new Date(`${DATA.anniversary}T00:00:00`);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffMs = today.getTime() - start.getTime();
    return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1);
  }

  function pickRandom(arr, prevIdx = -1) {
    if (!arr || arr.length === 0) return { item: "", idx: -1 };
    if (arr.length === 1) return { item: arr[0], idx: 0 };
    let idx = Math.floor(Math.random() * arr.length);
    if (idx === prevIdx) {
      idx = (idx + 1) % arr.length;
    }
    return { item: arr[idx], idx };
  }

  // UI Helpers
  function showToast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      el.classList.add("hidden");
    }, 2800);
  }

  function showSpeech(speaker, text) {
    const bubble = document.getElementById("speechBubble");
    document.getElementById("speechSpeaker").textContent = speaker;
    document.getElementById("speechText").textContent = text;
    bubble.classList.remove("hidden");

    clearTimeout(speechTimeout);
    speechTimeout = setTimeout(() => {
      bubble.classList.add("hidden");
    }, 5200);
  }

  function openModal(id) {
    AudioManager.playClick();
    document.getElementById(id).classList.remove("hidden");
  }

  function closeModal(id) {
    if (id === "modalMiniGame") {
      stopAllGames();
    }
    document.getElementById(id).classList.add("hidden");
  }

  function addRewards(xpGain, candyGain) {
    state.candy += candyGain;
    state.xp += xpGain;

    let leveledUp = false;
    while (state.xp >= xpNeededForLevel(state.level)) {
      state.xp -= xpNeededForLevel(state.level);
      state.level++;
      state.candy += 10; // Level up bonus candy!
      leveledUp = true;
    }

    if (leveledUp) {
      AudioManager.playLevelUp();
      showToast(`🎉 Lên Cấp ${state.level} thân mật! Tặng em +10 🍬`);
    }

    checkAchievements();
    saveState();
    renderHUD();
  }

  function isLetterUnlocked(letter) {
    if (state.level < letter.unlockLevel) return false;
    if (letter.reqHugs && (state.hugCount || 0) < letter.reqHugs) return false;
    if (letter.reqDecor && (state.ownedDecor || []).length < letter.reqDecor && state.level < 22) return false;
    if (letter.reqJars && (state.jarReads || 0) < letter.reqJars) return false;
    return true;
  }

  function checkAchievements() {
    const checks = {
      first_hug: state.hugCount >= 1,
      pet_bong_5: state.petCount >= 5,
      foodie_5: state.foodsFed.length >= 5,
      mg_score_200: state.bestScore >= 200,
      jar_reader: state.jarReads >= 8,
      decor_4: state.ownedDecor.length >= 4,
      decor_all: state.ownedDecor.length >= DATA.decorItems.length,
      level_5: state.level >= 5,
      crossing_100: state.bestCrossing >= 100,
      flappy_50: state.bestFlappy >= 50,
      nonla_75: state.bestNonla >= 75
    };

    let newlyUnlocked = false;
    DATA.achievements.forEach((ach) => {
      if (checks[ach.id] && !state.unlockedAchieve.includes(ach.id)) {
        state.unlockedAchieve.push(ach.id);
        state.candy += ach.reward;
        newlyUnlocked = true;
        setTimeout(() => {
          showToast(`🏆 Thành tựu: ${ach.name} (+${ach.reward} 🍬)`);
        }, 450);
      }
    });

    if (newlyUnlocked) {
      saveState();
    }
  }

  function getActiveSpecialDay() {
    const now = new Date();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    if (m === 4 && d === 15) return "ngoc";
    if (m === 6 && d === 1) return "khanh";
    if (m === 2 && d === 11) return "anniversary";
    if (window.Amlich && window.Amlich.getTetInfo(now).isTet) return "tet";
    return null;
  }

  function syncMusicThemeForToday() {
    const key = getActiveSpecialDay();
    const ev = key && DATA.specialDays ? DATA.specialDays[key] : null;
    AudioManager.setTheme(ev ? ev.music : "normal");
  }

  function checkSpecialDayEvent() {
    const key = getActiveSpecialDay();
    if (!key || !DATA.specialDays || !DATA.specialDays[key]) return;
    const ev = DATA.specialDays[key];

    const now = new Date();
    let claimYear = now.getFullYear();
    if (key === "tet" && window.Amlich) {
      claimYear = window.Amlich.getTetInfo(now).lunarYear || claimYear;
    }
    const claimKey = `${key}_${claimYear}`;
    if (!state.claimedBirthdays.includes(claimKey)) {
      state.claimedBirthdays.push(claimKey);
      addRewards(key === "tet" ? 35 : (key === "anniversary" ? 30 : 25), ev.giftCandy);
      AudioManager.playPowerup();
      RoomScene.triggerKhanhHappy("happy");
      RoomScene.triggerBongHappy();
      const speechText = ev.speech.replace("{days}", String(getDaysTogether()));
      const title = key === "tet" ? "Anh Khánh 🧧" : (key === "anniversary" ? "Anh Khánh 💕" : "Anh Khánh 🎂");
      showSpeech(title, speechText);
      const giftLabel = key === "tet" ? "🧧 Lì xì Tết" : (key === "anniversary" ? "💕 Quà kỷ niệm" : "🎂 Quà sinh nhật");
      showToast(`${giftLabel}: +${ev.giftCandy} 🍬!`);
    }
  }

  function updateGreetingBanner() {
    const key = getActiveSpecialDay();
    if (key && DATA.specialDays && DATA.specialDays[key]) {
      document.getElementById("greetingBanner").textContent = DATA.specialDays[key].banner;
      return;
    }
    const h = new Date().getHours();
    let bucket = "evening";
    if (h >= 5 && h < 11) bucket = "morning";
    else if (h >= 11 && h < 14) bucket = "noon";
    else if (h >= 14 && h < 18) bucket = "afternoon";
    else if (h >= 22 || h < 5) bucket = "night";

    const list = DATA.timeGreetings[bucket];
    const { item } = pickRandom(list);
    document.getElementById("greetingBanner").textContent = item;
  }

  function renderHUD() {
    const days = getDaysTogether();
    document.getElementById("daysTogetherText").textContent = `Ngày thứ ${days} bên nhau`;

    const need = xpNeededForLevel(state.level);
    const pct = Math.min(100, Math.round((state.xp / need) * 100));
    document.getElementById("levelBadge").textContent = `Cấp ${state.level}`;
    document.getElementById("xpBarFill").style.width = `${pct}%`;
    document.getElementById("xpText").textContent = `${state.xp}/${need}`;

    document.getElementById("candyCount").textContent = state.candy;
    document.getElementById("shopCandyText").textContent = state.candy;
    document.getElementById("decorCountBadge").textContent = `${state.placedDecor.length}/${DATA.decorItems.length}`;

    // Check unread unlocked letters
    const hasUnreadLetter = DATA.secretLetters.some(
      (l) => isLetterUnlocked(l) && !state.readLetters.includes(l.id)
    );
    document.getElementById("letterDot").classList.toggle("hidden", !hasUnreadLetter);

    updateQuestDot();

    // Update time-mode active button
    document.querySelectorAll("#timeModes button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.time === state.timeOverride);
    });
  }

  // Daily Reset & Quests Management
  function syncDailyReset() {
    const todayStr = new Date().toDateString();
    let changed = false;
    if (state.freeMealsDate !== todayStr) {
      state.freeMealsDate = todayStr;
      state.freeMealsLeft = 3;
      changed = true;
    }
    if (!state.dailyInteractions || state.dailyInteractions.date !== todayStr) {
      state.dailyInteractions = {
        date: todayStr,
        hugCount: 0,
        petCount: 0
      };
      changed = true;
    }
    if (!state.dailyQuests || state.dailyQuests.date !== todayStr) {
      state.dailyQuests = {
        date: todayStr,
        hugDone: false,
        feedDone: false,
        gameDone: false,
        claimed: false
      };
      changed = true;
    }
    if (changed) {
      saveState();
    }
    updateQuestDot();
  }

  function updateQuestDot() {
    const dot = document.getElementById("questDot");
    if (!dot) return;
    const q = state.dailyQuests;
    if (!q) {
      dot.classList.add("hidden");
      return;
    }
    const allDone = q.hugDone && q.feedDone && q.gameDone;
    if (allDone && !q.claimed) {
      dot.classList.remove("hidden");
      dot.textContent = "!";
      dot.style.background = "#FFD166";
      dot.style.color = "#4A302C";
    } else if (!allDone && !q.claimed) {
      dot.classList.remove("hidden");
      dot.textContent = "•";
      dot.style.background = "var(--pink-accent)";
      dot.style.color = "#FFF";
    } else {
      dot.classList.add("hidden");
    }
  }

  function renderQuestsModal() {
    syncDailyReset();
    const listEl = document.getElementById("questList");
    if (!listEl) return;
    listEl.innerHTML = "";
    const q = state.dailyQuests;

    const quests = [
      {
        id: "hug",
        icon: "🫂",
        title: "Ôm anh một cái thật chặt",
        desc: "Bấm nút 'Ôm một cái' ngoài phòng khách để nạp năng lượng",
        done: q.hugDone
      },
      {
        id: "feed",
        icon: "🍲",
        title: "Chăm sóc dạ dày & bé mèo",
        desc: "Đãi anh món ngon Hải Phòng hoặc vuốt ve bé mèo Bông",
        done: q.feedDone
      },
      {
        id: "game",
        icon: "🎮",
        title: "Vui chơi ở Vườn trẻ Kim Đồng",
        desc: "Chơi 1 ván mini-game đạt từ 50 điểm trở lên",
        done: q.gameDone
      }
    ];

    quests.forEach((item) => {
      const row = document.createElement("div");
      row.className = `quest-row ${item.done ? "done" : ""}`;
      row.innerHTML = `
        <div class="item-left">
          <span class="item-emoji">${item.icon}</span>
          <div class="item-meta">
            <span class="item-title">${item.title}</span>
            <span class="item-desc">${item.desc}</span>
          </div>
        </div>
        <span class="quest-badge ${item.done ? "done" : "pending"}">${item.done ? "Đã xong ✓" : "Chưa xong (0/1)"}</span>
      `;
      listEl.appendChild(row);
    });

    const allDone = q.hugDone && q.feedDone && q.gameDone;
    const btnClaim = document.getElementById("btnClaimQuests");
    if (btnClaim) {
      if (q.claimed) {
        btnClaim.textContent = "🎉 Đã Nhận Hôm Nay";
        btnClaim.className = "pixel-btn btn-cream btn-sm disabled";
        btnClaim.disabled = true;
      } else if (allDone) {
        btnClaim.textContent = "✨ Nhận Thưởng (+15 🍬, +35 XP)";
        btnClaim.className = "pixel-btn btn-pink";
        btnClaim.disabled = false;
      } else {
        const count = (q.hugDone ? 1 : 0) + (q.feedDone ? 1 : 0) + (q.gameDone ? 1 : 0);
        btnClaim.textContent = `Chưa Xong Hết (${count}/3)`;
        btnClaim.className = "pixel-btn btn-cream btn-sm disabled";
        btnClaim.disabled = true;
      }
    }
  }

  function claimDailyQuests() {
    AudioManager.playClick();
    const q = state.dailyQuests;
    if (!q || q.claimed) return;
    const allDone = q.hugDone && q.feedDone && q.gameDone;
    if (!allDone) {
      showToast("Hãy hoàn thành đủ cả 3 việc nhỏ trước nhé!");
      return;
    }
    q.claimed = true;
    addRewards(35, 15);
    saveState();
    renderHUD();
    renderQuestsModal();
    updateQuestDot();
    AudioManager.playLevelUp();
    showToast("🎉 Đã nhận thưởng ngày: +15 🍬 & +35 XP!");
  }

  // Render Food Tray with Daily Free Meals & Candy Sink
  function renderFoodGrid() {
    syncDailyReset();
    const grid = document.getElementById("foodGrid");
    grid.innerHTML = "";

    const freeCount = state.freeMealsLeft || 0;
    const subtitle = document.querySelector("#modalFood .modal-subtitle");
    if (subtitle) {
      subtitle.innerHTML = freeCount > 0
        ? `Chọn món ngon cho anh Khánh & bé Bông nhé (Hôm nay còn <strong>${freeCount}/3 bữa miễn phí</strong> ✨):`
        : `Dùng kẹo kiếm được để chiêu đãi anh Khánh & bé Bông (có <strong id="foodCandyText">${state.candy}</strong> 🍬):`;
    }

    DATA.foods.forEach((food) => {
      const isFree = freeCount > 0;
      const canAfford = isFree || state.candy >= (food.cost || 2);

      const btn = document.createElement("button");
      btn.className = `food-item pixel-btn btn-cream ${canAfford ? "" : "disabled"}`;
      btn.innerHTML = `
        <span class="food-icon">${food.emoji}</span>
        <div class="food-info">
          <span class="food-name">${food.name}</span>
          <span class="food-bonus">${isFree ? "Miễn phí hôm nay ✨" : `Giá: ${food.cost || 2} 🍬`} • +${food.xp} thân mật</span>
        </div>
      `;
      btn.addEventListener("click", () => {
        if (!isFree && state.candy < (food.cost || 2)) {
          showToast(`Cần ${food.cost || 2} 🍬 để đãi món này. Chơi mini-game kiếm thêm kẹo nha! 🍬`);
          return;
        }

        closeModal("modalFood");
        AudioManager.playHug();
        RoomScene.triggerKhanhHappy("eating");
        RoomScene.triggerBongHappy();
        showSpeech("Anh Khánh & Bé Bông", food.reaction);

        if (!state.foodsFed.includes(food.id)) {
          state.foodsFed.push(food.id);
        }

        if (state.dailyQuests && !state.dailyQuests.feedDone) {
          state.dailyQuests.feedDone = true;
          updateQuestDot();
        }

        if (isFree) {
          state.freeMealsLeft = Math.max(0, state.freeMealsLeft - 1);
          addRewards(food.xp, 0);
          showToast(`Đã đãi món ngon! (Còn ${state.freeMealsLeft}/3 bữa miễn phí hôm nay)`);
        } else {
          state.candy -= (food.cost || 2);
          addRewards(food.xp, 0);
          showToast(`Đã dùng ${food.cost || 2} 🍬 đãi món ngon! (+${food.xp} thân mật)`);
        }
      });
      grid.appendChild(btn);
    });
  }

  // Render Shop
  function renderShop() {
    const list = document.getElementById("shopList");
    list.innerHTML = "";
    document.getElementById("shopCandyText").textContent = state.candy;

    DATA.decorItems.forEach((item) => {
      const owned = state.ownedDecor.includes(item.id);
      const placed = state.placedDecor.includes(item.id);

      const row = document.createElement("div");
      row.className = "shop-row";

      let btnHtml = "";
      if (!owned) {
        const disabled = state.candy < item.price ? "disabled" : "";
        btnHtml = `<button class="pixel-btn btn-gold btn-sm" data-buy="${item.id}" ${disabled}>Mua ${item.price} 🍬</button>`;
      } else {
        btnHtml = `<button class="pixel-btn ${placed ? "btn-pink" : "btn-cream"} btn-sm" data-toggle="${item.id}">${placed ? "Đang đặt ✓" : "Cất đi"}</button>`;
      }

      row.innerHTML = `
        <div class="item-left">
          <span class="item-emoji">${item.emoji}</span>
          <div class="item-meta">
            <span class="item-title">${item.name}</span>
            <span class="item-desc">${item.desc}</span>
          </div>
        </div>
        ${btnHtml}
      `;
      list.appendChild(row);
    });

    list.querySelectorAll("[data-buy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = DATA.decorItems.find((d) => d.id === btn.dataset.buy);
        if (!item || state.candy < item.price) return;
        state.candy -= item.price;
        state.ownedDecor.push(item.id);
        state.placedDecor.push(item.id);
        AudioManager.playLevelUp();
        showToast(`✨ Đã sắm ${item.name} đặt vào phòng!`);
        addRewards(18, 0);
        renderShop();
      });
    });

    list.querySelectorAll("[data-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.toggle;
        AudioManager.playClick();
        if (state.placedDecor.includes(id)) {
          state.placedDecor = state.placedDecor.filter((x) => x !== id);
        } else {
          state.placedDecor.push(id);
        }
        saveState();
        renderHUD();
        renderShop();
      });
    });
  }

  // Render Secret Letters
  function renderLetters() {
    const listEl = document.getElementById("letterList");
    const readerEl = document.getElementById("letterReader");
    listEl.classList.remove("hidden");
    readerEl.classList.add("hidden");
    listEl.innerHTML = "";

    DATA.secretLetters.forEach((letter) => {
      const unlocked = isLetterUnlocked(letter);
      const isRead = state.readLetters.includes(letter.id);

      let statusDesc = "";
      if (unlocked) {
        statusDesc = isRead ? "Đã đọc • Bấm để xem lại" : "Mới mở khóa! Chưa đọc";
      } else {
        const parts = [];
        if (state.level < letter.unlockLevel) {
          parts.push(`Cấp ${state.level}/${letter.unlockLevel}`);
        }
        if (letter.reqHugs && (state.hugCount || 0) < letter.reqHugs) {
          parts.push(`Ôm ${state.hugCount || 0}/${letter.reqHugs}`);
        }
        if (letter.reqDecor && (state.ownedDecor || []).length < letter.reqDecor) {
          parts.push(`Đồ phòng ${(state.ownedDecor || []).length}/${letter.reqDecor}`);
        }
        if (letter.reqJars && (state.jarReads || 0) < letter.reqJars) {
          parts.push(`Mở lọ ${state.jarReads || 0}/${letter.reqJars}`);
        }
        const progStr = parts.length > 0 ? ` [Tiến độ: ${parts.join(" • ")}]` : "";
        statusDesc = `${letter.unlockDesc}${progStr}`;
      }

      const row = document.createElement("div");
      row.className = `letter-row ${unlocked ? "" : "locked"}`;
      row.innerHTML = `
        <div class="item-left">
          <span class="item-emoji">${unlocked ? (isRead ? "📖" : "💌") : "🔒"}</span>
          <div class="item-meta">
            <span class="item-title">${letter.title}</span>
            <span class="item-desc">${statusDesc}</span>
          </div>
        </div>
        ${unlocked ? `<button class="pixel-btn btn-pink btn-sm" data-read="${letter.id}">Đọc thư</button>` : ""}
      `;
      listEl.appendChild(row);
    });

    listEl.querySelectorAll("[data-read]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const letter = DATA.secretLetters.find((l) => l.id === btn.dataset.read);
        if (!letter) return;
        AudioManager.playNote();

        if (!state.readLetters.includes(letter.id)) {
          state.readLetters.push(letter.id);
          saveState();
          renderHUD();
        }

        document.getElementById("letterReaderTitle").textContent = letter.title;
        document.getElementById("letterReaderBody").textContent = letter.body;
        document.getElementById("letterReaderSign").textContent = letter.sign;

        listEl.classList.add("hidden");
        readerEl.classList.remove("hidden");
      });
    });
  }

  // Render Achievements
  function renderAchievements() {
    const listEl = document.getElementById("achieveList");
    listEl.innerHTML = "";
    DATA.achievements.forEach((ach) => {
      const done = state.unlockedAchieve.includes(ach.id);
      const row = document.createElement("div");
      row.className = `achieve-row ${done ? "done" : ""}`;
      row.innerHTML = `
        <div class="item-left">
          <span class="item-emoji">${ach.emoji}</span>
          <div class="item-meta">
            <span class="item-title">${ach.name}</span>
            <span class="item-desc">${ach.desc}</span>
          </div>
        </div>
        <span class="achieve-badge ${done ? "done" : "pending"}">${done ? "Đã nhận ✓" : `+${ach.reward} 🍬`}</span>
      `;
      listEl.appendChild(row);
    });
  }

  // Mood Jars
  let jarReadsToday = 0;
  let lastJarDate = "";

  function drawNoteFromJar(jarKey) {
    currentJarKey = jarKey;
    const jar = DATA.moodJars[jarKey];
    if (!jar) return;

    document.querySelectorAll(".jar-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.jar === jarKey);
    });

    const { item, idx } = pickRandom(jar.notes, lastNoteIdx[jarKey] ?? -1);
    lastNoteIdx[jarKey] = idx;

    AudioManager.playNote();
    document.getElementById("noteTag").textContent = jar.tag;
    document.getElementById("noteContent").textContent = item;
    document.getElementById("notePaper").classList.remove("hidden");

    state.jarReads++;

    const todayStr = new Date().toDateString();
    if (lastJarDate !== todayStr) {
      lastJarDate = todayStr;
      jarReadsToday = 0;
    }

    if (jarReadsToday < 3) {
      jarReadsToday++;
      addRewards(6, 1);
    } else {
      addRewards(1, 0);
    }
  }

  // Room & Character Interactions (Strict Anti-Spam & Daily Rested Limit)
  let lastHugTime = 0;

  function handleHug() {
    AudioManager.playHug();
    RoomScene.triggerKhanhHappy("happy");
    state.hugCount++;

    syncDailyReset();

    if (state.dailyQuests && !state.dailyQuests.hugDone) {
      state.dailyQuests.hugDone = true;
      saveState();
      updateQuestDot();
    }

    const now = Date.now();
    const elapsed = now - lastHugTime;
    let speech = "";

    const hCount = state.dailyInteractions ? state.dailyInteractions.hugCount : 0;

    if (hCount === 0) {
      state.dailyInteractions.hugCount++;
      lastHugTime = now;
      saveState();
      speech = "Cái ôm chào ngày mới nè! Chúc em một ngày thật vui nha 🤗";
      addRewards(12, 1);
    } else if (hCount < 3) {
      if (elapsed > 60000) {
        state.dailyInteractions.hugCount++;
        lastHugTime = now;
        saveState();
        const lines = [
          "Ôm cái cho đỡ mệt nào. Hôm nay mọi chuyện ổn chứ em? 🤗",
          "Nạp xíu năng lượng rồi làm việc tiếp nha Ngọc!",
          "Đứng yên anh ôm cái nào, lúc nào rảnh nhắn tin cho anh nha."
        ];
        speech = pickRandom(lines).item;
        addRewards(4, 0);
      } else {
        const quickLines = [
          "Vừa ôm xong mà, nhớ anh đến thế cơ à? 🥰",
          "Ôm thêm cái nữa nè, đứng yên một lát cho ấm nào!",
          "Vẫn đang ôm em đây mà, đừng lo nha."
        ];
        speech = pickRandom(quickLines).item;
        // 0 XP / 0 Candy on quick spam
      }
    } else {
      // 4th hug or more today: strictly 0 XP & 0 Candy
      const limitLines = [
        "Hôm nay ôm nhiều thế cơ à, định cày thân mật đấy à? Đừng hòng nhé, nhưng mà anh vẫn thích được em ôm 🥰",
        "Ôm em bao nhiêu lần cũng không chán, nhưng hôm nay hết điểm thân mật rồi đó nha cô nương 😜",
        "Vẫn đang ôm em đây mà, thích nhõng nhẽo rồi đúng không?",
        "Mỗi ngày được ôm em thế này là anh vui cả ngày rồi."
      ];
      speech = pickRandom(limitLines).item;
      // 0 XP / 0 Candy
    }

    showSpeech("Anh Khánh", speech);
  }

  let lastPetTime = 0;

  function handlePetBong() {
    AudioManager.playMeow();
    RoomScene.triggerBongHappy();
    state.petCount++;

    syncDailyReset();

    if (state.dailyQuests && !state.dailyQuests.feedDone) {
      state.dailyQuests.feedDone = true;
      saveState();
      updateQuestDot();
    }

    const now = Date.now();
    const elapsed = now - lastPetTime;
    let speech = "";

    const pCount = state.dailyInteractions ? state.dailyInteractions.petCount : 0;

    if (pCount === 0) {
      state.dailyInteractions.petCount++;
      lastPetTime = now;
      saveState();
      speech = "Meooo~ (Bông dụi đầu vào tay em chào ngày mới rừ rừ 🐱)";
      addRewards(10, 1);
    } else if (pCount < 3) {
      if (elapsed > 60000) {
        state.dailyInteractions.petCount++;
        lastPetTime = now;
        saveState();
        speech = pickRandom(DATA.bongDialogues).item;
        addRewards(3, 0);
      } else {
        const restingBong = [
          "(Bông ngáp một cái thật to, thỏa mãn cuộn tròn nằm ngủ tiếp)",
          "(Bông liếm nhẹ mu bàn tay em rồi lim dim mắt)",
          "Rừ rừ... (Bông đang nằm êm ru, không thèm mở mắt luôn)"
        ];
        speech = pickRandom(restingBong).item;
        // 0 XP / 0 Candy on quick spam
      }
    } else {
      // 4th pet or more today: strictly 0 XP & 0 Candy
      const limitBong = [
        "Meo~ (Bông ngửa bụng: 'Hôm nay vuốt đủ 3 lần rồi nha sen, hết kẹo rồi đó!' 🐱)",
        "Rừ rừ... (Bông thỏa mãn nhắm tịt mắt, không thèm nhúc nhích)",
        "Meo meo! (Bông liếm ngón tay em một cái rồi lại ngủ khò)",
        "(Bông lim dim ngủ say sưa, được vuốt ve nhiều quá thích mê)"
      ];
      speech = pickRandom(limitBong).item;
      // 0 XP / 0 Candy
    }

    showSpeech("Bé Bông 🐱", speech);
  }

  // Initialize Room Scene
  let lastTalkTime = 0;
  RoomScene.init(
    document.getElementById("roomCanvas"),
    () => state,
    (who) => {
      if (who === "khanh") {
        AudioManager.playClick();
        const specialDay = getActiveSpecialDay();
        if (specialDay === "tet" && DATA.specialDays.tet && DATA.specialDays.tet.quotes) {
          const { item } = pickRandom(DATA.specialDays.tet.quotes);
          showSpeech("Anh Khánh 🧧", item);
        } else {
          const { item } = pickRandom(DATA.khanhDialogues);
          showSpeech("Anh Khánh", item);
        }
        const now = Date.now();
        if (now - lastTalkTime > 60000) {
          lastTalkTime = now;
          addRewards(6, 1);
        } else {
          addRewards(1, 0);
        }
      } else if (who === "bong") {
        handlePetBong();
      }
    }
  );

  // Arcade Hub Setup (4 Mini-Games)
  let activeGameKey = "catch";
  const mgCanvas = document.getElementById("miniGameCanvas");

  const ARCADE_META = {
    catch: {
      title: "🍬 Hứng Kẹo Yêu Thương",
      overlayTitle: "Hứng Kẹo Yêu Thương 🍬",
      overlayDesc: `Hứng <strong>kẹo ngọt, tim và món ngon</strong> và ăn <strong>Nam châm 🧲 / Khiên 🛡️</strong>! Combo 10 lần kích hoạt <strong>Cơn Mưa Kẹo x3</strong>!<br />Nhớ né chướng ngại vật kẻo mất mạng nhé 😂`,
      hint: "Chạm kéo 1 ngón tay siêu mượt • Combo 10 = Fever x3 ✨",
      bestKey: "bestScore",
      defaultLives: "❤️❤️❤️",
      mod: () => MiniGame
    },
    crossing: {
      title: "🚗 Qua Đường Đi Bông!",
      overlayTitle: "Bông Sang Đường 🐱",
      overlayDesc: `Giúp bé Bông nhảy qua đường phố né xe, và nhảy lên <strong>thuyền gỗ</strong> để qua sông an toàn!<br />Nhớ nhặt kẹo & tim dọc đường nhé.`,
      hint: "Vuốt lên/xuống/trái/phải trên màn hình, dùng nút D-pad bên dưới hoặc phím mũi tên!",
      bestKey: "bestCrossing",
      defaultLives: "🐱",
      mod: () => CrossingGame
    },
    flappy: {
      title: "🍬 Bông Bay Tìm Kẹo",
      overlayTitle: "Bông Bay Tìm Kẹo 🍬",
      overlayDesc: `Chạm màn hình (hoặc phím Space) để bé Bông vỗ cánh bay nhặt kẹo và né các cột hoa phượng.<br />Nhớ ăn thêm <strong>kẹo 🍬</strong> lơ lửng giữa khe nhé!`,
      hint: "Chạm liên tục nhịp đều để giữ Bông bay lơ lửng nhé ✨",
      bestKey: "bestFlappy",
      defaultLives: "🪽",
      mod: () => FlappyGame
    },
    nonla: {
      title: "👒 Nón Lá L-N (Chữa Ngọng)",
      overlayTitle: "Thử Xem Ngọng L - N Cỡ Nào! 👒",
      overlayDesc: `Đọc to chuẩn các câu thử thách <strong>L / N</strong> vào Micro (<em>cần mở trên Chrome/Edge & cho phép Micro</em>).<br />Nếu trình duyệt/tab xem thử chặn Mic, bấm <strong>Đổi sang Im lặng 🤫</strong> để chơi chọn chữ ngay!`,
      hint: "Phát âm dứt khoát âm L và N • Đọc đúng liên tiếp để lên Chuỗi x3, x5 🔥",
      bestKey: "bestNonla",
      defaultLives: "❤️❤️❤️",
      mod: () => NonLaGame
    },
    memory: {
      title: "🃏 Ghép Cặp Kỷ Niệm",
      overlayTitle: "Ghép Cặp Kỷ Niệm 💕",
      overlayDesc: `Lật mở từng cặp thẻ bài <strong>Kỷ Niệm Của Hai Đứa</strong> (Bánh mì cay, Trà cúc, Bé Bông, Đĩa than MCK 99%...)!<br />Tìm đủ 8 cặp trước khi hết 12 lượt lật. 2s đầu tiên được nhìn lướt ghi nhớ! Ghép đúng liên tiếp được +1 lượt!`,
      hint: "Ghi nhớ nhanh ở 2s đầu • Ghép đúng liên tiếp được thưởng thêm +1 lượt ✨",
      bestKey: "bestMemory",
      defaultLives: "🎯 12 lượt",
      mod: () => MemoryGame
    }
  };

  function stopAllGames(preserveNonLa = false) {
    MiniGame.stop();
    CrossingGame.stop();
    FlappyGame.stop();
    if (preserveNonLa && NonLaGame.isRunning() && NonLaGame.isPaused()) {
      NonLaGame.suspend();
    } else {
      NonLaGame.stop();
    }
    if (window.MemoryGame) MemoryGame.stop();
  }

  function handleArcadeHud({ score, candies, lives, livesText }) {
    document.getElementById("mgScore").textContent = score;
    document.getElementById("mgCandy").textContent = candies;
    if (livesText !== undefined) {
      document.getElementById("mgLives").textContent = livesText;
    } else if (lives !== undefined) {
      document.getElementById("mgLives").textContent = lives > 0 ? "❤️".repeat(lives) : "💔";
    }
  }

  function handleArcadeGameOver(gameKey, { score, candies, hitPoop, reason }) {
    const meta = ARCADE_META[gameKey];
    const isNewBest = score > state[meta.bestKey];
    if (isNewBest) state[meta.bestKey] = score;
    document.getElementById("mgBest").textContent = state[meta.bestKey];

    // Rebalanced economy: candies capped 0-3 (+1 bonus if new best), XP 2-5
    let finalCandies = Math.max(0, Math.min(3, candies || 0));
    if (isNewBest && score > 0) finalCandies = Math.min(4, finalCandies + 1);
    const xpEarned = Math.max(2, Math.min(5, Math.floor(score / 35)));
    addRewards(xpEarned, finalCandies);

    if (score >= 50 && state.dailyQuests && !state.dailyQuests.gameDone) {
      state.dailyQuests.gameDone = true;
      saveState();
      updateQuestDot();
    }

    const overlay = document.getElementById("mgOverlay");
    const resultBox = document.getElementById("mgResultBox");
    document.getElementById("mgOverlayTitle").textContent = isNewBest
      ? "🎉 Kỷ Lục Mới!"
      : "Xong Ván Rồi Nha! 💕";

    let descText = reason || "Em chơi đỉnh thật đấy!";
    if (gameKey === "catch") {
      descText = hitPoop
        ? "Ối giời ơi hứng nhầm rồi 😂 Nhưng không sao, quà vẫn đầy túi nè:"
        : "Em chơi đỉnh thật đấy!";
    }
    document.getElementById("mgOverlayDesc").textContent = descText;

    resultBox.innerHTML = `
      Điểm số: <strong>${score}</strong> ${isNewBest ? "🏆 (Kỷ lục mới!)" : ""}<br />
      Thu hoạch: <strong>+${finalCandies} 🍬</strong> và <strong>+${xpEarned} thân mật</strong>!
    `;
    resultBox.classList.remove("hidden");
    document.getElementById("btnStartMiniGame").textContent = "Chơi Lại Nhé!";
    overlay.classList.remove("hidden");
  }

  MiniGame.init(mgCanvas, {
    onHudUpdate: handleArcadeHud,
    onGameOver: (res) => handleArcadeGameOver("catch", res)
  });

  CrossingGame.init(mgCanvas, {
    onHudUpdate: handleArcadeHud,
    onGameOver: (res) => handleArcadeGameOver("crossing", res)
  });

  FlappyGame.init(mgCanvas, {
    onHudUpdate: handleArcadeHud,
    onGameOver: (res) => handleArcadeGameOver("flappy", res)
  });

  function updateNonlaUI(mode, word, lastHeard) {
    const isVoice = mode === "voice";
    document.getElementById("btnToggleNonlaMode").textContent = isVoice
      ? "Đổi sang Im lặng 🤫"
      : (NonLaGame.hasSpeechAPI() ? "Đổi sang Mic 🎤" : "Không có Mic 🤫");
    document.getElementById("nonlaHeardBox").classList.toggle("hidden", !isVoice);
    document.getElementById("nonlaQuietChoices").classList.toggle("hidden", isVoice);

    if (!isVoice && word) {
      const pair = Math.random() < 0.5 ? [word.right, word.wrong] : [word.wrong, word.right];
      const btnA = document.getElementById("nonlaChoiceA");
      const btnB = document.getElementById("nonlaChoiceB");
      btnA.textContent = pair[0];
      btnA.dataset.val = pair[0];
      btnB.textContent = pair[1];
      btnB.dataset.val = pair[1];
    }
    if (lastHeard !== undefined) {
      document.getElementById("nonlaHeardBox").innerHTML = `Nghe thấy: <em>${lastHeard || "..."}</em>`;
    }
  }

  NonLaGame.init(mgCanvas, {
    onHudUpdate: handleArcadeHud,
    onGameOver: (res) => handleArcadeGameOver("nonla", res),
    onMicState(listening, notice) {
      const badge = document.getElementById("nonlaMicStatus");
      if (listening) {
        badge.textContent = "🎤 Mic đang nghe... (nhìn thanh xanh)";
      } else if (notice) {
        badge.textContent = notice;
        showToast(notice);
      } else {
        badge.textContent = NonLaGame.getMode() === "voice" ? "🎤 Đang chờ mic..." : "🤫 Chế độ Im lặng";
      }
    },
    onHeardUpdate(text) {
      document.getElementById("nonlaHeardBox").innerHTML = `Nghe thấy: <em>${text || "..."}</em>`;
    },
    onWordUpdate({ word, mode, lastHeard }) {
      updateNonlaUI(mode, word, lastHeard);
    },
    onPauseState(isPaused) {
      const btn = document.getElementById("btnPauseNonla");
      if (btn) {
        btn.textContent = isPaused ? "▶ Tiếp Tục" : "⏸ Tạm Dừng";
        btn.className = isPaused ? "pixel-btn btn-pink btn-sm" : "pixel-btn btn-cream btn-sm";
      }
    }
  });

  if (window.MemoryGame) {
    MemoryGame.init(mgCanvas, {
      onHudUpdate: handleArcadeHud,
      onGameOver: (res) => handleArcadeGameOver("memory", res)
    });
  }

  function showArcadeMenu() {
    stopAllGames(true);
    document.getElementById("bestCatchText").textContent = `Kỷ lục: ${state.bestScore}`;
    document.getElementById("bestCrossingText").textContent = `Kỷ lục: ${state.bestCrossing}`;
    document.getElementById("bestFlappyText").textContent = `Kỷ lục: ${state.bestFlappy}`;
    document.getElementById("bestNonlaText").textContent = `Kỷ lục: ${state.bestNonla}`;
    const bestMemEl = document.getElementById("bestMemoryText");
    if (bestMemEl) bestMemEl.textContent = `Kỷ lục: ${state.bestMemory || 0}`;
    document.getElementById("arcadeTitle").textContent = "🎮 Vườn Trẻ Kim Đồng";
    document.getElementById("btnBackArcade").classList.add("hidden");
    document.getElementById("arcadeMenu").classList.remove("hidden");
    document.getElementById("arcadeStage").classList.add("hidden");
  }

  function openArcadeGame(gameKey) {
    activeGameKey = gameKey;
    const meta = ARCADE_META[gameKey];
    stopAllGames(gameKey === "nonla");

    document.getElementById("arcadeTitle").textContent = meta.title;
    document.getElementById("btnBackArcade").classList.remove("hidden");
    document.getElementById("arcadeMenu").classList.add("hidden");
    document.getElementById("arcadeStage").classList.remove("hidden");

    const isNonLaPaused = gameKey === "nonla" && NonLaGame.isPaused() && NonLaGame.isRunning();

    if (isNonLaPaused) {
      document.getElementById("mgBest").textContent = state[meta.bestKey];
      document.getElementById("mgScore").textContent = NonLaGame.getScore();
      document.getElementById("mgCandy").textContent = NonLaGame.getCandies();
      document.getElementById("mgLives").textContent = "❤️".repeat(Math.max(1, NonLaGame.getLives()));
      document.getElementById("mgResultBox").classList.add("hidden");
      document.getElementById("mgOverlayTitle").textContent = "⏸ Ván Đang Tạm Dừng";
      document.getElementById("mgOverlayDesc").innerHTML = `Em đang tạm dừng ván này ở <strong>${NonLaGame.getScore()} điểm</strong> (còn ${NonLaGame.getLives()} mạng).<br />Bấm nút dưới để tiếp tục chơi ngay nhé!`;
      document.getElementById("mgTouchHint").textContent = meta.hint;
      document.getElementById("btnStartMiniGame").textContent = "▶ Tiếp Tục Chơi";
    } else {
      document.getElementById("mgBest").textContent = state[meta.bestKey];
      document.getElementById("mgScore").textContent = "0";
      document.getElementById("mgCandy").textContent = "0";
      document.getElementById("mgLives").textContent = meta.defaultLives;
      document.getElementById("mgResultBox").classList.add("hidden");
      document.getElementById("mgOverlayTitle").textContent = meta.overlayTitle;
      document.getElementById("mgOverlayDesc").innerHTML = meta.overlayDesc;
      document.getElementById("mgTouchHint").textContent = meta.hint;
      document.getElementById("btnStartMiniGame").textContent = "Bắt Đầu Chơi!";
    }

    document.getElementById("mgOverlay").classList.remove("hidden");

    document.getElementById("crossingControls").classList.toggle("hidden", gameKey !== "crossing");
    document.getElementById("nonlaControls").classList.toggle("hidden", gameKey !== "nonla");
    if (gameKey === "nonla") {
      updateNonlaUI(NonLaGame.getMode(), null, "");
    }
  }

  // Event Bindings
  document.getElementById("speechBubble").addEventListener("click", () => {
    document.getElementById("speechBubble").classList.add("hidden");
  });

  document.getElementById("btnAudio").addEventListener("click", () => {
    const on = AudioManager.toggle();
    document.getElementById("audioIcon").textContent = on ? "🔊" : "🔇";
    showToast(on ? "🎵 Đã bật nhạc hộp nhạc ấm áp!" : "🔇 Đã tắt âm thanh");
  });

  document.getElementById("btnHug").addEventListener("click", handleHug);
  document.getElementById("btnPetSun").addEventListener("click", handlePetBong);

  document.getElementById("btnFeed").addEventListener("click", () => {
    renderFoodGrid();
    openModal("modalFood");
  });

  document.getElementById("btnPlayMiniGame").addEventListener("click", () => {
    showArcadeMenu();
    openModal("modalMiniGame");
  });

  document.querySelectorAll(".arcade-card").forEach((card) => {
    card.addEventListener("click", () => {
      AudioManager.playClick();
      openArcadeGame(card.dataset.game);
    });
  });

  document.getElementById("btnBackArcade").addEventListener("click", () => {
    AudioManager.playClick();
    showArcadeMenu();
  });

  document.getElementById("btnStartMiniGame").addEventListener("click", () => {
    if (!(activeGameKey === "nonla" && NonLaGame.getMode() === "voice")) {
      AudioManager.playClick();
    }
    document.getElementById("mgOverlay").classList.add("hidden");
    if (activeGameKey === "nonla" && NonLaGame.isRunning() && NonLaGame.isPaused()) {
      NonLaGame.resume();
    } else {
      ARCADE_META[activeGameKey].mod().start();
    }
  });

  document.getElementById("btnCloseMiniGame").addEventListener("click", () => {
    stopAllGames();
    closeModal("modalMiniGame");
  });

  // Crossing D-pad controls
  document.getElementById("dpadUp").addEventListener("click", () => CrossingGame.move(0, 1));
  document.getElementById("dpadDown").addEventListener("click", () => CrossingGame.move(0, -1));
  document.getElementById("dpadLeft").addEventListener("click", () => CrossingGame.move(-1, 0));
  document.getElementById("dpadRight").addEventListener("click", () => CrossingGame.move(1, 0));

  // Non La L-N controls
  document.getElementById("btnPauseNonla").addEventListener("click", () => {
    AudioManager.playClick();
    NonLaGame.togglePause();
  });
  document.getElementById("btnToggleNonlaMode").addEventListener("click", () => {
    const next = NonLaGame.getMode() === "voice" ? "quiet" : "voice";
    if (next !== "voice") {
      AudioManager.playClick();
    }
    const actual = NonLaGame.setMode(next);
    if (next === "voice" && actual === "quiet") {
      showToast("Trình duyệt này chưa hỗ trợ Mic tiếng Việt, dùng Im lặng nha!");
    }
  });
  document.getElementById("nonlaChoiceA").addEventListener("click", (e) => {
    NonLaGame.submitQuietChoice(e.currentTarget.dataset.val);
  });
  document.getElementById("nonlaChoiceB").addEventListener("click", (e) => {
    NonLaGame.submitQuietChoice(e.currentTarget.dataset.val);
  });

  // Nav Dock
  document.getElementById("navJars").addEventListener("click", () => openModal("modalJars"));
  document.getElementById("navShop").addEventListener("click", () => {
    renderShop();
    openModal("modalShop");
  });
  document.getElementById("navLetters").addEventListener("click", () => {
    renderLetters();
    openModal("modalLetters");
  });
  document.getElementById("navAchieve").addEventListener("click", () => {
    renderAchievements();
    openModal("modalAchieve");
  });
  document.getElementById("navQuests").addEventListener("click", () => {
    renderQuestsModal();
    openModal("modalQuests");
  });
  document.getElementById("btnClaimQuests").addEventListener("click", claimDailyQuests);
  document.getElementById("btnSettings").addEventListener("click", () => openModal("modalSettings"));

  const handleOpenChinese = () => {
    AudioManager.playClick();
    if (window.ChineseApp) {
      ChineseApp.open();
    } else {
      openModal("modalChinese");
    }
  };
  const btnChinese = document.getElementById("btnChinese");
  if (btnChinese) btnChinese.addEventListener("click", handleOpenChinese);
  const btnQuickChinese = document.getElementById("btnQuickChinese");
  if (btnQuickChinese) btnQuickChinese.addEventListener("click", handleOpenChinese);

  // Close buttons & backdrop click
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll(".modal-backdrop").forEach((bd) => {
    bd.addEventListener("click", (e) => {
      if (e.target === bd) {
        if (bd.id === "modalMiniGame") stopAllGames();
        bd.classList.add("hidden");
      }
    });
  });

  // Mood Jars click
  document.querySelectorAll(".jar-btn").forEach((btn) => {
    btn.addEventListener("click", () => drawNoteFromJar(btn.dataset.jar));
  });
  document.getElementById("btnNextNote").addEventListener("click", () => {
    if (currentJarKey) drawNoteFromJar(currentJarKey);
  });

  // Back in Letter Reader
  document.getElementById("btnBackLetters").addEventListener("click", () => {
    AudioManager.playClick();
    renderLetters();
  });

  // Time Override in Settings
  document.querySelectorAll("#timeModes button").forEach((btn) => {
    btn.addEventListener("click", () => {
      AudioManager.playClick();
      state.timeOverride = btn.dataset.time;
      saveState();
      renderHUD();
      showToast("Đã đổi khung cảnh cửa sổ ✨");
    });
  });

  // Backup & Restore helpers (UTF-8 safe Base64)
  function encodeSaveCode() {
    const json = JSON.stringify(state);
    return btoa(unescape(encodeURIComponent(json)));
  }

  function decodeSaveCode(code) {
    const json = decodeURIComponent(escape(atob(code.trim())));
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object" || typeof parsed.candy !== "number") {
      throw new Error("invalid");
    }
    return { ...DEFAULT_STATE, ...parsed };
  }

  function isInAppBrowser() {
    const ua = navigator.userAgent || "";
    return /Zalo|FBAN|FBAV|Messenger|Instagram|Line|; wv\)/i.test(ua);
  }

  document.getElementById("btnCopySave").addEventListener("click", async () => {
    AudioManager.playClick();
    saveState();
    const code = encodeSaveCode();
    try {
      await navigator.clipboard.writeText(code);
      showToast("📋 Đã sao chép mã lưu tiến trình!");
    } catch {
      document.getElementById("restoreCodeInput").value = code;
      showToast("Đã hiện mã lưu ở ô bên dưới để bạn copy nhé!");
    }
  });

  document.getElementById("btnRestoreSave").addEventListener("click", () => {
    AudioManager.playClick();
    const input = document.getElementById("restoreCodeInput");
    const rawCode = input.value.trim();
    if (!rawCode) {
      showToast("Hãy dán mã lưu vào ô trước nha!");
      return;
    }
    try {
      state = decodeSaveCode(rawCode);
      saveState();
      updateGreetingBanner();
      renderHUD();
      input.value = "";
      closeModal("modalSettings");
      showToast("✨ Đã khôi phục tiến trình thành công!");
    } catch {
      showToast("Mã lưu không hợp lệ, kiểm tra lại giúp mình nha!");
    }
  });

  // Reset Save
  document.getElementById("btnResetSave").addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn xóa dữ liệu lưu để chơi lại từ đầu không?")) {
      localStorage.removeItem(SAVE_KEY);
      state = { ...DEFAULT_STATE };
      saveState();
      renderHUD();
      closeModal("modalSettings");
      showToast("Đã đặt lại từ đầu!");
    }
  });

  // Ensure save flushes & mic releases cleanly when leaving, switching apps, or locking iPhone!
  function handleAppExitOrHide() {
    saveState();
    const wasRunningNonla = NonLaGame.isRunning();
    stopAllGames();
    if (wasRunningNonla) {
      document.getElementById("mgOverlay").classList.remove("hidden");
    }
  }

  window.addEventListener("pagehide", handleAppExitOrHide);
  window.addEventListener("beforeunload", handleAppExitOrHide);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      handleAppExitOrHide();
    } else if (document.visibilityState === "visible") {
      // Auto-refresh location & weather seamlessly when returning to the app
      if (window.WeatherEngine) {
        WeatherEngine.tryAutoLocate();
      }
    }
  });

  // Show WebView tip if opened inside QR scanner / Zalo / Messenger in-app browser
  if (isInAppBrowser()) {
    document.getElementById("webviewTip").classList.remove("hidden");
  }
  document.getElementById("btnDismissTip").addEventListener("click", () => {
    document.getElementById("webviewTip").classList.add("hidden");
  });

  // Weather & Location Caring Engine Integration
  function updateWeatherUI(w) {
    if (!w) return;
    const iconEl = document.getElementById("weatherIcon");
    const locEl = document.getElementById("weatherLocation");
    const tempEl = document.getElementById("weatherTemp");
    const descEl = document.getElementById("weatherDesc");
    const careEl = document.getElementById("weatherCareText");
    const bubbleEl = document.getElementById("weatherCareBubble");

    if (iconEl) iconEl.textContent = w.icon || "🌤️";
    if (locEl) {
      if (w.isAway) {
        locEl.textContent = `📍 ${w.city} (cách HP ${w.distFromHp}km)`;
        locEl.className = "weather-location-name weather-away-badge";
      } else {
        locEl.textContent = `📍 ${w.city}`;
        locEl.className = "weather-location-name";
      }
    }
    if (tempEl) {
      tempEl.textContent = `${w.temp}°C`;
    }
    if (descEl) {
      descEl.textContent = `${w.weatherText} • ${w.tempMin}°~${w.tempMax}°C`;
    }
    if (careEl) {
      careEl.textContent = w.caringMessage || "Chúc em Ngọc một ngày thật vui vẻ bên anh!";
    }
    if (bubbleEl) {
      if (w.isAway) {
        bubbleEl.classList.add("weather-away-bubble");
      } else {
        bubbleEl.classList.remove("weather-away-bubble");
      }
    }
  }

  if (window.WeatherEngine) {
    WeatherEngine.onWeatherChange(updateWeatherUI);
    updateWeatherUI(WeatherEngine.getWeather());
  }

  const btnUpdateLoc = document.getElementById("btnUpdateLocation");
  if (btnUpdateLoc) {
    btnUpdateLoc.addEventListener("click", () => {
      AudioManager.playClick();
      btnUpdateLoc.textContent = "⏳ Đang dò...";
      btnUpdateLoc.disabled = true;
      showToast("Đang kiểm tra vị trí để cập nhật thời tiết... 📍");
      if (window.WeatherEngine) {
        WeatherEngine.requestLocation(
          (w) => {
            btnUpdateLoc.textContent = "📍 Vị trí";
            btnUpdateLoc.disabled = false;
            updateWeatherUI(w);
            showToast(`✨ Đã cập nhật thời tiết tại ${w.city} (${w.temp}°C)!`);
          },
          () => {
            btnUpdateLoc.textContent = "📍 Vị trí";
            btnUpdateLoc.disabled = false;
            showToast("Không lấy được GPS, đang dùng thời tiết Hải Phòng nha!");
          }
        );
      } else {
        btnUpdateLoc.textContent = "📍 Vị trí";
        btnUpdateLoc.disabled = false;
      }
    });
  }

  // Boot
  let lastObservedDateStamp = "";
  let lastObservedHour = -1;

  function syncClockAndEvents() {
    const now = new Date();
    const dateStamp = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const hour = now.getHours();

    if (dateStamp !== lastObservedDateStamp || hour !== lastObservedHour) {
      const dateChanged = dateStamp !== lastObservedDateStamp;
      lastObservedDateStamp = dateStamp;
      lastObservedHour = hour;

      syncDailyReset();
      syncMusicThemeForToday();
      updateGreetingBanner();
      renderHUD();
      if (dateChanged) {
        checkSpecialDayEvent();
      }
      if (window.WeatherEngine) {
        WeatherEngine.tryAutoLocate();
      }
    }
  }

  syncClockAndEvents();
  if (window.WeatherEngine) {
    WeatherEngine.init();
  }
  if (window.ChineseApp) {
    ChineseApp.init();
  }
  // Auto-switch decorations, banner & music right when crossing 00:00 into/out of special dates!
  setInterval(syncClockAndEvents, 5000);

  // Register offline-capable Service Worker for iPhone/Android Home Screen app experience
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
});
