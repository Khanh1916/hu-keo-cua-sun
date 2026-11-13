window.ChineseApp = (() => {
  const HSK_DATA = {
    hsk1: [
      {
        hanzi: "爱",
        pinyin: "ài",
        type: "Động từ",
        meaning: "Yêu, thương yêu",
        example: "我爱你，无论什么时候。",
        examplePinyin: "Wǒ ài nǐ, wúlùn shénme shíhou.",
        exampleMeaning: "Anh yêu em, bất kể khi nào."
      },
      {
        hanzi: "喜欢",
        pinyin: "xǐhuan",
        type: "Động từ",
        meaning: "Thích, yêu thích",
        example: "我喜欢看着你笑的样子。",
        examplePinyin: "Wǒ xǐhuan kànzhe nǐ xiào de yàngzi.",
        exampleMeaning: "Anh thích ngắm nhìn dáng vẻ em mỉm cười."
      },
      {
        hanzi: "想",
        pinyin: "xiǎng",
        type: "Động từ",
        meaning: "Nghĩ, nhớ, muốn",
        example: "在河内，我每天都在想你。",
        examplePinyin: "Zài Hénèi, wǒ měitiān dōu zài xiǎng nǐ.",
        exampleMeaning: "Ở Hà Nội, mỗi ngày anh đều nhớ về em."
      },
      {
        hanzi: "家",
        pinyin: "jiā",
        type: "Danh từ",
        meaning: "Nhà, gia đình",
        example: "有你在的地方就是家。",
        examplePinyin: "Yǒu nǐ zài de dìfang jiù shì jiā.",
        exampleMeaning: "Nơi nào có em, nơi đó chính là nhà."
      },
      {
        hanzi: "喝",
        pinyin: "hē",
        type: "Động từ",
        meaning: "Uống",
        example: "天气凉了，多喝点温水。",
        examplePinyin: "Tiānqì liáng le, duō hē diǎn wēn shuǐ.",
        exampleMeaning: "Trời se lạnh rồi, nhớ uống nhiều nước ấm nhé."
      },
      {
        hanzi: "吃",
        pinyin: "chī",
        type: "Động từ",
        meaning: "Ăn",
        example: "去海防我带你去吃好吃的。",
        examplePinyin: "Qù Hǎifáng wǒ dài nǐ qù chī hǎochī de.",
        exampleMeaning: "Xuống Hải Phòng anh sẽ dắt em đi ăn món ngon."
      },
      {
        hanzi: "猫",
        pinyin: "māo",
        type: "Danh từ",
        meaning: "Mèo",
        example: "小猫在阳光下睡得很香。",
        examplePinyin: "Xiǎomāo zài yángguāng xià shuì de hěn xiāng.",
        exampleMeaning: "Chú mèo con ngủ rất say dưới ánh nắng ấm."
      },
      {
        hanzi: "天气",
        pinyin: "tiānqì",
        type: "Danh từ",
        meaning: "Thời tiết",
        example: "今天天气很好，心情也很好。",
        examplePinyin: "Jīntiān tiānqì hěn hǎo, xīnlíng yě hěn hǎo.",
        exampleMeaning: "Hôm nay thời tiết đẹp, tâm trạng cũng rất vui."
      },
      {
        hanzi: "漂亮",
        pinyin: "piàoliang",
        type: "Tính từ",
        meaning: "Xinh đẹp, đẹp đẽ",
        example: "你在我心中永远最漂亮。",
        examplePinyin: "Nǐ zài wǒ xīn zhōng yǒngyuǎn zuì piàoliang.",
        exampleMeaning: "Trong lòng anh, em luôn là người xinh đẹp nhất."
      },
      {
        hanzi: "朋友",
        pinyin: "péngyou",
        type: "Danh từ",
        meaning: "Bạn bè, người bạn",
        example: "从朋友变成最亲密的人。",
        examplePinyin: "Cóng péngyou biànchéng zuì qīnmì de rén.",
        exampleMeaning: "Từ bạn bè dần trở thành người thân thương nhất."
      },
      {
        hanzi: "见",
        pinyin: "jiàn",
        type: "Động từ",
        meaning: "Gặp, thấy",
        example: "很期待周末能见到你。",
        examplePinyin: "Hěn qīdài zhōumò néng jiàndào nǐ.",
        exampleMeaning: "Rất mong chờ cuối tuần có thể được gặp em."
      },
      {
        hanzi: "听",
        pinyin: "tīng",
        type: "Động từ",
        meaning: "Nghe",
        example: "我想听听你的声音。",
        examplePinyin: "Wǒ xiǎng tīngting nǐ de shēngyīn.",
        exampleMeaning: "Anh muốn lắng nghe giọng nói của em."
      },
      {
        hanzi: "说",
        pinyin: "shuō",
        type: "Động từ",
        meaning: "Nói",
        example: "有心事就跟我说，好吗？",
        examplePinyin: "Yǒu xīnshì jiù gēn wǒ shuō, hǎo ma?",
        exampleMeaning: "Có tâm sự gì cứ kể với anh, được không?"
      },
      {
        hanzi: "学习",
        pinyin: "xuéxí",
        type: "Động từ",
        meaning: "Học tập, rèn luyện",
        example: "每天进步一点点就很棒。",
        examplePinyin: "Měitiān jìnbù yī diǎndiǎn jiù hěn bàng.",
        exampleMeaning: "Mỗi ngày tiến bộ một chút xíu thôi đã rất cừ rồi."
      },
      {
        hanzi: "明天",
        pinyin: "míngtiān",
        type: "Danh từ",
        meaning: "Ngày mai",
        example: "明天会是美好的一天。",
        examplePinyin: "Míngtiān huì shì měihǎo de yī tiān.",
        exampleMeaning: "Ngày mai chắc chắn sẽ là một ngày tuyệt vời."
      },
      {
        hanzi: "早上",
        pinyin: "zǎoshang",
        type: "Danh từ",
        meaning: "Buổi sáng",
        example: "早上好，记得吃早饭哦。",
        examplePinyin: "Zǎoshang hǎo, jìde chī zǎofàn o.",
        exampleMeaning: "Chào buổi sáng, nhớ ăn sáng đầy đủ nha."
      },
      {
        hanzi: "晚上",
        pinyin: "wǎnshang",
        type: "Danh từ",
        meaning: "Buổi tối",
        example: "晚上别熬夜，早点睡。",
        examplePinyin: "Wǎnshang bié áoyè, zǎodiǎn shuì.",
        exampleMeaning: "Buổi tối đừng thức khuya, ngủ sớm đi em."
      },
      {
        hanzi: "身体",
        pinyin: "shēntǐ",
        type: "Danh từ",
        meaning: "Sức khỏe, cơ thể",
        example: "身体健康是第一位的。",
        examplePinyin: "Shēntǐ jiànkāng shì dì-yī wèi de.",
        exampleMeaning: "Sức khỏe luôn là điều quan trọng hàng đầu."
      },
      {
        hanzi: "快乐",
        pinyin: "kuàilè",
        type: "Tính từ",
        meaning: "Vui vẻ, hạnh phúc",
        example: "祝你每天都开开心心。",
        examplePinyin: "Zhù nǐ měitiān dōu kāikāi-xīnxīn.",
        exampleMeaning: "Chúc em mỗi ngày đều ngập tràn niềm vui."
      },
      {
        hanzi: "谢谢",
        pinyin: "xièxie",
        type: "Động từ",
        meaning: "Cảm ơn",
        example: "谢谢你来到我的世界里。",
        examplePinyin: "Xièxie nǐ láidào wǒ de shìjiè lǐ.",
        exampleMeaning: "Cảm ơn em đã bước vào thế giới của anh."
      }
    ],

    hsk2: [
      {
        hanzi: "希望",
        pinyin: "xīwàng",
        type: "Động từ/Danh từ",
        meaning: "Hy vọng, mong ước",
        example: "希望你每天都有好心情。",
        examplePinyin: "Xīwàng nǐ měitiān dōu yǒu hǎo xīnlíng.",
        exampleMeaning: "Hy vọng mỗi ngày em đều có tâm trạng thật tốt."
      },
      {
        hanzi: "帮助",
        pinyin: "bāngzhù",
        type: "Động từ",
        meaning: "Giúp đỡ",
        example: "无论遇到什么困难，我都会帮你。",
        examplePinyin: "Wúlùn yùdào shénme kùnnan, wǒ dōu huì bāng nǐ.",
        exampleMeaning: "Dù gặp bất cứ khó khăn nào, anh cũng sẽ giúp em."
      },
      {
        hanzi: "一起",
        pinyin: "yīqǐ",
        type: "Phó từ",
        meaning: "Cùng nhau",
        example: "我想跟你一起慢慢变老。",
        examplePinyin: "Wǒ xiǎng gēn nǐ yīqǐ mànmàn biàn lǎo.",
        exampleMeaning: "Anh muốn cùng em chầm chậm già đi."
      },
      {
        hanzi: "准备",
        pinyin: "zhǔnbèi",
        type: "Động từ",
        meaning: "Chuẩn bị",
        example: "我已经为你准备好了小礼物。",
        examplePinyin: "Wǒ yǐjīng wèi nǐ zhǔnbèi hǎo le xiǎo lǐwù.",
        exampleMeaning: "Anh đã chuẩn bị sẵn món quà nhỏ cho em rồi."
      },
      {
        hanzi: "懂",
        pinyin: "dǒng",
        type: "Động từ",
        meaning: "Hiểu, thấu hiểu",
        example: "懂你的人，一个眼神就够了。",
        examplePinyin: "Dǒng nǐ de rén, yī gè yǎnshén jiù gòu le.",
        exampleMeaning: "Người hiểu em thì chỉ cần một ánh mắt là đủ."
      },
      {
        hanzi: "离",
        pinyin: "lí",
        type: "Giới từ",
        meaning: "Cách, rời xa",
        example: "虽然距离有些远，但心很近。",
        examplePinyin: "Suīrán jùlí yǒuxiē yuǎn, dàn xīn hěn jìn.",
        exampleMeaning: "Tuy khoảng cách có hơi xa, nhưng trái tim lại rất gần."
      },
      {
        hanzi: "慢",
        pinyin: "màn",
        type: "Tính từ",
        meaning: "Chậm, từ từ",
        example: "骑车慢一点，安全第一。",
        examplePinyin: "Qí chē màn yīdiǎn, ānquán dì-yī.",
        exampleMeaning: "Đi xe chậm thôi em, an toàn là trên hết."
      },
      {
        hanzi: "晴",
        pinyin: "qíng",
        type: "Tính từ",
        meaning: "Nắng ráo, trời quang",
        example: "只要你笑，我心里就是晴天。",
        examplePinyin: "Zhǐyào nǐ xiào, wǒ xīn lǐ jiù shì qíngtiān.",
        exampleMeaning: "Chỉ cần em mỉm cười, trong lòng anh đã là ngày nắng đẹp."
      },
      {
        hanzi: "已经",
        pinyin: "yǐjīng",
        type: "Phó từ",
        meaning: "Đã, rồi",
        example: "我已经习惯每天跟你聊天了。",
        examplePinyin: "Wǒ yǐjīng xíguàn měitiān gēn nǐ liáotiān le.",
        exampleMeaning: "Anh đã quen với việc mỗi ngày đều nhắn tin cùng em rồi."
      },
      {
        hanzi: "累",
        pinyin: "lèi",
        type: "Tính từ",
        meaning: "Mệt mỏi",
        example: "工作累了就休息一下吧。",
        examplePinyin: "Gōngzuò lèi le jiù xiūxi yīxià ba.",
        exampleMeaning: "Đi làm mệt rồi thì nghỉ tay một chút nhé."
      }
    ],

    hsk3: [
      {
        hanzi: "照顾",
        pinyin: "zhàogù",
        type: "Động từ",
        meaning: "Chăm sóc, chăm lo",
        example: "天冷了，好好照顾自己。",
        examplePinyin: "Tiān lěng le, hǎohāo zhàogù zìjǐ.",
        exampleMeaning: "Trời trở lạnh rồi, nhớ tự chăm sóc bản thân thật tốt."
      },
      {
        hanzi: "相信",
        pinyin: "xiāngxìn",
        type: "Động từ",
        meaning: "Tin tưởng",
        example: "我相信我们的未来会很幸福。",
        examplePinyin: "Wǒ xiāngxìn wǒmen de wèilái huì hěn xìngfú.",
        exampleMeaning: "Anh tin tưởng tương lai của hai đứa mình sẽ rất hạnh phúc."
      },
      {
        hanzi: "决定",
        pinyin: "juédìng",
        type: "Động từ/Danh từ",
        meaning: "Quyết định",
        example: "喜欢你是我做过最笃定的决定。",
        examplePinyin: "Xǐhuan nǐ shì wǒ zuò guò zuì dǔdìng de juédìng.",
        exampleMeaning: "Thương em là quyết định kiên định nhất đời anh."
      },
      {
        hanzi: "习惯",
        pinyin: "xíguàn",
        type: "Động từ/Danh từ",
        meaning: "Thói quen, tập quán",
        example: "爱你已经变成一种温暖的习惯。",
        examplePinyin: "Ài nǐ yǐjīng biànchéng yī zhǒng wēnnuǎn de xíguàn.",
        exampleMeaning: "Yêu em đã trở thành một thói quen ấm áp mỗi ngày."
      },
      {
        hanzi: "安静",
        pinyin: "ānjìng",
        type: "Tính từ",
        meaning: "Yên tĩnh, bình yên",
        example: "陪着你，心里就特别安静。",
        examplePinyin: "Péi zhe nǐ, xīn lǐ jiù tèbié ānjìng.",
        exampleMeaning: "Ở bên cạnh em, trong lòng thấy bình yên đến lạ."
      },
      {
        hanzi: "关心",
        pinyin: "guānxīn",
        type: "Động từ",
        meaning: "Quan tâm",
        example: "谢谢你总是那么细心地关心我。",
        examplePinyin: "Xièxie nǐ zǒngshì nàme xìxīn de guānxīn wǒ.",
        exampleMeaning: "Cảm ơn em luôn quan tâm anh chu đáo như vậy."
      },
      {
        hanzi: "放心",
        pinyin: "fàngxīn",
        type: "Động từ",
        meaning: "Yên tâm, an tâm",
        example: "有我在，你什么都别担心，放心吧。",
        examplePinyin: "Yǒu wǒ zài, nǐ shénme dōu bié dānxīn, fàngxīn ba.",
        exampleMeaning: "Có anh ở đây rồi, em đừng lo gì cả, yên tâm nhé."
      },
      {
        hanzi: "满意",
        pinyin: "mǎnyì",
        type: "Tính từ",
        meaning: "Hài lòng, vừa ý",
        example: "今天的努力，定会让你对自己很满意。",
        examplePinyin: "Jīntiān de nǔlì, dìng huì ràng nǐ duì zìjǐ hěn mǎnyì.",
        exampleMeaning: "Sự cố gắng hôm nay nhất định sẽ khiến em tự hào về bản thân."
      },
      {
        hanzi: "愿意",
        pinyin: "yuànyì",
        type: "Động từ năng nguyện",
        meaning: "Sẵn lòng, bằng lòng",
        example: "我愿意一直做你的依靠。",
        examplePinyin: "Wǒ yuànyì yīzhí zuò nǐ de yīkào.",
        exampleMeaning: "Anh sẵn lòng mãi mãi là chỗ dựa vững chắc cho em."
      },
      {
        hanzi: "礼物",
        pinyin: "lǐwù",
        type: "Danh từ",
        meaning: "Món quà",
        example: "遇到你，就是上天给我最好的礼物。",
        examplePinyin: "Yùdào nǐ, jiù shì shàngtiān gěi wǒ zuì hǎo de lǐwù.",
        exampleMeaning: "Gặp được em chính là món quà tuyệt vời nhất ông trời ban cho anh."
      }
    ],

    hsk4: [
      {
        hanzi: "爱情",
        pinyin: "àiqíng",
        type: "Danh từ",
        meaning: "Tình yêu",
        example: "最好的爱情是相互理解与支持。",
        examplePinyin: "Zuì hǎo de àiqíng shì xiānghù lǐjiě yǔ zhīchí.",
        exampleMeaning: "Tình yêu đẹp nhất là sự thấu hiểu và sẻ chia cùng nhau."
      },
      {
        hanzi: "幸福",
        pinyin: "xìngfú",
        type: "Tính từ/Danh từ",
        meaning: "Hạnh phúc",
        example: "有你陪伴的每一天都很幸福。",
        examplePinyin: "Yǒu nǐ péibàn de měi yī tiān dōu hěn xìngfú.",
        exampleMeaning: "Mỗi ngày có em đồng hành đều ngập tràn hạnh phúc."
      },
      {
        hanzi: "陪伴",
        pinyin: "péibàn",
        type: "Động từ/Danh từ",
        meaning: "Đồng hành, ở bên",
        example: "陪伴是最长情的告白。",
        examplePinyin: "Péibàn shì zuì chángqíng de gàobái.",
        exampleMeaning: "Sự đồng hành bền bỉ chính là lời tỏ tình sâu sắc nhất."
      },
      {
        hanzi: "坚持",
        pinyin: "jiānchí",
        type: "Động từ",
        meaning: "Kiên trì, bền bỉ",
        example: "为了我们的未来，一起坚持努力。",
        examplePinyin: "Wèile wǒmen de wèilái, yīqǐ jiānchí nǔlì.",
        exampleMeaning: "Vì tương lai của hai đứa mình, cùng nhau kiên trì nỗ lực nhé."
      },
      {
        hanzi: "感动",
        pinyin: "gǎndòng",
        type: "Động từ/Tính từ",
        meaning: "Cảm động",
        example: "你的每一句关心都让我非常感动。",
        examplePinyin: "Nǐ de měi yī jù guānxīn dōu ràng wǒ fēicháng gǎndòng.",
        exampleMeaning: "Từng lời quan tâm của em đều làm anh vô cùng cảm động."
      },
      {
        hanzi: "耐心",
        pinyin: "nàixīn",
        type: "Danh từ/Tính từ",
        meaning: "Kiên nhẫn, nhẫn nại",
        example: "对爱你的人要有足够的耐心。",
        examplePinyin: "Duì ài nǐ de rén yào yǒu zúgòu de nàixīn.",
        exampleMeaning: "Đối với người thương mình, luôn cần có đủ sự kiên nhẫn."
      },
      {
        hanzi: "浪漫",
        pinyin: "làngmàn",
        type: "Tính từ",
        meaning: "Lãng mạn",
        example: "最浪漫的事就是平淡中的守候。",
        examplePinyin: "Zuì làngmàn de shì jiù shì píngdàn zhōng de shǒuhòu.",
        exampleMeaning: "Điều lãng mạn nhất chính là sự chở che trong những tháng ngày bình dị."
      },
      {
        hanzi: "温暖",
        pinyin: "wēnnuǎn",
        type: "Tính từ/Động từ",
        meaning: "Ấm áp, làm ấm",
        example: "你的笑容像冬日里的阳光一样温暖。",
        examplePinyin: "Nǐ de xiàoróng xiàng dōngrì lǐ de yángguāng yīyàng wēnnuǎn.",
        exampleMeaning: "Nụ cười của em ấm áp như ánh nắng giữa ngày đông."
      },
      {
        hanzi: "信任",
        pinyin: "xìnrèn",
        type: "Động từ/Danh từ",
        meaning: "Tín nhiệm, tin cậy",
        example: "相互信任是感情最坚固的基石。",
        examplePinyin: "Xiānghù xìnrèn shì gǎnqíng zuì jiāngù de jīshí.",
        exampleMeaning: "Tin tưởng lẫn nhau là nền tảng vững chắc nhất của tình cảm."
      },
      {
        hanzi: "珍惜",
        pinyin: "zhēnxī",
        type: "Động từ",
        meaning: "Trân trọng, quý trọng",
        example: "我会倍加珍惜与你相处的时光。",
        examplePinyin: "Wǒ huì bèijiā zhēnxī yǔ nǐ xiāngchǔ de shíguāng.",
        exampleMeaning: "Anh sẽ trân trọng gấp bội từng phút giây bên cạnh em."
      },
      {
        hanzi: "羡慕",
        pinyin: "xiànmù",
        type: "Động từ",
        meaning: "Ngưỡng mộ, ghen tị tích cực",
        example: "别人都很羡慕我们之间的好感情。",
        examplePinyin: "Biérén dōu hěn xiànmù wǒmen zhījiān de hǎo gǎnqíng.",
        exampleMeaning: "Mọi người đều rất ngưỡng mộ tình cảm gắn bó của hai đứa mình."
      },
      {
        hanzi: "鼓励",
        pinyin: "gǔlì",
        type: "Động từ/Danh từ",
        meaning: "Khích lệ, động viên",
        example: "有你的鼓励，我做什么都更有动力。",
        examplePinyin: "Yǒu nǐ de gǔlì, wǒ zuò shénme dōu gèng yǒu dònglì.",
        exampleMeaning: "Có em khích lệ, anh làm việc gì cũng thấy tràn đầy động lực."
      },
      {
        hanzi: "适应",
        pinyin: "shìyìng",
        type: "Động từ",
        meaning: "Thích nghi, quen với",
        example: "慢慢适应新环境，你一定可以做得很棒。",
        examplePinyin: "Mànman shìyìng xīn huánjìng, nǐ yīdìng kěyǐ zuò de hěn bàng.",
        exampleMeaning: "Từ từ thích nghi với môi trường mới, em nhất định sẽ làm thật xuất sắc."
      },
      {
        hanzi: "积累",
        pinyin: "jīlěi",
        type: "Động từ/Danh từ",
        meaning: "Tích lũy",
        example: "每天积累一点点词汇，中文会越来越好。",
        examplePinyin: "Měitiān jīlěi yī diǎndiǎn cíhuì, zhōngwén huì yuè lái yuè hǎo.",
        exampleMeaning: "Mỗi ngày tích lũy thêm một chút từ vựng, tiếng Trung của em sẽ ngày càng siêu."
      },
      {
        hanzi: "精彩",
        pinyin: "jīngcǎi",
        type: "Tính từ",
        meaning: "Đặc sắc, tuyệt vời",
        example: "愿我们的生活每天都精彩充实。",
        examplePinyin: "Yuàn wǒmen de shēnghuó měitiān dōu jīngcǎi chōngshí.",
        exampleMeaning: "Mong cuộc sống của chúng mình mỗi ngày đều rực rỡ và đong đầy ý nghĩa."
      },
      {
        hanzi: "究竟",
        pinyin: "jiūjìng",
        type: "Phó từ/Danh từ",
        meaning: "Rốt cuộc, kết cục",
        example: "无论遇到什么困难，究竟我们都会一起面对。",
        examplePinyin: "Wúlùn yùdào shénme kùnnan, jiūjìng wǒmen dōu huì yīqǐ miànduì.",
        exampleMeaning: "Dù gặp bất cứ khó khăn nào, rốt cuộc chúng mình cũng sẽ cùng nhau đối mặt."
      },
      {
        hanzi: "难免",
        pinyin: "nánmiǎn",
        type: "Tính từ/Phó từ",
        meaning: "Khó tránh khỏi",
        example: "生活中难免有小摩擦，关键是彼此包容。",
        examplePinyin: "Shēnghuó zhōng nánmiǎn yǒu xiǎo mócā, guānjiàn shì bǐcǐ bāoróng.",
        exampleMeaning: "Cuộc sống khó tránh những lúc bất đồng nho nhỏ, quan trọng là biết bao dung cho nhau."
      },
      {
        hanzi: "商量",
        pinyin: "shāngliang",
        type: "Động từ",
        meaning: "Bàn bạc, thương lượng",
        example: "有事情随时找我商量，别一个人扛着。",
        examplePinyin: "Yǒu shìqing suíshí zhǎo wǒ shāngliang, bié yī gè rén kángzhe.",
        exampleMeaning: "Có chuyện gì cứ bàn với anh nhé, đừng có ôm một mình nha em."
      },
      {
        hanzi: "轻松",
        pinyin: "qīngsōng",
        type: "Tính từ",
        meaning: "Thư thái, nhẹ nhõm",
        example: "回到家，听听音乐，整个人都轻松了。",
        examplePinyin: "Huí dào jiā, tīngting yīnyuè, zhěng gè rén dōu qīngsōng le.",
        exampleMeaning: "Về đến nhà, bật chút nhạc lên nghe là thấy cả người nhẹ nhõm hẳn."
      },
      {
        hanzi: "脾气",
        pinyin: "píqi",
        type: "Danh từ",
        meaning: "Tính tình, tính nết",
        example: "无论你的小脾气怎样，我都一样宠你。",
        examplePinyin: "Wúlùn nǐ de xiǎo píqi zěnyàng, wǒ dōu yīyàng chǒng nǐ.",
        exampleMeaning: "Dù em có dỗi hờn thế nào, anh vẫn cứ cưng chiều em như vậy thôi."
      }
    ,
      {
        "hanzi": "甚至",
        "pinyin": "shènzhì",
        "type": "Liên từ",
        "meaning": "Thậm chí, ngay cả",
        "example": "看到你笑，甚至连阴天都觉得变晴朗了。",
        "examplePinyin": "Kàndào nǐ xiào, shènzhì lián yīntiān dōu juéde biàn qínglǎng le.",
        "exampleMeaning": "Nhìn thấy nụ cười của em, thậm chí ngày u ám cũng thấy bừng sáng."
      },
      {
        "hanzi": "既然",
        "pinyin": "jìrán",
        "type": "Liên từ",
        "meaning": "Đã... thì",
        "example": "既然认定了你，我就会一直陪着你走下去。",
        "examplePinyin": "Jìrán rèndìng le nǐ, wǒ jiù huì yīzhí péizhe nǐ zǒu xiàqù.",
        "exampleMeaning": "Đã chọn em rồi, anh sẽ luôn bên cạnh đồng hành cùng em suốt chặng đường."
      },
      {
        "hanzi": "尽管",
        "pinyin": "jǐnguǎn",
        "type": "Liên từ",
        "meaning": "Mặc dù, dẫu cho",
        "example": "尽管平时工作很忙，但每天都想抽出时间陪你聊天。",
        "examplePinyin": "Jǐnguǎn píngshí gōngzuò hěn máng, dàn měitiān dōu xiǎng chōuchū shíjiān péi nǐ liáotiān.",
        "exampleMeaning": "Dẫu cho công việc bận rộn, mỗi ngày anh vẫn luôn muốn dành thời gian trò chuyện với em."
      },
      {
        "hanzi": "顺利",
        "pinyin": "shùnlì",
        "type": "Tính từ",
        "meaning": "Thuận lợi, suôn sẻ",
        "example": "祝 Ngọc hôm nay làm việc thật thuận lợi và nhiều niềm vui!",
        "examplePinyin": "Zhù Ngọc jīntiān gōngzuò shífēn shùnlì!",
        "exampleMeaning": "Chúc Ngọc hôm nay đi làm thật thuận lợi, suôn sẻ và rạng rỡ nhé!"
      },
      {
        "hanzi": "丰富",
        "pinyin": "fēngfù",
        "type": "Tính từ",
        "meaning": "Phong phú, dồi dào",
        "example": "愿我们的每一天都过得丰富而充实。",
        "examplePinyin": "Yuàn wǒmen de měi yī tiān dōu guò de fēngfù ér chōngshí.",
        "exampleMeaning": "Mong mỗi ngày của hai đứa mình đều trôi qua thật phong phú và ý nghĩa."
      },
      {
        "hanzi": "严格",
        "pinyin": "yángé",
        "type": "Tính từ",
        "meaning": "Nghiêm khắc, chặt chẽ",
        "example": "对学习虽然要严格，但也要记得劳逸结合哦。",
        "examplePinyin": "Duì xuéxí suīrán yào yángé, dàn yě yào jìde láoyì jiéhé o.",
        "exampleMeaning": "Học tập tuy cần nghiêm túc, nhưng nhớ nghỉ ngơi điều độ em nhé."
      },
      {
        "hanzi": "暂时",
        "pinyin": "zhànshí",
        "type": "Phó từ/Danh từ",
        "meaning": "Tạm thời, trước mắt",
        "example": "暂时的分别只是为了未来更好的相聚。",
        "examplePinyin": "Zhànshí de fēnbié zhǐshì wèile wèilái gèng hǎo de xiāngjù.",
        "exampleMeaning": "Tạm thời xa nhau một chút chỉ là để tương lai được gắn bó dài lâu hơn."
      },
      {
        "hanzi": "提醒",
        "pinyin": "tíxǐng",
        "type": "Động từ",
        "meaning": "Nhắc nhở, dặn dò",
        "example": "天气变冷了，提醒小笨蛋记得添一件外套。",
        "examplePinyin": "Tiānqì biàn lěng le, tíxǐng xiǎo bèndàn jìde tiān yī jiàn wàitào.",
        "exampleMeaning": "Trời trở lạnh rồi, nhắc cô bé nhớ mặc thêm áo ấm nhé."
      },
      {
        "hanzi": "接受",
        "pinyin": "jiēshòu",
        "type": "Động từ",
        "meaning": "Tiếp nhận, đón nhận",
        "example": "坦然接受生活的小挑战，你会发现自己比想象中更坚强。",
        "examplePinyin": "Tǎnrán jiēshòu shēnghuó de xiǎo tiǎozhàn, nǐ huì fāxiàn zìjǐ bǐ xiǎngxiàng zhōng gèng jiānqiáng.",
        "exampleMeaning": "Thản nhiên đón nhận thử thách, em sẽ thấy mình mạnh mẽ hơn tưởng tượng nhiều."
      },
      {
        "hanzi": "优秀",
        "pinyin": "yōuxiù",
        "type": "Tính từ",
        "meaning": "Ưu tú, xuất sắc",
        "example": "在我眼里，认真努力的 Ngọc 永远是最优秀的。",
        "examplePinyin": "Zài wǒ yǎn lǐ, rènzhēn nǔlì de Ngọc yǒngyuǎn shì zuì yōuxiù de.",
        "exampleMeaning": "Trong mắt anh, một cô gái chăm chỉ như Ngọc luôn là người tuyệt vời nhất."
      },
      {
        "hanzi": "关键",
        "pinyin": "guānjiàn",
        "type": "Danh từ/Tính từ",
        "meaning": "Mấu chốt, then chốt",
        "example": "两个人在一起，坦诚与包容才是最关键的。",
        "examplePinyin": "Liǎng gè rén zài yīqǐ, tǎnchéng yǔ bāoróng cái shì zuì guānjiàn de.",
        "exampleMeaning": "Hai người ở bên nhau, chân thành và bao dung mới là điều cốt lõi nhất."
      },
      {
        "hanzi": "考虑",
        "pinyin": "kǎolǜ",
        "type": "Động từ",
        "meaning": "Suy nghĩ, cân nhắc",
        "example": "无论遇到什么选择，慢慢考虑，别给自己太大压力。",
        "examplePinyin": "Wúlùn yùdào shénme xuǎnzé, mànman kǎolǜ, bié gěi zìjǐ tài dà yālì.",
        "exampleMeaning": "Gặp bất kỳ lựa chọn nào cũng cứ thong thả cân nhắc, đừng tạo áp lực cho mình nhé."
      },
      {
        "hanzi": "印象",
        "pinyin": "yìnxiàng",
        "type": "Danh từ",
        "meaning": "Ấn tượng",
        "example": "第一次在 Facebook Dating 聊天的美好印象，我至今都记得。",
        "examplePinyin": "Dì-yī cì liáotiān de měihǎo yìnxiàng, wǒ zhìjīn dōu jìde.",
        "exampleMeaning": "Ấn tượng ngọt ngào ngày đầu tiên trò chuyện, anh vẫn luôn nhớ như in."
      },
      {
        "hanzi": "态度",
        "pinyin": "tàidu",
        "type": "Danh từ",
        "meaning": "Thái độ, tâm thế",
        "example": "积极乐观的生活态度能让每一天都充满阳光。",
        "examplePinyin": "Jījí lèguān de shēnghuó tàidu néng ràng měi yī tiān dōu chōngmǎn yángguāng.",
        "exampleMeaning": "Tâm thế lạc quan sẽ giúp từng ngày của em luôn ngập tràn ánh nắng."
      },
      {
        "hanzi": "稍微",
        "pinyin": "shāowēi",
        "type": "Phó từ",
        "meaning": "Một chút, hơi hơi",
        "example": "累了就稍微闭目养神一会儿，别把自己逼得太紧。",
        "examplePinyin": "Lèi le jiù shāowēi bìmù yǎngshén yīhuìr, bié bǎ zìjǐ bī de tài jǐn.",
        "exampleMeaning": "Mệt mỏi thì chợp mắt nghỉ ngơi một chút, đừng ép bản thân quá sức nha em."
      },
      {
        "hanzi": "互相",
        "pinyin": "hùxiāng",
        "type": "Phó từ",
        "meaning": "Lẫn nhau, cùng nhau",
        "example": "好的感情就是两个人互相理解、互相照顾。",
        "examplePinyin": "Hǎo de gǎnqíng jiùshì liǎng gè rén hùxiāng lǐjiě, hùxiāng zhàogù.",
        "exampleMeaning": "Tình cảm đẹp là khi cả hai biết thấu hiểu và chăm sóc cho nhau từng ngày."
      },
      {
        "hanzi": "诚实",
        "pinyin": "chéngshí",
        "type": "Tính từ",
        "meaning": "Chân thật, thành thật",
        "example": "诚实面对内心的感受，生活会变得更自在。",
        "examplePinyin": "Chéngshí miànduì nèixīn de gǎnshòu, shēnghuó huì biànde gèng zìzài.",
        "exampleMeaning": "Thành thật với cảm xúc chính mình, cuộc sống sẽ nhẹ nhàng và an nhiên hơn."
      },
      {
        "hanzi": "表达",
        "pinyin": "biǎodá",
        "type": "Động từ",
        "meaning": "Diễn đạt, bày tỏ",
        "example": "如果想念也可以具象化，那就是每天都想为你表达爱意。",
        "examplePinyin": "Rúguǒ xiǎngniàn yě kěyǐ jùxiànghuà, nà jiùshì měitiān dōu xiǎng wèi nǐ biǎodá àiyì.",
        "exampleMeaning": "Nếu nỗi nhớ có hình hài, thì đó là mỗi ngày anh đều muốn gửi trọn yêu thương tới em."
      },
      {
        "hanzi": "详细",
        "pinyin": "xiángxì",
        "type": "Tính từ",
        "meaning": "Chi tiết, tỉ mỉ",
        "example": "把今天遇到的有趣小事详细地讲给我听吧。",
        "examplePinyin": "Bǎ jīntiān yùdào de yǒuqù xiǎoshì xiángxì de jiǎng gěi wǒ tīng ba.",
        "exampleMeaning": "Kể thật chi tiết những chuyện vui hôm nay cho anh nghe cùng nhé."
      },
      {
        "hanzi": "骄傲",
        "pinyin": "jiāo'ào",
        "type": "Tính từ/Danh từ",
        "meaning": "Kiêu hãnh, tự hào",
        "example": "看到你一点一滴的成长与进步，我都为你感到骄傲。",
        "examplePinyin": "Kàndào nǐ yī diǎn yī dī de chéngzhǎng yǔ jìnbù, wǒ dōu wèi nǐ gǎndào jiāo'ào.",
        "exampleMeaning": "Nhìn thấy từng bước tiến bộ của em, anh luôn tự hào về em vô cùng."
      }
    ],

    hsk5: [
      {
        hanzi: "彼此",
        pinyin: "bǐcǐ",
        type: "Đại từ",
        meaning: "Lẫn nhau, hai bên",
        example: "我们彼此相爱，不畏距离。",
        examplePinyin: "Wǒmen bǐcǐ xiāng'ài, bù wèi jùlí.",
        exampleMeaning: "Chúng mình yêu thương lẫn nhau, chẳng ngại ngần khoảng cách."
      },
      {
        hanzi: "温柔",
        pinyin: "wēnróu",
        type: "Tính từ",
        meaning: "Dịu dàng, hiền dịu",
        example: "岁月漫长，愿你一直被温柔以待。",
        examplePinyin: "Suìyuè màncháng, yuàn nǐ yīzhí bèi wēnróu yǐ dài.",
        exampleMeaning: "Tháng năm dẫu dài, mong em luôn được thế giới dịu dàng che chở."
      },
      {
        hanzi: "期待",
        pinyin: "qīdài",
        type: "Động từ/Danh từ",
        meaning: "Mong đợi, kỳ vọng",
        example: "每一次相聚都让我满怀期待。",
        examplePinyin: "Měi yī cì xiāngjù dōu ràng wǒ mǎnhuái qīdài.",
        exampleMeaning: "Mỗi một lần gặp gỡ đều khiến anh đong đầy mong chờ."
      },
      {
        hanzi: "默契",
        pinyin: "mòqì",
        type: "Danh từ/Tính từ",
        meaning: "Thấu hiểu, ăn ý",
        example: "我们之间有着无需言说的默契。",
        examplePinyin: "Wǒmen zhījiān yǒuzhe wúxū yánshuō de mòqì.",
        exampleMeaning: "Giữa hai đứa mình luôn có sự thấu hiểu không cần nói thành lời."
      },
      {
        hanzi: "承诺",
        pinyin: "chéngnuò",
        type: "Động từ/Danh từ",
        meaning: "Lời hứa, cam kết",
        example: "对你的每一个承诺，我都会认真兑现。",
        examplePinyin: "Duì nǐ de měi yī gè chéngnuò, wǒ dōu huì rènzhēn duìxiàn.",
        exampleMeaning: "Mỗi lời hứa dành cho em, anh đều sẽ nghiêm túc thực hiện."
      },
      {
        hanzi: "依赖",
        pinyin: "yīlài",
        type: "Động từ",
        meaning: "Dựa dẫm, ỷ lại",
        example: "累的时候，尽管来依赖我吧。",
        examplePinyin: "Lèi de shíhou, jǐnguǎn lái yīlài wǒ ba.",
        exampleMeaning: "Lúc nào mệt mỏi, cứ tự nhiên tựa vào vai anh nhé."
      },
      {
        hanzi: "难忘",
        pinyin: "nánwàng",
        type: "Tính từ",
        meaning: "Khó quên, đáng nhớ",
        example: "和你在一起的点点滴滴都令人难忘。",
        examplePinyin: "Hé nǐ zài yīqǐ de diǎndiǎndīdī dōu lìng rén nánwàng.",
        exampleMeaning: "Từng khoảnh khắc nhỏ bé bên em đều khó mà phai mờ."
      },
      {
        hanzi: "踏实",
        pinyin: "tāshi",
        type: "Tính từ",
        meaning: "An tâm, vững dạ",
        example: "听见你的声音，心里就很踏实。",
        examplePinyin: "Tīngjiàn nǐ de shēngyīn, xīn lǐ jiù hěn tāshi.",
        exampleMeaning: "Chỉ cần nghe được giọng em là lòng anh thấy vững vàng, an tâm."
      },
      {
        hanzi: "牵挂",
        pinyin: "qiānguà",
        type: "Động từ/Danh từ",
        meaning: "Vấn vương, thương nhớ",
        example: "远在异地，心中唯一的牵挂就是你。",
        examplePinyin: "Yuǎn zài yìdì, xīn zhōng wéiyī de qiānguà jiù shì nǐ.",
        exampleMeaning: "Dẫu xa xôi cách trở, điều duy nhất vấn vương trong lòng anh chính là em."
      },
      {
        hanzi: "欣慰",
        pinyin: "xīnwèi",
        type: "Tính từ",
        meaning: "Vui mừng, an lòng",
        example: "看到你开开心心的，我就感到十分欣慰。",
        examplePinyin: "Kàndào nǐ kāikāixīnxīn de, wǒ jiù gǎndào shífēn xīnwèi.",
        exampleMeaning: "Thấy em luôn tươi vui yêu đời là anh thấy ấm lòng khôn xiết."
      },
      {
        hanzi: "把握",
        pinyin: "bǎwò",
        type: "Động từ/Danh từ",
        meaning: "Nắm bắt, chắc chắn",
        example: "我们要把握好当下的每一个幸福瞬间。",
        examplePinyin: "Wǒmen yào bǎwò hǎo dāngxià de měi yī gè xìngfú shùnjiān.",
        exampleMeaning: "Chúng mình hãy nắm bắt trọn vẹn từng khoảnh khắc hạnh phúc của hiện tại."
      },
      {
        hanzi: "克服",
        pinyin: "kèfú",
        type: "Động từ",
        meaning: "Khắc phục, vượt qua",
        example: "只要同心协力，一切困难都能克服。",
        examplePinyin: "Zhǐyào tóngxīn xiélì, yīqiè kùnnan dōu néng kèfú.",
        exampleMeaning: "Chỉ cần hai đứa đồng lòng, mọi chông gai đều có thể vượt qua."
      },
      {
        hanzi: "深刻",
        pinyin: "shēnkè",
        type: "Tính từ",
        meaning: "Sâu sắc, thâm trầm",
        example: "你的一言一行都在我心中留下了深刻的印记。",
        examplePinyin: "Nǐ de yī yán yī xíng dōu zài wǒ xīn zhōng liúxià le shēnkè de yìnjì.",
        exampleMeaning: "Từng lời nói cử chỉ của em đều khắc sâu trong trái tim anh."
      },
      {
        hanzi: "坦率",
        pinyin: "tǎnshuài",
        type: "Tính từ",
        meaning: "Thẳng thắn, chân thành",
        example: "坦率的交流让我们的感情更加亲密。",
        examplePinyin: "Tǎnshuài de jiāoliú ràng wǒmen de gǎnqíng gèngjiā qīnmì.",
        exampleMeaning: "Những chia sẻ thẳng thắn giúp tình cảm của hai đứa thêm phần khăng khít."
      },
      {
        hanzi: "细腻",
        pinyin: "xìnì",
        type: "Tính từ",
        meaning: "Tinh tế, chu đáo",
        example: "你细腻的心思总是能给生活带来惊喜。",
        examplePinyin: "Nǐ xìnì de xīnsi zǒngshì néng gěi shēnghuó dàilái jīngxǐ.",
        exampleMeaning: "Sự tinh tế, chu đáo của em luôn mang lại những niềm vui bất ngờ cho cuộc sống."
      }
    ,
      {
        "hanzi": "启发",
        "pinyin": "qǐfā",
        "type": "Động từ/Danh từ",
        "meaning": "Gợi mở, truyền cảm hứng",
        "example": "每次和你聊天，总能给我很多温暖的生活启发。",
        "examplePinyin": "Měicì hé nǐ liáotiān, zǒng néng gěi wǒ hěn duō wēnnuǎn de shēnghuó qǐfā.",
        "exampleMeaning": "Mỗi lần trò chuyện cùng em luôn truyền cho anh nguồn cảm hứng sống ấm áp."
      },
      {
        "hanzi": "坚强",
        "pinyin": "jiānqiáng",
        "type": "Tính từ",
        "meaning": "Kiên cường, mạnh mẽ",
        "example": "你比自己想象的要更加坚强勇敢。",
        "examplePinyin": "Nǐ bǐ zìjǐ xiǎngxiàng de yào gèngjiā jiānqiáng yǒnggǎn.",
        "exampleMeaning": "Em mạnh mẽ và kiên cường hơn những gì bản thân em từng nghĩ rất nhiều."
      },
      {
        "hanzi": "执着",
        "pinyin": "zhízhuó",
        "type": "Tính từ",
        "meaning": "Kiên định, một lòng hướng tới",
        "example": "执着于梦想的人，眼里总会有星辰大海。",
        "examplePinyin": "Zhízhuó yú mèngxiǎng de rén, yǎn lǐ zǒng huì yǒu xīngchén dàhǎi.",
        "exampleMeaning": "Người kiên định với ước mơ thì trong mắt luôn có cả biển rộng trời sao."
      },
      {
        "hanzi": "领悟",
        "pinyin": "lǐngwù",
        "type": "Động từ",
        "meaning": "Lĩnh hội, thấu hiểu sâu sắc",
        "example": "慢慢领悟生活的真谛，学会珍惜眼前的点滴幸福。",
        "examplePinyin": "Mànman lǐngwù shēnghuó de zhēndì, xuéhuì zhēnxī yǎnqián de diǎndī xìngfú.",
        "exampleMeaning": "Thấu hiểu chân lý cuộc sống, biết trân quý từng hạt mầm hạnh phúc trước mắt."
      },
      {
        "hanzi": "宽容",
        "pinyin": "kuānróng",
        "type": "Tính từ/Động từ",
        "meaning": "Bao dung, độ lượng",
        "example": "宽容不是妥协，而是出于深沉的理解与爱。",
        "examplePinyin": "Kuānróng bù shì tuǒxié, ér shì chūyú shēnchén de lǐjiě yǔ ài.",
        "exampleMeaning": "Bao dung không phải là thỏa hiệp, mà bắt nguồn từ sự thấu hiểu và yêu thương sâu sắc."
      },
      {
        "hanzi": "寄托",
        "pinyin": "jìtuō",
        "type": "Động từ",
        "meaning": "Gửi gắm (niềm tin, hy vọng)",
        "example": "把所有的思念与温柔，都寄托在每一条晚安消息里。",
        "examplePinyin": "Bǎ suǒyǒu de sīniàn yǔ wēnróu, dōu jìtuō zài měi yī tiáo wǎn'ān xiāoxi lǐ.",
        "exampleMeaning": "Gửi gắm trọn vẹn thương nhớ và dịu dàng vào từng lời chúc ngủ ngon mỗi tối."
      },
      {
        "hanzi": "憧憬",
        "pinyin": "chōngjǐng",
        "type": "Động từ/Danh từ",
        "meaning": "Hướng về tương lai, khao khát",
        "example": "憧憬着未来我们拥有自己温馨小窝的那一天。",
        "examplePinyin": "Chōngjǐngzhe wèilái wǒmen yǒngyǒu zìjǐ wēnxīn xiǎowō de nà yī tiān.",
        "exampleMeaning": "Mong ước về tương lai hai đứa mình cùng vun vén cho mái ấm nhỏ thân thương."
      },
      {
        "hanzi": "优雅",
        "pinyin": "yōuyǎ",
        "type": "Tính từ",
        "meaning": "Tao nhã, thanh lịch",
        "example": "喜欢你举手投足间的温柔与优雅。",
        "examplePinyin": "Xǐhuan nǐ jǔshǒu-tóuzú jiān de wēnróu yǔ yōuyǎ.",
        "exampleMeaning": "Yêu nét dịu dàng, tao nhã trong từng cử chỉ nhỏ nhắn của em."
      },
      {
        "hanzi": "倾听",
        "pinyin": "qīngtīng",
        "type": "Động từ",
        "meaning": "Chăm chú lắng nghe",
        "example": "无论你有多少开心或委屈，我都愿意做你最忠实的倾听者。",
        "examplePinyin": "Wúlùn nǐ yǒu duōshao kāixīn huò wěiqu, wǒ dōu yuànyì zuò nǐ zuì zhōngshí de qīngtīngzhě.",
        "exampleMeaning": "Dù là chuyện vui hay muộn phiền, anh luôn sẵn sàng làm người lắng nghe em chân thành nhất."
      },
      {
        "hanzi": "沟通",
        "pinyin": "gōutōng",
        "type": "Động từ",
        "meaning": "Giao tiếp, sẻ chia kết nối",
        "example": "良好的沟通是化解一切距离与烦恼的钥匙。",
        "examplePinyin": "Liánghǎo de gōutōng shì huàjiě yīqiè jùlí yǔ fánnǎo de yàoshi.",
        "exampleMeaning": "Sự sẻ chia chân tình là chìa khóa hóa giải mọi khoảng cách và âu lo."
      },
      {
        "hanzi": "感慨",
        "pinyin": "gǎnkǎi",
        "type": "Động từ",
        "meaning": "Cảm thán, xúc động bồi hồi",
        "example": "回想我们一路走来的点点滴滴，心中满是感慨与感恩。",
        "examplePinyin": "Huíxiǎng wǒmen yīlù zǒu lái de diǎndiǎndīdī, xīn zhōng mǎn shì gǎnkǎi yǔ gǎn'ēn.",
        "exampleMeaning": "Ngoảnh nhìn chặng đường đã qua, lòng tràn ngập cảm xúc và biết ơn."
      },
      {
        "hanzi": "舍不得",
        "pinyin": "shěbude",
        "type": "Động từ",
        "meaning": "Không nỡ, tiếc nuối",
        "example": "每次送你上车离开，心里都满是舍不得。",
        "examplePinyin": "Měicì sòng nǐ shàng chē líkāi, xīn lǐ dōu mǎn shì shěbude.",
        "exampleMeaning": "Mỗi lần tiễn em lên xe, trong lòng anh đều đầy ắp sự bịn rịn không nỡ rời."
      },
      {
        "hanzi": "融洽",
        "pinyin": "róngqià",
        "type": "Tính từ",
        "meaning": "Hòa hợp, êm ấm",
        "example": "希望我们相处的每一刻都能如此融洽自在。",
        "examplePinyin": "Xīwàng wǒmen xiāngchǔ de měi yī kè dōu néng rúcǐ róngqià zìzài.",
        "exampleMeaning": "Mong rằng từng khoảnh khắc hai đứa bên nhau luôn êm ấm, tự nhiên."
      },
      {
        "hanzi": "坦诚",
        "pinyin": "tǎnchéng",
        "type": "Tính từ",
        "meaning": "Chân thành, cởi mở",
        "example": "坦诚相待是我们感情最坚固的基石。",
        "examplePinyin": "Tǎnchéng xiāngdài shì wǒmen gǎnqíng zuì jiāngù de jīshí.",
        "exampleMeaning": "Đối đãi chân thành, cởi mở là nền tảng vững chắc nhất cho chuyện tình của chúng mình."
      },
      {
        "hanzi": "陪伴",
        "pinyin": "péibàn",
        "type": "Động từ",
        "meaning": "Đồng hành, cận kề bên em",
        "example": "最长情的告白，莫过于默默无言的深情陪伴。",
        "examplePinyin": "Zuì chángqíng de gàobái, mòguòyú mòmò wúyán de shēnqíng péibàn.",
        "exampleMeaning": "Lời tỏ tình dài lâu nhất chính là sự đồng hành son sắt lặng thầm bên nhau."
      }
    ],

    hsk6: [
      {
        hanzi: "执子之手",
        pinyin: "zhí zǐ zhī shǒu",
        type: "Thành ngữ",
        meaning: "Nắm lấy tay em (cùng đi đến trọn đời)",
        example: "执子之手，与子偕老。",
        examplePinyin: "Zhí zǐ zhī shǒu, yǔ zǐ xiélǎo.",
        exampleMeaning: "Nắm lấy tay em, cùng nhau già đi qua năm tháng."
      },
      {
        hanzi: "心心相印",
        pinyin: "xīnxīn xiāngyìn",
        type: "Thành ngữ",
        meaning: "Đồng tâm hiệp lực, tâm đầu ý hợp",
        example: "哪怕相隔两地，我们依然心心相印。",
        examplePinyin: "Nǎpà xiānggé liǎng dì, wǒmen yīrán xīnxīn xiāngyìn.",
        exampleMeaning: "Dẫu cách trở hai nơi, hai trái tim vẫn luôn chung một nhịp đập."
      },
      {
        hanzi: "岁月静好",
        pinyin: "suìyuè jìng hǎo",
        type: "Thành ngữ",
        meaning: "Tháng năm tĩnh lặng, an yên",
        example: "愿得一人心，白首不相离，岁月静好。",
        examplePinyin: "Yuàn dé yī rén xīn, bái shǒu bù xiāng lí, suìyuè jìng hǎo.",
        exampleMeaning: "Nguyện có một người tri kỷ, bạc đầu chẳng rời, tháng ngày an yên."
      },
      {
        hanzi: "相濡以沫",
        pinyin: "xiāng rú yǐ mò",
        type: "Thành ngữ",
        meaning: "Chia ngọt sẻ bùi lúc hoạn nạn",
        example: "风雨同舟，相濡以沫，便是最深的情意。",
        examplePinyin: "Fēngyǔ tóng zhōu, xiāng rú yǐ mò, biàn shì zuì shēn de qíngyì.",
        exampleMeaning: "Cùng vượt phong ba, chia ngọt sẻ bùi, đó là chân tình sâu đậm nhất."
      },
      {
        hanzi: "细水长流",
        pinyin: "xì shuǐ cháng liú",
        type: "Thành ngữ",
        meaning: "Êm đềm bền bỉ, lâu dài",
        example: "真正的爱情不是轰轰烈烈，而是细水长流。",
        examplePinyin: "Zhēnzhèng de àiqíng bù shì hōnghōnglièliè, ér shì xì shuǐ cháng liú.",
        exampleMeaning: "Tình yêu đích thực không cần ồn ào mãnh liệt, mà là êm đềm bền chặt tháng năm."
      },
      {
        hanzi: "矢志不渝",
        pinyin: "shǐ zhì bù yú",
        type: "Thành ngữ",
        meaning: "Son sắt một lòng, không bao giờ thay đổi",
        example: "我对你的爱，矢志不渝。",
        examplePinyin: "Wǒ duì nǐ de ài, shǐ zhì bù yú.",
        exampleMeaning: "Tình yêu anh dành cho em, mãi vẹn nguyên không hề lay chuyển."
      },
      {
        hanzi: "风雨同舟",
        pinyin: "fēng yǔ tóng zhōu",
        type: "Thành ngữ",
        meaning: "Cùng chung hoạn nạn, vượt qua sóng gió",
        example: "无论未来的路怎样，我们都风雨同舟。",
        examplePinyin: "Wúlùn wèilái de lù zěnyàng, wǒmen dōu fēng yǔ tóng zhōu.",
        exampleMeaning: "Dù con đường phía trước thế nào, hai đứa mình vẫn luôn kề vai sát cánh."
      },
      {
        hanzi: "潜移默化",
        pinyin: "qián yí mò huà",
        type: "Thành ngữ",
        meaning: "Thấm nhuần tự nhiên từng ngày",
        example: "在你的影响下，我也变得更热爱生活了。",
        examplePinyin: "Zài nǐ de yǐngxiǎng xià, wǒ yě biànde gèng rè'ài shēnghuó le.",
        exampleMeaning: "Nhờ nguồn năng lượng ấm áp từ em, anh cũng thêm yêu từng phút giây cuộc sống."
      },
      {
        hanzi: "循序渐进",
        pinyin: "xún xù jiàn jìn",
        type: "Thành ngữ",
        meaning: "Tiến bộ từng bước vững chắc",
        example: "学中文要循序渐进，相信 Ngọc 一定能考过更高水平！",
        examplePinyin: "Xué zhōngwén yào xún xù jiàn jìn, xiāngxìn Ngọc yīdìng néng kǎoguò gèng gāo shuǐpíng!",
        exampleMeaning: "Học tiếng Trung cứ tiến từng bước một, anh tin chắc Ngọc sẽ chinh phục những đỉnh cao mới!"
      },
      {
        hanzi: "白头偕老",
        pinyin: "bái tóu xié lǎo",
        type: "Thành ngữ",
        meaning: "Cùng nhau đi đến bạc đầu",
        example: "愿得一心人，白头偕老永不分。",
        examplePinyin: "Yuàn dé yī xīn rén, bái tóu xié lǎo yǒng bù fēn.",
        exampleMeaning: "Nguyện trọn kiếp bên một người, cùng nhau đi đến đầu bạc răng long chẳng rời."
      }
    ,
      {
        "hanzi": "情有独钟",
        "pinyin": "qíng yǒu dú zhōng",
        "type": "Thành ngữ",
        "meaning": "Dành trọn chân tình cho một người",
        "example": "世间繁华千千万，而我唯独对你情有独钟。",
        "examplePinyin": "Shìjiān fánhuá qiānqiān-wànwàn, ér wǒ wéidú duì nǐ qíng yǒu dú zhōng.",
        "exampleMeaning": "Thế gian phồn hoa muôn vạn nẻo, nhưng lòng anh chỉ hướng về một mình em."
      },
      {
        "hanzi": "念念不忘",
        "pinyin": "niàn niàn bù wàng",
        "type": "Thành ngữ",
        "meaning": "Khắc sâu trong tâm khảm, nhớ mãi không nguôi",
        "example": "念念不忘，必有回响。只要心中有爱，时光终不会辜负。",
        "examplePinyin": "Niàn niàn bù wàng, bì yǒu huíxiǎng.",
        "exampleMeaning": "Tâm niệm không quên ắt có hồi đáp, chân tình rồi sẽ được thời gian đền đáp xứng đáng."
      },
      {
        "hanzi": "朝夕相处",
        "pinyin": "zhāo xī xiāng chǔ",
        "type": "Thành ngữ",
        "meaning": "Sớm tối có nhau, kề vai sát cánh",
        "example": "期待未来能与你朝夕相处，共度三餐四季。",
        "examplePinyin": "Qīdài wèilái néng yǔ nǐ zhāo xī xiāng chǔ, gòngdù sān cān sì jì.",
        "exampleMeaning": "Mong ngóng ngày tương lai được sớm tối bên em, cùng nhau qua bốn mùa no ấm."
      },
      {
        "hanzi": "相敬如宾",
        "pinyin": "xiāng jìng rú bīn",
        "type": "Thành ngữ",
        "meaning": "Tương kính như tân, kính trọng và nâng niu nhau",
        "example": "彼此尊重，相敬如宾，方能走过漫长岁月。",
        "examplePinyin": "Bǐcǐ zūnzhòng, xiāng jìng rú bīn, fāng néng zǒuguò màncháng suìyuè.",
        "exampleMeaning": "Biết tôn trọng và quý mến lẫn nhau mới có thể nắm tay qua năm tháng dài lâu."
      },
      {
        "hanzi": "举案齐眉",
        "pinyin": "jǔ àn qí méi",
        "type": "Thành ngữ",
        "meaning": "Vợ chồng hòa thuận, yêu thương tôn kính",
        "example": "举案齐眉相伴老，同舟共济度春秋。",
        "examplePinyin": "Jǔ àn qí méi xiāng bàn lǎo, tóng zhōu gòng jì dù chūnqiū.",
        "exampleMeaning": "Cùng nhau hòa thuận đến già, kề vai sát cánh qua mọi xuân thu."
      },
      {
        "hanzi": "一见钟情",
        "pinyin": "yī jiàn zhōng qíng",
        "type": "Thành ngữ",
        "meaning": "Vừa gặp đã yêu, trúng tiếng sét ái tình",
        "example": "也许第一次聊天，便早已是一见倾心。",
        "examplePinyin": "Yěxǔ dì-yī cì liáotiān, biàn zǎoyǐ shì yījiàn qīngxīn.",
        "exampleMeaning": "Có lẽ ngay từ cuộc trò chuyện đầu tiên, trái tim đã thầm rung động."
      },
      {
        "hanzi": "患难与共",
        "pinyin": "huàn nàn yǔ gòng",
        "type": "Thành ngữ",
        "meaning": "Đồng cam cộng khổ, chia ngọt sẻ bùi",
        "example": "真正的深情，是顺境时携手，逆境时患难与共。",
        "examplePinyin": "Zhēnzhèng de shēnqíng, shì shùnjìng shí xiéshǒu, nìjìng shí huàn nàn yǔ gòng.",
        "exampleMeaning": "Chân tình đích thực là lúc thuận lợi thì chung bước, khi trắc trở vẫn kề vai gánh vác."
      },
      {
        "hanzi": "耳濡目染",
        "pinyin": "ěr rú mù rǎn",
        "type": "Thành ngữ",
        "meaning": "Lắng nghe quan sát rồi thấm nhuần tự nhiên",
        "example": "天天听你念中文，我也耳濡目染学到了不少呢！",
        "examplePinyin": "Tiāntiān tīng nǐ niàn zhōngwén, wǒ yě ěr rú mù rǎn xué dào le bù shǎo ne!",
        "exampleMeaning": "Hằng ngày nghe em đọc tiếng Trung, anh cũng thấm dần học được bao điều hay!"
      },
      {
        "hanzi": "融会贯通",
        "pinyin": "róng huì guàn tōng",
        "type": "Thành ngữ",
        "meaning": "Hiểu sâu sắc và kết hợp nhuần nhuyễn",
        "example": "祝 Ngọc học tiếng Trung ngày càng tinh thông, mọi ngữ pháp đều融会贯通！",
        "examplePinyin": "Zhù Ngọc xué zhōngwén yuè lái yuè tīngtōng, róng huì guàn tōng!",
        "exampleMeaning": "Chúc Ngọc học tiếng Trung ngày một siêu đẳng, bài thi nào cũng vượt qua nhẹ nhàng!"
      },
      {
        "hanzi": "深思熟虑",
        "pinyin": "shēn sī shú lǜ",
        "type": "Thành ngữ",
        "meaning": "Suy nghĩ thấu đáo, chín chắn",
        "example": "每一个重要的决定，都是我们深思熟虑后的双向奔赴。",
        "examplePinyin": "Měi yī gè zhòngyào de juédìng, dōu shì wǒmen shēn sī shú lǜ hòu de shuāngxiàng bēnfù.",
        "exampleMeaning": "Mỗi quyết định quan trọng đều là sự thấu hiểu chín chắn và cùng hướng về nhau."
      },
      {
        "hanzi": "豁然开朗",
        "pinyin": "huò rán kāi lǎng",
        "type": "Thành ngữ",
        "meaning": "Bừng tỉnh ngộ, lòng nhẹ nhõm thênh thang",
        "example": "听到你温柔的开导，心中的烦恼顿时豁然开朗。",
        "examplePinyin": "Tīngdào nǐ wēnróu de kāidǎo, xīn zhōng de fánnǎo dùnshí huò rán kāi lǎng.",
        "exampleMeaning": "Nghe lời vỗ về dịu dàng của em, mọi ưu phiền trong lòng liền tan biến hết."
      },
      {
        "hanzi": "独一无二",
        "pinyin": "dú yī wú èr",
        "type": "Thành ngữ",
        "meaning": "Độc nhất vô nhị, có một không hai",
        "example": "在我心里，Sún 永远是独一无二的小太阳。",
        "examplePinyin": "Zài wǒ xīn lǐ, Sún yǒngyuǎn shì dú yī wú èr de xiǎo tàiyáng.",
        "exampleMeaning": "Trong trái tim anh, Sún mãi là vầng mặt trời nhỏ độc nhất vô nhị."
      },
      {
        "hanzi": "井井有条",
        "pinyin": "jǐng jǐng yǒu tiáo",
        "type": "Thành ngữ",
        "meaning": "Ngăn nắp, trật tự, đâu ra đấy",
        "example": "佩服你总是能把工作和生活安排得井井有条。",
        "examplePinyin": "Pèifú nǐ zǒngshì néng bǎ gōngzuò hé shēnghuó ānpái de jǐng jǐng yǒu tiáo.",
        "exampleMeaning": "Thật khâm phục em luôn biết thu xếp công việc và cuộc sống ngăn nắp, tinh tế."
      },
      {
        "hanzi": "名副其实",
        "pinyin": "míng fù qí shí",
        "type": "Thành ngữ",
        "meaning": "Danh xứng với thực, đúng như tên gọi",
        "example": "你认真专注的样子，真是名副其实的小才女！",
        "examplePinyin": "Nǐ rènzhēn zhuānzhù de yàngzi, zhēn shì míng fù qí shí de xiǎo cáinǚ!",
        "exampleMeaning": "Dáng vẻ tập trung chăm chỉ của em đúng là chuẩn cô nàng tài sắc vẹn toàn!"
      },
      {
        "hanzi": "守望相助",
        "pinyin": "shǒu wàng xiāng zhù",
        "type": "Thành ngữ",
        "meaning": "Che chở, tương trợ lẫn nhau",
        "example": "在彼此身旁，守望相助，成为对方最坚强的后盾。",
        "examplePinyin": "Zài bǐcǐ shēnpáng, shǒu wàng xiāng zhù, chéngwéi duìfāng zuì jiānqiáng de hòudùn.",
        "exampleMeaning": "Luôn cạnh bên chở che, trở thành điểm tựa vững vàng nhất cho nhau."
      }
    ],

    love: [
      {
        hanzi: "我想你。",
        pinyin: "Wǒ xiǎng nǐ.",
        meaning: "Anh nhớ em.",
        note: "Một câu đơn giản nhưng luôn là cảm xúc chân thực nhất mỗi sớm mai thức dậy."
      },
      {
        hanzi: "遇见你是我最美丽的意外。",
        pinyin: "Yùjiàn nǐ shì wǒ zuì měilì de yìwài.",
        meaning: "Gặp được em là điều bất ngờ đẹp đẽ nhất trong cuộc đời anh.",
        note: "Từ cuộc gặp gỡ định mệnh ngày 11/02/2026 trên Facebook Dating."
      },
      {
        hanzi: "你在海防，我在河内，但心一直在你身边。",
        pinyin: "Nǐ zài Hǎifáng, wǒ zài Hénèi, dàn xīn yīzhí zài nǐ shēnbiān.",
        meaning: "Em ở Hải Phòng, anh ở Hà Nội, nhưng trái tim anh luôn ở bên cạnh em.",
        note: "Khoảng cách 120km chẳng thể ngăn được sự chở che của anh dành cho em."
      },
      {
        hanzi: "愿有岁月可回首，且以深情共白头。",
        pinyin: "Yuàn yǒu suìyuè kě huíshǒu, qiě yǐ shēnqíng gòng báitóu.",
        meaning: "Mong có năm tháng để cùng nhìn lại, và lấy ân tình sâu đậm này cùng nhau đi đến bạc đầu.",
        note: "Câu thơ kinh điển về lời hẹn ước bên nhau trọn đời."
      },
      {
        hanzi: "只要是你，多久我都等。",
        pinyin: "Zhǐyào shì nǐ, duōjiǔ wǒ dōu děng.",
        meaning: "Chỉ cần là em, bao lâu anh cũng đợi.",
        note: "Chờ đón em tan làm, chờ từng chuyến xe về bên nhau."
      },
      {
        hanzi: "今天工作辛苦了，记得好好休息。",
        pinyin: "Jīntiān gōngzuò xīnkǔ le, jìde hǎohāo xiūxi.",
        meaning: "Hôm nay đi làm vất vả rồi, nhớ nghỉ ngơi thật tốt nhé.",
        note: "Lời nhắn yêu thương gửi đến cô gái chăm chỉ của anh."
      },
      {
        hanzi: "你笑起来真好看。",
        pinyin: "Nǐ xiào qǐlái zhēn hǎokàn.",
        meaning: "Mỗi khi em cười trông thật xinh xắn.",
        note: "Nụ cười của Sún là liều thuốc bổ cho một ngày mệt mỏi của anh."
      },
      {
        hanzi: "有你真好，天天开心哦！",
        pinyin: "Yǒu nǐ zhēn hǎo, tiāntiān kāixīn o!",
        meaning: "Có em thật tốt, mỗi ngày đều phải vui vẻ nhé!",
        note: "Lời chúc ấm áp từ anh gửi đến em yêu."
      }
    ]
  };

  let currentTab = "daily"; // "daily" | "flashcard" | "quiz" | "match" | "starred" | "love"
  let currentLevel = localStorage.getItem("hu_keo_sun_hsk_level") || "hsk4";
  let dailyOffset = 0;
  let flashcardIndex = 0;
  let flashcardFlipped = false;
  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  // Starred / Favorite Words Data Model
  const STARRED_KEY = "hu_keo_sun_starred_words";

  function getStarredList() {
    try {
      const raw = localStorage.getItem(STARRED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveStarredList(list) {
    try {
      localStorage.setItem(STARRED_KEY, JSON.stringify(list));
    } catch {}
  }

  function isStarred(hanzi) {
    const list = getStarredList();
    return list.some((item) => (typeof item === "string" ? item === hanzi : item.hanzi === hanzi));
  }

  function findWordByHanzi(hanzi) {
    for (const key of Object.keys(HSK_DATA)) {
      const match = HSK_DATA[key].find((w) => w.hanzi === hanzi);
      if (match) return { ...match, level: key };
    }
    return null;
  }

  function getAllStarredWords() {
    const list = getStarredList();
    const result = [];
    list.forEach((item) => {
      const hanzi = typeof item === "string" ? item : item.hanzi;
      const found = findWordByHanzi(hanzi);
      if (found) {
        result.push(found);
      } else if (typeof item === "object") {
        result.push(item);
      }
    });
    return result;
  }

  function toggleStar(wordObj) {
    let list = getStarredList();
    const hanzi = typeof wordObj === "string" ? wordObj : wordObj.hanzi;
    const exists = list.some((item) => (typeof item === "string" ? item === hanzi : item.hanzi === hanzi));
    if (exists) {
      list = list.filter((item) => (typeof item === "string" ? item !== hanzi : item.hanzi !== hanzi));
      saveStarredList(list);
      if (window.showToast) window.showToast(`Đã bỏ lưu "${hanzi}" khỏi Sổ tay`);
      return false;
    } else {
      const fullObj = typeof wordObj === "object" ? wordObj : findWordByHanzi(hanzi) || { hanzi };
      list.push(fullObj);
      saveStarredList(list);
      if (window.AudioManager) AudioManager.playCelebration();
      if (window.showToast) window.showToast(`⭐ Đã lưu "${hanzi}" vào Sổ tay yêu thích!`);
      return true;
    }
  }

  let activeAudio = null;

  function fallbackWebSpeech(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.resume();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "zh-CN";
      utter.rate = 0.85;
      const voices = window.speechSynthesis.getVoices() || [];
      const zhVoice = voices.find((v) => v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("zh"));
      if (zhVoice) utter.voice = zhVoice;
      window.speechSynthesis.speak(utter);
    } catch {}
  }

  // Reliable Dual Audio: Native online stream audio + Web Speech API fallback
  function speak(text) {
    if (!text) return;
    if (activeAudio) {
      try {
        activeAudio.pause();
        activeAudio.currentTime = 0;
      } catch {}
      activeAudio = null;
    }

    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=${encodeURIComponent(text)}`;
      const audio = new Audio(url);
      audio.playbackRate = 0.9;
      activeAudio = audio;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          fallbackWebSpeech(text);
        });
      }
    } catch {
      fallbackWebSpeech(text);
    }
  }

  // Get 5 deterministic words for today per level (cycling sequentially without duplicates)
  function getDailyFiveWords(level) {
    const list = HSK_DATA[level] || HSK_DATA.hsk4;
    const now = new Date();
    const dayIndex = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000) + dailyOffset;
    const startIdx = ((dayIndex * 5) % list.length + list.length) % list.length;
    const result = [];
    for (let i = 0; i < Math.min(5, list.length); i++) {
      const idx = (startIdx + i) % list.length;
      result.push(list[idx]);
    }
    return result;
  }

  function setLevel(lvl) {
    currentLevel = lvl;
    try {
      localStorage.setItem("hu_keo_sun_hsk_level", lvl);
    } catch {}
    dailyOffset = 0;
    flashcardIndex = 0;
    flashcardFlipped = false;
  }

  function getLevelLabel(lvl) {
    switch (lvl) {
      case "hsk4": return "HSK 4 (Của Ngọc 💕 • Nâng cao)";
      case "hsk5": return "HSK 5 (Chuyên sâu • Luyện thi)";
      case "hsk6": return "HSK 6 (Bậc thầy • Thành ngữ)";
      case "hsk3": return "HSK 3 (Cảm xúc • Giao tiếp)";
      case "hsk2": return "HSK 2 (Căn bản • Đời sống)";
      case "hsk1": return "HSK 1 (Nhập môn)";
      case "love": return "💕 Lời Yêu Thương";
      default: return lvl.toUpperCase();
    }
  }

  function renderDailyTab() {
    const container = document.getElementById("chineseTabContent");
    const words = getDailyFiveWords(currentLevel);
    const todayStr = new Date().toDateString();
    const state = window.GameState ? window.GameState.get() : {};
    const isCompletedToday = state.chineseDailyDoneDate === todayStr;

    let itemsHtml = "";
    words.forEach((w) => {
      itemsHtml += `
        <div class="chinese-word-card">
          <div class="cwc-top">
            <span class="cwc-hanzi">${w.hanzi}</span>
            <div class="cwc-meta">
              <span class="cwc-pinyin">${w.pinyin}</span>
              <span class="cwc-type">${w.type || "Từ vựng"}</span>
            </div>
            <div class="cwc-actions">
              <button class="btn-star ${isStarred(w.hanzi) ? "active" : ""}" data-hanzi="${w.hanzi}" title="${isStarred(w.hanzi) ? "Đã lưu vào Sổ tay (bấm để bỏ lưu)" : "Lưu vào Sổ tay yêu thích"}">${isStarred(w.hanzi) ? "⭐ Đã lưu" : "☆ Lưu từ"}</button>
              <button class="btn-speak" data-text="${w.hanzi}" title="Nghe phát âm chuẩn">🔊 Nghe</button>
              <a class="btn-dict" href="https://hanzii.net/search/word/${encodeURIComponent(w.hanzi)}?hl=vi" target="_blank" rel="noopener" title="Tra nét viết, bộ thủ trên từ điển Hanzii">📖 Hanzii</a>
            </div>
          </div>
          <div class="cwc-meaning">👉 <strong>${w.meaning}</strong></div>
          ${w.example ? `
            <div class="cwc-example">
              <span class="cwc-ex-hanzi">"${w.example}"</span>
              <span class="cwc-ex-pinyin">${w.examplePinyin}</span>
              <span class="cwc-ex-meaning">💬 ${w.exampleMeaning}</span>
            </div>
          ` : ""}
        </div>
      `;
    });

    container.innerHTML = `
      <div class="chinese-daily-wrap">
        <div class="chinese-level-bar">
          <div class="clb-left">
            <label>🏷️ Cấp độ:</label>
            <select id="selChineseLevel" class="pixel-select">
              <option value="hsk4" ${currentLevel === "hsk4" ? "selected" : ""}>HSK 4 (Của Ngọc 💕 • Nâng cao)</option>
              <option value="hsk5" ${currentLevel === "hsk5" ? "selected" : ""}>HSK 5 (Chuyên sâu • Luyện thi)</option>
              <option value="hsk6" ${currentLevel === "hsk6" ? "selected" : ""}>HSK 6 (Bậc thầy • Thành ngữ)</option>
              <option value="hsk3" ${currentLevel === "hsk3" ? "selected" : ""}>HSK 3 (Cảm xúc • Giao tiếp)</option>
              <option value="hsk2" ${currentLevel === "hsk2" ? "selected" : ""}>HSK 2 (Căn bản • Đời sống)</option>
              <option value="hsk1" ${currentLevel === "hsk1" ? "selected" : ""}>HSK 1 (Nhập môn)</option>
            </select>
          </div>
          <button class="btn-dict" id="btnNextDailySet" title="Đổi sang 5 từ tiếp theo">🎲 Đổi 5 từ</button>
        </div>

        <p class="chinese-help-text">🎯 Mỗi ngày 5 từ vừa vặn, không bị dồn ép. Bấm 🔊 để luyện nghe giọng đọc ấm áp hoặc 📖 Hanzii để tra nét bút thuận hoạt họa nhé!</p>

        <div class="chinese-daily-list">
          ${itemsHtml}
        </div>

        <div class="chinese-daily-finish-box">
          <div class="cdf-info">
            <span>🎁 Học xong 5 từ hôm nay:</span>
            <strong style="color: #d6336c">+2 🍬 Kẹo & +10 XP</strong>
          </div>
          <button class="pixel-btn ${isCompletedToday ? "btn-cream disabled" : "btn-pink"}" id="btnFinishDailyChinese" ${isCompletedToday ? "disabled" : ""}>
            ${isCompletedToday ? "🎉 Đã Ghi Nhớ Hôm Nay" : "Đã Nhớ Cả 5 Từ ✓"}
          </button>
        </div>
      </div>
    `;

    bindDailyEvents();
  }

  function bindDailyEvents() {
    const sel = document.getElementById("selChineseLevel");
    if (sel) {
      sel.addEventListener("change", (e) => {
        setLevel(e.target.value);
        renderDailyTab();
      });
    }

    const btnNextSet = document.getElementById("btnNextDailySet");
    if (btnNextSet) {
      btnNextSet.addEventListener("click", () => {
        dailyOffset++;
        renderDailyTab();
      });
    }

    document.querySelectorAll(".btn-speak").forEach((btn) => {
      btn.addEventListener("click", () => {
        speak(btn.dataset.text);
      });
    });

    document.querySelectorAll(".btn-star").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const hanzi = btn.dataset.hanzi;
        const starred = toggleStar(hanzi);
        btn.classList.toggle("active", starred);
        btn.innerHTML = starred ? "⭐ Đã lưu" : "☆ Lưu từ";
      });
    });

    const btnFinish = document.getElementById("btnFinishDailyChinese");
    if (btnFinish) {
      btnFinish.addEventListener("click", () => {
        if (window.AudioManager) AudioManager.playCelebration();
        const todayStr = new Date().toDateString();
        if (window.GameState) {
          const s = window.GameState.get();
          if (s.chineseDailyDoneDate !== todayStr) {
            s.chineseDailyDoneDate = todayStr;
            s.candy += 2;
            if (window.GameState.addXP) window.GameState.addXP(10);
            window.GameState.save();
            window.GameState.renderHUD();
          }
        }
        btnFinish.textContent = "🎉 Đã Ghi Nhớ Hôm Nay";
        btnFinish.className = "pixel-btn btn-cream disabled";
        btnFinish.disabled = true;
        if (window.showToast) window.showToast("🎉 Giỏi quá! Đã nhận thưởng học bài: +2 🍬 & +10 XP!");
      });
    }
  }

  function renderFlashcardTab() {
    const container = document.getElementById("chineseTabContent");
    const list = currentLevel === "starred" ? getAllStarredWords() : (HSK_DATA[currentLevel] || HSK_DATA.hsk4);
    
    if (list.length === 0) {
      container.innerHTML = `
        <div class="chinese-flashcard-wrap">
          <div class="chinese-level-bar">
            <div class="clb-left">
              <label>🏷️ Cấp độ:</label>
              <select id="selFlashcardLevel" class="pixel-select">
                <option value="starred" selected>⭐ Sổ Tay Yêu Thích (0 từ)</option>
                <option value="hsk4">HSK 4 (Của Ngọc 💕 • Nâng cao)</option>
                <option value="hsk5">HSK 5 (Chuyên sâu • Luyện thi)</option>
                <option value="hsk6">HSK 6 (Bậc thầy • Thành ngữ)</option>
                <option value="hsk3">HSK 3 (Cảm xúc • Giao tiếp)</option>
                <option value="hsk2">HSK 2 (Căn bản • Đời sống)</option>
                <option value="hsk1">HSK 1 (Nhập môn)</option>
              </select>
            </div>
          </div>
          <div class="flashcard-empty-box">
            <div style="font-size: 36px; margin-bottom: 8px;">⭐</div>
            <h3>Sổ tay từ vựng đang trống nè!</h3>
            <p>Em hãy bấm <strong>☆ Lưu từ</strong> ở mục <strong>5 Từ Hôm Nay</strong> hoặc các bài học khác để gom những từ vựng yêu thích vào đây ôn tập Flashcard riêng nhé 💕</p>
          </div>
        </div>
      `;
      const selEmpty = document.getElementById("selFlashcardLevel");
      if (selEmpty) {
        selEmpty.addEventListener("change", (e) => {
          setLevel(e.target.value);
          renderFlashcardTab();
        });
      }
      return;
    }

    if (flashcardIndex >= list.length) flashcardIndex = 0;
    if (flashcardIndex < 0) flashcardIndex = list.length - 1;

    const w = list[flashcardIndex];

    container.innerHTML = `
      <div class="chinese-flashcard-wrap">
        <div class="chinese-level-bar">
          <div class="clb-left">
            <label>🏷️ Cấp độ:</label>
            <select id="selFlashcardLevel" class="pixel-select">
              <option value="starred" ${currentLevel === "starred" ? "selected" : ""}>⭐ Sổ Tay Yêu Thích (${getAllStarredWords().length} từ)</option>
              <option value="hsk4" ${currentLevel === "hsk4" ? "selected" : ""}>HSK 4 (Của Ngọc 💕 • Nâng cao)</option>
              <option value="hsk5" ${currentLevel === "hsk5" ? "selected" : ""}>HSK 5 (Chuyên sâu • Luyện thi)</option>
              <option value="hsk6" ${currentLevel === "hsk6" ? "selected" : ""}>HSK 6 (Bậc thầy • Thành ngữ)</option>
              <option value="hsk3" ${currentLevel === "hsk3" ? "selected" : ""}>HSK 3 (Cảm xúc • Giao tiếp)</option>
              <option value="hsk2" ${currentLevel === "hsk2" ? "selected" : ""}>HSK 2 (Căn bản • Đời sống)</option>
              <option value="hsk1" ${currentLevel === "hsk1" ? "selected" : ""}>HSK 1 (Nhập môn)</option>
            </select>
          </div>
          <span class="fc-counter">${flashcardIndex + 1} / ${list.length}</span>
        </div>

        <div class="flashcard-box ${flashcardFlipped ? "flipped" : ""}" id="flashcardBox">
          ${!flashcardFlipped ? `
            <div class="fc-front">
              <span class="fc-tag">🀄 ${getLevelLabel(currentLevel).split(" ")[0]} ${getLevelLabel(currentLevel).split(" ")[1] || ""} • Thẻ ${flashcardIndex + 1}/${list.length}</span>
              <span class="fc-hanzi">${w.hanzi}</span>
              <span class="fc-hint">👆 Chạm vào thẻ để lật xem nghĩa & ví dụ</span>
              <div class="fc-actions-row">
                <button class="btn-star btn-star-fc ${isStarred(w.hanzi) ? "active" : ""}" data-hanzi="${w.hanzi}">${isStarred(w.hanzi) ? "⭐ Đã lưu" : "☆ Lưu từ"}</button>
                <button class="btn-speak btn-speak-card" data-text="${w.hanzi}">🔊 Nghe phát âm</button>
                <a class="btn-dict" href="https://hanzii.net/search/word/${encodeURIComponent(w.hanzi)}?hl=vi" target="_blank" rel="noopener">📖 Tra Hanzii</a>
              </div>
            </div>
          ` : `
            <div class="fc-back">
              <span class="fc-pinyin">${w.pinyin}</span>
              <span class="fc-meaning">${w.meaning}</span>
              <span class="fc-type-badge">${w.type || "Từ vựng"}</span>
              ${w.example ? `
                <div class="fc-example-box">
                  <span class="fc-ex-hanzi">"${w.example}"</span>
                  <span class="fc-ex-pinyin">${w.examplePinyin}</span>
                  <span class="fc-ex-vi">💬 ${w.exampleMeaning}</span>
                </div>
              ` : ""}
              <div class="fc-actions-row">
                <button class="btn-star btn-star-fc ${isStarred(w.hanzi) ? "active" : ""}" data-hanzi="${w.hanzi}">${isStarred(w.hanzi) ? "⭐ Đã lưu" : "☆ Lưu từ"}</button>
                <button class="btn-speak btn-speak-card" data-text="${w.example || w.hanzi}">🔊 Nghe ví dụ</button>
                <a class="btn-dict" href="https://hanzii.net/search/word/${encodeURIComponent(w.hanzi)}?hl=vi" target="_blank" rel="noopener">📖 Tra Hanzii</a>
              </div>
            </div>
          `}
        </div>

        <div class="fc-nav-controls">
          <button class="pixel-btn btn-cream" id="btnFcPrev">◀ Từ Trước</button>
          <button class="pixel-btn btn-pink" id="btnFcFlip">🔄 Lật Thẻ</button>
          <button class="pixel-btn btn-cream" id="btnFcNext">Từ Sau ▶</button>
        </div>
      </div>
    `;

    const sel = document.getElementById("selFlashcardLevel");
    if (sel) {
      sel.addEventListener("change", (e) => {
        setLevel(e.target.value);
        renderFlashcardTab();
      });
    }

    const box = document.getElementById("flashcardBox");
    if (box) {
      box.addEventListener("click", (e) => {
        if (e.target.closest(".btn-speak-card") || e.target.closest(".btn-dict") || e.target.closest(".btn-star-fc")) return;
        flashcardFlipped = !flashcardFlipped;
        renderFlashcardTab();
      });
    }

    const btnFlip = document.getElementById("btnFcFlip");
    if (btnFlip) {
      btnFlip.addEventListener("click", () => {
        flashcardFlipped = !flashcardFlipped;
        renderFlashcardTab();
      });
    }

    const btnPrev = document.getElementById("btnFcPrev");
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        flashcardIndex--;
        flashcardFlipped = false;
        renderFlashcardTab();
      });
    }

    const btnNext = document.getElementById("btnFcNext");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        flashcardIndex++;
        flashcardFlipped = false;
        renderFlashcardTab();
      });
    }

    document.querySelectorAll(".btn-speak-card").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        speak(btn.dataset.text);
      });
    });

    document.querySelectorAll(".btn-star-fc").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const hanzi = btn.dataset.hanzi;
        const starred = toggleStar(hanzi);
        btn.classList.toggle("active", starred);
        btn.innerHTML = starred ? "⭐ Đã lưu" : "☆ Lưu từ";
      });
    });
  }

  let quizRewarded = false;

  function startQuiz() {
    const list = HSK_DATA[currentLevel] || HSK_DATA.hsk4;
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    quizQuestions = shuffled.slice(0, 5).map((target) => {
      const distractors = list.filter((item) => item.hanzi !== target.hanzi);
      const randomWrong = distractors.sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [target, ...randomWrong].sort(() => Math.random() - 0.5);
      return { target, options };
    });
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    quizRewarded = false;
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const container = document.getElementById("chineseTabContent");
    if (quizIndex >= quizQuestions.length) {
      // Quiz Complete
      if (quizScore >= 4 && !quizRewarded) {
        quizRewarded = true;
        if (window.GameState) {
          const s = window.GameState.get();
          s.candy = (s.candy || 0) + 2;
          if (window.GameState.addXP) window.GameState.addXP(15);
          window.GameState.save();
          window.GameState.renderHUD();
        }
      }

      container.innerHTML = `
        <div class="quiz-result-wrap">
          <h3>🎉 Hoàn Thành Bài Trắc Nghiệm!</h3>
          <p class="quiz-score-text">Em trả lời đúng: <strong>${quizScore} / ${quizQuestions.length}</strong> câu (${getLevelLabel(currentLevel)})</p>
          <p class="quiz-cheer">${quizScore >= 4 ? "Xuất sắc lắm Ngọc ơi! Em nhớ từ vựng siêu đỉnh luôn 💕 (+2 🍬 & +15 XP)" : "Rất cố gắng rồi em! Cứ luyện mỗi ngày một chút là nhớ dai lắm nha ✨"}</p>
          <div class="quiz-actions">
            <button class="pixel-btn btn-pink" id="btnRestartQuiz">Làm Lại Lượt Mới</button>
            <button class="pixel-btn btn-cream" id="btnBackToDaily">Quay lại 5 từ mỗi ngày</button>
          </div>
        </div>
      `;

      document.getElementById("btnRestartQuiz").addEventListener("click", startQuiz);
      document.getElementById("btnBackToDaily").addEventListener("click", () => {
        switchTab("daily");
      });
      return;
    }

    const q = quizQuestions[quizIndex];
    let optsHtml = "";
    q.options.forEach((opt, idx) => {
      optsHtml += `
        <button class="quiz-opt-btn" data-hanzi="${opt.hanzi}">
          <span class="q-opt-label">${String.fromCharCode(65 + idx)}.</span>
          <span class="q-opt-text">${opt.meaning} (${opt.pinyin})</span>
        </button>
      `;
    });

    container.innerHTML = `
      <div class="chinese-quiz-wrap">
        <div class="quiz-progress-track">
          <div class="quiz-progress-fill" style="width: ${((quizIndex + 1) / quizQuestions.length) * 100}%"></div>
        </div>

        <div class="quiz-header">
          <div class="quiz-level-inline">
            <label>Cấp:</label>
            <select id="selQuizLevel" class="pixel-select">
              <option value="hsk4" ${currentLevel === "hsk4" ? "selected" : ""}>HSK 4 💕</option>
              <option value="hsk5" ${currentLevel === "hsk5" ? "selected" : ""}>HSK 5</option>
              <option value="hsk6" ${currentLevel === "hsk6" ? "selected" : ""}>HSK 6</option>
              <option value="hsk3" ${currentLevel === "hsk3" ? "selected" : ""}>HSK 3</option>
              <option value="hsk2" ${currentLevel === "hsk2" ? "selected" : ""}>HSK 2</option>
              <option value="hsk1" ${currentLevel === "hsk1" ? "selected" : ""}>HSK 1</option>
            </select>
          </div>
          <span>Câu ${quizIndex + 1} / ${quizQuestions.length}</span>
          <span>🎯 Điểm: ${quizScore}</span>
        </div>

        <div class="quiz-question-card">
          <div class="qq-prompt">Từ này có nghĩa là gì?</div>
          <div class="qq-hanzi">${q.target.hanzi}</div>
          <div class="fc-actions-row">
            <button class="btn-speak" id="btnSpeakQuiz" data-text="${q.target.hanzi}">🔊 Nghe phát âm</button>
            <a class="btn-dict" href="https://hanzii.net/search/word/${encodeURIComponent(q.target.hanzi)}?hl=vi" target="_blank" rel="noopener">📖 Tra Hanzii</a>
          </div>
        </div>

        <div class="quiz-options-grid" id="quizOptionsGrid">
          ${optsHtml}
        </div>

        <div class="quiz-feedback-box hidden" id="quizFeedback">
          <div id="quizFeedbackText"></div>
          <button class="pixel-btn btn-pink btn-sm" id="btnNextQuiz">Câu tiếp theo ▶</button>
        </div>
      </div>
    `;

    const selQ = document.getElementById("selQuizLevel");
    if (selQ) {
      selQ.addEventListener("change", (e) => {
        setLevel(e.target.value);
        startQuiz();
      });
    }

    document.getElementById("btnSpeakQuiz").addEventListener("click", () => {
      speak(q.target.hanzi);
    });

    document.querySelectorAll(".quiz-opt-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (quizAnswered) return;
        quizAnswered = true;
        const chosen = btn.dataset.hanzi;
        const isRight = chosen === q.target.hanzi;

        if (isRight) {
          quizScore++;
          if (window.AudioManager) AudioManager.playCandy();
          btn.classList.add("btn-correct");
        } else {
          if (window.AudioManager) AudioManager.playPoop();
          btn.classList.add("btn-wrong");
          document.querySelectorAll(".quiz-opt-btn").forEach((b) => {
            if (b.dataset.hanzi === q.target.hanzi) b.classList.add("btn-correct");
          });
        }

        const fbBox = document.getElementById("quizFeedback");
        const fbText = document.getElementById("quizFeedbackText");
        fbText.innerHTML = isRight
          ? `✅ <strong>Chính xác!</strong> ${q.target.hanzi} [${q.target.pinyin}]: ${q.target.meaning}`
          : `❌ <strong>Chưa đúng rồi:</strong> ${q.target.hanzi} [${q.target.pinyin}] có nghĩa là <strong>${q.target.meaning}</strong>`;
        fbBox.classList.remove("hidden");
      });
    });

    const btnNext = document.getElementById("btnNextQuiz");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        quizIndex++;
        quizAnswered = false;
        renderQuizQuestion();
      });
    }
  }

  function renderLoveTab() {
    const container = document.getElementById("chineseTabContent");
    const list = HSK_DATA.love;

    let itemsHtml = "";
    list.forEach((item, idx) => {
      itemsHtml += `
        <div class="love-quote-card">
          <div class="lqc-top">
            <span class="lqc-badge">💕 Câu #${idx + 1}</span>
            <div class="lqc-actions">
              <button class="btn-star btn-star-love ${isStarred(item.hanzi) ? "active" : ""}" data-hanzi="${item.hanzi}" title="${isStarred(item.hanzi) ? "Bỏ lưu câu" : "Lưu câu yêu thích"}">${isStarred(item.hanzi) ? "⭐" : "☆"}</button>
              <button class="btn-speak" data-text="${item.hanzi}">🔊 Nghe</button>
              <button class="btn-dict btn-copy" data-copy="${item.hanzi} (${item.pinyin}): ${item.meaning}">📋 Copy</button>
            </div>
          </div>
          <div class="lqc-hanzi">${item.hanzi}</div>
          <div class="lqc-pinyin">${item.pinyin}</div>
          <div class="lqc-meaning">👉 ${item.meaning}</div>
          <div class="lqc-note">💌 <em>${item.note}</em></div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="chinese-love-wrap">
        <p class="chinese-help-text">💌 Những câu tiếng Trung dịu dàng Khánh dành tặng Ngọc. Em có thể bấm 🔊 để nghe giọng đọc ấm áp hoặc sao chép để nhắn tin cho anh nhé!</p>
        <div class="love-quotes-list">
          ${itemsHtml}
        </div>
      </div>
    `;

    document.querySelectorAll(".btn-speak").forEach((btn) => {
      btn.addEventListener("click", () => speak(btn.dataset.text));
    });

    document.querySelectorAll(".btn-star-love").forEach((btn) => {
      btn.addEventListener("click", () => {
        const hanzi = btn.dataset.hanzi;
        const card = btn.closest(".love-quote-card");
        const meaning = card?.querySelector(".lqc-meaning")?.textContent?.replace("👉", "").trim() || "";
        const pinyin = card?.querySelector(".lqc-pinyin")?.textContent || "";
        const starred = toggleStar({ hanzi, pinyin, meaning, type: "Lời Yêu Thương" });
        btn.classList.toggle("active", starred);
        btn.textContent = starred ? "⭐" : "☆";
      });
    });

    document.querySelectorAll(".btn-copy").forEach((btn) => {
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
          if (window.showToast) window.showToast("📋 Đã sao chép câu nói ngọt ngào!");
        } catch {
          if (window.showToast) window.showToast("Đã sao chép vào bộ nhớ!");
        }
      });
    });
  }

  let starredFilter = "all";

  function renderStarredTab() {
    const container = document.getElementById("chineseTabContent");
    const allStarred = getAllStarredWords();

    let filtered = allStarred;
    if (starredFilter !== "all") {
      filtered = allStarred.filter((w) => w.level === starredFilter);
    }

    if (allStarred.length === 0) {
      container.innerHTML = `
        <div class="chinese-starred-wrap">
          <div class="flashcard-empty-box">
            <div style="font-size: 40px; margin-bottom: 10px;">⭐</div>
            <h3>Sổ Tay Yêu Thích Đang Trống</h3>
            <p>Góc nhỏ này dành riêng để Ngọc lưu lại những từ vựng khó nhớ hoặc những câu nói ngọt ngào muốn ôn tập lại.</p>
            <p style="font-size: 11.5px; color: #8c7365; margin: 12px 0;">Em chỉ cần bấm nút <strong>☆ Lưu từ</strong> ở mục <strong>5 Từ Hôm Nay</strong> hoặc <strong>Flashcard</strong> là từ sẽ xuất hiện ngay tại đây nhé 💕</p>
            <button class="pixel-btn btn-pink" id="btnGoToDaily">Đi đến 5 Từ Hôm Nay</button>
          </div>
        </div>
      `;
      const btnGo = document.getElementById("btnGoToDaily");
      if (btnGo) btnGo.addEventListener("click", () => switchTab("daily"));
      return;
    }

    let itemsHtml = "";
    filtered.forEach((w) => {
      itemsHtml += `
        <div class="chinese-word-card starred-card">
          <div class="cwc-top">
            <span class="cwc-hanzi">${w.hanzi}</span>
            <div class="cwc-meta">
              <span class="cwc-pinyin">${w.pinyin || ""}</span>
              <span class="cwc-type">${w.level ? w.level.toUpperCase() : "ĐÃ LƯU"}</span>
            </div>
            <div class="cwc-actions">
              <button class="btn-speak" data-text="${w.hanzi}" title="Nghe phát âm chuẩn">🔊 Nghe</button>
              <a class="btn-dict" href="https://hanzii.net/search/word/${encodeURIComponent(w.hanzi)}?hl=vi" target="_blank" rel="noopener" title="Tra nét viết trên Hanzii">📖 Hanzii</a>
              <button class="btn-star-remove" data-hanzi="${w.hanzi}" title="Bỏ lưu khỏi sổ tay">🗑️ Bỏ lưu</button>
            </div>
          </div>
          <div class="cwc-meaning">👉 <strong>${w.meaning || ""}</strong></div>
          ${w.example ? `
            <div class="cwc-example">
              <span class="cwc-ex-hanzi">"${w.example}"</span>
              ${w.examplePinyin ? `<span class="cwc-ex-pinyin">${w.examplePinyin}</span>` : ""}
              ${w.exampleMeaning ? `<span class="cwc-ex-meaning">💬 ${w.exampleMeaning}</span>` : ""}
            </div>
          ` : ""}
        </div>
      `;
    });

    container.innerHTML = `
      <div class="chinese-starred-wrap">
        <div class="chinese-level-bar">
          <div class="clb-left">
            <label>⭐ Lọc:</label>
            <select id="selStarredFilter" class="pixel-select">
              <option value="all" ${starredFilter === "all" ? "selected" : ""}>Tất cả (${allStarred.length} từ)</option>
              <option value="hsk4" ${starredFilter === "hsk4" ? "selected" : ""}>HSK 4</option>
              <option value="hsk5" ${starredFilter === "hsk5" ? "selected" : ""}>HSK 5</option>
              <option value="hsk6" ${starredFilter === "hsk6" ? "selected" : ""}>HSK 6</option>
              <option value="hsk3" ${starredFilter === "hsk3" ? "selected" : ""}>HSK 3</option>
              <option value="hsk2" ${starredFilter === "hsk2" ? "selected" : ""}>HSK 2</option>
              <option value="hsk1" ${starredFilter === "hsk1" ? "selected" : ""}>HSK 1</option>
              <option value="love" ${starredFilter === "love" ? "selected" : ""}>Lời Yêu Thương</option>
            </select>
          </div>
          <div class="clb-right-actions">
            <button class="btn-dict" id="btnStarredToFlashcard" title="Lật thẻ Flashcard riêng với các từ này">📇 Ôn Flashcard</button>
          </div>
        </div>

        <p class="chinese-help-text">⭐ Sổ tay riêng của Ngọc với <strong>${allStarred.length}</strong> từ vựng đã chọn lọc. Em có thể bấm <strong>📇 Ôn Flashcard</strong> để luyện nhớ hoặc bấm <strong>🔊 Nghe</strong> để nghe lại bất cứ lúc nào!</p>

        <div class="chinese-daily-list">
          ${itemsHtml.length > 0 ? itemsHtml : '<div class="empty-filter-notice" style="text-align: center; padding: 20px; color: #8c7365; font-size: 12px;">Không có từ nào thuộc cấp này trong sổ tay của em.</div>'}
        </div>
      </div>
    `;

    const sel = document.getElementById("selStarredFilter");
    if (sel) {
      sel.addEventListener("change", (e) => {
        starredFilter = e.target.value;
        renderStarredTab();
      });
    }

    const btnToFc = document.getElementById("btnStarredToFlashcard");
    if (btnToFc) {
      btnToFc.addEventListener("click", () => {
        setLevel("starred");
        switchTab("flashcard");
      });
    }

    document.querySelectorAll(".btn-speak").forEach((btn) => {
      btn.addEventListener("click", () => speak(btn.dataset.text));
    });

    document.querySelectorAll(".btn-star-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const hanzi = btn.dataset.hanzi;
        toggleStar(hanzi);
        renderStarredTab();
      });
    });
  }

  function switchTab(tabKey) {
    currentTab = tabKey;
    document.querySelectorAll(".chinese-nav-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabKey);
    });

    if (tabKey === "daily") renderDailyTab();
    else if (tabKey === "flashcard") renderFlashcardTab();
    else if (tabKey === "quiz") startQuiz();
    else if (tabKey === "starred") renderStarredTab();
    else if (tabKey === "love") renderLoveTab();
  }

  function open() {
    switchTab("daily");
    const modal = document.getElementById("modalChinese");
    if (modal) modal.classList.remove("hidden");
  }

  function init() {
    document.querySelectorAll(".chinese-nav-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (window.AudioManager) AudioManager.playClick();
        switchTab(btn.dataset.tab);
      });
    });
  }

  return {
    init,
    open,
    speak
  };
})();
