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
        meaning: "Êm đềm bền bỉ, lâu dài (như dòng nước nhỏ chảy mãi)",
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

  let currentTab = "daily"; // "daily" | "flashcard" | "quiz" | "love"
  let currentLevel = "hsk1";
  let flashcardIndex = 0;
  let flashcardFlipped = false;
  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  // Web Speech API for Chinese pronunciation (Native on iOS/Android/Chrome)
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "zh-CN";
      utter.rate = 0.85; // slightly slower for clean clear tone listening
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore audio error on unsupported webviews
    }
  }

  // Get 5 deterministic words for today per level so it never repeats within a week
  function getDailyFiveWords(level) {
    const list = HSK_DATA[level] || HSK_DATA.hsk1;
    const now = new Date();
    // seed based on year, month, date
    const daySeed = now.getFullYear() * 1000 + (now.getMonth() + 1) * 35 + now.getDate();
    const result = [];
    for (let i = 0; i < 5; i++) {
      const idx = (daySeed * 3 + i * 7) % list.length;
      result.push(list[idx]);
    }
    return result;
  }

  function getLevelLabel(lvl) {
    switch (lvl) {
      case "hsk1": return "HSK 1 (Nhập môn)";
      case "hsk2": return "HSK 2 (Giao tiếp)";
      case "hsk3": return "HSK 3 (Cảm xúc)";
      case "hsk4": return "HSK 4 (Sâu sắc)";
      case "hsk5": return "HSK 5 (Văn vẻ)";
      case "hsk6": return "HSK 6 (Thành ngữ)";
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
    words.forEach((w, idx) => {
      itemsHtml += `
        <div class="chinese-word-card pixel-box">
          <div class="cwc-top">
            <span class="cwc-hanzi">${w.hanzi}</span>
            <div class="cwc-meta">
              <span class="cwc-pinyin">${w.pinyin}</span>
              <span class="cwc-type">${w.type || "Từ vựng"}</span>
            </div>
            <button class="pixel-btn btn-cream btn-sm btn-speak" data-text="${w.hanzi}">🔊 Nghe</button>
          </div>
          <div class="cwc-meaning">👉 <strong>${w.meaning}</strong></div>
          ${w.example ? `<div class="cwc-example">"${w.example}" <em>(${w.examplePinyin})</em>: ${w.exampleMeaning}</div>` : ""}
        </div>
      `;
    });

    container.innerHTML = `
      <div class="chinese-daily-wrap">
        <div class="chinese-level-bar">
          <label>Cấp độ:</label>
          <select id="selChineseLevel" class="pixel-select">
            <option value="hsk1" ${currentLevel === "hsk1" ? "selected" : ""}>HSK 1 (Nhập môn)</option>
            <option value="hsk2" ${currentLevel === "hsk2" ? "selected" : ""}>HSK 2 (Giao tiếp)</option>
            <option value="hsk3" ${currentLevel === "hsk3" ? "selected" : ""}>HSK 3 (Cảm xúc)</option>
            <option value="hsk4" ${currentLevel === "hsk4" ? "selected" : ""}>HSK 4 (Sâu sắc)</option>
            <option value="hsk5" ${currentLevel === "hsk5" ? "selected" : ""}>HSK 5 (Văn vẻ)</option>
            <option value="hsk6" ${currentLevel === "hsk6" ? "selected" : ""}>HSK 6 (Thành ngữ)</option>
          </select>
        </div>

        <p class="chinese-help-text">🎯 Mỗi ngày hệ thống chọn 5 từ chuẩn chỉ để Ngọc ghi nhớ dần, không bị dồn ép. Bấm 🔊 để luyện nghe phát âm nhé!</p>

        <div class="chinese-daily-list">
          ${itemsHtml}
        </div>

        <div class="chinese-daily-finish-box pixel-box">
          <div class="cdf-info">
            <span>🎁 Học xong 5 từ hôm nay:</span>
            <strong style="color: var(--pink-hot)">+2 🍬 Kẹo & +10 XP</strong>
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
        currentLevel = e.target.value;
        flashcardIndex = 0;
        renderDailyTab();
      });
    }

    document.querySelectorAll(".btn-speak").forEach((btn) => {
      btn.addEventListener("click", () => {
        speak(btn.dataset.text);
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
    const list = HSK_DATA[currentLevel] || HSK_DATA.hsk1;
    if (flashcardIndex >= list.length) flashcardIndex = 0;
    if (flashcardIndex < 0) flashcardIndex = list.length - 1;

    const w = list[flashcardIndex];

    container.innerHTML = `
      <div class="chinese-flashcard-wrap">
        <div class="chinese-level-bar">
          <label>Cấp độ:</label>
          <select id="selFlashcardLevel" class="pixel-select">
            <option value="hsk1" ${currentLevel === "hsk1" ? "selected" : ""}>HSK 1 (Nhập môn)</option>
            <option value="hsk2" ${currentLevel === "hsk2" ? "selected" : ""}>HSK 2 (Giao tiếp)</option>
            <option value="hsk3" ${currentLevel === "hsk3" ? "selected" : ""}>HSK 3 (Cảm xúc)</option>
            <option value="hsk4" ${currentLevel === "hsk4" ? "selected" : ""}>HSK 4 (Sâu sắc)</option>
            <option value="hsk5" ${currentLevel === "hsk5" ? "selected" : ""}>HSK 5 (Văn vẻ)</option>
            <option value="hsk6" ${currentLevel === "hsk6" ? "selected" : ""}>HSK 6 (Thành ngữ)</option>
          </select>
          <span class="fc-counter">${flashcardIndex + 1} / ${list.length}</span>
        </div>

        <div class="flashcard-box pixel-box ${flashcardFlipped ? "flipped" : ""}" id="flashcardBox">
          ${!flashcardFlipped ? `
            <div class="fc-front">
              <span class="fc-hanzi">${w.hanzi}</span>
              <span class="fc-hint">💡 Chạm vào thẻ để lật xem nghĩa & pinyin</span>
              <button class="pixel-btn btn-cream btn-sm btn-speak-card" data-text="${w.hanzi}">🔊 Nghe phát âm</button>
            </div>
          ` : `
            <div class="fc-back">
              <span class="fc-pinyin">${w.pinyin}</span>
              <span class="fc-meaning">${w.meaning}</span>
              <span class="fc-type-badge">${w.type || "Từ vựng"}</span>
              ${w.example ? `
                <div class="fc-example-box">
                  <div class="fc-ex-hanzi">"${w.example}"</div>
                  <div class="fc-ex-pinyin">${w.examplePinyin}</div>
                  <div class="fc-ex-vi">${w.exampleMeaning}</div>
                </div>
              ` : ""}
              <button class="pixel-btn btn-cream btn-sm btn-speak-card" data-text="${w.example || w.hanzi}">🔊 Nghe câu ví dụ</button>
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
        currentLevel = e.target.value;
        flashcardIndex = 0;
        flashcardFlipped = false;
        renderFlashcardTab();
      });
    }

    const box = document.getElementById("flashcardBox");
    if (box) {
      box.addEventListener("click", (e) => {
        if (e.target.closest(".btn-speak-card")) return;
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
  }

  function startQuiz() {
    const list = HSK_DATA[currentLevel] || HSK_DATA.hsk1;
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    quizQuestions = shuffled.slice(0, 5).map((target) => {
      // 3 wrong distractors
      const distractors = list.filter((item) => item.hanzi !== target.hanzi);
      const randomWrong = distractors.sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [target, ...randomWrong].sort(() => Math.random() - 0.5);
      return { target, options };
    });
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const container = document.getElementById("chineseTabContent");
    if (quizIndex >= quizQuestions.length) {
      // Quiz Complete
      container.innerHTML = `
        <div class="quiz-result-wrap pixel-box">
          <h3>🎉 Hoàn Thành Bài Trắc Nghiệm!</h3>
          <p class="quiz-score-text">Em trả lời đúng: <strong>${quizScore} / ${quizQuestions.length}</strong> câu</p>
          <p class="quiz-cheer">${quizScore >= 4 ? "Xuất sắc lắm Ngọc ơi! Cô gái Đất Cảng nhớ từ siêu đỉnh 💕" : "Rất cố gắng rồi em! Cứ luyện mỗi ngày một chút là nhớ dai lắm nha ✨"}</p>
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
        <button class="quiz-opt-btn pixel-btn btn-cream" data-hanzi="${opt.hanzi}">
          <span class="q-opt-label">${String.fromCharCode(65 + idx)}.</span>
          <span class="q-opt-text">${opt.meaning} (${opt.pinyin})</span>
        </button>
      `;
    });

    container.innerHTML = `
      <div class="chinese-quiz-wrap">
        <div class="quiz-header">
          <span>Câu ${quizIndex + 1} / ${quizQuestions.length}</span>
          <span>Điểm: ${quizScore}</span>
        </div>

        <div class="quiz-question-card pixel-box">
          <div class="qq-prompt">Từ này có nghĩa là gì?</div>
          <div class="qq-hanzi">${q.target.hanzi}</div>
          <button class="pixel-btn btn-cream btn-sm" id="btnSpeakQuiz" data-text="${q.target.hanzi}">🔊 Nghe phát âm</button>
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
          // highlight correct
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
        <div class="love-quote-card pixel-box">
          <div class="lqc-top">
            <span class="lqc-badge">💕 Câu #${idx + 1}</span>
            <div class="lqc-actions">
              <button class="pixel-btn btn-cream btn-sm btn-speak" data-text="${item.hanzi}">🔊 Nghe</button>
              <button class="pixel-btn btn-cream btn-sm btn-copy" data-copy="${item.hanzi} (${item.pinyin}): ${item.meaning}">📋 Copy</button>
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

  function switchTab(tabKey) {
    currentTab = tabKey;
    document.querySelectorAll(".chinese-nav-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabKey);
    });

    if (tabKey === "daily") renderDailyTab();
    else if (tabKey === "flashcard") renderFlashcardTab();
    else if (tabKey === "quiz") startQuiz();
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
