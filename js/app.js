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
    visitDays: 0, // different local days the app was opened (the shared plant grows with it)
    lastVisitDate: "",
    ownedOutfits: [], // wardrobe items bought (shop tab "Tủ quần áo")
    studyDays: 0, // different local days with a finished study activity (daily lesson, passed quiz, finished match)
    lastStudyDay: "",
    studyFeats: [], // one-off study feats reported by chinese.js / english.js (see STUDY_FEATS)
    wornOutfits: { ngoc: "", khanh: "", bong: "" }, // outfit id each character wears ("" = default clothes)
    unlockedAchieve: [],
    readLetters: [],
    hugCount: 0,
    petCount: 0,
    foodsFed: [],
    jarReads: 0,
    claimedBirthdays: [],
    freeMealsDate: "",
    freeMealsLeft: 3,
    chineseDailyDoneDate: "",
    lastBackupAt: 0,
    lastBackupReminder: "",
    nextMeetDate: "", // "YYYY-MM-DD" of the next time they meet (set in Cài đặt); drives the wall calendar
    meetGreetedDate: "", // meeting day whose greeting was already shown
    dailyAnswers: {}, // "YYYY-MM-DD" -> { q: question index, text } for "Câu hỏi hôm nay" (last 90 days kept)
    moodLog: {}, // "YYYY-MM-DD" -> last mood jar opened that day (miss | tired | sad | playful)
    dailyInteractions: {
      date: "",
      hugCount: 0,
      petCount: 0,
      jarReads: 0,
      talkCount: 0,
      lastTalkAt: 0,
      vinylCount: 0,
      arcadeCandy: 0 // candy paid by mini-games today (capped by ARCADE_DAILY_CANDY)
    },
    dailyStudy: {
      date: "",
      count: 0
    },
    dailyQuests: {
      date: "",
      hugDone: false,
      feedDone: false,
      gameDone: false,
      claimed: false
    }
  };

  // Max rewarded quiz/match rounds per day across Chinese + English (daily 5-words lessons have their own once-a-day flag).
  const STUDY_DAILY_LIMIT = 4;
  const ARRAY_KEYS = ["ownedDecor", "placedDecor", "ownedOutfits", "studyFeats", "unlockedAchieve", "readLetters", "foodsFed", "claimedBirthdays"];
  const NESTED_KEYS = ["dailyInteractions", "dailyQuests", "dailyStudy", "dailyAnswers", "moodLog", "wornOutfits"];

  // DEFAULT_STATE holds nested arrays/objects, so a shallow spread would share (and later mutate) them. Always deep-copy.
  function freshDefaults() {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function normalizeState(parsed) {
    const base = freshDefaults();
    const merged = { ...base, ...parsed };
    delete merged.timeOverride; // old saves: the window scene used to be pickable; it now always follows the real clock
    ARRAY_KEYS.forEach((k) => {
      if (!Array.isArray(merged[k])) merged[k] = base[k];
    });
    NESTED_KEYS.forEach((k) => {
      const v = parsed && parsed[k];
      merged[k] = v && typeof v === "object" && !Array.isArray(v) ? { ...base[k], ...v } : base[k];
    });
    return merged;
  }

  let state = loadState();
  let speechTimeout = null;
  let toastTimeout = null;
  let currentJarKey = null;
  const lastNoteIdx = {};

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return freshDefaults();
      return normalizeState(JSON.parse(raw));
    } catch {
      return freshDefaults();
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
    addXP: (amt) => addRewards(amt, 0),
    // Study modules (chinese.js / english.js) must go through this so quiz/match rewards stay capped per day.
    grantStudyReward: (kind, xp, candy) => grantStudyReward(kind, xp, candy),
    // Study modules report one-off feats (perfect fill-in / listening / tone round, review cleared); pays nothing itself.
    markStudyFeat: (id) => markStudyFeat(id),
    // photos.js calls this after the wall changes (photo count is not in the save)
    checkAchievements: () => checkAchievements()
  };
  // Study modules call window.showToast; it used to be closure-private so their toasts never appeared.
  window.showToast = (msg) => showToast(msg);
  // photos.js opens its modal through this (closing goes through the shared data-close / backdrop handlers)
  window.openAppModal = (id) => openModal(id);

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
    // Closing a study notebook must also silence any word/sentence still being read aloud.
    if (id === "modalEnglish" && window.EnglishApp && EnglishApp.stopSpeech) EnglishApp.stopSpeech();
    if (id === "modalChinese" && window.ChineseApp && ChineseApp.stopSpeech) ChineseApp.stopSpeech();
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

  // kind "daily" = the once-a-day 5-words lesson (guarded by its own flag, never capped here);
  // anything else (quiz, match) counts against STUDY_DAILY_LIMIT. Returns { granted, remaining }.
  function grantStudyReward(kind, xp, candy) {
    syncDailyReset();
    // A study day counts even when the reward is capped: the player still finished a lesson (study_days_7 / _30)
    const today = window.SpecialDays.localDateKey();
    if (state.lastStudyDay !== today) {
      state.lastStudyDay = today;
      state.studyDays = (state.studyDays || 0) + 1;
    }
    if (kind !== "daily") {
      if (state.dailyStudy.count >= STUDY_DAILY_LIMIT) {
        saveState();
        checkAchievements();
        return { granted: false, remaining: 0 };
      }
      state.dailyStudy.count++;
    }
    addRewards(xp, candy);
    return { granted: true, remaining: Math.max(0, STUDY_DAILY_LIMIT - state.dailyStudy.count) };
  }

  const STUDY_FEATS = ["perfect_cloze", "perfect_listen", "perfect_tone", "review_clear"];
  function markStudyFeat(id) {
    if (!STUDY_FEATS.includes(id) || state.studyFeats.includes(id)) return;
    state.studyFeats.push(id);
    saveState();
    checkAchievements();
  }

  // Words answered right 3+ times ("Đã thuộc") in both study modules; they keep SRS in their own storage keys.
  function masteredStudyWords() {
    let n = 0;
    if (window.ChineseApp && ChineseApp.masteredCount) n += ChineseApp.masteredCount();
    if (window.EnglishApp && EnglishApp.masteredCount) n += EnglishApp.masteredCount();
    return n;
  }

  function isLetterUnlocked(letter) {
    if (state.level < letter.unlockLevel) return false;
    if (letter.reqHugs && (state.hugCount || 0) < letter.reqHugs) return false;
    if (letter.reqDecor && (state.ownedDecor || []).length < letter.reqDecor && state.level < 22) return false;
    if (letter.reqJars && (state.jarReads || 0) < letter.reqJars) return false;
    return true;
  }

  function checkAchievements() {
    const mastered = masteredStudyWords();
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
      nonla_75: state.bestNonla >= 75,
      meet_set: Boolean(state.nextMeetDate),
      visit_7: (state.visitDays || 0) >= 7,
      mood_7: Object.keys(state.moodLog || {}).length >= 7,
      daily_q_7: Object.keys(state.dailyAnswers || {}).length >= 7,
      photo_3: (window.PhotoWall ? PhotoWall.count() : 0) >= 3,
      wardrobe_first: state.ownedOutfits.length >= 1,
      wardrobe_trio: ["ngoc", "khanh", "bong"].every((who) => state.wornOutfits && state.wornOutfits[who]),
      plant_bloom: (state.visitDays || 0) >= DATA.plantStages[DATA.plantStages.length - 1].days,
      wardrobe_all: DATA.outfits.every((o) => state.ownedOutfits.includes(o.id)),
      study_days_7: (state.studyDays || 0) >= 7,
      study_days_30: (state.studyDays || 0) >= 30,
      words_50: mastered >= 50,
      words_200: mastered >= 200,
      perfect_cloze: state.studyFeats.includes("perfect_cloze"),
      perfect_listen: state.studyFeats.includes("perfect_listen"),
      perfect_tone: state.studyFeats.includes("perfect_tone"),
      review_clear: state.studyFeats.includes("review_clear")
    };

    let newlyUnlocked = false;
    let toastSlot = 0;
    DATA.achievements.forEach((ach) => {
      if (checks[ach.id] && !state.unlockedAchieve.includes(ach.id)) {
        state.unlockedAchieve.push(ach.id);
        state.candy += ach.reward;
        newlyUnlocked = true;
        // Toasts replace each other, so space simultaneous unlocks out instead of showing only the last one.
        setTimeout(() => {
          showToast(`🏆 Thành tựu: ${ach.name} (+${ach.reward} 🍬)`);
        }, 450 + toastSlot * 3000);
        toastSlot++;
      }
    });

    if (newlyUnlocked) {
      saveState();
    }
  }

  function getActiveSpecialDay() {
    return window.SpecialDays.getActive();
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
      const tet = window.Amlich.getTetInfo(now);
      // 23-30 thang Chap still carry the old lunar year; use the year the Tet falls in so the whole window is one key.
      claimYear = (tet.lunarMonth === 12 ? tet.lunarYear + 1 : tet.lunarYear) || claimYear;
    }
    const claimKey = `${key}_${claimYear}`;
    if (!state.claimedBirthdays.includes(claimKey)) {
      state.claimedBirthdays.push(claimKey);
      addRewards(ev.xp || 25, ev.giftCandy);
      AudioManager.playPowerup();
      RoomScene.triggerKhanhHappy("happy");
      RoomScene.triggerBongHappy();
      const speechText = ev.speech.replace("{days}", String(getDaysTogether()));
      showSpeech(ev.speaker || "Anh Khánh", speechText);
      showToast(`${ev.giftLabel || "🎁 Quà"}: +${ev.giftCandy} 🍬!`);
    }
  }

  // Days until the next meeting (0 = today), or null when no future date is set.
  function getMeetDays() {
    return window.SpecialDays.daysUntil(state.nextMeetDate);
  }

  function meetCountdownLabel(days) {
    if (days === 0) return "💕 Hôm nay gặp nhau!";
    if (days === 1) return "📅 Mai gặp nhau rồi!";
    return `📅 Còn ${days} ngày gặp nhau`;
  }

  // Meeting day: Khánh greets once (no candy — the date is player-set, so it must not become a reward door).
  function checkMeetDay() {
    if (getMeetDays() !== 0 || state.meetGreetedDate === state.nextMeetDate) return;
    state.meetGreetedDate = state.nextMeetDate;
    saveState();
    RoomScene.triggerKhanhHappy("happy");
    RoomScene.triggerBongHappy();
    showSpeech("Anh Khánh 💕", DATA.meetLines.greeting);
  }

  // Shared plant: stage from visitDays (GAME_DATA.plantStages); Khánh says how far it is from the next stage.
  function speakPlant() {
    const stages = DATA.plantStages;
    const days = state.visitDays || 0;
    let idx = 0;
    stages.forEach((st, i) => { if (days >= st.days) idx = i; });
    let text;
    if (getActiveSpecialDay() === "anniversary") {
      text = `Hôm nay 11/02 nên cây của hai đứa nở hoa hết cỡ luôn nè 🌸 Em đã ghé thăm ${days} ngày rồi đó!`;
    } else if (idx === stages.length - 1) {
      text = `Cây của hai đứa nở hoa rồi nè 🌸 Em đã ghé thăm ${days} ngày, cảm ơn em chăm nó nha!`;
    } else {
      const next = stages[idx + 1];
      text = `Cây của hai đứa đang là ${stages[idx].name} 🌱 Em đã ghé ${days} ngày, thêm ${next.days - days} ngày nữa là thành ${next.name} nha!`;
    }
    showSpeech("Anh Khánh 🌱", text);
  }

  function speakMeetCountdown() {
    const days = getMeetDays();
    if (days === null) {
      showToast("📅 Đặt ngày gặp nhau tiếp theo để lịch đếm ngược nha!");
      openModal("modalSettings");
      return;
    }
    const lines = DATA.meetLines;
    const list = days === 0 ? lines.today : (days === 1 ? lines.tomorrow : (days <= 7 ? lines.soon : lines.far));
    showSpeech("Anh Khánh 📅", pickRandom(list).item.replace("{days}", String(days)));
  }

  function updateGreetingBanner() {
    if (getMeetDays() === 0) {
      document.getElementById("greetingBanner").textContent = DATA.meetLines.banner;
      return;
    }
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
    const meetDays = getMeetDays();
    const meetEl = document.getElementById("meetCountdownText");
    meetEl.classList.toggle("hidden", meetDays === null);
    if (meetDays !== null) meetEl.textContent = meetCountdownLabel(meetDays);

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

  }

  // Daily Reset & Quests Management
  function syncDailyReset() {
    const todayStr = new Date().toDateString();
    let changed = false;
    const visitKey = window.SpecialDays.localDateKey();
    const newVisit = state.lastVisitDate !== visitKey;
    if (newVisit) {
      state.lastVisitDate = visitKey;
      state.visitDays = (state.visitDays || 0) + 1;
      changed = true;
    }
    if (state.freeMealsDate !== todayStr) {
      state.freeMealsDate = todayStr;
      state.freeMealsLeft = 3;
      changed = true;
    }
    if (!state.dailyInteractions || state.dailyInteractions.date !== todayStr) {
      state.dailyInteractions = { ...DEFAULT_STATE.dailyInteractions, date: todayStr };
      changed = true;
    }
    if (!state.dailyStudy || state.dailyStudy.date !== todayStr) {
      state.dailyStudy = { date: todayStr, count: 0 };
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
    if (newVisit) checkAchievements(); // visit_7 / plant_bloom have no addRewards path
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
        btnClaim.className = "btn-claim-quests claimed";
        btnClaim.disabled = true;
      } else if (allDone) {
        btnClaim.textContent = "✨ Nhận Thưởng Ngay";
        btnClaim.className = "btn-claim-quests ready";
        btnClaim.disabled = false;
      } else {
        const count = (q.hugDone ? 1 : 0) + (q.feedDone ? 1 : 0) + (q.gameDone ? 1 : 0);
        btnClaim.textContent = `Chưa Hoàn Thành (${count}/3)`;
        btnClaim.className = "btn-claim-quests incomplete";
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
    addRewards(35, 25);
    saveState();
    renderHUD();
    renderQuestsModal();
    updateQuestDot();
    AudioManager.playLevelUp();
    showToast("🎉 Đã nhận thưởng ngày: +25 🍬 & +35 XP!");
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

  // Wardrobe tab of the shop: buy an outfit (it is put on right away), then wear / take it off any time.
  const WARDROBE_GROUPS = [["ngoc", "👧 Ngọc"], ["khanh", "👦 Anh Khánh"], ["bong", "🐱 Bé Bông"]];
  function renderWardrobe() {
    const list = document.getElementById("wardrobeList");
    list.innerHTML = "";
    document.getElementById("shopCandyText").textContent = state.candy;
    WARDROBE_GROUPS.forEach(([who, label]) => {
      const head = document.createElement("div");
      head.className = "wardrobe-group";
      head.textContent = label;
      list.appendChild(head);
      DATA.outfits.filter((o) => o.who === who).forEach((item) => {
        const owned = state.ownedOutfits.includes(item.id);
        const worn = state.wornOutfits[who] === item.id;
        const row = document.createElement("div");
        row.className = "shop-row";
        let btnHtml;
        if (!owned) {
          btnHtml = `<button class="pixel-btn btn-gold btn-sm" data-buy-outfit="${item.id}" ${state.candy < item.price ? "disabled" : ""}>Mua ${item.price} 🍬</button>`;
        } else {
          btnHtml = `<button class="pixel-btn ${worn ? "btn-pink" : "btn-cream"} btn-sm" data-wear="${item.id}">${worn ? "Đang mặc ✓" : "Mặc"}</button>`;
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
    });

    list.querySelectorAll("[data-buy-outfit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = DATA.outfits.find((o) => o.id === btn.dataset.buyOutfit);
        if (!item || state.candy < item.price || state.ownedOutfits.includes(item.id)) return;
        state.candy -= item.price;
        state.ownedOutfits.push(item.id);
        state.wornOutfits[item.who] = item.id;
        AudioManager.playLevelUp();
        showToast(`👗 Đã sắm ${item.name}, mặc vào luôn rồi nè!`);
        addRewards(12, 0);
        renderWardrobe();
      });
    });
    list.querySelectorAll("[data-wear]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = DATA.outfits.find((o) => o.id === btn.dataset.wear);
        if (!item) return;
        AudioManager.playClick();
        // Tapping the worn one takes it off (back to the default clothes)
        state.wornOutfits[item.who] = state.wornOutfits[item.who] === item.id ? "" : item.id;
        saveState();
        checkAchievements(); // wardrobe_trio
        renderWardrobe();
      });
    });
  }

  function showShopTab(tab) {
    document.querySelectorAll("[data-shop-tab]").forEach((b) => b.classList.toggle("active", b.dataset.shopTab === tab));
    document.getElementById("shopList").classList.toggle("hidden", tab !== "decor");
    document.getElementById("wardrobeList").classList.toggle("hidden", tab !== "wardrobe");
    if (tab === "wardrobe") renderWardrobe();
    else renderShop();
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
        if (letter.reqDecor && (state.ownedDecor || []).length < letter.reqDecor && state.level < 22) {
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
    state.moodLog[window.SpecialDays.localDateKey()] = jarKey;
    pruneDateMap(state.moodLog);
    renderMoodStrip();

    // Cap lives in saved state (not a JS variable) so reloading the page cannot reset it.
    syncDailyReset();
    const di = state.dailyInteractions;
    if (di.jarReads < 3) {
      di.jarReads++;
      addRewards(6, 2);
    } else {
      addRewards(0, 0); // still saves jarReads for the letter unlock
    }
  }

  // Keep only the newest 90 days of a "YYYY-MM-DD" -> value map so the save stays small.
  function pruneDateMap(map, keep = 90) {
    Object.keys(map).sort().slice(0, -keep).forEach((k) => delete map[k]);
  }

  // Mood check-in: the jar picked each day, shown as a 14-day strip under the jars.
  const MOOD_EMOJI = { miss: "💕", tired: "☁️", sad: "🌧️", playful: "😜" };
  function renderMoodStrip() {
    const strip = document.getElementById("moodStrip");
    strip.textContent = "";
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const mood = state.moodLog[window.SpecialDays.localDateKey(d)];
      const cell = document.createElement("span");
      cell.className = `mood-cell${i === 0 ? " today" : ""}`;
      cell.textContent = MOOD_EMOJI[mood] || "·";
      cell.title = `${d.getDate()}/${d.getMonth() + 1}`;
      strip.appendChild(cell);
    }
  }

  // "Câu hỏi hôm nay": the same question all day, answer kept on this device, shareable to Khánh (Zalo etc.).
  function getTodayQuestionIndex() {
    const t = new Date();
    const dayNumber = Math.floor(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 86400000);
    return dayNumber % DATA.dailyQuestions.length;
  }

  function renderDailyQuestion() {
    const key = window.SpecialDays.localDateKey();
    const saved = state.dailyAnswers[key];
    const qIdx = saved ? saved.q : getTodayQuestionIndex();
    document.getElementById("dailyQText").textContent = DATA.dailyQuestions[qIdx] || DATA.dailyQuestions[0];
    const input = document.getElementById("dailyQAnswer");
    if (document.activeElement !== input) input.value = saved ? saved.text : "";
    document.getElementById("dailyQStatus").textContent = saved ? "✔ Đã lưu câu trả lời hôm nay" : "+6 XP, +3 🍬 cho câu trả lời đầu tiên mỗi ngày";

    const past = Object.keys(state.dailyAnswers).filter((k) => k !== key).sort().reverse().slice(0, 30);
    document.getElementById("dailyQHistoryCount").textContent = String(past.length);
    document.getElementById("dailyQHistoryWrap").classList.toggle("hidden", past.length === 0);
    const list = document.getElementById("dailyQHistory");
    list.textContent = "";
    past.forEach((k) => {
      const a = state.dailyAnswers[k];
      const item = document.createElement("div");
      item.className = "daily-q-past";
      const [y, m, d] = k.split("-");
      const head = document.createElement("div");
      head.className = "daily-q-past-q";
      head.textContent = `${Number(d)}/${Number(m)}/${y} — ${DATA.dailyQuestions[a.q] || ""}`;
      const body = document.createElement("div");
      body.className = "daily-q-past-a";
      body.textContent = a.text;
      item.append(head, body);
      list.appendChild(item);
    });
  }

  // Saves today's answer; the first answer of the day (≥ 5 characters) pays +6 XP, +1 candy. Returns false if too short.
  function saveDailyAnswer() {
    const text = document.getElementById("dailyQAnswer").value.trim();
    if (text.length < 5) {
      showToast("✏️ Em viết thêm chút nữa nha (ít nhất 5 chữ cái)!");
      return false;
    }
    const key = window.SpecialDays.localDateKey();
    const first = !state.dailyAnswers[key];
    const q = first ? getTodayQuestionIndex() : state.dailyAnswers[key].q;
    state.dailyAnswers[key] = { q, text };
    pruneDateMap(state.dailyAnswers);
    if (first) {
      addRewards(6, 3);
      AudioManager.playPowerup();
    } else {
      saveState();
    }
    renderDailyQuestion();
    // Khánh's reply goes in the card: the room's speech bubble sits under the modal and was never seen
    if (first) document.getElementById("dailyQStatus").textContent = `💌 Anh Khánh: ${pickRandom(DATA.dailyQuestionReplies).item}`;
    return true;
  }

  // Phones get the OS share sheet; desktops (and webviews whose share sheet never opens) copy instead.
  function canNativeShare() {
    return typeof navigator.share === "function" && window.matchMedia("(pointer: coarse)").matches;
  }

  async function copyShareText() {
    const box = document.getElementById("dailyQShareText");
    try {
      await navigator.clipboard.writeText(box.value);
      showToast("📋 Đã chép tin nhắn, mở Zalo dán gửi anh nha!");
      return;
    } catch {
      // Older webviews: select the text and try the legacy copy command
    }
    box.focus();
    box.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    showToast(copied ? "📋 Đã chép tin nhắn, mở Zalo dán gửi anh nha!" : "Em bấm giữ vào khung chữ rồi chọn Sao chép nha 🙏");
  }

  async function nativeShare() {
    try {
      await navigator.share({ text: document.getElementById("dailyQShareText").value });
      showToast("💌 Chia sẻ xong rồi nè!");
    } catch (e) {
      if (e && e.name === "AbortError") return; // she closed the share sheet; the message box stays open
      await copyShareText();
    }
  }

  // Every tap shows the message box (with Chép / Chia sẻ), so the button never looks dead.
  function shareDailyAnswer() {
    if (!saveDailyAnswer()) return;
    const a = state.dailyAnswers[window.SpecialDays.localDateKey()];
    document.getElementById("dailyQShareText").value = `💭 Câu hỏi hôm nay: ${DATA.dailyQuestions[a.q]}\n💌 Ngọc trả lời: ${a.text}`;
    document.getElementById("dailyQSharePanel").classList.remove("hidden");
    document.getElementById("btnNativeShareDailyQ").classList.toggle("hidden", !canNativeShare());
    if (canNativeShare()) nativeShare();
    else copyShareText();
  }

  // Room & Character Interactions (Strict Anti-Spam & Daily Rested Limit)
  let lastHugTime = 0;

  function handleHug() {
    AudioManager.playHug();
    RoomScene.triggerKhanhHappy("happy");
    if (RoomScene.triggerHug) RoomScene.triggerHug(); // Ngọc runs over and hugs Khánh
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
      addRewards(12, 3);
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
        addRewards(4, 1);
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
      addRewards(10, 3);
    } else if (pCount < 3) {
      if (elapsed > 60000) {
        state.dailyInteractions.petCount++;
        lastPetTime = now;
        saveState();
        speech = pickRandom(DATA.bongDialogues).item;
        addRewards(3, 1);
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
  RoomScene.init(
    document.getElementById("roomCanvas"),
    () => state,
    (who) => {
      if (who === "khanh") {
        AudioManager.playClick();
        const specialDay = getActiveSpecialDay();
        const ev = specialDay && DATA.specialDays ? DATA.specialDays[specialDay] : null;
        if (ev && ev.quotes && ev.quotes.length) {
          const { item } = pickRandom(ev.quotes);
          showSpeech(ev.speaker || "Anh Khánh", item);
        } else {
          const { item } = pickRandom(DATA.khanhDialogues);
          showSpeech("Anh Khánh", item);
        }
        // Max 5 rewarded chats a day, at least 60s apart; extra taps are just for fun (no XP spam).
        syncDailyReset();
        const di = state.dailyInteractions;
        const now = Date.now();
        if (di.talkCount < 5 && now - (di.lastTalkAt || 0) > 60000) {
          di.talkCount++;
          di.lastTalkAt = now;
          addRewards(6, 2);
        }
      } else if (who === "bong") {
        handlePetBong();
      } else if (who === "ngoc") {
        // Just affection: no XP/candy (hug/pet already carry the daily rewards)
        AudioManager.playClick();
        showSpeech("Anh Khánh 💕", pickRandom(DATA.ngocCompliments || ["Em xinh lắm đó! 💕"]).item);
      } else if (who === "photos") {
        AudioManager.playClick();
        if (window.PhotoWall) PhotoWall.open();
      } else if (who === "plant") {
        AudioManager.playClick();
        speakPlant();
      } else if (who === "calendar") {
        AudioManager.playClick();
        speakMeetCountdown();
      } else if (who === "mck_vinyl") {
        AudioManager.playVinylChill();
        const vinylQuotes = [
          "Đang bật Album 99% MCK cực chill cho em nghe cùng nè 💕",
          "'Chìm Sâu' cùng em mỗi ngày là điều tuyệt vời nhất của anh 💖",
          "Nghe nhạc cùng bé Ngọc thì bài nào cũng thành tình ca ngọt ngào ✨",
          "Giai điệu 99% này là dành riêng cho công chúa Sún đó nha 🎶",
          "Baby gọi cho anh mỗi khi em thấy không vui... có anh đây rồi! 💕"
        ];
        const { item } = pickRandom(vinylQuotes);
        showSpeech("Anh Khánh 🎵", item);
        syncDailyReset();
        if (state.dailyInteractions.vinylCount < 3) {
          state.dailyInteractions.vinylCount++;
          addRewards(2, 0);
        }
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

  // Default: every running game is *suspended* (run kept, resumable from the overlay). forceStop ends them.
  function stopAllGames(forceStop = false) {
    const games = [MiniGame, CrossingGame, FlappyGame, NonLaGame, window.MemoryGame].filter(Boolean);
    games.forEach((g) => {
      if (forceStop) g.stop();
      else if (g.isRunning()) g.suspend();
    });
  }

  function isPausedRun(mod) {
    return Boolean(mod && mod.isRunning() && mod.isPaused && mod.isPaused());
  }

  // Per-game payout limits (see handleArcadeGameOver). HUD mirrors the cap so players are not promised more than they get.
  const ARCADE_MAX_CANDY = 4;
  const ARCADE_MIN_SCORE_FOR_REWARD = 10;
  // Candy from mini-games per local day (saved in dailyInteractions, so reloading can't reset it). XP keeps flowing.
  const ARCADE_DAILY_CANDY = 45;

  function arcadeCandyLeft() {
    syncDailyReset();
    return Math.max(0, ARCADE_DAILY_CANDY - (state.dailyInteractions.arcadeCandy || 0));
  }

  function renderArcadeCandyLeft() {
    const left = arcadeCandyLeft();
    document.getElementById("arcadeCandyLeft").textContent = left > 0
      ? `🍬 Kẹo từ game hôm nay: còn ${left}/${ARCADE_DAILY_CANDY}`
      : `🍬 Hôm nay đã nhận đủ ${ARCADE_DAILY_CANDY} kẹo từ game, vẫn chơi được để lấy thân mật & kỷ lục nha`;
  }

  function handleArcadeHud({ score, candies, lives, livesText }) {
    document.getElementById("mgScore").textContent = score;
    document.getElementById("mgCandy").textContent = Math.min(ARCADE_MAX_CANDY, candies);
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

    // Candies capped 0-4 per run (+1 bonus if new best), XP 2-5; ARCADE_DAILY_CANDY caps the day.
    // Runs below ARCADE_MIN_SCORE_FOR_REWARD pay nothing, so dying instantly cannot be farmed for XP.
    const rewarded = score >= ARCADE_MIN_SCORE_FOR_REWARD;
    let finalCandies = rewarded ? Math.max(0, Math.min(ARCADE_MAX_CANDY, candies || 0)) : 0;
    if (isNewBest && rewarded) finalCandies = Math.min(ARCADE_MAX_CANDY + 1, finalCandies + 1);
    const earnedCandies = finalCandies;
    finalCandies = Math.min(finalCandies, arcadeCandyLeft());
    state.dailyInteractions.arcadeCandy = (state.dailyInteractions.arcadeCandy || 0) + finalCandies;
    const xpEarned = rewarded ? Math.max(2, Math.min(5, Math.floor(score / 35))) : 0;
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
      ${earnedCandies > finalCandies ? `<br /><small>Hôm nay kẹo từ game đã đủ ${ARCADE_DAILY_CANDY} 🍬, mai chơi tiếp nha!</small>` : ""}
    `;
    resultBox.classList.remove("hidden");
    const restartBtn = document.getElementById("btnRestartMiniGame");
    if (restartBtn) restartBtn.classList.add("hidden");
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

  function setHeardText(text) {
    const box = document.getElementById("nonlaHeardBox");
    box.textContent = "Nghe thấy: ";
    const em = document.createElement("em");
    em.textContent = text || "...";
    box.appendChild(em);
  }

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
      setHeardText(lastHeard);
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
      setHeardText(text);
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
    stopAllGames(false);
    document.getElementById("bestCatchText").textContent = `Kỷ lục: ${state.bestScore}`;
    document.getElementById("bestCrossingText").textContent = `Kỷ lục: ${state.bestCrossing}`;
    document.getElementById("bestFlappyText").textContent = `Kỷ lục: ${state.bestFlappy}`;
    document.getElementById("bestNonlaText").textContent = `Kỷ lục: ${state.bestNonla}`;
    const bestMemEl = document.getElementById("bestMemoryText");
    if (bestMemEl) bestMemEl.textContent = `Kỷ lục: ${state.bestMemory || 0}`;
    document.getElementById("arcadeTitle").textContent = "🎮 Vườn Trẻ Kim Đồng";
    renderArcadeCandyLeft();
    document.getElementById("btnBackArcade").classList.add("hidden");
    document.getElementById("arcadeMenu").classList.remove("hidden");
    document.getElementById("arcadeStage").classList.add("hidden");
  }

  function openArcadeGame(gameKey) {
    activeGameKey = gameKey;
    const meta = ARCADE_META[gameKey];
    stopAllGames(false);

    document.getElementById("arcadeTitle").textContent = meta.title;
    document.getElementById("btnBackArcade").classList.remove("hidden");
    document.getElementById("arcadeMenu").classList.add("hidden");
    document.getElementById("arcadeStage").classList.remove("hidden");

    const isNonLaPaused = gameKey === "nonla" && NonLaGame.isPaused() && NonLaGame.isRunning();
    const isMemoryPaused = gameKey === "memory" && window.MemoryGame && MemoryGame.isPaused() && MemoryGame.isRunning();
    const restartBtn = document.getElementById("btnRestartMiniGame");

    if (isNonLaPaused) {
      if (NonLaGame.drawPausedPreview) NonLaGame.drawPausedPreview();
      document.getElementById("mgBest").textContent = state[meta.bestKey];
      document.getElementById("mgScore").textContent = NonLaGame.getScore();
      document.getElementById("mgCandy").textContent = Math.min(ARCADE_MAX_CANDY, NonLaGame.getCandies());
      document.getElementById("mgLives").textContent = "❤️".repeat(Math.max(1, NonLaGame.getLives()));
      document.getElementById("mgResultBox").classList.add("hidden");
      document.getElementById("mgOverlayTitle").textContent = "⏸ Ván Đang Tạm Dừng";
      document.getElementById("mgOverlayDesc").innerHTML = `Em đang tạm dừng ván này ở <strong>${NonLaGame.getScore()} điểm</strong> (còn ${NonLaGame.getLives()} mạng).<br />Bấm nút dưới để tiếp tục chơi ngay nhé!`;
      document.getElementById("mgTouchHint").textContent = meta.hint;
      document.getElementById("btnStartMiniGame").textContent = "▶ Tiếp Tục Chơi";
      if (restartBtn) restartBtn.classList.remove("hidden");
    } else if (gameKey !== "nonla" && gameKey !== "memory" && isPausedRun(meta.mod())) {
      // Catch / Crossing / Flappy: generic paused overlay from the game's own HUD snapshot.
      const mod = meta.mod();
      mod.drawPausedPreview();
      handleArcadeHud(mod.getHud());
      document.getElementById("mgBest").textContent = state[meta.bestKey];
      document.getElementById("mgResultBox").classList.add("hidden");
      document.getElementById("mgOverlayTitle").textContent = "⏸ Ván Đang Tạm Dừng";
      document.getElementById("mgOverlayDesc").innerHTML = `Em đang tạm dừng ván này ở <strong>${mod.getHud().score} điểm</strong>.<br />Bấm nút dưới để chơi tiếp nhé!`;
      document.getElementById("mgTouchHint").textContent = meta.hint;
      document.getElementById("btnStartMiniGame").textContent = "▶ Tiếp Tục Chơi";
      if (restartBtn) restartBtn.classList.remove("hidden");
    } else if (isMemoryPaused) {
      if (MemoryGame.drawPausedPreview) MemoryGame.drawPausedPreview();
      document.getElementById("mgBest").textContent = state[meta.bestKey];
      document.getElementById("mgScore").textContent = MemoryGame.getScore();
      document.getElementById("mgCandy").textContent = Math.min(ARCADE_MAX_CANDY, MemoryGame.getCandies());
      document.getElementById("mgLives").textContent = `${MemoryGame.getTurnsLeft()} lượt`;
      document.getElementById("mgResultBox").classList.add("hidden");
      document.getElementById("mgOverlayTitle").textContent = "⏸ Ván Đang Tạm Dừng";
      document.getElementById("mgOverlayDesc").innerHTML = `Em đang tạm dừng ở <strong>${MemoryGame.getPairsFound()}/8 cặp</strong> (còn ${MemoryGame.getTurnsLeft()} lượt lật).<br />Bấm nút dưới để tiếp tục giải mã nhé!`;
      document.getElementById("mgTouchHint").textContent = meta.hint;
      document.getElementById("btnStartMiniGame").textContent = "▶ Tiếp Tục Chơi";
      if (restartBtn) restartBtn.classList.remove("hidden");
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
      if (restartBtn) restartBtn.classList.add("hidden");
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

  const audioIconEl = document.getElementById("audioIcon");
  if (audioIconEl && window.AudioManager) {
    audioIconEl.textContent = AudioManager.isEnabled() ? "🔊" : "🔇";
  }

  document.getElementById("btnAudio").addEventListener("click", () => {
    const on = AudioManager.toggle();
    if (audioIconEl) audioIconEl.textContent = on ? "🔊" : "🔇";
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
    const restartBtn = document.getElementById("btnRestartMiniGame");
    if (restartBtn) restartBtn.classList.add("hidden");

    const mod = ARCADE_META[activeGameKey].mod();
    if (isPausedRun(mod)) {
      mod.resume();
    } else {
      mod.start();
    }
  });

  const btnRestartMiniGame = document.getElementById("btnRestartMiniGame");
  if (btnRestartMiniGame) {
    btnRestartMiniGame.addEventListener("click", () => {
      AudioManager.playClick();
      document.getElementById("mgOverlay").classList.add("hidden");
      btnRestartMiniGame.classList.add("hidden");
      const mod = ARCADE_META[activeGameKey].mod();
      mod.stop();
      mod.start();
    });
  }

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
  document.getElementById("navJars").addEventListener("click", () => {
    document.getElementById("dailyQSharePanel").classList.add("hidden");
    renderDailyQuestion();
    renderMoodStrip();
    openModal("modalJars");
  });
  document.getElementById("btnSaveDailyQ").addEventListener("click", () => {
    if (saveDailyAnswer()) showToast("💾 Đã lưu câu trả lời hôm nay!");
  });
  document.getElementById("btnShareDailyQ").addEventListener("click", shareDailyAnswer);
  document.getElementById("btnCopyDailyQ").addEventListener("click", copyShareText);
  document.getElementById("btnNativeShareDailyQ").addEventListener("click", nativeShare);
  document.getElementById("navShop").addEventListener("click", () => {
    showShopTab("decor");
    openModal("modalShop");
  });
  document.querySelectorAll("[data-shop-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      AudioManager.playClick();
      showShopTab(btn.dataset.shopTab);
    });
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

  // Next meeting date (wall calendar + HUD countdown)
  const meetInput = document.getElementById("meetDateInput");
  function syncMeetInput() {
    meetInput.min = window.SpecialDays.localDateKey();
    meetInput.value = getMeetDays() === null ? "" : state.nextMeetDate;
  }
  syncMeetInput();
  document.getElementById("btnSettings").addEventListener("click", syncMeetInput);
  document.getElementById("btnSaveMeetDate").addEventListener("click", () => {
    const value = meetInput.value;
    const days = window.SpecialDays.daysUntil(value);
    if (days === null) {
      showToast(value ? "📅 Chọn ngày từ hôm nay trở đi nha!" : "📅 Em chọn ngày gặp trước đã nha!");
      return;
    }
    state.nextMeetDate = value;
    saveState();
    checkAchievements(); // meet_set
    AudioManager.playClick();
    renderHUD();
    updateGreetingBanner();
    showToast(days === 0 ? "💕 Hôm nay gặp nhau luôn!" : `📅 Đã treo lịch: còn ${days} ngày nữa gặp nhau!`);
    checkMeetDay();
  });
  document.getElementById("btnClearMeetDate").addEventListener("click", () => {
    state.nextMeetDate = "";
    saveState();
    syncMeetInput();
    renderHUD();
    updateGreetingBanner();
    showToast("Đã gỡ ngày gặp khỏi lịch.");
  });

  // One "Ngoại Ngữ" tile opens whichever language was used last (default Chinese); the pill bar inside each
  // study modal switches to the other language.
  const STUDY_LANG_KEY = "hu_keo_study_lang";
  const rememberStudyLang = (lang) => {
    try {
      localStorage.setItem(STUDY_LANG_KEY, lang);
    } catch {
      // storage unavailable: just default to Chinese next time
    }
  };
  const lastStudyLang = () => {
    try {
      return localStorage.getItem(STUDY_LANG_KEY) === "en" ? "en" : "zh";
    } catch {
      return "zh";
    }
  };

  const handleOpenChinese = () => {
    AudioManager.playClick();
    rememberStudyLang("zh");
    if (window.ChineseApp) {
      ChineseApp.open();
    } else {
      openModal("modalChinese");
    }
  };
  const btnChinese = document.getElementById("btnChinese");
  if (btnChinese) btnChinese.addEventListener("click", handleOpenChinese);

  const handleOpenEnglish = () => {
    AudioManager.playClick();
    rememberStudyLang("en");
    if (window.EnglishApp) {
      EnglishApp.open();
    } else {
      openModal("modalEnglish");
    }
  };
  const btnQuickStudy = document.getElementById("btnQuickStudy");
  if (btnQuickStudy) {
    btnQuickStudy.addEventListener("click", () => {
      if (lastStudyLang() === "en") handleOpenEnglish();
      else handleOpenChinese();
    });
  }

  // Cross-language modal switchers
  const btnChineseToEnglish = document.getElementById("btnChineseToEnglish");
  if (btnChineseToEnglish) {
    btnChineseToEnglish.addEventListener("click", () => {
      AudioManager.playClick();
      closeModal("modalChinese");
      handleOpenEnglish();
    });
  }

  const btnEnglishToChinese = document.getElementById("btnEnglishToChinese");
  if (btnEnglishToChinese) {
    btnEnglishToChinese.addEventListener("click", () => {
      AudioManager.playClick();
      closeModal("modalEnglish");
      handleOpenChinese();
    });
  }

  // Close buttons & backdrop click
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll(".modal-backdrop").forEach((bd) => {
    bd.addEventListener("click", (e) => {
      if (e.target === bd) {
        closeModal(bd.id); // same cleanup as the ✕ button (stop games / speech)
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
    return normalizeState(parsed);
  }

  function isInAppBrowser() {
    const ua = navigator.userAgent || "";
    return /Zalo|FBAN|FBAV|Messenger|Instagram|Line|; wv\)/i.test(ua);
  }

  document.getElementById("btnCopySave").addEventListener("click", async () => {
    AudioManager.playClick();
    state.lastBackupAt = Date.now(); // stops the backup reminder for a week
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
      state = freshDefaults();
      saveState();
      renderHUD();
      updateGreetingBanner();
      closeModal("modalSettings");
      showToast("Đã đặt lại từ đầu!");
    }
  });

  // Ensure save flushes & mic releases cleanly when leaving, switching apps, or locking iPhone!
  function handleAppExitOrHide() {
    saveState();
    const modal = document.getElementById("modalMiniGame");
    const stage = document.getElementById("arcadeStage");
    const gameWasRunning =
      MiniGame.isRunning() ||
      CrossingGame.isRunning() ||
      FlappyGame.isRunning() ||
      NonLaGame.isRunning() ||
      Boolean(window.MemoryGame && MemoryGame.isRunning());
    stopAllGames();
    // Catch/Crossing/Flappy get stopped and Memory/Non La suspended; without an overlay the player returns to a frozen
    // canvas with no button. openArcadeGame() shows the paused-resume overlay or a fresh-start overlay as appropriate.
    if (gameWasRunning && modal && !modal.classList.contains("hidden") && stage && !stage.classList.contains("hidden")) {
      openArcadeGame(activeGameKey);
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

  // Save-data protection. Everything lives in localStorage; Safari (not added to Home Screen) may wipe it after ~7 days
  // without a visit, and any browser may evict it under storage pressure.
  function isInstalledApp() {
    return Boolean(window.navigator.standalone) ||
      Boolean(window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);
  }

  async function requestPersistentStorage() {
    try {
      // Chrome/Edge/Safari decide silently; Firefox shows a permission prompt, so it is skipped there.
      if (!navigator.storage || !navigator.storage.persist || /Firefox\//.test(navigator.userAgent)) return;
      if (await navigator.storage.persisted()) return;
      await navigator.storage.persist();
    } catch {
      // not supported: the backup reminder below still helps
    }
  }

  // At most once a day, only for players with real progress, only outside the installed app,
  // and only if no backup code was copied in the last 7 days.
  function maybeRemindBackup() {
    if (isInstalledApp()) return;
    const hasProgress = state.level >= 2 || (state.ownedDecor || []).length > 0;
    if (!hasProgress) return;
    const today = new Date().toDateString();
    if (state.lastBackupReminder === today) return;
    if (Date.now() - (state.lastBackupAt || 0) < 7 * 24 * 60 * 60 * 1000) return;
    state.lastBackupReminder = today;
    saveState();
    setTimeout(() => {
      showToast("💾 Nhớ vào ⚙️ → Sao chép mã lưu (hoặc thêm game vào màn hình chính) để giữ tiến trình nha!");
    }, 4000);
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
        checkMeetDay();
      }
      if (window.WeatherEngine) {
        WeatherEngine.tryAutoLocate();
      }
    }
  }

  syncClockAndEvents();
  requestPersistentStorage();
  maybeRemindBackup();
  if (window.WeatherEngine) {
    WeatherEngine.init();
  }
  if (window.ChineseApp) {
    ChineseApp.init();
  }
  if (window.EnglishApp) {
    EnglishApp.init();
  }
  if (window.PhotoWall) {
    PhotoWall.init();
  }
  // Auto-switch decorations, banner & music right when crossing 00:00 into/out of special dates!
  setInterval(syncClockAndEvents, 5000);

  // Register offline-capable Service Worker for iPhone/Android Home Screen app experience
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
});
