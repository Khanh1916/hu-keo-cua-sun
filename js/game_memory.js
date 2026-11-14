window.MemoryGame = (() => {
  let canvas = null;
  let ctx = null;
  let rafId = null;
  let running = false;
  let isPaused = false;
  let frame = 0;
  let callbacks = {};

  const PAIR_ITEMS = [
    { id: "banh_mi", icon: "🥖", name: "Bánh mì" },
    { id: "tra_cuc", icon: "🍵", name: "Trà cúc" },
    { id: "bong", icon: "🐱", name: "Bé Bông" },
    { id: "non_la", icon: "👒", name: "Nón lá" },
    { id: "mck", icon: "🎵", name: "Đĩa 99%" },
    { id: "coc_doi", icon: "☕", name: "Cốc đôi" },
    { id: "hoa_phuong", icon: "🌺", name: "Phượng đỏ" },
    { id: "trai_tim", icon: "💖", name: "Trái tim" }
  ];

  const MAX_TURNS = 12;
  let cards = [];
  let selected = [];
  let turnsLeft = MAX_TURNS;
  let pairsFound = 0;
  let streak = 0;
  let score = 0;
  let candies = 0;
  let isLocked = false;
  let isPeeking = false;
  let peekTimer = 0;
  let particles = [];
  let statusBanner = "";
  let statusTimer = 0;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function initCards() {
    const deck = [];
    PAIR_ITEMS.forEach((item, itemIdx) => {
      deck.push({ ...item, key: `${item.id}_a`, pairIdx: itemIdx, flipped: true, matched: false });
      deck.push({ ...item, key: `${item.id}_b`, pairIdx: itemIdx, flipped: true, matched: false });
    });
    const shuffled = shuffle(deck);
    cards = shuffled.map((c, idx) => ({
      ...c,
      index: idx,
      col: idx % 4,
      row: Math.floor(idx / 4),
      x: 8 + (idx % 4) * 58,
      y: 44 + Math.floor(idx / 4) * 56,
      w: 50,
      h: 50
    }));
  }

  function spawnSparkles(x, y, color = "#FFE066") {
    for (let i = 0; i < 10; i++) {
      particles.push({
        x: x + 25,
        y: y + 25,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        life: 25,
        maxLife: 25,
        color
      });
    }
  }

  function updateHud() {
    if (callbacks.onHudUpdate) {
      callbacks.onHudUpdate({
        score,
        candies,
        livesText: `🎯 ${turnsLeft} lượt`
      });
    }
  }

  function handleCardClick(card) {
    if (!running || isLocked || isPeeking || card.flipped || card.matched) return;

    if (window.AudioManager) AudioManager.playClick();
    card.flipped = true;
    selected.push(card);

    if (selected.length === 2) {
      turnsLeft = Math.max(0, turnsLeft - 1);
      const [c1, c2] = selected;

      if (c1.id === c2.id) {
        // Matched!
        c1.matched = true;
        c2.matched = true;
        pairsFound++;
        streak++;
        score += 20 + Math.min(25, streak * 5);
        if (pairsFound % 3 === 0 && candies < 3) candies++;

        spawnSparkles(c1.x, c1.y, "#67B374");
        spawnSparkles(c2.x, c2.y, "#67B374");

        // Strategic combo reward: consecutive matches award +1 bonus turn!
        if (streak >= 2) {
          turnsLeft = Math.min(MAX_TURNS, turnsLeft + 1);
          statusBanner = `🔥 Chuỗi x${streak}! Thưởng +1 lượt lật ✨`;
          if (window.AudioManager) AudioManager.playCombo(streak);
        } else {
          statusBanner = `✨ Tìm thấy cặp ${c1.name}!`;
          if (window.AudioManager) AudioManager.playCandy();
        }

        statusTimer = 45;
        selected = [];
        updateHud();

        // Check Victory
        if (pairsFound === 8) {
          setTimeout(handleVictory, 500);
        }
      } else {
        // Mismatch
        streak = 0;
        isLocked = true;
        updateHud();

        if (turnsLeft <= 0 && pairsFound < 8) {
          statusBanner = "Hết lượt lật rồi!";
          statusTimer = 45;
          setTimeout(handleDefeat, 750);
        } else {
          statusBanner = `Chưa khớp rồi! (Còn ${turnsLeft} lượt)`;
          statusTimer = 35;
          setTimeout(() => {
            c1.flipped = false;
            c2.flipped = false;
            selected = [];
            isLocked = false;
          }, 650);
        }
      }
    }
  }

  function handleVictory() {
    running = false;
    const finalCandies = turnsLeft >= 5 ? 3 : (turnsLeft >= 2 ? 2 : 1);
    const finalScore = score + turnsLeft * 12;
    if (window.AudioManager) AudioManager.playCelebration();

    if (callbacks.onGameOver) {
      callbacks.onGameOver({
        score: finalScore,
        candies: finalCandies,
        reason: `Tuyệt vời! Em hoàn thành xuất sắc và còn dư ${turnsLeft} lượt lật 💕`
      });
    }
  }

  function handleDefeat() {
    running = false;
    if (window.AudioManager) AudioManager.playBonk();

    if (callbacks.onGameOver) {
      callbacks.onGameOver({
        score,
        candies: 0,
        reason: `Hết 12 lượt rồi! Lần sau hãy tận dụng 2 giây nhìn lướt đầu ván nhé em 💕`
      });
    }
  }

  function onPointerDown(e) {
    if (!running || !canvas || isPeeking || isPaused) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const mx = (clientX - rect.left) * scaleX;
    const my = (clientY - rect.top) * scaleY;

    const clicked = cards.find(
      (c) => mx >= c.x && mx <= c.x + c.w && my >= c.y && my <= c.y + c.h
    );
    if (clicked) {
      handleCardClick(clicked);
    }
  }

  function drawCard(c) {
    const px = PixelSprites.px;
    const x = c.x, y = c.y, w = c.w, h = c.h;

    if (c.matched) {
      // Matched Card - Soft pastel green border
      px(ctx, x, y, w, h, "#E8F5E9");
      px(ctx, x, y, w, 2, "#40916C");
      px(ctx, x, y + h - 2, w, 2, "#40916C");
      px(ctx, x, y, 2, h, "#40916C");
      px(ctx, x + w - 2, y, 2, h, "#40916C");

      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(c.icon, x + w / 2, y + 20);

      ctx.fillStyle = "#2D6A4F";
      ctx.font = "bold 9px sans-serif";
      ctx.fillText(c.name, x + w / 2, y + 38);
    } else if (c.flipped) {
      // Face Up Card
      px(ctx, x, y, w, h, "#FFFDF7");
      px(ctx, x, y, w, 2, isPeeking ? "#D97706" : "#E46B94");
      px(ctx, x, y + h - 2, w, 2, isPeeking ? "#D97706" : "#E46B94");
      px(ctx, x, y, 2, h, isPeeking ? "#D97706" : "#E46B94");
      px(ctx, x + w - 2, y, 2, h, isPeeking ? "#D97706" : "#E46B94");

      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(c.icon, x + w / 2, y + 20);

      ctx.fillStyle = isPeeking ? "#B45309" : "#4A302C";
      ctx.font = "bold 9px sans-serif";
      ctx.fillText(c.name, x + w / 2, y + 38);
    } else {
      // Face Down Card (Pixel Diamond Backing)
      px(ctx, x, y, w, h, "#FFFDF7");
      px(ctx, x, y, w, 2, "#8D5B4C");
      px(ctx, x, y + h - 2, w, 2, "#8D5B4C");
      px(ctx, x, y, 2, h, "#8D5B4C");
      px(ctx, x + w - 2, y, 2, h, "#8D5B4C");

      px(ctx, x + 10, y + 10, w - 20, h - 20, "#FDE2EC");
      px(ctx, x + 23, y + 17, 4, 4, "#E46B94");
      px(ctx, x + 21, y + 21, 8, 8, "#E46B94");
      px(ctx, x + 23, y + 29, 4, 4, "#E46B94");
      px(ctx, x + 24, y + 24, 2, 2, "#FFF");
    }
  }

  function render() {
    if (!ctx) return;
    const px = PixelSprites.px;

    // Background: Warm retro playroom wood/cream tone
    ctx.fillStyle = "#FFF6EA";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header bar inside canvas
    px(ctx, 6, 8, 228, 28, "#FFFDF7");
    px(ctx, 6, 8, 228, 2, "#8D5B4C");
    px(ctx, 6, 34, 228, 2, "#8D5B4C");
    px(ctx, 6, 8, 2, 28, "#8D5B4C");
    px(ctx, 232, 8, 2, 28, "#8D5B4C");

    ctx.fillStyle = turnsLeft <= 3 ? "#D90429" : "#4A302C";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(`Lượt: ${turnsLeft}/${MAX_TURNS}`, 14, 22);

    ctx.textAlign = "center";
    ctx.fillStyle = "#E46B94";
    ctx.fillText(`Cặp: ${pairsFound}/8`, 120, 22);

    ctx.textAlign = "right";
    ctx.fillStyle = streak >= 2 ? "#D90429" : "#6E4A3A";
    ctx.fillText(streak >= 2 ? `🔥 Combo x${streak}` : (isPeeking ? "👀 Ghi nhớ!" : `Điểm: ${score}`), 224, 22);

    // Draw 16 Cards
    cards.forEach(drawCard);

    // Status Banner / Flash Peek Countdown
    if (isPeeking) {
      const secLeft = Math.ceil(peekTimer / 60);
      ctx.fillStyle = "rgba(74, 48, 44, 0.92)";
      ctx.fillRect(12, 126, 216, 28);
      ctx.fillStyle = "#FFE7A8";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`👀 Nhìn lướt ghi nhớ nhanh (${secLeft}s)...`, 120, 140);
    } else if (statusTimer > 0 && statusBanner) {
      statusTimer--;
      ctx.fillStyle = "rgba(74, 48, 44, 0.88)";
      ctx.fillRect(14, 126, 212, 28);
      ctx.fillStyle = "#FFFDF7";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(statusBanner, 120, 140);
    }

    // Particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      px(ctx, Math.round(p.x), Math.round(p.y), 2, 2, p.color);
      ctx.globalAlpha = 1;
    });
    particles = particles.filter((p) => p.life > 0);
  }

  function loop() {
    if (!running) return;
    frame++;

    if (isPeeking) {
      peekTimer--;
      if (peekTimer <= 0) {
        isPeeking = false;
        isLocked = false;
        cards.forEach((c) => {
          c.flipped = false;
        });
        statusBanner = `Bắt đầu! (Giới hạn ${MAX_TURNS} lượt)`;
        statusTimer = 50;
        updateHud();
      }
    }

    render();
    rafId = requestAnimationFrame(loop);
  }

  function init(canvasEl, cbs) {
    canvas = canvasEl;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    callbacks = cbs || {};

    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerdown", onPointerDown);
  }

  function start() {
    running = true;
    isPaused = false;
    turnsLeft = MAX_TURNS;
    pairsFound = 0;
    streak = 0;
    score = 0;
    candies = 0;
    selected = [];
    particles = [];
    frame = 0;

    // Flash Peek opening phase (2 seconds of preview)
    initCards();
    isPeeking = true;
    isLocked = true;
    peekTimer = 110; // ~1.85 seconds at 60fps
    statusBanner = "👀 Nhìn lướt ghi nhớ nhanh nào!";
    statusTimer = 110;

    updateHud();

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function suspend() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    isPaused = true;
  }

  function resume() {
    if (!running) return false;
    isPaused = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
    return true;
  }

  function drawPausedPreview() {
    if (running && isPaused && ctx) {
      render();
      // Draw pause overlay box on canvas
      ctx.fillStyle = "rgba(40, 24, 20, 0.65)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#FFFDF7";
      ctx.fillRect(24, 96, 192, 70);
      ctx.strokeStyle = "#4A302C";
      ctx.lineWidth = 2;
      ctx.strokeRect(24, 96, 192, 70);

      ctx.fillStyle = "#E46B94";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("⏸ Ván Đang Tạm Dừng", 120, 118);

      ctx.fillStyle = "#4A302C";
      ctx.font = "10.5px sans-serif";
      ctx.fillText(`Đã ghép: ${pairsFound}/8 cặp • Còn: ${turnsLeft} lượt`, 120, 142);
    }
  }

  function stop() {
    running = false;
    isPaused = false;
    isPeeking = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    selected = [];
    isLocked = false;
  }

  return {
    init,
    start,
    stop,
    suspend,
    resume,
    drawPausedPreview,
    isPaused: () => isPaused,
    isRunning: () => running,
    getScore: () => score,
    getCandies: () => candies,
    getTurnsLeft: () => turnsLeft,
    getPairsFound: () => pairsFound
  };
})();
