window.RoomScene = (() => {
  let canvas = null;
  let ctx = null;
  let frame = 0;
  let rafId = null;

  let getStateFn = null;
  let onInteractFn = null;

  // Character states
  const khanh = {
    x: 112,
    y: 158,
    targetX: 112,
    state: "idle",
    stateTimer: 0
  };

  const bong = {
    x: 146,
    y: 164,
    dir: -1,
    targetX: 146,
    state: "idle",
    stateTimer: 0,
    pauseTimer: 60
  };

  // Ambient falling hoa phượng petals outside window
  const petals = Array.from({ length: 8 }, (_, i) => ({
    x: 90 + (i * 9) % 60,
    y: 26 + (i * 11) % 55,
    speed: 0.16 + (i % 3) * 0.06,
    sway: i * 0.9
  }));

  // Floating particles (hearts, notes, food)
  const particles = [];

  function init(canvasEl, getState, onInteract) {
    canvas = canvasEl;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    getStateFn = getState;
    onInteractFn = onInteract;

    canvas.addEventListener("click", handleCanvasClick);
    if (!rafId) {
      loop();
    }
  }

  function getActiveTimeOfDay() {
    const state = getStateFn ? getStateFn() : {};
    if (state.timeOverride && state.timeOverride !== "auto") {
      return state.timeOverride;
    }
    const h = new Date().getHours();
    if (h >= 6 && h < 16) return "morning";
    if (h >= 16 && h < 19) return "sunset";
    return "night";
  }

  function handleCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top) * scaleY;

    // Check Bé Bông hitbox first (since smaller)
    if (Math.abs(cx - bong.x) <= 14 && cy >= bong.y - 20 && cy <= bong.y + 6) {
      triggerBongHappy();
      if (onInteractFn) onInteractFn("bong");
      return;
    }

    // Check Khánh Mini hitbox
    if (Math.abs(cx - khanh.x) <= 16 && cy >= khanh.y - 36 && cy <= khanh.y + 6) {
      triggerKhanhHappy();
      if (onInteractFn) onInteractFn("khanh");
      return;
    }

    // Clicked elsewhere on floor -> move Khánh & Bông slightly for fun!
    if (cy >= 136 && cy <= 185) {
      khanh.targetX = Math.max(76, Math.min(182, Math.round(cx)));
    }
  }

  function spawnHeart(x, y, color = "#E46B94") {
    particles.push({
      x: x + (Math.random() * 10 - 5),
      y,
      vy: -0.45 - Math.random() * 0.25,
      life: 48,
      maxLife: 48,
      kind: "heart",
      color
    });
  }

  function triggerKhanhHappy(mode = "happy") {
    khanh.state = mode;
    khanh.stateTimer = 95;
    for (let i = 0; i < 4; i++) {
      setTimeout(() => spawnHeart(khanh.x, khanh.y - 32), i * 110);
    }
  }

  function triggerBongHappy() {
    bong.state = "happy";
    bong.stateTimer = 85;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawnHeart(bong.x, bong.y - 16, "#F49CB8"), i * 100);
    }
  }

  function updateCharacters() {
    // Update Khánh
    if (khanh.stateTimer > 0) {
      khanh.stateTimer--;
      if (khanh.stateTimer === 0) khanh.state = "idle";
    }
    if (Math.abs(khanh.targetX - khanh.x) > 1 && khanh.state === "idle") {
      khanh.x += khanh.targetX > khanh.x ? 0.5 : -0.5;
    } else if (frame % 260 === 0 && khanh.state === "idle") {
      khanh.targetX = 88 + Math.floor(Math.random() * 68);
    }

    // Update Bé Bông
    if (bong.stateTimer > 0) {
      bong.stateTimer--;
      if (bong.stateTimer === 0) bong.state = "idle";
    }

    if (bong.state !== "happy") {
      if (bong.pauseTimer > 0) {
        bong.pauseTimer--;
        bong.state = "idle";
        if (bong.pauseTimer === 0) {
          const state = getStateFn ? getStateFn() : {};
          const hasBed = state.placedDecor && state.placedDecor.includes("bong_bed");
          if (hasBed && Math.random() < 0.3) {
            bong.targetX = 35;
          } else {
            bong.targetX = 64 + Math.floor(Math.random() * 115);
          }
        }
      } else {
        const dx = bong.targetX - bong.x;
        if (Math.abs(dx) > 1) {
          bong.state = "walk";
          bong.dir = dx > 0 ? 1 : -1;
          bong.x += bong.dir * 0.45;
        } else {
          bong.state = "idle";
          bong.pauseTimer = 90 + Math.floor(Math.random() * 110);
        }
      }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  function drawWindow(tod) {
    const px = PixelSprites.px;
    const wx = 82, wy = 24, ww = 76, wh = 62;

    // Sky background inside window
    if (tod === "morning") {
      px(ctx, wx, wy, ww, wh, "#BDE6FF");
      px(ctx, wx, wy + 34, ww, 28, "#DDF2FF");
      // Fluffy clouds
      px(ctx, wx + 10, wy + 12, 18, 5, "#FFFFFF");
      px(ctx, wx + 14, wy + 9, 10, 4, "#FFFFFF");
      px(ctx, wx + 48, wy + 18, 16, 4, "#FFFFFF");
    } else if (tod === "sunset") {
      px(ctx, wx, wy, ww, 24, "#F6A6B2");
      px(ctx, wx, wy + 24, ww, 20, "#FFC79A");
      px(ctx, wx, wy + 44, ww, 18, "#FFE5B4");
      // Warm sun
      px(ctx, wx + 50, wy + 30, 12, 12, "#FFE985");
    } else {
      px(ctx, wx, wy, ww, wh, "#262D54");
      px(ctx, wx, wy + 36, ww, 26, "#343D6E");
      // Twinkling stars & moon
      const twinkle = Math.floor(frame / 25) % 2 === 0;
      px(ctx, wx + 12, wy + 10, 2, 2, twinkle ? "#FFF8C9" : "#A9B4E8");
      px(ctx, wx + 36, wy + 16, 2, 2, !twinkle ? "#FFF8C9" : "#A9B4E8");
      px(ctx, wx + 60, wy + 8, 2, 2, "#FFF8C9");
      px(ctx, wx + 52, wy + 12, 8, 8, "#FFE994");
      px(ctx, wx + 55, wy + 12, 5, 5, "#262D54"); // crescent
    }

    // Hoa Phượng Đỏ (Hải Phòng flamboyant branch visible on left of window)
    px(ctx, wx + 4, wy + 42, 3, 20, "#6E4A3A");
    px(ctx, wx + 6, wy + 32, 18, 2, "#6E4A3A");
    // Green leaves
    px(ctx, wx + 2, wy + 24, 24, 10, "#509E5C");
    px(ctx, wx + 8, wy + 20, 20, 8, "#63B86E");
    // Red flamboyant clusters (hoa phượng đỏ)
    px(ctx, wx + 4, wy + 22, 6, 4, "#E84A4A");
    px(ctx, wx + 15, wy + 20, 7, 5, "#F25C54");
    px(ctx, wx + 24, wy + 25, 5, 4, "#E84A4A");
    px(ctx, wx + 10, wy + 29, 5, 3, "#FF7A70");

    // Falling petals
    petals.forEach((pt) => {
      pt.y += pt.speed;
      if (pt.y > wy + wh - 3) {
        pt.y = wy + 22;
        pt.x = wx + 6 + Math.random() * 58;
      }
      const ox = pt.x + Math.sin(frame * 0.05 + pt.sway) * 2.5;
      px(ctx, ox, pt.y, 2, 2, "#F25C54");
    });

    // Window frame & sill
    px(ctx, wx - 3, wy - 3, ww + 6, 3, "#9B6747");
    px(ctx, wx - 3, wy + wh, ww + 6, 5, "#B87E59");
    px(ctx, wx - 3, wy, 3, wh, "#9B6747");
    px(ctx, wx + ww, wy, 3, wh, "#9B6747");
    px(ctx, wx + Math.floor(ww / 2) - 1, wy, 2, wh, "#9B6747");
    px(ctx, wx, wy + 32, ww, 2, "#9B6747");
  }

  function drawBaseRoom(state, tod) {
    const px = PixelSprites.px;

    // Cream & Pastel Pink Striped Wall
    px(ctx, 0, 0, 240, 128, "#FFF6F2");
    for (let sx = 0; sx < 240; sx += 16) {
      px(ctx, sx, 0, 8, 128, "#FDE8EF");
    }
    // Wainscoting / dado rail
    px(ctx, 0, 102, 240, 3, "#DFB79B");
    px(ctx, 0, 105, 240, 23, "#F6E4D4");

    // Warm Wooden Floor
    px(ctx, 0, 128, 240, 72, "#E3B896");
    for (let fy = 138; fy < 200; fy += 12) {
      px(ctx, 0, fy, 240, 1, "#CC9C78");
    }
    for (let fx = 24; fx < 240; fx += 44) {
      px(ctx, fx, 128, 1, 10, "#CC9C78");
      px(ctx, fx + 20, 139, 1, 11, "#CC9C78");
      px(ctx, fx - 8, 151, 1, 11, "#CC9C78");
      px(ctx, fx + 14, 163, 1, 11, "#CC9C78");
    }

    // Window
    drawWindow(tod);

    // Wall Plaque: HN <-> HP with beating heart
    px(ctx, 18, 36, 46, 20, "#B87E59");
    px(ctx, 20, 38, 42, 16, "#FFFDF7");
    ctx.fillStyle = "#4A302C";
    ctx.font = "bold 7px monospace";
    ctx.fillText("HN", 23, 48);
    ctx.fillText("HP", 50, 48);
    const beat = Math.floor(frame / 20) % 2 === 0;
    px(ctx, 38, beat ? 43 : 44, 5, 4, "#E46B94");
    px(ctx, 39, beat ? 47 : 48, 3, 1, "#E46B94");

    // Cozy Bed on Left
    px(ctx, 8, 114, 56, 32, "#9B6747"); // headboard & frame
    px(ctx, 10, 118, 52, 24, "#FFFDF7"); // mattress
    px(ctx, 12, 120, 20, 9, "#F9C8D9"); // pastel pink pillow
    px(ctx, 10, 129, 52, 14, "#F7B6CC"); // cozy pink blanket
    px(ctx, 10, 129, 52, 3, "#FDE4ED"); // blanket fold

    // Right Wooden Shelf + Visual Candy Jar ("Hũ Kẹo Của Sún")
    px(ctx, 188, 116, 44, 5, "#9B6747");
    px(ctx, 192, 121, 4, 20, "#835236");
    px(ctx, 224, 121, 4, 20, "#835236");
    // Glass Jar at x:196, y:96
    px(ctx, 198, 95, 16, 3, "#E46B94"); // pink jar lid
    px(ctx, 196, 98, 20, 18, "rgba(255, 255, 255, 0.72)");
    px(ctx, 196, 98, 1, 18, "#8EAAB8");
    px(ctx, 215, 98, 1, 18, "#8EAAB8");
    px(ctx, 196, 115, 20, 1, "#8EAAB8");
    // Fill jar visually with colorful candies based on state.candy!
    const candyLevel = Math.min(12, Math.floor((state.candy || 0) / 8) + (state.candy > 0 ? 1 : 0));
    const candyColors = ["#FF85B3", "#FFE066", "#8CE09A", "#95D5FF", "#FFAD7A"];
    for (let c = 0; c < candyLevel; c++) {
      const row = Math.floor(c / 4);
      const col = c % 4;
      px(ctx, 198 + col * 4, 111 - row * 4, 3, 3, candyColors[c % candyColors.length]);
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

  function drawAnniversaryDecor() {
    const px = PixelSprites.px;
    // Sparkling pink & gold garland on upper wall
    const garland = [18, 34, 50, 66, 174, 190, 206, 222];
    garland.forEach((gx, idx) => {
      const glow = ((Math.floor(frame / 16) + idx) % 2 === 0);
      px(ctx, gx, 8, 4, 4, glow ? "#F49CB8" : "#FFE066");
      if (glow) px(ctx, gx - 1, 7, 6, 6, "rgba(244, 156, 184, 0.28)");
    });

    // Romantic bouquet of roses & candle on small stand (x: 158, y: 152)
    const cx = 158, cy = 152;
    px(ctx, cx - 2, cy + 8, 22, 3, "#C88E68");
    px(ctx, cx + 6, cy + 11, 6, 6, "#9B6747");
    // Vase + pastel pink/red flowers
    px(ctx, cx + 2, cy + 1, 8, 7, "#FFFDF7");
    px(ctx, cx + 1, cy - 3, 4, 4, "#E46B94");
    px(ctx, cx + 5, cy - 4, 4, 4, "#F25C54");
    px(ctx, cx + 7, cy - 1, 4, 3, "#F9C8D9");
    // Warm candle beside bouquet
    px(ctx, cx + 13, cy + 2, 3, 6, "#FFFDF7");
    const fl = Math.floor(frame / 10) % 2;
    px(ctx, cx + 14, cy - 1 + fl, 2, 3, "#FFD166");

    // Gently rising pixel hearts in the room
    for (let h = 0; h < 6; h++) {
      const hy = 175 - ((frame * 0.35 + h * 30) % 155);
      const hx = 28 + h * 36 + Math.sin(frame * 0.04 + h) * 5;
      const col = h % 2 === 0 ? "#F49CB8" : "#E46B94";
      px(ctx, hx - 2, hy - 1, 2, 2, col);
      px(ctx, hx + 1, hy - 1, 2, 2, col);
      px(ctx, hx - 2, hy, 5, 2, col);
      px(ctx, hx - 1, hy + 2, 3, 1, col);
    }
  }

  function drawBirthdayDecor(bdayWho) {
    const px = PixelSprites.px;
    // Colorful pastel bunting flags across top wall
    const flagColors = ["#F49CB8", "#FFE066", "#8ED6FF", "#9EE0A8", "#FFB88C"];
    for (let fx = 10; fx < 230; fx += 18) {
      const col = flagColors[(fx / 18) % flagColors.length | 0];
      px(ctx, fx, 4, 10, 4, col);
      px(ctx, fx + 2, 8, 6, 3, col);
      px(ctx, fx + 4, 11, 2, 2, col);
    }

    // Floating balloons near bed & right corner
    const bob = Math.round(Math.sin(frame * 0.06) * 2);
    // Balloon 1 (pink)
    px(ctx, 64, 78 + bob, 10, 12, "#F49CB8");
    px(ctx, 66, 76 + bob, 6, 15, "#F49CB8");
    px(ctx, 66, 79 + bob, 2, 3, "#FFFFFF");
    px(ctx, 68, 91 + bob, 1, 18, "#8B5A42");
    // Balloon 2 (gold)
    px(ctx, 174, 82 - bob, 10, 12, "#FFE066");
    px(ctx, 176, 80 - bob, 6, 15, "#FFE066");
    px(ctx, 176, 83 - bob, 2, 3, "#FFFFFF");
    px(ctx, 178, 95 - bob, 1, 18, "#8B5A42");

    // Birthday Cake on cute little center-right stand (x: 158, y: 150)
    const cx = 158, cy = 152;
    px(ctx, cx - 2, cy + 8, 22, 3, "#C88E68");
    px(ctx, cx + 6, cy + 11, 6, 6, "#9B6747");
    px(ctx, cx, cy, 18, 8, bdayWho === "ngoc" ? "#FDE2EC" : "#E5F3FF");
    px(ctx, cx, cy, 18, 2, "#E46B94"); // frosting top
    // 2 candles + flickering flame
    px(ctx, cx + 5, cy - 5, 2, 5, "#FFFFFF");
    px(ctx, cx + 11, cy - 5, 2, 5, "#FFFFFF");
    const flicker = Math.floor(frame / 8) % 2;
    px(ctx, cx + 5, cy - 8 + flicker, 2, 3, "#FFD166");
    px(ctx, cx + 11, cy - 8 + (1 - flicker), 2, 3, "#FF8C42");

    // Gentle falling pixel confetti
    const confColors = ["#F49CB8", "#FFE066", "#8CE09A", "#8ED6FF"];
    for (let c = 0; c < 10; c++) {
      const cyPos = ((frame * 0.45 + c * 23) % 180) + 12;
      const cxPos = (c * 27 + Math.sin(frame * 0.04 + c) * 8 + 240) % 240;
      px(ctx, cxPos, cyPos, 2, 2, confColors[c % confColors.length]);
    }
  }

  function drawParticles() {
    const px = PixelSprites.px;
    particles.forEach((p) => {
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      if (p.kind === "heart") {
        px(ctx, p.x - 3, p.y - 2, 2, 2, p.color);
        px(ctx, p.x + 1, p.y - 2, 2, 2, p.color);
        px(ctx, p.x - 4, p.y - 1, 8, 2, p.color);
        px(ctx, p.x - 2, p.y + 1, 4, 2, p.color);
        px(ctx, p.x - 1, p.y + 3, 2, 1, p.color);
      }
      ctx.globalAlpha = 1;
    });
  }

  function render() {
    if (!ctx) return;
    const state = getStateFn ? getStateFn() : { placedDecor: [], candy: 0 };
    const tod = getActiveTimeOfDay();
    const specialDay = getActiveSpecialDay();
    const placed = state.placedDecor || [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Base Room
    drawBaseRoom(state, tod);

    // 2. Background & Wall Decor
    if (placed.includes("fairy_lights")) PixelSprites.drawDecor(ctx, "fairy_lights", frame);
    if (placed.includes("photo")) PixelSprites.drawDecor(ctx, "photo", frame);
    if (placed.includes("plant")) PixelSprites.drawDecor(ctx, "plant", frame);
    if (placed.includes("teddy")) PixelSprites.drawDecor(ctx, "teddy", frame);
    if (placed.includes("lamp")) PixelSprites.drawDecor(ctx, "lamp", frame);
    if (placed.includes("rug")) PixelSprites.drawDecor(ctx, "rug", frame);
    if (placed.includes("bong_bed")) PixelSprites.drawDecor(ctx, "bong_bed", frame);
    if (placed.includes("tea_table")) PixelSprites.drawDecor(ctx, "tea_table", frame);

    // Hidden Special Day Decorations (15/04, 01/06 Birthdays & 11/02 Anniversary)
    if (specialDay === "ngoc" || specialDay === "khanh") {
      drawBirthdayDecor(specialDay);
    } else if (specialDay === "anniversary") {
      drawAnniversaryDecor();
    }

    // 3. Depth-sorted characters (Khánh Mini & Bé mèo Bông)
    if (khanh.y <= bong.y) {
      PixelSprites.drawKhanh(ctx, khanh.x, khanh.y, khanh.state, frame);
      PixelSprites.drawBong(ctx, bong.x, bong.y, bong.dir, bong.state, frame);
    } else {
      PixelSprites.drawBong(ctx, bong.x, bong.y, bong.dir, bong.state, frame);
      PixelSprites.drawKhanh(ctx, khanh.x, khanh.y, khanh.state, frame);
    }

    // Cute tiny party hat on Khánh Mini during birthdays!
    if (specialDay === "ngoc" || specialDay === "khanh") {
      const px = PixelSprites.px;
      const hx = Math.round(khanh.x);
      const hy = Math.round(khanh.y - 34 + (khanh.state === "happy" ? Math.round(Math.sin(frame * 0.25) * 1.5) : (frame % 40 < 20 ? 0 : 1)));
      px(ctx, hx - 3, hy, 6, 2, "#E46B94");
      px(ctx, hx - 2, hy - 2, 4, 2, "#FFE066");
      px(ctx, hx - 1, hy - 4, 2, 2, "#8ED6FF");
    }

    // 4. Particles
    drawParticles();

    // 5. Cozy Night Tint (softer when lamp or fairy lights are on!)
    if (tod === "night") {
      const hasLight = placed.includes("lamp") || placed.includes("fairy_lights");
      ctx.fillStyle = hasLight ? "rgba(38, 32, 68, 0.14)" : "rgba(30, 28, 60, 0.28)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  const FIXED_STEP = 1000 / 60;
  let lastTime = 0;
  let acc = 0;

  function loop(now) {
    if (!lastTime) lastTime = now || performance.now();
    const dt = Math.min(80, Math.max(0, (now || performance.now()) - lastTime));
    lastTime = now || performance.now();
    acc += dt;
    while (acc >= FIXED_STEP) {
      frame++;
      updateCharacters();
      acc -= FIXED_STEP;
    }
    render();
    rafId = requestAnimationFrame(loop);
  }

  return {
    init,
    triggerKhanhHappy,
    triggerBongHappy,
    spawnHeart
  };
})();
