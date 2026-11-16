// English B1-C1 Learning App for Sun & Ngoc
window.EnglishApp = (() => {
  const ENGLISH_DATA = {
    b1: [
      {
            "word": "cherish",
            "ipa": "/ˈtʃer.ɪʃ/",
            "type": "Động từ",
            "meaning": "Yêu thương, trân trọng, nâng niu",
            "example": "I will always cherish every sweet moment we share together.",
            "exampleMeaning": "Anh sẽ luôn nâng niu và trân trọng từng khoảnh khắc ngọt ngào chúng mình bên nhau."
      },
      {
            "word": "affection",
            "ipa": "/əˈfek.ʃən/",
            "type": "Danh từ",
            "meaning": "Tình cảm nồng ấm, sự yêu thương",
            "example": "His gentle eyes were filled with warmth and deep affection for Ngoc.",
            "exampleMeaning": "Ánh mắt dịu dàng của anh tràn ngập hơi ấm và tình cảm sâu đậm dành cho Ngọc."
      },
      {
            "word": "empathy",
            "ipa": "/ˈem.pə.θi/",
            "type": "Danh từ",
            "meaning": "Sự thấu cảm, đồng cảm",
            "example": "True love grows when two people listen to each other with genuine empathy.",
            "exampleMeaning": "Tình yêu đích thực sẽ lớn lên khi hai người lắng nghe nhau bằng sự thấu cảm chân thành."
      },
      {
            "word": "reliable",
            "ipa": "/rɪˈlaɪ.ə.bəl/",
            "type": "Tính từ",
            "meaning": "Đáng tin cậy, vững chãi",
            "example": "Khanh always strives to be a strong and reliable shelter for his girl.",
            "exampleMeaning": "Khánh luôn nỗ lực để trở thành chỗ dựa vững chãi và đáng tin cậy nhất cho cô gái của mình."
      },
      {
            "word": "overcome",
            "ipa": "/ˌoʊ.vɚˈkʌm/",
            "type": "Động từ",
            "meaning": "Vượt qua (khó khăn, thử thách)",
            "example": "Together, we have the strength to overcome any distance between Hanoi and Hai Phong.",
            "exampleMeaning": "Cùng bên nhau, chúng mình đủ sức mạnh để vượt qua mọi khoảng cách giữa Hà Nội và Hải Phòng."
      },
      {
            "word": "grateful",
            "ipa": "/ˈɡreɪt.fəl/",
            "type": "Tính từ",
            "meaning": "Biết ơn, cảm kích, trân quý",
            "example": "I wake up feeling grateful each morning just knowing you are in my life.",
            "exampleMeaning": "Mỗi sáng thức giấc anh đều cảm thấy thật biết ơn khi biết rằng cuộc đời này đã có em."
      },
      {
            "word": "comfort",
            "ipa": "/ˈkʌm.fɚt/",
            "type": "Danh từ / Động từ",
            "meaning": "Sự an ủi, vỗ về, cảm giác dễ chịu",
            "example": "A warm tight hug from you is all the comfort I need after a long tiring day.",
            "exampleMeaning": "Một cái ôm siết ấm áp từ em là tất cả sự vỗ về anh cần sau một ngày dài mệt mỏi."
      },
      {
            "word": "patience",
            "ipa": "/ˈpeɪ.ʃəns/",
            "type": "Danh từ",
            "meaning": "Lòng kiên nhẫn, sự nhẫn nại",
            "example": "Patience and gentle caring make our relationship stronger through every storm.",
            "exampleMeaning": "Sự kiên nhẫn và ân cần chăm sóc giúp tình yêu của hai đứa thêm vững vàng qua từng giông bão."
      },
      {
            "word": "inspire",
            "ipa": "/ɪnˈspaɪər/",
            "type": "Động từ",
            "meaning": "Truyền cảm hứng, thôi thúc",
            "example": "Your lovely smile always inspires me to work harder and dream bigger.",
            "exampleMeaning": "Nụ cười rạng rỡ của em luôn truyền cảm hứng thôi thúc anh nỗ lực làm việc và mơ những giấc mơ lớn hơn."
      },
      {
            "word": "devoted",
            "ipa": "/dɪˈvoʊ.t̬ɪd/",
            "type": "Tính từ",
            "meaning": "Hết lòng, tận tụy, chung thủy",
            "example": "He looked at her with devoted eyes, promising to hold her hand forever.",
            "exampleMeaning": "Anh nhìn em bằng ánh mắt hết lòng chung thủy, hứa sẽ nắm chặt tay em suốt chặng đường dài."
      },
      {
            "word": "harmony",
            "ipa": "/ˈhɑːr.mə.ni/",
            "type": "Danh từ",
            "meaning": "Sự hòa thuận, êm ấm, đồng điệu",
            "example": "May our little cozy room always be filled with laughters and sweet harmony.",
            "exampleMeaning": "Mong căn phòng nhỏ ấm cúng của hai đứa sẽ luôn ngập tràn tiếng cười và sự hòa thuận ngọt ngào."
      },
      {
            "word": "sincere",
            "ipa": "/sɪnˈsɪr/",
            "type": "Tính từ",
            "meaning": "Chân thành, thật lòng",
            "example": "A sincere heart can bridge any distance, keeping lovers close even miles apart.",
            "exampleMeaning": "Một trái tim chân thành có thể bắc cầu qua mọi khoảng cách, giữ hai người luôn kề cạnh dù xa cách ngàn dặm."
      },
      {
            "word": "treasure",
            "ipa": "/ˈtreʒ.ɚ/",
            "type": "Danh từ / Động từ",
            "meaning": "Báu vật, trân quý vô ngần",
            "example": "To me, you are the most precious treasure this universe has ever created.",
            "exampleMeaning": "Đối với anh, em chính là báu vật quý giá nhất mà vũ trụ này từng tạo ra."
      },
      {
            "word": "gentle",
            "ipa": "/ˈdʒen.t̬əl/",
            "type": "Tính từ",
            "meaning": "Dịu dàng, hiền hòa, êm dịu",
            "example": "A gentle coastal breeze in Hai Phong reminds me of your sweet soothing scent.",
            "exampleMeaning": "Làn gió biển hiền hòa ở Hải Phòng khiến anh nhớ tới hương thơm ngọt ngào dịu êm của em."
      },
      {
            "word": "supportive",
            "ipa": "/səˈpɔːr.t̬ɪv/",
            "type": "Tính từ",
            "meaning": "Luôn ủng hộ, sẵn sàng tương trợ",
            "example": "Thank you for being so supportive and encouraging whenever I face challenges.",
            "exampleMeaning": "Cảm ơn em vì đã luôn ủng hộ và tiếp thêm động lực cho anh mỗi khi đối mặt với khó khăn."
      },
      {
            "word": "belong",
            "ipa": "/bɪˈlɑːŋ/",
            "type": "Động từ",
            "meaning": "Thuộc về nhau, tìm thấy nơi thuộc về",
            "example": "No matter where life takes us, my heart will always belong to you.",
            "exampleMeaning": "Bất kể cuộc đời đưa ta đi tới đâu, trái tim anh sẽ mãi mãi thuộc về em."
      },
      {
            "word": "courage",
            "ipa": "/ˈkɝː.ɪdʒ/",
            "type": "Danh từ",
            "meaning": "Dũng khí, sự can đảm",
            "example": "Holding your small hand gives me the courage to conquer any fear in life.",
            "exampleMeaning": "Nắm lấy bàn tay nhỏ bé của em cho anh dũng khí để chiến thắng mọi nỗi sợ trong cuộc đời."
      },
      {
            "word": "companion",
            "ipa": "/kəmˈpæn.jən/",
            "type": "Danh từ",
            "meaning": "Người bạn đồng hành, tri kỷ",
            "example": "I couldn't wish for a sweeter or more caring life companion than you, my dear.",
            "exampleMeaning": "Anh không thể ước có một người bạn đồng hành cuộc đời nào ngọt ngào và ân cần hơn em."
      },
      {
            "word": "precious",
            "ipa": "/ˈpreʃ.əs/",
            "type": "Tính từ",
            "meaning": "Quý báu, đáng giá, thân thương",
            "example": "Every smile you give me is a precious jewel stored safely in my memory jar.",
            "exampleMeaning": "Mỗi nụ cười em dành cho anh đều là một viên ngọc quý được cất giữ cẩn thận trong hũ ký ức."
      },
      {
            "word": "tenderness",
            "ipa": "/ˈten.dɚ.nəs/",
            "type": "Danh từ",
            "meaning": "Sự dịu dàng, âu yếm, thiết tha",
            "example": "She kissed his forehead with endless tenderness before saying good night.",
            "exampleMeaning": "Em hôn lên trán anh bằng tất cả sự âu yếm dịu dàng trước khi chúc ngủ ngon."
      },
      {
            "word": "delight",
            "ipa": "/dɪˈlaɪt/",
            "type": "Danh từ / Động từ",
            "meaning": "Niềm hân hoan, thích thú, niềm vui",
            "example": "Watching little cat Bong play with yarn brings endless delight to our room.",
            "exampleMeaning": "Ngắm bé mèo Bông nghịch cuộn len mang lại niềm vui sướng bất tận cho căn phòng nhỏ."
      },
      {
            "word": "reassure",
            "ipa": "/ˌriː.əˈʃʊr/",
            "type": "Động từ",
            "meaning": "Trấn an, làm yên lòng",
            "example": "Hearing your voice on late phone calls always reassures me that everything will be fine.",
            "exampleMeaning": "Nghe giọng nói của em qua những cuộc gọi khuya luôn làm anh an lòng rằng mọi chuyện sẽ ổn."
      },
      {
            "word": "forgive",
            "ipa": "/fɚˈɡɪv/",
            "type": "Động từ",
            "meaning": "Tha thứ, bao dung",
            "example": "To love deeply is to learn how to forgive mistakes and grow together.",
            "exampleMeaning": "Yêu sâu đậm là học cách bao dung với lỗi lầm và cùng nhau ngày một trưởng thành hơn."
      },
      {
            "word": "memorable",
            "ipa": "/ˈmem.ər.ə.bəl/",
            "type": "Tính từ",
            "meaning": "Đáng ghi nhớ, không thể nào quên",
            "example": "Our rainy evening in Hai Phong enjoying spicy bread was truly memorable.",
            "exampleMeaning": "Buổi tối mưa ở Hải Phòng ngồi thưởng thức bánh mì cay cùng em thật sự là kỷ niệm khó quên."
      },
      {
            "word": "passionate",
            "ipa": "/ˈpæʃ.ən.ət/",
            "type": "Tính từ",
            "meaning": "Nồng nàn, tha thiết, say mê",
            "example": "A gentle and passionate love that keeps our hearts glowing through winter.",
            "exampleMeaning": "Một tình yêu nồng nàn và êm dịu giữ cho hai trái tim luôn sưởi ấm qua mùa đông buốt giá."
      }
],
    b2: [
      {
            "word": "serendipity",
            "ipa": "/ˌser.ənˈdɪp.ə.t̬i/",
            "type": "Danh từ",
            "meaning": "Cơ duyên tình cờ kỳ diệu, may mắn bất ngờ",
            "example": "Meeting you at that crossroad was pure serendipity, the sweetest turn in my destiny.",
            "exampleMeaning": "Gặp được em ở ngã rẽ ấy chính là một cơ duyên tình cờ kỳ diệu, bước ngoặt ngọt ngào nhất số phận anh."
      },
      {
            "word": "unconditional",
            "ipa": "/ˌʌn.kənˈdɪʃ.ən.əl/",
            "type": "Tính từ",
            "meaning": "Vô điều kiện, không tính toán",
            "example": "Unconditional love is choosing to stand beside each other through thick and thin.",
            "exampleMeaning": "Tình yêu vô điều kiện là lựa chọn luôn đứng kề bên nhau qua mọi thăng trầm gian khó."
      },
      {
            "word": "resilience",
            "ipa": "/rɪˈzɪl.jəns/",
            "type": "Danh từ",
            "meaning": "Sự bền bỉ, kiên cường, khả năng hồi phục",
            "example": "Our mutual resilience has turned geographical distance into a testament of true loyalty.",
            "exampleMeaning": "Sự kiên cường của hai đứa đã biến khoảng cách địa lý thành minh chứng cho lòng thủy chung son sắt."
      },
      {
            "word": "compassion",
            "ipa": "/kəmˈpæʃ.ən/",
            "type": "Danh từ",
            "meaning": "Lòng trắc ẩn, sự thương cảm dịu dàng",
            "example": "Speak with compassion, for soft words can heal the deepest wounds of the heart.",
            "exampleMeaning": "Hãy nói bằng lòng trắc ẩn, bởi những lời lẽ dịu dàng có thể xoa dịu những vết thương lòng sâu kín nhất."
      },
      {
            "word": "irreplaceable",
            "ipa": "/ˌɪr.ɪˈpleɪ.sə.bəl/",
            "type": "Tính từ",
            "meaning": "Độc nhất vô nhị, không thể thay thế",
            "example": "Among eight billion souls on this planet, you are utterly irreplaceable to me.",
            "exampleMeaning": "Giữa tám tỷ người trên thế giới này, em là duy nhất và không ai có thể thay thế được trong lòng anh."
      },
      {
            "word": "perseverance",
            "ipa": "/ˌpɝː.səˈvɪr.əns/",
            "type": "Danh từ",
            "meaning": "Sự kiên trì, bền chí theo đuổi",
            "example": "With love and perseverance, every dream we share will eventually blossom into reality.",
            "exampleMeaning": "Bằng tình yêu và sự kiên trì bền chí, mọi ước mơ hai đứa cùng ấp ủ sẽ nở hoa thành hiện thực."
      },
      {
            "word": "nurture",
            "ipa": "/ˈnɝː.tʃɚ/",
            "type": "Động từ",
            "meaning": "Nuôi dưỡng, chăm sóc, ươm mầm",
            "example": "We make a promise to nurture our relationship every single day with tiny acts of thoughtfulness.",
            "exampleMeaning": "Chúng mình hứa sẽ nuôi dưỡng tình cảm này mỗi ngày bằng những quan tâm nhỏ bé nhưng chân thành."
      },
      {
            "word": "vulnerable",
            "ipa": "/ˈvʌl.nɚ.ə.bəl/",
            "type": "Tính từ",
            "meaning": "Mở lòng, sẵn sàng bộc lộ cảm xúc yếu mềm",
            "example": "Being vulnerable with you feels safe, because I know my heart is guarded by your kindness.",
            "exampleMeaning": "Mở lòng yếu mềm trước em cho anh cảm giác an toàn, bởi anh biết tim mình được che chở bởi sự tốt bụng của em."
      },
      {
            "word": "profound",
            "ipa": "/prəˈfaʊnd/",
            "type": "Tính từ",
            "meaning": "Sâu sắc, thâm sâu, lắng đọng",
            "example": "Our long conversations about life and future leave a profound sense of peace within me.",
            "exampleMeaning": "Những cuộc trò chuyện sâu lắng về cuộc sống và tương lai luôn để lại trong anh sự bình yên sâu sắc."
      },
      {
            "word": "enchanting",
            "ipa": "/ɪnˈtʃæn.t̬ɪŋ/",
            "type": "Tính từ",
            "meaning": "Mê hoặc, làm say lòng, duyên dáng tuyệt trần",
            "example": "Her sweet giggle in the quiet evening room was the most enchanting melody Khanh had ever heard.",
            "exampleMeaning": "Tiếng cười khúc khích của em trong căn phòng tĩnh lặng là giai điệu làm say lòng người nhất mà Khánh từng nghe."
      },
      {
            "word": "commitment",
            "ipa": "/kəˈmɪt.mənt/",
            "type": "Danh từ",
            "meaning": "Sự gắn kết, cam kết lâu dài, lòng tận hiến",
            "example": "True love is not just a spark of attraction, but a lifelong commitment to care and protect.",
            "exampleMeaning": "Tình yêu thật sự không chỉ là tia lửa rung động, mà là sự cam kết cả đời để chở che và chăm sóc."
      },
      {
            "word": "effervescent",
            "ipa": "/ˌef.ɚˈves.ənt/",
            "type": "Tính từ",
            "meaning": "Tươi vui, rạng rỡ, tràn đầy sức sống",
            "example": "Her effervescent spirit always brings sunshine, banishing all gloomy clouds from his mind.",
            "exampleMeaning": "Tâm hồn tươi vui rạng rỡ của em luôn đem lại ánh nắng ấm, xua tan mọi đám mây u ám trong lòng anh."
      },
      {
            "word": "solitude",
            "ipa": "/ˈsɑː.lə.tuːd/",
            "type": "Danh từ",
            "meaning": "Sự tĩnh lặng riêng tư, khoảng lặng bình yên",
            "example": "Even in peaceful solitude, my thoughts naturally gravitate toward sweet memories of you.",
            "exampleMeaning": "Ngay cả trong những phút giây tĩnh lặng riêng tư, tâm trí anh vẫn tự nhiên hướng về những ký ức ngọt ngào bên em."
      },
      {
            "word": "cherished",
            "ipa": "/ˈtʃer.ɪʃt/",
            "type": "Tính từ",
            "meaning": "Được nâng niu, yêu dấu, ấp ủ",
            "example": "You are the most cherished dream that has ever graced my ordinary world.",
            "exampleMeaning": "Em là giấc mơ dấu yêu nhất từng ghé thăm và làm bừng sáng thế giới bình dị của anh."
      },
      {
            "word": "authenticity",
            "ipa": "/ˌɑː.θenˈtɪs.ə.t̬i/",
            "type": "Danh từ",
            "meaning": "Sự chân thật, mộc mạc không giả tạo",
            "example": "I fell in love with your pure authenticity—no masks, just the sweet girl I adore.",
            "exampleMeaning": "Anh yêu nét chân thật mộc mạc nơi em—không hề tô vẽ, chỉ đơn giản là cô gái ngọt ngào anh say đắm."
      },
      {
            "word": "magnificent",
            "ipa": "/mæɡˈnɪf.ə.sənt/",
            "type": "Tính từ",
            "meaning": "Tráng lệ, tuyệt vời, rực rỡ",
            "example": "Watching the golden sunset over West Lake together felt like a magnificent painting.",
            "exampleMeaning": "Cùng em ngắm hoàng hôn dát vàng trên mặt Hồ Tây tựa như một bức tranh tuyệt mỹ."
      },
      {
            "word": "sympathy",
            "ipa": "/ˈsɪm.pə.θi/",
            "type": "Danh từ",
            "meaning": "Sự cảm thông, thấu hiểu sẻ chia",
            "example": "She listened with quiet sympathy, wiping his worries away with a gentle touch.",
            "exampleMeaning": "Em lắng nghe với sự cảm thông êm đềm, gạt đi mọi âu lo của anh chỉ bằng một cái chạm tay ân cần."
      },
      {
            "word": "reciprocal",
            "ipa": "/rɪˈsɪp.rə.kəl/",
            "type": "Tính từ",
            "meaning": "Qua lại hai chiều, tương hỗ lẫn nhau",
            "example": "A thriving relationship is built on reciprocal respect, trust, and steady devotion.",
            "exampleMeaning": "Một mối quan hệ bền vững được xây dựng trên sự tôn trọng, niềm tin và tình cảm chân thành từ cả hai phía."
      },
      {
            "word": "rekindle",
            "ipa": "/ˌriːˈkɪn.dəl/",
            "type": "Động từ",
            "meaning": "Thắp lại, làm bùng cháy lại ngọn lửa",
            "example": "A handwritten letter always rekindles the sweetest spark between lovers.",
            "exampleMeaning": "Một lá thư tay nắn nót luôn thắp lại ngọn lửa ấm áp và ngọt ngào nhất giữa hai đứa."
      },
      {
            "word": "tranquility",
            "ipa": "/træŋˈkwɪl.ə.t̬i/",
            "type": "Danh từ",
            "meaning": "Sự thanh bình, tĩnh tại trong tâm hồn",
            "example": "Resting my head on your shoulder brings a profound sense of tranquility.",
            "exampleMeaning": "Tựa đầu vào vai em mang lại một cảm giác thanh bình và tĩnh tại vô ngần."
      }
],
    c1: [
      {
            "word": "ephemeral",
            "ipa": "/ɪˈfem.ər.əl/",
            "type": "Tính từ",
            "meaning": "Phù du, sớm nở tối tàn, thoáng qua",
            "example": "While seasons and blossoms are ephemeral, my devotion to you remains timeless.",
            "exampleMeaning": "Dẫu bốn mùa và hoa cỏ chỉ là phù du thoáng qua, tấm lòng anh trao em vẫn luôn bất biến với thời gian."
      },
      {
            "word": "solace",
            "ipa": "/ˈsɑː.lɪs/",
            "type": "Danh từ / Động từ",
            "meaning": "Chốn an yên, niềm an ủi vỗ về tâm hồn",
            "example": "In the gentle warmth of your embrace, I find the quiet solace I sought for my entire life.",
            "exampleMeaning": "Trong vòng tay ấm áp dịu dàng của em, anh tìm thấy chốn an yên tĩnh tại mà cả đời mình luôn kiếm tìm."
      },
      {
            "word": "unwavering",
            "ipa": "/ʌnˈweɪ.vɚ.ɪŋ/",
            "type": "Tính từ",
            "meaning": "Kiên định, son sắt, không hề lung lay",
            "example": "His unwavering faith in their shared future kept the flame burning bright despite the distance.",
            "exampleMeaning": "Niềm tin son sắt không hề lung lay vào tương lai hai đứa đã giữ cho ngọn lửa tình yêu luôn rực sáng bất chấp khoảng cách."
      },
      {
            "word": "ineffable",
            "ipa": "/ɪnˈef.ə.bəl/",
            "type": "Tính từ",
            "meaning": "Khôn xiết, không lời lẽ nào diễn tả nổi",
            "example": "The sheer joy of reuniting at the train station after weeks apart was utterly ineffable.",
            "exampleMeaning": "Niềm vui sướng tột cùng khi gặp lại em ở sân ga sau nhiều tuần cách xa thật khôn xiết, không lời nào tả xiết."
      },
      {
            "word": "sanctuary",
            "ipa": "/ˈsæŋk.tʃu.er.i/",
            "type": "Danh từ",
            "meaning": "Chốn chở che thiêng liêng, nơi trú ẩn bình yên",
            "example": "Your kind heart is my sacred sanctuary against the harsh noise of the outer world.",
            "exampleMeaning": "Trái tim nhân hậu của em chính là chốn chở che bình yên thiêng liêng nhất cho anh trước những ồn ã ngoài kia."
      },
      {
            "word": "mellifluous",
            "ipa": "/meˈlɪf.lu.əs/",
            "type": "Tính từ",
            "meaning": "Êm ái ngọt ngào như rót mật vào tai",
            "example": "Her mellifluous voice singing soft tunes over the phone effortlessly melts away all his tiredness.",
            "exampleMeaning": "Giọng hát êm ái ngọt ngào như rót mật của em qua điện thoại đã xua tan đi tất thảy những mệt mỏi trong anh."
      },
      {
            "word": "petrichor",
            "ipa": "/ˈpet.rɪ.kɔːr/",
            "type": "Danh từ",
            "meaning": "Mùi hương thanh khiết của đất sau cơn mưa rào",
            "example": "The crisp petrichor after the summer rain reminded him of their first romantic stroll in Hanoi.",
            "exampleMeaning": "Mùi đất thanh khiết sau cơn mưa rào mùa hạ khiến anh bồi hồi nhớ lại lần đầu hai đứa cùng tản bộ ở Hà Nội."
      },
      {
            "word": "felicity",
            "ipa": "/fəˈlɪs.ə.t̬i/",
            "type": "Danh từ",
            "meaning": "Hạnh phúc trọn vẹn, niềm hoan hỉ ngập tràn",
            "example": "True felicity is found not in grand triumphs, but in waking up to see your bright morning smile.",
            "exampleMeaning": "Hạnh phúc trọn vẹn không nằm ở những hào quang lớn lao, mà là sớm mai thức dậy được ngắm nụ cười rạng rỡ của em."
      },
      {
            "word": "halcyon",
            "ipa": "/ˈhæl.si.ən/",
            "type": "Tính từ",
            "meaning": "Thanh bình, êm đềm, vàng son đáng nhớ",
            "example": "Those halcyon days wandering the sea promenade together in Hai Phong will forever warm our hearts.",
            "exampleMeaning": "Những ngày tháng thanh bình êm ả cùng nhau dạo bước ven bờ biển Hải Phòng sẽ sưởi ấm trái tim hai đứa suốt cuộc đời."
      },
      {
            "word": "luminous",
            "ipa": "/ˈluː.mɪ.nəs/",
            "type": "Tính từ",
            "meaning": "Tỏa sáng rạng ngời, lấp lánh diệu kỳ",
            "example": "Her eyes were luminous under the moonlit sky, reflecting a universe of pure tenderness.",
            "exampleMeaning": "Đôi mắt em tỏa sáng rạng ngời dưới bầu trời trăng sáng, phản chiếu cả một vũ trụ dịu dàng và yêu thương."
      },
      {
            "word": "magnanimous",
            "ipa": "/mæɡˈnæn.ə.məs/",
            "type": "Tính từ",
            "meaning": "Độ lượng, bao dung, cao thượng",
            "example": "A magnanimous lover forgives small flaws and cherishes the beauty of growth together.",
            "exampleMeaning": "Một người yêu bao dung luôn bỏ qua những thiếu sót nhỏ và trân trọng vẻ đẹp của sự cùng nhau trưởng thành."
      },
      {
            "word": "quintessential",
            "ipa": "/ˌkwɪn.təˈsen.ʃəl/",
            "type": "Tính từ",
            "meaning": "Tinh túy, biểu tượng thuần khiết điển hình",
            "example": "Sharing a warm cup of chrysanthemum tea on a chilly evening is our quintessential romance.",
            "exampleMeaning": "Cùng chia nhau tách trà cúc ấm nóng giữa đêm se lạnh chính là biểu tượng tinh túy cho sự lãng mạn của hai đứa."
      },
      {
            "word": "serenade",
            "ipa": "/ˌser.əˈneɪd/",
            "type": "Động từ / Danh từ",
            "meaning": "Hát dạ khúc, lời tình tự êm đềm",
            "example": "The gentle whisper of night wind seemed to serenade the two lovers walking hand in hand.",
            "exampleMeaning": "Tiếng gió đêm xào xạc tựa như khúc tình ca dạ khúc hát ru hai đứa đang nắm chặt tay nhau dạo bước."
      },
      {
            "word": "indomitable",
            "ipa": "/ɪnˈdɑː.mɪ.t̬ə.bəl/",
            "type": "Tính từ",
            "meaning": "Bất khuất, kiên cường không gì khuất phục",
            "example": "Their love possessed an indomitable spirit, triumphing over all odds and distances.",
            "exampleMeaning": "Tình yêu của hai người mang một ý chí kiên cường bất khuất, chiến thắng mọi thử thách và khoảng cách địa lý."
      },
      {
            "word": "eloquence",
            "ipa": "/ˈel.ə.kwəns/",
            "type": "Danh từ",
            "meaning": "Sự lưu loát, tài hùng biện, lời lẽ truyền cảm",
            "example": "His handwritten letters held an innate eloquence that touched the very depths of her soul.",
            "exampleMeaning": "Những lá thư tay của anh chan chứa những lời lẽ truyền cảm tha thiết, chạm tới nơi sâu thẳm nhất tâm hồn em."
      },
      {
            "word": "quandary",
            "ipa": "/ˈkwɑːn.dri/",
            "type": "Danh từ",
            "meaning": "Tình thế đắn đo, sự trăn trở băn khoăn",
            "example": "Whenever caught in life's quandary, hearing her calming counsel always restored his clarity.",
            "exampleMeaning": "Bất cứ khi nào vướng vào những trăn trở băn khoăn của cuộc đời, nghe lời khuyên dịu dàng của em luôn giúp anh tìm lại sự sáng suốt."
      },
      {
            "word": "resplendent",
            "ipa": "/rɪˈsplen.dənt/",
            "type": "Tính từ",
            "meaning": "Lộng lẫy, chói sáng, rực rỡ tuyệt mỹ",
            "example": "Dressed in her favorite pastel coat, she looked resplendent against the autumn foliage.",
            "exampleMeaning": "Khoác lên mình chiếc áo khoác màu pastel yêu thích, trông em lộng lẫy tuyệt mỹ giữa khung cảnh lá vàng mùa thu."
      },
      {
            "word": "inviolable",
            "ipa": "/ɪnˈvaɪ.ə.lə.bəl/",
            "type": "Tính từ",
            "meaning": "Bất khả xâm phạm, thiêng liêng tuyệt đối",
            "example": "The solemn vow they made under the stars remained an inviolable bond between their hearts.",
            "exampleMeaning": "Lời ước hẹn thiêng liêng hai đứa trao nhau dưới ngàn sao mãi là sợi dây liên kết bất khả xâm phạm giữa hai trái tim."
      },
      {
            "word": "effulgent",
            "ipa": "/ɪˈfʌl.dʒənt/",
            "type": "Tính từ",
            "meaning": "Rực rỡ chói lòa, ngập tràn ánh sáng",
            "example": "Her radiant smile on their anniversary day was effulgent, illuminating the entire room.",
            "exampleMeaning": "Nụ cười rạng rỡ của em trong ngày kỷ niệm tỏa sáng rực rỡ, thắp sáng bừng lên cả căn phòng nhỏ."
      },
      {
            "word": "eternal",
            "ipa": "/ɪˈtɝː.nəl/",
            "type": "Tính từ",
            "meaning": "Vĩnh cửu, trường tồn mãi mãi",
            "example": "Beyond the passing storms of youth lies our promise of an eternal companionship.",
            "exampleMeaning": "Vượt qua những giông bão của năm tháng thanh xuân là lời hứa về một sự đồng hành trường tồn vĩnh cửu."
      }
],
    love: [
      {
            "quote": "I loved you yesterday, I love you still, I always have, I always will.",
            "author": "Elaine Davis",
            "meaning": "Hôm qua anh đã yêu em, hôm nay vẫn yêu, từ trước tới giờ vẫn vậy, và mai sau cũng mãi như thế."
      },
      {
            "quote": "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
            "author": "Maya Angelou",
            "meaning": "Giữa cả thế giới rộng lớn, chẳng có trái tim nào dành cho anh như của em. Và chẳng có tình yêu nào dành cho em như của anh."
      },
      {
            "quote": "Distance means so little when someone means so much.",
            "author": "Tom McNeal",
            "meaning": "Khoảng cách trở nên thật nhỏ bé khi một ai đó có ý nghĩa quá lớn lao với cuộc đời mình."
      },
      {
            "quote": "Whatever our souls are made of, yours and mine are the same.",
            "author": "Emily Brontë",
            "meaning": "Dẫu tâm hồn của chúng ta được tạo nên từ chất liệu gì, thì tâm hồn của em và anh cũng cùng một điệu nhịp."
      },
      {
            "quote": "You are my today and all of my tomorrows.",
            "author": "Leo Christopher",
            "meaning": "Em là ngày hôm nay của anh, và cũng là tất cả những ngày mai sau này."
      },
      {
            "quote": "I fell in love with the way you touched me without using your hands.",
            "author": "Rupi Kaur",
            "meaning": "Anh say đắm cái cách em chạm vào sâu thẳm trái tim anh, mà chẳng cần dùng đến đôi bàn tay."
      },
      {
            "quote": "Every love story is beautiful, but ours is my absolute favorite.",
            "author": "Sweet Couple Quote",
            "meaning": "Mọi câu chuyện tình yêu đều đẹp, nhưng câu chuyện của hai đứa mình luôn là thiên tình sử anh yêu thích nhất."
      },
      {
            "quote": "Home is not a place; it's you holding my hand.",
            "author": "Romantic Whisper",
            "meaning": "Nhà không phải là một địa điểm; nhà chính là khi em đang nắm chặt lấy bàn tay anh."
      },
      {
            "quote": "If I know what love is, it is because of you.",
            "author": "Hermann Hesse",
            "meaning": "Nếu anh hiểu được tình yêu thật sự là gì, đó chính là nhờ có em trong đời."
      },
      {
            "quote": "You are the peace I longed for in a restless world.",
            "author": "Khánh dành tặng Ngọc 💕",
            "meaning": "Em chính là sự bình yên mà anh luôn hằng khao khát giữa thế giới bộn bề không ngừng quay này."
      }
]
  };

  const STORAGE_KEYS = {
    starred: "hu_keo_cua_sun_english_starred_v1",
    srs: "hu_keo_cua_sun_english_srs_v1",
    currentLevel: "hu_keo_cua_sun_english_level_v1",
    dailySetOffset: "hu_keo_cua_sun_english_daily_offset_v1",
    dailyDoneDate: "hu_keo_cua_sun_english_daily_done_date_v1"
  };

  let currentLevel = "b1"; // "b1" | "b2" | "c1"
  let currentTab = "daily"; // "daily" | "flashcard" | "quiz" | "match" | "starred" | "love"

  let dailyWords = [];
  let dailySetOffset = 0;

  // Flashcard state
  let fcWords = [];
  let fcIndex = 0;
  let fcFlipped = false;

  // Quiz state
  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  // Match game state
  let matchWords = [];
  let matchEnCards = [];
  let matchViCards = [];
  let matchSelectedEn = null;
  let matchSelectedVi = null;
  let matchedIds = new Set();
  let matchRewarded = false;
  let matchLocked = false;

  // Starred filter
  let starredFilter = "all";
  let starredSearchQuery = "";

  // Audio Engine with Native SpeechSynthesis & Stream Fallback
  let activeAudio = null;
  let cachedVoices = [];
  let speechSeq = 0;

  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    try {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    } catch {}
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    loadVoices();
    try {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } catch {}
  }

  function getBestEnglishVoice() {
    if (!cachedVoices.length) loadVoices();
    const vList = cachedVoices || [];
    return (
      vList.find((v) => v.lang && (v.lang === "en-US" || v.lang === "en_US")) ||
      vList.find((v) => v.lang && (v.lang === "en-GB" || v.lang === "en_GB")) ||
      vList.find((v) => v.lang && v.lang.toLowerCase().startsWith("en")) ||
      vList.find((v) => /english|samantha|daniel|karen|alex|serena/i.test(v.name)) ||
      null
    );
  }

  function stopAllSpeech() {
    if (activeAudio) {
      try {
        activeAudio.pause();
        activeAudio.src = "";
        activeAudio.currentTime = 0;
      } catch {}
      activeAudio = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  function speak(text, triggerBtn = null) {
    if (!text) return;
    const cleanText = text.replace(/["'“”‘’]/g, "").trim();
    if (!cleanText) return;

    const thisSpeechId = ++speechSeq;
    stopAllSpeech();

    let originalHtml = "";
    if (triggerBtn) {
      originalHtml = triggerBtn.innerHTML;
      triggerBtn.classList.add("speaking");
      triggerBtn.innerHTML = `🔊 Đang đọc...`;
    }
    const resetBtn = () => {
      if (thisSpeechId === speechSeq && triggerBtn) {
        triggerBtn.classList.remove("speaking");
        triggerBtn.innerHTML = originalHtml;
      }
    };

    function playStreamFallback() {
      if (thisSpeechId !== speechSeq) return;
      try {
        const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&type=2`;
        const audio = new Audio(url);
        audio.playbackRate = 0.95;
        activeAudio = audio;

        audio.onended = () => {
          if (thisSpeechId === speechSeq) {
            resetBtn();
            activeAudio = null;
          }
        };
        audio.onerror = () => {
          if (thisSpeechId === speechSeq) resetBtn();
        };

        const p = audio.play();
        if (p !== undefined) {
          p.catch(() => {
            if (thisSpeechId === speechSeq) resetBtn();
          });
        }
      } catch {
        resetBtn();
      }
    }

    const safetyTimer = setTimeout(() => {
      if (thisSpeechId === speechSeq) resetBtn();
    }, 4500);

    const enVoice = getBestEnglishVoice();
    const voicesReady = cachedVoices && cachedVoices.length > 0;

    if (voicesReady && !enVoice) {
      playStreamFallback();
      return;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        if (typeof window.speechSynthesis.resume === "function") {
          window.speechSynthesis.resume();
        }
        const utter = new SpeechSynthesisUtterance(cleanText);
        utter.lang = "en-US";
        utter.rate = 0.88;
        if (enVoice) utter.voice = enVoice;

        utter.onend = () => {
          clearTimeout(safetyTimer);
          resetBtn();
        };
        utter.onerror = () => {
          clearTimeout(safetyTimer);
          playStreamFallback();
        };

        window.speechSynthesis.speak(utter);
        return;
      } catch (e) {
        console.warn("SpeechSynthesis error:", e);
      }
    }

    playStreamFallback();
  }

  // Starred Words Storage
  function getStarredList() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.starred);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function isWordStarred(word) {
    const list = getStarredList();
    return list.some((item) => item.word === word);
  }

  function toggleStarWord(wordObj) {
    const list = getStarredList();
    const idx = list.findIndex((item) => item.word === wordObj.word);
    let nowStarred = false;
    if (idx >= 0) {
      list.splice(idx, 1);
      nowStarred = false;
    } else {
      list.unshift({
        ...wordObj,
        level: wordObj.level || currentLevel,
        starredAt: Date.now()
      });
      nowStarred = true;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.starred, JSON.stringify(list));
    } catch {}
    return nowStarred;
  }

  // SRS Engine
  function getSRSMap() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.srs);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveSRSMap(map) {
    try {
      localStorage.setItem(STORAGE_KEYS.srs, JSON.stringify(map));
    } catch {}
  }

  function recordSRSReview(word, isSuccess) {
    const srsMap = getSRSMap();
    const entry = srsMap[word] || {
      reps: 0,
      interval: 1,
      due: Date.now()
    };

    if (isSuccess) {
      entry.reps = (entry.reps || 0) + 1;
      if (entry.reps === 1) entry.interval = 1;
      else if (entry.reps === 2) entry.interval = 3;
      else if (entry.reps === 3) entry.interval = 7;
      else if (entry.reps === 4) entry.interval = 14;
      else entry.interval = 30;
      entry.due = Date.now() + entry.interval * 86400000;
    } else {
      entry.reps = 0;
      entry.interval = 1;
      entry.due = Date.now() + 86400000;
    }

    srsMap[word] = entry;
    saveSRSMap(srsMap);
  }

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getDailyFiveWords(level) {
    const list = ENGLISH_DATA[level] || ENGLISH_DATA.b1;
    if (!list || list.length === 0) return [];

    const now = Date.now();
    const srsMap = getSRSMap();

    const dueList = list.filter((w) => srsMap[w.word] && srsMap[w.word].due <= now);
    const unstudied = list.filter((w) => !srsMap[w.word]);
    const others = list.filter((w) => srsMap[w.word] && srsMap[w.word].due > now);

    let chosen = [];
    if (dueList.length > 0) {
      chosen = chosen.concat(shuffleArray(dueList).slice(0, 3));
    }
    const needed = 5 - chosen.length;
    if (unstudied.length > 0) {
      const offset = (dailySetOffset * needed) % unstudied.length;
      const rotated = unstudied.slice(offset).concat(unstudied.slice(0, offset));
      chosen = chosen.concat(rotated.slice(0, needed));
    }
    if (chosen.length < 5) {
      const remainingNeeded = 5 - chosen.length;
      const candidates = others.filter((w) => !chosen.some((c) => c.word === w.word));
      chosen = chosen.concat(shuffleArray(candidates).slice(0, remainingNeeded));
    }

    return chosen.slice(0, 5);
  }

  function getLevelLabel(level) {
    switch (level) {
      case "b1":
        return "B1 (Trung cấp • Giao tiếp)";
      case "b2":
        return "B2 (Trung cao cấp • Idioms)";
      case "c1":
        return "C1 (Nâng cao • Tinh hoa)";
      default:
        return "B1 (Trung cấp)";
    }
  }

  function getTodayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function isDailyCompletedToday() {
    try {
      return localStorage.getItem(STORAGE_KEYS.dailyDoneDate) === getTodayString();
    } catch {
      return false;
    }
  }

  function markDailyCompletedToday() {
    try {
      localStorage.setItem(STORAGE_KEYS.dailyDoneDate, getTodayString());
    } catch {}
  }

  function getLearnedCount(level) {
    const list = ENGLISH_DATA[level] || [];
    const srsMap = getSRSMap();
    return list.filter((w) => srsMap[w.word] && srsMap[w.word].reps > 0).length;
  }

  function getSRSBadge(word) {
    const srsInfo = getSRSMap()[word];
    if (!srsInfo || srsInfo.reps === 0) return { text: "Mới", cls: "srs-new" };
    if (srsInfo.reps >= 3) return { text: "Đã thuộc", cls: "srs-mastered" };
    return { text: `Cấp ${srsInfo.reps}`, cls: "srs-reviewing" };
  }

  // Tab: 5 Từ Hôm Nay
  function renderDailyTab() {
    const container = document.getElementById("englishTabContent");
    dailyWords = getDailyFiveWords(currentLevel);

    const totalWords = (ENGLISH_DATA[currentLevel] || []).length;
    const learnedWords = getLearnedCount(currentLevel);
    const progressPct = totalWords ? Math.round((learnedWords / totalWords) * 100) : 0;
    const isCompletedToday = isDailyCompletedToday();

    let itemsHtml = "";
    dailyWords.forEach((wordObj, idx) => {
      const isStarred = isWordStarred(wordObj.word);
      const cambridgeUrl = `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(wordObj.word.toLowerCase())}`;
      const srsInfo = getSRSMap()[wordObj.word];
      const isDue = srsInfo && srsInfo.due <= Date.now();
      const reps = srsInfo ? srsInfo.reps : 0;

      itemsHtml += `
        <div class="chinese-word-card english-word-card" data-word="${wordObj.word}">
          <div class="cwc-top">
            <div class="cwc-hanzi-wrap">
              <span class="eng-word-title">${wordObj.word}</span>
              <span class="eng-word-ipa">${wordObj.ipa}</span>
              <span class="cwc-type">${wordObj.type}</span>
              ${reps > 0 ? `<span class="cwc-tag-review">Đã ôn ${reps} lần</span>` : `<span class="cwc-tag-new">Mới</span>`}
              ${isDue ? `<span class="cwc-tag-due">Đến hạn ôn</span>` : ""}
            </div>
            <div class="cwc-actions">
              <button class="btn-star ${isStarred ? "starred" : ""}" data-word="${wordObj.word}" title="${isStarred ? "Bỏ lưu từ" : "Lưu vào sổ tay"}">
                ${isStarred ? "⭐ Đã lưu" : "☆ Lưu"}
              </button>
              <button class="btn-speak" data-text="${wordObj.word}" title="Nghe phát âm chuẩn">
                🔊 Nghe
              </button>
              <a href="${cambridgeUrl}" target="_blank" rel="noopener noreferrer" class="btn-dict" title="Tra cứu trên Cambridge Dictionary">
                📖 Cambridge
              </a>
            </div>
          </div>

          <div class="cwc-meaning">
            👉 <strong>${wordObj.meaning}</strong>
          </div>

          <div class="cwc-example">
            <span class="cwc-ex-hanzi eng-ex-sentence">"${wordObj.example}"</span>
            <span class="cwc-ex-meaning">💬 ${wordObj.exampleMeaning}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="chinese-daily-wrap">
        <div class="chinese-level-bar">
          <div class="clb-left">
            <label for="selectEnglishLevel">🏷️ Cấp độ:</label>
            <select id="selectEnglishLevel" class="pixel-select">
              <option value="b1" ${currentLevel === "b1" ? "selected" : ""}>B1 (Trung cấp • Giao tiếp)</option>
              <option value="b2" ${currentLevel === "b2" ? "selected" : ""}>B2 (Trung cao cấp • Idioms)</option>
              <option value="c1" ${currentLevel === "c1" ? "selected" : ""}>C1 (Nâng cao • Tinh hoa)</option>
            </select>
          </div>
          <button class="btn-dict" id="btnNextDailySetEn" title="Đổi sang 5 từ tiếp theo">🎲 Đổi 5 từ</button>
        </div>

        <div class="chinese-daily-list">
          ${itemsHtml}
        </div>

        <div class="chinese-daily-finish-box">
          <div class="cdf-info">
            <span>🎁 Học xong 5 từ hôm nay:</span>
            <strong style="color: #d6336c">+2 🍬 Kẹo & +10 XP</strong>
          </div>
          <button class="btn-finish-daily ${isCompletedToday ? "completed" : ""}" id="btnFinishDailyEn" ${isCompletedToday ? "disabled" : ""}>
            ${isCompletedToday ? "🎉 Đã Ghi Nhớ Hôm Nay" : "Đã Nhớ Cả 5 Từ ✓"}
          </button>
        </div>
      </div>
    `;

    document.getElementById("selectEnglishLevel").addEventListener("change", (e) => {
      currentLevel = e.target.value;
      dailySetOffset = 0;
      try {
        localStorage.setItem(STORAGE_KEYS.currentLevel, currentLevel);
      } catch {}
      renderDailyTab();
    });

    document.getElementById("btnNextDailySetEn").addEventListener("click", () => {
      if (window.AudioManager) AudioManager.playClick();
      dailySetOffset++;
      try {
        localStorage.setItem(STORAGE_KEYS.dailySetOffset, String(dailySetOffset));
      } catch {}
      renderDailyTab();
    });

    container.querySelectorAll(".btn-speak").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.text;
        speak(text, btn);
      });
    });

    container.querySelectorAll(".btn-star").forEach((btn) => {
      btn.addEventListener("click", () => {
        const word = btn.dataset.word;
        const target = (ENGLISH_DATA[currentLevel] || []).find((w) => w.word === word) ||
                       dailyWords.find((w) => w.word === word);
        if (!target) return;
        const nowStarred = toggleStarWord(target);
        if (nowStarred) {
          btn.classList.add("starred");
          btn.innerHTML = "⭐ Đã lưu";
          if (window.AudioManager) AudioManager.playCandy();
          if (window.showToast) showToast(`Đã lưu "${word}" vào Sổ tay của Ngọc! ⭐`);
        } else {
          btn.classList.remove("starred");
          btn.innerHTML = "☆ Lưu";
          if (window.showToast) showToast(`Đã bỏ lưu "${word}"!`);
        }
      });
    });

    const btnFinish = document.getElementById("btnFinishDailyEn");
    if (btnFinish && !isCompletedToday) {
      btnFinish.addEventListener("click", () => {
        if (isDailyCompletedToday()) return;
        markDailyCompletedToday();
        dailyWords.forEach((w) => recordSRSReview(w.word, true));

        btnFinish.classList.add("completed");
        btnFinish.disabled = true;
        btnFinish.innerHTML = "🎉 Đã Ghi Nhớ Hôm Nay";

        if (window.AudioManager) AudioManager.playCelebration();
        if (typeof window.addRewards === "function") {
          window.addRewards(10, 2);
        }
        if (window.showToast) {
          showToast("🎉 Tuyệt vời! Ngọc đã hoàn thành 5 từ tiếng Anh hôm nay: +2 🍬 & +10 XP!");
        }
      });
    }
  }

  // Tab: Flashcard
  function startFlashcards() {
    fcWords = (ENGLISH_DATA[currentLevel] || []).slice(0, 25);
    fcIndex = 0;
    fcFlipped = false;
    renderFlashcardTab();
  }

  function renderFlashcardTab() {
    const container = document.getElementById("englishTabContent");
    if (!fcWords || fcWords.length === 0) {
      startFlashcards();
      return;
    }

    const wordObj = fcWords[fcIndex];
    const total = fcWords.length;
    const isStarred = isWordStarred(wordObj.word);
    const srsBadge = getSRSBadge(wordObj.word);
    const ukFlagSvg = `<svg class="flag-uk flag-uk-sm" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="60" height="40" fill="#012169" rx="3"/><clipPath id="uk-fc-flag"><rect width="60" height="40" rx="3"/></clipPath><g clip-path="url(#uk-fc-flag)"><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" stroke-width="8"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#cf142b" stroke-width="4.5"/><path d="M30,0 v40 M0,20 h60" stroke="#fff" stroke-width="13"/><path d="M30,0 v40 M0,20 h60" stroke="#cf142b" stroke-width="7.5"/></g></svg>`;

    container.innerHTML = `
      <div class="chinese-flashcard-wrap">
        <div class="chinese-level-bar">
          <div class="clb-left">
            <label for="selectEnglishFcLevel">🏷️ Cấp:</label>
            <select id="selectEnglishFcLevel" class="pixel-select">
              <option value="b1" ${currentLevel === "b1" ? "selected" : ""}>B1 (Trung cấp)</option>
              <option value="b2" ${currentLevel === "b2" ? "selected" : ""}>B2 (Trung cao cấp)</option>
              <option value="c1" ${currentLevel === "c1" ? "selected" : ""}>C1 (Nâng cao)</option>
            </select>
          </div>
          <span class="fc-counter">Thẻ <strong>${fcIndex + 1}/${total}</strong></span>
        </div>

        <div class="flashcard-box" id="fcBox">
          ${!fcFlipped ? `
            <div class="fc-front">
              <div class="fc-header-row">
                <span class="fc-tag">${ukFlagSvg}${getLevelLabel(currentLevel).split(" ")[0]} • Thẻ ${fcIndex + 1}/${total}</span>
                <span class="srs-badge ${srsBadge.cls}">${srsBadge.text}</span>
              </div>
              <div class="fc-eng-word">${wordObj.word}</div>
              <div class="fc-pinyin">${wordObj.ipa}</div>
              <div class="cwc-badges-row" style="margin-top: 4px;">
                <span class="fc-type-badge">${wordObj.type}</span>
              </div>
              <span class="fc-hint">👆 Chạm thẻ hoặc bấm Lật Thẻ để xem nghĩa & ví dụ</span>
              <div class="fc-actions-row">
                <button class="btn-star ${isStarred ? "starred" : ""}" id="btnFcStar" title="${isStarred ? "Bỏ lưu từ" : "Lưu vào sổ tay"}">
                  ${isStarred ? "⭐ Đã lưu" : "☆ Lưu"}
                </button>
                <button class="btn-speak" id="btnFcAudio" title="Nghe phát âm chuẩn">🔊 Nghe</button>
                <a href="https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(wordObj.word.toLowerCase())}" target="_blank" rel="noopener noreferrer" class="btn-dict" title="Tra cứu trên Cambridge Dictionary">
                  📖 Cambridge
                </a>
              </div>
            </div>
          ` : `
            <div class="fc-back">
              <div class="fc-header-row">
                <span class="fc-tag">${ukFlagSvg}${wordObj.word}</span>
                <span class="srs-badge ${srsBadge.cls}">${srsBadge.text}</span>
              </div>
              <div class="fc-meaning">${wordObj.meaning}</div>
              <div class="cwc-badges-row" style="margin-top: 4px;">
                <span class="fc-type-badge">${wordObj.type}</span>
              </div>
              <div class="fc-example-box">
                <span class="fc-ex-hanzi eng-ex-sentence">"${wordObj.example}"</span>
                <span class="fc-ex-vi">💬 ${wordObj.exampleMeaning}</span>
              </div>
              <div class="fc-actions-row">
                <button class="btn-star ${isStarred ? "starred" : ""}" id="btnFcStar" title="${isStarred ? "Bỏ lưu từ" : "Lưu vào sổ tay"}">
                  ${isStarred ? "⭐ Đã lưu" : "☆ Lưu"}
                </button>
                <button class="btn-speak" id="btnFcSpeakEx" data-text="${wordObj.example}" title="Nghe ví dụ">🔊 Nghe ví dụ</button>
                <a href="https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(wordObj.word.toLowerCase())}" target="_blank" rel="noopener noreferrer" class="btn-dict" title="Tra cứu trên Cambridge Dictionary">
                  📖 Cambridge
                </a>
              </div>
            </div>
          `}
        </div>

        ${fcFlipped ? `
          <div class="fc-srs-rating-row">
            <button class="srs-rate-btn rate-again" id="btnFcForget" title="Chưa thuộc, cần ôn lại">🔴 Chưa nhớ (Ôn lại)</button>
            <button class="srs-rate-btn rate-good" id="btnFcRemember" title="Đã ghi nhớ từ này">🟢 Đã thuộc (Nhớ tốt)</button>
          </div>
          <div class="fc-nav-controls" style="margin-top: 8px;">
            <button class="fc-nav-btn fc-prev-btn" id="btnFcPrev" ${fcIndex === 0 ? "disabled" : ""}>◀ Trước</button>
            <button class="fc-nav-btn fc-flip-btn" id="btnFcFlip">🔄 Lật lại</button>
            <button class="fc-nav-btn fc-next-btn" id="btnFcNext" ${fcIndex === total - 1 ? "disabled" : ""}>Sau ▶</button>
          </div>
        ` : `
          <div class="fc-nav-controls">
            <button class="fc-nav-btn fc-prev-btn" id="btnFcPrev" ${fcIndex === 0 ? "disabled" : ""}>◀ Trước</button>
            <button class="fc-nav-btn fc-flip-btn" id="btnFcFlip">🔄 Lật Thẻ</button>
            <button class="fc-nav-btn fc-next-btn" id="btnFcNext" ${fcIndex === total - 1 ? "disabled" : ""}>Sau ▶</button>
          </div>
        `}
      </div>
    `;

    document.getElementById("selectEnglishFcLevel").addEventListener("change", (e) => {
      currentLevel = e.target.value;
      try {
        localStorage.setItem(STORAGE_KEYS.currentLevel, currentLevel);
      } catch {}
      startFlashcards();
    });

    const fcBox = document.getElementById("fcBox");
    if (fcBox) {
      fcBox.addEventListener("click", (e) => {
        if (e.target.closest("button") || e.target.closest("a")) return;
        fcFlipped = !fcFlipped;
        if (window.AudioManager) AudioManager.playClick();
        renderFlashcardTab();
      });
    }

    const btnFlip = document.getElementById("btnFcFlip");
    if (btnFlip) {
      btnFlip.addEventListener("click", () => {
        fcFlipped = !fcFlipped;
        if (window.AudioManager) AudioManager.playClick();
        renderFlashcardTab();
      });
    }

    const btnAudio = document.getElementById("btnFcAudio");
    if (btnAudio) {
      btnAudio.addEventListener("click", (e) => {
        e.stopPropagation();
        speak(wordObj.word, btnAudio);
      });
    }

    const btnSpeakEx = document.getElementById("btnFcSpeakEx");
    if (btnSpeakEx) {
      btnSpeakEx.addEventListener("click", (e) => {
        e.stopPropagation();
        speak(wordObj.example, btnSpeakEx);
      });
    }

    const btnPrev = document.getElementById("btnFcPrev");
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (fcIndex > 0) {
          fcIndex--;
          fcFlipped = false;
          if (window.AudioManager) AudioManager.playClick();
          renderFlashcardTab();
        }
      });
    }

    const btnNext = document.getElementById("btnFcNext");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (fcIndex < total - 1) {
          fcIndex++;
          fcFlipped = false;
          if (window.AudioManager) AudioManager.playClick();
          renderFlashcardTab();
        }
      });
    }

    const btnForget = document.getElementById("btnFcForget");
    if (btnForget) {
      btnForget.addEventListener("click", () => {
        recordSRSReview(wordObj.word, false);
        if (window.AudioManager && typeof AudioManager.playBonk === "function") {
          AudioManager.playBonk();
        }
        if (fcIndex < total - 1) {
          fcIndex++;
          fcFlipped = false;
          renderFlashcardTab();
        } else {
          if (window.showToast) showToast("Đã xem hết 25 thẻ vựng đợt này!");
        }
      });
    }

    const btnRemember = document.getElementById("btnFcRemember");
    if (btnRemember) {
      btnRemember.addEventListener("click", () => {
        recordSRSReview(wordObj.word, true);
        if (window.AudioManager) AudioManager.playCandy();
        if (fcIndex < total - 1) {
          fcIndex++;
          fcFlipped = false;
          renderFlashcardTab();
        } else {
          if (window.showToast) showToast("🎉 Chúc mừng Ngọc đã ôn thuộc hết thẻ đợt này!");
        }
      });
    }

    const btnFcStar = document.getElementById("btnFcStar");
    if (btnFcStar) {
      btnFcStar.addEventListener("click", (e) => {
        e.stopPropagation();
        const nowStarred = toggleStarWord(wordObj);
        btnFcStar.classList.toggle("starred", nowStarred);
        btnFcStar.innerHTML = nowStarred ? "⭐ Đã lưu" : "☆ Lưu";
        if (nowStarred) {
          if (window.AudioManager) AudioManager.playCandy();
          if (window.showToast) showToast(`Đã lưu "${wordObj.word}" vào Sổ tay!`);
        } else {
          if (window.showToast) showToast(`Đã bỏ lưu "${wordObj.word}"!`);
        }
      });
    }
  }

  // Tab: Quiz (Trắc Nghiệm)
  function startQuiz() {
    const list = shuffleArray(ENGLISH_DATA[currentLevel] || ENGLISH_DATA.b1);
    const selected = list.slice(0, 5);

    quizQuestions = selected.map((target) => {
      const others = list.filter((w) => w.word !== target.word);
      const wrongOpts = shuffleArray(others).slice(0, 3);
      const options = shuffleArray([target, ...wrongOpts]);
      return { target, options };
    });

    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    renderQuizTab();
  }

  function renderQuizTab() {
    const container = document.getElementById("englishTabContent");
    if (!quizQuestions || quizQuestions.length === 0) {
      startQuiz();
      return;
    }

    if (quizIndex >= quizQuestions.length) {
      renderQuizSummary();
      return;
    }

    const q = quizQuestions[quizIndex];
    quizAnswered = false;

    container.innerHTML = `
      <div class="chinese-quiz-wrap">
        <div class="quiz-progress-track">
          <div class="quiz-progress-fill" style="width: ${((quizIndex + 1) / quizQuestions.length) * 100}%;"></div>
        </div>

        <div class="quiz-header">
          <div class="chinese-level-bar" style="margin-bottom: 0; padding: 0; background: none; border: none; box-shadow: none;">
            <span class="quiz-level-inline">🏷️ Cấp: <strong>${getLevelLabel(currentLevel).split(" ")[0]}</strong></span>
          </div>
          <span class="fc-counter">Câu <strong>${quizIndex + 1}/${quizQuestions.length}</strong></span>
          <span class="fc-counter">🎯 Điểm: <strong>${quizScore}</strong></span>
        </div>

        <div class="quiz-question-card">
          <div class="qq-prompt">Từ tiếng Anh nào mang ý nghĩa dưới đây?</div>
          <div class="qq-meaning-en">"${q.target.meaning}"</div>
          <div class="cwc-badges-row" style="margin-top: 4px;">
            <span class="fc-type-badge">${q.target.type}</span>
          </div>
        </div>

        <div class="quiz-options-grid" id="quizOptionsGrid">
          ${q.options
            .map(
              (opt, idx) => `
            <button class="quiz-opt-btn" data-word="${opt.word}">
              <span class="q-opt-label">${String.fromCharCode(65 + idx)}.</span>
              <span class="q-opt-text"><strong>${opt.word}</strong> <em style="font-size: 11.5px; color: #8c7365; font-weight: normal; margin-left: 4px;">${opt.ipa}</em></span>
            </button>
          `
            )
            .join("")}
        </div>

        <div class="quiz-feedback-box hidden" id="quizFeedback">
          <div id="quizFeedbackText"></div>
          <button class="btn-next-quiz" id="btnNextQuiz">
            ${quizIndex < quizQuestions.length - 1 ? "Câu tiếp theo ▶" : "Xem kết quả 🎉"}
          </button>
        </div>
      </div>
    `;

    container.querySelectorAll(".quiz-opt-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (quizAnswered) return;
        quizAnswered = true;
        const chosen = btn.dataset.word;
        const isRight = chosen === q.target.word;

        if (isRight) {
          quizScore++;
          if (window.AudioManager) AudioManager.playCandy();
          btn.classList.add("btn-correct");
        } else {
          if (window.AudioManager && typeof AudioManager.playBonk === "function") {
            AudioManager.playBonk();
          }
          btn.classList.add("btn-wrong");
          document.querySelectorAll(".quiz-opt-btn").forEach((b) => {
            if (b.dataset.word === q.target.word) b.classList.add("btn-correct");
          });
        }

        recordSRSReview(q.target.word, isRight);
        speak(q.target.word);

        const fbBox = document.getElementById("quizFeedback");
        const fbText = document.getElementById("quizFeedbackText");
        fbText.innerHTML = isRight
          ? `✅ <strong>Chính xác!</strong> ${q.target.word} [${q.target.ipa}]: ${q.target.meaning}`
          : `❌ <strong>Chưa đúng rồi:</strong> ${q.target.word} [${q.target.ipa}] có nghĩa là <strong>${q.target.meaning}</strong>`;
        fbBox.classList.remove("hidden");
      });
    });

    const btnNext = document.getElementById("btnNextQuiz");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        quizIndex++;
        renderQuizTab();
      });
    }
  }

  function renderQuizSummary() {
    const container = document.getElementById("englishTabContent");
    const total = quizQuestions.length;
    const isPerfect = quizScore === total;

    if (quizScore >= 4 && typeof window.addRewards === "function") {
      window.addRewards(8, 2);
    }

    container.innerHTML = `
      <div class="quiz-result-wrap">
        <div class="quiz-result-icon">${isPerfect ? "🏆" : quizScore >= 3 ? "🎉" : "💪"}</div>
        <h3 class="quiz-result-title">${isPerfect ? "Xuất sắc tuyệt đối!" : quizScore >= 3 ? "Làm bài rất tốt!" : "Cố gắng hơn nhé!"}</h3>
        <p class="quiz-score-text">Ngọc đã trả lời đúng <strong>${quizScore}/${total}</strong> câu hỏi (${getLevelLabel(currentLevel)})!</p>
        <p class="quiz-score-reward">${quizScore >= 4 ? "🎁 Thưởng nóng: +2 🍬 Kẹo & +8 XP!" : "Luyện tập mỗi ngày sẽ sớm lên tay nha em yêu!"}</p>
        <div class="quiz-actions-row">
          <button class="btn-summary-action btn-summary-pink" id="btnRetryQuiz">🔄 Làm Lại Ván Mới</button>
          <button class="btn-summary-action btn-summary-cream" id="btnNextLevelQuiz">Đổi Cấp Độ</button>
        </div>
      </div>
    `;

    document.getElementById("btnRetryQuiz").addEventListener("click", () => {
      startQuiz();
    });
    document.getElementById("btnNextLevelQuiz").addEventListener("click", () => {
      currentLevel = currentLevel === "b1" ? "b2" : currentLevel === "b2" ? "c1" : "b1";
      startQuiz();
    });
  }

  // Tab: Match Game (Nối Từ & Nghĩa)
  function startMatchGame() {
    const pool = shuffleArray(ENGLISH_DATA[currentLevel] || ENGLISH_DATA.b1);
    matchWords = pool.slice(0, 5).map((w, idx) => ({ ...w, uid: `m_${idx}_${w.word}` }));
    matchEnCards = matchWords.map((w) => ({ uid: w.uid, word: w.word, ipa: w.ipa })).sort(() => Math.random() - 0.5);
    matchViCards = matchWords.map((w) => ({ uid: w.uid, meaning: w.meaning, type: w.type, word: w.word })).sort(() => Math.random() - 0.5);

    matchSelectedEn = null;
    matchSelectedVi = null;
    matchedIds = new Set();
    matchRewarded = false;
    matchLocked = false;

    renderMatchBoard();
  }

  function renderMatchBoard() {
    const container = document.getElementById("englishTabContent");
    const isCompleted = matchedIds.size === matchWords.length && matchWords.length > 0;

    if (isCompleted && !matchRewarded) {
      matchRewarded = true;
      if (window.AudioManager) AudioManager.playCelebration();
      if (typeof window.addRewards === "function") {
        window.addRewards(6, 1);
      }
      if (window.showToast) {
        showToast("🎉 Nối chuẩn cả 5 từ tiếng Anh: +1 🍬 & +6 XP!");
      }
    }

    if (isCompleted) {
      container.innerHTML = `
        <div class="chinese-match-wrap">
          <div class="quiz-result-wrap match-result-wrap">
            <div class="quiz-result-icon">🧩</div>
            <h3 class="quiz-result-title">Ghép Đôi Hoàn Hảo!</h3>
            <p class="quiz-score-text">Ngọc đã nối chính xác trọn vẹn <strong>${matchWords.length}/${matchWords.length}</strong> cặp từ (${getLevelLabel(currentLevel)})!</p>
            <p class="quiz-score-reward">🎁 Thưởng: +1 🍬 Kẹo & +6 XP!</p>
            <div class="quiz-actions-row">
              <button class="btn-summary-action btn-summary-pink" id="btnNextMatchRound">Chơi Ván Mới 🧩</button>
              <button class="btn-summary-action btn-summary-cream" id="btnMatchToStarred">Xem Sổ Tay ⭐</button>
            </div>
          </div>
        </div>
      `;
      document.getElementById("btnNextMatchRound").addEventListener("click", startMatchGame);
      document.getElementById("btnMatchToStarred").addEventListener("click", () => switchTab("starred"));
      return;
    }

    let enHtml = "";
    matchEnCards.forEach((c) => {
      const isMatched = matchedIds.has(c.uid);
      const isSelected = matchSelectedEn && matchSelectedEn.uid === c.uid;
      enHtml += `
        <button class="match-card match-card-hanzi ${isMatched ? "matched" : ""} ${isSelected ? "selected" : ""}" data-uid="${c.uid}" ${isMatched ? "disabled" : ""}>
          <span class="mc-hanzi eng-mc-word">${c.word}</span>
          <span class="mc-pinyin">${c.ipa}</span>
          ${isMatched ? `<span class="mc-check">✓ Đã nối</span>` : ""}
        </button>
      `;
    });

    let viHtml = "";
    matchViCards.forEach((c) => {
      const isMatched = matchedIds.has(c.uid);
      const isSelected = matchSelectedVi && matchSelectedVi.uid === c.uid;
      viHtml += `
        <button class="match-card match-card-pinyin ${isMatched ? "matched" : ""} ${isSelected ? "selected" : ""}" data-uid="${c.uid}" ${isMatched ? "disabled" : ""}>
          <span class="mc-meaning">${c.meaning}</span>
          <span class="mc-pinyin">${c.type}</span>
          ${isMatched ? `<span class="mc-check">✓ Đã nối</span>` : ""}
        </button>
      `;
    });

    container.innerHTML = `
      <div class="chinese-match-wrap">
        <div class="quiz-progress-track">
          <div class="quiz-progress-fill" style="width: ${(matchedIds.size / Math.max(1, matchWords.length)) * 100}%"></div>
        </div>

        <div class="chinese-level-bar">
          <div class="clb-left">
            <label for="selectEnglishMatchLevel">🏷️ Cấp:</label>
            <select id="selectEnglishMatchLevel" class="pixel-select">
              <option value="b1" ${currentLevel === "b1" ? "selected" : ""}>B1 (Trung cấp)</option>
              <option value="b2" ${currentLevel === "b2" ? "selected" : ""}>B2 (Trung cao cấp)</option>
              <option value="c1" ${currentLevel === "c1" ? "selected" : ""}>C1 (Nâng cao)</option>
            </select>
          </div>
          <div class="clb-right">
            <span class="fc-counter">🧩 <strong>${matchedIds.size}/${matchWords.length}</strong></span>
            <button class="btn-dict" id="btnNewMatchRoundEn" title="Đổi sang 5 từ khác">🎲 Đổi ván</button>
          </div>
        </div>

        <div class="match-columns-grid">
          <div class="match-col match-col-left">
            <div class="match-col-title"><svg class="flag-uk flag-uk-sm" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="60" height="40" fill="#012169" rx="3"/><clipPath id="uk-flag-clip-mg"><rect width="60" height="40" rx="3"/></clipPath><g clip-path="url(#uk-flag-clip-mg)"><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" stroke-width="8"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#cf142b" stroke-width="4.5"/><path d="M30,0 v40 M0,20 h60" stroke="#fff" stroke-width="13"/><path d="M30,0 v40 M0,20 h60" stroke="#cf142b" stroke-width="7.5"/></g></svg>Tiếng Anh</div>
            ${enHtml}
          </div>
          <div class="match-col match-col-right">
            <div class="match-col-title"><svg class="flag-vn flag-uk-sm" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="60" height="40" fill="#da251d" rx="3"/><polygon points="30,8 33.7,19.4 45.7,19.4 36,26.4 39.7,37.8 30,30.8 20.3,37.8 24,26.4 14.3,19.4 26.3,19.4" fill="#ff0"/></svg>Nghĩa Tiếng Việt</div>
            ${viHtml}
          </div>
        </div>
      </div>
    `;

    document.getElementById("selectEnglishMatchLevel").addEventListener("change", (e) => {
      currentLevel = e.target.value;
      try {
        localStorage.setItem(STORAGE_KEYS.currentLevel, currentLevel);
      } catch {}
      startMatchGame();
    });

    document.getElementById("btnNewMatchRoundEn").addEventListener("click", () => {
      if (window.AudioManager) AudioManager.playClick();
      startMatchGame();
    });

    container.querySelectorAll(".match-card-hanzi").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (matchLocked) return;
        const uid = btn.dataset.uid;
        if (matchedIds.has(uid)) return;
        matchSelectedEn = matchEnCards.find((c) => c.uid === uid);
        if (window.AudioManager) AudioManager.playClick();
        checkMatchAttempt();
      });
    });

    container.querySelectorAll(".match-card-pinyin").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (matchLocked) return;
        const uid = btn.dataset.uid;
        if (matchedIds.has(uid)) return;
        matchSelectedVi = matchViCards.find((c) => c.uid === uid);
        if (window.AudioManager) AudioManager.playClick();
        checkMatchAttempt();
      });
    });
  }

  function checkMatchAttempt() {
    if (!matchSelectedEn || !matchSelectedVi) {
      renderMatchBoard();
      return;
    }

    const isCorrect = matchSelectedEn.uid === matchSelectedVi.uid;
    const targetWord = matchWords.find((w) => w.uid === matchSelectedEn.uid);

    if (isCorrect) {
      matchedIds.add(matchSelectedEn.uid);
      if (window.AudioManager) AudioManager.playCandy();
      if (targetWord) {
        recordSRSReview(targetWord.word, true);
        speak(targetWord.word);
      }
      matchSelectedEn = null;
      matchSelectedVi = null;
      renderMatchBoard();
    } else {
      matchLocked = true;
      if (window.AudioManager && typeof AudioManager.playBonk === "function") {
        AudioManager.playBonk();
      }

      try {
        const eBtn = document.querySelector(`.match-card-hanzi[data-uid="${matchSelectedEn.uid}"]`);
        const vBtn = document.querySelector(`.match-card-pinyin[data-uid="${matchSelectedVi.uid}"]`);
        if (eBtn) eBtn.classList.add("shake-wrong");
        if (vBtn) vBtn.classList.add("shake-wrong");
      } catch {}

      setTimeout(() => {
        matchSelectedEn = null;
        matchSelectedVi = null;
        matchLocked = false;
        renderMatchBoard();
      }, 700);
    }
  }

  // Tab: Sổ Tay Của Ngọc (Starred)
  function renderStarredTab() {
    const container = document.getElementById("englishTabContent");
    const allStarred = getStarredList();

    let filtered = allStarred;
    if (starredFilter !== "all") {
      filtered = filtered.filter((item) => (item.level || "b1") === starredFilter);
    }
    if (starredSearchQuery.trim()) {
      const q = starredSearchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.word.toLowerCase().includes(q) ||
          item.meaning.toLowerCase().includes(q) ||
          (item.ipa && item.ipa.toLowerCase().includes(q))
      );
    }

    let cardsHtml = "";
    if (filtered.length === 0) {
      cardsHtml = `
        <div class="chinese-empty-starred">
          <div style="font-size: 32px; margin-bottom: 6px;">📖</div>
          <p style="font-weight: 700; color: #5a3825; font-size: 13.5px;">Chưa có từ vựng nào trong mục này</p>
          <p style="font-size: 11.5px; color: #8c7365; margin: 8px 0;">Em chỉ cần bấm nút <strong>☆ Lưu</strong> ở các bài học để lưu lại ôn luyện nhé!</p>
          <button class="btn-empty-action" id="btnGoToDailyEn">🎯 Đến Học 5 Từ Hôm Nay</button>
        </div>
      `;
    } else {
      filtered.forEach((wordObj) => {
        const cambridgeUrl = `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(wordObj.word.toLowerCase())}`;
        cardsHtml += `
          <div class="chinese-word-card english-word-card" data-word="${wordObj.word}">
            <div class="cwc-top">
              <div class="cwc-hanzi-wrap">
                <span class="eng-word-title">${wordObj.word}</span>
                <span class="eng-word-ipa">${wordObj.ipa}</span>
                <span class="cwc-type">${wordObj.type || ""}</span>
                <span class="cwc-tag-level">${wordObj.level ? wordObj.level.toUpperCase() : "B1"}</span>
              </div>
              <div class="cwc-actions">
                <button class="btn-star starred" data-word="${wordObj.word}">⭐ Đã lưu</button>
                <button class="btn-speak" data-text="${wordObj.word}">🔊 Nghe</button>
                <a href="${cambridgeUrl}" target="_blank" rel="noopener noreferrer" class="btn-dict">📖 Cambridge</a>
              </div>
            </div>
            <div class="cwc-meaning">👉 <strong>${wordObj.meaning}</strong></div>
            <div class="cwc-example">
              <span class="cwc-ex-hanzi eng-ex-sentence">"${wordObj.example}"</span>
              <span class="cwc-ex-meaning">💬 ${wordObj.exampleMeaning}</span>
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = `
      <div class="chinese-starred-wrap">
        <div class="chinese-level-bar">
          <div class="clb-left">
            <label for="selectEnglishStarredFilter">Lọc:</label>
            <select id="selectEnglishStarredFilter" class="pixel-select">
              <option value="all" ${starredFilter === "all" ? "selected" : ""}>Tất cả (${allStarred.length})</option>
              <option value="b1" ${starredFilter === "b1" ? "selected" : ""}>B1 (Trung cấp)</option>
              <option value="b2" ${starredFilter === "b2" ? "selected" : ""}>B2 (Trung cao cấp)</option>
              <option value="c1" ${starredFilter === "c1" ? "selected" : ""}>C1 (Nâng cao)</option>
            </select>
          </div>
          ${allStarred.length > 0 ? `<button class="btn-dict" id="btnStarredToFlashcardEn">📇 Ôn Flashcard</button>` : ""}
        </div>

        <div class="chinese-daily-list">
          ${cardsHtml}
        </div>
      </div>
    `;

    document.getElementById("selectEnglishStarredFilter").addEventListener("change", (e) => {
      starredFilter = e.target.value;
      renderStarredTab();
    });

    const btnGoDaily = document.getElementById("btnGoToDailyEn");
    if (btnGoDaily) {
      btnGoDaily.addEventListener("click", () => switchTab("daily"));
    }

    const btnFcStarred = document.getElementById("btnStarredToFlashcardEn");
    if (btnFcStarred) {
      btnFcStarred.addEventListener("click", () => {
        fcWords = filtered.length > 0 ? filtered : allStarred;
        fcIndex = 0;
        fcFlipped = false;
        switchTab("flashcard");
      });
    }

    container.querySelectorAll(".btn-speak").forEach((btn) => {
      btn.addEventListener("click", () => speak(btn.dataset.text, btn));
    });

    container.querySelectorAll(".btn-star").forEach((btn) => {
      btn.addEventListener("click", () => {
        const word = btn.dataset.word;
        const target = allStarred.find((item) => item.word === word);
        if (target) {
          toggleStarWord(target);
          renderStarredTab();
        }
      });
    });
  }

  // Tab: Lời Yêu Thương (Love Quotes)
  function renderLoveTab() {
    const container = document.getElementById("englishTabContent");
    const list = ENGLISH_DATA.love;

    let itemsHtml = "";
    list.forEach((item, idx) => {
      itemsHtml += `
        <div class="love-quote-card">
          <div class="lqc-top">
            <span class="lqc-badge">💕 Câu #${idx + 1}</span>
            <div class="lqc-actions">
              <button class="btn-speak" data-text="${item.quote}">🔊 Nghe</button>
              <button class="btn-dict btn-copy" data-copy="&ldquo;${item.quote}&rdquo; &mdash; ${item.meaning}">📋 Sao chép</button>
            </div>
          </div>
          <div class="lqc-quote-en">"${item.quote}"</div>
          <div class="lqc-author-en">— ${item.author}</div>
          <div class="lqc-meaning">💬 ${item.meaning}</div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="chinese-daily-list love-quotes-list">
        ${itemsHtml}
      </div>
    `;

    container.querySelectorAll(".btn-speak").forEach((btn) => {
      btn.addEventListener("click", () => speak(btn.dataset.text, btn));
    });

    container.querySelectorAll(".btn-copy").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.copy;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            if (window.showToast) showToast("Đã sao chép lời yêu thương vào bộ nhớ tạm! 💕");
          }).catch(() => {
            if (window.showToast) showToast(text);
          });
        } else {
          if (window.showToast) showToast(text);
        }
      });
    });
  }

  function switchTab(tabKey) {
    currentTab = tabKey;
    document.querySelectorAll(".english-nav-tab").forEach((tab) => {
      if (tab.dataset.tab === tabKey) tab.classList.add("active");
      else tab.classList.remove("active");
    });

    if (tabKey === "daily") renderDailyTab();
    else if (tabKey === "flashcard") startFlashcards();
    else if (tabKey === "quiz") startQuiz();
    else if (tabKey === "match") startMatchGame();
    else if (tabKey === "starred") renderStarredTab();
    else if (tabKey === "love") renderLoveTab();
  }

  function open() {
    const modal = document.getElementById("modalEnglish");
    if (modal) {
      modal.classList.remove("hidden");
      switchTab(currentTab);
    }
  }

  function close() {
    const modal = document.getElementById("modalEnglish");
    if (modal) {
      modal.classList.add("hidden");
      stopAllSpeech();
    }
  }

  function init() {
    try {
      const savedLevel = localStorage.getItem(STORAGE_KEYS.currentLevel);
      if (savedLevel && (savedLevel === "b1" || savedLevel === "b2" || savedLevel === "c1")) {
        currentLevel = savedLevel;
      }
      const savedOffset = localStorage.getItem(STORAGE_KEYS.dailySetOffset);
      if (savedOffset) dailySetOffset = parseInt(savedOffset, 10) || 0;
    } catch {}

    document.querySelectorAll(".english-nav-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        if (window.AudioManager) AudioManager.playClick();
        switchTab(tab.dataset.tab);
      });
    });
  }

  return {
    init,
    open,
    close,
    switchTab,
    speak,
    isWordStarred
  };
})();
