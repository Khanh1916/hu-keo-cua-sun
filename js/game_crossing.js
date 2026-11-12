window.CrossingGame = (() => {
  let canvas = null;
  let ctx = null;
  let rafId = null;
  let running = false;
  let frame = 0;
  let callbacks = {};

  const TILE = 24;
  const COLS = 10;

  let playerCol = 4;
  let playerRow = 1;
  let visCol = 4;
  let visRow = 1;
  let hopAnim = 0; // 0..1 bounce arc

  let maxRowReached = 1;
  let camY = 0;
  let score = 0;
  let candies = 0;

  let streak = 0;
  let lastForwardFrame = -999;
  let idleTimer = 0; // Anti-camp pacing enforcer
  let bannerText = "";
  let bannerTimer = 0;

  let lanes = {};
  let popups = [];
  let sparks = [];
  let touchStart = null;

  function makeLane(rowIdx) {
    if (rowIdx <= 2) {
      return { type: "grass", trees: [0, 9], coins: [] };
    }

    // Hải Phòng Express Rail every 16th row (after gentle onboarding rows 0..15)
    if (rowIdx >= 16 && rowIdx % 16 === 0) {
      return {
        type: "rail",
        dir: Math.random() < 0.5 ? 1 : -1,
        cycle: Math.floor(Math.random() * 140),
        trainX: -200,
        objs: [],
        coins: [{ col: 4 + Math.floor(Math.random() * 2), kind: "heart", taken: false }]
      };
    }

    // Gradual first-session curve: gentle & fair in early rows, ramping smoothly later
    const difficulty = Math.min(1.45, 0.52 + rowIdx / 60);
    const r = Math.random();
    let type = "grass";
    if (r < 0.48) type = "road";
    else if (r < 0.74) type = "river";

    if (
      rowIdx === 5 ||
      rowIdx === 8 ||
      rowIdx % 5 === 0 ||
      (rowIdx >= 16 && (rowIdx - 1) % 16 === 0)
    ) {
      type = "grass";
    }

    const coins = [];
    if (Math.random() < 0.52) {
      coins.push({
        col: 1 + Math.floor(Math.random() * 8),
        kind: Math.random() < 0.35 ? "heart" : "candy",
        taken: false
      });
    }

    if (type === "grass") {
      const trees = [];
      for (let c = 0; c < COLS; c++) {
        if ((c === 0 || c === 9) && Math.random() < 0.65) trees.push(c);
        else if (c !== 4 && c !== 5 && Math.random() < 0.14) trees.push(c);
      }
      return { type, trees, coins };
    }

    const dir = Math.random() < 0.5 ? 1 : -1;
    const speed = (0.40 + Math.random() * 0.42) * difficulty * dir;
    const objs = [];

    if (type === "road") {
      const count = rowIdx < 10 ? 2 : (2 + (Math.random() < 0.45 ? 1 : 0));
      const spacing = 240 / count;
      const palette = ["#E85D75", "#4D9DE0", "#F7B32B", "#FFFDF7", "#67B374"];
      const colr = palette[Math.floor(Math.random() * palette.length)];
      for (let i = 0; i < count; i++) {
        const isBus = Math.random() < 0.3;
        objs.push({
          x: i * spacing + Math.random() * 20,
          w: isBus ? 34 : 22,
          color: colr
        });
      }
      return { type, speed, objs, coins };
    }

    // Wider logs early on for easy river confidence
    const count = rowIdx < 12 ? 3 : (2 + (Math.random() < 0.55 ? 1 : 0));
    const spacing = 240 / count;
    const baseLogW = rowIdx < 12 ? 52 : 44;
    for (let i = 0; i < count; i++) {
      objs.push({
        x: i * spacing + Math.random() * 12,
        w: baseLogW + Math.floor(Math.random() * 14)
      });
    }
    return { type, speed, objs, coins };
  }

  function ensureLanes() {
    for (let r = playerRow - 4; r <= playerRow + 14; r++) {
      if (r >= 0 && !lanes[r]) {
        lanes[r] = makeLane(r);
      }
    }
  }

  function addPopup(x, y, text, color) {
    popups.push({ x, y, text, color, life: 36 });
  }

  function spawnSparks(x, y, color) {
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI * 2 * i) / 6;
      sparks.push({ x, y, vx: Math.cos(a) * 1.3, vy: Math.sin(a) * 1.3, color, life: 18 });
    }
  }

  function move(dCol, dRow) {
    if (!running) return;
    const nextCol = Math.round(playerCol + dCol);
    const nextRow = playerRow + dRow;

    if (nextCol < 0 || nextCol >= COLS || nextRow < maxRowReached - 4) return;
    ensureLanes();

    const targetLane = lanes[nextRow];
    if (targetLane && targetLane.type === "grass" && targetLane.trees.includes(nextCol)) {
      return;
    }

    playerCol = nextCol;
    playerRow = nextRow;
    hopAnim = 1;

    if (dRow > 0 && playerRow > maxRowReached) {
      maxRowReached = playerRow;
      idleTimer = 0;
      if (frame - lastForwardFrame <= 55) {
        streak = Math.min(8, streak + 1);
      } else {
        streak = 1;
      }
      lastForwardFrame = frame;

      const ptsGain = 10 + (streak >= 3 ? (streak - 2) * 3 : 0);
      score += ptsGain;
      if (maxRowReached % 5 === 0) candies += 1;

      if (streak >= 3) {
        AudioManager.playCombo(streak);
      } else {
        AudioManager.playClick();
      }

      // Hải Phòng Milestones!
      if (maxRowReached === 10) {
        candies += 2;
        bannerText = "📍 Qua Cầu Bính rồi! +2 🍬";
        bannerTimer = 110;
        AudioManager.playPowerup();
      } else if (maxRowReached === 20) {
        candies += 3;
        bannerText = "📍 Tới Lạch Tray ăn bánh đa cua! +3 🍬";
        bannerTimer = 110;
        AudioManager.playPowerup();
      } else if (maxRowReached === 35) {
        candies += 5;
        bannerText = "📍 Về Thủy Nguyên uống Cing House! +5 🍬";
        bannerTimer = 120;
        AudioManager.playPowerup();
      } else if (maxRowReached > 35 && maxRowReached % 20 === 0) {
        candies += 3;
        bannerText = `📍 Siêu tốc ${maxRowReached} bước! +3 🍬`;
        bannerTimer = 100;
        AudioManager.playPowerup();
      }

      if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, livesText: "🐱" });
    } else {
      AudioManager.playClick();
    }

    if (targetLane && targetLane.coins) {
      targetLane.coins.forEach((cn) => {
        if (!cn.taken && cn.col === Math.round(playerCol)) {
          cn.taken = true;
          const addC = cn.kind === "heart" ? 2 : 1;
          candies += addC;
          score += 15;
          AudioManager.playCandy();
          const sx = playerCol * TILE + TILE / 2;
          const sy = rowToScreenY(playerRow) + TILE / 2;
          spawnSparks(sx, sy, cn.kind === "heart" ? "#F05D8E" : "#FFE066");
          addPopup(sx, sy - 10, `+${addC} 🍬`, "#E46B94");
          if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, livesText: "🐱" });
        }
      });
    }
  }

  function bindInput(canvasEl) {
    canvasEl.addEventListener("pointerdown", (e) => {
      if (!running) return;
      touchStart = { x: e.clientX, y: e.clientY };
    });

    canvasEl.addEventListener("pointerup", (e) => {
      if (!running || !touchStart) return;
      const dx = e.clientX - touchStart.x;
      const dy = e.clientY - touchStart.y;
      touchStart = null;

      if (Math.hypot(dx, dy) > 18) {
        if (Math.abs(dx) > Math.abs(dy)) {
          move(dx > 0 ? 1 : -1, 0);
        } else {
          move(0, dy < 0 ? 1 : -1);
        }
      } else {
        move(0, 1);
      }
    });

    window.addEventListener("keydown", (e) => {
      if (!running) return;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") { e.preventDefault(); move(0, 1); }
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") { e.preventDefault(); move(0, -1); }
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") { e.preventDefault(); move(-1, 0); }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") { e.preventDefault(); move(1, 0); }
    });
  }

  function init(canvasEl, cbs) {
    canvas = canvasEl;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    callbacks = cbs || {};
    bindInput(canvas);
  }

  function start() {
    playerCol = 4;
    playerRow = 1;
    visCol = 4;
    visRow = 1;
    hopAnim = 0;
    maxRowReached = 1;
    camY = 0;
    score = 0;
    candies = 0;
    streak = 0;
    lastForwardFrame = -999;
    idleTimer = 0;
    bannerText = "Nhảy nhanh để ăn combo x2 nhé!";
    bannerTimer = 95;
    lanes = {};
    popups = [];
    sparks = [];
    frame = 0;
    lastTime = 0;
    acc = 0;
    running = true;
    ensureLanes();
    if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, livesText: "🐱" });
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

  function endGame(reason) {
    running = false;
    AudioManager.playBonk();
    if (callbacks.onGameOver) {
      callbacks.onGameOver({ score, candies, reason });
    }
  }

  function update() {
    frame++;
    if (bannerTimer > 0) bannerTimer--;
    if (hopAnim > 0) hopAnim = Math.max(0, hopAnim - 0.16);
    visCol += (playerCol - visCol) * 0.35;
    visRow += (playerRow - visRow) * 0.35;

    ensureLanes();

    // Track idle time for gentle non-punishing hint only (never force-kill!)
    if (maxRowReached >= 4) {
      idleTimer++;
    }

    const targetCam = Math.max(0, (maxRowReached - 2) * TILE);
    camY += (targetCam - camY) * 0.15;

    for (let r = maxRowReached - 5; r <= maxRowReached + 14; r++) {
      const lane = lanes[r];
      if (!lane || lane.type === "grass") continue;
      if (lane.type === "rail") {
        lane.cycle = (lane.cycle + 1) % 240;
        if (lane.cycle === 110) {
          lane.trainX = lane.dir > 0 ? -150 : 250;
        }
        if (lane.cycle >= 110 && lane.cycle < 195) {
          lane.trainX += lane.dir * 5.2;
        }
        continue;
      }
      lane.objs.forEach((o) => {
        o.x += lane.speed;
        if (lane.speed > 0 && o.x > 250) o.x = -o.w - 10;
        if (lane.speed < 0 && o.x + o.w < -10) o.x = 250;
      });
    }

    const curLane = lanes[playerRow];
    const pxCenter = playerCol * TILE + TILE / 2;

    if (curLane && curLane.type === "rail") {
      if (curLane.cycle >= 110 && curLane.cycle < 195) {
        if (pxCenter + 6 > curLane.trainX && pxCenter - 6 < curLane.trainX + 130) {
          endGame("Suýt thì lên tàu Hà Nội - Hải Phòng cùng đoàn tàu tốc hành rồi! 🚆😂");
          return;
        }
      }
    } else if (curLane && curLane.type === "road") {
      for (const car of curLane.objs) {
        if (pxCenter + 6 > car.x && pxCenter - 6 < car.x + car.w) {
          endGame("Bé Bông bị xe đụng trúng rồi! (Đi đường cẩn thận đừng bay nha 😆)");
          return;
        }
      }
    } else if (curLane && curLane.type === "river") {
      let onLog = false;
      for (const log of curLane.objs) {
        if (pxCenter >= log.x - 3 && pxCenter <= log.x + log.w + 3) {
          onLog = true;
          playerCol += curLane.speed / TILE;
          visCol = playerCol;
          break;
        }
      }
      if (!onLog || playerCol < -0.3 || playerCol > COLS - 0.7) {
        endGame("Bé Bông rơi xuống sông Cảng rồi 💦 Thử lại nhé!");
        return;
      }
    }

    for (let i = popups.length - 1; i >= 0; i--) {
      popups[i].y -= 0.7;
      popups[i].life--;
      if (popups[i].life <= 0) popups.splice(i, 1);
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      sparks[i].x += sparks[i].vx;
      sparks[i].y += sparks[i].vy;
      sparks[i].life--;
      if (sparks[i].life <= 0) sparks.splice(i, 1);
    }
  }

  function rowToScreenY(row) {
    return 256 - row * TILE + camY;
  }

  function draw() {
    const px = PixelSprites.px;
    px(ctx, 0, 0, 240, 280, "#D9F0D1");

    for (let r = Math.max(0, maxRowReached - 5); r <= maxRowReached + 14; r++) {
      const sy = rowToScreenY(r);
      if (sy < -TILE || sy > 280 + TILE) continue;
      const lane = lanes[r];
      if (!lane) continue;

      if (lane.type === "grass") {
        px(ctx, 0, sy, 240, TILE, r % 2 === 0 ? "#BEE5B0" : "#B2DC9F");
        lane.trees.forEach((c) => {
          const tx = c * TILE + 4;
          px(ctx, tx + 6, sy + 13, 4, 9, "#7A4B2E");
          px(ctx, tx + 1, sy + 3, 14, 12, "#4F9D5A");
          px(ctx, tx + 3, sy + 5, 3, 3, "#E84A4A");
          px(ctx, tx + 10, sy + 7, 3, 2, "#FF7A70");
        });
      } else if (lane.type === "road") {
        px(ctx, 0, sy, 240, TILE, "#5A5A66");
        px(ctx, 0, sy, 240, 2, "#787886");
        for (let dx = 4; dx < 240; dx += 20) {
          px(ctx, dx, sy + 11, 10, 2, "#EAD9A7");
        }
        lane.objs.forEach((car) => {
          px(ctx, car.x, sy + 4, car.w, 16, car.color);
          px(ctx, car.x + 4, sy + 6, car.w - 8, 12, "#FFEFF5");
          px(ctx, car.x + 2, sy + 2, 4, 2, "#242229");
          px(ctx, car.x + car.w - 6, sy + 2, 4, 2, "#242229");
          px(ctx, car.x + 2, sy + 20, 4, 2, "#242229");
          px(ctx, car.x + car.w - 6, sy + 20, 4, 2, "#242229");
          // Headlights
          const hx = lane.speed > 0 ? car.x + car.w - 2 : car.x;
          px(ctx, hx, sy + 6, 2, 3, "#FFF3A1");
          px(ctx, hx, sy + 15, 2, 3, "#FFF3A1");
        });
      } else if (lane.type === "rail") {
        // Railway track with wooden ties + warning light!
        px(ctx, 0, sy, 240, TILE, "#7E6B63");
        for (let tx = 4; tx < 240; tx += 12) {
          px(ctx, tx, sy + 3, 4, 18, "#594339");
        }
        px(ctx, 0, sy + 5, 240, 2, "#C4CDD5");
        px(ctx, 0, sy + 17, 240, 2, "#C4CDD5");
        // Warning light during frames 60..110
        if (lane.cycle >= 60 && lane.cycle < 110) {
          const blink = Math.floor(frame / 6) % 2 === 0;
          px(ctx, 4, sy + 4, 8, 16, "#242229");
          px(ctx, 6, sy + 6, 4, 4, blink ? "#FF4B4B" : "#551B1B");
          px(ctx, 6, sy + 14, 4, 4, !blink ? "#FFD166" : "#55441B");
        }
        // Express train!
        if (lane.cycle >= 110 && lane.cycle < 195) {
          px(ctx, lane.trainX, sy + 3, 130, 18, "#E46B94");
          px(ctx, lane.trainX + 4, sy + 5, 122, 14, "#FFFDF7");
          px(ctx, lane.trainX + 8, sy + 7, 16, 8, "#8ED6FF");
          px(ctx, lane.trainX + 32, sy + 7, 16, 8, "#8ED6FF");
          px(ctx, lane.trainX + 56, sy + 7, 16, 8, "#8ED6FF");
          px(ctx, lane.trainX + 80, sy + 7, 16, 8, "#8ED6FF");
          px(ctx, lane.trainX + 104, sy + 7, 16, 8, "#8ED6FF");
        }
      } else {
        px(ctx, 0, sy, 240, TILE, "#7EC8F2");
        const wave = (frame + r * 7) % 30 < 15 ? 0 : 2;
        px(ctx, 20 + wave, sy + 6, 14, 2, "#AEE0FA");
        px(ctx, 140 - wave, sy + 16, 18, 2, "#AEE0FA");
        lane.objs.forEach((log) => {
          px(ctx, log.x, sy + 4, log.w, 16, "#9B6747");
          px(ctx, log.x + 2, sy + 6, log.w - 4, 12, "#B87E59");
          px(ctx, log.x + 6, sy + 10, log.w - 12, 2, "#835236");
        });
      }

      if (lane.coins) {
        lane.coins.forEach((cn) => {
          if (cn.taken) return;
          PixelSprites.drawCatchItem(
            ctx,
            { x: cn.col * TILE + TILE / 2, y: sy + TILE / 2, kind: cn.kind },
            frame
          );
        });
      }
    }

    // Draw Bé Bông with bouncy hop arc!
    const hopHeight = Math.sin(hopAnim * Math.PI) * 7;
    const pScreenX = visCol * TILE + TILE / 2;
    const pScreenY = rowToScreenY(visRow) + TILE - 4 - hopHeight;
    PixelSprites.drawBong(ctx, pScreenX, pScreenY, 1, hopAnim > 0 ? "happy" : "walk", frame);

    sparks.forEach((s) => px(ctx, s.x, s.y, 2, 2, s.color));

    if (streak >= 3) {
      ctx.fillStyle = "#E46B94";
      ctx.font = "bold 10px monospace";
      ctx.fillText(`🔥 NHẢY NHANH x${streak}`, 8, 16);
    }

    // Gentle friendly hint after waiting > 7s (no penalty!)
    if (idleTimer > 420) {
      ctx.fillStyle = "#7B5B55";
      ctx.font = "bold 9.5px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("Canh trống rồi nhảy nha Bông 🐾", 232, 16);
      ctx.textAlign = "left";
    }

    if (bannerTimer > 0 && bannerText) {
      ctx.fillStyle = "rgba(255, 250, 243, 0.92)";
      ctx.fillRect(16, 24, 208, 22);
      ctx.strokeStyle = "#4A302C";
      ctx.lineWidth = 2;
      ctx.strokeRect(16, 24, 208, 22);
      ctx.fillStyle = "#E46B94";
      ctx.font = "bold 10.5px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(bannerText, 120, 39);
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
    move,
    isRunning: () => running
  };
})();
