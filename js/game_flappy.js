window.FlappyGame = (() => {
  let canvas = null;
  let ctx = null;
  let rafId = null;
  let running = false;
  let started = false; // "Get Ready!" hover until first tap, just like real Flappy Bird!
  let frame = 0;
  let callbacks = {};

  let birdY = 130;
  let birdVy = 0;
  let birdTilt = 0;
  const birdX = 64;

  // Authentic Flappy Bird 60Hz constants scaled cleanly for 240x280
  const GRAVITY = 0.16;
  const FLAP_VY = -3.30;
  const MAX_FALL = 4.0;
  const SCROLL_SPEED = 1.35;
  const PIPE_INTERVAL = 112; // ~1.87s between pipes (~151px apart)

  let score = 0;
  let candies = 0;
  let pipesPassed = 0;
  let pipesSpawned = 0;
  let pipes = [];
  let pipeTimer = 0;
  let feathers = [];
  let popups = [];
  let bannerText = "";
  let bannerTimer = 0;

  const FIXED_STEP = 1000 / 60;
  let lastTime = 0;
  let acc = 0;

  function flap() {
    if (!running) return;
    if (!started) {
      started = true;
      bannerText = "";
      bannerTimer = 0;
    }
    birdVy = FLAP_VY;
    AudioManager.playFlap();
    for (let i = 0; i < 3; i++) {
      feathers.push({
        x: birdX - 8 + Math.random() * 4,
        y: birdY + Math.random() * 4,
        vx: -0.9 - Math.random() * 0.6,
        vy: 0.4 + Math.random() * 0.7,
        life: 20
      });
    }
  }

  function init(canvasEl, cbs) {
    canvas = canvasEl;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    callbacks = cbs || {};

    canvas.addEventListener("pointerdown", (e) => {
      if (!running) return;
      e.preventDefault();
      flap();
    });

    window.addEventListener("keydown", (e) => {
      if (!running) return;
      if (e.code === "Space" || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        flap();
      }
    });
  }

  function start() {
    birdY = 130;
    birdVy = 0;
    birdTilt = 0;
    score = 0;
    candies = 0;
    pipesPassed = 0;
    pipesSpawned = 0;
    pipes = [];
    feathers = [];
    popups = [];
    pipeTimer = 50;
    started = false;
    bannerText = "Chạm (hoặc Space) để bắt đầu bay! 🪽";
    bannerTimer = 9999;
    frame = 0;
    lastTime = 0;
    acc = 0;
    running = true;

    if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, livesText: "🪽" });
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function spawnPipe() {
    pipesSpawned++;
    // First 2 pipes give extra-wide onboarding comfort, then classic steady 88px gap
    const gap = pipesSpawned <= 2 ? 104 : 88;
    const minTop = 30;
    const maxTop = 250 - gap - 30;
    const topH = minTop + Math.floor(Math.random() * (maxTop - minTop));
    pipes.push({
      x: 252,
      w: 28,
      topH,
      gap,
      passed: false,
      pickup: Math.random() < 0.65 ? (Math.random() < 0.35 ? "heart" : "candy") : null,
      candyTaken: false
    });
  }

  function endGame(reason) {
    running = false;
    AudioManager.playBonk();
    if (callbacks.onGameOver) {
      callbacks.onGameOver({ score, candies, reason });
    }
  }

  function update() {
    frame++;
    if (bannerTimer > 0 && started) bannerTimer--;

    // "Get Ready!" gentle hover until first tap
    if (!started) {
      birdY = 130 + Math.sin(frame * 0.08) * 5;
      birdTilt = 0;
      return;
    }

    birdVy += GRAVITY;
    if (birdVy > MAX_FALL) birdVy = MAX_FALL;
    birdY += birdVy;

    // Classic Flappy Bird rotation feel: snap nose up on flap, pitch down smoothly on dive
    const targetTilt = birdVy < 0 ? -0.35 : Math.min(0.65, birdVy * 0.16);
    birdTilt += (targetTilt - birdTilt) * 0.25;

    if (birdY < 10) {
      birdY = 10;
      birdVy = 0;
    }
    if (birdY > 248) {
      endGame("Bông hạ cánh hơi mạnh mất rồi! 😅");
      return;
    }

    pipeTimer--;
    if (pipeTimer <= 0) {
      spawnPipe();
      pipeTimer = PIPE_INTERVAL;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      const p = pipes[i];
      p.x -= SCROLL_SPEED;

      if (!p.passed && p.x + p.w < birdX) {
        p.passed = true;
        pipesPassed++;
        const distTop = birdY - 4 - p.topH;
        const distBot = p.topH + p.gap - (birdY + 4);
        const nearMiss = Math.min(distTop, distBot) < 10;
        score += nearMiss ? 15 : 10;
        if (pipesPassed % 5 === 0) candies += 1;
        AudioManager.playCombo(Math.floor(score / 10));
        popups.push({
          x: birdX,
          y: birdY - 14,
          text: nearMiss ? "Suýt chạm! +15 ✨" : "+10",
          color: nearMiss ? "#D97706" : "#E46B94",
          life: 32
        });

        if (score >= 50 && score < 65) {
          bannerText = "✨ 50 điểm! Đúng nhịp Flappy rồi!";
          bannerTimer = 90;
          AudioManager.playPowerup();
        } else if (score >= 100 && score < 115) {
          candies += 1;
          bannerText = "🌙 Hoàng hôn tới rồi! +1 🍬";
          bannerTimer = 100;
          AudioManager.playPowerup();
        } else if (score >= 160 && score < 175) {
          candies += 2;
          bannerText = "⭐ Bay xuyên đêm luôn! +2 🍬";
          bannerTimer = 100;
          AudioManager.playPowerup();
        }

        if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, livesText: "🪽" });
      }

      if (p.pickup && !p.candyTaken) {
        const cx = p.x + p.w / 2;
        const cy = p.topH + p.gap / 2;
        if (Math.abs(birdX - cx) < 14 && Math.abs(birdY - cy) < 14) {
          p.candyTaken = true;
          const addC = 1;
          candies += addC;
          score += 5;
          AudioManager.playCandy();
          popups.push({ x: cx, y: cy - 8, text: `+${addC} 🍬`, color: "#E46B94", life: 32 });
          if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, livesText: "🪽" });
        }
      }

      // Forgiving hitbox
      const hitX = birdX + 5 > p.x && birdX - 5 < p.x + p.w;
      const hitTop = birdY - 4 < p.topH;
      const hitBot = birdY + 4 > p.topH + p.gap;
      if (hitX && (hitTop || hitBot)) {
        endGame("Ơ kìa bảo 'tôi bay mà' sao lại đụng cột hoa phượng rồi! 😂");
        return;
      }

      if (p.x + p.w < -10) {
        pipes.splice(i, 1);
      }
    }

    for (let i = feathers.length - 1; i >= 0; i--) {
      feathers[i].x += feathers[i].vx;
      feathers[i].y += feathers[i].vy;
      feathers[i].life--;
      if (feathers[i].life <= 0) feathers.splice(i, 1);
    }
    for (let i = popups.length - 1; i >= 0; i--) {
      popups[i].y -= 0.7;
      popups[i].life--;
      if (popups[i].life <= 0) popups.splice(i, 1);
    }
  }

  function draw() {
    const px = PixelSprites.px;
    const cycle = score % 240;

    // Sky transitions: Morning -> Sunset -> Starry Night
    if (cycle < 80) {
      px(ctx, 0, 0, 240, 254, "#DCEFFF");
      px(ctx, 0, 140, 240, 114, "#FDE8EF");
    } else if (cycle < 160) {
      px(ctx, 0, 0, 240, 120, "#F6A6B2");
      px(ctx, 0, 120, 240, 134, "#FFE0B2");
      px(ctx, 180, 44, 16, 16, "#FFE985");
    } else {
      px(ctx, 0, 0, 240, 254, "#2A3056");
      px(ctx, 0, 150, 240, 104, "#3A4173");
      const tw = Math.floor(frame / 20) % 2;
      px(ctx, 30, 32, 2, 2, tw ? "#FFF8C9" : "#9AA6E0");
      px(ctx, 110, 48, 2, 2, !tw ? "#FFF8C9" : "#9AA6E0");
      px(ctx, 195, 26, 10, 10, "#FFE994");
      px(ctx, 199, 26, 6, 6, "#2A3056");
    }

    const cOff = (frame * 0.35) % 280;
    const cloudCol = cycle >= 160 ? "rgba(255,255,255,0.22)" : "#FFFFFF";
    px(ctx, 240 - cOff, 42, 28, 8, cloudCol);
    px(ctx, 246 - cOff, 37, 16, 6, cloudCol);
    px(ctx, ((240 - cOff + 140) % 280) - 20, 74, 24, 7, cloudCol);

    pipes.forEach((p) => {
      px(ctx, p.x + 2, 0, p.w - 4, p.topH, "#59A96A");
      px(ctx, p.x + 5, 0, 4, p.topH, "#7ED08E");
      px(ctx, p.x, p.topH - 8, p.w, 8, "#478A56");
      px(ctx, p.x + 3, p.topH - 6, 5, 4, "#E84A4A");
      px(ctx, p.x + 18, p.topH - 5, 5, 3, "#FF7A70");

      const botY = p.topH + p.gap;
      const botH = 254 - botY;
      px(ctx, p.x + 2, botY, p.w - 4, botH, "#59A96A");
      px(ctx, p.x + 5, botY, 4, botH, "#7ED08E");
      px(ctx, p.x, botY, p.w, 8, "#478A56");
      px(ctx, p.x + 5, botY + 2, 5, 4, "#E84A4A");
      px(ctx, p.x + 16, botY + 2, 4, 3, "#FF7A70");

      if (p.pickup && !p.candyTaken) {
        PixelSprites.drawCatchItem(
          ctx,
          { x: p.x + p.w / 2, y: p.topH + p.gap / 2, kind: p.pickup },
          frame
        );
      }
    });

    px(ctx, 0, 254, 240, 26, "#E3B896");
    px(ctx, 0, 254, 240, 4, "#67B374");
    const gStep = started ? (frame % 16) : 0;
    for (let gx = -gStep; gx < 240; gx += 16) {
      px(ctx, gx, 258, 8, 3, "#CC9C78");
    }

    feathers.forEach((f) => {
      px(ctx, f.x, f.y, 3, 2, "#FFF0F5");
    });

    // Winged Bé Bông with authentic Flappy Bird pitch rotation
    ctx.save();
    ctx.translate(birdX, birdY);
    ctx.rotate(birdTilt);
    const wingY = birdVy < 0 ? -3 : 1;
    px(ctx, -11, -6 + wingY, 6, 4, "#FFFFFF");
    px(ctx, -10, -8 + wingY, 4, 3, "#FFF5FA");
    PixelSprites.drawBong(ctx, 0, 7, 1, birdVy < 0 ? "happy" : "idle", frame);
    ctx.restore();

    if (bannerTimer > 0 && bannerText) {
      ctx.fillStyle = "rgba(255, 250, 243, 0.94)";
      ctx.fillRect(14, 14, 212, 22);
      ctx.strokeStyle = "#4A302C";
      ctx.lineWidth = 2;
      ctx.strokeRect(14, 14, 212, 22);
      ctx.fillStyle = "#E46B94";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(bannerText, 120, 29);
      ctx.textAlign = "left";
    }

    popups.forEach((p) => {
      ctx.globalAlpha = Math.min(1, p.life / 16);
      ctx.fillStyle = p.color;
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(p.text, p.x, p.y);
      ctx.textAlign = "left";
      ctx.globalAlpha = 1;
    });
  }

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
    isRunning: () => running
  };
})();
