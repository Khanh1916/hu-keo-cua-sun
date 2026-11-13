window.MiniGame = (() => {
  let canvas = null;
  let ctx = null;
  let rafId = null;
  let running = false;
  let frame = 0;

  let playerX = 120;
  const playerW = 36;
  const playerY = 258;

  let score = 0;
  let candies = 0;
  let lives = 3;
  let combo = 0;
  let hitPoop = false;

  // Power-ups & Juice (Sawtooth curve + Hit-stop)
  let feverTimer = 0;
  let magnetTimer = 0;
  let hasShield = false;
  let shakeTimer = 0;
  let hitStop = 0;
  let wavePhase = "normal"; // "normal" | "surge" | "calm"
  let waveTimer = 420; // 7s baseline -> surge -> calm breather

  let items = [];
  let popups = [];
  let sparks = [];
  let spawnCooldown = 25;

  const keys = { left: false, right: false };
  let callbacks = {};

  function init(canvasEl, cbs) {
    canvas = canvasEl;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    callbacks = cbs || {};

    const updatePointer = (clientX) => {
      if (!running) return;
      const rect = canvas.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * canvas.width;
      playerX = Math.max(20, Math.min(canvas.width - 20, nx));
    };

    canvas.addEventListener("pointerdown", (e) => updatePointer(e.clientX));
    canvas.addEventListener("pointermove", (e) => {
      if (e.buttons > 0 || e.pointerType === "touch") updatePointer(e.clientX);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = true;
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = false;
    });
  }

  function start() {
    score = 0;
    candies = 0;
    lives = 3;
    combo = 0;
    hitPoop = false;
    feverTimer = 0;
    magnetTimer = 0;
    hasShield = false;
    shakeTimer = 0;
    hitStop = 0;
    wavePhase = "normal";
    waveTimer = 420;
    items = [];
    popups = [];
    sparks = [];
    spawnCooldown = 26;
    playerX = 120;
    frame = 0;
    lastTime = 0;
    acc = 0;
    running = true;

    if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, lives });
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

  function spawnBurst(x, y, color, count = 6) {
    for (let i = 0; i < count; i++) {
      const ang = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const spd = 0.8 + Math.random() * 1.6;
      sparks.push({
        x,
        y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 0.6,
        color,
        life: 20 + Math.floor(Math.random() * 10)
      });
    }
  }

  function spawnItem() {
    // Sawtooth difficulty wave: gentle dips & exciting surges instead of flat speed-up
    const waveMult = wavePhase === "surge" ? 1.22 : (wavePhase === "calm" ? 0.85 : 1.0);
    const levelFactor = Math.min(1.55, (0.72 + score / 550) * waveMult);
    const r = Math.random();
    let kind = "candy";
    let pts = 10;
    let candyVal = 1;

    if (feverTimer > 0) {
      // Fever rain: lots of candies & score bonuses!
      if (r < 0.35) {
        kind = "matcha";
        pts = 35;
        candyVal = 1;
      } else if (r < 0.65) {
        kind = "heart";
        pts = 20;
        candyVal = 0;
      } else {
        kind = "candy";
        pts = 15;
        candyVal = 1;
      }
    } else {
      const poopChance = Math.min(0.25, 0.14 + score / 2400);
      if (r < 0.045) {
        kind = Math.random() < 0.5 ? "magnet" : "shield";
        pts = 25;
        candyVal = 0;
      } else if (r < 0.045 + poopChance) {
        kind = "poop";
        pts = 0;
        candyVal = 0;
      } else if (r < 0.045 + poopChance + 0.14) {
        kind = "matcha";
        pts = 30;
        candyVal = 1;
      } else if (r < 0.045 + poopChance + 0.32) {
        kind = "banhmi";
        pts = 20;
        candyVal = 0;
      } else if (r < 0.045 + poopChance + 0.56) {
        kind = "heart";
        pts = 15;
        candyVal = 0;
      } else {
        kind = "candy";
        pts = 10;
        candyVal = Math.random() < 0.4 ? 1 : 0;
      }
    }

    items.push({
      x: 18 + Math.random() * (canvas.width - 36),
      y: -12,
      vy: (1.05 + Math.random() * 0.45) * levelFactor * (feverTimer > 0 ? 1.18 : 1),
      kind,
      pts,
      candyVal
    });
  }

  function addPopup(x, y, text, color) {
    popups.push({ x, y, text, color, life: 40 });
  }

  function update() {
    frame++;
    if (hitStop > 0) {
      hitStop--;
      return;
    }
    if (feverTimer > 0) feverTimer--;
    if (magnetTimer > 0) magnetTimer--;
    if (shakeTimer > 0) shakeTimer--;

    // Sawtooth wave oscillation: Tension -> Climax -> Release
    waveTimer--;
    if (waveTimer <= 0) {
      if (wavePhase === "normal") {
        wavePhase = "surge";
        waveTimer = 300;
        addPopup(120, 95, "⚡ ĐỢT ĐỒ ĂN ĐỔ BỘ! ⚡", "#E46B94");
      } else if (wavePhase === "surge") {
        wavePhase = "calm";
        waveTimer = 210;
        addPopup(120, 95, "🍃 Nghỉ nhịp nhẹ nè...", "#59A96A");
      } else {
        wavePhase = "normal";
        waveTimer = 360;
      }
    }

    if (keys.left) playerX -= 3.9;
    if (keys.right) playerX += 3.9;
    playerX = Math.max(20, Math.min(canvas.width - 20, playerX));

    spawnCooldown--;
    if (spawnCooldown <= 0) {
      spawnItem();
      const baseDelay = feverTimer > 0
        ? 14
        : Math.max(20, 48 - Math.floor(score / 40));
      spawnCooldown = baseDelay + Math.floor(Math.random() * 10);
    }

    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.vy;

      // Magnet pulls good items horizontally toward basket
      if (magnetTimer > 0 && it.kind !== "poop" && it.y > 40) {
        it.x += (playerX - it.x) * 0.075;
      }

      if (it.y >= playerY - 12 && it.y <= playerY + 12 && Math.abs(it.x - playerX) <= playerW * 0.58) {
        if (it.kind === "poop") {
          if (hasShield) {
            hasShield = false;
            AudioManager.playClick();
            spawnBurst(it.x, playerY - 8, "#7CC6FE", 8);
            addPopup(it.x, playerY - 20, "Khiên đỡ rồi! 🛡️", "#3D85C6");
            items.splice(i, 1);
            continue;
          }
          lives--;
          combo = 0;
          hitPoop = true;
          shakeTimer = 14;
          hitStop = 4;
          AudioManager.playBonk();
          spawnBurst(it.x, playerY - 8, "#7A4B2E", 8);
          addPopup(it.x, playerY - 18, "Ối! Trúng cứt!", "#7A4B2E");
          items.splice(i, 1);

          if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, lives });
          if (lives <= 0) {
            running = false;
            if (callbacks.onGameOver) {
              callbacks.onGameOver({ score, candies, hitPoop });
            }
            return;
          }
          continue;
        }

        if (it.kind === "magnet") {
          magnetTimer = 340;
          hitStop = 3;
          AudioManager.playPowerup();
          spawnBurst(it.x, playerY - 8, "#FF6B6B", 10);
          addPopup(it.x, playerY - 22, "Nam châm hút kẹo! 🧲", "#E04848");
        } else if (it.kind === "shield") {
          hasShield = true;
          hitStop = 3;
          AudioManager.playPowerup();
          spawnBurst(it.x, playerY - 8, "#7CC6FE", 10);
          addPopup(it.x, playerY - 22, "Khiên chống cứt! 🛡️", "#3B82F6");
        } else {
          AudioManager.playCombo(combo + 1);
        }

        combo++;
        if (combo === 10 && feverTimer === 0) {
          feverTimer = 280;
          AudioManager.playPowerup();
          addPopup(120, 120, "🔥 CƠN MƯA KẸO NGỌT! 🔥", "#E46B94");
          // Convert any existing poop on screen into candies!
          items.forEach((other) => {
            if (other.kind === "poop") {
              other.kind = "candy";
              other.pts = 15;
              other.candyVal = 1;
            }
          });
        }

        const mult = feverTimer > 0 ? 3 : (combo >= 5 ? 2 : 1);
        const gainedPts = it.pts * mult;
        score += gainedPts;
        candies += it.candyVal;

        spawnBurst(it.x, playerY - 6, it.kind === "heart" ? "#F05D8E" : "#FFE066", 5);
        if (it.kind !== "magnet" && it.kind !== "shield") {
          const label = it.candyVal > 0 ? `+${it.candyVal} 🍬` : (mult > 1 ? `+${gainedPts} x${mult}!` : `+${gainedPts}`);
          addPopup(it.x, playerY - 18, label, "#E46B94");
        }

        items.splice(i, 1);
        if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, lives });
        continue;
      }

      if (it.y > canvas.height + 16) {
        if (it.kind !== "poop" && it.kind !== "magnet" && it.kind !== "shield") {
          combo = 0;
        }
        items.splice(i, 1);
      }
    }

    for (let i = popups.length - 1; i >= 0; i--) {
      popups[i].y -= 0.75;
      popups[i].life--;
      if (popups[i].life <= 0) popups.splice(i, 1);
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.08;
      s.life--;
      if (s.life <= 0) sparks.splice(i, 1);
    }
  }

  function drawPowerupIcon(it) {
    const px = PixelSprites.px;
    const x = Math.round(it.x);
    const y = Math.round(it.y);
    if (it.kind === "magnet") {
      px(ctx, x - 6, y - 6, 12, 12, "#FFE3E3");
      px(ctx, x - 5, y - 4, 3, 8, "#E04848");
      px(ctx, x + 2, y - 4, 3, 8, "#E04848");
      px(ctx, x - 5, y + 2, 10, 3, "#E04848");
      px(ctx, x - 5, y - 5, 3, 2, "#D1D5DB");
      px(ctx, x + 2, y - 5, 3, 2, "#D1D5DB");
    } else {
      // Shield
      px(ctx, x - 6, y - 6, 12, 8, "#60A5FA");
      px(ctx, x - 4, y + 2, 8, 3, "#60A5FA");
      px(ctx, x - 2, y + 5, 4, 2, "#60A5FA");
      px(ctx, x - 4, y - 4, 8, 5, "#DBEAFE");
    }
  }

  function draw() {
    const px = PixelSprites.px;
    ctx.save();
    if (shakeTimer > 0) {
      const dx = Math.round((Math.random() - 0.5) * 5);
      const dy = Math.round((Math.random() - 0.5) * 5);
      ctx.translate(dx, dy);
    }

    // Background (glows golden-pink during Fever Mode!)
    if (feverTimer > 0) {
      px(ctx, 0, 0, canvas.width, canvas.height, frame % 16 < 8 ? "#FFF0D6" : "#FFE4F0");
    } else {
      px(ctx, 0, 0, canvas.width, canvas.height, "#FFF5F8");
      px(ctx, 0, 0, canvas.width, 95, "#FFEAF1");
    }

    px(ctx, 0, 250, canvas.width, 30, "#F5DFCA");
    px(ctx, 0, 248, canvas.width, 2, "#D5AE8E");

    const cx1 = (frame * 0.22) % (canvas.width + 40) - 20;
    px(ctx, cx1, 30, 26, 7, "#FFFFFF");
    px(ctx, cx1 + 5, 26, 14, 5, "#FFFFFF");

    // Falling items
    items.forEach((it) => {
      if (it.kind === "magnet" || it.kind === "shield") {
        drawPowerupIcon(it);
      } else {
        PixelSprites.drawCatchItem(ctx, it, frame);
      }
    });

    // Shield aura around player
    if (hasShield) {
      px(ctx, playerX - 18, playerY - 22, 36, 2, "#7CC6FE");
      px(ctx, playerX - 18, playerY + 12, 36, 2, "#7CC6FE");
    }

    // Catcher: Khánh Mini + basket
    PixelSprites.drawKhanh(ctx, playerX, playerY + 12, (combo >= 3 || feverTimer > 0) ? "happy" : "idle", frame);
    px(ctx, playerX - 16, playerY - 5, 32, 9, feverTimer > 0 ? "#F59E0B" : "#E46B94");
    px(ctx, playerX - 17, playerY - 7, 34, 3, feverTimer > 0 ? "#FDE68A" : "#F9C8D9");
    px(ctx, playerX - 12, playerY - 2, 24, 3, feverTimer > 0 ? "#FBBF24" : "#F49CB8");

    // Sparks
    sparks.forEach((s) => {
      px(ctx, s.x, s.y, 2, 2, s.color);
    });

    // Active status pills
    let statusY = 15;
    if (feverTimer > 0) {
      ctx.fillStyle = "#D97706";
      ctx.font = "bold 10px monospace";
      ctx.fillText(`🔥 FEVER x3 (${Math.ceil(feverTimer / 60)}s)`, 8, statusY);
      statusY += 13;
    } else if (combo >= 3) {
      ctx.fillStyle = "#E46B94";
      ctx.font = "bold 10px monospace";
      ctx.fillText(`COMBO x${combo} (10 = FEVER!)`, 8, statusY);
      statusY += 13;
    }
    if (magnetTimer > 0) {
      ctx.fillStyle = "#DC2626";
      ctx.font = "bold 10px monospace";
      ctx.fillText(`🧲 HÚT KẸO (${Math.ceil(magnetTimer / 60)}s)`, 8, statusY);
    }

    // Popups
    popups.forEach((p) => {
      ctx.globalAlpha = Math.min(1, p.life / 16);
      ctx.fillStyle = p.color;
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(p.text, p.x, p.y);
      ctx.textAlign = "left";
      ctx.globalAlpha = 1;
    });

    ctx.restore();
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
    isRunning: () => running
  };
})();
