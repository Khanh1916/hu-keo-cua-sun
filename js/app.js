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
    ownedDecor: [],
    placedDecor: [],
    unlockedAchieve: [],
    readLetters: [],
    hugCount: 0,
    petCount: 0,
    foodsFed: [],
    jarReads: 0,
    claimedBirthdays: [],
    timeOverride: "auto"
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
      return { ...DEFAULT_STATE, ...parsed };
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

  function xpNeededForLevel(lvl) {
    return 40 + (lvl - 1) * 25;
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
      showToast(`🎉 Lên Cấp ${state.level} thân mật! Tặng em iu +10 🍬`);
    }

    checkAchievements();
    saveState();
    renderHUD();
  }

  function isLetterUnlocked(letter) {
    if (letter.id === "letter_4" && state.ownedDecor.length >= DATA.decorItems.length) {
      return true;
    }
    return state.level >= letter.unlockLevel;
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
    const claimKey = `${key}_${now.getFullYear()}`;
    if (!state.claimedBirthdays.includes(claimKey)) {
      state.claimedBirthdays.push(claimKey);
      addRewards(key === "anniversary" ? 30 : 25, ev.giftCandy);
      AudioManager.playPowerup();
      RoomScene.triggerKhanhHappy("happy");
      RoomScene.triggerBongHappy();
      const speechText = ev.speech.replace("{days}", String(getDaysTogether()));
      showSpeech(key === "anniversary" ? "Anh Khánh 💕" : "Anh Khánh 🎂", speechText);
      showToast(`${key === "anniversary" ? "💕 Quà kỷ niệm" : "🎂 Quà sinh nhật"}: +${ev.giftCandy} 🍬!`);
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

    // Update time-mode active button
    document.querySelectorAll("#timeModes button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.time === state.timeOverride);
    });
  }

  // Render Food Tray
  function renderFoodGrid() {
    const grid = document.getElementById("foodGrid");
    grid.innerHTML = "";
    DATA.foods.forEach((food) => {
      const btn = document.createElement("button");
      btn.className = "food-item pixel-btn btn-cream";
      btn.innerHTML = `
        <span class="food-icon">${food.emoji}</span>
        <div class="food-info">
          <span class="food-name">${food.name}</span>
          <span class="food-bonus">+${food.xp} thân mật • +${food.candy} 🍬</span>
        </div>
      `;
      btn.addEventListener("click", () => {
        closeModal("modalFood");
        AudioManager.playHug();
        RoomScene.triggerKhanhHappy("eating");
        RoomScene.triggerBongHappy();
        showSpeech("Anh Khánh & Bé Bông", food.reaction);

        if (!state.foodsFed.includes(food.id)) {
          state.foodsFed.push(food.id);
        }
        addRewards(food.xp, food.candy);
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

      const row = document.createElement("div");
      row.className = `letter-row ${unlocked ? "" : "locked"}`;
      row.innerHTML = `
        <div class="item-left">
          <span class="item-emoji">${unlocked ? (isRead ? "📖" : "💌") : "🔒"}</span>
          <div class="item-meta">
            <span class="item-title">${letter.title}</span>
            <span class="item-desc">${unlocked ? (isRead ? "Đã đọc • Bấm để xem lại" : "Mới mở khóa! Chưa đọc") : letter.unlockDesc}</span>
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
    addRewards(4, 1);
  }

  // Room & Character Interactions
  function handleHug() {
    AudioManager.playHug();
    RoomScene.triggerKhanhHappy("happy");
    state.hugCount++;
    const lines = [
      "Ôm cái cho đỡ mệt nào. Hôm nay mọi chuyện ổn chứ em iu? 🤗",
      "Nạp xíu năng lượng rồi làm việc tiếp nha Ngọc ơi!",
      "Đứng yên anh ôm cái nào, lúc nào rảnh nhắn tin cho anh nha."
    ];
    const { item } = pickRandom(lines);
    showSpeech("Anh Khánh", item);
    addRewards(10, 2);
  }

  function handlePetBong() {
    AudioManager.playMeow();
    RoomScene.triggerBongHappy();
    state.petCount++;
    const { item } = pickRandom(DATA.bongDialogues);
    showSpeech("Bé Bông 🐱", item);
    addRewards(8, 2);
  }

  // Initialize Room Scene
  RoomScene.init(
    document.getElementById("roomCanvas"),
    () => state,
    (who) => {
      if (who === "khanh") {
        AudioManager.playClick();
        const { item } = pickRandom(DATA.khanhDialogues);
        showSpeech("Anh Khánh", item);
        addRewards(5, 1);
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
      title: "🍬 Hứng Kẹo & Quà Đất Cảng",
      overlayTitle: "Hứng Kẹo Cho Trẻ Hiểu Chuyện! 🍬",
      overlayDesc: `Hứng <strong>kẹo, tim, đồ ăn Hải Phòng</strong> và ăn <strong>Nam châm 🧲 / Khiên 🛡️</strong>! Combo 10 lần kích hoạt <strong>Cơn Mưa Kẹo x3</strong>!<br />Nhớ né <strong>cục cứt 💩</strong> kẻo mất mạng nhé 😂`,
      hint: "Chạm kéo 1 ngón tay siêu mượt • Combo 10 = Fever x3 ✨",
      bestKey: "bestScore",
      defaultLives: "❤️❤️❤️",
      mod: () => MiniGame
    },
    crossing: {
      title: "🚗 Qua Đường Đi Bông!",
      overlayTitle: "Bông Sang Đường Hải Phòng 🐱",
      overlayDesc: `Giúp bé Bông nhảy qua đường phố né xe, và nhảy lên <strong>thuyền gỗ</strong> để vượt sông Cảng!<br />Nhớ nhặt kẹo & tim dọc đường nhé.`,
      hint: "Vuốt lên/xuống/trái/phải trên màn hình, dùng nút D-pad bên dưới hoặc phím mũi tên!",
      bestKey: "bestCrossing",
      defaultLives: "🐱",
      mod: () => CrossingGame
    },
    flappy: {
      title: "🪽 Bay Qua Đất Cảng",
      overlayTitle: "Yên Tâm Không Lo, Bông Bay Mà! 🪽",
      overlayDesc: `Chạm màn hình (hoặc phím Space) để bé Bông vỗ cánh bay qua các cột hoa phượng đỏ.<br />Nhớ ăn thêm <strong>kẹo 🍬</strong> lơ lửng giữa khe nhé!`,
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
    }
  };

  function stopAllGames() {
    MiniGame.stop();
    CrossingGame.stop();
    FlappyGame.stop();
    NonLaGame.stop();
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

    const xpEarned = Math.max(8, Math.floor(score / 12));
    addRewards(xpEarned, candies);

    const overlay = document.getElementById("mgOverlay");
    const resultBox = document.getElementById("mgResultBox");
    document.getElementById("mgOverlayTitle").textContent = isNewBest
      ? "🎉 Kỷ Lục Mới Của Em Iu!"
      : "Xong Ván Rồi Nha! 💕";

    let descText = reason || "Em iu chơi giỏi lắm luôn!";
    if (gameKey === "catch") {
      descText = hitPoop
        ? "Ối giời ơi hứng nhầm cục cứt mất rồi 😂 Nhưng không sao, quà vẫn đầy túi nè:"
        : "Em iu chơi giỏi lắm luôn!";
    }
    document.getElementById("mgOverlayDesc").textContent = descText;

    resultBox.innerHTML = `
      Điểm số: <strong>${score}</strong> ${isNewBest ? "🏆" : ""}<br />
      Thu hoạch: <strong>+${candies} 🍬</strong> và <strong>+${xpEarned} thân mật</strong>!
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
    }
  });

  function showArcadeMenu() {
    stopAllGames();
    document.getElementById("bestCatchText").textContent = `Kỷ lục: ${state.bestScore}`;
    document.getElementById("bestCrossingText").textContent = `Kỷ lục: ${state.bestCrossing}`;
    document.getElementById("bestFlappyText").textContent = `Kỷ lục: ${state.bestFlappy}`;
    document.getElementById("bestNonlaText").textContent = `Kỷ lục: ${state.bestNonla}`;
    document.getElementById("arcadeTitle").textContent = "🎮 Khu Trò Chơi Đất Cảng";
    document.getElementById("btnBackArcade").classList.add("hidden");
    document.getElementById("arcadeMenu").classList.remove("hidden");
    document.getElementById("arcadeStage").classList.add("hidden");
  }

  function openArcadeGame(gameKey) {
    activeGameKey = gameKey;
    const meta = ARCADE_META[gameKey];
    stopAllGames();

    document.getElementById("arcadeTitle").textContent = meta.title;
    document.getElementById("btnBackArcade").classList.remove("hidden");
    document.getElementById("arcadeMenu").classList.add("hidden");
    document.getElementById("arcadeStage").classList.remove("hidden");

    document.getElementById("mgBest").textContent = state[meta.bestKey];
    document.getElementById("mgScore").textContent = "0";
    document.getElementById("mgCandy").textContent = "0";
    document.getElementById("mgLives").textContent = meta.defaultLives;
    document.getElementById("mgResultBox").classList.add("hidden");
    document.getElementById("mgOverlayTitle").textContent = meta.overlayTitle;
    document.getElementById("mgOverlayDesc").innerHTML = meta.overlayDesc;
    document.getElementById("mgTouchHint").textContent = meta.hint;
    document.getElementById("btnStartMiniGame").textContent = "Bắt Đầu Chơi!";
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
    AudioManager.playClick();
    document.getElementById("mgOverlay").classList.add("hidden");
    ARCADE_META[activeGameKey].mod().start();
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
  document.getElementById("btnToggleNonlaMode").addEventListener("click", () => {
    AudioManager.playClick();
    const next = NonLaGame.getMode() === "voice" ? "quiet" : "voice";
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
  document.getElementById("btnSettings").addEventListener("click", () => openModal("modalSettings"));

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

  // Ensure save flushes & mic releases cleanly when leaving or backgrounding on mobile (prevents iOS mic lock!)
  window.addEventListener("pagehide", () => {
    saveState();
    stopAllGames();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      saveState();
      if (NonLaGame.isRunning()) {
        NonLaGame.stop();
        document.getElementById("mgOverlay").classList.remove("hidden");
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

      syncMusicThemeForToday();
      updateGreetingBanner();
      renderHUD();
      if (dateChanged) {
        checkSpecialDayEvent();
      }
    }
  }

  syncClockAndEvents();
  // Auto-switch decorations, banner & music right when crossing 00:00 into/out of special dates!
  setInterval(syncClockAndEvents, 5000);
});
