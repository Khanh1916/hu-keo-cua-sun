window.NonLaGame = (() => {
  let canvas = null;
  let ctx = null;
  let rafId = null;
  let running = false;
  let frame = 0;
  let callbacks = {};

  // 3 Tiers of meaningful Vietnamese L-N phrases & classic tongue twisters
  const CHALLENGES = [
    // Tier 1: Ngắn, có nghĩa, dễ đọc
    { tier: 1, target: "nón lá", blank: "___ lá đội đầu", right: "Nón", wrong: "Lón", ngong: "lón ná" },
    { tier: 1, target: "lá non", blank: "___ non xanh mơn mởn", right: "Lá", wrong: "Ná", ngong: "ná lon" },
    { tier: 1, target: "nước lọc", blank: "___ lọc mát lạnh", right: "Nước", wrong: "Lước", ngong: "lước nọc" },
    { tier: 1, target: "lúa nếp", blank: "___ nếp thơm dẻo", right: "Lúa", wrong: "Núa", ngong: "núa lếp" },
    { tier: 1, target: "nồi niêu", blank: "___ niêu xoong chảo", right: "Nồi", wrong: "Lồi", ngong: "lồi liêu" },
    { tier: 1, target: "lòng lợn", blank: "___ lợn luộc chấm mắm", right: "Lòng", wrong: "Nòng", ngong: "nòng nợn" },
    { tier: 1, target: "no nê", blank: "Ăn uống ___ nê", right: "no", wrong: "lo", ngong: "lo lê" },
    { tier: 1, target: "nắng lên", blank: "___ lên rực rỡ", right: "Nắng", wrong: "Lắng", ngong: "lắng nên" },
    { tier: 1, target: "nấm lùn", blank: "Cây ___ lùn nhỏ xíu", right: "nấm", wrong: "lấm", ngong: "lấm nùn" },
    { tier: 1, target: "lạnh lùng", blank: "Thái độ ___ lùng", right: "lạnh", wrong: "nạnh", ngong: "nạnh nùng" },

    // Tier 2: Cụm từ & đồng dao kinh điển
    { tier: 2, target: "nói năng lưu loát", blank: "Nói năng ___ loát", right: "lưu", wrong: "nưu", ngong: "lói lăng nưu noát" },
    { tier: 2, target: "nồi đồng nấu ốc", blank: "Nồi đồng ___ ốc", right: "nấu", wrong: "lấu", ngong: "lồi đồng lấu ốc" },
    { tier: 2, target: "con lươn luồn lườn", blank: "Con ___ nó luồn qua lườn", right: "lươn", wrong: "nươn", ngong: "con nươn nuồn nườn" },
    { tier: 2, target: "lên non lấy nứa", blank: "Lên non lấy ___", right: "nứa", wrong: "lứa", ngong: "nên lon nấy lứa" },
    { tier: 2, target: "lính lệ leo lầu", blank: "Lính ___ leo lên lầu", right: "lệ", wrong: "nệ", ngong: "nính nệ neo nầu" },
    { tier: 2, target: "lòng nàng lâng lâng", blank: "Lòng nàng ___ lâng", right: "lâng", wrong: "nâng", ngong: "nòng làng nâng nâng" },

    // Tier 3: Thử thách xoắn lưỡi trên mạng
    { tier: 3, target: "lúa nếp là lúa nếp non", blank: "___ nếp là lúa nếp non", right: "Lúa", wrong: "Núa", ngong: "núa lếp nà núa lếp lon" },
    { tier: 3, target: "lên núi lấy nứa làm lán", blank: "Lên núi lấy nứa làm ___", right: "lán", wrong: "nán", ngong: "nên lúi nấy lứa nàm nán" },
    { tier: 3, target: "nói năng nên luyện luôn luôn", blank: "Nói năng nên ___ luôn luôn", right: "luyện", wrong: "nuyện", ngong: "lói lăng lên nuyện nuôn nuôn" },
    { tier: 3, target: "luộc hột vịt lộn luộc lại", blank: "___ hột vịt lộn luộc lại", right: "Luộc", wrong: "Nuộc", ngong: "nuộc hột vịt nộn nuộc nại" }
  ];

  let mode = "voice"; // "voice" | "quiet"
  let recognition = null;
  let recGeneration = 0;
  let restartTimer = null;
  let captureRetries = 0;
  let lastSpeechActivity = 0;
  let wordResultOffset = 0;
  let currentResultLen = 0;
  let micPulse = 0;
  let speechDetected = false;
  let lastHeard = "";

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent || "") ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  let hatY = 216;
  let hatVy = 0;
  let isJumping = false;

  let score = 0;
  let candies = 0;
  let lives = 3;
  let streak = 0;
  let currentWord = null;
  let lastTarget = "";
  let obstacleX = 250;
  let obstacleCleared = false;
  let statusBanner = "";
  let statusTimer = 0;
  let dust = [];

  function hasSpeechAPI() {
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  function normalizeVN(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFC")
      .replace(/[.,!?;:"'()\-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Strip ONLY Vietnamese tone marks (sắc/huyền/hỏi/ngã/nặng), keeping L/N & base vowels (ă,â,ê,ô,ơ,ư,đ) exact!
  function stripTonesKeepLN(str) {
    return normalizeVN(str)
      .normalize("NFD")
      .replace(/[\u0300\u0301\u0303\u0309\u0323]/g, "")
      .normalize("NFC");
  }

  function pickNextWord() {
    const maxTier = score >= 120 ? 3 : (score >= 45 ? 2 : 1);
    const pool = CHALLENGES.filter((c) => c.tier <= maxTier && c.target !== lastTarget);
    const chosen = pool[Math.floor(Math.random() * pool.length)] || CHALLENGES[0];
    currentWord = chosen;
    lastTarget = chosen.target;
    obstacleX = 248;
    obstacleCleared = false;
    wordResultOffset = currentResultLen;

    if (callbacks.onWordUpdate) {
      callbacks.onWordUpdate({ word: currentWord, mode, lastHeard });
    }
  }

  function spawnDust() {
    for (let i = 0; i < 6; i++) {
      dust.push({
        x: 42 + Math.random() * 10,
        y: 222,
        vx: -0.7 - Math.random() * 1.1,
        vy: -0.4 - Math.random() * 0.8,
        life: 18
      });
    }
  }

  function triggerJump(msg) {
    hatVy = -6.8;
    isJumping = true;
    spawnDust();
    obstacleCleared = true;
    if (obstacleX > 115) obstacleX = 115;
    streak++;
    const bonusCandy = streak >= 4 ? 3 : 2;
    score += 15 + Math.min(15, (streak - 1) * 3);
    candies += bonusCandy;

    if (streak >= 3) {
      AudioManager.playCombo(streak);
      statusBanner = `🔥 Chuỗi chuẩn x${streak}! +${bonusCandy} 🍬`;
    } else {
      AudioManager.playCandy();
      statusBanner = msg || `Chuẩn L-N! 👒 +${bonusCandy} 🍬`;
    }
    statusTimer = 55;
    if (callbacks.onHudUpdate) {
      callbacks.onHudUpdate({ score, candies, livesText: "❤️".repeat(lives) });
    }
  }

  function matchesTarget(candidates, target) {
    const targetExact = normalizeVN(target);
    const targetToneFree = stripTonesKeepLN(target);
    const targetTokens = targetToneFree.split(" ");

    for (const raw of candidates) {
      const exact = normalizeVN(raw);
      const toneFree = stripTonesKeepLN(raw);
      if (exact.includes(targetExact) || toneFree.includes(targetToneFree)) {
        return true;
      }
      const heardTokens = toneFree.split(" ");
      if (targetTokens.every((t) => heardTokens.includes(t))) {
        return true;
      }
    }
    return false;
  }

  function handleSpeechResults(event) {
    if (!running || mode !== "voice" || !currentWord || obstacleCleared) return;
    currentResultLen = event.results.length;
    lastSpeechActivity = Date.now();
    micPulse = 1;

    const startIdx = Math.max(wordResultOffset, event.results.length - 3);
    const candidates = [];
    let latestDisplay = "";

    // Build per-alternative combined strings across recent result window
    const altDepth = 5;
    for (let alt = 0; alt < altDepth; alt++) {
      let chunk = "";
      for (let i = startIdx; i < event.results.length; i++) {
        const res = event.results[i];
        const pick = res[alt] ? res[alt].transcript : res[0].transcript;
        chunk += " " + pick;
      }
      if (chunk.trim()) candidates.push(chunk.trim());
    }

    // Also inspect individual latest result alternatives
    const latestRes = event.results[event.results.length - 1];
    if (latestRes) {
      latestDisplay = normalizeVN(latestRes[0].transcript);
      for (let alt = 0; alt < latestRes.length; alt++) {
        candidates.push(latestRes[alt].transcript);
      }
    }

    lastHeard = latestDisplay || normalizeVN(candidates[0] || "");
    if (callbacks.onHeardUpdate) callbacks.onHeardUpdate(lastHeard);

    if (matchesTarget(candidates, currentWord.target)) {
      triggerJump("Phát âm chuẩn! 👒");
    } else if (matchesTarget(candidates, currentWord.ngong)) {
      streak = 0;
      statusBanner = `Nghe thành "${currentWord.ngong}" rồi kìa 😂`;
      statusTimer = 45;
      AudioManager.playBonk();
    }
  }

  async function primeMicHardware() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately release tracks so SpeechRecognition owns the iOS audio session cleanly
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      // Ignore; SpeechRecognition error handler will decide fallback
    }
  }

  function spawnFreshRecognizer() {
    if (!running || mode !== "voice" || !hasSpeechAPI()) return;
    clearTimeout(restartTimer);

    const oldRec = recognition;
    recognition = null;
    if (oldRec) {
      try {
        oldRec.onstart = null;
        oldRec.onresult = null;
        oldRec.onerror = null;
        oldRec.onend = null;
        if (isIOS) {
          oldRec.stop();
        } else {
          oldRec.abort();
        }
      } catch {
        // ignore
      }
    }

    const myGen = ++recGeneration;
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    try {
      const rec = new SpeechRec();
      rec.lang = "vi-VN";
      // iOS WebKit bugs out with continuous=true (freezes / audio-capture lockup)
      rec.continuous = !isIOS;
      rec.interimResults = true;
      rec.maxAlternatives = 5;

      recognition = rec;
      wordResultOffset = 0;
      currentResultLen = 0;
      lastSpeechActivity = Date.now();

      rec.onstart = () => {
        if (myGen !== recGeneration) return;
        captureRetries = 0;
        lastSpeechActivity = Date.now();
        if (callbacks.onMicState) callbacks.onMicState(true);
      };

      rec.onaudiostart = () => {
        if (myGen !== recGeneration) return;
        captureRetries = 0;
        lastSpeechActivity = Date.now();
      };

      rec.onspeechstart = () => {
        if (myGen !== recGeneration) return;
        speechDetected = true;
        micPulse = 1;
        lastSpeechActivity = Date.now();
      };

      rec.onspeechend = () => {
        if (myGen !== recGeneration) return;
        speechDetected = false;
      };

      rec.onresult = (event) => {
        if (myGen !== recGeneration) return;
        captureRetries = 0;
        handleSpeechResults(event);
      };

      rec.onerror = (err) => {
        if (myGen !== recGeneration) return;
        if (err.error === "not-allowed" || err.error === "service-not-allowed") {
          setMode("quiet", "Tab này chưa cấp quyền Micro → chuyển sang Im lặng 🤫");
        } else if (err.error === "audio-capture") {
          // Escalating iOS AVAudioSession recovery retries (450ms -> 1100ms -> 2200ms)
          const delays = [450, 1100, 2200];
          if (captureRetries < delays.length) {
            const waitMs = delays[captureRetries];
            const usePrimer = captureRetries === 1;
            captureRetries++;
            if (callbacks.onMicState) {
              callbacks.onMicState(false, `🎤 Đang kết nối lại Micro (${captureRetries}/${delays.length})...`);
            }
            clearTimeout(restartTimer);
            restartTimer = setTimeout(async () => {
              if (!running || mode !== "voice" || myGen !== recGeneration) return;
              if (usePrimer) await primeMicHardware();
              if (running && mode === "voice" && myGen === recGeneration) {
                spawnFreshRecognizer();
              }
            }, waitMs);
          } else {
            const isStandalone = Boolean(window.navigator.standalone) ||
              (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);
            const msg = isStandalone && isIOS
              ? "iPhone chưa nhả Mic sau khi vuốt tắt app — thử bấm 'Đổi sang Mic' hoặc mở bằng Safari nha!"
              : "Micro đang bận trên máy → chuyển tạm sang Im lặng 🤫";
            setMode("quiet", msg);
          }
        } else if (err.error === "network") {
          setMode("quiet", "Nhận diện giọng nói cần mạng → chuyển sang Im lặng 🤫");
        }
      };

      rec.onend = () => {
        if (myGen !== recGeneration) return;
        speechDetected = false;
        if (running && mode === "voice") {
          clearTimeout(restartTimer);
          restartTimer = setTimeout(() => {
            if (running && mode === "voice" && myGen === recGeneration) {
              spawnFreshRecognizer();
            }
          }, isIOS ? 260 : 120);
        } else if (callbacks.onMicState) {
          callbacks.onMicState(false);
        }
      };

      rec.start();
    } catch {
      setMode("quiet", "Không bật được Mic → chuyển sang Im lặng 🤫");
    }
  }

  function startSpeech() {
    if (mode !== "voice") return;
    if (!hasSpeechAPI()) {
      setMode("quiet", "Trình duyệt chưa hỗ trợ Speech API → dùng Im lặng 🤫");
      return;
    }
    captureRetries = 0;
    if (isIOS && window.AudioManager && AudioManager.suspendForMic) {
      AudioManager.suspendForMic();
    }
    // Call synchronously inside user tap so iOS Safari/PWA keeps the gesture token!
    spawnFreshRecognizer();
  }

  function stopSpeech() {
    recGeneration++;
    clearTimeout(restartTimer);
    speechDetected = false;
    micPulse = 0;
    if (recognition) {
      try {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        if (isIOS) {
          recognition.stop();
        } else {
          recognition.abort();
        }
      } catch {
        // ignore
      }
      recognition = null;
    }
    if (isIOS && window.AudioManager && AudioManager.resumeAfterMic) {
      AudioManager.resumeAfterMic();
    }
    if (callbacks.onMicState) callbacks.onMicState(false);
  }

  function setMode(newMode, noticeMsg = "") {
    if (newMode === "voice" && !hasSpeechAPI()) {
      mode = "quiet";
    } else {
      mode = newMode;
    }
    if (mode === "voice" && running) {
      startSpeech();
    } else {
      stopSpeech();
    }
    if (noticeMsg && callbacks.onMicState) {
      callbacks.onMicState(false, noticeMsg);
    }
    if (callbacks.onWordUpdate && currentWord) {
      callbacks.onWordUpdate({ word: currentWord, mode, lastHeard });
    }
    return mode;
  }

  function submitQuietChoice(chosenText) {
    if (!running || !currentWord || obstacleCleared) return;
    if (chosenText === currentWord.right) {
      triggerJump("Chuẩn chỉnh L-N! 👒");
    } else {
      lives--;
      streak = 0;
      AudioManager.playBonk();
      statusBanner = `Á! Chọn "${chosenText}" ngọng rồi 😂 (Đúng: ${currentWord.right})`;
      statusTimer = 55;
      if (callbacks.onHudUpdate) {
        callbacks.onHudUpdate({ score, candies, livesText: lives > 0 ? "❤️".repeat(lives) : "💔" });
      }
      if (lives <= 0) {
        endGame("Ngọng nhiều quá rụng nón rồi nè 😂 Thử lại nhé!");
      } else {
        pickNextWord();
      }
    }
  }

  function init(canvasEl, cbs) {
    canvas = canvasEl;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    callbacks = cbs || {};
    mode = hasSpeechAPI() ? "voice" : "quiet";
  }

  function start() {
    score = 0;
    candies = 0;
    lives = 3;
    streak = 0;
    hatY = 216;
    hatVy = 0;
    isJumping = false;
    lastHeard = "";
    lastTarget = "";
    dust = [];
    statusBanner = mode === "voice" ? "Đọc to câu bên trên vào Mic nha!" : "Điền đúng L hoặc N để nhảy!";
    statusTimer = 70;
    frame = 0;
    lastTime = 0;
    acc = 0;
    running = true;

    pickNextWord();
    if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, livesText: "❤️❤️❤️" });
    if (mode === "voice") startSpeech();
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    stopSpeech();
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function endGame(reason) {
    running = false;
    stopSpeech();
    AudioManager.playBonk();
    if (callbacks.onGameOver) {
      callbacks.onGameOver({ score, candies, reason });
    }
  }

  function update() {
    frame++;
    if (statusTimer > 0) statusTimer--;
    if (speechDetected) {
      micPulse = 0.65 + Math.abs(Math.sin(frame * 0.25)) * 0.35;
    } else if (micPulse > 0.05) {
      micPulse *= 0.9;
    } else {
      micPulse = 0.08;
    }

    // Watchdog: if voice mode is silent/stalled for > 7s without activity, refresh recognizer cleanly
    if (mode === "voice" && lastSpeechActivity && Date.now() - lastSpeechActivity > 7000) {
      lastSpeechActivity = Date.now();
      spawnFreshRecognizer();
    }

    if (isJumping || hatY < 216) {
      hatVy += 0.28;
      hatY += hatVy;
      if (hatY >= 216) {
        hatY = 216;
        hatVy = 0;
        isJumping = false;
      }
    }

    const baseSpeed = mode === "voice"
      ? Math.min(0.55, 0.22 + score * 0.0007)
      : Math.min(0.88, 0.38 + score * 0.0010);
    obstacleX -= obstacleCleared ? 4.4 : baseSpeed;

    if (!obstacleCleared && Math.abs(obstacleX - 46) < 12 && hatY > 192) {
      lives--;
      streak = 0;
      AudioManager.playBonk();
      statusBanner = "Húc cột rồi! Lẹ hơn xíu nha 😆";
      statusTimer = 50;
      if (callbacks.onHudUpdate) {
        callbacks.onHudUpdate({ score, candies, livesText: lives > 0 ? "❤️".repeat(lives) : "💔" });
      }
      if (lives <= 0) {
        endGame("Đâm cột mất rồi! Đọc/chọn nhanh hơn xíu nha em iu:");
        return;
      }
      pickNextWord();
      return;
    }

    if (obstacleX < -24) {
      pickNextWord();
    }

    for (let i = dust.length - 1; i >= 0; i--) {
      dust[i].x += dust[i].vx;
      dust[i].y += dust[i].vy;
      dust[i].life--;
      if (dust[i].life <= 0) dust.splice(i, 1);
    }
  }

  function drawNonLa(x, y) {
    const px = PixelSprites.px;
    const bob = !isJumping && frame % 12 < 6 ? -1 : 0;
    const hy = Math.round(y + bob);

    px(ctx, x - 9, 224, 18, 3, "rgba(74, 48, 44, 0.2)");
    px(ctx, x - 5, hy - 2, 2, 6, "#E45A7A");
    px(ctx, x + 3, hy - 2, 2, 6, "#E45A7A");
    px(ctx, x - 3, hy + 4, 6, 2, "#E45A7A");

    px(ctx, x - 1, hy - 14, 2, 2, "#E8BA6B");
    px(ctx, x - 4, hy - 12, 8, 3, "#F4CB7C");
    px(ctx, x - 7, hy - 9, 14, 3, "#F8D78E");
    px(ctx, x - 11, hy - 6, 22, 3, "#F4CB7C");
    px(ctx, x - 14, hy - 3, 28, 3, "#E4B25E");
    px(ctx, x - 3, hy - 7, 2, 2, "#4A302C");
    px(ctx, x + 2, hy - 7, 2, 2, "#4A302C");
  }

  function drawWrappedText(text, cx, y, maxW, lineH) {
    const words = text.split(" ");
    let line = "";
    const lines = [];
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    lines.forEach((ln, idx) => {
      ctx.fillText(ln, cx, y + idx * lineH);
    });
  }

  function draw() {
    const px = PixelSprites.px;

    px(ctx, 0, 0, 240, 226, "#FFF7EC");
    px(ctx, 0, 0, 240, 120, "#E7F4FF");

    px(ctx, 0, 185, 90, 41, "#CCE6BE");
    px(ctx, 70, 175, 110, 51, "#B8DBAA");
    px(ctx, 160, 188, 80, 38, "#CCE6BE");

    px(ctx, 0, 226, 240, 54, "#E3B896");
    px(ctx, 0, 226, 240, 4, "#67B374");
    for (let gx = -(frame % 20); gx < 240; gx += 20) {
      px(ctx, gx, 236, 10, 2, "#CC9C78");
    }

    const ox = Math.round(obstacleX);
    px(ctx, ox - 7, 200, 14, 26, "#8D5B3C");
    px(ctx, ox - 9, 198, 18, 4, "#A66E4B");
    px(ctx, ox - 5, 206, 10, 3, "#F7B6CC");

    dust.forEach((d) => px(ctx, d.x, d.y, 2, 2, "#E8D3BD"));
    drawNonLa(46, hatY);

    if (streak >= 2) {
      ctx.fillStyle = "#E46B94";
      ctx.font = "bold 10px monospace";
      ctx.fillText(`🔥 CHUỖI x${streak}`, 8, 15);
    }
    if (mode === "voice") {
      px(ctx, 156, 8, 76, 8, "#FFFDF7");
      px(ctx, 157, 9, Math.round(74 * micPulse), 6, speechDetected || micPulse > 0.3 ? "#67B374" : "#F7B6CC");
      ctx.strokeStyle = "#4A302C";
      ctx.lineWidth = 1;
      ctx.strokeRect(156, 8, 76, 8);
    }

    if (currentWord && !obstacleCleared) {
      ctx.fillStyle = "#FFFDF7";
      ctx.fillRect(20, 32, 200, 58);
      ctx.strokeStyle = "#4A302C";
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 32, 200, 58);

      ctx.fillStyle = "#E46B94";
      ctx.font = "bold 10.5px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        mode === "voice"
          ? `🎤 Cấp ${currentWord.tier} — Đọc to chuẩn L / N:`
          : `🤫 Cấp ${currentWord.tier} — Chọn chữ đúng:`,
        120,
        47
      );

      ctx.fillStyle = "#4A302C";
      ctx.font = "bold 13px sans-serif";
      const displayStr = mode === "voice"
        ? `"${currentWord.target.toUpperCase()}"`
        : currentWord.blank;
      drawWrappedText(displayStr, 120, 65, 184, 16);
      ctx.textAlign = "left";

      const pct = Math.max(0, Math.min(1, (obstacleX - 58) / (248 - 58)));
      const barColor = pct > 0.5 ? "#67B374" : (pct > 0.25 ? "#F7B32B" : "#E46B94");
      px(ctx, 22, 85, Math.round(196 * pct), 3, barColor);
    }

    if (statusTimer > 0 && statusBanner) {
      ctx.fillStyle = "#4A302C";
      ctx.font = "bold 10.5px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(statusBanner, 120, 112);
      ctx.textAlign = "left";
    }
  }

  const FIXED_STEP = 1000 / 60;
  let lastTime = 0;
  let acc = 0;

  function loop(now) {
    if (!running) return;
    if (!lastTime) lastTime = now;
    const dt = Math.min(80, Math.max(0, now - lastTime));
    lastTime = now;
    acc += dt;
    while (acc >= FIXED_STEP && running) {
      update();
      acc -= FIXED_STEP;
    }
    if (running) {
      draw();
      rafId = requestAnimationFrame(loop);
    }
  }

  return {
    init,
    start,
    stop,
    setMode,
    getMode: () => mode,
    hasSpeechAPI,
    submitQuietChoice,
    isRunning: () => running
  };
})();
