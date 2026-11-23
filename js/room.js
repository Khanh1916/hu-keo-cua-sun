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

  // Ngọc: wanders the room; "Ôm anh" sends her to Khánh for a hug (mode: wander | toKhanh | hug)
  const ngoc = {
    x: 92,
    y: 161,
    dir: 1,
    targetX: 92,
    state: "idle",
    stateTimer: 0,
    pauseTimer: 150,
    mode: "wander", // wander | toKhanh | hug | toBong | pet | toWindow | watch | dance | toShelf | read
    hugTimer: 0,
    modeTimer: 0
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

  // Always the real clock (the old manual "Khung cảnh" picker was removed on purpose).
  function getActiveTimeOfDay() {
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

    // Check Ngọc hitbox
    if (Math.abs(cx - ngoc.x) <= 12 && cy >= ngoc.y - 32 && cy <= ngoc.y + 4) {
      triggerNgocHappy();
      if (onInteractFn) onInteractFn("ngoc");
      return;
    }

    // Check Khánh Mini hitbox
    if (Math.abs(cx - khanh.x) <= 16 && cy >= khanh.y - 36 && cy <= khanh.y + 6) {
      triggerKhanhHappy();
      if (onInteractFn) onInteractFn("khanh");
      return;
    }

    // Shared plant in the front-left corner
    if (cx <= 24 && cy >= 150 && cy <= 194) {
      if (onInteractFn) onInteractFn("plant");
      return;
    }

    // Wall calendar under the HN ↔ HP plaque
    if (cx >= 30 && cx <= 54 && cy >= 56 && cy <= 84) {
      if (onInteractFn) onInteractFn("calendar");
      return;
    }

    // Check MCK Vinyl Turntable hitbox (vx = 170, vy = 92)
    const state = getStateFn ? getStateFn() : {};
    const placed = state.placedDecor || [];
    if (placed.includes("mck_vinyl")) {
      if (cx >= 165 && cx <= 193 && cy >= 84 && cy <= 106) {
        triggerVinylSpin();
        if (onInteractFn) onInteractFn("mck_vinyl");
        return;
      }
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

  function triggerNgocHappy() {
    if (ngoc.mode !== "wander") return;
    ngoc.state = "happy";
    ngoc.stateTimer = 80;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawnHeart(ngoc.x, ngoc.y - 32, "#F49CB8"), i * 100);
    }
  }

  // "Ôm anh": Ngọc walks to Khánh's nearest side and hugs him for ~2.5 s
  function triggerHug() {
    if (ngoc.mode === "hug") {
      ngoc.hugTimer = Math.max(ngoc.hugTimer, 90);
      return;
    }
    ngoc.mode = "toKhanh";
  }

  function isRainingNow() {
    const w = window.WeatherEngine ? WeatherEngine.getWeather() : null;
    return !!(w && w.isRaining);
  }

  // Walks Ngọc towards goalX; returns true once she has arrived
  function ngocWalkTo(goalX, speed) {
    const dx = goalX - ngoc.x;
    if (Math.abs(dx) > speed) {
      ngoc.state = "walk";
      ngoc.dir = dx > 0 ? 1 : -1;
      ngoc.x += ngoc.dir * speed;
      return false;
    }
    ngoc.x = goalX;
    return true;
  }

  // Back to wandering after petting Bông / watching the rain
  function endNgocActivity(smile) {
    ngoc.mode = "wander";
    ngoc.state = smile ? "happy" : "idle";
    ngoc.stateTimer = smile ? 45 : 0;
    ngoc.targetX = ngoc.x;
    ngoc.pauseTimer = 150;
  }

  function spawnSleepZ(x, y) {
    particles.push({ x, y, vy: -0.3, vx: 0.18, life: 80, maxLife: 80, kind: "z", color: "#8E9BD6" });
  }

  function spawnMusicNote(x = 180, y = 92) {
    const colors = ["#FF4D6D", "#9D4EDD", "#FF758F", "#FFE066", "#4CC9F0"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push({
      x: x + (Math.random() * 14 - 7),
      y: y + (Math.random() * 6 - 3),
      vy: -0.45 - Math.random() * 0.35,
      vx: (Math.random() - 0.5) * 0.4,
      life: 65,
      maxLife: 65,
      kind: Math.random() > 0.3 ? "note" : "sparkle",
      variant: Math.random() > 0.5 ? 2 : 1,
      color
    });
  }

  function triggerVinylSpin() {
    for (let i = 0; i < 7; i++) {
      setTimeout(() => spawnMusicNote(180, 92), i * 130);
    }
    triggerKhanhHappy("happy");
    // Ngọc dances to the music (~4 s) unless she is busy hugging / petting / watching the rain / reading
    if (ngoc.mode === "wander" || ngoc.mode === "dance") {
      ngoc.mode = "dance";
      ngoc.state = "dance";
      ngoc.modeTimer = 240;
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

    // Update Ngọc
    if (ngoc.stateTimer > 0) {
      ngoc.stateTimer--;
      if (ngoc.stateTimer === 0 && ngoc.mode === "wander") ngoc.state = "idle";
    }
    if (ngoc.mode === "toKhanh" || ngoc.mode === "hug") {
      // Keep Khánh in place (and smiling) while she comes over and hugs him
      khanh.targetX = khanh.x;
      khanh.state = "happy";
      khanh.stateTimer = Math.max(khanh.stateTimer, 2);
    }
    if (ngoc.mode === "toKhanh") {
      const side = ngoc.x <= khanh.x ? -1 : 1;
      // 11 px = where drawHugCouple places her body, so switching to the hug sprite doesn't make anyone jump
      const goal = khanh.x + side * 11;
      const dx = goal - ngoc.x;
      if (Math.abs(dx) > 1.2) {
        ngoc.state = "walk";
        ngoc.dir = dx > 0 ? 1 : -1;
        ngoc.x += ngoc.dir * 1.2;
      } else {
        ngoc.x = goal;
        ngoc.mode = "hug";
        ngoc.state = "hug";
        ngoc.dir = khanh.x > ngoc.x ? 1 : -1;
        ngoc.hugTimer = 150;
      }
    } else if (ngoc.mode === "hug") {
      ngoc.hugTimer--;
      if (ngoc.hugTimer % 30 === 0) spawnHeart((ngoc.x + khanh.x) / 2, khanh.y - 36);
      if (ngoc.hugTimer <= 0) {
        ngoc.mode = "wander";
        ngoc.state = "happy";
        ngoc.stateTimer = 45;
        ngoc.targetX = ngoc.x;
        ngoc.pauseTimer = 120;
      }
    } else if (ngoc.mode === "toBong") {
      // Walk to Bông's side (Bông is held in place while she comes), then pet her
      const side = ngoc.x <= bong.x ? -1 : 1;
      bong.pauseTimer = Math.max(bong.pauseTimer, 5);
      if (ngocWalkTo(Math.max(60, Math.min(190, bong.x + side * 11)), 0.6)) {
        ngoc.mode = "pet";
        ngoc.state = "happy";
        ngoc.dir = bong.x > ngoc.x ? 1 : -1;
        ngoc.modeTimer = 170;
        bong.state = "happy";
        bong.stateTimer = 170;
      }
    } else if (ngoc.mode === "pet") {
      ngoc.modeTimer--;
      if (ngoc.modeTimer % 40 === 0) spawnHeart(bong.x, bong.y - 16, "#F49CB8");
      if (ngoc.modeTimer <= 0) endNgocActivity(true);
    } else if (ngoc.mode === "toWindow") {
      if (ngocWalkTo(120, 0.5)) {
        ngoc.mode = "watch";
        ngoc.state = "idle";
        ngoc.modeTimer = 300;
      }
    } else if (ngoc.mode === "dance") {
      ngoc.modeTimer--;
      if (ngoc.modeTimer % 40 === 0) spawnMusicNote(ngoc.x, ngoc.y - 36);
      if (ngoc.modeTimer <= 0) endNgocActivity(true);
    } else if (ngoc.mode === "toShelf") {
      // Walks over to the bookshelf, then reads a book in front of it (~6 s)
      if (ngocWalkTo(172, 0.5)) {
        ngoc.mode = "read";
        ngoc.state = "read";
        ngoc.dir = 1;
        ngoc.modeTimer = 360;
      }
    } else if (ngoc.mode === "read") {
      ngoc.modeTimer--;
      if (ngoc.modeTimer <= 0) endNgocActivity(true);
    } else if (ngoc.mode === "watch") {
      // Stands under the window and watches the rain; gives up early if the rain stops
      ngoc.modeTimer--;
      if (ngoc.modeTimer <= 0 || !isRainingNow()) endNgocActivity(false);
    } else if (ngoc.state !== "happy") {
      const night = getActiveTimeOfDay() === "night";
      if (ngoc.pauseTimer > 0) {
        ngoc.pauseTimer--;
        ngoc.state = night ? "sleepy" : "idle";
        if (night && frame % 90 === 0) spawnSleepZ(ngoc.x + 9, ngoc.y - 33);
        if (ngoc.pauseTimer === 0) {
          const roll = Math.random();
          const windowChance = isRainingNow() ? 0.3 : 0;
          const state = getStateFn ? getStateFn() : {};
          const shelfChance = (state.placedDecor || []).includes("bookshelf") ? 0.18 : 0;
          if (roll < windowChance) {
            ngoc.mode = "toWindow";
          } else if (roll < windowChance + 0.22) {
            ngoc.mode = "toBong";
          } else if (roll < windowChance + 0.22 + shelfChance) {
            ngoc.mode = "toShelf";
          } else {
            ngoc.targetX = 70 + Math.floor(Math.random() * 110);
          }
        }
      } else {
        // Sleepy at night: she shuffles around more slowly
        const dx = ngoc.targetX - ngoc.x;
        if (Math.abs(dx) > 1) {
          ngoc.state = "walk";
          ngoc.dir = dx > 0 ? 1 : -1;
          ngoc.x += ngoc.dir * (night ? 0.3 : 0.5);
        } else {
          ngoc.state = night ? "sleepy" : "idle";
          ngoc.pauseTimer = 140 + Math.floor(Math.random() * 160);
        }
      }
    }

    // Window petals fall here (fixed 60Hz step) instead of inside draw(). Window box: x=82,y=24,w=76,h=62.
    petals.forEach((pt) => {
      pt.y += pt.speed;
      if (pt.y > 24 + 62 - 4) {
        pt.y = 24 + 12;
        pt.x = 82 + 4 + Math.random() * 56;
      }
    });

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.y += p.vy;
      if (p.vx) p.x += p.vx;
      p.life--;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  function drawWindow(tod) {
    const px = PixelSprites.px;
    const wx = 82, wy = 24, ww = 76, wh = 62;
    const weather = window.WeatherEngine ? WeatherEngine.getWeather() : null;
    const isRaining = weather && weather.isRaining;

    // 1. Sky background inside window
    if (isRaining) {
      px(ctx, wx, wy, ww, wh, "#9BB5C9");
      px(ctx, wx, wy + 28, ww, 34, "#B8CBD8");
      // Overcast rain clouds
      px(ctx, wx + 6, wy + 8, 30, 8, "#7E9AA8");
      px(ctx, wx + 14, wy + 5, 20, 6, "#6B8594");
      px(ctx, wx + 40, wy + 12, 28, 7, "#7E9AA8");
    } else if (tod === "morning") {
      px(ctx, wx, wy, ww, wh, "#9FD7F9");
      px(ctx, wx, wy + 32, ww, 30, "#CDECFF");
      // Fluffy white clouds
      px(ctx, wx + 8, wy + 10, 22, 6, "#FFFFFF");
      px(ctx, wx + 13, wy + 6, 12, 5, "#FFFFFF");
      px(ctx, wx + 48, wy + 16, 18, 5, "#FFFFFF");
    } else if (tod === "sunset") {
      px(ctx, wx, wy, ww, 22, "#F7A399");
      px(ctx, wx, wy + 22, ww, 20, "#F4ACB7");
      px(ctx, wx, wy + 42, ww, 20, "#FFE5B4");
      // Warm glowing sunset sun
      px(ctx, wx + 48, wy + 24, 12, 12, "#FFE066");
      px(ctx, wx + 49, wy + 25, 10, 10, "#FFF3B0");
    } else {
      px(ctx, wx, wy, ww, wh, "#1E2243");
      px(ctx, wx, wy + 34, ww, 28, "#2B3058");
      // Twinkling stars & crescent moon
      const twinkle = Math.floor(frame / 22) % 2 === 0;
      px(ctx, wx + 10, wy + 8, 2, 2, twinkle ? "#FFF8C9" : "#8E99CC");
      px(ctx, wx + 34, wy + 14, 2, 2, !twinkle ? "#FFF8C9" : "#8E99CC");
      px(ctx, wx + 62, wy + 6, 2, 2, "#FFF8C9");
      px(ctx, wx + 20, wy + 22, 1, 1, "#FFF8C9");
      // Crescent Moon
      px(ctx, wx + 50, wy + 10, 9, 9, "#FFE994");
      px(ctx, wx + 53, wy + 10, 7, 7, "#1E2243");
    }

    // 2. Distant Hải Phòng City skyline / gentle green hills
    px(ctx, wx, wy + 48, ww, 14, "#7EA172");
    px(ctx, wx, wy + 52, ww, 10, "#5A7D54");
    // Tiny distant silhouette trees / rooftops
    px(ctx, wx + 14, wy + 45, 6, 4, "#5A7D54");
    px(ctx, wx + 36, wy + 46, 5, 3, "#5A7D54");
    px(ctx, wx + 54, wy + 44, 8, 5, "#5A7D54");

    // 3. Iconic Hải Phòng Flamboyant Tree Branch (Cành Hoa Phượng Đỏ)
    // Curved branch extending naturally from left upper corner
    px(ctx, wx, wy + 12, 7, 3, "#5A3825");
    px(ctx, wx + 6, wy + 14, 9, 3, "#6E4A3A");
    px(ctx, wx + 14, wy + 16, 12, 2, "#6E4A3A");
    px(ctx, wx + 24, wy + 17, 7, 2, "#8D5B4C");
    // Upper twig
    px(ctx, wx + 11, wy + 10, 2, 5, "#6E4A3A");
    px(ctx, wx + 12, wy + 7, 6, 2, "#8D5B4C");
    // Lower twig
    px(ctx, wx + 18, wy + 18, 2, 4, "#6E4A3A");
    px(ctx, wx + 19, wy + 21, 6, 2, "#8D5B4C");

    // Feathery flamboyant leaves (lá phượng xum xuê, mềm mại)
    const leafClusters = [
      { x: wx + 4, y: wy + 7, w: 10, h: 5 },
      { x: wx + 12, y: wy + 4, w: 12, h: 5 },
      { x: wx + 20, y: wy + 8, w: 11, h: 5 },
      { x: wx + 8, y: wy + 16, w: 12, h: 6 },
      { x: wx + 18, y: wy + 14, w: 14, h: 6 },
      { x: wx + 26, y: wy + 16, w: 10, h: 5 },
      { x: wx + 15, y: wy + 22, w: 12, h: 5 }
    ];
    leafClusters.forEach((c) => {
      px(ctx, c.x, c.y + 1, c.w, c.h, "#2D6A4F");
      px(ctx, c.x + 1, c.y, c.w - 2, c.h - 1, "#40916C");
      px(ctx, c.x + 2, c.y, Math.floor(c.w / 2), 2, "#74C69D");
    });

    // Brilliant Red Flamboyant Flowers (Hoa phượng đỏ thắm nở rộ)
    const flowerClusters = [
      { x: wx + 7, y: wy + 8, col: "#E63946" },
      { x: wx + 15, y: wy + 5, col: "#D90429" },
      { x: wx + 23, y: wy + 10, col: "#E63946" },
      { x: wx + 11, y: wy + 15, col: "#FF4D6D" },
      { x: wx + 21, y: wy + 15, col: "#E63946" },
      { x: wx + 28, y: wy + 18, col: "#D90429" },
      { x: wx + 17, y: wy + 23, col: "#FF758F" }
    ];
    flowerClusters.forEach((f) => {
      px(ctx, f.x - 1, f.y, 5, 4, f.col);
      px(ctx, f.x, f.y - 1, 3, 6, f.col);
      px(ctx, f.x, f.y + 1, 2, 2, "#FFE066");
    });

    // 4. Weather Effect on Window
    if (isRaining) {
      // Gentle raindrops trickling on glass
      for (let r = 0; r < 14; r++) {
        const ry = (frame * 1.8 + r * 16) % (wh - 8) + wy + 4;
        const rx = wx + 5 + (r * 19) % (ww - 10);
        px(ctx, rx, ry, 1, 3, "rgba(255, 255, 255, 0.65)");
        px(ctx, rx, ry + 3, 1, 1, "rgba(200, 230, 255, 0.4)");
      }
    } else {
      // Falling flamboyant petals in gentle breeze
      petals.forEach((pt) => {
        const ox = pt.x + Math.sin(frame * 0.04 + pt.sway) * 2.2;
        px(ctx, ox, pt.y, 2, 2, "#E63946");
      });
    }

    // 5. Subtle diagonal glass reflection gleam
    px(ctx, wx + 6, wy + 4, 18, 1, "rgba(255, 255, 255, 0.28)");
    px(ctx, wx + 10, wy + 7, 12, 1, "rgba(255, 255, 255, 0.2)");
    px(ctx, wx + 44, wy + 4, 18, 1, "rgba(255, 255, 255, 0.25)");

    // 6. Window frame, center mullions & bottom wooden sill
    px(ctx, wx - 3, wy - 3, ww + 6, 3, "#8D5B4C");
    px(ctx, wx - 3, wy, 3, wh, "#8D5B4C");
    px(ctx, wx + ww, wy, 3, wh, "#8D5B4C");
    px(ctx, wx + Math.floor(ww / 2) - 1, wy, 2, wh, "#9B6747");
    px(ctx, wx, wy + 31, ww, 2, "#9B6747");
    // Bottom window sill
    px(ctx, wx - 4, wy + wh, ww + 8, 5, "#B87E59");
    px(ctx, wx - 3, wy + wh + 4, ww + 6, 2, "#8D5B4C");
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

    drawWallCalendar(state);

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
    return window.SpecialDays.getActive();
  }

  function getMeetDays(state) {
    return window.SpecialDays ? window.SpecialDays.daysUntil(state.nextMeetDate) : null;
  }

  // Tear-off calendar under the HN ↔ HP plaque (x 32–52, y 58–82): days left until they meet, a heart on the day,
  // "?" when no date is set. Tapping it asks Khánh (onInteract("calendar")).
  function drawWallCalendar(state) {
    const px = PixelSprites.px;
    const days = getMeetDays(state);
    const x = 32, y = 60;
    px(ctx, x + 1, y + 1, 20, 22, "rgba(110, 74, 66, 0.25)"); // shadow
    px(ctx, x, y, 20, 22, "#FFFDF7");
    px(ctx, x, y, 20, 6, "#E46B94");
    px(ctx, x, y + 21, 20, 1, "#E8D5C4");
    px(ctx, x + 4, y - 2, 2, 4, "#6E4A42"); // rings
    px(ctx, x + 14, y - 2, 2, 4, "#6E4A42");
    px(ctx, x + 3, y + 2, 14, 1, "#F9C8D9");
    if (days === 0) {
      const beat = Math.floor(frame / 20) % 2 === 0 ? 0 : 1;
      px(ctx, x + 5, y + 9 + beat, 4, 3, "#E46B94");
      px(ctx, x + 11, y + 9 + beat, 4, 3, "#E46B94");
      px(ctx, x + 5, y + 11 + beat, 10, 3, "#E46B94");
      px(ctx, x + 7, y + 14 + beat, 6, 2, "#E46B94");
      px(ctx, x + 9, y + 16 + beat, 2, 1, "#E46B94");
      return;
    }
    ctx.fillStyle = days === null ? "#B8A39A" : "#4A302C";
    ctx.textAlign = "center";
    ctx.font = days !== null && days > 99 ? "bold 7px monospace" : "bold 10px monospace";
    ctx.fillText(days === null ? "?" : (days > 99 ? "99+" : String(days)), x + 10, y + 17);
    ctx.textAlign = "start";
  }

  // Shared plant in the front-left corner (pot x 4–17, y 178–189). Stage = index in GAME_DATA.plantStages reached by
  // state.visitDays; on the 11/02 anniversary it is drawn in full bloom with sparkles. Tap → onInteract("plant").
  function getPlantStage(state) {
    const stages = (window.GAME_DATA && window.GAME_DATA.plantStages) || [];
    let idx = 0;
    stages.forEach((st, i) => { if ((state.visitDays || 0) >= st.days) idx = i; });
    return idx;
  }

  function drawSharedPlant(state, specialDay) {
    const px = PixelSprites.px;
    const bloomDay = specialDay === "anniversary";
    const stage = bloomDay ? 5 : getPlantStage(state);
    const sway = Math.round(Math.sin(frame * 0.05));
    const LEAF = "#5FB36B";
    const LEAF_LT = "#7EC98A";
    const STEM = "#3F8A4B";
    // pot
    px(ctx, 5, 180, 12, 9, "#C97B5A");
    px(ctx, 4, 178, 14, 3, "#DE936F");
    px(ctx, 5, 178, 12, 1, "#6B4A3A");
    px(ctx, 6, 188, 10, 1, "#A9603F");
    px(ctx, 10, 183, 2, 2, "#F9C8D9"); // little heart on the pot
    if (stage === 0) {
      px(ctx, 10, 176, 2, 2, LEAF_LT);
      return;
    }
    const top = [0, 172, 166, 160, 160, 160][stage];
    px(ctx, 10, top, 1, 178 - top, STEM);
    // leaf pairs going up the stem
    const leafRows = { 1: [172], 2: [168, 173], 3: [162, 166, 170, 174], 4: [162, 166, 170, 174], 5: [162, 166, 170, 174] }[stage];
    leafRows.forEach((ly, i) => {
      const left = i % 2 === 0;
      px(ctx, (left ? 7 : 12) + sway, ly, 3, 2, i % 2 ? LEAF : LEAF_LT);
      if (stage >= 3) px(ctx, (left ? 12 : 7) + sway, ly + 2, 3, 2, LEAF);
    });
    if (stage === 4) {
      px(ctx, 9 + sway, 157, 3, 3, "#F49CB8"); // bud
      px(ctx, 10 + sway, 156, 1, 1, "#E46B94");
    }
    if (stage === 5) {
      const flower = (fx, fy, petal) => {
        px(ctx, fx - 1, fy, 3, 1, petal);
        px(ctx, fx, fy - 1, 1, 3, petal);
        px(ctx, fx, fy, 1, 1, "#FFD166");
      };
      flower(10 + sway, 157, "#F49CB8");
      flower(6 + sway, 163, "#FF8FAB");
      flower(15 + sway, 165, "#F9C8D9");
      if (bloomDay && Math.floor(frame / 20) % 2 === 0) {
        px(ctx, 3, 158, 1, 1, "#FFE066");
        px(ctx, 18, 155, 1, 1, "#FFE066");
        px(ctx, 14, 152, 1, 1, "#FFFFFF");
      }
    }
  }

  // Meeting day: a pink suitcase on the floor at the front right
  function drawMeetSuitcase() {
    const px = PixelSprites.px;
    const sx = 206, sy = 164;
    px(ctx, sx + 4, sy - 3, 6, 1, "#6E4A42"); // handle
    px(ctx, sx + 4, sy - 3, 1, 3, "#6E4A42");
    px(ctx, sx + 9, sy - 3, 1, 3, "#6E4A42");
    px(ctx, sx, sy, 14, 14, "#F49CB8");
    px(ctx, sx + 1, sy + 1, 12, 1, "#F9C8D9");
    px(ctx, sx + 4, sy, 1, 14, "#E46B94"); // straps
    px(ctx, sx + 9, sy, 1, 14, "#E46B94");
    px(ctx, sx + 6, sy + 5, 2, 2, "#FFFFFF"); // heart sticker
    px(ctx, sx + 6, sy + 6, 2, 1, "#E46B94");
    px(ctx, sx + 1, sy + 14, 2, 2, "#4A302C"); // wheels
    px(ctx, sx + 11, sy + 14, 2, 2, "#4A302C");
  }

  function drawTetDecor() {
    const px = PixelSprites.px;

    // 1. Câu Đối Đỏ Tết trên 2 bên tường
    // Câu đối bên trái (x: 14, y: 24, w: 14, h: 54)
    px(ctx, 14, 24, 14, 54, "#C92A2A");
    px(ctx, 15, 25, 12, 52, "#D90429");
    px(ctx, 13, 23, 16, 2, "#FFD166");
    px(ctx, 13, 78, 16, 2, "#FFD166");
    px(ctx, 20, 80, 2, 6, "#E63946");
    px(ctx, 19, 86, 4, 3, "#FFD166");
    const glyphY = [28, 38, 48, 58, 68];
    glyphY.forEach((gy, i) => {
      const gcolor = (Math.floor(frame / 20) + i) % 2 === 0 ? "#FFF3B0" : "#FFD166";
      px(ctx, 18, gy, 6, 2, gcolor);
      px(ctx, 20, gy + 2, 2, 4, gcolor);
      px(ctx, 17, gy + 4, 8, 2, gcolor);
    });

    // Câu đối bên phải (x: 212, y: 24, w: 14, h: 54)
    px(ctx, 212, 24, 14, 54, "#C92A2A");
    px(ctx, 213, 25, 12, 52, "#D90429");
    px(ctx, 211, 23, 16, 2, "#FFD166");
    px(ctx, 211, 78, 16, 2, "#FFD166");
    px(ctx, 218, 80, 2, 6, "#E63946");
    px(ctx, 217, 86, 4, 3, "#FFD166");
    glyphY.forEach((gy, i) => {
      const gcolor = (Math.floor(frame / 20) + i) % 2 === 0 ? "#FFD166" : "#FFF3B0";
      px(ctx, 216, gy, 6, 2, gcolor);
      px(ctx, 218, gy + 2, 2, 4, gcolor);
      px(ctx, 215, gy + 4, 8, 2, gcolor);
    });

    // 2. Cành Đào Tết hồng thắm bên kệ nhỏ (x: 162, y: 144)
    const tx = 162, ty = 144;
    px(ctx, tx - 4, ty + 12, 24, 3, "#8D5B4C");
    px(ctx, tx + 6, ty + 15, 4, 6, "#6B3D2E");
    px(ctx, tx + 3, ty + 4, 10, 8, "#FFFDF7");
    px(ctx, tx + 4, ty + 2, 8, 2, "#FFD166");
    px(ctx, tx + 5, ty + 12, 6, 1, "#E9D8A6");
    px(ctx, tx + 7, ty - 4, 2, 6, "#5A3825");
    px(ctx, tx + 5, ty - 8, 2, 4, "#5A3825");
    px(ctx, tx + 3, ty - 12, 2, 5, "#5A3825");
    px(ctx, tx + 8, ty - 10, 2, 4, "#5A3825");
    px(ctx, tx + 10, ty - 14, 2, 5, "#5A3825");
    px(ctx, tx + 1, ty - 15, 3, 2, "#5A3825");
    const blossoms = [
      { x: tx + 2, y: ty - 16, col: "#FF758F" },
      { x: tx + 0, y: ty - 12, col: "#FF4D6D" },
      { x: tx + 6, y: ty - 14, col: "#FF758F" },
      { x: tx + 10, y: ty - 16, col: "#FF4D6D" },
      { x: tx + 12, y: ty - 11, col: "#FF758F" },
      { x: tx + 4, y: ty - 6, col: "#FFB3C1" },
      { x: tx + 9, y: ty - 7, col: "#FF4D6D" }
    ];
    blossoms.forEach((b) => {
      px(ctx, b.x - 1, b.y, 4, 3, b.col);
      px(ctx, b.x, b.y - 1, 2, 5, b.col);
      px(ctx, b.x, b.y, 2, 2, "#FFE066");
    });
    const ribbonBob = Math.round(Math.sin(frame * 0.1) * 1);
    px(ctx, tx + 9, ty - 3 + ribbonBob, 2, 5, "#E63946");
    px(ctx, tx + 9, ty + 2 + ribbonBob, 2, 2, "#FFD166");

    // 3. Đĩa Bánh Chưng xanh & dưa hấu Tết (x: 140, y: 152)
    const bx = 140, by = 152;
    px(ctx, bx - 2, by + 6, 18, 3, "#E9D8A6");
    px(ctx, bx, by, 10, 6, "#2D6A4F");
    px(ctx, bx + 1, by + 1, 8, 4, "#40916C");
    px(ctx, bx + 4, by, 2, 6, "#FEE440");
    px(ctx, bx, by + 2, 10, 2, "#FEE440");
    px(ctx, bx + 11, by + 1, 5, 5, "#E63946");
    px(ctx, bx + 11, by + 5, 5, 1, "#2D6A4F");
    px(ctx, bx + 13, by + 3, 1, 1, "#1D3557");

    // 4. Bao Lì Xì đỏ may mắn
    px(ctx, bx + 1, by + 8, 7, 4, "#D90429");
    px(ctx, bx + 3, by + 9, 3, 2, "#FFD166");

    // 5. Cánh hoa đào rơi lãng mạn trong phòng
    for (let p = 0; p < 7; p++) {
      const py = (frame * 0.4 + p * 28) % 170 + 20;
      const pxPos = 30 + p * 28 + Math.sin(frame * 0.03 + p * 1.5) * 8;
      px(ctx, pxPos, py, 3, 2, p % 2 === 0 ? "#FF758F" : "#FFCCD5");
    }
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

  // 8/3 and 20/10: a wrapped bouquet on the little stand, a ribbon banner with the date and drifting petals
  function drawFlowerDayDecor(label) {
    const px = PixelSprites.px;
    // Ribbon banner above the window (x 92–148)
    px(ctx, 92, 6, 56, 12, "#E46B94");
    px(ctx, 93, 7, 54, 10, "#F9C8D9");
    px(ctx, 88, 8, 5, 8, "#E46B94");
    px(ctx, 147, 8, 5, 8, "#E46B94");
    px(ctx, 86, 10, 3, 4, "#F9C8D9");
    px(ctx, 151, 10, 3, 4, "#F9C8D9");
    ctx.fillStyle = "#4A302C";
    ctx.font = "bold 8px monospace";
    ctx.textAlign = "center";
    ctx.fillText(label, 120, 15);
    ctx.textAlign = "start";

    // Bouquet on the stand (x: 158, y: 152): flowers on top of a paper cone that narrows down to the stand
    const cx = 158, cy = 152;
    px(ctx, cx - 2, cy + 8, 22, 3, "#C88E68");
    px(ctx, cx + 6, cy + 11, 6, 6, "#9B6747");
    px(ctx, cx + 2, cy - 2, 2, 3, "#52B788"); // leaves
    px(ctx, cx + 14, cy - 3, 2, 3, "#52B788");
    px(ctx, cx + 3, cy - 6, 4, 4, "#F25C54"); // roses
    px(ctx, cx + 7, cy - 8, 4, 4, "#E46B94");
    px(ctx, cx + 11, cy - 6, 4, 4, "#F25C54");
    px(ctx, cx + 4, cy - 5, 1, 1, "#FF8FA3");
    px(ctx, cx + 8, cy - 7, 1, 1, "#F9C8D9");
    px(ctx, cx + 12, cy - 5, 1, 1, "#FF8FA3");
    px(ctx, cx + 6, cy - 3, 2, 2, "#FFD166"); // little yellow buds
    px(ctx, cx + 10, cy - 3, 2, 2, "#FFD166");
    px(ctx, cx + 3, cy - 1, 12, 2, "#FFF3E0"); // paper cone
    px(ctx, cx + 4, cy + 1, 10, 2, "#FFF3E0");
    px(ctx, cx + 5, cy + 3, 8, 2, "#FFF3E0");
    px(ctx, cx + 6, cy + 5, 6, 2, "#FFF3E0");
    px(ctx, cx + 7, cy + 7, 4, 1, "#FFF3E0");
    px(ctx, cx + 10, cy - 1, 1, 8, "#EAD7C0"); // fold
    px(ctx, cx + 5, cy + 3, 8, 1, "#E46B94"); // ribbon

    // Petals drifting down
    for (let p = 0; p < 7; p++) {
      const py = (frame * 0.35 + p * 26) % 165 + 22;
      const pxPos = 22 + p * 31 + Math.sin(frame * 0.03 + p * 1.3) * 7;
      px(ctx, pxPos, py, 3, 2, p % 3 === 0 ? "#FFD166" : (p % 3 === 1 ? "#F49CB8" : "#FFFFFF"));
    }
  }

  // 14/02: the anniversary hearts + bouquet, plus a heart-shaped box of chocolates on the floor
  function drawValentineDecor() {
    const px = PixelSprites.px;
    drawAnniversaryDecor();
    const bx = 140, by = 160;
    px(ctx, bx, by, 4, 3, "#C9184A");
    px(ctx, bx + 5, by, 4, 3, "#C9184A");
    px(ctx, bx - 1, by + 1, 11, 3, "#C9184A");
    px(ctx, bx, by + 4, 9, 2, "#C9184A");
    px(ctx, bx + 2, by + 6, 5, 1, "#C9184A");
    px(ctx, bx + 3, by + 7, 3, 1, "#C9184A");
    px(ctx, bx + 4, by, 1, 8, "#FFD166"); // gold ribbon
    px(ctx, bx - 1, by + 2, 11, 1, "#FFD166");
    px(ctx, bx + 1, by + 1, 1, 1, "#FF8FAB");
  }

  // Trung thu (15/8 âm lịch): two star lanterns hanging from the ceiling and a plate of mooncakes on the stand
  function drawStarLantern(x, y, phase) {
    const px = PixelSprites.px;
    const sway = Math.round(Math.sin(frame * 0.04 + phase) * 1);
    const lx = x + sway;
    px(ctx, x, 0, 1, y - 1, "#6E4A42"); // string from the ceiling
    const glow = Math.floor(frame / 14 + phase) % 3 !== 0;
    if (glow) px(ctx, lx - 8, y - 3, 17, 15, "rgba(255, 209, 102, 0.22)");
    const red = "#E63946";
    px(ctx, lx - 1, y - 1, 3, 2, red); // top point
    px(ctx, lx - 2, y + 1, 5, 2, red);
    px(ctx, lx - 6, y + 3, 13, 2, red); // arms
    px(ctx, lx - 4, y + 5, 9, 2, red);
    px(ctx, lx - 3, y + 7, 7, 1, red);
    px(ctx, lx - 4, y + 8, 3, 2, red); // legs
    px(ctx, lx + 2, y + 8, 3, 2, red);
    px(ctx, lx - 5, y + 10, 2, 1, red);
    px(ctx, lx + 4, y + 10, 2, 1, red);
    px(ctx, lx - 1, y + 3, 3, 3, glow ? "#FFE066" : "#FFC24D"); // candle light in the middle
    px(ctx, lx, y + 11, 1, 4, "#FFD166"); // tassel
  }

  function drawTrungThuDecor() {
    const px = PixelSprites.px;
    drawStarLantern(70, 14, 0);
    drawStarLantern(170, 18, 2);

    // Mooncakes on a plate on the stand (x: 158, y: 152)
    const cx = 158, cy = 152;
    px(ctx, cx - 2, cy + 8, 22, 3, "#C88E68");
    px(ctx, cx + 6, cy + 11, 6, 6, "#9B6747");
    px(ctx, cx, cy + 6, 18, 2, "#FFFDF7"); // plate
    px(ctx, cx + 1, cy + 1, 7, 5, "#C77D3A"); // bánh nướng
    px(ctx, cx + 2, cy + 2, 5, 3, "#E09F5B");
    px(ctx, cx + 4, cy + 3, 1, 1, "#8C4A1F");
    px(ctx, cx + 10, cy + 1, 7, 5, "#F1E6D2"); // bánh dẻo
    px(ctx, cx + 11, cy + 2, 5, 3, "#FFF8EC");
    px(ctx, cx + 13, cy + 3, 1, 1, "#D4BFA0");
    // Small cup of tea
    px(ctx, cx + 19, cy + 3, 3, 3, "#9AD1B5");
  }

  function drawNoelDecor() {
    const px = PixelSprites.px;

    // 1. Dây đèn Giáng Sinh nhấp nháy lung linh trên mép tường trên
    const bulbColors = ["#E63946", "#FFD166", "#2EC4B6", "#3A86FF", "#FF85A1", "#52B788"];
    px(ctx, 10, 5, 220, 1, "#1B4332"); // green cord
    for (let lx = 14; lx < 228; lx += 14) {
      const bidx = Math.floor(lx / 14);
      const isLit = (Math.floor(frame / 16) + bidx) % 2 === 0;
      const bcol = isLit ? bulbColors[bidx % bulbColors.length] : "#8D5B4C";
      px(ctx, lx, 6, 3, 4, bcol);
      if (isLit) {
        px(ctx, lx - 1, 7, 5, 2, "rgba(255, 255, 255, 0.45)");
      }
    }

    // 2. Vòng Nguyệt Quế Giáng Sinh trên tường giữa 2 cửa sổ (x: 114, y: 16)
    const wx = 114, wy = 16;
    px(ctx, wx - 6, wy - 6, 14, 14, "#1B4332");
    px(ctx, wx - 5, wy - 5, 12, 12, "#2D6A4F");
    px(ctx, wx - 2, wy - 2, 6, 6, "#FFF4E6"); // center wall hole
    // Red berries on wreath
    px(ctx, wx - 4, wy - 4, 2, 2, "#E63946");
    px(ctx, wx + 4, wy - 3, 2, 2, "#E63946");
    px(ctx, wx - 3, wy + 3, 2, 2, "#E63946");
    px(ctx, wx + 3, wy + 3, 2, 2, "#E63946");
    // Red festive bow & ribbon at bottom of wreath
    px(ctx, wx - 3, wy + 6, 8, 3, "#D90429");
    px(ctx, wx - 4, wy + 9, 3, 4, "#D90429");
    px(ctx, wx + 3, wy + 9, 3, 4, "#D90429");
    px(ctx, wx, wy + 7, 2, 2, "#FFD166"); // golden bell

    // 3. Cây Thông Noel lung linh bên kệ nhỏ góc phải (tx: 166, ty: 148)
    const tx = 166, ty = 148;
    // Pot / Chậu cây đỏ viền vàng
    px(ctx, tx - 7, ty + 6, 16, 8, "#C92A2A");
    px(ctx, tx - 8, ty + 5, 18, 2, "#FFD166");
    px(ctx, tx - 5, ty + 14, 12, 2, "#9E2A2B");
    // Gốc cây nâu
    px(ctx, tx - 2, ty + 2, 6, 4, "#5A3825");

    // Tầng lá dưới cùng (Tier 3 - rộng nhất)
    px(ctx, tx - 14, ty - 8, 30, 10, "#1B4332");
    px(ctx, tx - 12, ty - 6, 26, 8, "#2D6A4F");
    px(ctx, tx - 10, ty - 4, 22, 6, "#40916C");
    // Snow dusting on tips
    px(ctx, tx - 14, ty + 1, 4, 2, "#FFFFFF");
    px(ctx, tx + 12, ty + 1, 4, 2, "#FFFFFF");
    px(ctx, tx - 6, ty + 1, 4, 1, "#E0F2FE");
    px(ctx, tx + 4, ty + 1, 4, 1, "#E0F2FE");

    // Tầng lá giữa (Tier 2)
    px(ctx, tx - 10, ty - 18, 22, 10, "#1B4332");
    px(ctx, tx - 8, ty - 16, 18, 8, "#2D6A4F");
    px(ctx, tx - 6, ty - 14, 14, 6, "#40916C");
    // Snow dusting on tips
    px(ctx, tx - 10, ty - 9, 3, 2, "#FFFFFF");
    px(ctx, tx + 9, ty - 9, 3, 2, "#FFFFFF");

    // Tầng lá trên cùng (Tier 1)
    px(ctx, tx - 6, ty - 26, 14, 8, "#1B4332");
    px(ctx, tx - 4, ty - 24, 10, 6, "#2D6A4F");
    px(ctx, tx - 2, ty - 28, 6, 4, "#40916C");
    px(ctx, tx - 6, ty - 19, 3, 2, "#FFFFFF");
    px(ctx, tx + 5, ty - 19, 3, 2, "#FFFFFF");

    // Ngôi Sao Vàng đỉnh cây thông (Golden Star)
    const starCol = frame % 30 < 15 ? "#FFE066" : "#FFF9DB";
    px(ctx, tx, ty - 33, 2, 6, starCol);
    px(ctx, tx - 2, ty - 31, 6, 2, starCol);
    px(ctx, tx - 1, ty - 32, 4, 4, starCol);

    // Trái châu trang trí nhấp nháy trên cây thông (Blinking Baubles)
    const baubles = [
      { x: tx - 8, y: ty - 4, c1: "#E63946", c2: "#FFD166" },
      { x: tx + 6, y: ty - 5, c1: "#3A86FF", c2: "#FF85A1" },
      { x: tx - 1, y: ty - 7, c1: "#FFD166", c2: "#E63946" },
      { x: tx - 5, y: ty - 13, c1: "#FF85A1", c2: "#3A86FF" },
      { x: tx + 4, y: ty - 15, c1: "#E63946", c2: "#FFD166" },
      { x: tx - 2, y: ty - 22, c1: "#FFD166", c2: "#E63946" },
      { x: tx + 2, y: ty - 24, c1: "#3A86FF", c2: "#FF85A1" }
    ];
    baubles.forEach((b, i) => {
      const lit = (Math.floor(frame / 18) + i) % 2 === 0;
      px(ctx, b.x, b.y, 2, 2, lit ? b.c1 : b.c2);
    });

    // 4. Hộp quà Giáng Sinh thắt nơ dưới gốc cây
    // Hộp quà đỏ thắt nơ vàng
    px(ctx, tx - 22, ty + 4, 12, 10, "#D90429");
    px(ctx, tx - 18, ty + 4, 4, 10, "#FFD166");
    px(ctx, tx - 22, ty + 8, 12, 2, "#FFD166");
    px(ctx, tx - 18, ty + 2, 4, 2, "#FFE066");
    // Hộp quà xanh dương thắt nơ hồng
    px(ctx, tx + 11, ty + 6, 10, 8, "#0077B6");
    px(ctx, tx + 14, ty + 6, 3, 8, "#FF85A1");
    px(ctx, tx + 11, ty + 9, 10, 2, "#FF85A1");
    px(ctx, tx + 14, ty + 4, 3, 2, "#FFAFCC");

    // 5. Bông tuyết rơi lấp lánh nhẹ nhàng khắp phòng
    for (let s = 0; s < 12; s++) {
      const sy = ((frame * 0.4 + s * 22) % 170) + 10;
      const sx = (s * 21 + Math.sin(frame * 0.05 + s) * 7 + 240) % 240;
      const sAlpha = (s % 3 === 0) ? "rgba(255, 255, 255, 0.9)" : "rgba(224, 242, 254, 0.75)";
      px(ctx, Math.round(sx), Math.round(sy), 2, 2, sAlpha);
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
      } else if (p.kind === "note") {
        const c = p.color || "#FF4D6D";
        px(ctx, p.x - 2, p.y, 2, 2, c);
        px(ctx, p.x, p.y - 4, 1, 4, c);
        px(ctx, p.x + 1, p.y - 4, 2, 1, c);
        if (p.variant === 2) {
          px(ctx, p.x + 3, p.y - 1, 2, 2, c);
          px(ctx, p.x + 5, p.y - 4, 1, 3, c);
          px(ctx, p.x + 1, p.y - 4, 5, 1, c);
        }
      } else if (p.kind === "sparkle") {
        const c = p.color || "#FFE066";
        px(ctx, p.x - 1, p.y, 3, 1, c);
        px(ctx, p.x, p.y - 1, 1, 3, c);
      } else if (p.kind === "z") {
        const zx = Math.round(p.x);
        const zy = Math.round(p.y);
        px(ctx, zx, zy, 4, 1, p.color);
        px(ctx, zx + 3, zy + 1, 1, 1, p.color);
        px(ctx, zx + 2, zy + 2, 1, 1, p.color);
        px(ctx, zx + 1, zy + 3, 1, 1, p.color);
        px(ctx, zx, zy + 4, 4, 1, p.color);
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
    if (placed.includes("fairy_lights")) PixelSprites.drawDecor(ctx, "fairy_lights", frame, placed);
    if (placed.includes("photo")) PixelSprites.drawDecor(ctx, "photo", frame, placed);
    if (placed.includes("bookshelf")) PixelSprites.drawDecor(ctx, "bookshelf", frame, placed);
    if (placed.includes("plant")) PixelSprites.drawDecor(ctx, "plant", frame, placed);
    if (placed.includes("succulent")) PixelSprites.drawDecor(ctx, "succulent", frame, placed);
    if (placed.includes("lamp")) PixelSprites.drawDecor(ctx, "lamp", frame, placed);
    if (placed.includes("mck_vinyl")) PixelSprites.drawDecor(ctx, "mck_vinyl", frame, placed);
    if (placed.includes("teddy")) PixelSprites.drawDecor(ctx, "teddy", frame, placed);
    if (placed.includes("cat_tree")) PixelSprites.drawDecor(ctx, "cat_tree", frame, placed);
    if (placed.includes("mirror")) PixelSprites.drawDecor(ctx, "mirror", frame, placed);
    if (placed.includes("rug")) PixelSprites.drawDecor(ctx, "rug", frame, placed);
    if (placed.includes("bong_bed")) PixelSprites.drawDecor(ctx, "bong_bed", frame, placed);
    if (placed.includes("tea_table")) PixelSprites.drawDecor(ctx, "tea_table", frame, placed);
    if (placed.includes("couple_mugs")) PixelSprites.drawDecor(ctx, "couple_mugs", frame, placed);

    // Hidden Special Day Decorations (birthdays, 11/02, 14/02, 8/3, 20/10, Trung thu, Noel, Tết)
    if (specialDay === "ngoc" || specialDay === "khanh") {
      drawBirthdayDecor(specialDay);
    } else if (specialDay === "anniversary") {
      drawAnniversaryDecor();
    } else if (specialDay === "tet") {
      drawTetDecor();
    } else if (specialDay === "noel") {
      drawNoelDecor();
    } else if (specialDay === "valentine") {
      drawValentineDecor();
    } else if (specialDay === "women83") {
      drawFlowerDayDecor("8 - 3");
    } else if (specialDay === "women2010") {
      drawFlowerDayDecor("20 - 10");
    } else if (specialDay === "trungthu") {
      drawTrungThuDecor();
    }

    if (getMeetDays(state) === 0) drawMeetSuitcase();
    drawSharedPlant(state, specialDay);

    // 3. Depth-sorted characters (Khánh, Ngọc, Bông). While hugging, Khánh + Ngọc become ONE face-to-face sprite
    //    (pixel-game convention), mirrored when Ngọc is on his left.
    const hugging = ngoc.mode === "hug";
    const worn = state.wornOutfits || {};
    const people = hugging
      ? [{
        y: ngoc.y,
        draw: () => {
          const side = ngoc.x >= khanh.x ? 1 : -1;
          const cx = Math.round(khanh.x + side * 5);
          // flip = true is a proper mirrored redraw (watch / braid / strap on the right sides), not a flipped copy
          PixelSprites.drawHugCouple(ctx, cx, khanh.y + 1, frame, side < 0, worn.khanh, worn.ngoc);
        }
      }]
      : [
        { y: khanh.y, draw: () => PixelSprites.drawKhanh(ctx, khanh.x, khanh.y, khanh.state, frame, worn.khanh) },
        { y: ngoc.y, draw: () => PixelSprites.drawNgoc(ctx, ngoc.x, ngoc.y, ngoc.dir, ngoc.state, frame, worn.ngoc) }
      ];
    [...people, { y: bong.y, draw: () => PixelSprites.drawBong(ctx, bong.x, bong.y, bong.dir, bong.state, frame, worn.bong) }]
      .sort((a, b) => a.y - b.y)
      .forEach((c) => c.draw());

    // Thought bubble with a raindrop while Ngọc watches the rain from under the window
    if (ngoc.mode === "watch") {
      const px = PixelSprites.px;
      const bx = Math.round(ngoc.x);
      const byy = Math.round(ngoc.y - 52);
      px(ctx, bx - 6, byy, 12, 8, "#FFFFFF");
      px(ctx, bx - 5, byy - 1, 10, 1, "#FFFFFF");
      px(ctx, bx - 5, byy + 8, 10, 1, "#FFFFFF");
      px(ctx, bx - 1, byy + 9, 2, 2, "#FFFFFF");
      px(ctx, bx - 1, byy + 1, 2, 1, "#5B9BD5");
      px(ctx, bx - 2, byy + 2, 4, 3, "#5B9BD5");
      px(ctx, bx - 1, byy + 5, 2, 1, "#5B9BD5");
    }

    // Ngọc's festive hat (birthdays & Noel), placed on top of her hair
    if (!hugging &&(specialDay === "ngoc" || specialDay === "khanh" || specialDay === "noel")) {
      const px = PixelSprites.px;
      const lively = ngoc.state === "happy" || ngoc.state === "hug" || ngoc.state === "dance";
      const nbob = lively ? Math.round(Math.sin(frame * 0.25) * 1.5) : (frame % 40 < 20 ? 0 : 1);
      const nx = Math.round(ngoc.x + PixelSprites.ngocSway(ngoc.state, frame));
      const ny = Math.round(ngoc.y - 33 + nbob);
      if (specialDay === "noel") {
        px(ctx, nx - 4, ny + 1, 8, 2, "#FFFFFF");
        px(ctx, nx - 3, ny - 2, 6, 3, "#D90429");
        px(ctx, nx - 2, ny - 5, 4, 3, "#D90429");
        px(ctx, nx + 2, ny - 6, 2, 2, "#FFFFFF");
      } else {
        px(ctx, nx - 3, ny, 6, 2, "#F49CB8");
        px(ctx, nx - 2, ny - 2, 4, 2, "#FFE066");
        px(ctx, nx - 1, ny - 4, 2, 2, "#8ED6FF");
      }
    }

    // Cute tiny party hat on Khánh Mini during birthdays! During a hug his head is the profile one in drawHugCouple
    // (centre 2 px towards Ngọc, same 48-frame squeeze bob), so the hat follows that head instead.
    if (specialDay === "ngoc" || specialDay === "khanh") {
      const px = PixelSprites.px;
      const hugSide = ngoc.x >= khanh.x ? 1 : -1;
      const hx = Math.round(khanh.x + (hugging ? hugSide * 2 : 0));
      const kbob = hugging
        ? (frame % 48 < 24 ? 0 : 1) + 1
        : (khanh.state === "happy" ? Math.round(Math.sin(frame * 0.25) * 1.5) : (frame % 40 < 20 ? 0 : 1));
      const hy = Math.round(khanh.y - 34 + kbob);
      px(ctx, hx - 3, hy, 6, 2, "#E46B94");
      px(ctx, hx - 2, hy - 2, 4, 2, "#FFE066");
      px(ctx, hx - 1, hy - 4, 2, 2, "#8ED6FF");
    }

    // Festive red accessories during Lunar New Year (Tết)
    if (specialDay === "tet") {
      const px = PixelSprites.px;
      // Khanh's festive red scarf
      const kbob = khanh.state === "happy" ? Math.round(Math.sin(frame * 0.25) * 1.5) : (frame % 40 < 20 ? 0 : 1);
      const kx = Math.round(khanh.x);
      const ky = Math.round(khanh.y - 32 + kbob);
      px(ctx, kx - 5, ky + 12, 10, 3, "#D90429");
      px(ctx, kx - 2, ky + 15, 4, 4, "#BA181B");
      px(ctx, kx - 1, ky + 19, 2, 1, "#FFD166");

      // Bong's cute red collar with tiny golden bell
      const bhop = bong.state === "happy" ? Math.abs(Math.round(Math.sin(frame * 0.3) * 3)) : 0;
      const bx = Math.round(bong.x);
      const by = Math.round(bong.y - 14 - bhop);
      px(ctx, bx - 2, by + 6, 6, 2, "#D90429");
      px(ctx, bx, by + 7, 2, 2, "#FFD166");
    }

    // Festive Santa hats & Christmas accessories during Noel!
    if (specialDay === "noel") {
      const px = PixelSprites.px;
      const kbob = khanh.state === "happy" ? Math.round(Math.sin(frame * 0.25) * 1.5) : (frame % 40 < 20 ? 0 : 1);
      const kx = Math.round(khanh.x);
      const ky = Math.round(khanh.y - 34 + kbob);

      // Khanh's Santa Hat
      px(ctx, kx - 4, ky, 8, 2, "#FFFFFF"); // white fur trim
      px(ctx, kx - 3, ky - 3, 6, 3, "#D90429"); // red cap
      px(ctx, kx - 2, ky - 6, 4, 3, "#D90429");
      px(ctx, kx + 1, ky - 7, 3, 2, "#D90429"); // tip bend
      px(ctx, kx + 3, ky - 6, 2, 2, "#FFFFFF"); // pom-pom

      // Khanh's cozy winter scarf
      px(ctx, kx - 5, ky + 14, 10, 3, "#D90429");
      px(ctx, kx - 3, ky + 14, 2, 3, "#FFFFFF");
      px(ctx, kx + 1, ky + 14, 2, 3, "#FFFFFF");
      px(ctx, kx - 2, ky + 17, 4, 4, "#BA181B");
      px(ctx, kx - 1, ky + 21, 2, 1, "#FFFFFF");

      // Bong's cute mini Santa hat & holiday collar
      const bhop = bong.state === "happy" ? Math.abs(Math.round(Math.sin(frame * 0.3) * 3)) : 0;
      const bx = Math.round(bong.x);
      const by = Math.round(bong.y - 14 - bhop);
      px(ctx, bx - 1, by - 3, 6, 2, "#FFFFFF"); // white trim
      px(ctx, bx, by - 6, 4, 3, "#D90429"); // red hat
      px(ctx, bx + 3, by - 7, 2, 2, "#FFFFFF"); // pom-pom
      px(ctx, bx - 2, by + 6, 6, 2, "#D90429"); // collar
      px(ctx, bx, by + 7, 2, 2, "#FFD166"); // golden bell
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

  let throttleTick = 0;

  // The room sits behind a translucent modal most of the time; render it at ~15fps then to save battery.
  function isCoveredByModal() {
    return Boolean(document.querySelector(".modal-backdrop:not(.hidden)"));
  }

  function loop(now) {
    if (isCoveredByModal() && (throttleTick++ % 4) !== 0) {
      rafId = requestAnimationFrame(loop);
      return;
    }
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
    triggerNgocHappy,
    triggerHug,
    spawnHeart
  };
})();
