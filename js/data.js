window.GAME_DATA = {
  anniversary: "2026-02-11",

  timeGreetings: {
    morning: [
      "Dậy chưa em? Nhớ ăn sáng rồi hẵng đi làm nhé ☀️",
      "Sáng nay đi làm đi cẩn thận nha Sún 🚲",
      "Dậy đi làm thôi cô nương, mèo Bông dậy trước cả em rồi kìa 🐱",
      "Chúc em ngày mới đi làm nhẹ nhàng, suôn sẻ nha!"
    ],
    noon: [
      "Trưa rồi, nghỉ tay đi ăn cơm đi em 🍚",
      "Ăn trưa gì chưa? Đừng có nhịn đấy nhé.",
      "Nghỉ trưa một lát cho lại sức đi em, đừng ngồi làm việc mãi."
    ],
    afternoon: [
      "Sắp hết giờ làm rồi, ráng nốt chút nữa rồi về nghỉ ngơi thôi em 🧋",
      "Chiều nay ở chỗ làm có mệt lắm không em?",
      "Chiều rảnh tay thì vào đây chơi với anh với bé Bông một lúc cho khuây khỏa nhé."
    ],
    evening: [
      "Về tới nhà chưa em? Tối nay ăn uống đầy đủ rồi nghỉ ngơi nha 🌙",
      "Hôm nay đi làm có chuyện gì vui không, kể anh nghe với.",
      "Tối nay nghỉ ngơi sớm đi, cả ngày bận rộn rồi."
    ],
    night: [
      "Khuya rồi đó Ngọc, cất điện thoại đi ngủ sớm đi 💤",
      "Ngủ sớm đi em, thức khuya mệt người lắm. Chúc em ngủ ngon nha!",
      "Muộn rồi, mai còn dậy đi làm nữa. Ngủ ngoan nhé 🌙"
    ]
  },

  khanhDialogues: [
    "Hôm nay đi làm thế nào rồi em?",
    "Lại đang cắn môi suy nghĩ linh tinh cái gì đấy?",
    "Có chuyện gì bực mình ở chỗ làm cứ kể với anh, anh nghe hết.",
    "Đi đường nhớ đi chậm thôi đấy nhé, đừng có phóng vèo vèo.",
    "Anh vẫn ngồi đây chờ em vào nghịch nè.",
    "Thèm ăn gì ở Hải Phòng không, ghi sổ hôm nào anh xuống dắt đi ăn.",
    "Ai bảo hiểu chuyện là không được chiều? Ở đây thích gì cứ bảo anh 🍬",
    "Bé Bông đang nằm dòm em kìa, lại chuẩn bị đòi ăn rồi.",
    "Mệt thì nghỉ xíu đi em, đừng có cố quá sức nha.",
    "Hôm nào rảnh anh lại phi xuống đón em đi lượn nhé!",
    "Hôm nay em nghe nhạc MCK chưa? Nghe 'Chìm Sâu' lại thấy nhớ em ghê 🎵",
    "Bật máy đĩa than góc phòng lên nghe Album 99% cùng anh nhé em.",
    "Thấy em thích MCK nên anh cũng nghe theo, riết rồi nghiện luôn cả list nhạc của người ta.",
    "Hôm nào anh xuống, bật nhạc MCK trên xe rồi hai đứa mình lượn phố Hải Phòng nha."
  ],

  // Khánh's lines when the player taps Ngọc in the room
  ngocCompliments: [
    "Hôm nay em đeo kính nhìn trí thức ghê, anh phải học chăm hơn mới xứng 🤓💕",
    "Tóc dài đen óng thế này, cho anh vuốt một cái được không? 🥰",
    "Mặc đồ ở nhà thôi mà sao vẫn xinh thế hả em?",
    "Đi lại cả ngày mỏi chân chưa? Ngồi xuống đây anh bóp vai cho nè.",
    "Được em chạm vào là anh hết mệt luôn, sạc pin còn nhanh hơn sạc nhanh 😆",
    "Má hồng hồng thế kia, đang nghĩ đến anh đúng không?",
    "Ở Hải Phòng có một cô gái đeo kính, tóc dài, cười rất xinh… là em đó!",
    "Em là điều đáng yêu nhất căn phòng này, bé Bông cũng phải nhường 🐱💕"
  ],
  bongDialogues: [
    "Meooo~ (Bông chạy lại gần, cọ cọ đầu vào chân em 🐱)",
    "Rừ rừ... rừ rừ... (Bông nằm ngửa phơi bụng đòi gãi cằm)",
    "Meo! (Bông nhảy tót lên đùi ngồi nhìn em chằm chằm)",
    "Gừ... *ngáp một cái thật to rồi lại cuộn tròn ngủ tiếp*",
    "Meo meo~ (Bông đưa chân trước khều khều vạt áo em đòi chơi)",
    "Meo! (Bông nhìn về phía khay thức ăn rồi liếc sang em ra hiệu 🐟)"
  ],

  foods: [
    {
      id: "banh_mi_cay",
      name: "Bánh mì cay HP",
      emoji: "🥖",
      cost: 2,
      xp: 5,
      reaction: "Cay giòn đúng điệu Hải Phòng luôn. Ăn ngon quá em 🥖"
    },
    {
      id: "tra_cuc",
      name: "Trà cúc mật ong",
      emoji: "🍵",
      cost: 2,
      xp: 5,
      reaction: "Ấm bụng ghê. Hôm nào rảnh anh xuống hai đứa đi ngồi quán thật nha!"
    },
    {
      id: "cing_house",
      name: "Matcha ô long dừa dầm",
      emoji: "🧋",
      cost: 3,
      xp: 7,
      reaction: "Chuẩn vị Cing House Thủy Nguyên rồi! Món tủ của em có khác 💚"
    },
    {
      id: "banh_da_cua",
      name: "Bánh đa cua Lạch Tray",
      emoji: "🍜",
      cost: 3,
      xp: 7,
      reaction: "Bát bánh đa cua đầy đặn ghê, ăn no lấy sức làm việc nha em 🍜"
    },
    {
      id: "cuon_thuy_nguyen",
      name: "Cuốn Thủy Nguyên",
      emoji: "🥬",
      cost: 3,
      xp: 7,
      reaction: "Cuốn Thủy Nguyên ngon thật đấy, hôm nào em nhớ dẫn anh đi ăn nhé!"
    },
    {
      id: "canh_cu",
      name: "Canh củ Hải Phòng",
      emoji: "🥣",
      cost: 2,
      xp: 5,
      reaction: "Bát canh củ thanh mát chuẩn cơm nhà luôn, cảm ơn em 🥰"
    },
    {
      id: "oc_hai_phong",
      name: "Ốc xào me / luộc",
      emoji: "🐚",
      cost: 3,
      xp: 7,
      reaction: "Nhìn thèm ghê, hôm nào anh xuống Hải Phòng dẫn em đi ăn ốc nhé 🐚"
    },
    {
      id: "banh_mi_kep",
      name: "Bánh mì kẹp đầy đặn",
      emoji: "🥪",
      cost: 2,
      xp: 5,
      reaction: "Ăn sáng đầy đủ vào nha em, đừng bỏ bữa đấy."
    },
    {
      id: "dua_dam",
      name: "Dừa dầm béo ngậy",
      emoji: "🥥",
      cost: 3,
      xp: 7,
      reaction: "Dừa dầm mát lạnh ngọt lịm luôn!"
    },
    {
      id: "keo_bim_bim",
      name: "Bim bim & Kẹo ngọt",
      emoji: "🍬",
      cost: 2,
      xp: 5,
      reaction: "Kẹo ngọt cho Sún nè, ăn ít thôi không sâu răng nha 🍬"
    }
  ],

  // Shared plant in the room corner: grows with the number of different days Ngọc opens the app (missing days never
  // shrink it). Blooms fully on the 11/02 anniversary. `days` = visits needed for the stage.
  plantStages: [
    { days: 0, name: "hạt mầm" },
    { days: 3, name: "mầm non" },
    { days: 7, name: "cây con" },
    { days: 14, name: "cây xanh" },
    { days: 30, name: "nụ hoa" },
    { days: 60, name: "cây nở hoa" }
  ],

  // Wardrobe (shop tab "Tủ quần áo"): who = ngoc | khanh | bong. Looks live in sprites.js OUTFITS (same ids).
  outfits: [
    { id: "n_sweater", who: "ngoc", name: "Áo len hồng", emoji: "🧶", price: 300, desc: "Áo len hồng tay dài, mùa đông Hải Phòng mặc cho ấm." },
    { id: "n_hoodie", who: "ngoc", name: "Hoodie tím", emoji: "💜", price: 350, desc: "Hoodie tím rộng có túi trước bụng, mặc ở nhà lười lười." },
    { id: "n_sundress", who: "ngoc", name: "Váy hè vàng", emoji: "🌻", price: 450, desc: "Váy vàng tươi cho mùa hè, đi biển Đồ Sơn là hợp nhất." },
    { id: "n_aodai", who: "ngoc", name: "Áo dài đỏ", emoji: "🧧", price: 800, desc: "Áo dài đỏ viền vàng với quần trắng, mặc đi chơi Tết." },
    { id: "k_sweater", who: "khanh", name: "Áo len xanh navy", emoji: "🧥", price: 300, desc: "Áo len xanh navy tay dài cho anh, trời lạnh Hà Nội." },
    { id: "k_hoodie", who: "khanh", name: "Hoodie xám", emoji: "🩶", price: 350, desc: "Hoodie xám tay dài, mặc đôi với hoodie tím của em được đó." },
    { id: "k_shirt", who: "khanh", name: "Sơ mi trắng", emoji: "👔", price: 350, desc: "Sơ mi trắng với quần xanh đậm, mặc đi hẹn hò." },
    { id: "k_aodai", who: "khanh", name: "Áo dài xanh", emoji: "🎋", price: 800, desc: "Áo dài nam xanh viền vàng, đứng cạnh áo dài đỏ của em." },
    { id: "b_bow", who: "bong", name: "Nơ hồng cho Bông", emoji: "🎀", price: 200, desc: "Chiếc nơ hồng nhỏ cài bên tai Bông." },
    { id: "b_scarf", who: "bong", name: "Khăn len đỏ", emoji: "🧣", price: 250, desc: "Khăn len đỏ sọc trắng quàng cổ cho Bông đỡ lạnh." },
    { id: "b_frog", who: "bong", name: "Mũ ếch xanh", emoji: "🐸", price: 500, desc: "Mũ ếch xanh có hai mắt lồi, Bông đội vào là thành ếch." }
  ],

  decorItems: [
    {
      id: "teddy",
      name: "Gấu bông Teddy",
      emoji: "🧸",
      price: 20,
      desc: "Chú gấu Teddy mềm mại đặt trên giường cho căn phòng đỡ trống trải."
    },
    {
      id: "rug",
      name: "Thảm tròn pastel",
      emoji: "🩷",
      price: 40,
      desc: "Tấm thảm êm ái giữa phòng cho anh Khánh ngồi chơi vuốt ve bé Bông."
    },
    {
      id: "bong_bed",
      name: "Ổ nệm êm cho bé Bông",
      emoji: "🛏️",
      price: 80,
      desc: "Chiếc nệm hồng ấm áp để mèo Bông cuộn tròn ngủ nướng cả ngày."
    },
    {
      id: "plant",
      name: "Chậu hoa bên cửa sổ",
      emoji: "🪴",
      price: 120,
      desc: "Thêm chút xanh mát ngay bậu cửa sổ ngắm những nhành hoa phượng nở đỏ."
    },
    {
      id: "cat_tree",
      name: "Tháp leo cào móng cho Bông",
      emoji: "🐾",
      price: 180,
      desc: "Tháp cây 3 tầng cho bé Bông tha hồ cào móng và trèo lên ngắm chim chóc."
    },
    {
      id: "photo",
      name: "Khung ảnh 11/02/2026",
      emoji: "🖼️",
      price: 240,
      desc: "Treo lên tường kỷ niệm ngày đầu tụi mình quen nhau trên Facebook Dating."
    },
    {
      id: "tea_table",
      name: "Bàn trà cúc ấm áp",
      emoji: "🫖",
      price: 320,
      desc: "Góc nhỏ pha trà cúc, nhâm nhi bánh mì cay ngồi tâm sự chuyện đời."
    },
    {
      id: "lamp",
      name: "Đèn ngủ ánh trăng",
      emoji: "🌙",
      price: 400,
      desc: "Tỏa ánh sáng vàng dịu vào buổi tối cho căn phòng thêm ấm cúng."
    },
    {
      id: "mck_vinyl",
      name: "Máy đĩa than Album 99% - MCK",
      emoji: "🎵",
      price: 480,
      desc: "Chiếc máy đĩa than phát giai điệu 'Chìm Sâu' và trọn vẹn Album 99% của MCK cực chill."
    },
    {
      id: "fairy_lights",
      name: "Dây đèn lấp lánh",
      emoji: "✨",
      price: 560,
      desc: "Giăng ngang tường lung linh như bầu trời sao lấp lánh giữa đêm."
    },
    {
      id: "succulent",
      name: "Chậu sen đá đôi tình yêu",
      emoji: "🌱",
      price: 640,
      desc: "Hai cây sen đá nhỏ xinh mọng nước, tượng trưng cho tình cảm bền bỉ lâu dài."
    },
    {
      id: "bookshelf",
      name: "Giá sách gỗ xinh xắn",
      emoji: "📚",
      price: 750,
      desc: "Tủ sách gỗ chứa những cuốn tiểu thuyết và truyện tranh hai đứa mình yêu thích."
    },
    {
      id: "mirror",
      name: "Gương đứng vòm pastel",
      emoji: "🪞",
      price: 880,
      desc: "Gương toàn thân viền uốn lượn để bé Sún tha hồ soi outfit xinh mỗi ngày."
    },
    {
      id: "couple_mugs",
      name: "Cặp cốc Hà Nội - Hải Phòng",
      emoji: "☕",
      price: 1000,
      desc: "Cặp cốc đôi in hình Tháp Rùa và Cầu Hoàng Văn Thụ gắn kết hai trái tim."
    }
  ],

  moodJars: {
    miss: {
      tag: "💕 Khi em nhớ anh",
      notes: [
        "Anh ở Hà Nội vẫn nhớ em đây. Nhớ anh thì cứ nhắn tin cho anh nha.",
        "Đang ngồi làm mà tự dưng nghĩ tới em, không biết giờ này bên Hải Phòng thế nào rồi.",
        "Lúc nào rảnh cứ mở góc này lên, anh vẫn ở đây với em mà.",
        "Quen có em nhắn tin hỏi han mỗi ngày rồi, lúc bận không thấy tin nhắn là thấy thiếu thiếu.",
        "Biết tính em hay ngại rồi, nhớ anh thì cứ nói, anh nghe thấy vui mà.",
        "Ráng đợi mấy hôm nữa anh sắp xếp công việc rồi chạy xuống Hải Phòng gặp em nhé.",
        "Khi nào rảnh cứ nhắn tin cho anh, bận mấy anh cũng tranh thủ trả lời em liền."
      ]
    },
    tired: {
      tag: "☁️ Khi em thấy mệt",
      notes: [
        "Ở ngoài phải để ý nhiều rồi, về nói chuyện với anh thì không cần gồng nữa đâu, mệt cứ nói mệt nha.",
        "Hôm nay nhiều việc lắm hả em? Uống ngụm nước rồi nghỉ xíu đi, đừng cố quá sức.",
        "Em lúc nào cũng nhắc anh giữ sức khỏe, giờ em cũng phải tự chăm mình đàng hoàng đấy!",
        "Mệt thì cứ nhắn cho anh, đừng im im chịu một mình, có anh ngồi nghe em kể đây.",
        "Tưởng tượng bé Bông đang nằm lên đùi kêu rừ rừ cho em đỡ căng thẳng nhé.",
        "Hôm nay em làm tốt lắm rồi, gác lại nghỉ ngơi chút đi em."
      ]
    },
    sad: {
      tag: "🌧️ Khi em thấy buồn",
      notes: [
        "Có chuyện gì buồn cứ nói với anh nhé, đừng giữ một mình trong lòng.",
        "Anh biết em hay để ý người khác rồi tự nghĩ nhiều. Nhưng với anh, chuyện của em mới là quan trọng nhất.",
        "Anh ít khi nói mấy lời hoa mỹ, nhưng có sao nói vậy và lúc nào cũng đứng về phía em.",
        "Nếu chưa muốn kể ngay cũng không sao, lúc nào em thấy nhẹ nhõm hơn thì nói với anh cũng được.",
        "Em hiền lành tốt tính vậy rồi nên đừng tự làm mình buồn vì mấy chuyện không đáng nhé.",
        "Thôi đừng buồn nữa, vào đây vuốt mèo Bông một tí cho khuây khỏa nha."
      ]
    },
    playful: {
      tag: "😜 Góc Nhí Nhố của 2 đứa",
      notes: [
        "Hỏi thật nha: Ăn cơm chưa? Không được trả lời nhây đấy! 😆",
        "Đi đường chạy chậm thôi đấy nhé, 'tôi bay mà' ít thôi kẻo anh lo!",
        "Hôm nay có giận dỗi vu vơ gì nữa không đó? Yên tâm, anh chỉ có mỗi em thôi.",
        "Bé Bông vừa kiểm tra thấy hôm nay em chưa ăn kẹo. Mau nạp đường ngay!",
        "Thèm trà cúc, bánh mì cay hay ốc thì cứ ghi sổ ra, hôm nào gặp anh dắt đi ăn bù nha.",
        "Đang cười tủm tỉm đọc mấy dòng này đúng không? Bắt quả tang nhé!"
      ]
    }
  },

  secretLetters: [
    {
      id: "letter_1",
      title: "Thư 1: Ngày 11/02 & ấn tượng đầu tiên",
      unlockLevel: 1,
      unlockDesc: "Mở sẵn từ ngày đầu như lời chào mừng",
      body: `Hồi mới quen nhau hôm 11/02 trên Facebook Dating, ấn tượng đầu tiên của anh là em hiền, ít nói và có vẻ hay ngại. Nhưng càng nói chuyện, anh càng nhận ra đằng sau sự rụt rè đó là một cô gái rất chân thành, thật thà và biết để ý đến cảm xúc của người khác.

Anh nhớ những hôm em chủ động nhắn tin hỏi han chuyện công việc, rồi lúc nào cũng dặn anh phải ăn uống đúng giờ, giữ sức khỏe. Những sự quan tâm bình dị, nhỏ xíu ấy lại là điều làm anh nhớ mãi.

Cảm ơn em vì từ ngày ấy đến giờ vẫn kiên nhẫn ở lại trò chuyện cùng một đứa đôi lúc hơi khô khan và ít nói lời hoa mỹ như anh.`,
      sign: "— Khánh (Hà Nội) —"
    },
    {
      id: "letter_2",
      title: "Thư 2: 'Trẻ hiểu chuyện' & hũ kẹo riêng cho em",
      unlockLevel: 4,
      reqHugs: 5,
      unlockDesc: "Đạt Cấp 4 thân mật & ôm anh ít nhất 5 lần",
      body: `Có lần em đùa bảo với anh rằng em là "trẻ không có kẹo", vì người ta hay nói đứa trẻ nào hiểu chuyện thì thường chịu nhiều thiệt thòi nhất. Nghe em nói câu đấy, anh vừa thấy buồn cười nhưng vừa thấy thương nhiều hơn.

Anh biết tính em sống tình cảm, lúc nào cũng sợ làm phiền người xung quanh, có chuyện gì buồn hay mệt mỏi cũng hay nén lại một mình rồi tự gánh lấy. Nhưng em nhớ này: ở cạnh anh, em không cần phải cố gồng mình làm một người lớn hiểu chuyện đâu.

Thích gì cứ nói, mệt cứ than, muốn nhõng nhẽo hay bắt nạt anh một chút cũng chẳng sao cả. Kẹo ở ngoài đời có thể khó kiếm, nhưng trong góc nhỏ này và trong lòng anh, kẹo lúc nào cũng để sẵn dành riêng cho em.`,
      sign: "— Khánh —"
    },
    {
      id: "letter_3",
      title: "Thư 3: 100 cây số Hà Nội ↔ Hải Phòng",
      unlockLevel: 8,
      reqDecor: 3,
      unlockDesc: "Đạt Cấp 8 thân mật & sắm ít nhất 3 món đồ phòng",
      body: `Anh ở Hà Nội, em ở Hải Phòng. Hơn 100 cây số không hẳn là quá xa, nhưng những ngày cả hai đứa đều bận rộn với công việc thì cũng chỉ biết nhìn màn hình điện thoại nhắn vài ba tin hỏi thăm nhau.

Nhiều lúc tan làm về, đi giữa đường phố Hà Nội đông đúc, anh lại tự hỏi không biết bên Hải Phòng lúc này em đã tan ca chưa, đi đường có an toàn không, hay lại đang lượn lờ đâu đó.

Mỗi lần sắp xếp được công việc để chạy xe xuống Hải Phòng gặp em, được nghe em dẫn đi ăn bánh đa cua Lạch Tray, cuốn Thủy Nguyên, hay ngồi uống cốc trà cúc ấm nóng, anh đều thấy mọi mệt mỏi của chuyến đi tan biến hết. Khoảng cách địa lý có thể là thử thách, nhưng chỉ cần hai đứa cùng hướng về nhau thì chẳng có con đường nào là xa cả.`,
      sign: "— Khánh —"
    },
    {
      id: "letter_4",
      title: "Thư 4: Những câu trêu & tính hay nghĩ ngợi",
      unlockLevel: 12,
      reqJars: 8,
      unlockDesc: "Đạt Cấp 12 thân mật & mở Lọ lời nhắn ít nhất 8 lần",
      body: `Anh thích nhất là những lúc em thoải mái trêu đùa anh. Hỏi ăn cơm chưa thì trả lời nhây, đi đường thì cứ bảo "tôi bay mà" làm anh ngồi từ xa mà cứ phải dặn đi chậm lại mãi.

Nhưng anh cũng biết, em là đứa ngoài mặt thì cười đùa thế thôi chứ trong đầu hay suy nghĩ linh tinh lắm. Đôi khi một chuyện nhỏ xíu cũng làm em để tâm rồi tự buồn một mình.

Anh không phải kiểu người khéo ăn khéo nói, tính anh thẳng thắn và ghét sự giả dối. Nhưng một khi anh đã chọn ở bên cạnh em, thì mọi buồn vui, lo lắng của em anh đều muốn san sẻ. Có chuyện gì cứ trút hết vào anh, lúc nào anh cũng đứng về phía em mà.`,
      sign: "— Khánh —"
    },
    {
      id: "letter_5",
      title: "Thư 5: Góc nhỏ bình yên & cảm ơn em",
      unlockLevel: 18,
      reqDecor: 8,
      unlockDesc: "Đạt Cấp 18 thân mật & sắm trọn bộ 8 món trang trí phòng",
      body: `Nếu em đang mở được lá thư này, chắc hẳn em đã gắn bó với góc nhỏ này rất nhiều ngày rồi, và căn phòng của chúng mình cũng đã có đủ ấm áp với bé Bông, chiếc giường nệm, bàn trà cúc và những món đồ nhỏ xinh.

Anh tự tay làm cái app nhỏ này, ngồi vẽ từng nét áo polo đen, góc phòng quen thuộc, cành hoa phượng đỏ ngoài cửa sổ Hải Phòng, chỉ với một mong muốn giản dị: mỗi khi em đi làm về mệt mỏi, hay những lúc không có anh ở bên, em mở góc này lên sẽ cảm thấy lòng mình được an yên một chút.

Cảm ơn em vì đã đến bên anh, cho anh một người để nhớ mỗi ngày, một lý do để cố gắng hơn trong cuộc sống. Dù sau này có thế nào, anh vẫn luôn ở đây làm điểm tựa vững chãi cho em. Chúc Sún của anh luôn bình an và mỉm cười thật nhiều nhé.`,
      sign: "— Khánh (Hà Nội) —"
    }
  ],

  achievements: [
    {
      id: "first_hug",
      name: "Cái ôm đầu tiên",
      desc: "Ôm anh Khánh 1 lần trong phòng",
      reward: 15,
      emoji: "🤗"
    },
    {
      id: "pet_bong_5",
      name: "Con sen chính hiệu",
      desc: "Vuốt ve bé mèo Bông 5 lần",
      reward: 20,
      emoji: "🐱"
    },
    {
      id: "foodie_5",
      name: "Thổ địa Hải Phòng",
      desc: "Cho ăn ít nhất 5 món khác nhau",
      reward: 35,
      emoji: "🍜"
    },
    {
      id: "mg_score_200",
      name: "Cao thủ Hứng Kẹo",
      desc: "Đạt từ 200 điểm trở lên trong mini-game",
      reward: 35,
      emoji: "🎮"
    },
    {
      id: "jar_reader",
      name: "Đọc hết tâm tư",
      desc: "Mở Lọ lời nhắn ít nhất 8 lần",
      reward: 30,
      emoji: "🫙"
    },
    {
      id: "decor_4",
      name: "Tổ ấm nhỏ xinh",
      desc: "Sắm được 4 món đồ trang trí phòng",
      reward: 80,
      emoji: "🛋️"
    },
    {
      id: "decor_all",
      name: "Căn phòng hoàn hảo",
      desc: "Sưu tầm đủ cả 8 món đồ trang trí",
      reward: 200,
      emoji: "🏡"
    },
    {
      id: "level_5",
      name: "Không còn Sọ Dừa!",
      desc: "Đạt Cấp 5 độ thân mật",
      reward: 60,
      emoji: "💕"
    },
    {
      id: "crossing_100",
      name: "Bông qua đường siêu đỉnh",
      desc: "Đạt từ 100 điểm trong Qua Đường Đi Bông",
      reward: 35,
      emoji: "🚗"
    },
    {
      id: "flappy_50",
      name: "Yên tâm, tôi bay mà!",
      desc: "Đạt từ 50 điểm trong Bông Bay Tìm Kẹo",
      reward: 35,
      emoji: "🪽"
    },
    {
      id: "nonla_75",
      name: "Không ngọng chút nào!",
      desc: "Đạt từ 75 điểm trong Nón Lá L-N",
      reward: 35,
      emoji: "👒"
    },
    // Added 2026-11-24 for the newer features (agent-written names: the owner should proofread)
    { id: "meet_set", name: "Đếm từng ngày", desc: "Đặt ngày gặp nhau tiếp theo trên tờ lịch", reward: 15, emoji: "📅" },
    { id: "visit_7", name: "Ghé thăm đều đặn", desc: "Mở góc nhỏ trong 7 ngày khác nhau", reward: 25, emoji: "🌱" },
    { id: "mood_7", name: "Nhật ký cảm xúc", desc: "Mở lọ lời nhắn theo tâm trạng trong 7 ngày", reward: 30, emoji: "🫙" },
    { id: "daily_q_7", name: "Tâm sự 7 ngày", desc: "Trả lời câu hỏi hôm nay trong 7 ngày", reward: 50, emoji: "💭" },
    { id: "photo_3", name: "Tường đầy kỷ niệm", desc: "Treo đủ 3 tấm ảnh lên dây ảnh trong phòng", reward: 40, emoji: "📷" },
    { id: "wardrobe_first", name: "Lên đồ lần đầu", desc: "Sắm một bộ đồ trong Tủ quần áo", reward: 20, emoji: "👗" },
    { id: "wardrobe_trio", name: "Cả nhà lên đồ", desc: "Ngọc, anh Khánh và bé Bông cùng mặc đồ mới", reward: 60, emoji: "👨‍👩‍👧" },
    { id: "plant_bloom", name: "Cây nở hoa", desc: "Ghé thăm 60 ngày để cây của hai đứa nở hoa", reward: 100, emoji: "🌸" },
    { id: "wardrobe_all", name: "Tủ đồ đầy ắp", desc: "Sắm đủ tất cả quần áo và phụ kiện", reward: 150, emoji: "🧺" },
    // Study (added 2026-11-24, agent-written names: the owner should proofread)
    { id: "study_days_7", name: "Chăm học 7 ngày", desc: "Hoàn thành bài học ngoại ngữ trong 7 ngày khác nhau", reward: 40, emoji: "📚" },
    { id: "study_days_30", name: "Một tháng chăm chỉ", desc: "Hoàn thành bài học ngoại ngữ trong 30 ngày khác nhau", reward: 120, emoji: "🎓" },
    { id: "words_50", name: "Thuộc 50 từ", desc: "Thuộc 50 từ tiếng Trung hoặc tiếng Anh (mỗi từ trả lời đúng 3 lần)", reward: 60, emoji: "🧠" },
    { id: "words_200", name: "Kho từ vựng 200", desc: "Thuộc 200 từ tiếng Trung hoặc tiếng Anh", reward: 150, emoji: "🏛️" },
    { id: "perfect_cloze", name: "Điền đâu trúng đó", desc: "Đúng 5/5 câu trắc nghiệm Điền từ", reward: 30, emoji: "✏️" },
    { id: "perfect_listen", name: "Tai thính", desc: "Đúng 5/5 câu trắc nghiệm Nghe", reward: 30, emoji: "🎧" },
    { id: "perfect_tone", name: "Bắt trúng thanh điệu", desc: "Đúng 5/5 câu trắc nghiệm Thanh điệu tiếng Trung", reward: 30, emoji: "🎵" },
    { id: "review_clear", name: "Ôn sạch bách", desc: "Ôn hết mọi từ cần ôn trong tab Ôn hôm nay", reward: 40, emoji: "🔁" }
  ],

  // "Câu hỏi hôm nay" in the jar modal: one per day, same for the whole day. Agent-written: the owner should proofread.
  dailyQuestions: [
    "Hôm nay điều gì làm em cười nhiều nhất?",
    "Món ăn em đang thèm nhất lúc này là gì?",
    "Nếu được gặp anh ngay bây giờ, em muốn làm gì đầu tiên?",
    "Một bài hát em muốn hai đứa cùng nghe là bài gì?",
    "Hôm nay em có mệt không? Mệt vì chuyện gì thì kể anh nghe.",
    "Kỷ niệm nào của hai đứa em nhớ nhất?",
    "Lần gặp tới em muốn hai đứa đi đâu?",
    "Việc nhỏ nào anh làm khiến em vui nhất?",
    "Nếu Bông biết nói, em nghĩ Bông sẽ nói gì với anh?",
    "Có điều gì em muốn anh làm nhiều hơn không?",
    "Hôm nay em đã ăn gì ngon chưa?",
    "Lúc buồn em thích được dỗ kiểu nào nhất?",
    "Một chỗ ở Hải Phòng em muốn dẫn anh đi là đâu?",
    "Một chỗ ở Hà Nội em muốn anh dẫn đi là đâu?",
    "Dạo này có chuyện gì làm em thấy tự hào về bản thân không?",
    "Nếu được đi du lịch cùng anh, em chọn đi đâu?",
    "Món quà nhỏ nào em đang muốn có?",
    "Em thấy hai đứa giống nhau ở điểm nào nhất?",
    "Hai đứa khác nhau ở điểm nào mà em thấy dễ thương?",
    "Hôm nay có chuyện gì em muốn kể anh mà chưa kịp kể không?",
    "Tuần này em đang mong chờ điều gì nhất?",
    "Ba từ em dùng để tả anh là gì?",
    "Lúc nào trong ngày em nhớ anh nhất?",
    "Em muốn hai đứa cùng học thêm điều gì?",
    "Bộ phim nào em muốn xem cùng anh?",
    "Nếu hôm nay được nghỉ cả ngày, em sẽ làm gì?",
    "Có điều gì đang làm em lo không? Kể anh nghe với.",
    "Em muốn được anh khen điều gì nhất?",
    "Em thích mùa nào trong năm nhất, vì sao?",
    "Một thói quen nhỏ của anh mà em thấy buồn cười là gì?",
    "Nếu được đặt tên cho căn phòng nhỏ này, em đặt tên gì?",
    "Em muốn trang trí thêm gì cho phòng của hai đứa?",
    "Ước mơ nhỏ nào em muốn làm được trong năm nay?",
    "Điều gì làm em thấy bình yên nhất?",
    "Hôm nay em uống đủ nước chưa? Thành thật nha 😆",
    "Sau này em muốn hai đứa có một buổi hẹn như thế nào?",
    "Câu nào anh từng nói mà em nhớ mãi?",
    "Nếu được gửi cho anh một món ăn Hải Phòng ngay bây giờ, em gửi món gì?",
    "Em muốn nhắn gì cho hai đứa của một năm sau?",
    "Hôm nay em cho ngày của mình mấy điểm trên 10?"
  ],
  dailyQuestionReplies: [
    "Em viết xong rồi hả? Gửi anh đọc với, anh tò mò lắm đó 👀",
    "Câu trả lời này anh muốn đọc ghê, bấm gửi cho anh nha 💌",
    "Cảm ơn em đã kể anh nghe nha, mai lại có câu hỏi mới đó ✨"
  ],

  // Khánh's lines for the wall calendar (tap it). {days} = days left. Agent-written copy: the owner should proofread it.
  meetLines: {
    far: [
      "Còn {days} ngày nữa là gặp em rồi, anh đếm từng ngày luôn đó 📅",
      "{days} ngày nữa thôi, em nhớ ăn uống đầy đủ để gặp anh thật xinh nha 💕",
      "Lịch trên tường còn {days} ngày, sáng nào anh cũng gạch thêm một ô ✏️"
    ],
    soon: [
      "Chỉ còn {days} ngày nữa thôi! Em muốn đi ăn gì để anh tìm trước nè? 🍜",
      "Tuần này gặp nhau rồi, Bông còn hồi hộp hơn cả anh 🐱",
      "{days} ngày nữa thôi, anh bắt đầu thấy nôn nao rồi đó 💓"
    ],
    tomorrow: [
      "Mai gặp nhau rồi! Tối nay ngủ sớm nha em 😴💕",
      "Chỉ còn một đêm nữa thôi, anh hồi hộp không ngủ được luôn 🙈"
    ],
    today: [
      "Hôm nay gặp nhau rồi! Đi đường cẩn thận, tới nơi nhắn anh liền nha 💕",
      "Hà Nội ↔ Hải Phòng hôm nay chỉ còn 0 km thôi ✨"
    ],
    banner: "💕 Hôm nay hai đứa gặp nhau rồi! Hà Nội ↔ Hải Phòng chỉ còn 0 km ✨",
    greeting: "Hôm nay gặp nhau rồi nè! Đi đường nhớ cẩn thận, tới nơi nhắn anh liền nha 💕"
  },

  specialDays: {
    tet: {
      speaker: "Anh Khánh 🧧",
      giftLabel: "🧧 Lì xì Tết",
      xp: 35,
      isLunar: true,
      music: "tet",
      giftCandy: 88,
      banner: "🧧 Năm mới rồi! Chúc Sún năm mới bình an, luôn xinh xắn và bớt ngọng nha 🌸",
      speech: "Năm mới chúc Ngọc luôn vui vẻ, nhiều sức khỏe, mọi điều thuận lợi và bớt bắt nạt anh lại nhé! 😂 Lì xì cho em +88 🍬 đầu năm lấy may nè! 🧧",
      quotes: [
        "Tết bên Hải Phòng lạnh không em? Ra đường nhớ mặc áo ấm vào nha 🌸",
        "Năm mới bớt bắt nạt anh lại nhé!",
        "Bé Bông cũng chúc chị Ngọc năm mới ăn ngoan chóng lớn, ngoan ngoãn nha 🐱",
        "Đợi mấy hôm nữa anh phi từ Hà Nội xuống Hải Phòng lì xì trực tiếp cho em nha! 🧧",
        "Năm mới chúc hai đứa mình luôn gắn bó, cùng nhau cố gắng nha em 💕",
        "Năm mới chúc em luyện nói chuẩn L với N nha, hết Tết là không được nói ngọng nữa đâu 👒"
      ]
    },
    ngoc: {
      speaker: "Anh Khánh 🎂",
      giftLabel: "🎂 Quà sinh nhật",
      xp: 25,
      month: 4,
      day: 15,
      music: "birthday",
      giftCandy: 50,
      banner: "🎂 Chúc mừng sinh nhật Ngọc (15/04)! Hôm nay em là nhất! 🎉",
      speech: "Chúc mừng sinh nhật em nhé (15/04)! Thêm tuổi mới chúc Ngọc luôn vui vẻ, mạnh khỏe, bớt suy nghĩ linh tinh. Hôm nay không cần làm 'trẻ hiểu chuyện' nữa, thích gì cứ bảo anh nha! Tặng em +50 🍬 trong hũ trước nè 🎂"
    },
    khanh: {
      speaker: "Anh Khánh 🎂",
      giftLabel: "🎂 Quà sinh nhật",
      xp: 25,
      month: 6,
      day: 1,
      music: "birthday",
      giftCandy: 30,
      banner: "🎂 Hôm nay 01/06 — Sinh nhật anh Khánh!",
      speech: "Hôm nay sinh nhật anh nè! Sinh đúng ngày Quốc tế Thiếu nhi luôn. Tặng em +30 🍬 mừng sinh nhật anh cùng bé Bông nha! 🎂"
    },
    anniversary: {
      speaker: "Anh Khánh 💕",
      giftLabel: "💕 Quà kỷ niệm",
      xp: 30,
      month: 2,
      day: 11,
      music: "anniversary",
      giftCandy: 50,
      banner: "💕 Kỷ niệm ngày 11/02 — Ngày đầu hai đứa mình quen nhau! ✨",
      speech: "Hôm nay lại tới 11/02 rồi nè! Tính từ ngày đầu nói chuyện trên Facebook Dating tới giờ cũng được {days} ngày rồi đó. Tặng em +50 🍬 với cả cái ôm thật chặt nha! 💕"
    },
    noel: {
      speaker: "Anh Khánh 🎄",
      giftLabel: "🎁 Quà Giáng Sinh",
      xp: 30,
      month: 12,
      startDay: 20,
      endDay: 26,
      music: "noel",
      giftCandy: 60,
      banner: "🎄 Giáng Sinh an lành! Chúc Ngọc có một mùa Noel ấm áp và ngập tràn niềm vui ❄️",
      speech: "Giáng Sinh an lành nha em yêu! Trời mùa đông lạnh lắm, ra đường nhớ quàng khăn ấm vào nhé. Anh tặng Ngọc hộp quà Giáng Sinh +60 🍬 ngọt ngào nè! 🎁🎄",
      quotes: [
        "Noel này bên Hải Phòng lạnh không em? Ra đường nhớ mặc áo phao dày với quàng khăn ấm nhé 🧣",
        "Ước gì Noel này được ở cạnh nắm tay em đi dạo Nhà thờ lớn Hải Phòng nhỉ 🎄",
        "Bé Bông cũng được đội mũ ông già Noel đỏ chót nè, trông yêu chưa! 🎅🐱",
        "Giáng Sinh ấm áp nha cô gái nhỏ của anh 💕",
        "Noel năm nay dù hai đứa ở hai thành phố nhưng trái tim anh lúc nào cũng hướng về em ✨",
        "Cây thông Noel trong phòng sáng đèn lung linh ghê, chúc Ngọc lúc nào cũng rạng rỡ nha 🌟"
      ]
    },
    // Vietnamese holidays (added 2026-11-24). Agent-written copy: the owner should proofread it.
    valentine: {
      month: 2,
      day: 14,
      music: "anniversary",
      speaker: "Anh Khánh 🍫",
      giftLabel: "🍫 Socola Valentine",
      xp: 30,
      giftCandy: 40,
      banner: "💝 Valentine 14/02 — Chúc cô gái nhỏ của anh một ngày ngọt hơn cả socola! 🍫",
      speech: "Valentine vui vẻ nha em! Hôm nay anh chưa ở cạnh được thì gửi tạm hộp socola +40 🍬 vào hũ trước, gặp nhau anh bù cho em cái ôm thật lâu nha 💝",
      quotes: [
        "Valentine này anh chỉ muốn được nắm tay em đi dạo thôi à 💝",
        "Hộp socola trong phòng là của em hết, không chia cho Bông đâu nha 🍫",
        "Hà Nội với Hải Phòng có xa mấy thì hôm nay anh vẫn nghĩ về em đầu tiên 💕",
        "Bé Bông cũng chúc chị Ngọc Valentine vui vẻ nè, meo 🐱💝",
        "Cảm ơn em đã chọn anh nha, cô gái của anh 🌹"
      ]
    },
    women83: {
      month: 3,
      day: 8,
      music: "anniversary",
      speaker: "Anh Khánh 💐",
      giftLabel: "💐 Quà 8/3",
      xp: 25,
      giftCandy: 30,
      banner: "💐 Mùng 8/3 — Chúc Ngọc luôn xinh đẹp, vui vẻ và được yêu thương thật nhiều! 🌷",
      speech: "8/3 vui vẻ nha em! Anh đặt sẵn bó hoa trong phòng với +30 🍬 cho em rồi đó. Hôm nay em không cần làm gì hết, chỉ cần vui thôi nha 💐",
      quotes: [
        "Bó hoa trong phòng là anh chọn cho em đó, thích không? 💐",
        "Chúc cô gái của anh luôn cười tươi như hôm nay nha 🌷",
        "Hôm nay em được quyền bắt nạt anh gấp đôi đó 😆",
        "Bé Bông cũng tặng chị Ngọc một bông hoa nè 🐱🌸"
      ]
    },
    women2010: {
      month: 10,
      day: 20,
      music: "anniversary",
      speaker: "Anh Khánh 🌷",
      giftLabel: "🌷 Quà 20/10",
      xp: 25,
      giftCandy: 30,
      banner: "🌷 20/10 — Chúc mừng ngày Phụ nữ Việt Nam! Chúc em luôn rạng rỡ và hạnh phúc 💕",
      speech: "20/10 vui vẻ nha cô gái Hải Phòng của anh! Tặng em bó hoa với +30 🍬 nè. Cảm ơn em lúc nào cũng dễ thương với anh nha 🌷",
      quotes: [
        "Ngày của em mà, hôm nay em là nhất 🌷",
        "Anh mong em lúc nào cũng được yêu thương, không chỉ riêng hôm nay đâu 💕",
        "Hoa trong phòng nở đẹp như em vậy đó 💐",
        "Bé Bông dặn anh hôm nay phải chiều chị Ngọc hết mức 🐱"
      ]
    },
    trungthu: {
      isLunar: true,
      music: "normal",
      speaker: "Anh Khánh 🏮",
      giftLabel: "🥮 Bánh Trung thu",
      xp: 25,
      giftCandy: 30,
      banner: "🏮 Trung thu rằm tháng Tám — Chúc Ngọc một đêm trăng tròn thật vui và ấm áp! 🥮",
      speech: "Trung thu vui vẻ nha em! Anh treo đèn ông sao trong phòng với để sẵn đĩa bánh +30 🍬 rồi đó. Tối nay ngắm trăng nhớ nghĩ tới anh nha 🌕",
      quotes: [
        "Trăng rằm tháng Tám tròn ghê, ước gì được ngắm cùng em 🌕",
        "Em thích bánh nướng hay bánh dẻo hơn? Lần sau anh mang xuống cho 🥮",
        "Đèn ông sao anh treo trong phòng đó, đẹp không em? 🏮",
        "Bé Bông đòi rước đèn mà sợ lửa nên chỉ đứng nhìn thôi 🐱",
        "Hà Nội với Hải Phòng chung một ông trăng, nên anh thấy gần em hơn chút rồi ✨"
      ]
    }
  }
};
