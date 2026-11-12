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
  let micStream = null;
  let audioCtx = null;
  let analyser = null;
  let micVolume = 0;
  let lastHeard = "";

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
      .replace(/[.,!?;:"'()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function pickNextWord() {
    const maxTier = score >= 120 ? 3 : (score >= 45 ? 2 : 1);
    const pool = CHALLENGES.filter((c) => c.tier <= maxTier && c.target !== lastTarget);
    const chosen = pool[Math.floor(Math.random() * pool.length)] || CHALLENGES[0];
    currentWord = chosen;
    lastTarget = chosen.target;
    obstacleX = 248;
    obstacleCleared = false;
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
    // Bring far obstacle close enough so the Nón Lá visibly leaps right over it!
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

  function handleTranscript(transcript) {
    if (!running || mode !== "voice" || !currentWord || obstacleCleared) return;
    const clean = normalizeVN(transcript);
    lastHeard = clean;
    if (callbacks.onHeardUpdate) callbacks.onHeardUpdate(clean);

    const targetNorm = normalizeVN(currentWord.target);
    const ngongNorm = normalizeVN(currentWord.ngong);

    // Match full phrase or all key tokens in order
    const targetWords = targetNorm.split(" ");
    const hitAll = targetWords.every((w) => clean.split(" ").includes(w));

    if (clean.includes(targetNorm) || hitAll) {
      triggerJump("Phát âm chuẩn! 👒");
    } else if (clean.includes(ngongNorm)) {
      streak = 0;
      statusBanner = `Nghe thành "${ngongNorm}" rồi kìa 😂`;
      statusTimer = 45;
      AudioManager.playBonk();
    }
  }

  async function initMicMeter() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("no-media-devices");
    }
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
      const src = audioCtx.createMediaStreamSource(micStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
    }
  }

  function stopMicMeter() {
    micVolume = 0;
    if (micStream) {
      micStream.getTracks().forEach((t) => t.stop());
      micStream = null;
    }
    if (audioCtx) {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
    analyser = null;
  }

  async function startSpeech() {
    if (mode !== "voice") return;
    if (!hasSpeechAPI()) {
      setMode("quiet", "Trình duyệt chưa hỗ trợ Speech API → dùng Im lặng 🤫");
      return;
    }
    stopSpeech();

    try {
      await initMicMeter();
    } catch {
      setMode("quiet", "Tab này chặn quyền Micro → mở bằng Chrome/Edge hoặc chơi Im lặng 🤫");
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    try {
      recognition = new SpeechRec();
      recognition.lang = "vi-VN";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        if (callbacks.onMicState) callbacks.onMicState(true);
      };

      recognition.onresult = (event) => {
        let combined = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          combined += " " + event.results[i][0].transcript;
        }
        handleTranscript(combined);
      };

      recognition.onerror = (err) => {
        if (err.error === "not-allowed" || err.error === "service-not-allowed" || err.error === "audio-capture") {
          setMode("quiet", "Không truy cập được Micro → chuyển sang Im lặng 🤫");
        } else if (err.error === "network") {
          setMode("quiet", "Nhận diện giọng nói cần mạng Chrome → chuyển sang Im lặng 🤫");
        }
      };

      recognition.onend = () => {
        if (running && mode === "voice") {
          setTimeout(() => {
            if (running && mode === "voice" && recognition) {
              try {
                recognition.start();
              } catch {
                // ignore
              }
            }
          }, 250);
        }
      };

      recognition.start();
    } catch {
      setMode("quiet", "Không bật được Mic → chuyển sang Im lặng 🤫");
    }
  }

  function stopSpeech() {
    if (recognition) {
      try {
        recognition.onend = null;
        recognition.stop();
      } catch {
        // ignore
      }
      recognition = null;
    }
    stopMicMeter();
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

    // Sample mic volume bar
    if (analyser && mode === "voice") {
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) sum += data[i];
      micVolume = Math.min(1, (sum / data.length) / 55);
    } else {
      micVolume = 0;
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
      ? Math.min(0.68, 0.26 + score * 0.0008)
      : Math.min(0.88, 0.38 + score * 0.0010);
    // When cleared, glide the post smoothly underneath the airborne Nón Lá!
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

    // Streak & Mic Volume meter
    if (streak >= 2) {
      ctx.fillStyle = "#E46B94";
      ctx.font = "bold 10px monospace";
      ctx.fillText(`🔥 CHUỖI x${streak}`, 8, 15);
    }
    if (mode === "voice") {
      px(ctx, 156, 8, 76, 8, "#FFFDF7");
      px(ctx, 157, 9, Math.round(74 * micVolume), 6, micVolume > 0.2 ? "#67B374" : "#F7B6CC");
      ctx.strokeStyle = "#4A302C";
      ctx.lineWidth = 1;
      ctx.strokeRect(156, 8, 76, 8);
    }

    // Prompt Card
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

      // Visual urgency progress bar (Tension & Release indicator)
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
