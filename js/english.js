// English B1-C1 Learning App for Sun & Ngoc
window.EnglishApp = (() => {
  const ENGLISH_DATA = {
    "b1": [
        {
            "word": "serendipity",
            "ipa": "/ˌser.ənˈdɪp.ə.t̬i/",
            "type": "Danh từ",
            "meaning": "Sự tình cờ may mắn, duyên kỳ ngộ bất ngờ",
            "example": "Meeting Ngoc on a gentle autumn afternoon was the sweetest serendipity of my entire life.",
            "exampleMeaning": "Gặp được Ngọc vào một chiều thu dịu dàng là mối duyên kỳ ngộ ngọt ngào nhất cả cuộc đời anh."
        },
        {
            "word": "epiphany",
            "ipa": "/ɪˈpɪf.ən.i/",
            "type": "Danh từ",
            "meaning": "Khoảnh khắc giác ngộ, sự bừng sáng nhận thức",
            "example": "In a sudden epiphany, he realized that true happiness was simply making her smile each day.",
            "exampleMeaning": "Trong một khoảnh khắc bừng sáng nhận thức, anh nhận ra hạnh phúc đích thực chỉ đơn giản là khiến em mỉm cười mỗi ngày."
        },
        {
            "word": "ambivalent",
            "ipa": "/æmˈbɪv.ə.lənt/",
            "type": "Tính từ",
            "meaning": "Cảm xúc mâu thuẫn, giằng xé hai chiều",
            "example": "She felt ambivalent about leaving her hometown, torn between career ambition and missing him.",
            "exampleMeaning": "Cô cảm thấy giằng xé khi rời quê nhà, vừa ấp ủ hoài bão sự nghiệp vừa day dứt nỗi nhớ anh."
        },
        {
            "word": "ubiquitous",
            "ipa": "/juːˈbɪk.wə.t̬əs/",
            "type": "Tính từ",
            "meaning": "Hiện diện khắp mọi nơi, phổ biến rộng rãi",
            "example": "Her sweet fragrance seemed ubiquitous in the small apartment, lingering long after she left.",
            "exampleMeaning": "Hương thơm dịu ngọt của em dường như hiện diện khắp căn phòng nhỏ, vương vấn mãi sau khi em rời đi."
        },
        {
            "word": "meticulous",
            "ipa": "/məˈtɪk.jə.ləs/",
            "type": "Tính từ",
            "meaning": "Tỉ mỉ, cẩn trọng, chu đáo từng tiểu tiết",
            "example": "Khanh kept a meticulous diary of every train ticket and shared date between Hanoi and Hai Phong.",
            "exampleMeaning": "Khánh cẩn thận ghi chép tỉ mỉ từng tấm vé tàu và những buổi hẹn hò giữa Hà Nội và Hải Phòng."
        },
        {
            "word": "pragmatic",
            "ipa": "/præɡˈmæt̬.ɪk/",
            "type": "Tính từ",
            "meaning": "Thực tế, trọng ứng dụng hơn lý thuyết suông",
            "example": "Despite their romantic hearts, they took a pragmatic approach to saving for their future home.",
            "exampleMeaning": "Dù trái tim đầy lãng mạn, hai đứa vẫn rất thực tế cùng nhau tiết kiệm cho tổ ấm tương lai."
        },
        {
            "word": "eloquent",
            "ipa": "/ˈel.ə.kwənt/",
            "type": "Tính từ",
            "meaning": "Hùng biện, diễn đạt truyền cảm khúc chiết",
            "example": "Her silent tear was more eloquent than any lengthy apology he could ever offer.",
            "exampleMeaning": "Giọt nước mắt lặng thầm của em còn giàu sức gợi cảm hơn bất kỳ lời xin lỗi dài dòng nào anh có thể nói."
        },
        {
            "word": "resilient",
            "ipa": "/rɪˈzɪl.jənt/",
            "type": "Tính từ",
            "meaning": "Kiên cường, bền bỉ vượt nghịch cảnh",
            "example": "Their resilient affection never wavered despite the miles separating Hanoi from Hai Phong.",
            "exampleMeaning": "Tình yêu kiên cường của hai người chưa bao giờ lay chuyển trước những dặm đường cách trở."
        },
        {
            "word": "clandestine",
            "ipa": "/klænˈdes.tɪn/",
            "type": "Tính từ",
            "meaning": "Kín đáo, bí mật, giữ kín ý nhị",
            "example": "They shared a clandestine glance across the crowded study hall, communicating without words.",
            "exampleMeaning": "Họ trao nhau ánh nhìn kín đáo giữa phòng tự học đông đúc, hiểu thấu nhau chẳng cần một lời."
        },
        {
            "word": "magnanimous",
            "ipa": "/mæɡˈnæn.ə.məs/",
            "type": "Tính từ",
            "meaning": "Hào hiệp, độ lượng, bao dung cao thượng",
            "example": "Ngoc was magnanimous enough to forgive his clumsiness with a gentle, forgiving chuckle.",
            "exampleMeaning": "Ngọc rất bao dung độ lượng, luôn tha thứ cho sự vụng về của anh bằng một nụ cười khẽ hiền dịu."
        },
        {
            "word": "catharsis",
            "ipa": "/kəˈθɑːr.sɪs/",
            "type": "Danh từ",
            "meaning": "Sự thanh lọc tâm hồn, giải tỏa cảm xúc",
            "example": "Crying softly in his warm embrace brought her an immense sense of emotional catharsis.",
            "exampleMeaning": "Khóc nhẹ trong vòng tay ấm áp của anh đã mang lại cho em sự thanh lọc và nhẹ nhõm tâm hồn vô bờ."
        },
        {
            "word": "juxtaposition",
            "ipa": "/ˌdʒʌk.stə.pəˈzɪʃ.ən/",
            "type": "Danh từ",
            "meaning": "Nghệ thuật đặt cạnh nhau làm bật tương phản",
            "example": "The quiet stillness of the lake offered a poignant juxtaposition to the bustling streets of Hanoi.",
            "exampleMeaning": "Sự tĩnh lặng của mặt hồ tạo nên nét tương phản sâu lắng với phố xá tấp nập của Hà Nội."
        },
        {
            "word": "nonchalant",
            "ipa": "/ˌnɑːn.ʃəˈlɑːnt/",
            "type": "Tính từ",
            "meaning": "Điềm nhiên, thản nhiên, tỏ vẻ bất cần",
            "example": "He attempted a nonchalant posture, though his racing heart betrayed how nervous he truly was.",
            "exampleMeaning": "Anh cố tỏ ra điềm nhiên bất cần, nhưng nhịp tim đập thình thịch đã tố cáo sự hồi hộp bên trong."
        },
        {
            "word": "petrichor",
            "ipa": "/ˈpet.rɪ.kɔːr/",
            "type": "Danh từ",
            "meaning": "Mùi đất ngai ngái dịu mát sau cơn mưa rào",
            "example": "Walking hand in hand through the rain, they inhaled the sweet, soothing scent of petrichor.",
            "exampleMeaning": "Nắm tay nhau dạo bước dưới mưa, hai đứa cùng hít hà mùi đất ngai ngái dịu lành sau cơn mưa rào."
        },
        {
            "word": "tenacious",
            "ipa": "/təˈneɪ.ʃəs/",
            "type": "Tính từ",
            "meaning": "Kiên trì bền bỉ, kiên định không rời",
            "example": "Her tenacious dedication to mastering English linguistics earned immense respect from everyone.",
            "exampleMeaning": "Sự kiên trì bền bỉ của em khi theo đuổi ngôn ngữ Anh khiến mọi người xung quanh hết sức nể phục."
        },
        {
            "word": "conundrum",
            "ipa": "/kəˈnʌn.drəm/",
            "type": "Danh từ",
            "meaning": "Bài toán hóc búa, tình thế nan giải",
            "example": "Balancing rigorous university coursework and long-distance courtship was a delicate conundrum.",
            "exampleMeaning": "Cân bằng giữa lịch học đại học dày đặc và tình yêu xa là một bài toán nan giải đầy tinh tế."
        },
        {
            "word": "lucid",
            "ipa": "/ˈluː.sɪd/",
            "type": "Tính từ",
            "meaning": "Rõ ràng, khúc chiết, sáng suốt minh bạch",
            "example": "Her lucid explanation of linguistic syntax unravelled the most convoluted concepts with ease.",
            "exampleMeaning": "Lời giải thích khúc chiết của em về cú pháp học đã làm sáng tỏ những khái niệm rắc rối nhất một cách dễ dàng."
        },
        {
            "word": "substantiate",
            "ipa": "/səbˈstæn.ʃi.eɪt/",
            "type": "Động từ",
            "meaning": "Chứng minh, củng cố bằng luận cứ xác đáng",
            "example": "His everyday thoughtful gestures substantiate the depth of his devotion far better than words.",
            "exampleMeaning": "Những cử chỉ ân cần mỗi ngày của anh chứng minh cho tình cảm sâu đậm thuyết phục hơn ngàn lời nói."
        },
        {
            "word": "scrutinize",
            "ipa": "/ˈskruː.t̬ən.aɪz/",
            "type": "Động từ",
            "meaning": "Khảo sát cẩn mật, soi xét kỹ lưỡng",
            "example": "She loved to scrutinize English literary translations to discover hidden nuances of meaning.",
            "exampleMeaning": "Em rất thích soi xét tỉ mỉ từng bản dịch văn học Anh để khám phá những sắc thái nghĩa ẩn giấu."
        },
        {
            "word": "paradigm",
            "ipa": "/ˈpær.ə.daɪm/",
            "type": "Danh từ",
            "meaning": "Mô hình mẫu mực, hệ hình chuẩn mực",
            "example": "Their tender relationship served as a shining paradigm of patient, enduring long-distance love.",
            "exampleMeaning": "Chuyện tình êm dịu của hai đứa là một hình mẫu chuẩn mực cho tình yêu xa kiên nhẫn và bền bỉ."
        },
        {
            "word": "panacea",
            "ipa": "/ˌpæn.əˈsiː.ə/",
            "type": "Danh từ",
            "meaning": "Phương thuốc vạn năng, liều thuốc diệu kỳ",
            "example": "Her sweet voice singing soft melodies was the ultimate panacea for his work fatigue.",
            "exampleMeaning": "Giọng hát êm dịu của em chính là liều thuốc diệu kỳ xua tan mọi mỏi mệt công việc của anh."
        },
        {
            "word": "equivocal",
            "ipa": "/ɪˈkwɪv.ə.kəl/",
            "type": "Tính từ",
            "meaning": "Nước đôi, mập mờ, đa nghĩa khó đoán",
            "example": "Her coy smile gave an equivocal answer that left him wondering for hours.",
            "exampleMeaning": "Nụ cười e ấp của em mang lại một câu trả lời nước đôi khiến anh thắc mắc suy ngẫm suốt nhiều giờ."
        },
        {
            "word": "disparate",
            "ipa": "/ˈdɪs.pɚ.ət/",
            "type": "Tính từ",
            "meaning": "Khác biệt bản chất, không thể đồng nhất",
            "example": "They wove together disparate tastes in art and music into a wonderfully harmonious shared world.",
            "exampleMeaning": "Hai đứa đã gắn kết những sở thích nghệ thuật và âm nhạc khác biệt thành một thế giới chung êm ấm."
        },
        {
            "word": "zealous",
            "ipa": "/ˈzel.əs/",
            "type": "Tính từ",
            "meaning": "Nhiệt thành, say mê cuồng nhiệt lý tưởng",
            "example": "She was a zealous scholar of English phonology, analyzing every subtle phonetic shift.",
            "exampleMeaning": "Em là một người học ngữ âm học tiếng Anh đầy nhiệt thành, say mê phân tích từng biến đổi ngữ âm."
        },
        {
            "word": "ineffable",
            "ipa": "/ɪnˈef.ə.bəl/",
            "type": "Tính từ",
            "meaning": "Khôn tả, tuyệt mỹ vượt ngoài ngôn từ",
            "example": "The serene beauty of her eyes watching the sunset stirred an ineffable wonder in his chest.",
            "exampleMeaning": "Vẻ đẹp tĩnh lặng trong đôi mắt em khi ngắm hoàng hôn đã dấy lên trong lòng anh niềm rung động khôn tả."
        }
    ],
    "b2": [
        {
            "word": "perspicacious",
            "ipa": "/ˌpɝː.spəˈkeɪ.ʃəs/",
            "type": "Tính từ",
            "meaning": "Sáng suốt, mẫn tiệp, có tuệ nhãn sắc sảo",
            "example": "Ngoc's perspicacious observations on English prose unlocked deeper interpretations for the entire class.",
            "exampleMeaning": "Những quan sát mẫn tiệp của Ngọc về văn xuôi tiếng Anh đã mở ra những cách hiểu sâu sắc cho cả lớp."
        },
        {
            "word": "equanimity",
            "ipa": "/ˌek.wəˈnɪm.ə.t̬i/",
            "type": "Danh từ",
            "meaning": "Tâm thế bình thản, an nhiên trước sóng gió",
            "example": "He admired her remarkable equanimity in navigating academic pressures with serene grace.",
            "exampleMeaning": "Anh vô cùng ngưỡng mộ tâm thế an nhiên đáng nể của em khi vượt qua áp lực học tập một cách nhẹ nhàng."
        },
        {
            "word": "mellifluous",
            "ipa": "/meˈlɪf.lu.əs/",
            "type": "Tính từ",
            "meaning": "Ngọt ngào êm ái, như rót mật vào tai",
            "example": "Her mellifluous voice over late-night phone calls gently dissolved all anxieties.",
            "exampleMeaning": "Giọng nói êm ái như rót mật của em qua những cuộc gọi đêm khuya đã nhẹ nhàng xua tan mọi âu lo."
        },
        {
            "word": "surreptitious",
            "ipa": "/ˌsɝː.əpˈtɪʃ.əs/",
            "type": "Tính từ",
            "meaning": "Lén lút, vụng trộm một cách ý nhị",
            "example": "He took a surreptitious photo of her lost in reading at the sunlit café corner.",
            "exampleMeaning": "Anh lén chụp một bức ảnh em đang say sưa đọc sách bên góc quán cà phê ngập tràn vạt nắng."
        },
        {
            "word": "fastidious",
            "ipa": "/fæsˈtɪd.i.əs/",
            "type": "Tính từ",
            "meaning": "Kỹ tính, cầu toàn, đòi hỏi chuẩn mực cao",
            "example": "Her fastidious attention to grammatical precision made her an exceptional English editor.",
            "exampleMeaning": "Sự cầu toàn kỹ tính đến từng tiểu tiết ngữ pháp biến em thành một biên tập viên tiếng Anh xuất sắc."
        },
        {
            "word": "alacrity",
            "ipa": "/əˈlæk.rə.t̬i/",
            "type": "Danh từ",
            "meaning": "Sự sốt sắng, hăm hở nhanh nhẹn thiện chí",
            "example": "He accepted her invitation to visit Hai Phong with joyful alacrity.",
            "exampleMeaning": "Anh nhận lời mời về Hải Phòng thăm em với niềm sốt sắng hăm hở ngập tràn niềm vui."
        },
        {
            "word": "obfuscate",
            "ipa": "/ˈɑːb.fə.skeɪt/",
            "type": "Động từ",
            "meaning": "Làm rối rắm, che giấu làm lu mờ bản chất",
            "example": "He refused to obfuscate his true intentions, declaring his genuine devotion with utmost clarity.",
            "exampleMeaning": "Anh không muốn giấu giếm hay nói lời rối rắm, mà bày tỏ tấm lòng chân thành một cách sáng tỏ nhất."
        },
        {
            "word": "idiosyncrasy",
            "ipa": "/ˌɪd.i.oʊˈsɪŋ.krə.si/",
            "type": "Danh từ",
            "meaning": "Nét cá tính riêng độc đáo, thói quen đặc trưng",
            "example": "He cherished every tiny idiosyncrasy of hers, from the way she twirled her pen to her quiet giggles.",
            "exampleMeaning": "Anh nâng niu từng thói quen nhỏ độc đáo của em, từ cách em xoay bút đến tiếng cười khẽ khúc khích."
        },
        {
            "word": "vicarious",
            "ipa": "/vɪˈker.i.əs/",
            "type": "Tính từ",
            "meaning": "Cảm nhận gián tiếp qua trải nghiệm của người khác",
            "example": "Through her vivid letters about English literature lectures, he felt a vicarious thrill of scholarship.",
            "exampleMeaning": "Qua những bức thư sinh động kể về bài giảng văn học Anh, anh cảm nhận được niềm say mê học thuật gián tiếp."
        },
        {
            "word": "cacophony",
            "ipa": "/kəˈkɑː.fə.ni/",
            "type": "Danh từ",
            "meaning": "Tạp âm hỗn độn, thanh âm chói tai hỗn loạn",
            "example": "Amid the street cacophony of rush-hour Hanoi, her whisper was the only sound he attuned to.",
            "exampleMeaning": "Giữa những tạp âm ồn ã của giờ tan tầm Hà Nội, tiếng thì thầm của em là âm thanh duy nhất anh lắng nghe."
        },
        {
            "word": "insidious",
            "ipa": "/ɪnˈsɪd.i.əs/",
            "type": "Tính từ",
            "meaning": "Ngấm ngầm nguy hại, tiềm tàng phá hoại",
            "example": "Doubt is an insidious venom in long-distance love, dispelled only through transparent honesty.",
            "exampleMeaning": "Sự hoài nghi là liều độc dược ngấm ngầm trong tình yêu xa, chỉ có thể hóa giải bằng sự chân thành minh bạch."
        },
        {
            "word": "enervate",
            "ipa": "/ˈen.ɚ.veɪt/",
            "type": "Động từ",
            "meaning": "Làm suy nhược, vắt kiệt sinh lực",
            "example": "A relentless week of thesis writing threatened to enervate her, but his sweet care revived her spirit.",
            "exampleMeaning": "Một tuần miệt mài làm luận văn gần như vắt kiệt sức em, nhưng sự chăm sóc ngọt ngào của anh đã hồi sinh nhuệ khí."
        },
        {
            "word": "epistemic",
            "ipa": "/ˌep.əˈstiː.mɪk/",
            "type": "Tính từ",
            "meaning": "Thuộc về nhận thức luận, nền tảng tri thức",
            "example": "Linguistic philosophy addresses the epistemic foundations of how words construct human reality.",
            "exampleMeaning": "Triết học ngôn ngữ nghiên cứu nền tảng nhận thức luận về cách thức ngôn từ kiến tạo nên thực tại con người."
        },
        {
            "word": "ebullient",
            "ipa": "/ɪˈbʊl.jənt/",
            "type": "Tính từ",
            "meaning": "Sôi nổi, tràn trề sinh khí, hào hứng tột bậc",
            "example": "Her ebullient laughter whenever they reunited lit up the entire train station.",
            "exampleMeaning": "Tiếng cười rạng rỡ đầy sinh khí của em mỗi khi hai đứa hội ngộ đã thắp sáng cả sân ga."
        },
        {
            "word": "supercilious",
            "ipa": "/ˌsuː.pɚˈsɪl.i.əs/",
            "type": "Tính từ",
            "meaning": "Trịch thượng, kiêu kỳ tự mãn coi thường",
            "example": "Despite her brilliant linguistic talents, Ngoc never harbored a supercilious attitude toward peers.",
            "exampleMeaning": "Dù sở hữu tài năng ngôn ngữ xuất sắc, Ngọc chưa bao giờ giữ thái độ kiêu kỳ trịch thượng với bạn bè."
        },
        {
            "word": "sycophant",
            "ipa": "/ˈsɪk.ə.fænt/",
            "type": "Danh từ",
            "meaning": "Kẻ xu nịnh bợ đỡ, kẻ ton hót trục lợi",
            "example": "True love abhors the false flattery of a sycophant, resting solely on unvarnished truth.",
            "exampleMeaning": "Tình yêu đích thực ghét cay ghét đắng sự tâng bốc của kẻ xu nịnh, mà xây đắp trên sự chân thành mộc mạc."
        },
        {
            "word": "sagacious",
            "ipa": "/səˈɡeɪ.ʃəs/",
            "type": "Tính từ",
            "meaning": "Khôn ngoan mẫn tiệp, sáng suốt thấu thị",
            "example": "Her sagacious counsel helped him navigate complex career decisions with absolute peace of mind.",
            "exampleMeaning": "Lời khuyên sáng suốt mẫn tiệp của em đã giúp anh định hướng những quyết định sự nghiệp lớn với sự an tâm tuyệt đối."
        },
        {
            "word": "trenchant",
            "ipa": "/ˈtren.tʃənt/",
            "type": "Tính từ",
            "meaning": "Sắc bén, đanh thép, phê bình sâu sắc gãy gọn",
            "example": "Her trenchant critique of Victorian literary satire impressed even the strictest senior professors.",
            "exampleMeaning": "Bài phê bình sắc bén đanh thép của em về văn học trào phúng thời Victoria đã gây ấn tượng với các giáo sư khó tính nhất."
        },
        {
            "word": "verisimilitude",
            "ipa": "/ˌver.ə.səˈmɪl.ə.tuːd/",
            "type": "Danh từ",
            "meaning": "Tính chân thực như đời sống trong nghệ thuật",
            "example": "A master novelist weaves intimate dialogue to lend the story extraordinary verisimilitude.",
            "exampleMeaning": "Một tiểu thuyết gia bậc thầy luôn trau chuốt lời thoại để thổi vào tác phẩm tính chân thực sống động phi thường."
        },
        {
            "word": "zeitgeist",
            "ipa": "/ˈtsaɪt.ɡaɪst/",
            "type": "Danh từ",
            "meaning": "Tinh thần thời đại, luồng tư tưởng chủ đạo",
            "example": "Understanding the sociolinguistic zeitgeist is essential for analyzing modern language evolution.",
            "exampleMeaning": "Thấu hiểu tinh thần thời đại xã hội ngôn ngữ học là điều cốt lõi để phân tích sự tiến hóa của ngôn ngữ hiện đại."
        },
        {
            "word": "quixotic",
            "ipa": "/kwɪkˈsɑː.t̬ɪk/",
            "type": "Tính từ",
            "meaning": "Hão huyền lãng mạn, lý tưởng hóa ngây thơ",
            "example": "Traveling hundreds of miles just to share a cup of tea might seem quixotic, but to him it was everything.",
            "exampleMeaning": "Đi hàng trăm cây số chỉ để cùng em uống một tách trà có thể vẻ hão huyền, nhưng với anh đó là tất cả."
        },
        {
            "word": "perfunctory",
            "ipa": "/pɚˈfʌŋk.tɚ.i/",
            "type": "Tính từ",
            "meaning": "Chiếu lệ, qua loa đại khái không để tâm",
            "example": "His nightly text was never a perfunctory gesture, but an affectionate outpouring of his whole heart.",
            "exampleMeaning": "Dòng tin nhắn chúc ngủ ngon của anh chưa bao giờ là chiếu lệ, mà là tình cảm đong đầy từ tận đáy lòng."
        },
        {
            "word": "taciturn",
            "ipa": "/ˈtæs.ə.tɝːn/",
            "type": "Tính từ",
            "meaning": "Kín tiếng, ít nói, trầm mặc kiệm lời",
            "example": "Though typically taciturn around strangers, he opened his soul completely when speaking with her.",
            "exampleMeaning": "Dù vốn là người ít nói trầm mặc trước người lạ, anh lại mở rộng lòng mình hoàn toàn khi ở bên em."
        },
        {
            "word": "pernicious",
            "ipa": "/pɚˈnɪʃ.əs/",
            "type": "Tính từ",
            "meaning": "Độc hại ngấm ngầm, tàn phá âm ỉ",
            "example": "Neglect exerts a pernicious toll on any relationship, which is why they nurtured each day with tenderness.",
            "exampleMeaning": "Sự vô tâm gây ra tác hại tàn phá ngấm ngầm trong tình cảm, đó là lý do hai đứa luôn ân cần vun vén mỗi ngày."
        },
        {
            "word": "proclivity",
            "ipa": "/prəˈklɪv.ə.t̬i/",
            "type": "Danh từ",
            "meaning": "Thiên hướng tự nhiên, xu hướng thiên bẩm",
            "example": "From childhood, she exhibited a remarkable proclivity for mastering foreign languages and phonetics.",
            "exampleMeaning": "Ngay từ thuở ấu thơ, em đã bộc lộ thiên hướng thiên bẩm xuất sắc trong việc học ngoại ngữ và ngữ âm học."
        }
    ],
    "c1": [
        {
            "word": "solipsism",
            "ipa": "/ˈsɑː.lɪp.sɪ.zəm/",
            "type": "Danh từ",
            "meaning": "Thuyết duy ngã (cho rằng chỉ bản thân là có thực)",
            "example": "Falling deeply in love rescued him from philosophical solipsism, anchoring his world in her reality.",
            "exampleMeaning": "Tình yêu sâu đậm dành cho em đã cứu rỗi anh khỏi thuyết duy ngã cô độc, neo giữ thế giới anh vào hiện thực bên em."
        },
        {
            "word": "sesquipedalian",
            "ipa": "/ˌses.kwə.pəˈdeɪl.jən/",
            "type": "Tính từ",
            "meaning": "Dài ngoặc; chuộng dùng từ ngữ uyên bác đa âm tiết",
            "example": "As an English major, she delighted in playful sesquipedalian banter that left him playfully bewildered.",
            "exampleMeaning": "Là dân chuyên Ngôn ngữ Anh, em thích thú với những câu đùa dùng từ uyên bác dài ngoằng khiến anh vừa ngơ ngác vừa phì cười."
        },
        {
            "word": "pulchritude",
            "ipa": "/ˈpʌl.krə.tuːd/",
            "type": "Danh từ",
            "meaning": "Nhan sắc kiều diễm tuyệt trần, vẻ đẹp hoàn mỹ",
            "example": "Poets often struggle to capture the ethereal pulchritude of a woman whose soul matches her grace.",
            "exampleMeaning": "Các thi sĩ thường bất lực khi muốn lột tả nhan sắc kiều diễm tuyệt trần của người phụ nữ có tâm hồn thanh tao như em."
        },
        {
            "word": "recalcitrant",
            "ipa": "/rɪˈkæl.sə.trənt/",
            "type": "Tính từ",
            "meaning": "Ngoan cố, bất trị, chống đối kỷ luật cứng nhắc",
            "example": "Even the most recalcitrant heart surrenders when touched by sincere and gentle love.",
            "exampleMeaning": "Ngay cả trái tim ngoan cố bất trị nhất cũng sẽ tan chảy khi chạm vào một tình yêu dịu dàng và chân thành."
        },
        {
            "word": "defenestration",
            "ipa": "/ˌdiː.fen.əˈstreɪ.ʃən/",
            "type": "Danh từ",
            "meaning": "Hành động ném ra ngoài cửa sổ; sự phế truất đột ngột",
            "example": "The historical Prague defenestration remains one of the most eccentric political catalysts in European annals.",
            "exampleMeaning": "Vụ ném người qua cửa sổ thành Praha trong lịch sử vẫn là một trong những ngòi nổ kỳ lạ nhất trong biên niên sử châu Âu."
        },
        {
            "word": "anachronism",
            "ipa": "/əˈnæk.rə.nɪ.zəm/",
            "type": "Danh từ",
            "meaning": "Sự lỗi thời, sự sai lệch niên đại lịch sử",
            "example": "Handwriting passionate love letters in our digital age is a delightful and romantic anachronism.",
            "exampleMeaning": "Viết tay những lá thư tình nồng nàn trong thời đại số là một nét hoài niệm lỗi thời ngọt ngào và lãng mạn."
        },
        {
            "word": "grandiloquent",
            "ipa": "/ɡrænˈdɪl.ə.kwənt/",
            "type": "Tính từ",
            "meaning": "Khoa trương ngôn từ, văn hoa bóng bẩy sáo rỗng",
            "example": "He eschewed grandiloquent speeches, choosing quiet faithfulness over hollow promises.",
            "exampleMeaning": "Anh khước từ những lời thề thốt văn hoa sáo rỗng, chọn sự chung thủy chở che trong lặng thầm."
        },
        {
            "word": "inchoate",
            "ipa": "/ɪnˈkoʊ.eɪt/",
            "type": "Tính từ",
            "meaning": "Mới phôi thai, sơ khai chưa định hình rõ ràng",
            "example": "Their shared dreams began as inchoate whispers over tea, now maturing into concrete lifelong plans.",
            "exampleMeaning": "Ước mơ chung của hai đứa khởi đầu từ những lời thủ thỉ sơ khai bên tách trà, nay đã hóa thành dự định trăm năm."
        },
        {
            "word": "laconic",
            "ipa": "/ləˈkɑː.nɪk/",
            "type": "Tính từ",
            "meaning": "Cô đọng, súc tích, ngắn gọn súc tích kiệm lời",
            "example": "His laconic reply 'Always' carried more emotional weight than a thousand verbose poems.",
            "exampleMeaning": "Câu trả lời cô đọng 'Mãi mãi' của anh mang sức nặng tình cảm hơn ngàn bài thơ hoa mỹ dài dòng."
        },
        {
            "word": "truculent",
            "ipa": "/ˈtrʌk.jə.lənt/",
            "type": "Tính từ",
            "meaning": "Hung hăng, gay gắt khiêu khích thách thức",
            "example": "Her sweet, patient demeanor disarmed his truculent mood after a grueling workday.",
            "exampleMeaning": "Sự dịu dàng kiên nhẫn của em đã làm tan biến vẻ gay gắt bực bội của anh sau một ngày làm việc kiệt sức."
        },
        {
            "word": "vicissitude",
            "ipa": "/vɪˈsɪs.ə.tuːd/",
            "type": "Danh từ",
            "meaning": "Sự thăng trầm dâu bể của số phận cuộc đời",
            "example": "Through every vicissitude of life, having her hand in his was his unwavering compass.",
            "exampleMeaning": "Qua mọi thăng trầm dâu bể của dòng đời, nắm chặt bàn tay em là chiếc la bàn kiên định nhất của anh."
        },
        {
            "word": "apocryphal",
            "ipa": "/əˈpɑː.krə.fəl/",
            "type": "Tính từ",
            "meaning": "Ngụy tác, giai thoại đáng ngờ không có căn cứ",
            "example": "Linguists quickly debunked the apocryphal legend regarding the origins of that Shakespearean idiom.",
            "exampleMeaning": "Các nhà ngôn ngữ học đã nhanh chóng bác bỏ giai thoại ngụy tác về nguồn gốc của thành ngữ thời Shakespeare đó."
        },
        {
            "word": "bellicose",
            "ipa": "/ˈbel.ə.koʊs/",
            "type": "Tính từ",
            "meaning": "Hiếu chiến, say sưa muốn khơi mào tranh đấu",
            "example": "Unlike bellicose debaters, she engaged intellectual disputes with gracious elegance.",
            "exampleMeaning": "Khác với những người tranh biện hiếu chiến, em luôn bước vào các cuộc thảo luận học thuật bằng sự tao nhã đĩnh đạc."
        },
        {
            "word": "chicanery",
            "ipa": "/ʃɪˈkeɪ.nɚ.i/",
            "type": "Danh từ",
            "meaning": "Mánh khóe xảo quyệt, thủ đoạn gian lận tinh vi",
            "example": "Academic integrity demands rigorous honesty, wholly untainted by intellectual chicanery.",
            "exampleMeaning": "Liêm chính học thuật đòi hỏi sự trung thực nghiêm cẩn, tuyệt đối không vướng bụi bặm của những mánh khóe xảo biện."
        },
        {
            "word": "deleterious",
            "ipa": "/ˌdel.əˈtɪr.i.əs/",
            "type": "Tính từ",
            "meaning": "Gây tổn hại âm ỉ, có hại cho tinh thần sức khỏe",
            "example": "Prolonged screen fatigue exerts a deleterious impact on eyesight, so he gently reminded her to rest.",
            "exampleMeaning": "Nhìn màn hình quá lâu gây tổn hại âm ỉ cho mắt, nên anh luôn dịu dàng nhắc em nghỉ ngơi."
        },
        {
            "word": "iconoclast",
            "ipa": "/aɪˈkɑː.nə.klæst/",
            "type": "Danh từ",
            "meaning": "Người phá bỏ thần tượng, đả phá tín điều cổ hủ",
            "example": "Virginia Woolf was a literary iconoclast who dismantled Victorian conventions with stream-of-consciousness.",
            "exampleMeaning": "Virginia Woolf là một nhà cách tân đả phá quy ước văn học Victoria bằng kỹ thuật dòng ý thức độc đáo."
        },
        {
            "word": "lugubrious",
            "ipa": "/luːˈɡuː.bri.əs/",
            "type": "Tính từ",
            "meaning": "Thê lương tang tóc, u sầu quá mức",
            "example": "The mournful violin melody sounded deeply lugubrious until her bright laughter dispelled the gloom.",
            "exampleMeaning": "Giai điệu vĩ cầm vang lên u sầu thê lương cho tới khi tiếng cười trong trẻo của em xua tan bóng tối."
        },
        {
            "word": "panegyric",
            "ipa": "/ˌpæn.əˈdʒɪr.ɪk/",
            "type": "Danh từ",
            "meaning": "Bài tụng ca, lời tán dương nồng nhiệt trang trọng",
            "example": "He penned a tender panegyric celebrating her quiet grace on the anniversary of their first encounter.",
            "exampleMeaning": "Anh đã chắp bút viết bài tụng ca dịu dàng ngợi ca vẻ duyên dáng của em nhân kỷ niệm ngày đầu gặp gỡ."
        },
        {
            "word": "sanguine",
            "ipa": "/ˈsæŋ.ɡwɪn/",
            "type": "Tính từ",
            "meaning": "Lạc quan yêu đời, đầy hy vọng trước tương lai",
            "example": "Her sanguine temperament always brought sunshine into his world, even during gloomy rainy seasons.",
            "exampleMeaning": "Tâm tính lạc quan yêu đời của em luôn mang ánh nắng sưởi ấm thế giới anh, dẫu giữa những mùa mưa ảm đạm."
        },
        {
            "word": "sybarite",
            "ipa": "/ˈsɪb.ə.raɪt/",
            "type": "Danh từ",
            "meaning": "Người chuộng cuộc sống xa hoa thanh lịch hưởng lạc",
            "example": "While not a lavish sybarite, she relished the quiet luxury of warm milk tea, good books, and scented candles.",
            "exampleMeaning": "Dẫu không phải người xa hoa hưởng lạc, em vẫn say mê nét tao nhã bên ly trà sữa ấm, cuốn sách hay và ngọn nến thơm."
        },
        {
            "word": "hubris",
            "ipa": "/ˈhjuː.brɪs/",
            "type": "Danh từ",
            "meaning": "Sự ngạo mạn mù quáng thách thức cả số phận",
            "example": "Greek tragedy warns that mortal hubris inevitably precedes a devastating downfall.",
            "exampleMeaning": "Bi kịch Hy Lạp luôn cảnh tỉnh rằng sự ngạo mạn mù quáng của phàm nhân tất yếu sẽ dẫn tới sự sụp đổ."
        },
        {
            "word": "apotheosis",
            "ipa": "/əˌpɑː.θiˈoʊ.sɪs/",
            "type": "Danh từ",
            "meaning": "Đỉnh cao tuyệt đối, sự thần thánh hóa lý tưởng",
            "example": "Their reunion at the seaside represented the apotheosis of romance after long months of patient yearning.",
            "exampleMeaning": "Cuộc hội ngộ bên bờ biển là đỉnh cao tuyệt mỹ của tình yêu sau bao tháng ngày nhung nhớ đợi chờ."
        },
        {
            "word": "ephemeral",
            "ipa": "/ɪˈfem.ɚ.əl/",
            "type": "Tính từ",
            "meaning": "Phù du ngắn ngủi, sớm nở tối tàn",
            "example": "Seasons and blooming petals are ephemeral, but the vows inscribed in their hearts remain eternal.",
            "exampleMeaning": "Mùa màng và cánh hoa có thể sớm nở tối tàn, nhưng lời thề khắc ghi trong tim hai đứa sẽ mãi trường tồn."
        },
        {
            "word": "chiaroscuro",
            "ipa": "/kiˌɑːr.əˈskjʊr.oʊ/",
            "type": "Danh từ",
            "meaning": "Nghệ thuật tương phản sáng tối trong hội họa & văn học",
            "example": "The chiaroscuro of candlelight across her face rendered her profile enchantingly mysterious.",
            "exampleMeaning": "Nghệ thuật tương phản sáng tối của ánh nến trên gương mặt em khiến góc nghiêng trở nên huyền ảo diệu kỳ."
        },
        {
            "word": "palimpsest",
            "ipa": "/ˈpæl.ɪmp.sest/",
            "type": "Danh từ",
            "meaning": "Bản thảo viết đè nhiều lớp lưu dấu ấn thời gian",
            "example": "The ancient city of Hanoi is a living palimpsest, where colonial villas intertwine with ancient dynastic gates.",
            "exampleMeaning": "Thủ đô Hà Nội như một bản thảo cổ tích lưu dấu nhiều lớp thời gian, nơi những biệt thự cổ đan cài với cổng thành xưa."
        }
    ],
    "love": [
        {
            "quote": "My bounty is as boundless as the sea, my love as deep; the more I give to thee, the more I have, for both are infinite.",
            "author": "William Shakespeare (Romeo and Juliet)",
            "meaning": "Tấm lòng anh rộng lớn tựa biển khơi, tình anh sâu thẳm khôn cùng; càng trao về em, anh lại càng có nhiều hơn, bởi cả hai đều là vô tận."
        },
        {
            "quote": "You must allow me to tell you how ardently I admire and love you.",
            "author": "Jane Austen (Pride and Prejudice)",
            "meaning": "Xin em hãy cho phép anh được giãi bày rằng anh ngưỡng mộ và yêu thương em nồng nàn đến nhường nào."
        },
        {
            "quote": "Whatever our souls are made of, his and mine are the same.",
            "author": "Emily Brontë (Wuthering Heights)",
            "meaning": "Dù cho linh hồn chúng ta được tạo nên từ chất liệu gì, thì tâm hồn anh và em cũng đều cùng một thể đồng điệu."
        },
        {
            "quote": "You have given me the greatest possible happiness. You have been in every way all that anyone could be.",
            "author": "Virginia Woolf (The Letters of Virginia Woolf)",
            "meaning": "Em đã mang lại cho anh niềm hạnh phúc trọn vẹn nhất có thể trên đời. Em là tất cả những gì kỳ diệu nhất mà một người có thể ước mơ."
        },
        {
            "quote": "I cannot exist without you; I am forgetful of everything but seeing you again: my life seems to stop there — I see no further.",
            "author": "John Keats (Letters to Fanny Brawne)",
            "meaning": "Anh không thể tồn tại nếu thiếu em; anh quên hết thảy mọi điều trên trần thế chỉ mong ngày tái ngộ: cuộc đời anh dường như dừng lại nơi ấy — anh chẳng nhìn thấy gì xa hơn em."
        },
        {
            "quote": "He looked at her the way all women want to be looked at by a man.",
            "author": "F. Scott Fitzgerald (The Great Gatsby)",
            "meaning": "Anh nhìn em bằng tất cả sự nâng niu, say đắm và trân quý mà bất kỳ người con gái nào trên đời cũng khát khao được trao gửi."
        },
        {
            "quote": "I have for the first time found what I can truly love — I have found you.",
            "author": "Charlotte Brontë (Jane Eyre)",
            "meaning": "Lần đầu tiên trong cuộc đời này, anh đã tìm thấy điều mà mình có thể toàn tâm yêu thương — anh đã tìm thấy em."
        },
        {
            "quote": "She walks in beauty, like the night of cloudless climes and starry skies; and all that's best of dark and bright meet in her aspect and her eyes.",
            "author": "Lord Byron (She Walks in Beauty)",
            "meaning": "Nàng bước đi trong vẻ đẹp tuyệt mỹ, như đêm hè không gợn mây ngập tràn tinh tú; tất cả những gì tinh khôi nhất của ánh sáng và bóng đêm đều hội tụ nơi nét mặt và ánh mắt nàng."
        },
        {
            "quote": "I carry your heart with me (I carry it in my heart). I am never without it, anywhere I go you go.",
            "author": "E.E. Cummings",
            "meaning": "Anh luôn mang trái tim em bên mình (anh cất giữ nó sâu thẳm trong tim). Chưa phút giây nào anh rời xa nó, bất cứ nơi nào anh tới, em cũng luôn ở bên."
        },
        {
            "quote": "To love oneself is the beginning of a lifelong romance, but to love you is the crowning glory of my existence.",
            "author": "Oscar Wilde (Adaptation)",
            "meaning": "Biết yêu bản thân là khởi đầu của cuộc tình lãng mạn trọn đời, nhưng được yêu thương em mới là vinh quang rực rỡ nhất trong cuộc đời anh."
        },
        {
            "quote": "Between the syntax of my thoughts and the lexicon of my soul, you are the most exquisite stanza ever composed.",
            "author": "Khánh dành tặng Ngọc 💕",
            "meaning": "Giữa những cú pháp suy tư và kho từ vựng nơi tâm hồn anh, em là khổ thơ tinh tế và tuyệt mỹ nhất từng được chắp bút."
        },
        {
            "quote": "No geographical distance between Hanoi and Hai Phong could ever attenuate the resonance of my devotion to you.",
            "author": "Khánh dành tặng Ngọc 💕",
            "meaning": "Không khoảng cách địa lý nào giữa Hà Nội và Hải Phòng có thể làm vơi bớt sự vang vọng của lòng chung thủy anh dành cho em."
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
  let quizRewardDone = false;
  let quizRewardPaid = false;

  // Match game state
  let matchWords = [];
  let matchEnCards = [];
  let matchViCards = [];
  let matchSelectedEn = null;
  let matchSelectedVi = null;
  let matchedIds = new Set();
  let matchRewarded = false;
  let matchRewardPaid = false;
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
        return "B1+ (Học thuật • Tinh tế)";
      case "b2":
        return "C1 (Chuyên sâu • Văn phong cao)";
      case "c1":
        return "C2 (Tinh hoa • Văn học Anh)";
      default:
        return "B1+ (Học thuật • Tinh tế)";
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
              <option value="b1" ${currentLevel === "b1" ? "selected" : ""}>B1+ (Học thuật • Tinh tế)</option>
              <option value="b2" ${currentLevel === "b2" ? "selected" : ""}>C1 (Chuyên sâu • Văn phong cao)</option>
              <option value="c1" ${currentLevel === "c1" ? "selected" : ""}>C2 (Tinh hoa • Văn học Anh)</option>
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
        if (window.GameState) {
          window.GameState.grantStudyReward("daily", 10, 2);
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
              <option value="b1" ${currentLevel === "b1" ? "selected" : ""}>B1+ (Học thuật • Tinh tế)</option>
              <option value="b2" ${currentLevel === "b2" ? "selected" : ""}>C1 (Chuyên sâu • Văn phong cao)</option>
              <option value="c1" ${currentLevel === "c1" ? "selected" : ""}>C2 (Tinh hoa • Văn học Anh)</option>
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
      const sameType = others.filter((w) => w.type === target.type);
      const diffType = others.filter((w) => w.type !== target.type);
      const candidates = [...shuffleArray(sameType), ...shuffleArray(diffType)];
      const wrongOpts = candidates.slice(0, 3);
      const options = shuffleArray([target, ...wrongOpts]);
      return { target, options };
    });

    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    quizRewardDone = false;
    quizRewardPaid = false;
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

    // Reward once per finished round, capped per day by GameState.grantStudyReward.
    if (quizScore >= 4 && !quizRewardDone && window.GameState) {
      quizRewardDone = true;
      quizRewardPaid = window.GameState.grantStudyReward("quiz", 8, 2).granted;
    }

    container.innerHTML = `
      <div class="quiz-result-wrap">
        <div class="quiz-result-icon">${isPerfect ? "🏆" : quizScore >= 3 ? "🎉" : "💪"}</div>
        <h3 class="quiz-result-title">${isPerfect ? "Xuất sắc tuyệt đối!" : quizScore >= 3 ? "Làm bài rất tốt!" : "Cố gắng hơn nhé!"}</h3>
        <p class="quiz-score-text">Ngọc đã trả lời đúng <strong>${quizScore}/${total}</strong> câu hỏi (${getLevelLabel(currentLevel)})!</p>
        <p class="quiz-score-reward">${quizScore >= 4 ? (quizRewardPaid ? "🎁 Thưởng nóng: +2 🍬 Kẹo & +8 XP!" : "Hôm nay em đã nhận đủ thưởng học rồi, mai nhận tiếp nha 💕") : "Luyện tập mỗi ngày sẽ sớm lên tay nha em yêu!"}</p>
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
      matchRewardPaid = false;
      if (window.GameState) {
        matchRewardPaid = window.GameState.grantStudyReward("match", 6, 1).granted;
      }
      if (window.showToast) {
        showToast(matchRewardPaid
          ? "🎉 Nối chuẩn cả 5 từ tiếng Anh: +1 🍬 & +6 XP!"
          : "🎉 Nối chuẩn cả 5 từ! Hôm nay em đã nhận đủ thưởng học rồi, mai nhận tiếp nha 💕");
      }
    }

    if (isCompleted) {
      container.innerHTML = `
        <div class="chinese-match-wrap">
          <div class="quiz-result-wrap match-result-wrap">
            <div class="quiz-result-icon">🧩</div>
            <h3 class="quiz-result-title">Ghép Đôi Hoàn Hảo!</h3>
            <p class="quiz-score-text">Ngọc đã nối chính xác trọn vẹn <strong>${matchWords.length}/${matchWords.length}</strong> cặp từ (${getLevelLabel(currentLevel)})!</p>
            <p class="quiz-score-reward">${matchRewardPaid ? "🎁 Thưởng: +1 🍬 Kẹo & +6 XP!" : "Hôm nay em đã nhận đủ thưởng học rồi, mai nhận tiếp nha 💕"}</p>
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
              <option value="b1" ${currentLevel === "b1" ? "selected" : ""}>B1+ (Học thuật • Tinh tế)</option>
              <option value="b2" ${currentLevel === "b2" ? "selected" : ""}>C1 (Chuyên sâu • Văn phong cao)</option>
              <option value="c1" ${currentLevel === "c1" ? "selected" : ""}>C2 (Tinh hoa • Văn học Anh)</option>
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