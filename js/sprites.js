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
    drawBong,
    drawDecor,
    drawCatchItem,
    px
  };
})();
