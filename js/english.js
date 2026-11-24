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
        },
        {
            "word": "cherish",
            "ipa": "/ˈtʃer.ɪʃ/",
            "type": "Động từ",
            "meaning": "Trân trọng, nâng niu",
            "example": "I cherish every late-night call with Ngoc, even when we are both too sleepy to talk.",
            "exampleMeaning": "Anh trân trọng từng cuộc gọi đêm khuya với Ngọc, kể cả khi cả hai đều buồn ngủ díp mắt."
        },
        {
            "word": "nostalgia",
            "ipa": "/nɑːˈstæl.dʒə/",
            "type": "Danh từ",
            "meaning": "Nỗi hoài niệm, nhớ về quá khứ",
            "example": "The smell of grilled bread fills me with nostalgia for our first walk together in Hai Phong.",
            "exampleMeaning": "Mùi bánh mì nướng làm anh hoài niệm về buổi đi dạo đầu tiên của hai đứa ở Hải Phòng."
        },
        {
            "word": "benevolent",
            "ipa": "/bəˈnev.əl.ənt/",
            "type": "Tính từ",
            "meaning": "Nhân hậu, giàu lòng tốt",
            "example": "Her benevolent heart always finds time to feed the stray cats near her house.",
            "exampleMeaning": "Trái tim nhân hậu của em luôn dành thời gian cho những chú mèo hoang gần nhà ăn."
        },
        {
            "word": "ambiguous",
            "ipa": "/æmˈbɪɡ.ju.əs/",
            "type": "Tính từ",
            "meaning": "Mơ hồ, có thể hiểu theo nhiều cách",
            "example": "Her ambiguous \"ừ\" could mean yes, no, or \"guess what I am thinking\".",
            "exampleMeaning": "Một chữ \"ừ\" mơ hồ của em có thể là có, là không, hoặc là \"đoán xem em đang nghĩ gì\"."
        },
        {
            "word": "diligent",
            "ipa": "/ˈdɪl.ə.dʒənt/",
            "type": "Tính từ",
            "meaning": "Chăm chỉ, cần mẫn",
            "example": "She is so diligent that she reviews her Chinese words even on the bus to work.",
            "exampleMeaning": "Em chăm chỉ đến mức ôn từ vựng tiếng Trung cả trên xe buýt đi làm."
        },
        {
            "word": "empathy",
            "ipa": "/ˈem.pə.θi/",
            "type": "Danh từ",
            "meaning": "Sự thấu cảm, đặt mình vào vị trí người khác",
            "example": "Real empathy is listening to her bad day without rushing to give advice.",
            "exampleMeaning": "Thấu cảm thật sự là lắng nghe ngày tồi tệ của em mà không vội vàng khuyên nhủ."
        },
        {
            "word": "gratitude",
            "ipa": "/ˈɡræt̬.ə.tuːd/",
            "type": "Danh từ",
            "meaning": "Lòng biết ơn",
            "example": "I write down one thing every night that fills me with gratitude, and it is usually her.",
            "exampleMeaning": "Mỗi tối anh ghi lại một điều khiến anh biết ơn, và thường thì đó là em."
        },
        {
            "word": "profound",
            "ipa": "/prəˈfaʊnd/",
            "type": "Tính từ",
            "meaning": "Sâu sắc, sâu đậm",
            "example": "A simple \"đi đường cẩn thận nha\" from her has a profound effect on my whole day.",
            "exampleMeaning": "Một câu \"đi đường cẩn thận nha\" giản dị của em có ảnh hưởng sâu sắc đến cả ngày của anh."
        },
        {
            "word": "reminisce",
            "ipa": "/ˌrem.əˈnɪs/",
            "type": "Động từ",
            "meaning": "Hồi tưởng, ôn lại kỷ niệm",
            "example": "We like to reminisce about the rainy evening we got lost looking for bánh đa cua.",
            "exampleMeaning": "Hai đứa thích ôn lại buổi tối mưa lạc đường đi tìm bánh đa cua."
        },
        {
            "word": "tranquil",
            "ipa": "/ˈtræŋ.kwəl/",
            "type": "Tính từ",
            "meaning": "Yên bình, tĩnh lặng",
            "example": "Sitting by the tranquil lake, we forgot all about our deadlines.",
            "exampleMeaning": "Ngồi bên hồ nước yên bình, hai đứa quên sạch mọi hạn chót công việc."
        },
        {
            "word": "vulnerable",
            "ipa": "/ˈvʌl.nɚ.ə.bəl/",
            "type": "Tính từ",
            "meaning": "Dễ tổn thương, yếu lòng",
            "example": "It takes courage to be vulnerable and say \"I miss you\" first.",
            "exampleMeaning": "Phải can đảm lắm mới dám yếu lòng mà nói \"anh nhớ em\" trước."
        },
        {
            "word": "wholehearted",
            "ipa": "/ˌhoʊlˈhɑːr.t̬ɪd/",
            "type": "Tính từ",
            "meaning": "Hết lòng, toàn tâm toàn ý",
            "example": "She has my wholehearted support in every exam she takes.",
            "exampleMeaning": "Em có sự ủng hộ hết lòng của anh trong mọi kỳ thi em tham gia."
        },
        {
            "word": "endeavor",
            "ipa": "/ɪnˈdev.ɚ/",
            "type": "Danh từ",
            "meaning": "Sự nỗ lực, công cuộc cố gắng",
            "example": "Learning two languages at once is a huge endeavor, and she is doing it beautifully.",
            "exampleMeaning": "Học hai ngoại ngữ cùng lúc là một nỗ lực lớn, và em đang làm điều đó thật tuyệt."
        },
        {
            "word": "inevitable",
            "ipa": "/ɪˈnev.ə.t̬ə.bəl/",
            "type": "Tính từ",
            "meaning": "Không thể tránh khỏi, tất yếu",
            "example": "Falling for her smile was inevitable from the very first video call.",
            "exampleMeaning": "Việc say nụ cười của em là điều không thể tránh khỏi ngay từ cuộc gọi video đầu tiên."
        },
        {
            "word": "compassion",
            "ipa": "/kəmˈpæʃ.ən/",
            "type": "Danh từ",
            "meaning": "Lòng trắc ẩn, lòng thương người",
            "example": "Her compassion shows in the way she treats waiters, strangers and little Bông alike.",
            "exampleMeaning": "Lòng trắc ẩn của em thể hiện qua cách em đối xử với người phục vụ, người lạ và cả bé Bông."
        },
        {
            "word": "grateful",
            "ipa": "/ˈɡreɪt.fəl/",
            "type": "Tính từ",
            "meaning": "Biết ơn, cảm kích",
            "example": "I am grateful that Ngoc picked up the phone every single night, even when she was tired.",
            "exampleMeaning": "Anh biết ơn vì đêm nào Ngọc cũng nhấc máy, kể cả khi em mệt."
        },
        {
            "word": "reliable",
            "ipa": "/rɪˈlaɪ.ə.bəl/",
            "type": "Tính từ",
            "meaning": "Đáng tin cậy",
            "example": "Ngoc is the most reliable person I know: if she says she will call at nine, she calls at nine.",
            "exampleMeaning": "Ngọc là người đáng tin cậy nhất anh biết: em bảo chín giờ gọi là đúng chín giờ gọi."
        },
        {
            "word": "curious",
            "ipa": "/ˈkjʊr.i.əs/",
            "type": "Tính từ",
            "meaning": "Tò mò, ham tìm hiểu",
            "example": "Bông is curious about everything, especially the cardboard box in the middle of the floor.",
            "exampleMeaning": "Bông tò mò về mọi thứ, nhất là cái hộp các-tông giữa sàn nhà."
        },
        {
            "word": "confident",
            "ipa": "/ˈkɑːn.fə.dənt/",
            "type": "Tính từ",
            "meaning": "Tự tin",
            "example": "She looked confident on stage, even though her hands were shaking a little.",
            "exampleMeaning": "Em trông thật tự tin trên sân khấu, dù tay vẫn hơi run."
        },
        {
            "word": "generous",
            "ipa": "/ˈdʒen.ɚ.əs/",
            "type": "Tính từ",
            "meaning": "Hào phóng, rộng lượng",
            "example": "You are generous with your time, and you always save the last candy for me.",
            "exampleMeaning": "Em hào phóng với thời gian của mình, và luôn để dành viên kẹo cuối cho anh."
        },
        {
            "word": "patient",
            "ipa": "/ˈpeɪ.ʃənt/",
            "type": "Tính từ",
            "meaning": "Kiên nhẫn",
            "example": "We have to be patient with the distance, but every reunion is worth the wait.",
            "exampleMeaning": "Mình phải kiên nhẫn với khoảng cách, nhưng mỗi lần gặp lại đều đáng để chờ."
        },
        {
            "word": "thoughtful",
            "ipa": "/ˈθɑːt.fəl/",
            "type": "Tính từ",
            "meaning": "Chu đáo, biết quan tâm",
            "example": "It was so thoughtful of you to send soup to my door when I had a cold.",
            "exampleMeaning": "Em chu đáo quá, gửi cả cháo đến tận cửa khi anh bị cảm."
        },
        {
            "word": "sincere",
            "ipa": "/sɪnˈsɪr/",
            "type": "Tính từ",
            "meaning": "Chân thành",
            "example": "Her sincere apology made the whole argument disappear in a minute.",
            "exampleMeaning": "Lời xin lỗi chân thành của em làm cả cuộc cãi vã tan biến trong một phút."
        },
        {
            "word": "cozy",
            "ipa": "/ˈkoʊ.zi/",
            "type": "Tính từ",
            "meaning": "Ấm cúng, dễ chịu",
            "example": "Our little room feels so cozy when it rains outside and the lights are low.",
            "exampleMeaning": "Căn phòng nhỏ của mình thật ấm cúng khi ngoài trời mưa và đèn thì dịu."
        },
        {
            "word": "adore",
            "ipa": "/əˈdɔːr/",
            "type": "Động từ",
            "meaning": "Yêu mến, quý mến",
            "example": "I adore the way you laugh when you are trying very hard not to.",
            "exampleMeaning": "Anh yêu cách em cười khi đang cố nhịn mà không nhịn nổi."
        },
        {
            "word": "memorable",
            "ipa": "/ˈmem.ɚ.ə.bəl/",
            "type": "Tính từ",
            "meaning": "Đáng nhớ",
            "example": "Our first walk by the lake was the most memorable evening of my whole year.",
            "exampleMeaning": "Buổi đi dạo đầu tiên bên hồ là buổi tối đáng nhớ nhất trong cả năm của anh."
        },
        {
            "word": "inspire",
            "ipa": "/ɪnˈspaɪr/",
            "type": "Động từ",
            "meaning": "Truyền cảm hứng",
            "example": "Your hard work inspires me to open my notebook even when I would rather sleep.",
            "exampleMeaning": "Sự chăm chỉ của em truyền cảm hứng để anh mở vở ra học, dù chỉ muốn đi ngủ."
        },
        {
            "word": "reassure",
            "ipa": "/ˌriː.əˈʃʊr/",
            "type": "Động từ",
            "meaning": "Trấn an, làm yên lòng",
            "example": "She reassured me that the exam would be fine, and somehow I believed her.",
            "exampleMeaning": "Em trấn an anh rằng kỳ thi sẽ ổn thôi, và không hiểu sao anh tin em thật."
        },
        {
            "word": "adventurous",
            "ipa": "/ədˈven.tʃɚ.əs/",
            "type": "Tính từ",
            "meaning": "Thích phiêu lưu, ưa mạo hiểm",
            "example": "Let us be adventurous today and try the street food stall we have never visited.",
            "exampleMeaning": "Hôm nay mình thử phiêu lưu một chút, ăn ở quán vỉa hè mà mình chưa từng ghé nhé."
        },
        {
            "word": "optimistic",
            "ipa": "/ˌɑːp.təˈmɪs.tɪk/",
            "type": "Tính từ",
            "meaning": "Lạc quan",
            "example": "Stay optimistic: the next train to Hai Phong is only a few days away.",
            "exampleMeaning": "Cứ lạc quan nhé em: chuyến tàu tiếp theo đến Hải Phòng chỉ còn vài ngày nữa thôi."
        },
        {
            "word": "treasure",
            "ipa": "/ˈtreʒ.ɚ/",
            "type": "Động từ",
            "meaning": "Quý như báu vật, giữ gìn",
            "example": "I treasure every little note you hide in the candy jar.",
            "exampleMeaning": "Anh quý như báu vật từng mẩu giấy nhỏ em giấu trong hũ kẹo."
        },
        {
            "word": "genuine",
            "ipa": "/ˈdʒen.ju.ɪn/",
            "type": "Tính từ",
            "meaning": "Chân thật, không giả tạo",
            "example": "Her smile is always genuine, and that is why everyone trusts her.",
            "exampleMeaning": "Nụ cười của em lúc nào cũng chân thật, nên ai cũng tin em."
        },
        {
            "word": "reunion",
            "ipa": "/riːˈjuːn.jən/",
            "type": "Danh từ",
            "meaning": "Cuộc đoàn tụ, buổi gặp lại",
            "example": "Every reunion at the station feels like the very first one.",
            "exampleMeaning": "Lần gặp lại nào ở nhà ga cũng giống như lần đầu tiên."
        },
        {
            "word": "loyalty",
            "ipa": "/ˈlɔɪ.əl.ti/",
            "type": "Danh từ",
            "meaning": "Lòng chung thủy, sự trung thành",
            "example": "Their loyalty to each other has easily survived a hundred kilometers of distance.",
            "exampleMeaning": "Lòng chung thủy của họ dành cho nhau đã dễ dàng vượt qua một trăm cây số xa cách."
        },
        {
            "word": "cheerful",
            "ipa": "/ˈtʃɪr.fəl/",
            "type": "Tính từ",
            "meaning": "Vui vẻ, tươi tắn",
            "example": "One cheerful good-morning message can brighten the whole day.",
            "exampleMeaning": "Chỉ một tin nhắn chào buổi sáng vui vẻ cũng đủ làm sáng bừng cả ngày."
        },
        {
            "word": "affectionate",
            "ipa": "/əˈfek.ʃən.ət/",
            "type": "Tính từ",
            "meaning": "Trìu mến, giàu tình cảm",
            "example": "Bông is always affectionate when Ngọc comes home.",
            "exampleMeaning": "Bông lúc nào cũng quấn quýt trìu mến mỗi khi Ngọc về nhà."
        },
        {
            "word": "considerate",
            "ipa": "/kənˈsɪd.ɚ.ət/",
            "type": "Tính từ",
            "meaning": "Chu đáo, biết nghĩ cho người khác",
            "example": "It was considerate of you to text me before you slept.",
            "exampleMeaning": "Em thật chu đáo khi nhắn cho anh trước lúc đi ngủ."
        },
        {
            "word": "encourage",
            "ipa": "/ɪnˈkɝː.ɪdʒ/",
            "type": "Động từ",
            "meaning": "Động viên, khích lệ",
            "example": "I always encourage Ngọc to practise a little English every day.",
            "exampleMeaning": "Anh luôn động viên Ngọc luyện tiếng Anh một chút mỗi ngày."
        },
        {
            "word": "honest",
            "ipa": "/ˈɑː.nɪst/",
            "type": "Tính từ",
            "meaning": "Thật thà, trung thực",
            "example": "Be honest: did you eat the last piece of my bánh mì?",
            "exampleMeaning": "Nói thật đi: em ăn miếng bánh mì cuối của anh rồi phải không?"
        },
        {
            "word": "journey",
            "ipa": "/ˈdʒɝː.ni/",
            "type": "Danh từ",
            "meaning": "Chuyến đi, hành trình",
            "example": "The journey from Hà Nội to Hải Phòng feels shorter when I think of you.",
            "exampleMeaning": "Chuyến đi từ Hà Nội xuống Hải Phòng như ngắn lại khi anh nghĩ về em."
        },
        {
            "word": "miss",
            "ipa": "/mɪs/",
            "type": "Động từ",
            "meaning": "Nhớ (một người)",
            "example": "I miss you a little more every evening.",
            "exampleMeaning": "Mỗi tối anh lại nhớ em thêm một chút."
        },
        {
            "word": "surprise",
            "ipa": "/sɚˈpraɪz/",
            "type": "Danh từ",
            "meaning": "Sự bất ngờ, món quà bất ngờ",
            "example": "I have a little surprise for you this weekend.",
            "exampleMeaning": "Cuối tuần này anh có một bất ngờ nho nhỏ cho em."
        },
        {
            "word": "comfort",
            "ipa": "/ˈkʌm.fɚt/",
            "type": "Động từ",
            "meaning": "An ủi, vỗ về",
            "example": "Let me comfort you whenever you feel sad.",
            "exampleMeaning": "Để anh vỗ về em mỗi khi em thấy buồn nha."
        },
        {
            "word": "promise",
            "ipa": "/ˈprɑː.mɪs/",
            "type": "Danh từ",
            "meaning": "Lời hứa",
            "example": "A promise is a promise, so I will be there on Saturday.",
            "exampleMeaning": "Đã hứa là phải giữ lời, nên thứ Bảy anh sẽ có mặt."
        },
        {
            "word": "appreciate",
            "ipa": "/əˈpriː.ʃi.eɪt/",
            "type": "Động từ",
            "meaning": "Trân trọng, đánh giá cao",
            "example": "I really appreciate the little notes you leave me.",
            "exampleMeaning": "Anh rất trân trọng những lời nhắn nhỏ em để lại cho anh."
        },
        {
            "word": "adorable",
            "ipa": "/əˈdɔːr.ə.bəl/",
            "type": "Tính từ",
            "meaning": "Đáng yêu",
            "example": "Your sleepy face in the morning is adorable.",
            "exampleMeaning": "Gương mặt ngái ngủ buổi sáng của em đáng yêu lắm."
        },
        {
            "word": "calm",
            "ipa": "/kɑːm/",
            "type": "Tính từ",
            "meaning": "Bình tĩnh, điềm tĩnh",
            "example": "Stay calm, the exam is easier than you think.",
            "exampleMeaning": "Bình tĩnh nha em, bài thi dễ hơn em nghĩ đó."
        },
        {
            "word": "forgive",
            "ipa": "/fɚˈɡɪv/",
            "type": "Động từ",
            "meaning": "Tha thứ",
            "example": "Please forgive me for replying so late again.",
            "exampleMeaning": "Em tha lỗi cho anh vì lại trả lời tin nhắn muộn nha."
        },
        {
            "word": "habit",
            "ipa": "/ˈhæb.ɪt/",
            "type": "Danh từ",
            "meaning": "Thói quen",
            "example": "Drinking a glass of water every morning is a good habit.",
            "exampleMeaning": "Uống một cốc nước mỗi sáng là một thói quen tốt."
        },
        {
            "word": "hug",
            "ipa": "/hʌɡ/",
            "type": "Danh từ",
            "meaning": "Cái ôm",
            "example": "I owe you a very long hug when we meet.",
            "exampleMeaning": "Gặp nhau anh nợ em một cái ôm thật lâu."
        },
        {
            "word": "laughter",
            "ipa": "/ˈlæf.tɚ/",
            "type": "Danh từ",
            "meaning": "Tiếng cười",
            "example": "Your laughter is my favourite sound in the world.",
            "exampleMeaning": "Tiếng cười của em là âm thanh anh thích nhất trên đời."
        },
        {
            "word": "peaceful",
            "ipa": "/ˈpiːs.fəl/",
            "type": "Tính từ",
            "meaning": "Thanh bình, êm đềm",
            "example": "Sunday mornings with you feel so peaceful.",
            "exampleMeaning": "Những sáng Chủ nhật bên em thật êm đềm."
        },
        {
            "word": "support",
            "ipa": "/səˈpɔːrt/",
            "type": "Động từ",
            "meaning": "Ủng hộ, hỗ trợ",
            "example": "I will always support your dreams, big or small.",
            "exampleMeaning": "Anh sẽ luôn ủng hộ ước mơ của em, dù lớn hay nhỏ."
        },
        {
            "word": "homesick",
            "ipa": "/ˈhoʊm.sɪk/",
            "type": "Tính từ",
            "meaning": "Nhớ nhà",
            "example": "Ngọc felt homesick during her first week in a new city.",
            "exampleMeaning": "Ngọc thấy nhớ nhà trong tuần đầu ở thành phố mới."
        },
        {
            "word": "kindness",
            "ipa": "/ˈkaɪnd.nəs/",
            "type": "Danh từ",
            "meaning": "Lòng tốt, sự tử tế",
            "example": "Your kindness makes everyone around you smile.",
            "exampleMeaning": "Sự tử tế của em làm mọi người xung quanh đều mỉm cười."
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
        },
        {
            "word": "effervescent",
            "ipa": "/ˌef.ɚˈves.ənt/",
            "type": "Tính từ",
            "meaning": "Sôi nổi, rạng rỡ tràn đầy sức sống",
            "example": "Her effervescent laugh can turn a grey Monday into a holiday.",
            "exampleMeaning": "Tiếng cười rạng rỡ của em có thể biến một ngày thứ Hai xám xịt thành ngày lễ."
        },
        {
            "word": "halcyon",
            "ipa": "/ˈhæl.si.ən/",
            "type": "Tính từ",
            "meaning": "Êm đềm, thanh bình (thường nói về quãng thời gian hạnh phúc đã qua)",
            "example": "We still talk about the halcyon days of our first summer together.",
            "exampleMeaning": "Hai đứa vẫn hay nhắc về những ngày êm đềm của mùa hè đầu tiên bên nhau."
        },
        {
            "word": "incandescent",
            "ipa": "/ˌɪn.kænˈdes.ənt/",
            "type": "Tính từ",
            "meaning": "Rực sáng, bừng cháy (nghĩa bóng: mãnh liệt)",
            "example": "Her smile was incandescent when she finally passed the HSK exam.",
            "exampleMeaning": "Nụ cười của em bừng sáng khi cuối cùng cũng thi đỗ HSK."
        },
        {
            "word": "luminous",
            "ipa": "/ˈluː.mə.nəs/",
            "type": "Tính từ",
            "meaning": "Sáng ngời, phát sáng dịu dàng",
            "example": "Her eyes looked luminous under the paper lanterns of the old town.",
            "exampleMeaning": "Đôi mắt em sáng ngời dưới những chiếc đèn lồng giấy ở phố cổ."
        },
        {
            "word": "reverie",
            "ipa": "/ˈrev.ɚ.i/",
            "type": "Danh từ",
            "meaning": "Sự mơ màng, giấc mộng tưởng giữa ban ngày",
            "example": "Her message pulled me out of a long reverie about our next trip.",
            "exampleMeaning": "Tin nhắn của em kéo anh ra khỏi giấc mơ màng dài về chuyến đi tới của hai đứa."
        },
        {
            "word": "steadfast",
            "ipa": "/ˈsted.fæst/",
            "type": "Tính từ",
            "meaning": "Kiên định, son sắt không lay chuyển",
            "example": "Across the 100 kilometres between Hanoi and Hai Phong, his love stayed steadfast.",
            "exampleMeaning": "Qua 100 cây số giữa Hà Nội và Hải Phòng, tình yêu của anh vẫn son sắt không đổi."
        },
        {
            "word": "ardent",
            "ipa": "/ˈɑːr.dənt/",
            "type": "Tính từ",
            "meaning": "Nồng nhiệt, cháy bỏng, hăng hái",
            "example": "He is an ardent fan of her cooking, especially her spicy bánh mì.",
            "exampleMeaning": "Anh là fan cuồng nhiệt của tài nấu ăn của em, nhất là món bánh mì cay."
        },
        {
            "word": "propitious",
            "ipa": "/prəˈpɪʃ.əs/",
            "type": "Tính từ",
            "meaning": "Thuận lợi, đúng thời điểm, có điềm lành",
            "example": "A sunny Sunday felt like a propitious moment to finally meet her parents.",
            "exampleMeaning": "Một ngày Chủ nhật nắng đẹp có vẻ là thời điểm thuận lợi để cuối cùng cũng ra mắt bố mẹ em."
        },
        {
            "word": "beguile",
            "ipa": "/bɪˈɡaɪl/",
            "type": "Động từ",
            "meaning": "Mê hoặc, quyến rũ (đôi khi để đánh lừa)",
            "example": "She can beguile me into buying milk tea with a single puppy-eyed sticker.",
            "exampleMeaning": "Em có thể mê hoặc anh mua trà sữa chỉ bằng một cái sticker mắt cún con."
        },
        {
            "word": "ineluctable",
            "ipa": "/ˌɪn.ɪˈlʌk.tə.bəl/",
            "type": "Tính từ",
            "meaning": "Tất yếu, không thể cưỡng lại",
            "example": "There was an ineluctable pull that made me open her chat first every morning.",
            "exampleMeaning": "Có một sức hút không thể cưỡng lại khiến mỗi sáng anh đều mở khung chat của em đầu tiên."
        },
        {
            "word": "wistful",
            "ipa": "/ˈwɪst.fəl/",
            "type": "Tính từ",
            "meaning": "Bâng khuâng, man mác nhớ nhung",
            "example": "She gave a wistful look at the train leaving for Hanoi.",
            "exampleMeaning": "Em nhìn theo chuyến tàu về Hà Nội với ánh mắt bâng khuâng."
        },
        {
            "word": "assiduous",
            "ipa": "/əˈsɪdʒ.u.əs/",
            "type": "Tính từ",
            "meaning": "Cần cù, chuyên tâm bền bỉ",
            "example": "Thanks to assiduous practice, her pronunciation of L and N is now perfect.",
            "exampleMeaning": "Nhờ luyện tập bền bỉ, em giờ đã phát âm L và N chuẩn chỉnh."
        },
        {
            "word": "capricious",
            "ipa": "/kəˈprɪʃ.əs/",
            "type": "Tính từ",
            "meaning": "Thất thường, đỏng đảnh khó đoán",
            "example": "Hai Phong weather is as capricious as her mood before lunch.",
            "exampleMeaning": "Thời tiết Hải Phòng thất thường y như tâm trạng của em trước giờ ăn trưa."
        },
        {
            "word": "ameliorate",
            "ipa": "/əˈmiːl.jə.reɪt/",
            "type": "Động từ",
            "meaning": "Cải thiện, làm cho tốt hơn",
            "example": "A warm cup of chrysanthemum tea can ameliorate even her worst headache.",
            "exampleMeaning": "Một cốc trà cúc ấm có thể làm dịu cả những cơn đau đầu tệ nhất của em."
        },
        {
            "word": "felicity",
            "ipa": "/fəˈlɪs.ə.t̬i/",
            "type": "Danh từ",
            "meaning": "Niềm hạnh phúc lớn lao, sự sung sướng",
            "example": "Waking up to her good-morning message is a small daily felicity.",
            "exampleMeaning": "Thức dậy với tin nhắn chào buổi sáng của em là niềm hạnh phúc nhỏ mỗi ngày."
        },
        {
            "word": "nuance",
            "ipa": "/ˈnuː.ɑːns/",
            "type": "Danh từ",
            "meaning": "Sắc thái tinh tế",
            "example": "She catches every nuance in my voice, even over a bad phone line.",
            "exampleMeaning": "Em nghe ra từng sắc thái trong giọng anh, kể cả qua đường dây điện thoại tệ hại."
        },
        {
            "word": "inherent",
            "ipa": "/ɪnˈhɪr.ənt/",
            "type": "Tính từ",
            "meaning": "Vốn có, cố hữu",
            "example": "There is an inherent joy in waiting for her call, even when the wait is long.",
            "exampleMeaning": "Chờ cuộc gọi của em vốn đã có một niềm vui riêng, dù phải chờ lâu."
        },
        {
            "word": "meander",
            "ipa": "/miˈæn.dɚ/",
            "type": "Động từ",
            "meaning": "Đi dạo thong thả, uốn lượn",
            "example": "We meandered through the old streets with no plan and no hurry at all.",
            "exampleMeaning": "Hai đứa thong thả dạo qua những con phố cổ, không kế hoạch, cũng chẳng vội gì."
        },
        {
            "word": "coalesce",
            "ipa": "/ˌkoʊ.əˈles/",
            "type": "Động từ",
            "meaning": "Hòa quyện lại với nhau",
            "example": "Our small habits slowly coalesced into a routine that feels like home.",
            "exampleMeaning": "Những thói quen nhỏ của mình dần hòa quyện thành một nếp sống như một mái nhà."
        },
        {
            "word": "poignant",
            "ipa": "/ˈpɔɪ.njənt/",
            "type": "Tính từ",
            "meaning": "Sâu lắng, nhói lòng (cảm động)",
            "example": "The goodbye at the station was short but poignant.",
            "exampleMeaning": "Lời tạm biệt ở nhà ga ngắn thôi nhưng thật sâu lắng, nhói lòng."
        },
        {
            "word": "tenuous",
            "ipa": "/ˈten.ju.əs/",
            "type": "Tính từ",
            "meaning": "Mong manh, yếu ớt",
            "example": "Distance can make a connection feel tenuous, but ours has never been.",
            "exampleMeaning": "Khoảng cách có thể làm một mối liên kết trở nên mong manh, nhưng mình thì chưa bao giờ."
        },
        {
            "word": "gregarious",
            "ipa": "/ɡrɪˈɡer.i.əs/",
            "type": "Tính từ",
            "meaning": "Hòa đồng, thích giao du",
            "example": "A gregarious crowd filled the café, laughing over tiny cups of coffee.",
            "exampleMeaning": "Một đám đông hòa đồng làm quán cà phê rộn ràng, cười nói bên những tách cà phê bé xíu."
        },
        {
            "word": "elucidate",
            "ipa": "/ɪˈluː.sə.deɪt/",
            "type": "Động từ",
            "meaning": "Làm sáng tỏ, giải thích rõ",
            "example": "Could you elucidate the last grammar rule? I got a little lost.",
            "exampleMeaning": "Em giải thích rõ giúp anh quy tắc ngữ pháp cuối được không? Anh hơi lạc đường rồi."
        },
        {
            "word": "candid",
            "ipa": "/ˈkæn.dɪd/",
            "type": "Tính từ",
            "meaning": "Thẳng thắn, bộc trực",
            "example": "Let me be candid: I miss you more than I ever say out loud.",
            "exampleMeaning": "Anh nói thẳng nhé: anh nhớ em nhiều hơn những gì anh nói thành lời."
        },
        {
            "word": "contemplate",
            "ipa": "/ˈkɑːn.təm.pleɪt/",
            "type": "Động từ",
            "meaning": "Suy ngẫm, chiêm nghiệm",
            "example": "I contemplate our future while the train rattles toward Hai Phong.",
            "exampleMeaning": "Anh ngẫm nghĩ về tương lai của mình khi tàu lắc lư chạy về Hải Phòng."
        },
        {
            "word": "gravitate",
            "ipa": "/ˈɡræv.ə.teɪt/",
            "type": "Động từ",
            "meaning": "Bị cuốn về phía, tự nhiên hướng về",
            "example": "I always gravitate toward the window seat on the way to see you.",
            "exampleMeaning": "Anh luôn tự nhiên chọn ghế cạnh cửa sổ trên đường đi gặp em."
        },
        {
            "word": "exuberant",
            "ipa": "/ɪɡˈzuː.bɚ.ənt/",
            "type": "Tính từ",
            "meaning": "Tràn đầy sức sống, hớn hở",
            "example": "Her exuberant hug at the gate nearly knocked me over.",
            "exampleMeaning": "Cái ôm hớn hở của em ở cổng suýt làm anh ngã."
        },
        {
            "word": "kindle",
            "ipa": "/ˈkɪn.dəl/",
            "type": "Động từ",
            "meaning": "Nhen nhóm, khơi dậy",
            "example": "A single message can kindle hope on the gloomiest of days.",
            "exampleMeaning": "Chỉ một tin nhắn cũng có thể nhen lên hy vọng trong những ngày ảm đạm nhất."
        },
        {
            "word": "reconcile",
            "ipa": "/ˈrek.ən.saɪl/",
            "type": "Động từ",
            "meaning": "Làm lành, hòa giải",
            "example": "We always reconcile before bedtime, however silly the quarrel was.",
            "exampleMeaning": "Mình luôn làm lành trước giờ ngủ, dù cuộc cãi nhau có ngớ ngẩn đến đâu."
        },
        {
            "word": "pensive",
            "ipa": "/ˈpen.sɪv/",
            "type": "Tính từ",
            "meaning": "Trầm tư, đăm chiêu",
            "example": "He looked pensive as he watched the rain slide down the window.",
            "exampleMeaning": "Anh trông trầm tư khi nhìn mưa trượt xuống ô cửa kính."
        },
        {
            "word": "plausible",
            "ipa": "/ˈplɑː.zə.bəl/",
            "type": "Tính từ",
            "meaning": "Nghe có lý, hợp lý",
            "example": "The excuse sounded plausible, but the cat's guilty face said otherwise.",
            "exampleMeaning": "Cái cớ nghe có vẻ hợp lý, nhưng vẻ mặt tội lỗi của con mèo thì nói khác."
        },
        {
            "word": "unwavering",
            "ipa": "/ʌnˈweɪ.vɚ.ɪŋ/",
            "type": "Tính từ",
            "meaning": "Kiên định, không lay chuyển",
            "example": "Your unwavering support carried me through the whole exam season.",
            "exampleMeaning": "Sự ủng hộ kiên định của em đã đưa anh vượt qua cả mùa thi."
        },
        {
            "word": "fortuitous",
            "ipa": "/fɔːrˈtuː.ɪ.təs/",
            "type": "Tính từ",
            "meaning": "Tình cờ may mắn",
            "example": "A fortuitous rain shower made us share one umbrella.",
            "exampleMeaning": "Một cơn mưa rào tình cờ may mắn khiến hai đứa chung một chiếc ô."
        },
        {
            "word": "wanderlust",
            "ipa": "/ˈwɑːn.dɚ.lʌst/",
            "type": "Danh từ",
            "meaning": "Niềm khao khát được đi khắp nơi",
            "example": "Our shared wanderlust keeps adding new places to the list.",
            "exampleMeaning": "Niềm khao khát đi đây đó của hai đứa cứ thêm địa điểm mới vào danh sách."
        },
        {
            "word": "tangible",
            "ipa": "/ˈtæn.dʒə.bəl/",
            "type": "Tính từ",
            "meaning": "Hữu hình, cảm nhận được rõ",
            "example": "Her love felt tangible in every handwritten card she sent.",
            "exampleMeaning": "Tình yêu của em như có thể chạm vào được trong từng tấm thiệp viết tay em gửi."
        },
        {
            "word": "resplendent",
            "ipa": "/rɪˈsplen.dənt/",
            "type": "Tính từ",
            "meaning": "Lộng lẫy, rực rỡ",
            "example": "You looked resplendent in your red áo dài at Tết.",
            "exampleMeaning": "Tết em mặc áo dài đỏ trông thật lộng lẫy."
        },
        {
            "word": "serene",
            "ipa": "/səˈriːn/",
            "type": "Tính từ",
            "meaning": "Thanh thản, điềm đạm",
            "example": "Her serene smile calmed me down before the interview.",
            "exampleMeaning": "Nụ cười thanh thản của em làm anh bình tâm trước buổi phỏng vấn."
        },
        {
            "word": "cajole",
            "ipa": "/kəˈdʒoʊl/",
            "type": "Động từ",
            "meaning": "Dỗ ngọt, nài nỉ",
            "example": "I had to cajole Bông out from under the bed with a treat.",
            "exampleMeaning": "Anh phải dỗ ngọt bằng đồ ăn mới lôi được Bông ra khỏi gầm giường."
        },
        {
            "word": "demure",
            "ipa": "/dɪˈmjʊr/",
            "type": "Tính từ",
            "meaning": "E lệ, nhu mì",
            "example": "She gave a demure smile when I complimented her dress.",
            "exampleMeaning": "Em cười e lệ khi anh khen chiếc váy."
        },
        {
            "word": "endearing",
            "ipa": "/ɪnˈdɪr.ɪŋ/",
            "type": "Tính từ",
            "meaning": "Dễ mến, khiến người ta thương",
            "example": "Your little mix-ups between L and N are oddly endearing.",
            "exampleMeaning": "Mấy lần em lẫn L với N nghe lại dễ thương lạ kỳ."
        },
        {
            "word": "forlorn",
            "ipa": "/fɚˈlɔːrn/",
            "type": "Tính từ",
            "meaning": "Buồn bã, lẻ loi",
            "example": "Bông looked forlorn by the door after you left.",
            "exampleMeaning": "Em đi rồi, Bông ngồi bên cửa trông buồn thiu."
        },
        {
            "word": "indelible",
            "ipa": "/ɪnˈdel.ə.bəl/",
            "type": "Tính từ",
            "meaning": "Không thể phai mờ",
            "example": "Our first date left an indelible memory in my heart.",
            "exampleMeaning": "Buổi hẹn đầu tiên để lại trong tim anh một kỷ niệm không phai."
        },
        {
            "word": "jubilant",
            "ipa": "/ˈdʒuː.bəl.ənt/",
            "type": "Tính từ",
            "meaning": "Hân hoan, mừng rỡ",
            "example": "I was jubilant when you passed your exam.",
            "exampleMeaning": "Anh mừng rỡ khi em thi đỗ."
        },
        {
            "word": "lament",
            "ipa": "/ləˈment/",
            "type": "Động từ",
            "meaning": "Than thở, tiếc nuối",
            "example": "We often lament the distance between our two cities.",
            "exampleMeaning": "Tụi mình hay than thở về khoảng cách giữa hai thành phố."
        },
        {
            "word": "nurture",
            "ipa": "/ˈnɝː.tʃɚ/",
            "type": "Động từ",
            "meaning": "Nuôi dưỡng, vun đắp",
            "example": "We nurture our relationship a little every day.",
            "exampleMeaning": "Mỗi ngày tụi mình lại vun đắp tình cảm thêm một chút."
        },
        {
            "word": "placate",
            "ipa": "/ˈpleɪ.keɪt/",
            "type": "Động từ",
            "meaning": "Xoa dịu, làm nguôi giận",
            "example": "A bowl of bánh đa cua can placate even the grumpiest girlfriend.",
            "exampleMeaning": "Một bát bánh đa cua có thể làm nguôi cả cô người yêu khó tính nhất."
        },
        {
            "word": "rapport",
            "ipa": "/ræˈpɔːr/",
            "type": "Danh từ",
            "meaning": "Sự hòa hợp, ăn ý",
            "example": "We built an easy rapport from our very first chat.",
            "exampleMeaning": "Tụi mình ăn ý với nhau ngay từ lần nói chuyện đầu tiên."
        },
        {
            "word": "reticent",
            "ipa": "/ˈret̬.ə.sənt/",
            "type": "Tính từ",
            "meaning": "Kín đáo, ít bộc lộ",
            "example": "Ngọc is reticent with strangers but hilarious with friends.",
            "exampleMeaning": "Ngọc kín đáo với người lạ nhưng lại cực vui tính với bạn bè."
        },
        {
            "word": "solace",
            "ipa": "/ˈsɑː.lɪs/",
            "type": "Danh từ",
            "meaning": "Niềm an ủi",
            "example": "Your voice is my solace after a long day at work.",
            "exampleMeaning": "Giọng em là niềm an ủi của anh sau một ngày dài làm việc."
        },
        {
            "word": "tenderness",
            "ipa": "/ˈten.dɚ.nəs/",
            "type": "Danh từ",
            "meaning": "Sự dịu dàng, âu yếm",
            "example": "He tucked the blanket around her with great tenderness.",
            "exampleMeaning": "Anh dịu dàng kéo chăn đắp cho em."
        },
        {
            "word": "vivacious",
            "ipa": "/vɪˈveɪ.ʃəs/",
            "type": "Tính từ",
            "meaning": "Hoạt bát, tràn đầy sức sống",
            "example": "Her vivacious personality lights up every room.",
            "exampleMeaning": "Tính cách hoạt bát của em làm căn phòng nào cũng bừng sáng."
        },
        {
            "word": "whimsical",
            "ipa": "/ˈwɪm.zɪ.kəl/",
            "type": "Tính từ",
            "meaning": "Ngộ nghĩnh, hay có ý tưởng kỳ quặc đáng yêu",
            "example": "She has a whimsical habit of naming every mood of our cat.",
            "exampleMeaning": "Em có thói quen ngộ nghĩnh là đặt tên cho từng tâm trạng của con mèo."
        },
        {
            "word": "yearn",
            "ipa": "/jɝːn/",
            "type": "Động từ",
            "meaning": "Khao khát, mong mỏi",
            "example": "I yearn to see you again after this long week.",
            "exampleMeaning": "Sau một tuần dài, anh mong được gặp lại em biết bao."
        },
        {
            "word": "allure",
            "ipa": "/əˈlʊr/",
            "type": "Danh từ",
            "meaning": "Sức quyến rũ",
            "example": "The allure of Đồ Sơn beach at sunset is hard to resist.",
            "exampleMeaning": "Sức quyến rũ của biển Đồ Sơn lúc hoàng hôn thật khó cưỡng."
        },
        {
            "word": "cherubic",
            "ipa": "/tʃəˈruː.bɪk/",
            "type": "Tính từ",
            "meaning": "Bầu bĩnh, dễ thương như thiên thần nhỏ",
            "example": "Bông has a cherubic little face when she sleeps.",
            "exampleMeaning": "Lúc ngủ, Bông có gương mặt bầu bĩnh như thiên thần nhỏ."
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
        },
        {
            "word": "limerence",
            "ipa": "/ˈlɪm.ɚ.əns/",
            "type": "Danh từ",
            "meaning": "Trạng thái say mê, phải lòng ai đó mãnh liệt",
            "example": "In the early months of limerence, he checked his phone every minute for her reply.",
            "exampleMeaning": "Trong những tháng đầu say mê, anh cứ mỗi phút lại xem điện thoại chờ em trả lời."
        },
        {
            "word": "lambent",
            "ipa": "/ˈlæm.bənt/",
            "type": "Tính từ",
            "meaning": "Lung linh, chập chờn dịu nhẹ (ánh sáng)",
            "example": "The lambent glow of the fairy lights made her room look like a dream.",
            "exampleMeaning": "Ánh sáng lung linh của dây đèn nhỏ khiến căn phòng của em như trong mơ."
        },
        {
            "word": "susurrus",
            "ipa": "/suːˈsɝː.əs/",
            "type": "Danh từ",
            "meaning": "Tiếng rì rào, xì xào khẽ khàng",
            "example": "We fell asleep on the call to the susurrus of rain on her window.",
            "exampleMeaning": "Hai đứa ngủ quên trong cuộc gọi giữa tiếng mưa rì rào bên cửa sổ nhà em."
        },
        {
            "word": "eudaimonia",
            "ipa": "/ˌjuː.daɪˈmoʊ.ni.ə/",
            "type": "Danh từ",
            "meaning": "Hạnh phúc viên mãn, sống trọn vẹn (triết học Hy Lạp)",
            "example": "For him, eudaimonia is a quiet evening, a bowl of noodles and her head on his shoulder.",
            "exampleMeaning": "Với anh, hạnh phúc viên mãn là một buổi tối yên ả, bát mì nóng và em tựa đầu vào vai."
        },
        {
            "word": "sempiternal",
            "ipa": "/ˌsem.pɪˈtɝː.nəl/",
            "type": "Tính từ",
            "meaning": "Vĩnh hằng, bất diệt",
            "example": "Poets write of sempiternal love; he just promises to buy her bánh mì forever.",
            "exampleMeaning": "Các nhà thơ viết về tình yêu vĩnh hằng; còn anh chỉ hứa mua bánh mì cho em mãi mãi."
        },
        {
            "word": "numinous",
            "ipa": "/ˈnuː.mə.nəs/",
            "type": "Tính từ",
            "meaning": "Thiêng liêng, huyền nhiệm",
            "example": "Watching the sunrise over Cat Ba together felt almost numinous.",
            "exampleMeaning": "Cùng nhau ngắm bình minh trên Cát Bà mang một cảm giác gần như thiêng liêng."
        },
        {
            "word": "querulous",
            "ipa": "/ˈkwer.ə.ləs/",
            "type": "Tính từ",
            "meaning": "Hay càu nhàu, cằn nhằn",
            "example": "Hungry Bông becomes querulous, meowing at the door until someone feeds him.",
            "exampleMeaning": "Bé Bông lúc đói trở nên cằn nhằn, cứ meo meo ở cửa cho tới khi có người cho ăn."
        },
        {
            "word": "obstreperous",
            "ipa": "/əbˈstrep.ɚ.əs/",
            "type": "Tính từ",
            "meaning": "Ồn ào, ương bướng khó bảo",
            "example": "The obstreperous crowd at the concert could not drown out her singing along.",
            "exampleMeaning": "Đám đông ồn ào ở buổi hòa nhạc cũng không át được tiếng em hát theo."
        },
        {
            "word": "pellucid",
            "ipa": "/pəˈluː.sɪd/",
            "type": "Tính từ",
            "meaning": "Trong veo; rõ ràng, dễ hiểu",
            "example": "Her explanation of Chinese grammar was so pellucid that even he understood it.",
            "exampleMeaning": "Lời giải thích ngữ pháp tiếng Trung của em rõ ràng đến mức ngay cả anh cũng hiểu."
        },
        {
            "word": "evanescent",
            "ipa": "/ˌev.əˈnes.ənt/",
            "type": "Tính từ",
            "meaning": "Thoáng qua, tan biến rất nhanh",
            "example": "The evanescent scent of hoa sữa reminds them that autumn in Hanoi is short.",
            "exampleMeaning": "Hương hoa sữa thoảng qua nhắc hai đứa rằng mùa thu Hà Nội thật ngắn."
        },
        {
            "word": "insouciance",
            "ipa": "/ɪnˈsuː.si.əns/",
            "type": "Danh từ",
            "meaning": "Sự vô tư, thảnh thơi không lo nghĩ",
            "example": "He envies the insouciance with which Bông naps through every thunderstorm.",
            "exampleMeaning": "Anh ghen tị với sự vô tư của Bông, ngủ ngon lành qua mọi cơn giông."
        },
        {
            "word": "verdant",
            "ipa": "/ˈvɝː.dənt/",
            "type": "Tính từ",
            "meaning": "Xanh mướt, tươi tốt",
            "example": "They rode their bikes past verdant rice fields on the way to Thuy Nguyen.",
            "exampleMeaning": "Hai đứa đạp xe qua những cánh đồng lúa xanh mướt trên đường về Thủy Nguyên."
        },
        {
            "word": "tintinnabulation",
            "ipa": "/ˌtɪn.tɪˌnæb.jəˈleɪ.ʃən/",
            "type": "Danh từ",
            "meaning": "Tiếng chuông leng keng ngân vang",
            "example": "The tintinnabulation of the wind chimes greeted her every time she came home.",
            "exampleMeaning": "Tiếng chuông gió leng keng ngân vang chào đón em mỗi lần em về nhà."
        },
        {
            "word": "effulgent",
            "ipa": "/ɪˈfʌl.dʒənt/",
            "type": "Tính từ",
            "meaning": "Chói lọi, rực rỡ",
            "example": "In the effulgent light of the Tết fireworks, she looked happier than ever.",
            "exampleMeaning": "Trong ánh pháo hoa Tết rực rỡ, em trông hạnh phúc hơn bao giờ hết."
        },
        {
            "word": "propinquity",
            "ipa": "/prəˈpɪŋ.kwə.t̬i/",
            "type": "Danh từ",
            "meaning": "Sự gần gũi (về khoảng cách hoặc mối quan hệ)",
            "example": "Love does not depend on propinquity; it survives the road from Hanoi to Hai Phong.",
            "exampleMeaning": "Tình yêu không phụ thuộc vào khoảng cách gần xa; nó vẫn sống qua quãng đường Hà Nội – Hải Phòng."
        },
        {
            "word": "ethereal",
            "ipa": "/ɪˈθɪr.i.əl/",
            "type": "Tính từ",
            "meaning": "Thanh thoát, mong manh như cõi tiên",
            "example": "In the morning mist, the lake looked almost ethereal.",
            "exampleMeaning": "Trong màn sương sớm, mặt hồ trông gần như thanh thoát như cõi tiên."
        },
        {
            "word": "euphoria",
            "ipa": "/juːˈfɔːr.i.ə/",
            "type": "Danh từ",
            "meaning": "Trạng thái hưng phấn tột độ",
            "example": "Pure euphoria hit me the moment I saw her waiting on the platform.",
            "exampleMeaning": "Niềm hưng phấn tột độ ập đến ngay khi anh thấy em đứng đợi trên sân ga."
        },
        {
            "word": "melancholy",
            "ipa": "/ˈmel.ən.kɑː.li/",
            "type": "Danh từ",
            "meaning": "Nỗi buồn man mác, dịu dàng",
            "example": "A sweet melancholy settled over me after the goodbye.",
            "exampleMeaning": "Một nỗi buồn man mác ngọt ngào phủ lên anh sau lời tạm biệt."
        },
        {
            "word": "labyrinthine",
            "ipa": "/ˌlæb.əˈrɪn.θiːn/",
            "type": "Tính từ",
            "meaning": "Rối như mê cung",
            "example": "We got happily lost in the labyrinthine alleys of the Old Quarter.",
            "exampleMeaning": "Hai đứa lạc đường một cách vui vẻ trong những con ngõ rối như mê cung của phố cổ."
        },
        {
            "word": "quintessential",
            "ipa": "/ˌkwɪn.təˈsen.ʃəl/",
            "type": "Tính từ",
            "meaning": "Tinh túy nhất, điển hình nhất",
            "example": "A steaming bowl of phở is the quintessential Hanoi breakfast.",
            "exampleMeaning": "Một bát phở nóng hổi là bữa sáng điển hình nhất của Hà Nội."
        },
        {
            "word": "ostensibly",
            "ipa": "/ɑːˈsten.sə.bli/",
            "type": "Trạng từ",
            "meaning": "Bề ngoài thì, nhìn bề ngoài là",
            "example": "He went to the market ostensibly for eggs, but he came back with flowers.",
            "exampleMeaning": "Anh ra chợ bề ngoài là để mua trứng, nhưng lại về nhà với một bó hoa."
        },
        {
            "word": "perennial",
            "ipa": "/pəˈren.i.əl/",
            "type": "Tính từ",
            "meaning": "Lâu dài, trường tồn mãi",
            "example": "Missing each other is our perennial problem and our perennial excuse for long calls.",
            "exampleMeaning": "Nhớ nhau là vấn đề muôn thuở của mình, và cũng là cái cớ muôn thuở để gọi điện thật lâu."
        },
        {
            "word": "ebb",
            "ipa": "/eb/",
            "type": "Động từ",
            "meaning": "Rút dần, giảm dần",
            "example": "My worries ebb away as soon as I hear your voice.",
            "exampleMeaning": "Mọi lo lắng của anh rút dần đi ngay khi nghe giọng em."
        },
        {
            "word": "gossamer",
            "ipa": "/ˈɡɑː.sə.mɚ/",
            "type": "Danh từ",
            "meaning": "Tơ nhện mỏng, thứ mỏng manh nhẹ như tơ",
            "example": "The curtain was as thin as gossamer in the morning light.",
            "exampleMeaning": "Tấm rèm mỏng như tơ nhện trong ánh sáng ban mai."
        },
        {
            "word": "cogent",
            "ipa": "/ˈkoʊ.dʒənt/",
            "type": "Tính từ",
            "meaning": "Chặt chẽ, thuyết phục",
            "example": "She made a cogent argument for adopting a second cat.",
            "exampleMeaning": "Em đưa ra một lập luận chặt chẽ để nhận nuôi thêm một chú mèo nữa."
        },
        {
            "word": "dulcet",
            "ipa": "/ˈdʌl.sɪt/",
            "type": "Tính từ",
            "meaning": "Ngọt ngào, êm tai (giọng nói, âm thanh)",
            "example": "Your dulcet voice on the phone is my favorite lullaby.",
            "exampleMeaning": "Giọng nói ngọt ngào của em qua điện thoại là bài ru ngủ anh thích nhất."
        },
        {
            "word": "redolent",
            "ipa": "/ˈred.əl.ənt/",
            "type": "Tính từ",
            "meaning": "Thoang thoảng hương, gợi nhớ",
            "example": "The kitchen was redolent of ginger and memories of home.",
            "exampleMeaning": "Căn bếp thoang thoảng mùi gừng và gợi nhớ về nhà."
        },
        {
            "word": "sanctuary",
            "ipa": "/ˈsæŋk.tʃu.er.i/",
            "type": "Danh từ",
            "meaning": "Nơi trú ẩn bình yên",
            "example": "Our little room is a sanctuary from the noisy city.",
            "exampleMeaning": "Căn phòng nhỏ của mình là nơi trú ẩn bình yên khỏi thành phố ồn ào."
        },
        {
            "word": "idyllic",
            "ipa": "/aɪˈdɪl.ɪk/",
            "type": "Tính từ",
            "meaning": "Thơ mộng, yên ả như tranh",
            "example": "An idyllic afternoon for us means rain, tea and an old playlist.",
            "exampleMeaning": "Một buổi chiều thơ mộng với mình là mưa, trà và một playlist cũ."
        },
        {
            "word": "palpable",
            "ipa": "/ˈpæl.pə.bəl/",
            "type": "Tính từ",
            "meaning": "Rõ rệt đến mức gần như chạm được",
            "example": "The excitement at the train station was almost palpable.",
            "exampleMeaning": "Niềm háo hức ở nhà ga rõ rệt đến mức gần như chạm vào được."
        },
        {
            "word": "mercurial",
            "ipa": "/mɚˈkjʊr.i.əl/",
            "type": "Tính từ",
            "meaning": "Thất thường, dễ thay đổi",
            "example": "The weather is mercurial here: sunny at noon, stormy by tea time.",
            "exampleMeaning": "Thời tiết ở đây thất thường lắm: trưa nắng, đến giờ uống trà đã giông."
        },
        {
            "word": "tryst",
            "ipa": "/trɪst/",
            "type": "Danh từ",
            "meaning": "Cuộc hẹn hò lén lút, ngọt ngào",
            "example": "Our midnight video call felt like a sweet little tryst.",
            "exampleMeaning": "Cuộc gọi video lúc nửa đêm của mình giống như một cuộc hẹn hò lén lút nho nhỏ."
        },
        {
            "word": "zenith",
            "ipa": "/ˈziː.nɪθ/",
            "type": "Danh từ",
            "meaning": "Đỉnh cao, điểm cao nhất",
            "example": "My happiness reached its zenith the day we finally met.",
            "exampleMeaning": "Hạnh phúc của anh lên đến đỉnh cao vào ngày mình cuối cùng cũng gặp nhau."
        },
        {
            "word": "sonorous",
            "ipa": "/ˈsɑː.nɚ.əs/",
            "type": "Tính từ",
            "meaning": "Vang vọng, trầm ấm",
            "example": "His sonorous laugh filled the whole small room.",
            "exampleMeaning": "Tiếng cười trầm ấm của anh vang khắp căn phòng nhỏ."
        },
        {
            "word": "serenade",
            "ipa": "/ˌser.əˈneɪd/",
            "type": "Động từ",
            "meaning": "Hát tình ca tặng người yêu",
            "example": "He tried to serenade her, but the cat howled louder.",
            "exampleMeaning": "Anh cố hát tình ca tặng em, nhưng con mèo còn gào to hơn."
        },
        {
            "word": "aubade",
            "ipa": "/oʊˈbɑːd/",
            "type": "Danh từ",
            "meaning": "Khúc ca/bài thơ lúc bình minh (thường là lời chia tay buổi sớm)",
            "example": "He wrote her an aubade before catching the early train.",
            "exampleMeaning": "Anh viết tặng em một bài thơ bình minh trước khi bắt chuyến tàu sớm."
        },
        {
            "word": "besotted",
            "ipa": "/bɪˈsɑː.t̬ɪd/",
            "type": "Tính từ",
            "meaning": "Mê mẩn, say đắm",
            "example": "Everyone can see he is completely besotted with her.",
            "exampleMeaning": "Ai cũng thấy anh mê mẩn em hoàn toàn."
        },
        {
            "word": "coruscate",
            "ipa": "/ˈkɔːr.ə.skeɪt/",
            "type": "Động từ",
            "meaning": "Lấp lánh, lóe sáng",
            "example": "City lights coruscate across the harbour at night.",
            "exampleMeaning": "Ánh đèn thành phố lấp lánh trên mặt cảng về đêm."
        },
        {
            "word": "empyrean",
            "ipa": "/ˌem.paɪˈriː.ən/",
            "type": "Danh từ",
            "meaning": "Bầu trời cao thẳm, cõi trời",
            "example": "The sky lanterns drifted slowly into the empyrean.",
            "exampleMeaning": "Những chiếc đèn trời chầm chậm bay lên bầu trời cao thẳm."
        },
        {
            "word": "felicitous",
            "ipa": "/fəˈlɪs.ə.t̬əs/",
            "type": "Tính từ",
            "meaning": "Khéo léo, đắt giá (lời nói, lựa chọn)",
            "example": "Calling the cat Bông was a felicitous choice.",
            "exampleMeaning": "Đặt tên con mèo là Bông đúng là một lựa chọn quá khéo."
        },
        {
            "word": "inamorata",
            "ipa": "/ɪˌnæm.əˈrɑː.t̬ə/",
            "type": "Danh từ",
            "meaning": "Người yêu (nữ)",
            "example": "He proudly introduced Ngọc as his inamorata.",
            "exampleMeaning": "Anh tự hào giới thiệu Ngọc là người yêu của mình."
        },
        {
            "word": "lissome",
            "ipa": "/ˈlɪs.əm/",
            "type": "Tính từ",
            "meaning": "Mềm mại, uyển chuyển",
            "example": "Her lissome steps made the old dance look new.",
            "exampleMeaning": "Những bước chân uyển chuyển của em làm điệu nhảy cũ trông mới hẳn."
        },
        {
            "word": "nepenthe",
            "ipa": "/nɪˈpen.θi/",
            "type": "Danh từ",
            "meaning": "Thứ giúp quên đi muộn phiền",
            "example": "Your hug is my nepenthe after a stressful week.",
            "exampleMeaning": "Cái ôm của em là liều thuốc giúp anh quên hết muộn phiền sau một tuần căng thẳng."
        },
        {
            "word": "opalescent",
            "ipa": "/ˌoʊ.pəlˈes.ənt/",
            "type": "Tính từ",
            "meaning": "Óng ánh nhiều màu như đá opal",
            "example": "The sea turned opalescent just before dawn.",
            "exampleMeaning": "Mặt biển chuyển sang óng ánh ngay trước bình minh."
        },
        {
            "word": "paean",
            "ipa": "/ˈpiː.ən/",
            "type": "Danh từ",
            "meaning": "Bài ca ngợi, khúc tụng ca",
            "example": "This silly letter is really a paean to your smile.",
            "exampleMeaning": "Lá thư ngớ ngẩn này thật ra là một bài ca ngợi nụ cười của em."
        },
        {
            "word": "quiescent",
            "ipa": "/kwiˈes.ənt/",
            "type": "Tính từ",
            "meaning": "Yên lặng, tĩnh tại",
            "example": "The whole street was quiescent after midnight.",
            "exampleMeaning": "Cả con phố lặng im sau nửa đêm."
        },
        {
            "word": "ravishing",
            "ipa": "/ˈræv.ɪ.ʃɪŋ/",
            "type": "Tính từ",
            "meaning": "Đẹp mê hồn",
            "example": "You look absolutely ravishing tonight.",
            "exampleMeaning": "Tối nay em đẹp mê hồn."
        },
        {
            "word": "scintilla",
            "ipa": "/sɪnˈtɪl.ə/",
            "type": "Danh từ",
            "meaning": "Một chút xíu, mảy may",
            "example": "There is not a scintilla of doubt in my heart about us.",
            "exampleMeaning": "Trong tim anh không có lấy một chút nghi ngờ nào về hai đứa mình."
        },
        {
            "word": "tremulous",
            "ipa": "/ˈtrem.jə.ləs/",
            "type": "Tính từ",
            "meaning": "Run run, rụt rè",
            "example": "She said yes in a tremulous, happy voice.",
            "exampleMeaning": "Em nói đồng ý bằng giọng run run mà hạnh phúc."
        },
        {
            "word": "uxorious",
            "ipa": "/ʌkˈsɔːr.i.əs/",
            "type": "Tính từ",
            "meaning": "Quá mực yêu chiều vợ",
            "example": "His friends already tease him for being uxorious.",
            "exampleMeaning": "Bạn bè đã trêu anh là kiểu chồng chiều vợ hết mực rồi."
        },
        {
            "word": "vespertine",
            "ipa": "/ˈves.pɚ.taɪn/",
            "type": "Tính từ",
            "meaning": "Thuộc về buổi chiều tối",
            "example": "We love our vespertine walks around the lake.",
            "exampleMeaning": "Tụi mình thích những buổi dạo quanh hồ lúc chiều tối."
        },
        {
            "word": "winsome",
            "ipa": "/ˈwɪn.səm/",
            "type": "Tính từ",
            "meaning": "Duyên dáng, có sức hút ngây thơ",
            "example": "She flashed a winsome smile and I forgot what I was saying.",
            "exampleMeaning": "Em nở một nụ cười duyên làm anh quên mất mình đang nói gì."
        },
        {
            "word": "raconteur",
            "ipa": "/ˌræk.ɑːnˈtɝː/",
            "type": "Danh từ",
            "meaning": "Người kể chuyện có duyên",
            "example": "Ngọc is a natural raconteur at family dinners.",
            "exampleMeaning": "Ngọc là người kể chuyện có duyên bẩm sinh trong những bữa cơm gia đình."
        },
        {
            "word": "gloaming",
            "ipa": "/ˈɡloʊ.mɪŋ/",
            "type": "Danh từ",
            "meaning": "Lúc chạng vạng",
            "example": "We sat on the balcony in the gloaming, sharing one cup of tea.",
            "exampleMeaning": "Tụi mình ngồi ngoài ban công lúc chạng vạng, chung nhau một tách trà."
        },
        {
            "word": "lucent",
            "ipa": "/ˈluː.sənt/",
            "type": "Tính từ",
            "meaning": "Sáng trong, ánh lên dịu nhẹ",
            "example": "Her eyes were lucent with happy tears.",
            "exampleMeaning": "Mắt em ánh lên những giọt nước mắt hạnh phúc."
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

  // Candy per study reward (quiz/match still count toward app.js STUDY_DAILY_LIMIT = 4 per day across both languages).
  const STUDY_CANDY = { daily: 5, quiz: 4, match: 3 };
  const STORAGE_KEYS = {
    starred: "hu_keo_cua_sun_english_starred_v1",
    srs: "hu_keo_cua_sun_english_srs_v1",
    currentLevel: "hu_keo_cua_sun_english_level_v1",
    dailySetOffset: "hu_keo_cua_sun_english_daily_offset_v1",
    dailyDoneDate: "hu_keo_cua_sun_english_daily_done_date_v1"
  };

  let currentLevel = "b1"; // "b1" | "b2" | "c1"
  let currentTab = "daily"; // "daily" | "flashcard" | "quiz" | "match" | "starred" | "love" | "review"

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
  let quizMissed = [];

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

  // Public stop (used when the modal closes). Bumping speechSeq matters: cancelling speechSynthesis fires the
  // utterance's onerror, which would otherwise start the Youdao audio fallback right after the modal closed.
  // The Youdao fallback needs a network. When it can't play (offline, blocked, server error) tell the player instead of
  // failing silently; at most one toast every 15 s so repeated taps don't spam.
  let lastSpeechNotice = 0;
  function notifySpeechUnavailable() {
    const now = Date.now();
    if (now - lastSpeechNotice < 15000) return;
    lastSpeechNotice = now;
    const offline = typeof navigator !== "undefined" && navigator.onLine === false;
    const msg = offline
      ? "📴 Máy chưa có giọng đọc tiếng Anh mà đang offline, có mạng lại em bấm nghe nha"
      : "🔇 Chưa phát âm được từ này, em thử lại chút nữa nha";
    if (window.showToast) window.showToast(msg);
  }

  function stopSpeech() {
    speechSeq++;
    stopAllSpeech();
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
      const fail = () => {
        if (thisSpeechId !== speechSeq) return; // cancelled on purpose (new word / modal closed): stay quiet
        resetBtn();
        notifySpeechUnavailable();
      };
      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        fail();
        return;
      }
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
        audio.onerror = fail;

        const p = audio.play();
        if (p !== undefined) p.catch(fail);
      } catch {
        fail();
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
      entry.mistakes = (entry.mistakes || 0) + 1;
    }

    srsMap[word] = entry;
    saveSRSMap(srsMap);
    if (isSuccess && window.GameState && GameState.checkAchievements) GameState.checkAchievements(); // words_50 / words_200
  }

  // A word needs review when the last answer was wrong (reps back to 0) or its review date has come.
  function isWeakSRS(entry, now = Date.now()) {
    if (!entry) return false;
    return entry.reps === 0 || entry.due <= now;
  }

  // Quiz targets: up to 3 words that need review first (wrong answers come back), the rest random.
  function pickQuizTargets(list, count = 5) {
    const srsMap = getSRSMap();
    const now = Date.now();
    const weak = shuffleArray(list.filter((w) => isWeakSRS(srsMap[w.word], now))).slice(0, 3);
    const rest = shuffleArray(list.filter((w) => !weak.includes(w)));
    return [...weak.map((w) => ({ word: w, review: true })), ...rest.map((w) => ({ word: w, review: false }))]
      .slice(0, Math.min(count, list.length));
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

  // Words answered right 3+ times (badge "Đã thuộc"); app.js sums both languages for words_50 / words_200.
  function masteredCount() {
    const map = getSRSMap();
    return ["b1", "b2", "c1"].reduce((n, lvl) => n + (ENGLISH_DATA[lvl] || []).filter((w) => map[w.word] && map[w.word].reps >= 3).length, 0);
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
            <strong style="color: #d6336c">+${STUDY_CANDY.daily} 🍬 Kẹo & +10 XP</strong>
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
          window.GameState.grantStudyReward("daily", 10, STUDY_CANDY.daily);
        }
        if (window.showToast) {
          showToast(`🎉 Tuyệt vời! Ngọc đã hoàn thành 5 từ tiếng Anh hôm nay: +${STUDY_CANDY.daily} 🍬 & +10 XP!`);
        }
      });
    }
  }

  // Tab: Flashcard
  function startFlashcards() {
    // All words of the level (was hard-coded to the first 25, so newly added words never showed up as cards).
    fcWords = (ENGLISH_DATA[currentLevel] || []).slice();
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
          if (window.showToast) showToast(`Đã xem hết ${total} thẻ vựng đợt này!`);
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
  // Three modes on one engine: meaning (nghĩa → từ), cloze (điền từ vào câu ví dụ), listen (nghe → chọn từ). Every mode
  // records SRS and pays through the one quiz reward in renderQuizSummary (shared daily study cap).
  const QUIZ_MODES = [
    { id: "meaning", label: "📖 Nghĩa" },
    { id: "cloze", label: "✏️ Điền từ" },
    { id: "listen", label: "🎧 Nghe" }
  ];
  const QUIZ_MODE_KEY = "hu_keo_cua_sun_english_quiz_mode_v1";
  let quizMode = "meaning";
  try {
    const savedMode = localStorage.getItem(QUIZ_MODE_KEY);
    if (QUIZ_MODES.some((m) => m.id === savedMode)) quizMode = savedMode;
  } catch {}
  let quizSource = "level"; // "level" = the chosen level, "review" = Ôn hôm nay

  // The example sentence split around the word (or the inflected form it uses: "cherished" for "cherish").
  function clozeParts(w) {
    const ex = w.example || "";
    const lw = w.word.toLowerCase();
    const stem = lw.replace(/(e|y|ies|es|s|ed|ing)$/, "").slice(0, Math.max(4, lw.length - 3));
    const tokens = [...ex.matchAll(/[A-Za-z][A-Za-z-]*/g)];
    const tok = tokens.find((t) => t[0].toLowerCase() === lw) ||
      tokens.find((t) => t[0].toLowerCase().includes(lw)) ||
      tokens.find((t) => t[0].toLowerCase().startsWith(stem));
    if (!tok) return null;
    return { before: ex.slice(0, tok.index), answer: tok[0], after: ex.slice(tok.index + tok[0].length) };
  }

  const quizEligible = (mode) => (mode === "cloze" ? (w) => Boolean(clozeParts(w)) : () => true);
  const quizModeLabel = (mode) => (QUIZ_MODES.find((m) => m.id === mode) || QUIZ_MODES[0]).label;

  // Listening needs a voice: an English system voice, or a network for the stream fallback.
  function canListen() {
    if (typeof navigator === "undefined" || navigator.onLine !== false) return true;
    if (!("speechSynthesis" in window)) return false;
    if (!cachedVoices.length) loadVoices();
    return Boolean(getBestEnglishVoice());
  }

  // Three wrong words: same part of speech first (so grammar alone doesn't give the answer away).
  function pickWordDistractors(target, pool, mode, cloze) {
    let cands = pool.filter((w) => w.word !== target.word && w.meaning !== target.meaning);
    if (mode === "cloze" && cloze) {
      const sentence = (target.example || "").toLowerCase();
      const ans = cloze.answer.toLowerCase();
      cands = cands.filter((w) => !sentence.includes(w.word.toLowerCase()) && !ans.startsWith(w.word.toLowerCase()));
    }
    const uniq = [];
    cands.forEach((w) => {
      if (!uniq.some((u) => u.word === w.word)) uniq.push(w);
    });
    const sameType = uniq.filter((w) => w.type === target.type);
    const rest = uniq.filter((w) => w.type !== target.type);
    return [...shuffleArray(sameType), ...shuffleArray(rest)].slice(0, 3);
  }

  function buildQuizQuestion(target, mode, pool, review) {
    const cloze = mode === "cloze" ? clozeParts(target) : null;
    if (mode === "cloze" && !cloze) return null;
    const wrong = pickWordDistractors(target, pool, mode, cloze);
    if (wrong.length < 3) return null;
    return { mode, target, review, cloze, options: shuffleArray([target, ...wrong]) };
  }

  function startQuiz(source) {
    quizSource = source === "review" ? "review" : "level";
    quizQuestions = [];
    if (quizSource === "review") {
      const due = getReviewWords();
      if (!due.length) {
        renderReviewTab();
        return;
      }
      quizQuestions = shuffleArray(due.slice(0, REVIEW_ROUND)).map((w) => {
        const pool = ENGLISH_DATA[w.level] || ENGLISH_DATA.b1;
        const mode = clozeParts(w) && Math.random() < 0.5 ? "cloze" : "meaning";
        return buildQuizQuestion(w, mode, pool, true) || buildQuizQuestion(w, "meaning", pool, true);
      }).filter(Boolean);
    } else {
      const list = ENGLISH_DATA[currentLevel] || ENGLISH_DATA.b1;
      if (quizMode === "listen" && !canListen()) {
        renderQuizNotice("🎧", "Chế độ Nghe cần giọng đọc", "Máy chưa có giọng đọc tiếng Anh mà đang offline. Có mạng lại em chọn Nghe nha, giờ thử kiểu khác trước nhé 💕");
        return;
      }
      quizQuestions = shuffleArray(pickQuizTargets(list.filter(quizEligible(quizMode)), 5))
        .map(({ word, review }) => buildQuizQuestion(word, quizMode, list, review))
        .filter(Boolean);
    }
    if (!quizQuestions.length) {
      renderQuizNotice("🙈", "Chưa có từ hợp với kiểu này", "Cấp này chưa có từ nào làm được kiểu câu hỏi này, em đổi kiểu khác nha 💕");
      return;
    }

    quizIndex = 0;
    quizScore = 0;
    quizMissed = [];
    quizAnswered = false;
    quizRewardDone = false;
    quizRewardPaid = false;
    renderQuizTab();
  }

  function quizModeBarHtml() {
    return `<div class="quiz-mode-bar" role="group" aria-label="Kiểu trắc nghiệm">${QUIZ_MODES.map(
      (m) => `<button class="quiz-mode-btn ${m.id === quizMode ? "active" : ""}" data-mode="${m.id}" aria-pressed="${m.id === quizMode}">${m.label}</button>`
    ).join("")}</div>`;
  }

  function bindQuizModeBar(container) {
    container.querySelectorAll(".quiz-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (window.AudioManager) AudioManager.playClick();
        quizMode = btn.dataset.mode;
        try {
          localStorage.setItem(QUIZ_MODE_KEY, quizMode);
        } catch {}
        startQuiz();
      });
    });
  }

  function renderQuizNotice(icon, title, text) {
    const container = document.getElementById("englishTabContent");
    container.innerHTML = `
      <div class="chinese-quiz-wrap">
        ${quizModeBarHtml()}
        <div class="flashcard-empty-box">
          <div style="font-size: 36px; margin-bottom: 8px;">${icon}</div>
          <h3>${title}</h3>
          <p>${text}</p>
        </div>
      </div>
    `;
    bindQuizModeBar(container);
  }

  function quizPromptHtml(q) {
    const t = q.target;
    if (q.mode === "cloze") {
      const inflected = q.cloze.answer.toLowerCase() !== t.word.toLowerCase();
      return `
        <div class="qq-prompt">Chọn từ điền vào chỗ trống${inflected ? " (từ trong câu đã được chia)" : ""}</div>
        <div class="qq-cloze qq-cloze-en">${q.cloze.before}<span class="qq-blank">_____</span>${q.cloze.after}</div>
        ${t.exampleMeaning ? `<div class="qq-sub">💬 ${t.exampleMeaning}</div>` : ""}`;
    }
    if (q.mode === "listen") {
      return `
        <div class="qq-prompt">Nghe rồi chọn từ em nghe được</div>
        <button class="btn-speak qq-listen-btn" id="btnSpeakQuiz" data-text="${t.word}">🔊 Nghe lại</button>`;
    }
    return `
      <div class="qq-prompt">Từ tiếng Anh nào mang ý nghĩa dưới đây?</div>
      <div class="qq-meaning-en">"${t.meaning}"</div>
      <div class="cwc-badges-row" style="margin-top: 4px;">
        <span class="fc-type-badge">${t.type}</span>
      </div>`;
  }

  function quizFeedbackHtml(q, isRight) {
    const t = q.target;
    const head = isRight ? "✅ <strong>Chính xác!</strong>" : "❌ <strong>Chưa đúng rồi:</strong>";
    if (q.mode === "cloze") {
      return `${head} ${q.cloze.before}<strong>${q.cloze.answer}</strong>${q.cloze.after}
        <span class="qq-fb-sub">💬 ${t.exampleMeaning || ""}</span>
        <span class="qq-fb-sub">${t.word} [${t.ipa}]: ${t.meaning}</span>`;
    }
    return isRight
      ? `${head} ${t.word} [${t.ipa}]: ${t.meaning}`
      : `${head} ${t.word} [${t.ipa}] có nghĩa là <strong>${t.meaning}</strong>`;
  }

  function renderQuizTab() {
    const container = document.getElementById("englishTabContent");
    if (!quizQuestions || quizQuestions.length === 0) {
      startQuiz(quizSource);
      return;
    }

    if (quizIndex >= quizQuestions.length) {
      renderQuizSummary();
      return;
    }

    const q = quizQuestions[quizIndex];
    const isReview = quizSource === "review";
    quizAnswered = false;
    const optText = (opt) => (q.mode === "listen"
      ? `<strong>${opt.word}</strong>`
      : `<strong>${opt.word}</strong> <em style="font-size: 11.5px; color: #8c7365; font-weight: normal; margin-left: 4px;">${opt.ipa}</em>`);

    container.innerHTML = `
      <div class="chinese-quiz-wrap">
        ${isReview ? "" : quizModeBarHtml()}
        <div class="quiz-progress-track">
          <div class="quiz-progress-fill" style="width: ${((quizIndex + 1) / quizQuestions.length) * 100}%;"></div>
        </div>

        <div class="quiz-header">
          <div class="chinese-level-bar" style="margin-bottom: 0; padding: 0; background: none; border: none; box-shadow: none;">
            <span class="quiz-level-inline">${isReview ? "🔁 Ôn hôm nay" : `🏷️ Cấp: <strong>${getLevelLabel(currentLevel).split(" ")[0]}</strong>`}</span>
          </div>
          <span class="fc-counter">Câu <strong>${quizIndex + 1}/${quizQuestions.length}</strong></span>
          <span class="fc-counter">🎯 Điểm: <strong>${quizScore}</strong></span>
        </div>

        <div class="quiz-question-card">
          ${q.review ? '<div class="qq-review-tag">🔁 Từ cần ôn lại</div>' : ""}
          ${quizPromptHtml(q)}
        </div>

        <div class="quiz-options-grid" id="quizOptionsGrid">
          ${q.options
            .map(
              (opt, idx) => `
            <button class="quiz-opt-btn" data-word="${opt.word}">
              <span class="q-opt-label">${String.fromCharCode(65 + idx)}.</span>
              <span class="q-opt-text">${optText(opt)}</span>
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

    bindQuizModeBar(container);

    const btnSpeakQuiz = document.getElementById("btnSpeakQuiz");
    if (btnSpeakQuiz) {
      btnSpeakQuiz.addEventListener("click", () => speak(q.target.word, btnSpeakQuiz));
      // Listening plays the word straight away (rendering always follows a tap, so mobile browsers allow it)
      if (q.mode === "listen") speak(q.target.word, btnSpeakQuiz);
    }

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
          container.querySelectorAll(".quiz-opt-btn").forEach((b) => {
            if (b.dataset.word === q.target.word) b.classList.add("btn-correct");
          });
        }

        recordSRSReview(q.target.word, isRight);
        if (!isRight && !quizMissed.includes(q.target)) quizMissed.push(q.target);
        updateReviewBadge();
        speak(q.target.word);

        const fbBox = document.getElementById("quizFeedback");
        const fbText = document.getElementById("quizFeedbackText");
        fbText.innerHTML = quizFeedbackHtml(q, isRight);
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
    // Same bar as before (4 of 5), also for review rounds of up to 10 words; fewer than 4 questions never pays.
    const passed = total >= 4 && quizScore >= Math.ceil(total * 0.8);
    const isReview = quizSource === "review";

    // Reward once per finished round, capped per day by GameState.grantStudyReward.
    if (passed && !quizRewardDone && window.GameState) {
      quizRewardDone = true;
      quizRewardPaid = window.GameState.grantStudyReward("quiz", 8, STUDY_CANDY.quiz).granted;
    }
    const remaining = isReview ? getReviewWords().length : 0;
    updateReviewBadge();
    if (window.GameState && GameState.markStudyFeat) {
      if (!isReview && total >= 5 && quizScore === total && quizMode !== "meaning") GameState.markStudyFeat(`perfect_${quizMode}`);
      if (isReview && remaining === 0) GameState.markStudyFeat("review_clear");
    }

    container.innerHTML = `
      <div class="quiz-result-wrap">
        <div class="quiz-result-icon">${isPerfect ? "🏆" : quizScore >= 3 ? "🎉" : "💪"}</div>
        <h3 class="quiz-result-title">${isReview ? "Xong một lượt ôn!" : isPerfect ? "Xuất sắc tuyệt đối!" : quizScore >= 3 ? "Làm bài rất tốt!" : "Cố gắng hơn nhé!"}</h3>
        <p class="quiz-score-text">Ngọc đã trả lời đúng <strong>${quizScore}/${total}</strong> câu hỏi (${isReview ? "Ôn hôm nay" : `${getLevelLabel(currentLevel)} • ${quizModeLabel(quizMode)}`})!</p>
        ${isReview ? `<p class="quiz-score-text">${remaining ? `Còn <strong>${remaining}</strong> từ cần ôn nữa nha.` : "Hết sạch từ cần ôn rồi, giỏi quá 💕"}</p>` : ""}
        ${quizMissed.length ? `<div class="quiz-missed-box"><div class="quiz-missed-title">🔁 Từ cần ôn (sẽ quay lại ở lượt sau):</div><ul>${quizMissed.map((w) => `<li><strong>${w.word}</strong> [${w.ipa}]: ${w.meaning}</li>`).join("")}</ul></div>` : ""}
        <p class="quiz-score-reward">${passed ? (quizRewardPaid ? `🎁 Thưởng nóng: +${STUDY_CANDY.quiz} 🍬 Kẹo & +8 XP!` : "Hôm nay em đã nhận đủ thưởng học rồi, mai nhận tiếp nha 💕") : total < 4 && quizScore === total ? "Lượt ngắn dưới 4 câu chưa tính thưởng kẹo, nhưng em vừa nhớ thêm từ rồi đó 💕" : "Luyện tập mỗi ngày sẽ sớm lên tay nha em yêu!"}</p>
        <div class="quiz-actions-row">
          ${isReview
            ? `${remaining ? '<button class="btn-summary-action btn-summary-pink" id="btnRetryQuiz">🔁 Ôn Tiếp</button>' : ""}
               <button class="btn-summary-action btn-summary-cream" id="btnReviewDoneEn">🎯 Về 5 từ hôm nay</button>`
            : `<button class="btn-summary-action btn-summary-pink" id="btnRetryQuiz">🔄 Làm Lại Ván Mới</button>
               <button class="btn-summary-action btn-summary-cream" id="btnNextLevelQuiz">Đổi Cấp Độ</button>`}
        </div>
      </div>
    `;

    const btnRetry = document.getElementById("btnRetryQuiz");
    if (btnRetry) btnRetry.addEventListener("click", () => startQuiz(quizSource));
    const btnNextLevel = document.getElementById("btnNextLevelQuiz");
    if (btnNextLevel) {
      btnNextLevel.addEventListener("click", () => {
        currentLevel = currentLevel === "b1" ? "b2" : currentLevel === "b2" ? "c1" : "b1";
        startQuiz();
      });
    }
    const btnDone = document.getElementById("btnReviewDoneEn");
    if (btnDone) btnDone.addEventListener("click", () => switchTab("daily"));
  }

  // Tab: Ôn hôm nay — every word (all levels) answered wrong last time or whose review date has come.
  const REVIEW_ROUND = 10;

  function getReviewWords() {
    const srsMap = getSRSMap();
    const now = Date.now();
    const out = [];
    ["b1", "b2", "c1"].forEach((lvl) => {
      (ENGLISH_DATA[lvl] || []).forEach((w) => {
        const s = srsMap[w.word];
        if (isWeakSRS(s, now)) out.push({ ...w, level: lvl, mistakes: s.mistakes || 0, dueAt: s.due || 0 });
      });
    });
    return out.sort((a, b) => b.mistakes - a.mistakes || a.dueAt - b.dueAt);
  }

  function updateReviewBadge() {
    const el = document.getElementById("enReviewCount");
    if (!el) return;
    const n = getReviewWords().length;
    el.textContent = n > 99 ? "99+" : String(n);
    el.classList.toggle("zero", n === 0);
  }

  function renderReviewTab() {
    const container = document.getElementById("englishTabContent");
    const words = getReviewWords();
    updateReviewBadge();
    if (!words.length) {
      container.innerHTML = `
        <div class="chinese-quiz-wrap">
          <div class="flashcard-empty-box">
            <div style="font-size: 36px; margin-bottom: 8px;">🎉</div>
            <h3>Hôm nay không còn từ nào cần ôn!</h3>
            <p>Từ nào em trả lời sai, hoặc đến ngày cần nhắc lại (sau 1, 3, 7 ngày…), sẽ tự gom về đây để em ôn một lượt nha 💕</p>
            <div class="quiz-actions-row">
              <button class="btn-summary-action btn-summary-pink" id="btnReviewToDailyEn">🎯 Học 5 từ hôm nay</button>
              <button class="btn-summary-action btn-summary-cream" id="btnReviewToQuizEn">✍️ Làm trắc nghiệm</button>
            </div>
          </div>
        </div>
      `;
      document.getElementById("btnReviewToDailyEn").addEventListener("click", () => switchTab("daily"));
      document.getElementById("btnReviewToQuizEn").addEventListener("click", () => switchTab("quiz"));
      return;
    }
    const chips = words.slice(0, 24).map((w) => `<span class="review-chip" title="${w.meaning}">${w.word}</span>`).join("");
    container.innerHTML = `
      <div class="chinese-quiz-wrap">
        <div class="review-box">
          <h3>🔁 Có <strong>${words.length}</strong> từ cần ôn hôm nay</h3>
          <p class="chinese-help-text">Gồm từ em từng trả lời sai và từ đến ngày nhắc lại. Mỗi lượt ôn tối đa ${REVIEW_ROUND} từ, trộn nhiều kiểu câu hỏi. Lượt ôn tính chung giới hạn thưởng học mỗi ngày.</p>
          <div class="review-chips">${chips}${words.length > 24 ? `<span class="review-chip more">+${words.length - 24}</span>` : ""}</div>
          <button class="btn-summary-action btn-summary-pink" id="btnStartReviewEn">Bắt đầu ôn (${Math.min(REVIEW_ROUND, words.length)} từ) ▶</button>
        </div>
      </div>
    `;
    document.getElementById("btnStartReviewEn").addEventListener("click", () => {
      if (window.AudioManager) AudioManager.playClick();
      startQuiz("review");
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
        matchRewardPaid = window.GameState.grantStudyReward("match", 6, STUDY_CANDY.match).granted;
      }
      if (window.showToast) {
        showToast(matchRewardPaid
          ? `🎉 Nối chuẩn cả 5 từ tiếng Anh: +${STUDY_CANDY.match} 🍬 & +6 XP!`
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
            <p class="quiz-score-reward">${matchRewardPaid ? `🎁 Thưởng: +${STUDY_CANDY.match} 🍬 Kẹo & +6 XP!` : "Hôm nay em đã nhận đủ thưởng học rồi, mai nhận tiếp nha 💕"}</p>
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
    else if (tabKey === "review") renderReviewTab();
    updateReviewBadge();
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
      stopSpeech();
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
    stopSpeech,
    isWordStarred,
    masteredCount
  };
})();