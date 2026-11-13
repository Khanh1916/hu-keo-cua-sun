window.MemoryGame = (() => {
  let canvas = null;
  let ctx = null;
  let rafId = null;
  let running = false;
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

  let cards = [];
  let selected = [];
  let moves = 0;
  let pairsFound = 0;
  let streak = 0;
  let score = 0;
  let candies = 0;
  let isLocked = false;
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
      deck.push({ ...item, key: `${item.id}_a`, pairIdx: itemIdx, flipped: false, matched: false, flipAnim: 1 });
      deck.push({ ...item, key: `${item.id}_b`, pairIdx: itemIdx, flipped: false, matched: false, flipAnim: 1 });
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

  function handleCardClick(card) {
    if (!running || isLocked || card.flipped || card.matched) return;

    if (window.AudioManager) AudioManager.playClick();
    card.flipped = true;
    selected.push(card);

    if (selected.length === 2) {
      moves++;
      const [c1, c2] = selected;

      if (c1.id === c2.id) {
        // Matched!
        c1.matched = true;
        c2.matched = true;
        pairsFound++;
        streak++;
        score += 20 + Math.min(20, streak * 5);
        if (pairsFound % 3 === 0 && candies < 3) candies++;

        spawnSparkles(c1.x, c1.y, "#67B374");
        spawnSparkles(c2.x, c2.y, "#67B374");

        if (window.AudioManager) {
          if (streak >= 2) AudioManager.playCombo(streak);
          else AudioManager.playCandy();
        }

        statusBanner = streak >= 2 ? `🔥 Khớp liên tiếp x${streak}!` : `✨ Tìm thấy cặp ${c1.name}!`;
        statusTimer = 45;
        selected = [];

        if (callbacks.onHudUpdate) {
          callbacks.onHudUpdate({ score, candies, livesText: `🃏 ${pairsFound}/8` });
        }

        // Check Victory
        if (pairsFound === 8) {
          setTimeout(handleVictory, 500);
        }
      } else {
        // Mismatch
        streak = 0;
        isLocked = true;
        statusBanner = "Chưa đúng rồi, nhớ vị trí nhé!";
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

  function handleVictory() {
    const finalCandies = moves <= 12 ? 3 : (moves <= 16 ? 2 : 1);
    const finalScore = Math.max(50, 140 - moves * 3);
    if (window.AudioManager) AudioManager.playCelebration();
    running = false;

    if (callbacks.onGameOver) {
      callbacks.onGameOver({
        score: finalScore,
        candies: finalCandies,
        reason: `Tuyệt vời! Em hoàn thành chỉ trong ${moves} lượt lật 💕`
      });
    }
  }

  function onPointerDown(e) {
    if (!running || !canvas) return;
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
      // Matched Card - Soft green / pastel gold border
      px(ctx, x, y, w, h, "#E8F5E9");
      px(ctx, x, y, w, 2, "#40916C");
      px(ctx, x, y + h - 2, w, 2, "#40916C");
      px(ctx, x, y, 2, h, "#40916C");
      px(ctx, x + w - 2, y, 2, h, "#40916C");

      // Draw Icon & Name
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
      px(ctx, x, y, w, 2, "#E46B94");
      px(ctx, x, y + h - 2, w, 2, "#E46B94");
      px(ctx, x, y, 2, h, "#E46B94");
      px(ctx, x + w - 2, y, 2, h, "#E46B94");

      // Draw Icon & Name
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(c.icon, x + w / 2, y + 20);

      ctx.fillStyle = "#4A302C";
      ctx.font = "bold 9px sans-serif";
      ctx.fillText(c.name, x + w / 2, y + 38);
    } else {
      // Face Down Card (Cute Pixel Backing)
      px(ctx, x, y, w, h, "#FFFDF7");
      px(ctx, x, y, w, 2, "#8D5B4C");
      px(ctx, x, y + h - 2, w, 2, "#8D5B4C");
      px(ctx, x, y, 2, h, "#8D5B4C");
      px(ctx, x + w - 2, y, 2, h, "#8D5B4C");

      // Pastel Pink Diamond Center Pattern
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

    ctx.fillStyle = "#4A302C";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(`Lượt: ${moves}`, 14, 22);

    ctx.textAlign = "center";
    ctx.fillStyle = "#E46B94";
    ctx.fillText(`Đã tìm: ${pairsFound}/8 cặp`, 120, 22);

    ctx.textAlign = "right";
    ctx.fillStyle = streak >= 2 ? "#D90429" : "#6E4A3A";
    ctx.fillText(streak >= 2 ? `🔥 x${streak}` : `✨ Kỷ niệm`, 224, 22);

    // Draw 16 Cards
    cards.forEach(drawCard);

    // Status Banner
    if (statusTimer > 0 && statusBanner) {
      statusTimer--;
      ctx.fillStyle = "rgba(74, 48, 44, 0.88)";
      ctx.fillRect(16, 126, 208, 28);
      ctx.fillStyle = "#FFFDF7";
      ctx.font = "bold 11.5px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(statusBanner, 120, 140);
    }

    // Particles
    particles.forEach((p, idx) => {
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
    moves = 0;
    pairsFound = 0;
    streak = 0;
    score = 0;
    candies = 0;
    selected = [];
    isLocked = false;
    particles = [];
    statusBanner = "Lật tìm các cặp thẻ giống nhau nhé!";
    statusTimer = 60;
    frame = 0;

    initCards();
    if (callbacks.onHudUpdate) {
      callbacks.onHudUpdate({ score, candies, livesText: "🃏 0/8" });
    }

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    selected = [];
    isLocked = false;
  }

  return {
    init,
    start,
    stop
  };
})();
