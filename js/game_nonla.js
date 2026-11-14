window.NonLaGame = (() => {
  let canvas = null;
  let ctx = null;
  let rafId = null;
  let running = false;
  let frame = 0;
  let callbacks = {};

  // 80+ Diverse challenges across 3 tiers (Everyday, Love & Inside jokes, Hải Phòng dishes/landmarks, MCK lyrics, and classic twisters)
  const CHALLENGES = [
    // Tier 1: Cặp từ ngắn, chuẩn phát âm đời thường (30 câu)
    { tier: 1, target: "nón lá", blank: "___ lá đội đầu che nắng", right: "Nón", wrong: "Lón", ngong: "lón ná" },
    { tier: 1, target: "lá non", blank: "Cành cây trổ ___ non mơn mởn", right: "lá", wrong: "ná", ngong: "ná lon" },
    { tier: 1, target: "nước lọc", blank: "Uống ngụm ___ lọc mát lạnh", right: "nước", wrong: "lước", ngong: "lước nọc" },
    { tier: 1, target: "lúa nếp", blank: "Hương ___ nếp thơm ngạt ngào", right: "lúa", wrong: "núa", ngong: "núa lếp" },
    { tier: 1, target: "nồi niêu", blank: "Căn bếp đầy ___ niêu xoong chảo", right: "nồi", wrong: "lồi", ngong: "lồi liêu" },
    { tier: 1, target: "lòng lợn", blank: "Món ___ lợn luộc chấm mắm tôm", right: "lòng", wrong: "nòng", ngong: "nòng nợn" },
    { tier: 1, target: "no nê", blank: "Hai đứa mình ăn uống ___ nê", right: "no", wrong: "lo", ngong: "lo lê" },
    { tier: 1, target: "nắng lên", blank: "Bình minh vừa ___ lên rực rỡ", right: "nắng", wrong: "lắng", ngong: "lắng nên" },
    { tier: 1, target: "nấm lùn", blank: "Cây ___ lùn nhỏ xíu góc vườn", right: "nấm", wrong: "lấm", ngong: "lấm nùn" },
    { tier: 1, target: "lạnh lùng", blank: "Ngoài mặt tỏ vẻ ___ lùng thế thôi", right: "lạnh", wrong: "nạnh", ngong: "nạnh nùng" },
    { tier: 1, target: "hoa lan", blank: "Chậu hoa ___ tím dịu dàng khoe sắc", right: "lan", wrong: "nan", ngong: "hoa nan" },
    { tier: 1, target: "lung linh", blank: "Đèn hoa phượng ___ linh phố Cảng", right: "lung", wrong: "nung", ngong: "nung ninh" },
    { tier: 1, target: "lấp lánh", blank: "Ánh sao đêm ___ lánh trên bầu trời", right: "lấp", wrong: "nấp", ngong: "nấp nánh" },
    { tier: 1, target: "lưu luyến", blank: "Lúc chia tay lòng đầy ___ luyến", right: "lưu", wrong: "nưu", ngong: "nưu nuyến" },
    { tier: 1, target: "nô nức", blank: "Phố phường đông vui ___ nức hội hè", right: "nô", wrong: "lô", ngong: "lô lức" },
    { tier: 1, target: "nũng nịu", blank: "Bé Sún hay ___ đòi anh dỗ dành", right: "nũng nịu", wrong: "lũng liệu", ngong: "lũng liệu" },
    { tier: 1, target: "nóng lòng", blank: "Anh rất ___ lòng muốn gặp em sớm", right: "nóng", wrong: "lóng", ngong: "lóng nòng" },
    { tier: 1, target: "lối nhỏ", blank: "Con ___ nhỏ dẫn vào ngõ nhà em", right: "lối", wrong: "nối", ngong: "nối nhỏ" },
    { tier: 1, target: "lời nói", blank: "Từng ___ nói anh đều ghi nhớ kỹ", right: "lời", wrong: "nời", ngong: "nời lói" },
    { tier: 1, target: "líu lo", blank: "Chim hót ___ lo trên cành ban mai", right: "líu", wrong: "níu", ngong: "níu no" },
    { tier: 1, target: "lén lút", blank: "Cứ ___ lút nhìn trộm người ta cười", right: "lén", wrong: "nén", ngong: "nén nút" },
    { tier: 1, target: "nô đùa", blank: "Mèo Bông nghịch ngợm chạy nhảy ___ đùa", right: "nô", wrong: "lô", ngong: "lô đùa" },
    { tier: 1, target: "lạ lùng", blank: "Cảm giác xốn xang thật ___ lùng", right: "lạ", wrong: "nạ", ngong: "nạ nùng" },
    { tier: 1, target: "nỗ lực", blank: "Mỗi ngày hai đứa đều cùng ___ lực", right: "nỗ", wrong: "lỗ", ngong: "lỗ lực" },
    { tier: 1, target: "lụa là", blank: "Tà áo dài duyên dáng gấm vóc ___ là", right: "lụa", wrong: "nụa", ngong: "nụa nà" },
    { tier: 1, target: "lộc non", blank: "Mùa xuân cây cối đâm chồi ___ non", right: "lộc", wrong: "nộc", ngong: "nộc non" },
    { tier: 1, target: "nồng nàn", blank: "Hương hoa sữa ___ nàn góc phố thu", right: "nồng", wrong: "lồng", ngong: "lồng làn" },
    { tier: 1, target: "nặng lòng", blank: "Mỗi khi xa cách nghe sao ___ lòng", right: "nặng", wrong: "lặng", ngong: "lặng nòng" },
    { tier: 1, target: "lặng lẽ", blank: "Anh ___ lẽ ngắm nhìn ánh mắt em", right: "lặng", wrong: "nặng", ngong: "nặng nẽ" },
    { tier: 1, target: "lanh lợi", blank: "Cô bé người yêu vừa xinh vừa ___ lợi", right: "lanh", wrong: "nanh", ngong: "nanh nợi" },

    // Tier 2: Tình yêu đôi mình, Đất Cảng Hải Phòng & Nhạc MCK (30 câu)
    { tier: 2, target: "yêu lắm", blank: "Dù ở xa nhau nhưng anh thương em ___", right: "lắm", wrong: "nắm", ngong: "yêu nắm" },
    { tier: 2, target: "nhớ lắm", blank: "Mới không gặp mấy hôm mà đã ___", right: "lắm", wrong: "nắm", ngong: "nhớ nắm" },
    { tier: 2, target: "nắm lấy tay", blank: "Hãy đưa tay đây và ___ lấy tay anh", right: "Nắm", wrong: "Lắm", ngong: "lắm nấy tay" },
    { tier: 2, target: "nựng má", blank: "Mỗi lần gặp chỉ muốn véo ___ thơm má", right: "nựng", wrong: "lựng", ngong: "lựng má" },
    { tier: 2, target: "luôn luôn", blank: "Anh sẽ ___ ở bên cạnh đồng hành cùng em", right: "luôn", wrong: "nuôn", ngong: "nuôn nuôn" },
    { tier: 2, target: "lo lắng", blank: "Đừng ___ nhiều nha, có anh lo hết rồi", right: "lo", wrong: "no", ngong: "no nắng" },
    { tier: 2, target: "lạc lối", blank: "Lỡ bước ___ vào đôi mắt trong veo", right: "lạc", wrong: "nạc", ngong: "nạc nối" },
    { tier: 2, target: "lên xe", blank: "Mau ___ xe anh chở em dạo phố nào", right: "lên", wrong: "nên", ngong: "nên xe" },
    { tier: 2, target: "nụ hôn", blank: "Trao cho người yêu một ___ thật ngọt ngào", right: "nụ", wrong: "lụ", ngong: "lụ hôn" },
    { tier: 2, target: "ngọt lịm", blank: "Giọng nói của em mỗi lần gọi anh ___ lịm", right: "lịm", wrong: "nịm", ngong: "ngọt nịm" },
    { tier: 2, target: "bánh đa lòng cá", blank: "Món bánh đa ___ cá cay xé lưỡi", right: "lòng", wrong: "nòng", ngong: "bánh đa nòng cá" },
    { tier: 2, target: "nem cua bể", blank: "Đĩa ___ cua bể chiên giòn rụm", right: "nem", wrong: "lem", ngong: "lem cua bể" },
    { tier: 2, target: "nước dùng", blank: "Nồi ___ dùng bánh đa cua thơm nức mũi", right: "nước", wrong: "lước", ngong: "lước dùng" },
    { tier: 2, target: "lạch tray", blank: "Cung đường ___ Tray tấp nập xe cộ", right: "Lạch", wrong: "Nạch", ngong: "nạch tray" },
    { tier: 2, target: "lê chân", blank: "Tượng đài Nữ tướng ___ Chân hào hùng", right: "Lê", wrong: "Nê", ngong: "nê chân" },
    { tier: 2, target: "đồ sơn lộng gió", blank: "Bờ biển Đồ Sơn chiều về ___ gió mát rượi", right: "lộng", wrong: "nộng", ngong: "đồ sơn nộng gió" },
    { tier: 2, target: "cát bà lung linh", blank: "Vịnh đảo Cát Bà ___ linh sóng nước", right: "lung", wrong: "nung", ngong: "cát bà nung ninh" },
    { tier: 2, target: "cột đèn nức tiếng", blank: "Pate Cột Đèn Hải Phòng ___ tiếng gần xa", right: "nức", wrong: "lức", ngong: "cột đèn lức tiếng" },
    { tier: 2, target: "chìm sâu", blank: "Tại vì sao lại cứ ___ sâu trong mắt em (MCK)", right: "chìm", wrong: "nhìm", ngong: "nại cứ chìm sâu" },
    { tier: 2, target: "lời đường mật", blank: "Chẳng cần những ___ đường mật phù phiếm trên môi", right: "lời", wrong: "nời", ngong: "nời đường mật" },
    { tier: 2, target: "lặng thinh", blank: "Ngồi một góc ngắm nhìn em rồi ___ thinh", right: "lặng", wrong: "nặng", ngong: "nặng thinh" },
    { tier: 2, target: "lối đi", blank: "Dù cuộc đời có trăm ngàn ngã rẽ ___ đi", right: "lối", wrong: "nối", ngong: "nối đi" },
    { tier: 2, target: "nụ cười", blank: "Chỉ cần nhìn thấy một ___ cười của em là đủ", right: "nụ", wrong: "lụ", ngong: "lụ cười" },
    { tier: 2, target: "hoàng long", blank: "Tên thật của rapper MCK là Nghiêm Vũ Hoàng ___", right: "Long", wrong: "Nong", ngong: "hoàng nong" },
    { tier: 2, target: "nói năng lưu loát", blank: "Cùng nhau luyện phát âm nói năng ___ loát", right: "lưu", wrong: "nưu", ngong: "lói lăng nưu noát" },
    { tier: 2, target: "nồi đồng nấu ốc", blank: "Nồi đồng ___ ốc còn nồi đất nấu ếch", right: "nấu", wrong: "lấu", ngong: "lồi đồng lấu ốc" },
    { tier: 2, target: "con lươn luồn lườn", blank: "Con ___ luồn qua cái lườn ông tiến sĩ", right: "lươn", wrong: "nươn", ngong: "con nươn nuồn nườn" },
    { tier: 2, target: "lên non lấy nứa", blank: "Rủ nhau lên ___ lấy nứa về đan rổ", right: "non", wrong: "lon", ngong: "nên lon nấy lứa" },
    { tier: 2, target: "lính lệ leo lầu", blank: "Lũ lính ___ leo lên thang lầu canh gác", right: "lệ", wrong: "nệ", ngong: "nính nệ neo nầu" },
    { tier: 2, target: "lòng nàng lâng lâng", blank: "Nghe câu tỏ tình khiến lòng nàng ___ lâng", right: "lâng", wrong: "nâng", ngong: "nòng làng nâng nâng" },

    // Tier 3: Thử thách xoắn não & Ca dao đồng dao hóc búa (24 câu)
    { tier: 3, target: "lúa nếp là lúa nếp non", blank: "___ nếp là lúa nếp non hạt mẩy", right: "Lúa", wrong: "Núa", ngong: "núa lếp nà núa lếp lon" },
    { tier: 3, target: "lên núi lấy nứa làm lán", blank: "Lên núi lấy nứa về làm cái ___ nghỉ", right: "lán", wrong: "nán", ngong: "nên lúi nấy lứa nàm nán" },
    { tier: 3, target: "nói năng nên luyện luôn luôn", blank: "Nói năng chuẩn chỉ nên ___ luôn luôn", right: "luyện", wrong: "nuyện", ngong: "lói lăng lên nuyện nuôn nuôn" },
    { tier: 3, target: "luộc hột vịt lộn luộc lại", blank: "Nửa đêm đói bụng ___ hột vịt lộn luộc lại", right: "luộc", wrong: "nuộc", ngong: "nuộc hột vịt nộn nuộc nại" },
    { tier: 3, target: "làng nành lợn nái năm nay", blank: "Làng Nành đàn ___ nái đẻ được năm con", right: "lợn", wrong: "nợn", ngong: "nàng nành nợn nái năm nay" },
    { tier: 3, target: "nồi nung nấu nước luộc lòng", blank: "Bắc cái nồi nung nấu nước ___ lòng lợn", right: "luộc", wrong: "nuộc", ngong: "lồi nung lấu lước nuộc nòng" },
    { tier: 3, target: "lúa nếp chín nứt nở lòng nàng", blank: "Cánh đồng lúa nếp chín rộ ___ nở lòng nàng", right: "nứt", wrong: "lứt", ngong: "lúa lếp chín lứt lở nòng nàng" },
    { tier: 3, target: "lá lành đùm lá rách", blank: "Truyền thống ngàn đời như lá ___ đùm lá rách", right: "lành", wrong: "nành", ngong: "ná nành đùm ná rách" },
    { tier: 3, target: "nuôi nấng nên người", blank: "Công cha nghĩa mẹ bao năm ___ nấng nên người", right: "nuôi", wrong: "luôi", ngong: "luôi lấng lên người" },
    { tier: 3, target: "lửa lựu lập lòe", blank: "Đầu tường hoa lửa lựu ___ lòe đơm bông", right: "lập", wrong: "nập", ngong: "nửa nựu nập nòe" },
    { tier: 3, target: "nắng nỏ đồng khô", blank: "Trời mùa hạ gay gắt ___ nỏ đồng khô nứt nẻ", right: "nắng", wrong: "lắng", ngong: "lắng lỏ đồng khô" },
    { tier: 3, target: "lung la lung linh", blank: "Vầng trăng đêm rằm chiếu sáng ___ la lung linh", right: "lung", wrong: "nung", ngong: "nung na nung ninh" },
    { tier: 3, target: "lóng lánh ánh nắng", blank: "Giọt sương sớm đọng ___ lánh dưới ánh nắng", right: "lóng", wrong: "nóng", ngong: "nóng nánh ánh nắng" },
    { tier: 3, target: "năn nỉ nỉ non", blank: "Có anh chàng ngọt ngào ___ nỉ dỗ người thương", right: "năn", wrong: "lăn", ngong: "lăn lỉ nỉ lon" },
    { tier: 3, target: "lầm lì lầm lụi", blank: "Chàng trai thương em ___ lì chịu thương chịu khó", right: "lầm", wrong: "nầm", ngong: "nầm nì nầm nụi" },
    { tier: 3, target: "lặn lội nuôi con", blank: "Thương mẹ một đời ___ lội sớm hôm tảo tần", right: "lặn", wrong: "nặn", ngong: "nặn nội nuôi con" },
    { tier: 3, target: "long lanh mắt ngọc", blank: "Đôi mắt em trong veo ___ lanh như ngọc", right: "long", wrong: "nong", ngong: "nong nanh mắt ngọc" },
    { tier: 3, target: "nâng niu nụ cười", blank: "Anh nguyện cả đời ___ niu nụ cười của em", right: "nâng", wrong: "lâng", ngong: "lâng liu nụ cười" },
    { tier: 3, target: "lộng lẫy nàng thơ", blank: "Dù giản dị em vẫn là người ___ lẫy nhất với anh", right: "lộng", wrong: "nộng", ngong: "nộng nẫy nàng thơ" },
    { tier: 3, target: "nắm chặt bàn tay", blank: "Bão tố ngoài kia chỉ cần ___ chặt lấy tay nhau", right: "nắm", wrong: "lắm", ngong: "lắm chặt bàn tay" },
    { tier: 3, target: "lắng nghe giai điệu", blank: "Tựa đầu bên nhau ___ nghe giai điệu Album 99%", right: "lắng", wrong: "nắng", ngong: "nắng nghe giai điệu" },
    { tier: 3, target: "lạc nhịp con tim", blank: "Mỗi lần nhìn vào mắt em là khiến ___ nhịp tim", right: "lạc", wrong: "nạc", ngong: "nạc nhịp con tim" },
    { tier: 3, target: "nương náu bình yên", blank: "Bên em là bến đỗ an yên cho anh ___ náu", right: "nương", wrong: "lương", ngong: "lương náu bình yên" },
    { tier: 3, target: "luôn ở bên cạnh", blank: "Khoảng cách địa lý nhưng trái tim ___ bên cạnh em", right: "luôn", wrong: "nuôn", ngong: "nuôn ở bên cạnh" }
  ];

  let mode = "voice"; // "voice" | "quiet"
  let recognition = null;
  let recGeneration = 0;
  let restartTimer = null;
  let captureRetries = 0;
  let pendingErrorRetry = false;
  let lastSpeechActivity = 0;
  let wordResultOffset = 0;
  let currentResultLen = 0;
  let micPulse = 0;
  let speechDetected = false;
  let lastHeard = "";

  let isPaused = false;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent || "") ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

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
      .replace(/[.,!?;:"'()\-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Strip ONLY Vietnamese tone marks (sắc/huyền/hỏi/ngã/nặng), keeping L/N & base vowels (ă,â,ê,ô,ơ,ư,đ) exact!
  function stripTonesKeepLN(str) {
    return normalizeVN(str)
      .normalize("NFD")
      .replace(/[\u0300\u0301\u0303\u0309\u0323]/g, "")
      .normalize("NFC");
  }

  const usedTargets = new Set();

  function pickNextWord() {
    const maxTier = score >= 120 ? 3 : (score >= 45 ? 2 : 1);
    let pool = CHALLENGES.filter((c) => c.tier <= maxTier && !usedTargets.has(c.target));
    if (pool.length === 0) {
      usedTargets.clear();
      pool = CHALLENGES.filter((c) => c.tier <= maxTier && c.target !== lastTarget);
    }
    const chosen = pool[Math.floor(Math.random() * pool.length)] || CHALLENGES[0];
    usedTargets.add(chosen.target);
    currentWord = chosen;
    lastTarget = chosen.target;
    obstacleX = 248;
    obstacleCleared = false;
    wordResultOffset = currentResultLen;

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
    if (obstacleX > 115) obstacleX = 115;
    streak++;
    const givesCandy = (streak % 2 === 0);
    const bonusCandy = givesCandy ? 1 : 0;
    score += 15 + Math.min(15, (streak - 1) * 3);
    candies += bonusCandy;

    const silentAudioLock = isIOS && mode === "voice";
    if (streak >= 3) {
      if (!silentAudioLock && window.AudioManager) AudioManager.playCombo(streak);
      statusBanner = `🔥 Chuỗi chuẩn x${streak}! ${bonusCandy > 0 ? "+1 🍬" : "✨"}`;
    } else {
      if (!silentAudioLock && window.AudioManager) AudioManager.playCandy();
      statusBanner = msg || `Chuẩn L-N! 👒 ${bonusCandy > 0 ? "+1 🍬" : "✨"}`;
    }
    statusTimer = 55;
    if (callbacks.onHudUpdate) {
      callbacks.onHudUpdate({ score, candies, livesText: "❤️".repeat(lives) });
    }
  }

  function matchesTarget(candidates, target) {
    const targetExact = normalizeVN(target);
    const targetToneFree = stripTonesKeepLN(target);
    const targetTokens = targetToneFree.split(" ");

    for (const raw of candidates) {
      const exact = normalizeVN(raw);
      const toneFree = stripTonesKeepLN(raw);
      if (exact.includes(targetExact) || toneFree.includes(targetToneFree)) {
        return true;
      }
      const heardTokens = toneFree.split(" ");
      if (targetTokens.every((t) => heardTokens.includes(t))) {
        return true;
      }
    }
    return false;
  }

  function handleSpeechResults(event) {
    if (!running || mode !== "voice" || !currentWord || obstacleCleared) return;
    currentResultLen = event.results.length;
    lastSpeechActivity = Date.now();
    micPulse = 1;

    const startIdx = Math.max(wordResultOffset, event.results.length - 3);
    const candidates = [];
    let latestDisplay = "";

    // Build per-alternative combined strings across recent result window
    const altDepth = 5;
    for (let alt = 0; alt < altDepth; alt++) {
      let chunk = "";
      for (let i = startIdx; i < event.results.length; i++) {
        const res = event.results[i];
        const pick = res[alt] ? res[alt].transcript : res[0].transcript;
        chunk += " " + pick;
      }
      if (chunk.trim()) candidates.push(chunk.trim());
    }

    // Also inspect individual latest result alternatives
    const latestRes = event.results[event.results.length - 1];
    if (latestRes) {
      latestDisplay = normalizeVN(latestRes[0].transcript);
      for (let alt = 0; alt < latestRes.length; alt++) {
        candidates.push(latestRes[alt].transcript);
      }
    }

    lastHeard = latestDisplay || normalizeVN(candidates[0] || "");
    if (callbacks.onHeardUpdate) callbacks.onHeardUpdate(lastHeard);

    if (matchesTarget(candidates, currentWord.target)) {
      triggerJump("Phát âm chuẩn! 👒");
    } else if (matchesTarget(candidates, currentWord.ngong)) {
      streak = 0;
      statusBanner = `Nghe thành "${currentWord.ngong}" rồi kìa 😂`;
      statusTimer = 45;
      if (!(isIOS && mode === "voice") && window.AudioManager) AudioManager.playBonk();
    }
  }

  function forceKillRecognition(rec) {
    if (!rec) return;
    rec.onstart = null;
    rec.onaudiostart = null;
    rec.onspeechstart = null;
    rec.onspeechend = null;
    rec.onresult = null;
    rec.onerror = null;
    rec.onend = null;
    try {
      rec.abort();
    } catch {
      // ignore
    }
  }

  function spawnFreshRecognizer() {
    if (!running || isPaused || mode !== "voice" || !hasSpeechAPI()) return;
    clearTimeout(restartTimer);
    pendingErrorRetry = false;

    const oldRec = recognition;
    recognition = null;
    forceKillRecognition(oldRec);

    const myGen = ++recGeneration;
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    try {
      const rec = new SpeechRec();
      rec.lang = "vi-VN";
      // iOS WebKit bugs out with continuous=true (freezes / audio-capture lockup)
      rec.continuous = !isIOS;
      rec.interimResults = true;
      rec.maxAlternatives = 5;

      recognition = rec;
      wordResultOffset = 0;
      currentResultLen = 0;
      lastSpeechActivity = Date.now();

      rec.onstart = () => {
        if (myGen !== recGeneration) return;
        captureRetries = 0;
        pendingErrorRetry = false;
        lastSpeechActivity = Date.now();
        if (callbacks.onMicState) callbacks.onMicState(true);
      };

      rec.onaudiostart = () => {
        if (myGen !== recGeneration) return;
        captureRetries = 0;
        pendingErrorRetry = false;
        lastSpeechActivity = Date.now();
      };

      rec.onspeechstart = () => {
        if (myGen !== recGeneration) return;
        speechDetected = true;
        micPulse = 1;
        lastSpeechActivity = Date.now();
      };

      rec.onspeechend = () => {
        if (myGen !== recGeneration) return;
        speechDetected = false;
      };

      rec.onresult = (event) => {
        if (myGen !== recGeneration) return;
        captureRetries = 0;
        pendingErrorRetry = false;
        handleSpeechResults(event);
      };

      rec.onerror = (err) => {
        if (myGen !== recGeneration) return;
        if (err.error === "not-allowed" || err.error === "service-not-allowed") {
          pendingErrorRetry = true;
          setMode("quiet", "Tab này chưa cấp quyền Micro → chuyển sang Im lặng 🤫");
        } else if (err.error === "audio-capture") {
          pendingErrorRetry = true;
          const delays = [600, 1500];
          if (captureRetries < delays.length) {
            const waitMs = delays[captureRetries];
            captureRetries++;
            if (callbacks.onMicState) {
              callbacks.onMicState(false, `🎤 Đang kết nối lại Micro (${captureRetries}/${delays.length})...`);
            }
            clearTimeout(restartTimer);
            restartTimer = setTimeout(() => {
              if (!running || isPaused || mode !== "voice" || myGen !== recGeneration) return;
              spawnFreshRecognizer();
            }, waitMs);
          } else {
            const isStandalone = Boolean(window.navigator.standalone) ||
              (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);
            const msg = isStandalone && isIOS
              ? "Micro đang bận trên iPhone → bấm 'Đổi sang Mic' để bật lại nha!"
              : "Micro đang bận trên máy → chuyển sang Im lặng 🤫";
            setMode("quiet", msg);
          }
        } else if (err.error === "network") {
          pendingErrorRetry = true;
          setMode("quiet", "Nhận diện giọng nói cần mạng → chuyển sang Im lặng 🤫");
        }
      };

      rec.onend = () => {
        if (myGen !== recGeneration) return;
        speechDetected = false;
        // Never overwrite an active error-recovery timer scheduled by rec.onerror!
        if (pendingErrorRetry) return;
        if (running && !isPaused && mode === "voice") {
          clearTimeout(restartTimer);
          restartTimer = setTimeout(() => {
            if (running && !isPaused && mode === "voice" && myGen === recGeneration) {
              spawnFreshRecognizer();
            }
          }, isIOS ? 280 : 120);
        } else if (callbacks.onMicState) {
          callbacks.onMicState(false);
        }
      };

      rec.start();
    } catch {
      setMode("quiet", "Không bật được Mic → chuyển sang Im lặng 🤫");
    }
  }

  function startSpeech() {
    if (mode !== "voice" || isPaused) return;
    if (!hasSpeechAPI()) {
      setMode("quiet", "Trình duyệt chưa hỗ trợ Speech API → dùng Im lặng 🤫");
      return;
    }
    captureRetries = 0;
    if (isIOS && window.AudioManager && AudioManager.suspendForMic) {
      AudioManager.suspendForMic();
    }
    // Call synchronously inside user tap so iOS Safari/PWA keeps the gesture token!
    spawnFreshRecognizer();
  }

  function stopSpeech() {
    recGeneration++;
    clearTimeout(restartTimer);
    pendingErrorRetry = false;
    speechDetected = false;
    micPulse = 0;
    const oldRec = recognition;
    recognition = null;
    forceKillRecognition(oldRec);
    if (isIOS && window.AudioManager && AudioManager.resumeAfterMic) {
      AudioManager.resumeAfterMic();
    }
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
    usedTargets.clear();
    statusBanner = mode === "voice" ? "Đọc to câu bên trên vào Mic nha!" : "Điền đúng L hoặc N để nhảy!";
    statusTimer = 70;
    frame = 0;
    lastTime = 0;
    acc = 0;
    running = true;
    isPaused = false;

    pickNextWord();
    if (callbacks.onHudUpdate) callbacks.onHudUpdate({ score, candies, livesText: "❤️❤️❤️" });
    if (callbacks.onPauseState) callbacks.onPauseState(false);
    if (mode === "voice") startSpeech();
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function pause() {
    if (!running || isPaused) return false;
    isPaused = true;
    stopSpeech();
    if (callbacks.onPauseState) callbacks.onPauseState(true);
    return true;
  }

  function suspend() {
    // Suspends speech and loop while keeping paused game state intact across menu switches
    stopSpeech();
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    isPaused = true;
    if (callbacks.onPauseState) callbacks.onPauseState(true);
  }

  function resume() {
    if (!running || !isPaused) return false;
    isPaused = false;
    lastTime = performance.now();
    acc = 0;
    if (mode === "voice") {
      startSpeech();
    }
    if (callbacks.onPauseState) callbacks.onPauseState(false);
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
    return true;
  }

  function togglePause() {
    if (!running) return false;
    return isPaused ? resume() : pause();
  }

  function stop() {
    running = false;
    isPaused = false;
    stopSpeech();
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (callbacks.onPauseState) callbacks.onPauseState(false);
  }

  function endGame(reason) {
    running = false;
    isPaused = false;
    stopSpeech();
    AudioManager.playBonk();
    if (callbacks.onPauseState) callbacks.onPauseState(false);
    if (callbacks.onGameOver) {
      callbacks.onGameOver({ score, candies, reason });
    }
  }

  function update() {
    frame++;
    if (statusTimer > 0) statusTimer--;
    if (speechDetected) {
      micPulse = 0.65 + Math.abs(Math.sin(frame * 0.25)) * 0.35;
    } else if (micPulse > 0.05) {
      micPulse *= 0.9;
    } else {
      micPulse = 0.08;
    }

    // Watchdog: if voice mode is silent/stalled for > 7s without activity, refresh recognizer cleanly
    if (mode === "voice" && lastSpeechActivity && Date.now() - lastSpeechActivity > 7000) {
      lastSpeechActivity = Date.now();
      spawnFreshRecognizer();
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
      ? Math.min(0.55, 0.22 + score * 0.0007)
      : Math.min(0.88, 0.38 + score * 0.0010);
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
        endGame("Đâm cột mất rồi! Đọc hoặc chọn nhanh hơn xíu nha:");
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

    if (streak >= 2) {
      ctx.fillStyle = "#E46B94";
      ctx.font = "bold 10px monospace";
      ctx.fillText(`🔥 CHUỖI x${streak}`, 8, 15);
    }
    if (mode === "voice") {
      px(ctx, 156, 8, 76, 8, "#FFFDF7");
      px(ctx, 157, 9, Math.round(74 * micPulse), 6, speechDetected || micPulse > 0.3 ? "#67B374" : "#F7B6CC");
      ctx.strokeStyle = "#4A302C";
      ctx.lineWidth = 1;
      ctx.strokeRect(156, 8, 76, 8);
    }

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

    if (isPaused) {
      // Semi-transparent backdrop
      ctx.fillStyle = "rgba(40, 24, 20, 0.72)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pixel box in center
      ctx.fillStyle = "#FFFDF7";
      ctx.fillRect(24, 88, 192, 90);
      ctx.strokeStyle = "#4A302C";
      ctx.lineWidth = 2;
      ctx.strokeRect(24, 88, 192, 90);

      ctx.fillStyle = "#E45A7A";
      ctx.font = "bold 13px 'Press Start 2P', monospace, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("⏸ TẠM DỪNG", 120, 116);

      ctx.fillStyle = "#4A302C";
      ctx.font = "11px 'Be Vietnam Pro', sans-serif";
      ctx.fillText("Game đang được giữ nguyên nè!", 120, 138);
      ctx.fillStyle = "#2D6A4F";
      ctx.font = "bold 10.5px 'Be Vietnam Pro', sans-serif";
      ctx.fillText("Bấm [Tiếp Tục] để chơi lại nha 👒", 120, 158);
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
    if (!isPaused) {
      acc += dt;
      while (acc >= FIXED_STEP && running && !isPaused) {
        update();
        acc -= FIXED_STEP;
      }
    }
    if (running) {
      draw();
      rafId = requestAnimationFrame(loop);
    }
  }

  function drawPausedPreview() {
    if (running && isPaused && ctx) {
      draw();
    }
  }

  return {
    init,
    start,
    stop,
    pause,
    resume,
    suspend,
    togglePause,
    drawPausedPreview,
    isPaused: () => isPaused,
    isRunning: () => running,
    getScore: () => score,
    getCandies: () => candies,
    getLives: () => lives,
    setMode,
    getMode: () => mode,
    hasSpeechAPI,
    submitQuietChoice
  };
})();
