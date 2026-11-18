window.PixelSprites = (() => {
  function px(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  // Draw Khánh Mini (approx 22w x 32h logical pixels, anchor at bottom-center x, y)
  function drawKhanh(ctx, cx, by, state = "idle", frame = 0) {
    const bob = state === "happy" ? Math.round(Math.sin(frame * 0.25) * 1.5) : (frame % 40 < 20 ? 0 : 1);
    const x = Math.round(cx - 11);
    const y = Math.round(by - 32 + bob);

    // Shadow on floor
    px(ctx, cx - 8, by - 2, 16, 3, "rgba(74, 48, 44, 0.18)");

    // Shoes (dark)
    px(ctx, x + 5, y + 29, 5, 3, "#2A2224");
    px(ctx, x + 12, y + 29, 5, 3, "#2A2224");

    // Grey trousers (quần âu xám ghi) - sturdy legs
    px(ctx, x + 5, y + 23, 5, 6, "#6D737E");
    px(ctx, x + 12, y + 23, 5, 6, "#6D737E");
    px(ctx, x + 5, y + 22, 12, 2, "#5E646F"); // waist/belt area
    px(ctx, x + 10, y + 22, 2, 1, "#B8BFC9"); // belt buckle

    // Torso: Black Polo shirt (áo polo đen, dáng đầm ấm áp)
    px(ctx, x + 4, y + 14, 14, 9, "#242229");
    px(ctx, x + 5, y + 13, 12, 2, "#242229");
    // Polo collar (dark charcoal for visibility)
    px(ctx, x + 7, y + 13, 3, 2, "#3D3A45");
    px(ctx, x + 12, y + 13, 3, 2, "#3D3A45");
    px(ctx, x + 10, y + 14, 2, 3, "#36333D");
    px(ctx, x + 10, y + 15, 1, 1, "#8B8794"); // collar button

    // Arms (polo sleeves + skin forearms)
    const armRaise = state === "happy" ? -2 : 0;
    // Viewer's LEFT = Khánh's RIGHT arm (wears silver metal watch!)
    px(ctx, x + 1, y + 14 + armRaise, 3, 5, "#242229"); // black sleeve
    px(ctx, x + 1, y + 19 + armRaise, 3, 4, "#F5C6A5"); // right forearm/hand
    // Silver metal watch on Khánh's RIGHT wrist (viewer's left)
    px(ctx, x + 1, y + 20 + armRaise, 3, 2, "#DCE3EC");
    px(ctx, x + 2, y + 20 + armRaise, 1, 1, "#FFFFFF"); // watch gleam

    // Viewer's RIGHT = Khánh's LEFT arm
    px(ctx, x + 18, y + 14 + armRaise, 3, 5, "#242229");
    px(ctx, x + 18, y + 19 + armRaise, 3, 4, "#F5C6A5");

    // Neck
    px(ctx, x + 9, y + 11, 4, 3, "#E7B491");

    // Head (warm skin tone)
    px(ctx, x + 5, y + 3, 12, 9, "#F6C9AA");
    px(ctx, x + 4, y + 5, 1, 5, "#F6C9AA"); // left ear (viewer left = right ear)
    px(ctx, x + 17, y + 5, 1, 5, "#F6C9AA");

    // Cheek blush (soft pastel pink)
    px(ctx, x + 5, y + 9, 2, 1, "#F49CB8");
    px(ctx, x + 15, y + 9, 2, 1, "#F49CB8");

    // Hair: Side part 2-8 (part 2 on Khánh's LEFT side -> viewer's RIGHT side!)
    // Top volume + sweeping 8-part to viewer's left, shorter 2-part on viewer's right
    px(ctx, x + 4, y + 1, 13, 3, "#2A2124");
    px(ctx, x + 6, y + 0, 9, 2, "#2A2124");
    px(ctx, x + 4, y + 3, 2, 3, "#2A2124"); // sideburns right of Khánh
    px(ctx, x + 16, y + 3, 2, 2, "#2A2124"); // sideburns left of Khánh
    // 8-part fringe sweeping towards viewer's left (columns 5..12)
    px(ctx, x + 5, y + 3, 7, 2, "#2A2124");
    px(ctx, x + 6, y + 4, 4, 1, "#2A2124");
    // Visible hair part line on Khánh's left (viewer's right, col 13)
    px(ctx, x + 13, y + 2, 1, 2, "#4B3B3E");
    // 2-part neat hair on viewer's right (col 14..16)
    px(ctx, x + 14, y + 3, 3, 1, "#2A2124");
    // Subtle hair highlight
    px(ctx, x + 7, y + 1, 4, 1, "#3F3236");

    // Eyes & Black-rimmed Glasses (Kính gọng đen)
    if (state === "happy") {
      // Happy curved eyes behind glasses
      px(ctx, x + 6, y + 7, 3, 1, "#2B1E1C");
      px(ctx, x + 13, y + 7, 3, 1, "#2B1E1C");
    } else if (frame % 110 > 105) {
      // Blink
      px(ctx, x + 6, y + 7, 3, 1, "#2B1E1C");
      px(ctx, x + 13, y + 7, 3, 1, "#2B1E1C");
    } else {
      // Eyes
      px(ctx, x + 7, y + 7, 2, 2, "#2B1E1C");
      px(ctx, x + 13, y + 7, 2, 2, "#2B1E1C");
      px(ctx, x + 7, y + 7, 1, 1, "#FFFFFF"); // eye sparkle
      px(ctx, x + 13, y + 7, 1, 1, "#FFFFFF");
    }

    // Black Glasses Frame (gọng đen)
    px(ctx, x + 5, y + 6, 5, 1, "#181518");  // left top rim
    px(ctx, x + 5, y + 9, 5, 1, "#181518");  // left bottom rim
    px(ctx, x + 5, y + 6, 1, 4, "#181518");  // left outer
    px(ctx, x + 9, y + 6, 1, 4, "#181518");  // left inner
    px(ctx, x + 10, y + 7, 2, 1, "#181518"); // bridge
    px(ctx, x + 12, y + 6, 5, 1, "#181518"); // right top rim
    px(ctx, x + 12, y + 9, 5, 1, "#181518"); // right bottom rim
    px(ctx, x + 12, y + 6, 1, 4, "#181518"); // right inner
    px(ctx, x + 16, y + 6, 1, 4, "#181518"); // right outer

    // Mouth
    if (state === "eating" && frame % 12 < 6) {
      px(ctx, x + 10, y + 10, 2, 2, "#C65D6B");
    } else if (state === "happy") {
      px(ctx, x + 9, y + 10, 4, 1, "#C65D6B");
      px(ctx, x + 10, y + 11, 2, 1, "#C65D6B");
    } else {
      px(ctx, x + 10, y + 10, 2, 1, "#B86B63");
    }
  }

  // Draw Ngọc: tóc đen tết đuôi sam vắt qua vai trái của Ngọc (bên phải màn hình), kính gọng đen to, má hồng, áo phông kem rộng trễ một bên vai (lộ dây áo đen),
  // quần đùi jean nhạt, dép lê hồng. States: idle | walk | happy | hug. dir = side she faces (-1 left, 1 right).
  function drawNgoc(ctx, cx, by, dir = 1, state = "idle", frame = 0) {
    const lively = state === "happy" || state === "hug";
    const bob = lively ? Math.round(Math.sin(frame * 0.25) * 1.5) : (frame % 40 < 20 ? 0 : 1);
    const x = Math.round(cx - 11);
    const y = Math.round(by - 30 + bob);
    const SKIN = "#F8D2B8";
    const HAIR = "#1B1416";
    const HAIR_HI = "#3A2D31";
    const TEE = "#FFF6EA"; // cream tee
    const TEE_FOLD = "#EADCC8";
    const SHORTS = "#7FA7C9"; // light denim shorts
    const SHORTS_DK = "#6890B3";
    const FRAME = "#181518"; // black frames, same size as Khánh's
    const SLIPPER = "#F7B6CC";

    // Shadow on floor
    px(ctx, cx - 8, by - 2, 16, 3, "rgba(74, 48, 44, 0.18)");

    // Back of the head (all hair goes into one braid, so nothing hangs down behind the shoulders)
    px(ctx, x + 4, y + 0, 14, 8, HAIR);

    // Legs + pink slippers (simple walk cycle)
    const step = state === "walk" ? (frame % 16 < 8 ? 1 : -1) : 0;
    const lUp = step > 0 ? 1 : 0;
    const rUp = step < 0 ? 1 : 0;
    px(ctx, x + 7, y + 22 - lUp, 3, 6, SKIN);
    px(ctx, x + 12, y + 22 - rUp, 3, 6, SKIN);
    px(ctx, x + 6, y + 28 - lUp, 5, 2, SLIPPER);
    px(ctx, x + 11, y + 28 - rUp, 5, 2, SLIPPER);

    // Short light-denim shorts (quần đùi jean nhạt)
    px(ctx, x + 6, y + 18, 10, 3, SHORTS);
    px(ctx, x + 6, y + 21, 4, 2, SHORTS);
    px(ctx, x + 12, y + 21, 4, 2, SHORTS);
    px(ctx, x + 6, y + 18, 10, 1, SHORTS_DK);

    // Oversized cream tee, worn off the viewer-left shoulder: bare shoulder with a thin black strap
    // Neckline slants from the neck down to the bare shoulder (reads as off-shoulder, not as a hand)
    px(ctx, x + 5, y + 11, 6, 1, SKIN);
    px(ctx, x + 3, y + 12, 6, 1, SKIN);
    px(ctx, x + 6, y + 11, 1, 2, "#2A2224"); // strap
    px(ctx, x + 11, y + 11, 6, 1, TEE);
    px(ctx, x + 9, y + 12, 9, 1, TEE);
    px(ctx, x + 4, y + 13, 14, 7, TEE); // loose hem covers the top of the shorts
    px(ctx, x + 8, y + 15, 1, 4, TEE_FOLD);
    px(ctx, x + 13, y + 14, 1, 5, TEE_FOLD);

    // Arms. In a hug only the arm away from Khánh hangs here; the arm around him is drawn after the braid (below)
    // so it stays one continuous piece instead of being cut by the braid or crossing her own body.
    const raise = state === "happy" ? -2 : 0;
    const drawLeftArm = state !== "hug" || dir > 0;   // viewer-left arm hangs unless it is the hugging arm
    const drawRightArm = state !== "hug" || dir < 0;  // viewer-right arm hangs unless it is the hugging arm
    if (drawLeftArm) {
      // Viewer-left arm: the sleeve has slipped down below the bare shoulder
      px(ctx, x + 2, y + 12 + raise, 2, 2, SKIN);
      px(ctx, x + 1, y + 13 + raise, 3, 4, TEE);
      px(ctx, x + 1, y + 17 + raise, 3, 4, SKIN);
    }
    if (drawRightArm) {
      px(ctx, x + 18, y + 12 + raise, 3, 5, TEE);
      px(ctx, x + 18, y + 17 + raise, 3, 4, SKIN);
    }

    // Side braid (tóc tết đuôi sam) over Ngọc's LEFT shoulder = viewer's right, drawn over the tee
    px(ctx, x + 15, y + 7, 3, 12, HAIR);
    for (let i = 0; i < 6; i++) {
      px(ctx, x + 15 + (i % 2), y + 7 + i * 2, 2, 1, HAIR_HI); // woven strands
    }
    px(ctx, x + 15, y + 19, 3, 1, "#F49CB8"); // pink hair tie
    px(ctx, x + 15, y + 20, 3, 1, HAIR);
    px(ctx, x + 16, y + 21, 1, 1, HAIR); // tuft

    // Hugging arm: shoulder -> short sleeve -> forearm bent sideways around Khánh's waist (she stands 12 px from him)
    if (state === "hug") {
      if (dir < 0) {
        px(ctx, x + 2, y + 12, 2, 2, SKIN);  // bare shoulder side
        px(ctx, x + 1, y + 13, 3, 2, TEE);   // slipped sleeve
        px(ctx, x - 6, y + 15, 10, 2, SKIN); // forearm across his waist
        px(ctx, x - 7, y + 15, 1, 2, "#EDBB9C"); // hand
      } else {
        px(ctx, x + 18, y + 12, 3, 3, TEE);  // sleeve
        px(ctx, x + 18, y + 15, 10, 2, SKIN);
        px(ctx, x + 28, y + 15, 1, 2, "#EDBB9C");
      }
    }

    // Head: rounded (narrower forehead row, tapered cheeks and chin); the back hair shows around the jaw
    px(ctx, x + 6, y + 1, 10, 1, SKIN);
    px(ctx, x + 5, y + 2, 12, 7, SKIN);
    px(ctx, x + 6, y + 9, 10, 1, SKIN);
    px(ctx, x + 8, y + 10, 6, 1, SKIN);

    // Hair: rounded crown, pulled back; short side sections down to ear level
    px(ctx, x + 7, y - 2, 8, 1, HAIR);
    px(ctx, x + 5, y - 1, 12, 1, HAIR);
    px(ctx, x + 4, y + 0, 14, 2, HAIR);
    px(ctx, x + 10, y - 2, 2, 1, HAIR_HI);
    px(ctx, x + 7, y - 1, 3, 1, HAIR_HI);
    px(ctx, x + 4, y + 1, 2, 6, HAIR);
    px(ctx, x + 16, y + 1, 2, 6, HAIR);

    // Eyes (behind glasses)
    if (state === "happy" || state === "hug") {
      px(ctx, x + 6, y + 5, 3, 1, "#2B1E1C");
      px(ctx, x + 13, y + 5, 3, 1, "#2B1E1C");
    } else if (frame % 130 > 125) {
      px(ctx, x + 6, y + 6, 3, 1, "#2B1E1C");
      px(ctx, x + 13, y + 6, 3, 1, "#2B1E1C");
    } else {
      px(ctx, x + 7, y + 5, 2, 2, "#2B1E1C");
      px(ctx, x + 13, y + 5, 2, 2, "#2B1E1C");
      px(ctx, x + 7, y + 5, 1, 1, "#FFFFFF");
      px(ctx, x + 13, y + 5, 1, 1, "#FFFFFF");
    }

    // Big black glasses, same frame size as Khánh's (5×4 lenses), sitting over the hair at the temples
    px(ctx, x + 5, y + 4, 5, 1, FRAME); // left top rim
    px(ctx, x + 5, y + 7, 5, 1, FRAME); // left bottom rim
    px(ctx, x + 5, y + 4, 1, 4, FRAME); // left outer
    px(ctx, x + 9, y + 4, 1, 4, FRAME); // left inner
    px(ctx, x + 10, y + 5, 2, 1, FRAME); // bridge
    px(ctx, x + 12, y + 4, 5, 1, FRAME); // right top rim
    px(ctx, x + 12, y + 7, 5, 1, FRAME); // right bottom rim
    px(ctx, x + 12, y + 4, 1, 4, FRAME); // right inner
    px(ctx, x + 16, y + 4, 1, 4, FRAME); // right outer

    // Blush (má hồng), just under the frames
    px(ctx, x + 6, y + 8, 2, 1, "#F49CB8");
    px(ctx, x + 14, y + 8, 2, 1, "#F49CB8");

    // Mouth
    if (state === "happy" || state === "hug") {
      px(ctx, x + 9, y + 9, 4, 1, "#C65D6B");
      px(ctx, x + 10, y + 10, 2, 1, "#C65D6B");
    } else {
      px(ctx, x + 10, y + 10, 2, 1, "#C9707A");
    }
  }

  // Combined hug sprite (pixel-game convention, e.g. RPG Maker "couple behaviors"): instead of two front-facing
  // sprites, the pair turn to FACE EACH OTHER in profile and become one sprite. Khánh (left, facing right) wraps his near
  // arm around Ngọc's shoulders; Ngọc (right, facing left) rests her head on his chest and wraps her near arm around his
  // back; both close their eyes. Khánh's body centre = cx - 5, Ngọc's = cx + 6 (the room anchors cx from Khánh), by = floor.
  // Mirrored with ctx.scale(-1, 1) by the room when Ngọc is on Khánh's left.
  function drawHugCouple(ctx, cx, by, frame = 0) {
    const squeeze = frame % 48 < 24 ? 0 : 1; // gentle "squeeze" bob
    const POLO = "#242229";
    const POLO_HI = "#3D3A45";
    const PANTS = "#6D737E";
    const K_SKIN = "#F6C9AA";
    const K_HAIR = "#2A2124";
    const N_SKIN = "#F8D2B8";
    const N_HAIR = "#1B1416";
    const N_HAIR_HI = "#3A2D31";
    const TEE = "#FFF6EA";
    const TEE_FOLD = "#EADCC8";
    const SHORTS = "#7FA7C9";
    const BLACK = "#181518";
    const EYE = "#2B1E1C";

    // Shadows
    px(ctx, cx - 18, by - 2, 30, 3, "rgba(74, 48, 44, 0.18)");

    // ---------- Khánh, profile facing right ----------
    const kx = cx - 12;
    const ky = by - 32 + squeeze;
    px(ctx, kx + 2, ky + 30, 4, 2, "#2A2224"); // back shoe
    px(ctx, kx + 4, ky + 29, 7, 3, "#2A2224"); // front shoe (toe to the right)
    px(ctx, kx + 3, ky + 22, 7, 7, PANTS);
    px(ctx, kx + 3, ky + 22, 7, 1, "#5E646F");
    px(ctx, kx + 2, ky + 13, 10, 9, POLO); // chest
    px(ctx, kx + 8, ky + 12, 3, 2, POLO_HI); // collar
    px(ctx, kx + 8, ky + 10, 3, 3, "#E7B491"); // neck
    // ---------- Ngọc, profile facing left (shorter, head resting on his chest) ----------
    const nx = cx;
    const ny = by - 30 + squeeze;
    const hy = ny + 6; // head tucked under his chin, cheek against his chest
    px(ctx, nx + 6, ny + 23, 3, 5, "#EDBB9C"); // back leg
    px(ctx, nx + 3, ny + 22, 3, 6, N_SKIN); // front leg
    px(ctx, nx + 5, ny + 28, 4, 2, "#E9A3BB"); // back slipper
    px(ctx, nx + 1, ny + 28, 5, 2, "#F7B6CC"); // front slipper (toe to the left)
    px(ctx, nx + 2, ny + 18, 8, 5, SHORTS);
    px(ctx, nx + 2, ny + 18, 8, 1, "#6890B3");
    px(ctx, nx + 1, ny + 11, 10, 8, TEE);
    px(ctx, nx + 5, ny + 13, 1, 5, TEE_FOLD);
    px(ctx, nx + 8, ny + 11, 3, 1, N_SKIN); // a little bare shoulder at the back (off-shoulder tee)
    // head
    px(ctx, nx + 1, hy + 1, 9, 8, N_SKIN);
    px(ctx, nx + 2, hy + 9, 6, 1, N_SKIN); // chin
    px(ctx, nx + 0, hy + 5, 1, 2, N_SKIN); // nose
    px(ctx, nx + 1, hy - 1, 9, 3, N_HAIR); // top (normal hairline)
    px(ctx, nx + 6, hy + 1, 5, 7, N_HAIR); // back of head
    px(ctx, nx + 3, hy - 1, 3, 1, N_HAIR_HI);
    // braid over her LEFT shoulder (the side facing the viewer here), down the front of the tee
    px(ctx, nx + 6, hy + 8, 3, 10, N_HAIR);
    for (let i = 0; i < 5; i++) px(ctx, nx + 6 + (i % 2), hy + 8 + i * 2, 2, 1, N_HAIR_HI);
    px(ctx, nx + 6, hy + 18, 3, 1, "#F49CB8");
    px(ctx, nx + 7, hy + 19, 1, 1, N_HAIR);
    // big black glasses (side view)
    px(ctx, nx + 0, hy + 3, 4, 1, BLACK);
    px(ctx, nx + 0, hy + 6, 4, 1, BLACK);
    px(ctx, nx + 0, hy + 3, 1, 4, BLACK);
    px(ctx, nx + 3, hy + 3, 1, 4, BLACK);
    px(ctx, nx + 4, hy + 4, 3, 1, BLACK); // temple arm to the ear
    px(ctx, nx + 1, hy + 5, 2, 1, EYE); // closed eye
    px(ctx, nx + 1, hy + 7, 2, 1, "#F49CB8"); // blush
    px(ctx, nx + 0, hy + 8, 1, 1, "#C65D6B"); // smile

    // Khánh's head goes in front of her hair: he rests his chin on top of her head
    px(ctx, kx + 5, ky + 3, 9, 8, K_SKIN);
    px(ctx, kx + 14, ky + 6, 1, 2, K_SKIN); // nose
    px(ctx, kx + 6, ky + 6, 2, 3, "#E7B491"); // ear
    px(ctx, kx + 4, ky + 1, 10, 3, K_HAIR); // top
    px(ctx, kx + 4, ky + 3, 3, 4, K_HAIR); // back of head
    px(ctx, kx + 11, ky + 3, 3, 1, K_HAIR); // fringe
    px(ctx, kx + 6, ky + 0, 6, 1, K_HAIR);
    // glasses (side view): lens frame + temple arm to the ear
    px(ctx, kx + 10, ky + 5, 4, 1, BLACK);
    px(ctx, kx + 10, ky + 8, 4, 1, BLACK);
    px(ctx, kx + 10, ky + 5, 1, 4, BLACK);
    px(ctx, kx + 13, ky + 5, 1, 4, BLACK);
    px(ctx, kx + 8, ky + 6, 2, 1, BLACK);
    px(ctx, kx + 11, ky + 7, 2, 1, EYE); // closed eye
    px(ctx, kx + 11, ky + 9, 2, 1, "#F49CB8"); // blush
    px(ctx, kx + 13, ky + 10, 1, 1, "#C65D6B"); // smile


    // ---------- Arms around each other (drawn last so they sit on top) ----------
    // Arms keep their normal length (~9 px, as in the standing sprites): each one reaches the partner's side and the
    // hand rests there, as if the rest of the arm goes round behind the body. Never stretch an arm across a whole body.
    // Khánh's near arm round her shoulders: sleeve, short forearm with the watch, hand on her shoulder blade
    px(ctx, kx + 8, ky + 15, 3, 3, POLO);
    px(ctx, kx + 11, ky + 17, 5, 2, K_SKIN);
    px(ctx, kx + 14, ky + 17, 2, 2, "#DCE3EC"); // silver watch
    px(ctx, kx + 16, ky + 16, 2, 3, K_SKIN); // hand
    // Ngọc's near arm round his waist: sleeve, short forearm, hand on his side
    px(ctx, nx + 4, ny + 17, 3, 2, TEE);
    px(ctx, nx + 4, ny + 19, 3, 1, TEE_FOLD); // sleeve hem, so it reads apart from the tee
    px(ctx, nx - 2, ny + 19, 6, 2, N_SKIN);
    px(ctx, nx - 3, ny + 18, 2, 3, N_SKIN); // hand
  }

  // Draw Bé mèo Bông: lông trắng với vàng trộn lẫn, mũi mồm trắng rõ nét
  function drawBong(ctx, cx, by, dir = 1, state = "idle", frame = 0) {
    const hop = state === "happy" ? Math.abs(Math.round(Math.sin(frame * 0.3) * 3)) : 0;
    const x = Math.round(cx - 8);
    const y = Math.round(by - 14 - hop);

    // Shadow
    px(ctx, cx - 6, by - 2, 12, 2, "rgba(74, 48, 44, 0.18)");

    // Wagging tail (yellow-gold & white tip)
    const tailWag = Math.round(Math.sin(frame * 0.14) * 1.5);
    if (dir >= 0) {
      px(ctx, x + 1, y + 7 + tailWag, 3, 2, "#EE9E42");
      px(ctx, x + 0, y + 5 + tailWag, 2, 3, "#FFFDF7");
    } else {
      px(ctx, x + 12, y + 7 + tailWag, 3, 2, "#EE9E42");
      px(ctx, x + 14, y + 5 + tailWag, 2, 3, "#FFFDF7");
    }

    // Body (white base + golden-yellow mixed patches)
    px(ctx, x + 3, y + 7, 10, 6, "#FFFDF7");
    // Golden patch on back
    px(ctx, x + 5, y + 7, 5, 3, "#F1A245");
    px(ctx, x + 7, y + 9, 4, 2, "#E38B2D");
    // Cute little paws (white)
    const step = state === "walk" && frame % 12 < 6 ? 1 : 0;
    px(ctx, x + 4, y + 12 - step, 2, 2, "#FFFDF7");
    px(ctx, x + 10, y + 12 + (step ? -1 : 0), 2, 2, "#FFFDF7");

    // Head (white + golden ear/forehead patch)
    px(ctx, x + 3, y + 2, 10, 6, "#FFFDF7");
    // Ears
    px(ctx, x + 3, y + 0, 3, 2, "#EE9E42"); // left ear golden
    px(ctx, x + 10, y + 0, 3, 2, "#FFFDF7"); // right ear white
    px(ctx, x + 11, y + 1, 1, 1, "#F6A8BE"); // inner pink ear
    px(ctx, x + 4, y + 1, 1, 1, "#F6A8BE");
    // Golden mixed patch on top-left of head
    px(ctx, x + 3, y + 2, 4, 2, "#EE9E42");
    px(ctx, x + 9, y + 2, 3, 1, "#F5B864");

    // Eyes
    if (state === "happy") {
      px(ctx, x + 5, y + 4, 2, 1, "#4A302C");
      px(ctx, x + 9, y + 4, 2, 1, "#4A302C");
    } else {
      px(ctx, x + 5, y + 4, 1, 2, "#3B2420");
      px(ctx, x + 10, y + 4, 1, 2, "#3B2420");
    }

    // Mũi mồm trắng rõ nét (pure white muzzle patch + tiny pink nose)
    px(ctx, x + 6, y + 5, 4, 3, "#FFFFFF");
    px(ctx, x + 7, y + 5, 2, 1, "#F48CA8"); // tiny pink nose
    px(ctx, x + 7, y + 7, 1, 1, "#D6828E"); // cute mouth hint
    px(ctx, x + 9, y + 7, 1, 1, "#D6828E");
  }

  // Draw small decorative pixel items inside the room
  function drawDecor(ctx, id, frame) {
    switch (id) {
      case "rug": {
        // Soft pastel pink oval rug in center floor
        px(ctx, 78, 152, 84, 22, "#F9C5D6");
        px(ctx, 84, 149, 72, 28, "#F9C5D6");
        px(ctx, 86, 152, 68, 22, "#FDE4ED");
        px(ctx, 94, 156, 52, 14, "#F7B3C9");
        break;
      }
      case "bong_bed": {
        // Cozy pink cat bed near left corner
        px(ctx, 20, 152, 30, 11, "#E88AA8");
        px(ctx, 22, 149, 26, 12, "#F7B6CC");
        px(ctx, 25, 152, 20, 7, "#FFF6EA");
        break;
      }
      case "teddy": {
        // Cute Teddy bear on the bed
        const bx = 24, by = 114;
        px(ctx, bx + 1, by, 3, 3, "#B87A4B"); // ears
        px(ctx, bx + 9, by, 3, 3, "#B87A4B");
        px(ctx, bx + 2, by + 2, 9, 7, "#CE8D5A"); // head
        px(ctx, bx + 4, by + 5, 5, 3, "#F5D7B8"); // muzzle
        px(ctx, bx + 6, by + 5, 1, 1, "#4A302C"); // nose
        px(ctx, bx + 4, by + 4, 1, 1, "#2A1B18"); // eyes
        px(ctx, bx + 8, by + 4, 1, 1, "#2A1B18");
        px(ctx, bx + 2, by + 9, 9, 8, "#CE8D5A"); // body
        px(ctx, bx + 4, by + 10, 5, 5, "#F5D7B8"); // belly
        px(ctx, bx + 5, by + 11, 3, 2, "#E46B94"); // tiny pink heart
        break;
      }
      case "plant": {
        // Potted succulent/flower on window sill
        const sx = 148, sy = 76;
        px(ctx, sx, sy + 7, 10, 7, "#D68265"); // terracotta pot
        px(ctx, sx - 1, sy + 6, 12, 2, "#E5987B");
        px(ctx, sx + 2, sy + 1, 6, 5, "#67B374");
        px(ctx, sx + 0, sy + 3, 3, 3, "#7EC98A");
        px(ctx, sx + 7, sy + 2, 3, 4, "#579C63");
        px(ctx, sx + 4, sy - 1, 2, 2, "#FF80A4"); // tiny pink flower
        break;
      }
      case "photo": {
        // 11/02/2026 framed photo on wall
        const fx = 180, fy = 42;
        px(ctx, fx - 1, fy - 1, 22, 18, "#8B5A42");
        px(ctx, fx + 1, fy + 1, 18, 14, "#FFFDF7");
        px(ctx, fx + 3, fy + 3, 14, 10, "#FDE2EC");
        // Tiny pixel heart inside
        px(ctx, fx + 7, fy + 6, 2, 2, "#E46B94");
        px(ctx, fx + 11, fy + 6, 2, 2, "#E46B94");
        px(ctx, fx + 8, fy + 7, 4, 3, "#E46B94");
        px(ctx, fx + 9, fy + 10, 2, 1, "#E46B94");
        break;
      }
      case "tea_table": {
        // Low wooden tea table + teapot on right side
        const tx = 186, ty = 144;
        px(ctx, tx, ty + 6, 36, 4, "#B87C56");
        px(ctx, tx + 3, ty + 10, 4, 10, "#945C3B");
        px(ctx, tx + 29, ty + 10, 4, 10, "#945C3B");
        // Teapot (trà cúc)
        px(ctx, tx + 8, ty, 10, 6, "#FFFDF7");
        px(ctx, tx + 10, ty - 2, 6, 2, "#F6C957");
        px(ctx, tx + 18, ty + 2, 3, 2, "#FFFDF7");
        // Two little cups
        px(ctx, tx + 23, ty + 3, 4, 3, "#F9C8D9");
        px(ctx, tx + 29, ty + 3, 4, 3, "#F9C8D9");
        break;
      }
      case "lamp": {
        // Glowing moon lamp on shelf/side table
        const lx = 198, ly = 104;
        px(ctx, lx - 6, ly - 6, 22, 22, "rgba(255, 234, 156, 0.28)");
        px(ctx, lx + 2, ly + 10, 6, 3, "#8B5A42");
        px(ctx, lx + 1, ly + 2, 8, 8, "#FFE787");
        px(ctx, lx + 2, ly + 1, 6, 10, "#FFF3B8");
        px(ctx, lx + 3, ly + 3, 2, 2, "#FFFFFF");
        break;
      }
      case "fairy_lights": {
        // Hanging string of twinkling fairy lights along top wall
        const bulbs = [14, 30, 46, 62, 78, 166, 182, 198, 214, 228];
        px(ctx, 8, 12, 74, 1, "#6E4A42");
        px(ctx, 162, 12, 70, 1, "#6E4A42");
        bulbs.forEach((bx, idx) => {
          const glow = ((Math.floor(frame / 18) + idx) % 2 === 0);
          const col = glow ? "#FFE680" : "#FFC2D8";
          if (glow) {
            px(ctx, bx - 1, 12, 5, 5, "rgba(255, 232, 130, 0.35)");
          }
          px(ctx, bx, 13, 3, 3, col);
        });
        break;
      }
      case "cat_tree": {
        // Cute 3-tier cat climbing post & scratching tree for bé Bông
        const cx = 52, cy = 124;
        px(ctx, cx, cy + 24, 18, 4, "#D4A373");
        px(ctx, cx + 7, cy + 6, 4, 18, "#E6CCB2");
        // Sisal rope wrapping
        px(ctx, cx + 7, cy + 9, 4, 1, "#B08968");
        px(ctx, cx + 7, cy + 14, 4, 1, "#B08968");
        px(ctx, cx + 7, cy + 19, 4, 1, "#B08968");
        // Middle perch
        px(ctx, cx - 2, cy + 14, 12, 3, "#D4A373");
        px(ctx, cx - 1, cy + 13, 10, 2, "#F7B6CC");
        // Top perch
        px(ctx, cx + 3, cy + 4, 14, 3, "#D4A373");
        px(ctx, cx + 4, cy + 3, 12, 2, "#FDE2EC");
        // Dangling tiny toy mouse
        px(ctx, cx + 1, cy + 17, 1, 4, "#6E4A3A");
        px(ctx, cx, cy + 21, 3, 2, "#ADB5BD");
        px(ctx, cx + 2, cy + 20, 1, 1, "#E46B94");
        break;
      }
      case "mck_vinyl": {
        // Retro vinyl record player spinning Album 99% - MCK with floating beats
        const vx = 170, vy = 92;
        // Turntable cabinet (vintage warm wood)
        px(ctx, vx, vy + 4, 22, 10, "#5C3D2E");
        px(ctx, vx + 1, vy + 2, 20, 3, "#C89666");
        // Vinyl record (spinning black disk)
        px(ctx, vx + 2, vy, 14, 4, "#1A1A1A");
        px(ctx, vx + 4, vy - 1, 10, 6, "#2B2B2B");
        px(ctx, vx + 6, vy, 6, 4, "#1A1A1A");
        // MCK 99% pink center label
        px(ctx, vx + 7, vy + 1, 4, 2, "#FF4D6D");
        px(ctx, vx + 8, vy + 1, 2, 1, "#FFFFFF");
        // Golden tonearm
        px(ctx, vx + 18, vy - 1, 2, 3, "#FFE066");
        px(ctx, vx + 14, vy + 1, 5, 1, "#FFE066");
        // Floating musical beats
        const noteBob1 = (frame * 0.4) % 18;
        px(ctx, vx + 9, vy - 4 - noteBob1, 2, 3, "#E46B94");
        px(ctx, vx + 10, vy - 4 - noteBob1, 3, 1, "#E46B94");
        const noteBob2 = (frame * 0.4 + 9) % 18;
        px(ctx, vx + 16, vy - 3 - noteBob2, 2, 3, "#9D4EDD");
        px(ctx, vx + 17, vy - 3 - noteBob2, 3, 1, "#9D4EDD");
        break;
      }
      case "succulent": {
        // Twin succulent rosettes on window sill (left side)
        const sx = 86, sy = 76;
        px(ctx, sx, sy + 7, 12, 7, "#FFFDF7");
        px(ctx, sx - 1, sy + 6, 14, 2, "#FDE2EC");
        px(ctx, sx + 5, sy + 9, 2, 2, "#E46B94"); // tiny heart
        px(ctx, sx + 1, sy + 6, 10, 1, "#5A3825"); // soil
        // Rosette 1 (minty with pink tips)
        px(ctx, sx + 1, sy + 3, 5, 3, "#52B788");
        px(ctx, sx + 2, sy + 1, 3, 2, "#74C69D");
        px(ctx, sx + 3, sy, 1, 1, "#FF758F");
        // Rosette 2
        px(ctx, sx + 6, sy + 2, 5, 4, "#40916C");
        px(ctx, sx + 7, sy + 1, 3, 2, "#52B788");
        px(ctx, sx + 8, sy, 1, 1, "#FF758F");
        break;
      }
      case "bookshelf": {
        // Wooden bookshelf with colorful books
        const bx = 174, by = 62;
        px(ctx, bx - 2, by + 12, 28, 2, "#8D5B4C");
        px(ctx, bx - 1, by + 13, 26, 1, "#6E4A3A");
        px(ctx, bx, by + 14, 2, 3, "#6E4A3A");
        px(ctx, bx + 22, by + 14, 2, 3, "#6E4A3A");
        // Colorful book spines
        px(ctx, bx + 2, by + 2, 3, 10, "#FF6B6B");
        px(ctx, bx + 5, by + 3, 3, 9, "#FFE66D");
        px(ctx, bx + 8, by + 1, 4, 11, "#4ECDC4");
        px(ctx, bx + 13, by + 4, 3, 8, "#B392AC");
        px(ctx, bx + 14, by + 3, 2, 2, "#B392AC");
        px(ctx, bx + 18, by + 5, 4, 7, "#95D5B2");
        break;
      }
      case "mirror": {
        // Floor-standing arched mirror with pastel pink trim
        const mx = 224, my = 106;
        px(ctx, mx + 1, my, 10, 2, "#E46B94");
        px(ctx, mx, my + 2, 12, 34, "#E46B94");
        px(ctx, mx + 2, my + 34, 8, 4, "#8D5B4C");
        px(ctx, mx - 1, my + 37, 14, 2, "#6E4A3A");
        // Mirror glass reflection
        px(ctx, mx + 2, my + 2, 8, 32, "#DDF2FF");
        px(ctx, mx + 3, my + 3, 6, 30, "#EDF7FF");
        // Glass shine
        px(ctx, mx + 5, my + 7, 3, 1, "rgba(255,255,255,0.7)");
        px(ctx, mx + 4, my + 8, 3, 1, "rgba(255,255,255,0.7)");
        px(ctx, mx + 6, my + 14, 2, 1, "rgba(255,255,255,0.5)");
        break;
      }
      case "couple_mugs": {
        // Interlocking couple mugs (HN Blue - HP Pink with steaming heart)
        const kx = 188, ky = 138;
        // Blue Hanoi mug (Khánh)
        px(ctx, kx, ky + 2, 5, 5, "#4EA8DE");
        px(ctx, kx - 1, ky + 3, 1, 3, "#4EA8DE");
        px(ctx, kx + 1, ky + 1, 3, 1, "#72EFDD");
        px(ctx, kx + 2, ky + 3, 2, 2, "#FFFFFF");
        // Pink Haiphong mug (Ngọc)
        px(ctx, kx + 6, ky + 2, 5, 5, "#FF758F");
        px(ctx, kx + 11, ky + 3, 1, 3, "#FF758F");
        px(ctx, kx + 7, ky + 1, 3, 1, "#FFCCD5");
        px(ctx, kx + 7, ky + 3, 2, 2, "#FFFFFF");
        // Cozy steam rising
        const sBob = Math.floor(frame / 20) % 2;
        px(ctx, kx + 2, ky - 2 + sBob, 1, 2, "rgba(255,255,255,0.6)");
        px(ctx, kx + 8, ky - 2 + (1 - sBob), 1, 2, "rgba(255,255,255,0.6)");
        px(ctx, kx + 5, ky - 4, 2, 2, "#FF80A4");
        break;
      }
    }
  }

  // Draw Catch Mini-Game items crisply
  function drawCatchItem(ctx, item, frame) {
    const x = Math.round(item.x);
    const y = Math.round(item.y);

    if (item.kind === "poop") {
      // Cục cứt xoắn hài hước (classic pixel poop swirl + tiny stink lines)
      px(ctx, x - 1, y - 8, 2, 2, "#8C583A");
      px(ctx, x - 3, y - 6, 6, 3, "#7A4B2E");
      px(ctx, x - 5, y - 3, 10, 4, "#8C583A");
      px(ctx, x - 7, y + 1, 14, 5, "#6E4126");
      px(ctx, x - 6, y + 5, 12, 1, "#4A2B18");
      // Highlight swirl
      px(ctx, x - 4, y - 2, 3, 1, "#A8704D");
      px(ctx, x - 5, y + 2, 4, 1, "#A8704D");
      // Funny eyes
      px(ctx, x - 3, y + 1, 2, 2, "#FFFFFF");
      px(ctx, x + 1, y + 1, 2, 2, "#FFFFFF");
      px(ctx, x - 2, y + 2, 1, 1, "#1A1210");
      px(ctx, x + 2, y + 2, 1, 1, "#1A1210");
      // Tiny stink waves
      const wave = Math.floor(frame / 10) % 2;
      px(ctx, x - 6, y - 8 + wave, 1, 3, "#A3B86C");
      px(ctx, x + 5, y - 9 - wave, 1, 3, "#A3B86C");
      return;
    }

    if (item.kind === "heart") {
      px(ctx, x - 5, y - 4, 4, 4, "#F05D8E");
      px(ctx, x + 1, y - 4, 4, 4, "#F05D8E");
      px(ctx, x - 6, y - 2, 12, 4, "#F05D8E");
      px(ctx, x - 4, y + 2, 8, 2, "#F05D8E");
      px(ctx, x - 2, y + 4, 4, 2, "#F05D8E");
      px(ctx, x - 4, y - 3, 2, 1, "#FFC2D6");
      return;
    }

    if (item.kind === "candy") {
      // Cute wrapped candy
      px(ctx, x - 8, y - 3, 3, 6, "#FF9EC0");
      px(ctx, x + 5, y - 3, 3, 6, "#FF9EC0");
      px(ctx, x - 5, y - 4, 10, 8, "#FFE066");
      px(ctx, x - 3, y - 4, 2, 8, "#FF7AA8");
      px(ctx, x + 1, y - 4, 2, 8, "#FF7AA8");
      return;
    }

    if (item.kind === "banhmi") {
      // Bánh mì cay HP
      px(ctx, x - 8, y - 3, 16, 6, "#E09A4B");
      px(ctx, x - 6, y - 4, 12, 2, "#F4BD70");
      px(ctx, x - 4, y - 1, 8, 2, "#C84B31"); // pate & chí chương
      return;
    }

    // Matcha / Trà cúc cup
    px(ctx, x - 5, y - 5, 10, 11, "#FFFDF7");
    px(ctx, x - 4, y - 2, 8, 7, "#82C985"); // matcha green
    px(ctx, x - 6, y - 6, 12, 2, "#F9C8D9"); // lid
    px(ctx, x + 1, y - 10, 2, 5, "#4A302C"); // straw
  }

  return {
    drawKhanh,
    drawNgoc,
    drawHugCouple,
    drawBong,
    drawDecor,
    drawCatchItem,
    px
  };
})();
