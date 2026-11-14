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
    ,
      {
      "hanzi": "你好",
      "pinyin": "nǐ hǎo",
      "type": "Thán từ",
      "meaning": "Chào bạn, xin chào",
      "example": "你好，很高兴在 Facebook Dating 遇见你。",
      "examplePinyin": "Nǐ hǎo, hěn gāoxìng zài Facebook Dating yùjiàn nǐ.",
      "exampleMeaning": "Xin chào, rất vui được gặp em ngày hôm đó."
},
      {
      "hanzi": "不客气",
      "pinyin": "bù kèqi",
      "type": "Cụm từ",
      "meaning": "Đừng khách sáo, không có chi",
      "example": "对我不用客气，为你做什么我都乐意。",
      "examplePinyin": "Duì wǒ bùyòng kèqi, wèi nǐ zuò shénme wǒ dōu lèyì.",
      "exampleMeaning": "Với anh không cần khách sáo, làm gì cho em anh cũng vui vẻ."
},
      {
      "hanzi": "再见",
      "pinyin": "zàijiàn",
      "type": "Động từ",
      "meaning": "Tạm biệt, hẹn gặp lại",
      "example": "每次说再见，我都已经开始想你了。",
      "examplePinyin": "Měicì shuō zàijiàn, wǒ dōu yǐjīng kāishǐ xiǎng nǐ le.",
      "exampleMeaning": "Mỗi lần nói tạm biệt, lòng anh đã bắt đầu nhớ em rồi."
},
      {
      "hanzi": "今天",
      "pinyin": "jīntiān",
      "type": "Danh từ",
      "meaning": "Hôm nay",
      "example": "今天也是超级喜欢你的一天。",
      "examplePinyin": "Jīntiān yě shì chāojí xǐhuan nǐ de yī tiān.",
      "exampleMeaning": "Hôm nay cũng là một ngày anh thương em thật nhiều."
},
      {
      "hanzi": "昨天",
      "pinyin": "zuótiān",
      "type": "Danh từ",
      "meaning": "Hôm qua",
      "example": "昨天的回忆很甜，今天也是。",
      "examplePinyin": "Zuótiān de huíyì hěn tián, jīntiān yě shì.",
      "exampleMeaning": "Kỷ niệm hôm qua thật ngọt ngào, và hôm nay cũng vậy."
},
      {
      "hanzi": "月",
      "pinyin": "yuè",
      "type": "Danh từ",
      "meaning": "Tháng, mặt trăng",
      "example": "二月十一日是我们相识的特别日子。",
      "examplePinyin": "Èryuè shíyī rì shì wǒmen xiāngshí de tèbié rìzi.",
      "exampleMeaning": "Ngày 11 tháng 2 là ngày kỷ niệm thật đặc biệt của hai đứa."
},
      {
      "hanzi": "日",
      "pinyin": "rì",
      "type": "Danh từ",
      "meaning": "Ngày, mặt trời",
      "example": "和你在一起的每一日都很珍贵。",
      "examplePinyin": "Hé nǐ zài yīqǐ de měi yī rì dōu hěn zhēnguì.",
      "exampleMeaning": "Mỗi một ngày được ở bên em đều vô cùng quý giá."
},
      {
      "hanzi": "高兴",
      "pinyin": "gāoxìng",
      "type": "Tính từ",
      "meaning": "Vui vẻ, phấn khởi",
      "example": "收到你的消息我就特别高兴。",
      "examplePinyin": "Shōudào nǐ de xiāoxi wǒ jiù tèbié gāoxìng.",
      "exampleMeaning": "Nhận được tin nhắn của em là lòng anh vui như mở cờ."
},
      {
      "hanzi": "冷",
      "pinyin": "lěng",
      "type": "Tính từ",
      "meaning": "Lạnh",
      "example": "天气冷了，出门记得多穿衣服。",
      "examplePinyin": "Tiānqì lěng le, chūmén jìde duō chuān yīfu.",
      "exampleMeaning": "Trời trở lạnh rồi, ra đường nhớ mặc thật ấm nha em."
},
      {
      "hanzi": "热",
      "pinyin": "rè",
      "type": "Tính từ",
      "meaning": "Nóng, nhiệt tình",
      "example": "喝一口热茶，心里暖暖的。",
      "examplePinyin": "Hē yī kǒu rè chá, xīn lǐ nuǎnnuǎn de.",
      "exampleMeaning": "Uống một ngụm trà nóng, trong lòng thấy ấm áp hẳn."
},
      {
      "hanzi": "米饭",
      "pinyin": "mǐfàn",
      "type": "Danh từ",
      "meaning": "Cơm",
      "example": "记得按时吃米饭，不要饿肚子哦。",
      "examplePinyin": "Jìde ànshí chī mǐfàn, bù yào è dùzi o.",
      "exampleMeaning": "Nhớ ăn cơm đúng giờ, đừng để bụng đói nhé em."
},
      {
      "hanzi": "水",
      "pinyin": "shuǐ",
      "type": "Danh từ",
      "meaning": "Nước",
      "example": "工作再忙也要记得多喝水。",
      "examplePinyin": "Gōngzuò zài máng yě yào jìde duō hē shuǐ.",
      "exampleMeaning": "Công việc có bận rộn cũng nhớ uống nhiều nước vào nha."
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
    ,
      {
      "hanzi": "快乐",
      "pinyin": "kuàilè",
      "type": "Tính từ",
      "meaning": "Vui vẻ, hạnh phúc",
      "example": "祝我的小宝贝每天都开开心心、快快乐乐。",
      "examplePinyin": "Zhù wǒ de xiǎo bǎobèi měitiān dōu kāikāixīnxīn, kuàikuàilèlè.",
      "exampleMeaning": "Chúc bé cưng của anh mỗi ngày đều vui vẻ và ngập tràn hạnh phúc."
},
      {
      "hanzi": "开始",
      "pinyin": "kāishǐ",
      "type": "Động từ",
      "meaning": "Bắt đầu",
      "example": "新的一天开始了，加油哦！",
      "examplePinyin": "Xīn de yī tiān kāishǐ le, jiāyóu o!",
      "exampleMeaning": "Một ngày mới lại bắt đầu rồi, cố lên nha em yêu!"
},
      {
      "hanzi": "跑步",
      "pinyin": "pǎobù",
      "type": "Động từ",
      "meaning": "Chạy bộ",
      "example": "跑步锻炼身体，保持好心情。",
      "examplePinyin": "Pǎobù duànliàn shēntǐ, bǎochí hǎo xīnqíng.",
      "exampleMeaning": "Chạy bộ rèn luyện sức khỏe và giữ tinh thần vui tươi."
},
      {
      "hanzi": "生病",
      "pinyin": "shēngbìng",
      "type": "Động từ",
      "meaning": "Bị ốm, bị bệnh",
      "example": "听到你生病了，我真的很心疼。",
      "examplePinyin": "Tīngdào nǐ shēngbìng le, wǒ zhēnde hěn xīnténg.",
      "exampleMeaning": "Nghe tin em ốm mà anh xót lòng ghê."
},
      {
      "hanzi": "休息",
      "pinyin": "xiūxi",
      "type": "Động từ",
      "meaning": "Nghỉ ngơi",
      "example": "太累了就早点休息，明天再努力。",
      "examplePinyin": "Tài lèi le jiù zǎodiǎn xiūxi, míngtiān zài nǔlì.",
      "exampleMeaning": "Mệt quá thì nghỉ sớm nhé, mai mình lại cố gắng tiếp."
},
      {
      "hanzi": "药",
      "pinyin": "yào",
      "type": "Danh từ",
      "meaning": "Thuốc",
      "example": "记得按时吃药，多喝热水。",
      "examplePinyin": "Jìde ànshí chī yào, duō hē rè shuǐ.",
      "exampleMeaning": "Nhớ uống thuốc đúng giờ và uống nhiều nước ấm nha."
},
      {
      "hanzi": "身体",
      "pinyin": "shēntǐ",
      "type": "Danh từ",
      "meaning": "Sức khỏe, cơ thể",
      "example": "身体是最重要的，别太辛苦了。",
      "examplePinyin": "Shēntǐ shì zuì zhòngyào de, bié tài xīnkǔ le.",
      "exampleMeaning": "Sức khỏe là quan trọng nhất, đừng làm việc quá sức nhé."
},
      {
      "hanzi": "眼睛",
      "pinyin": "yǎnjing",
      "type": "Danh từ",
      "meaning": "Đôi mắt",
      "example": "你的眼睛笑起来特别迷人。",
      "examplePinyin": "Nǐ de yǎnjing xiào qǐlái tèbié mírén.",
      "exampleMeaning": "Đôi mắt em mỗi khi cười trông thật là cuốn hút."
},
      {
      "hanzi": "送",
      "pinyin": "sòng",
      "type": "Động từ",
      "meaning": "Tặng, đưa tiễn",
      "example": "我想送你一束你最喜欢的花。",
      "examplePinyin": "Wǒ xiǎng sòng nǐ yī shù nǐ zuì xǐhuan de huā.",
      "exampleMeaning": "Anh muốn tặng em một bó hoa mà em yêu thích nhất."
},
      {
      "hanzi": "时间",
      "pinyin": "shíjiān",
      "type": "Danh từ",
      "meaning": "Thời gian",
      "example": "时间过得真快，一转眼我们在一起好久了。",
      "examplePinyin": "Shíjiān guò de zhēn kuài, yī zhuǎnyǎn wǒmen zài yīqǐ hǎojiǔ le.",
      "exampleMeaning": "Thời gian trôi thật nhanh, chớp mắt tụi mình đã bên nhau bao ngày rồi."
},
      {
      "hanzi": "旅游",
      "pinyin": "lǚyóu",
      "type": "Động từ/Danh từ",
      "meaning": "Du lịch",
      "example": "等有空了，我们一起去旅游吧。",
      "examplePinyin": "Děng yǒu kòng le, wǒmen yīqǐ qù lǚyóu ba.",
      "exampleMeaning": "Hôm nào rảnh rang, hai đứa mình cùng nhau đi du lịch nhé."
},
      {
      "hanzi": "唱歌",
      "pinyin": "chànggē",
      "type": "Động từ",
      "meaning": "Ca hát",
      "example": "听你唱歌就像听世界上最动听的旋律。",
      "examplePinyin": "Tīng nǐ chànggē jiù xiàng tīng shìjiè shàng zuì dòngtīng de xuánlǜ.",
      "exampleMeaning": "Nghe em hát như lắng nghe giai điệu ngọt ngào nhất trần đời."
},
      {
      "hanzi": "微笑",
      "pinyin": "wēixiào",
      "type": "Động từ/Danh từ",
      "meaning": "Mỉm cười, nụ cười",
      "example": "你的微笑是我一天中最治愈的光芒。",
      "examplePinyin": "Nǐ de wēixiào shì wǒ yī tiān zhōng zuì zhìyù de guāngmáng.",
      "exampleMeaning": "Nụ cười của em là ánh sáng chữa lành dịu êm nhất ngày của anh."
}
    ,
      {
      "hanzi": "觉得",
      "pinyin": "juéde",
      "type": "Động từ",
      "meaning": "Cảm thấy, thấy rằng",
      "example": "只要和你在一起，我就觉得很幸福。",
      "examplePinyin": "Zhǐyào hé nǐ zài yīqǐ, wǒ jiù juéde hěn xìngfú.",
      "exampleMeaning": "Chỉ cần ở bên em là anh thấy hạnh phúc ngập tràn."
},
      {
      "hanzi": "便宜",
      "pinyin": "piányi",
      "type": "Tính từ",
      "meaning": "Rẻ, giá hợp lý",
      "example": "海防的小吃又便宜又美味。",
      "examplePinyin": "Hǎifáng de xiǎochī yòu piányi yòu měiwèi.",
      "exampleMeaning": "Đồ ăn vặt Hải Phòng vừa rẻ vừa ngon tuyệt."
},
      {
      "hanzi": "贵",
      "pinyin": "guì",
      "type": "Tính từ",
      "meaning": "Đắt, quý giá",
      "example": "礼物不在于贵不贵，心意最珍贵。",
      "examplePinyin": "Lǐwù bù zàiyú guì bu guì, xīnyì zuì zhēnguì.",
      "exampleMeaning": "Món quà chẳng cần đắt đỏ, tấm chân tình mới là đáng quý nhất."
},
      {
      "hanzi": "穿",
      "pinyin": "chuān",
      "type": "Động từ",
      "meaning": "Mặc, đeo",
      "example": "你今天穿这件衣服真好看。",
      "examplePinyin": "Nǐ jīntiān chuān zhè jiàn yīfu zhēn hǎokàn.",
      "exampleMeaning": "Hôm nay em mặc bộ này trông xinh xắn ghê."
},
      {
      "hanzi": "等",
      "pinyin": "děng",
      "type": "Động từ",
      "meaning": "Chờ, đợi",
      "example": "下班在门口等我，我去接你。",
      "examplePinyin": "Xiàbān zài ménkǒu děng wǒ, wǒ qù jiē nǐ.",
      "exampleMeaning": "Tan làm đứng trước cửa đợi anh, anh qua đón em nhé."
},
      {
      "hanzi": "介绍",
      "pinyin": "jièshào",
      "type": "Động từ",
      "meaning": "Giới thiệu",
      "example": "我想把你正式介绍给我的家人和朋友。",
      "examplePinyin": "Wǒ xiǎng bǎ nǐ zhèngshì jièshào gěi wǒ de jiārén hé péngyou.",
      "exampleMeaning": "Anh muốn chính thức giới thiệu em với gia đình và bạn bè anh."
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
    ,
      {
      "hanzi": "努力",
      "pinyin": "nǔlì",
      "type": "Tính từ/Động từ",
      "meaning": "Nỗ lực, cố gắng",
      "example": "为了我们的未来，我们一起努力。",
      "examplePinyin": "Wèile wǒmen de wèilái, wǒmen yīqǐ nǔlì.",
      "exampleMeaning": "Vì tương lai của hai đứa, mình cùng nhau nỗ lực nhé."
},
      {
      "hanzi": "感动",
      "pinyin": "gǎndòng",
      "type": "Động từ/Tính từ",
      "meaning": "Cảm động",
      "example": "看到你细心准备的小礼物，我特别感动。",
      "examplePinyin": "Kàndào nǐ xìxīn zhǔnbèi de xiǎo lǐwù, wǒ tèbié gǎndòng.",
      "exampleMeaning": "Nhìn món quà nhỏ em chu đáo chuẩn bị, anh cảm động lắm."
},
      {
      "hanzi": "担心",
      "pinyin": "dānxīn",
      "type": "Động từ",
      "meaning": "Lo lắng",
      "example": "不要担心，一切困难我们都会一起扛过去。",
      "examplePinyin": "Bù yào dānxīn, yīqiè kùnnan wǒmen dōu huì yīqǐ káng guòqù.",
      "exampleMeaning": "Đừng lo lắng nhé, khó khăn gì hai đứa mình cũng sẽ cùng vượt qua."
},
      {
      "hanzi": "难过",
      "pinyin": "nánguò",
      "type": "Tính từ",
      "meaning": "Buồn bã, đau lòng",
      "example": "如果你难过，记得我的肩膀随时借你靠。",
      "examplePinyin": "Rúguǒ nǐ nánguò, jìde wǒ de jiānbǎng suíshí jiè nǐ kào.",
      "exampleMeaning": "Nếu thấy buồn lòng, bờ vai anh luôn sẵn sàng để em tựa vào."
},
      {
      "hanzi": "清楚",
      "pinyin": "qīngchu",
      "type": "Tính từ",
      "meaning": "Rõ ràng, rành mạch",
      "example": "我心里很清楚，你就是我想相伴一生的人。",
      "examplePinyin": "Wǒ xīn lǐ hěn qīngchu, nǐ jiù shì wǒ xiǎng xiāngbàn yīshēng de rén.",
      "exampleMeaning": "Lòng anh hiểu rất rõ, em chính là người anh muốn gắn bó trọn đời."
},
      {
      "hanzi": "互相",
      "pinyin": "hùxiāng",
      "type": "Phó từ",
      "meaning": "Lẫn nhau, qua lại",
      "example": "互相包容、互相理解，爱情才能长久。",
      "examplePinyin": "Hùxiāng bāoróng, hùxiāng lǐjiě, àiqíng cáinǐng chángjiǔ.",
      "exampleMeaning": "Biết bao dung và thấu hiểu nhau thì tình yêu mới bền lâu."
},
      {
      "hanzi": "秘密",
      "pinyin": "mìmì",
      "type": "Danh từ",
      "meaning": "Bí mật",
      "example": "在信箱里有我写给你的小秘密哦。",
      "examplePinyin": "Zài xìnxiāng lǐ yǒu wǒ xiě gěi nǐ de xiǎo mìmì o.",
      "exampleMeaning": "Trong hòm thư có những bí mật nhỏ xíu anh viết gửi em đó."
},
      {
      "hanzi": "蛋糕",
      "pinyin": "dàngāo",
      "type": "Danh từ",
      "meaning": "Bánh kem",
      "example": "过生日的时候，我们一起吃甜甜的蛋糕。",
      "examplePinyin": "Guò shēngrì de shíhou, wǒmen yīqǐ chī tiántián de dàngāo.",
      "exampleMeaning": "Mỗi dịp sinh nhật, hai đứa mình cùng nhau thưởng thức bánh kem ngọt ngào."
},
      {
      "hanzi": "照片",
      "pinyin": "zhàopiàn",
      "type": "Danh từ",
      "meaning": "Bức ảnh",
      "example": "看着我们合影的照片，嘴角总会忍不住上扬。",
      "examplePinyin": "Kànzhe wǒmen héyǐng de zhàopiàn, zuǐjiǎo zǒng huì rěnbuzhù shàngyáng.",
      "exampleMeaning": "Ngắm những bức ảnh chụp chung, khóe môi anh lúc nào cũng bất giác mỉm cười."
},
      {
      "hanzi": "节日",
      "pinyin": "jiérì",
      "type": "Danh từ",
      "meaning": "Ngày lễ, ngày hội",
      "example": "每一个和你一起度过的节日都很特别。",
      "examplePinyin": "Měi yī gè hé nǐ yīqǐ dùguò de jiérì dōu hěn tèbié.",
      "exampleMeaning": "Mỗi một ngày lễ được ở bên em đều trở nên vô cùng đặc biệt."
},
      {
      "hanzi": "春天",
      "pinyin": "chūntiān",
      "type": "Danh từ",
      "meaning": "Mùa xuân",
      "example": "春天花开的时候，去海防看红凤凰花吧。",
      "examplePinyin": "Chūntiān huā kāi de shíhou, qù Hǎifáng kàn hóng fènghuáng huā ba.",
      "exampleMeaning": "Mùa xuân hoa nở, cùng anh về Hải Phòng ngắm hoa phượng đỏ nhé."
},
      {
      "hanzi": "冬天",
      "pinyin": "dōngtiān",
      "type": "Danh từ",
      "meaning": "Mùa đông",
      "example": "冬天虽然很冷，但牵着你的手就很暖和。",
      "examplePinyin": "Dōngtiān suīrán hěn lěng, dàn qiānzhe nǐ de shǒu jiù hěn nuǎnhuo.",
      "exampleMeaning": "Mùa đông tuy lạnh giá, nhưng nắm tay em là thấy ấm áp lạ kỳ."
},
      {
      "hanzi": "安全",
      "pinyin": "ānquán",
      "type": "Tính từ/Danh từ",
      "meaning": "An toàn",
      "example": "出门路上注意安全，到家记得给我发信息。",
      "examplePinyin": "Chūmén lùshang zhùyì ānquán, dào jiā jìde gěi wǒ fā xìnxī.",
      "exampleMeaning": "Đi đường nhớ chú ý an toàn, về đến nhà nhớ nhắn tin cho anh nhé."
}
    ,
      {
      "hanzi": "简单",
      "pinyin": "jiǎndān",
      "type": "Tính từ",
      "meaning": "Đơn giản, giản dị",
      "example": "简单的生活，有你陪伴就很满足。",
      "examplePinyin": "Jiǎndān de shēnghuó, yǒu nǐ péibàn jiù hěn mǎnzú.",
      "exampleMeaning": "Cuộc sống giản đơn chỉ cần có em đồng hành là đã trọn vẹn."
},
      {
      "hanzi": "容易",
      "pinyin": "róngyì",
      "type": "Tính từ",
      "meaning": "Dễ dàng",
      "example": "学习中文虽然不容易，但我相信你一定行。",
      "examplePinyin": "Xuéxí zhōngwén suīrán bù róngyì, dàn wǒ xiāngxìn nǐ yīdìng xíng.",
      "exampleMeaning": "Học tiếng Trung tuy không dễ dàng, nhưng anh tin chắc em sẽ làm được."
},
      {
      "hanzi": "经常",
      "pinyin": "jīngcháng",
      "type": "Phó từ",
      "meaning": "Thường xuyên",
      "example": "工作再忙也要经常记得微笑哦。",
      "examplePinyin": "Gōngzuò zài máng yě yào jīngcháng jìde wēixiào o.",
      "exampleMeaning": "Công việc có bận cũng phải thường xuyên mỉm cười nhé."
},
      {
      "hanzi": "认真",
      "pinyin": "rènzhēn",
      "type": "Tính từ",
      "meaning": "Chăm chỉ, nghiêm túc",
      "example": "你认真专注的样子，真的特别迷人。",
      "examplePinyin": "Nǐ rènzhēn zhuānzhù de yàngzi, zhēn de tèbié mírén.",
      "exampleMeaning": "Dáng vẻ tập trung chăm chỉ của em thực sự cuốn hút vô cùng."
},
      {
      "hanzi": "热情",
      "pinyin": "rèqíng",
      "type": "Tính từ",
      "meaning": "Nhiệt tình, niềm nở",
      "example": "海防的人民都非常热情好客。",
      "examplePinyin": "Hǎifáng de rénmín dōu fēicháng rèqíng hàokè.",
      "exampleMeaning": "Người dân Hải Phòng ai nấy đều vô cùng nhiệt tình, hiếu khách."
},
      {
      "hanzi": "舒服",
      "pinyin": "shūfu",
      "type": "Tính từ",
      "meaning": "Thoải mái, dễ chịu",
      "example": "和你在一起聊天，感觉特别舒服自在。",
      "examplePinyin": "Hé nǐ zài yīqǐ liáotiān, gǎnjué tèbié shūfu zìzài.",
      "exampleMeaning": "Ở cạnh trò chuyện cùng em luôn cảm thấy thoải mái, tự nhiên lạ lùng."
},
      {
      "hanzi": "了解",
      "pinyin": "liǎojiě",
      "type": "Động từ",
      "meaning": "Hiểu rõ, tìm hiểu",
      "example": "越是深入了解你，我就越喜欢你。",
      "examplePinyin": "Yuè shì shēnrù liǎojiě nǐ, wǒ jiù yuè xǐhuan nǐ.",
      "exampleMeaning": "Càng thấu hiểu em sâu sắc, anh lại càng thương em nhiều hơn."
},
      {
      "hanzi": "遇到",
      "pinyin": "yùdào",
      "type": "Động từ",
      "meaning": "Bắt gặp, gặp phải",
      "example": "遇到你，是我人生中最美的意外。",
      "examplePinyin": "Yùdào nǐ, shì wǒ rénshēng zhōng zuì měi de yìwài.",
      "exampleMeaning": "Gặp được em là sự tình cờ tươi đẹp nhất đời anh."
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
    ,
      {
      "hanzi": "成功",
      "pinyin": "chénggōng",
      "type": "Động từ/Danh từ",
      "meaning": "Thành công",
      "example": "我相信通过努力，你一定能成功考取 HSK 证书！",
      "examplePinyin": "Wǒ xiāngxìn tōngguò nǔlì, nǐ yīdìng néng chénggōng kǎoqǔ HSK zhèngshū!",
      "exampleMeaning": "Anh tin rằng với sự nỗ lực, em nhất định sẽ thi đỗ chứng chỉ HSK thật vẻ vang!"
},
      {
      "hanzi": "责任",
      "pinyin": "zérèn",
      "type": "Danh từ",
      "meaning": "Trách nhiệm",
      "example": "照顾好你，是我这辈子最甜蜜的责任。",
      "examplePinyin": "Zhàogù hǎo nǐ, shì wǒ zhè bèizi zuì tiánmì de zérèn.",
      "exampleMeaning": "Chăm sóc tốt cho em là trách nhiệm ngọt ngào nhất cả cuộc đời anh."
},
      {
      "hanzi": "幽默",
      "pinyin": "yōumò",
      "type": "Tính từ",
      "meaning": "Hài hước, hóm hỉnh",
      "example": "你偶尔说的一两句调皮话，真幽默又可爱。",
      "examplePinyin": "Nǐ ǒu'ěr shuō de yī liǎng jù tiáopí huà, zhēn yōumò yòu kě'ài.",
      "exampleMeaning": "Em thỉnh thoảng trêu vài câu nhây nhây, vừa hài hước mà lại đáng yêu ghê."
},
      {
      "hanzi": "成熟",
      "pinyin": "chéngshú",
      "type": "Tính từ",
      "meaning": "Trưởng thành, chín chắn",
      "example": "在工作上你很成熟懂事，但在我面前可以尽情当个小女孩。",
      "examplePinyin": "Zài gōngzuò shàng nǐ hěn chéngshú dǒngshì, dàn zài wǒ miànqián kěyǐ jìnqíng dāng gè xiǎo nǚhái.",
      "exampleMeaning": "Đi làm em rất trưởng thành hiểu chuyện, nhưng ở trước mặt anh cứ vô tư làm cô bé nhỏ nhé."
},
      {
      "hanzi": "佩服",
      "pinyin": "pèifu",
      "type": "Động từ",
      "meaning": "Khâm phục, thán phục",
      "example": "我很佩服你工作时那种专注认真的态度。",
      "examplePinyin": "Wǒ hěn pèifu nǐ gōngzuò shí nà zhǒng zhuānzhù rènzhēn de tàidu.",
      "exampleMeaning": "Anh rất khâm phục sự chăm chỉ, tập trung cao độ của em trong công việc."
},
      {
      "hanzi": "解释",
      "pinyin": "jiěshì",
      "type": "Động từ/Danh từ",
      "meaning": "Giải thích, giãi bày",
      "example": "有误会就坦诚解释清楚，不要自己憋在心里哦。",
      "examplePinyin": "Yǒu wùhuì jiù tǎnchéng jiěshì qīngchu, bù yào zìjǐ biē zài xīn lǐ o.",
      "exampleMeaning": "Có hiểu lầm gì cứ thẳng thắn giải thích rõ ràng, đừng ôm nỗi niềm một mình nha."
},
      {
      "hanzi": "原谅",
      "pinyin": "yuánliàng",
      "type": "Động từ",
      "meaning": "Tha thứ, lượng thứ",
      "example": "如果我有做得不够周到的地方，请原谅我哦。",
      "examplePinyin": "Rúguǒ wǒ yǒu zuò de bù gòu zhōudào de dìfang, qǐng yuánliàng wǒ o.",
      "exampleMeaning": "Nếu anh có điểm nào vụng về chưa chu đáo, em hãy rộng lòng tha thứ cho anh nhé."
},
      {
      "hanzi": "无论",
      "pinyin": "wúlùn",
      "type": "Liên từ",
      "meaning": "Bất kể, dù cho",
      "example": "无论相隔多远，心都在一起。",
      "examplePinyin": "Wúlùn xiānggé duō yuǎn, xīn dōu zài yīqǐ.",
      "exampleMeaning": "Dù khoảng cách xa xôi nhường nào, trái tim đôi mình vẫn luôn hướng về nhau."
},
      {
      "hanzi": "偶尔",
      "pinyin": "ǒu'ěr",
      "type": "Phó từ",
      "meaning": "Thỉnh thoảng, đôi khi",
      "example": "偶尔的小争吵只是生活的小调料，更懂珍惜彼此就好。",
      "examplePinyin": "Ǒu'ěr de xiǎo zhēngchǎo zhǐ shì shēnghuó de xiǎo tiáoliào, gèng dǒng zhēnxī bǐcǐ jiù hǎo.",
      "exampleMeaning": "Thỉnh thoảng hờn dỗi chút xíu chỉ là gia vị cuộc sống, để ta càng thêm trân trọng nhau hơn."
},
      {
      "hanzi": "安排",
      "pinyin": "ānpái",
      "type": "Động từ/Danh từ",
      "meaning": "Sắp xếp, an bài",
      "example": "这个周末我已经安排好路线，带你去打卡好玩的地方。",
      "examplePinyin": "Zhè gè zhōumò wǒ yǐjīng ānpái hǎo lùxiàn, dài nǐ qù dǎkǎ hǎowán de dìfang.",
      "exampleMeaning": "Cuối tuần này anh đã lên lịch trình rồi, sẽ dắt em đi lượn những chỗ cực vui."
},
      {
      "hanzi": "准确",
      "pinyin": "zhǔnquè",
      "type": "Tính từ",
      "meaning": "Chính xác, chuẩn xác",
      "example": "你的直觉总是那么准确，什么小心思都瞒不过你。",
      "examplePinyin": "Nǐ de zhíjué zǒng shì nàme zhǔnquè, shénme xiǎo xīnsi dōu mán bù guò nǐ.",
      "exampleMeaning": "Trực giác của em lúc nào cũng chuẩn ghê, anh nghĩ gì em cũng đoán ra hết trơn."
},
      {
      "hanzi": "激动",
      "pinyin": "jīdòng",
      "type": "Tính từ/Động từ",
      "meaning": "Xúc động, hồi hộp kích động",
      "example": "每次坐车下海防见你，心里都特别激动期待。",
      "examplePinyin": "Měicì zuò chē xià Hǎifáng jiàn nǐ, xīn lǐ dōu tèbié jīdòng qīdài.",
      "exampleMeaning": "Mỗi lần ngồi xe xuống Hải Phòng đón em, lòng anh lại bồi hồi háo hức khôn nguôi."
},
      {
      "hanzi": "孤单",
      "pinyin": "gūdān",
      "type": "Tính từ",
      "meaning": "Cô đơn, một mình",
      "example": "有我一直在，你永远都不会觉得孤单。",
      "examplePinyin": "Yǒu wǒ yīzhí zài, nǐ yǒngyuǎn dōu bù huì juéde gūdān.",
      "exampleMeaning": "Có anh luôn ở đây rồi, em sẽ không bao giờ phải thấy cô đơn nữa đâu."
}
    ,
      {
      "hanzi": "提前",
      "pinyin": "tíqián",
      "type": "Động từ/Phó từ",
      "meaning": "Làm trước, sớm hơn hạn",
      "example": "周五我会提前下班，去海防接你下班吃晚饭。",
      "examplePinyin": "Zhōuwǔ wǒ huì tíqián xiàbān, qù Hǎifáng jiē nǐ xiàbān chī wǎnfàn.",
      "exampleMeaning": "Thứ sáu anh sẽ xong việc sớm, phi xuống Hải Phòng đón em đi ăn tối."
},
      {
      "hanzi": "幽雅",
      "pinyin": "yōuyǎ",
      "type": "Tính từ",
      "meaning": "Tao nhã, thanh lịch",
      "example": "海防大剧院周围的环境特别幽雅宁静。",
      "examplePinyin": "Hǎifáng Dà Jùyuàn zhōuwéi de huánjìng tèbié yōuyǎ níngjìng.",
      "exampleMeaning": "Khuôn viên quanh Nhà hát lớn Hải Phòng trông thật thanh lịch và yên bình."
},
      {
      "hanzi": "普遍",
      "pinyin": "pǔbiàn",
      "type": "Tính từ",
      "meaning": "Phổ biến, rộng khắp",
      "example": "爱与被爱是人类最普遍的美好渴望。",
      "examplePinyin": "Ài yǔ bèi ài shì rénlèi zuì pǔbiàn de měihǎo kěwàng.",
      "exampleMeaning": "Yêu và được yêu là khát khao ấm áp phổ biến nhất của con người."
},
      {
      "hanzi": "随着",
      "pinyin": "suízhe",
      "type": "Giới từ",
      "meaning": "Cùng với, theo đà",
      "example": "随着时间的推移，我对你的爱意只增不减。",
      "examplePinyin": "Suízhe shíjiān de tuīyí, wǒ duì nǐ de àiyì zhǐ zēng bù jiǎn.",
      "exampleMeaning": "Theo năm tháng trôi qua, tình yêu anh dành cho em chỉ tăng chứ không hề giảm."
},
      {
      "hanzi": "值得",
      "pinyin": "zhíde",
      "type": "Động từ",
      "meaning": "Xứng đáng, đáng giá",
      "example": "为了你，所有的等待和奔波都完全值得。",
      "examplePinyin": "Wèile nǐ, suǒyǒu de děngdài hé bēnbō dōu wánquán zhíde.",
      "exampleMeaning": "Vì em, mọi sự chờ đợi và những chuyến xe đi lại đều hoàn toàn xứng đáng."
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
    ,
      {
      "hanzi": "珍惜",
      "pinyin": "zhēnxī",
      "type": "Động từ",
      "meaning": "Trân trọng, quý trọng",
      "example": "相遇不容易，我们要倍加珍惜这份缘分。",
      "examplePinyin": "Xiāngyù bù róngyì, wǒmen yào bèijiā zhēnxī zhè fèn yuánfèn.",
      "exampleMeaning": "Gặp được nhau chẳng hề dễ dàng, hai đứa mình càng phải trân quý duyên phận này."
},
      {
      "hanzi": "包容",
      "pinyin": "bāoróng",
      "type": "Động từ/Danh từ",
      "meaning": "Bao dung, độ lượng",
      "example": "真正的爱，是接纳彼此的不完美并互相包容。",
      "examplePinyin": "Zhēnzhèng de ài, shì jiēnà bǐcǐ de bù wánměi bìng hùxiāng bāoróng.",
      "exampleMeaning": "Tình yêu đích thực là cùng đón nhận những điều chưa hoàn hảo và bao dung cho nhau."
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
    ,
      {
      "hanzi": "情深似海",
      "pinyin": "qíng shēn sì hǎi",
      "type": "Thành ngữ",
      "meaning": "Tình sâu tựa biển, ân tình sâu đậm",
      "example": "我对你的爱意情深似海，历久弥新。",
      "examplePinyin": "Wǒ duì nǐ de àiyì qíng shēn sì hǎi, lì jiǔ mí xīn.",
      "exampleMeaning": "Tình cảm anh dành cho em sâu đậm tựa biển khơi, càng qua năm tháng lại càng nồng nàn."
},
      {
      "hanzi": "朝夕相伴",
      "pinyin": "zhāo xī xiāng bàn",
      "type": "Thành ngữ",
      "meaning": "Sớm tối có nhau, cận kề bên nhau",
      "example": "愿未来的岁月里，能与你朝夕相伴、柴米油盐皆是诗。",
      "examplePinyin": "Yuàn wèilái de suìyuè lǐ, néng yǔ nǐ zhāo xī xiāng bàn, chái mǐ yóu yán jiē shì shī.",
      "exampleMeaning": "Mong những năm tháng mai sau sớm tối có em, cơm áo gạo tiền cũng hóa thành thơ."
},
      {
      "hanzi": "坚定不移",
      "pinyin": "jiān dìng bù yí",
      "type": "Thành ngữ",
      "meaning": "Kiên định không dời, son sắt một lòng",
      "example": "选择你是我一生中最坚定不移的决定。",
      "examplePinyin": "Xuǎnzé nǐ shì wǒ yīshēng zhōng zuì jiāndìng bù yí de juédìng.",
      "exampleMeaning": "Chọn em là quyết định kiên định vững vàng nhất cuộc đời anh."
},
      {
      "hanzi": "心有灵犀",
      "pinyin": "xīn yǒu líng xī",
      "type": "Thành ngữ",
      "meaning": "Tâm đầu ý hợp, thần giao cách cảm",
      "example": "一个眼神你就能懂我想什么，我们真是心有灵犀。",
      "examplePinyin": "Yī gè yǎnshén nǐ jiù néng dǒng wǒ xiǎng shénme, wǒmen zhēnshì xīn yǒu líng xī.",
      "exampleMeaning": "Chỉ cần một ánh mắt là em đã hiểu ý anh, hai đứa mình thật là tâm đầu ý hợp."
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
    ,
      {
      "hanzi": "不管距离有多远，我的心永远紧挨着你。",
      "pinyin": "Bùguǎn jùlí yǒu duō yuǎn, wǒ de xīn yǒngyuǎn jǐn'āizhe nǐ.",
      "meaning": "Dù khoảng cách có xa bao nhiêu, trái tim anh vẫn luôn ở sát bên em.",
      "note": "Dành cho cô gái Hải Phòng của chàng trai Hà Nội."
},
      {
      "hanzi": "世界很大，但我的眼里只装得下一个你。",
      "pinyin": "Shìjiè hěn dà, dàn wǒ de yǎn lǐ zhǐ zhuāng de xià yī gè nǐ.",
      "meaning": "Thế giới này rộng lớn biết bao, nhưng trong mắt anh chỉ chứa vừa một mình em.",
      "note": "Lời nhắn chân thành gửi trọn cho Sún yêu dấu."
},
      {
      "hanzi": "听你的声音，是我一天中最放松的时刻。",
      "pinyin": "Tīng nǐ de shēngyīn, shì wǒ yī tiān zhōng zuì fàngsōng de shíkè.",
      "meaning": "Nghe được giọng nói của em là khoảnh khắc thư thái, bình yên nhất ngày của anh.",
      "note": "Những cuộc gọi buổi tối tâm sự tỉ tê sau giờ làm việc."
},
      {
      "hanzi": "愿我们三餐四季，温柔相伴，岁岁年年。",
      "pinyin": "Yuàn wǒmen sān cān sì jì, wēnróu xiāngbàn, suì suì nián nián.",
      "meaning": "Nguyện cho đôi mình bốn mùa no ấm, dịu dàng bên nhau suốt tháng năm dài.",
      "note": "Ước nguyện bình dị mà vững bền nhất của tình yêu."
}
    ,
      {
      "hanzi": "你是我平淡岁月里最璀璨的星光。",
      "pinyin": "Nǐ shì wǒ píngdàn suìyuè lǐ zuì cuǐcàn de xīngguāng.",
      "meaning": "Em là ánh sao lung linh nhất trong những năm tháng bình dị của anh.",
      "note": "Dành tặng cô gái đáng yêu của anh."
},
      {
      "hanzi": "愿与你共赏人间烟火，共度漫漫余生。",
      "pinyin": "Yuàn yǔ nǐ gòng shǎng rénjiān yānhuǒ, gòng dù mànmàn yúshēng.",
      "meaning": "Nguyện cùng em ngắm khói lửa nhân gian, cùng đi qua tháng năm còn lại.",
      "note": "Lời ước nguyện trọn đời trọn kiếp."
},
      {
      "hanzi": "只要回到你身边，世界就安静温柔了下来。",
      "pinyin": "Zhǐyào huí dào nǐ shēnbiān, shìjiè jiù ānjìng wēnróu le xiàlai.",
      "meaning": "Chỉ cần trở về bên em, cả thế giới bỗng trở nên dịu dàng, an yên.",
      "note": "Bình yên là khi có em."
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

  // ==========================================
  // SPACED REPETITION SYSTEM (SM-2 / Leitner Algorithm)
  // Track retention, review intervals, and mistakes to eliminate blind repetition
  // ==========================================
  const SRS_KEY = "hu_keo_sun_hsk_srs";

  function getSRSMap() {
    try {
      const raw = localStorage.getItem(SRS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveSRSMap(map) {
    try {
      localStorage.setItem(SRS_KEY, JSON.stringify(map));
    } catch {}
  }

  function getSRSItem(hanzi) {
    const map = getSRSMap();
    return map[hanzi] || {
      repetition: 0,
      interval: 0,
      efactor: 2.5,
      dueDate: 0,
      mistakes: 0,
      lastReviewed: 0
    };
  }

  function recordSRSReview(hanzi, isCorrect, rating = null) {
    const map = getSRSMap();
    const item = map[hanzi] || {
      repetition: 0,
      interval: 0,
      efactor: 2.5,
      dueDate: 0,
      mistakes: 0,
      lastReviewed: 0
    };

    item.lastReviewed = Date.now();

    if (isCorrect) {
      if (item.repetition === 0) item.interval = 1;
      else if (item.repetition === 1) item.interval = 3;
      else if (item.repetition === 2) item.interval = 7;
      else item.interval = Math.round(item.interval * (item.efactor || 2.4));

      item.repetition++;
      if (rating === "easy") {
        item.efactor = Math.min(2.8, (item.efactor || 2.5) + 0.15);
      }
      item.dueDate = Date.now() + item.interval * 86400000;
    } else {
      item.repetition = 0;
      item.interval = 1;
      item.dueDate = Date.now(); // Due immediately
      item.mistakes = (item.mistakes || 0) + 1;
      item.efactor = Math.max(1.3, (item.efactor || 2.5) - 0.2);
    }

    map[hanzi] = item;
    saveSRSMap(map);
    return item;
  }

  function getSRSBadge(hanzi) {
    const item = getSRSItem(hanzi);
    if (item.repetition >= 3) return { text: "Đã thuộc", cls: "srs-mastered" };
    if (item.repetition >= 1) return { text: `Cấp ${item.repetition}`, cls: "srs-reviewing" };
    if (item.mistakes > 0) return { text: "Cần ôn lại", cls: "srs-weak" };
    return { text: "Mới", cls: "srs-new" };
  }

  let activeAudio = null;

  let cachedVoices = [];
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

  function getBestMandarinVoice() {
    if (!cachedVoices.length) loadVoices();
    const vList = cachedVoices || [];
    return (
      vList.find((v) => v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("zh-cn")) ||
      vList.find((v) => v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("zh")) ||
      vList.find((v) => /chinese|mandarin|putonghua|xiaoxiao|yunxi|huihui|yaoyao/i.test(v.name)) ||
      null
    );
  }

  let speechSeq = 0;

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

  function fallbackWebSpeech(text, onDone = null) {
    if (!("speechSynthesis" in window)) {
      if (onDone) onDone();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "zh-CN";
      utter.rate = 0.85;
      const zhVoice = getBestMandarinVoice();
      if (zhVoice) utter.voice = zhVoice;

      utter.onend = () => {
        if (onDone) onDone();
      };
      utter.onerror = () => {
        if (onDone) onDone();
      };

      window.speechSynthesis.speak(utter);
    } catch {
      if (onDone) onDone();
    }
  }

  // Pure Single-Stream Mandarin Audio Engine (Zero Echo / Zero Latency):
  // Synchronous SpeechSynthesis ensures iOS Safari / WebKit executes speech within the trusted gesture token.
  function speak(text, triggerBtn = null) {
    if (!text) return;
    const cleanText = text.replace(/["'“”‘’]/g, "").trim();
    if (!cleanText) return;

    // Increment speech sequence token; invalidates any previous pending callbacks
    const thisSpeechId = ++speechSeq;

    // Immediately kill any currently playing audio/speech
    stopAllSpeech();

    // Visual button feedback
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

    // Primary: Web Speech API (Synchronous inside user tap, 100% native on iOS Safari & Android, zero lag, works offline, zero echo)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        if (typeof window.speechSynthesis.resume === "function") {
          window.speechSynthesis.resume();
        }
        const utter = new SpeechSynthesisUtterance(cleanText);
        utter.lang = "zh-CN";
        utter.rate = 0.82;
        const zhVoice = getBestMandarinVoice();
        if (zhVoice) utter.voice = zhVoice;

        utter.onend = () => resetBtn();
        utter.onerror = () => resetBtn();

        window.speechSynthesis.speak(utter);
        return;
      } catch (e) {
        console.warn("SpeechSynthesis error:", e);
      }
    }

    // Fallback: Audio stream for browsers without Web Speech
    try {
      const youdaoUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&le=zh`;
      const audio = new Audio(youdaoUrl);
      audio.playbackRate = 0.95;
      activeAudio = audio;

      audio.onended = () => {
        if (thisSpeechId === speechSeq) {
          resetBtn();
          activeAudio = null;
        }
      };
      audio.onerror = () => resetBtn();

      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => resetBtn());
      }
    } catch {
      resetBtn();
    }
  }

  // True unbiased Fisher-Yates shuffle algorithm
  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Smart Spaced Repetition Daily 5 Words generator
  function getDailyFiveWords(level) {
    const list = HSK_DATA[level] || HSK_DATA.hsk4;
    if (!list || list.length === 0) return [];

    const now = Date.now();
    const srsMap = getSRSMap();

    // Categorize words into due reviews, unstudied, and others
    const dueOrMistakes = [];
    const unstudied = [];
    const others = [];

    list.forEach((w) => {
      const srs = srsMap[w.hanzi];
      if (srs) {
        if ((srs.mistakes > 0 && srs.repetition < 2) || (srs.dueDate && srs.dueDate <= now)) {
          dueOrMistakes.push(w);
        } else {
          others.push(w);
        }
      } else {
        unstudied.push(w);
      }
    });

    // If user clicked "Đổi 5 từ" (dailyOffset > 0)
    if (dailyOffset > 0) {
      const startIndex = (dailyOffset * 5) % list.length;
      const res = [];
      for (let i = 0; i < Math.min(5, list.length); i++) {
        res.push(list[(startIndex + i) % list.length]);
      }
      return res;
    }

    // Smart composition: up to 2 due review words + unstudied words + fill with others
    const selected = [];
    dueOrMistakes.forEach((w) => {
      if (selected.length < 2) selected.push(w);
    });
    unstudied.forEach((w) => {
      if (selected.length < 5) selected.push(w);
    });
    others.forEach((w) => {
      if (selected.length < 5 && !selected.some((s) => s.hanzi === w.hanzi)) selected.push(w);
    });

    // Fallback if needed
    if (selected.length < Math.min(5, list.length)) {
      list.forEach((w) => {
        if (selected.length < Math.min(5, list.length) && !selected.some((s) => s.hanzi === w.hanzi)) {
          selected.push(w);
        }
      });
    }

    return selected;
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

  const STREAK_KEY = "hu_keo_sun_hsk_streak";

  function getStreakData() {
    try {
      const raw = localStorage.getItem(STREAK_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { count: 0, lastDate: "" };
  }

  function saveStreakData(data) {
    try {
      localStorage.setItem(STREAK_KEY, JSON.stringify(data));
    } catch {}
  }

  function recordStreakToday() {
    const data = getStreakData();
    const today = new Date().toISOString().slice(0, 10);
    if (data.lastDate === today) return data.count || 1;

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (data.lastDate === yesterday) {
      data.count = (data.count || 0) + 1;
    } else {
      data.count = 1;
    }
    data.lastDate = today;
    saveStreakData(data);
    return data.count;
  }

  function getLevelMasteryStats(level) {
    const list = HSK_DATA[level] || HSK_DATA.hsk4 || [];
    let mastered = 0;
    let reviewing = 0;
    let newWords = 0;

    list.forEach((w) => {
      const item = getSRSItem(w.hanzi);
      if (item.repetition >= 3) mastered++;
      else if (item.repetition >= 1) reviewing++;
      else newWords++;
    });

    const percent = list.length > 0 ? Math.round((mastered / list.length) * 100) : 0;
    return { total: list.length, mastered, reviewing, newWords, percent };
  }

  function renderDailyTab() {
    const container = document.getElementById("chineseTabContent");
    const words = getDailyFiveWords(currentLevel);
    const todayStr = new Date().toDateString();
    const state = window.GameState ? window.GameState.get() : {};
    const isCompletedToday = state.chineseDailyDoneDate === todayStr;
    const streakData = getStreakData();
    const stats = getLevelMasteryStats(currentLevel);

    let itemsHtml = "";
    words.forEach((w) => {
      itemsHtml += `
        <div class="chinese-word-card">
          <div class="cwc-top">
            <span class="cwc-hanzi">${w.hanzi}</span>
            <div class="cwc-meta">
              <span class="cwc-pinyin">${w.pinyin}</span>
              <div class="cwc-badges-row">
                <span class="cwc-type">${w.type || "Từ vựng"}</span>
                <span class="srs-badge ${getSRSBadge(w.hanzi).cls}">${getSRSBadge(w.hanzi).text}</span>
              </div>
            </div>
            <div class="cwc-actions">
              <button class="btn-star ${isStarred(w.hanzi) ? "active" : ""}" data-hanzi="${w.hanzi}" title="${isStarred(w.hanzi) ? "Đã lưu vào Sổ tay (bấm để bỏ lưu)" : "Lưu vào Sổ tay yêu thích"}">${isStarred(w.hanzi) ? "⭐ Đã lưu" : "☆ Lưu"}</button>
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
        <div class="chinese-mastery-banner">
          <div class="cmb-left">
            <span class="cmb-streak" title="Chuỗi ngày liên tục hoàn thành bài học tiếng Trung">🔥 Chuỗi: <strong>${streakData.count || 0}</strong> ngày</span>
            <span class="cmb-stat">🏆 Đã thuộc: <strong>${stats.mastered}/${stats.total}</strong> (${stats.percent}%)</span>
          </div>
          <div class="cmb-progress-bar" title="Tiến độ ghi nhớ HSK cấp độ này">
            <div class="cmb-progress-fill" style="width: ${stats.percent}%"></div>
          </div>
        </div>

        <div class="chinese-level-bar">
          <div class="clb-left">
            <label>🏷️ Cấp độ:</label>
            <select id="selChineseLevel" class="pixel-select">
              <option value="hsk4" ${currentLevel === "hsk4" ? "selected" : ""}>HSK 4 (Của Ngọc 💕)</option>
              <option value="hsk5" ${currentLevel === "hsk5" ? "selected" : ""}>HSK 5 (Chuyên sâu)</option>
              <option value="hsk6" ${currentLevel === "hsk6" ? "selected" : ""}>HSK 6 (Bậc thầy)</option>
              <option value="hsk3" ${currentLevel === "hsk3" ? "selected" : ""}>HSK 3 (Giao tiếp)</option>
              <option value="hsk2" ${currentLevel === "hsk2" ? "selected" : ""}>HSK 2 (Căn bản)</option>
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

    bindDailyEvents(words);
  }

  function bindDailyEvents(words = []) {
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
        speak(btn.dataset.text, btn);
      });
    });

    document.querySelectorAll(".btn-star").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const hanzi = btn.dataset.hanzi;
        const starred = toggleStar(hanzi);
        btn.classList.toggle("active", starred);
        btn.innerHTML = starred ? "⭐ Đã lưu" : "☆ Lưu";
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

        // Record SRS memory progression for each daily word
        if (Array.isArray(words)) {
          words.forEach((w) => {
            recordSRSReview(w.hanzi, true);
          });
        }

        const streak = recordStreakToday();
        const streakMsg = streak > 1 ? ` 🔥 Chuỗi ${streak} ngày đỉnh nóc kịch trần!` : "";
        if (window.showToast) window.showToast(`🎉 Giỏi quá! Đã nhận thưởng học bài: +2 🍬 & +10 XP!${streakMsg}`);

        renderDailyTab();
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
                <option value="starred" selected>⭐ Sổ Tay (${getAllStarredWords().length} từ)</option>
                <option value="hsk4">HSK 4 (Của Ngọc 💕)</option>
                <option value="hsk5">HSK 5 (Chuyên sâu)</option>
                <option value="hsk6">HSK 6 (Bậc thầy)</option>
                <option value="hsk3">HSK 3 (Giao tiếp)</option>
                <option value="hsk2">HSK 2 (Căn bản)</option>
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
              <option value="starred" ${currentLevel === "starred" ? "selected" : ""}>⭐ Sổ Tay (${getAllStarredWords().length} từ)</option>
              <option value="hsk4" ${currentLevel === "hsk4" ? "selected" : ""}>HSK 4 (Của Ngọc 💕)</option>
              <option value="hsk5" ${currentLevel === "hsk5" ? "selected" : ""}>HSK 5 (Chuyên sâu)</option>
              <option value="hsk6" ${currentLevel === "hsk6" ? "selected" : ""}>HSK 6 (Bậc thầy)</option>
              <option value="hsk3" ${currentLevel === "hsk3" ? "selected" : ""}>HSK 3 (Giao tiếp)</option>
              <option value="hsk2" ${currentLevel === "hsk2" ? "selected" : ""}>HSK 2 (Căn bản)</option>
              <option value="hsk1" ${currentLevel === "hsk1" ? "selected" : ""}>HSK 1 (Nhập môn)</option>
            </select>
          </div>
          <span class="fc-counter">${flashcardIndex + 1} / ${list.length}</span>
        </div>

        <div class="flashcard-box ${flashcardFlipped ? "flipped" : ""}" id="flashcardBox">
          ${!flashcardFlipped ? `
            <div class="fc-front">
              <div class="fc-header-row">
                <span class="fc-tag">🀄 ${getLevelLabel(currentLevel).split(" ")[0]} ${getLevelLabel(currentLevel).split(" ")[1] || ""} • Thẻ ${flashcardIndex + 1}/${list.length}</span>
                <span class="srs-badge ${getSRSBadge(w.hanzi).cls}">${getSRSBadge(w.hanzi).text}</span>
              </div>
              <span class="fc-hanzi">${w.hanzi}</span>
              <span class="fc-hint">👆 Chạm vào thẻ để lật xem nghĩa & ví dụ</span>
              <div class="fc-actions-row">
                <button class="btn-star btn-star-fc ${isStarred(w.hanzi) ? "active" : ""}" data-hanzi="${w.hanzi}">${isStarred(w.hanzi) ? "⭐ Đã lưu" : "☆ Lưu"}</button>
                <button class="btn-speak btn-speak-card" data-text="${w.hanzi}">🔊 Nghe phát âm</button>
                <a class="btn-dict" href="https://hanzii.net/search/word/${encodeURIComponent(w.hanzi)}?hl=vi" target="_blank" rel="noopener">📖 Tra Hanzii</a>
              </div>
            </div>
          ` : `
            <div class="fc-back">
              <span class="fc-pinyin">${w.pinyin}</span>
              <span class="fc-meaning">${w.meaning}</span>
              <div class="cwc-badges-row" style="margin-top: 4px;">
                <span class="fc-type-badge">${w.type || "Từ vựng"}</span>
                <span class="srs-badge ${getSRSBadge(w.hanzi).cls}">${getSRSBadge(w.hanzi).text}</span>
              </div>
              ${w.example ? `
                <div class="fc-example-box">
                  <span class="fc-ex-hanzi">"${w.example}"</span>
                  <span class="fc-ex-pinyin">${w.examplePinyin}</span>
                  <span class="fc-ex-vi">💬 ${w.exampleMeaning}</span>
                </div>
              ` : ""}
              <div class="fc-actions-row">
                <button class="btn-star btn-star-fc ${isStarred(w.hanzi) ? "active" : ""}" data-hanzi="${w.hanzi}">${isStarred(w.hanzi) ? "⭐ Đã lưu" : "☆ Lưu"}</button>
                <button class="btn-speak btn-speak-card" data-text="${w.example || w.hanzi}">🔊 Nghe ví dụ</button>
                <a class="btn-dict" href="https://hanzii.net/search/word/${encodeURIComponent(w.hanzi)}?hl=vi" target="_blank" rel="noopener">📖 Tra Hanzii</a>
              </div>
            </div>
          `}
        </div>

        ${flashcardFlipped ? `
          <div class="fc-srs-rating-row">
            <button class="pixel-btn btn-cream srs-rate-btn rate-again" id="btnSrsAgain">🔴 Chưa nhớ (Ôn lại)</button>
            <button class="pixel-btn btn-pink srs-rate-btn rate-good" id="btnSrsGood">🟢 Đã thuộc (Nhớ tốt)</button>
          </div>
        ` : `
          <div class="fc-nav-controls">
            <button class="pixel-btn btn-cream fc-nav-btn fc-prev-btn" id="btnFcPrev" title="Xem từ trước">◀ Trước</button>
            <button class="pixel-btn btn-pink fc-nav-btn fc-flip-btn" id="btnFcFlip" title="Lật xem nghĩa và ví dụ">🔄 Lật Thẻ</button>
            <button class="pixel-btn btn-cream fc-nav-btn fc-next-btn" id="btnFcNext" title="Sang từ tiếp theo">Sau ▶</button>
          </div>
        `}
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

    const btnSrsAgain = document.getElementById("btnSrsAgain");
    if (btnSrsAgain) {
      btnSrsAgain.addEventListener("click", () => {
        recordSRSReview(w.hanzi, false);
        if (window.showToast) window.showToast(`Đã ghi nhận: Cần ôn lại từ [${w.hanzi}]`);
        flashcardIndex++;
        flashcardFlipped = false;
        renderFlashcardTab();
      });
    }

    const btnSrsGood = document.getElementById("btnSrsGood");
    if (btnSrsGood) {
      btnSrsGood.addEventListener("click", () => {
        recordSRSReview(w.hanzi, true, "easy");
        if (window.AudioManager) AudioManager.playCandy();
        if (window.showToast) window.showToast(`✨ Tuyệt vời! Đã nhớ tốt từ [${w.hanzi}]`);
        flashcardIndex++;
        flashcardFlipped = false;
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
        speak(btn.dataset.text, btn);
      });
    });

    document.querySelectorAll(".btn-star-fc").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const hanzi = btn.dataset.hanzi;
        const starred = toggleStar(hanzi);
        btn.classList.toggle("active", starred);
        btn.innerHTML = starred ? "⭐ Đã lưu" : "☆ Lưu";
      });
    });
  }

  let quizRewarded = false;

  function startQuiz() {
    const list = currentLevel === "starred" ? getAllStarredWords() : (HSK_DATA[currentLevel] || HSK_DATA.hsk4);
    if (!list || list.length === 0) {
      const container = document.getElementById("chineseTabContent");
      container.innerHTML = `
        <div class="chinese-quiz-wrap">
          <div class="chinese-level-bar">
            <div class="clb-left">
              <label>🏷️ Cấp:</label>
              <select id="selQuizLevel" class="pixel-select">
                <option value="hsk4">HSK 4 💕</option>
                <option value="hsk5">HSK 5</option>
                <option value="hsk6">HSK 6</option>
                <option value="hsk3">HSK 3</option>
                <option value="hsk2">HSK 2</option>
                <option value="hsk1">HSK 1</option>
                <option value="starred" selected>⭐ Sổ Tay (0 từ)</option>
              </select>
            </div>
          </div>
          <div class="flashcard-empty-box">
            <div style="font-size: 36px; margin-bottom: 8px;">✍️</div>
            <h3>Sổ tay từ vựng đang trống nè!</h3>
            <p>Em hãy lưu thêm từ vào sổ tay hoặc chọn một cấp HSK khác để bắt đầu bài trắc nghiệm nhé 💕</p>
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
      return;
    }

    // High quality distractor fallback pool to guarantee exactly 4 unique options
    const fallbackPool = [...(HSK_DATA.hsk4 || []), ...(HSK_DATA.hsk3 || []), ...(HSK_DATA.hsk2 || [])];

    const shuffled = shuffleArray(list);
    const questionTargets = shuffled.slice(0, Math.min(5, shuffled.length));

    quizQuestions = questionTargets.map((target) => {
      let pool = list.filter((item) => item.hanzi !== target.hanzi && item.meaning !== target.meaning);
      if (pool.length < 3) {
        const extra = fallbackPool.filter((item) => item.hanzi !== target.hanzi && item.meaning !== target.meaning && !pool.some((p) => p.hanzi === item.hanzi));
        pool = [...pool, ...extra];
      }
      const randomWrong = shuffleArray(pool).slice(0, 3);
      const options = shuffleArray([target, ...randomWrong]);
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
              <option value="starred" ${currentLevel === "starred" ? "selected" : ""}>⭐ Sổ Tay (${getAllStarredWords().length})</option>
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

    const btnSpeakQuiz = document.getElementById("btnSpeakQuiz");
    if (btnSpeakQuiz) {
      btnSpeakQuiz.addEventListener("click", () => {
        speak(q.target.hanzi, btnSpeakQuiz);
      });
    }

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

        // Update SRS review status
        recordSRSReview(q.target.hanzi, isRight);

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

  let matchWords = [];
  let matchHanziCards = [];
  let matchPinyinCards = [];
  let matchSelectedHanzi = null;
  let matchSelectedPinyin = null;
  let matchedIds = new Set();
  let matchRewarded = false;
  let matchLocked = false;

  function startMatchGame() {
    const list = currentLevel === "starred" ? getAllStarredWords() : (HSK_DATA[currentLevel] || HSK_DATA.hsk4);
    if (list.length < 4) {
      const container = document.getElementById("chineseTabContent");
      container.innerHTML = `
        <div class="chinese-match-wrap">
          <div class="chinese-level-bar">
            <div class="clb-left">
              <label>🏷️ Cấp độ:</label>
              <select id="selMatchLevel" class="pixel-select">
                <option value="hsk4" selected>HSK 4 (Của Ngọc 💕)</option>
                <option value="hsk5">HSK 5</option>
                <option value="hsk6">HSK 6</option>
                <option value="hsk3">HSK 3</option>
                <option value="hsk2">HSK 2</option>
                <option value="hsk1">HSK 1</option>
                <option value="starred">⭐ Sổ Tay Yêu Thích (${getAllStarredWords().length} từ)</option>
              </select>
            </div>
          </div>
          <div class="flashcard-empty-box">
            <div style="font-size: 36px; margin-bottom: 8px;">🧩</div>
            <h3>Cần ít nhất 4 từ để chơi nối chữ!</h3>
            <p>Sổ tay yêu thích của em cần có từ 4 từ trở lên để tạo ván nối chữ. Em hãy đổi cấp độ hoặc lưu thêm từ vào sổ tay nhé 💕</p>
          </div>
        </div>
      `;
      const selM = document.getElementById("selMatchLevel");
      if (selM) {
        selM.addEventListener("change", (e) => {
          setLevel(e.target.value);
          startMatchGame();
        });
      }
      return;
    }

    const shuffled = [...list].sort(() => Math.random() - 0.5);
    matchWords = shuffled.slice(0, 5).map((w, idx) => ({ ...w, uid: `m_${idx}_${w.hanzi}` }));

    matchHanziCards = matchWords.map((w) => ({ uid: w.uid, hanzi: w.hanzi })).sort(() => Math.random() - 0.5);
    matchPinyinCards = matchWords.map((w) => ({ uid: w.uid, pinyin: w.pinyin, meaning: w.meaning, hanzi: w.hanzi })).sort(() => Math.random() - 0.5);

    matchSelectedHanzi = null;
    matchSelectedPinyin = null;
    matchedIds = new Set();
    matchRewarded = false;
    matchLocked = false;

    renderMatchBoard();
  }

  function renderMatchBoard() {
    const container = document.getElementById("chineseTabContent");
    const isCompleted = matchedIds.size === matchWords.length && matchWords.length > 0;

    if (isCompleted) {
      if (!matchRewarded) {
        matchRewarded = true;
        if (window.GameState) {
          const s = window.GameState.get();
          s.candy = (s.candy || 0) + 2;
          if (window.GameState.addXP) window.GameState.addXP(10);
          window.GameState.save();
          window.GameState.renderHUD();
        }
        if (window.AudioManager) AudioManager.playCelebration();
      }

      container.innerHTML = `
        <div class="quiz-result-wrap match-result-wrap">
          <div style="font-size: 40px; margin-bottom: 8px;">🎉</div>
          <h3>Xuất Sắc! Hoàn Thành Nối Từ</h3>
          <p class="quiz-score-text">Ngọc đã nối chính xác trọn vẹn <strong>${matchWords.length}/${matchWords.length}</strong> cặp chữ Hán & Pinyin (${getLevelLabel(currentLevel)})!</p>
          <p class="quiz-cheer">Trí nhớ của em siêu đỉnh luôn nè 💕 (+2 🍬 Kẹo & +10 XP)</p>
          <div class="quiz-actions">
            <button class="pixel-btn btn-pink" id="btnRestartMatch">Chơi Ván Mới 🧩</button>
            <button class="pixel-btn btn-cream" id="btnMatchToStarred">Xem Sổ Tay ⭐</button>
          </div>
        </div>
      `;

      document.getElementById("btnRestartMatch").addEventListener("click", startMatchGame);
      document.getElementById("btnMatchToStarred").addEventListener("click", () => switchTab("starred"));
      return;
    }

    let hanziHtml = "";
    matchHanziCards.forEach((c) => {
      const isMatched = matchedIds.has(c.uid);
      const isSelected = matchSelectedHanzi && matchSelectedHanzi.uid === c.uid;
      hanziHtml += `
        <button class="match-card match-card-hanzi ${isMatched ? "matched" : ""} ${isSelected ? "selected" : ""}" data-uid="${c.uid}" ${isMatched ? "disabled" : ""}>
          <span class="mc-hanzi">${c.hanzi}</span>
          ${isMatched ? '<span class="mc-check">✓</span>' : ""}
        </button>
      `;
    });

    let pinyinHtml = "";
    matchPinyinCards.forEach((c) => {
      const isMatched = matchedIds.has(c.uid);
      const isSelected = matchSelectedPinyin && matchSelectedPinyin.uid === c.uid;
      pinyinHtml += `
        <button class="match-card match-card-pinyin ${isMatched ? "matched" : ""} ${isSelected ? "selected" : ""}" data-uid="${c.uid}" ${isMatched ? "disabled" : ""}>
          <span class="mc-pinyin">${c.pinyin}</span>
          <span class="mc-meaning">${c.meaning}</span>
          ${isMatched ? '<span class="mc-check">✓</span>' : ""}
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
            <label>🏷️ Cấp:</label>
            <select id="selMatchLevel" class="pixel-select">
              <option value="hsk4" ${currentLevel === "hsk4" ? "selected" : ""}>HSK 4 💕</option>
              <option value="hsk5" ${currentLevel === "hsk5" ? "selected" : ""}>HSK 5</option>
              <option value="hsk6" ${currentLevel === "hsk6" ? "selected" : ""}>HSK 6</option>
              <option value="hsk3" ${currentLevel === "hsk3" ? "selected" : ""}>HSK 3</option>
              <option value="hsk2" ${currentLevel === "hsk2" ? "selected" : ""}>HSK 2</option>
              <option value="hsk1" ${currentLevel === "hsk1" ? "selected" : ""}>HSK 1</option>
              <option value="starred" ${currentLevel === "starred" ? "selected" : ""}>⭐ Sổ Tay (${getAllStarredWords().length})</option>
            </select>
          </div>
          <span class="fc-counter">🧩 Đã nối: <strong>${matchedIds.size} / ${matchWords.length}</strong></span>
          <button class="btn-dict" id="btnNewMatchRound" title="Đổi sang 5 từ khác">🎲 Đổi ván</button>
        </div>

        <p class="chinese-help-text">Chạm 1 thẻ <strong>Chữ Hán</strong> bên trái và 1 thẻ <strong>Pinyin / Nghĩa</strong> bên phải tương ứng để nối cặp nhé!</p>

        <div class="match-columns-grid">
          <div class="match-col match-col-left">
            <div class="match-col-title">🀄 Chữ Hán</div>
            ${hanziHtml}
          </div>
          <div class="match-col match-col-right">
            <div class="match-col-title">📖 Pinyin & Nghĩa</div>
            ${pinyinHtml}
          </div>
        </div>
      </div>
    `;

    bindMatchEvents();
  }

  function bindMatchEvents() {
    const sel = document.getElementById("selMatchLevel");
    if (sel) {
      sel.addEventListener("change", (e) => {
        setLevel(e.target.value);
        startMatchGame();
      });
    }

    const btnNew = document.getElementById("btnNewMatchRound");
    if (btnNew) {
      btnNew.addEventListener("click", startMatchGame);
    }

    document.querySelectorAll(".match-card-hanzi").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (matchLocked) return;
        const uid = btn.dataset.uid;
        if (matchedIds.has(uid)) return;

        matchSelectedHanzi = matchHanziCards.find((c) => c.uid === uid);
        checkMatchAttempt();
      });
    });

    document.querySelectorAll(".match-card-pinyin").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (matchLocked) return;
        const uid = btn.dataset.uid;
        if (matchedIds.has(uid)) return;

        matchSelectedPinyin = matchPinyinCards.find((c) => c.uid === uid);
        checkMatchAttempt();
      });
    });
  }

  function checkMatchAttempt() {
    if (!matchSelectedHanzi || !matchSelectedPinyin) {
      renderMatchBoard();
      return;
    }

    const isCorrect = matchSelectedHanzi.uid === matchSelectedPinyin.uid;
    const targetWord = matchWords.find((w) => w.uid === matchSelectedHanzi.uid);

    if (isCorrect) {
      matchedIds.add(matchSelectedHanzi.uid);
      if (window.AudioManager && typeof AudioManager.playCandy === "function") {
        AudioManager.playCandy();
      }
      if (targetWord) speak(targetWord.hanzi);
      matchSelectedHanzi = null;
      matchSelectedPinyin = null;
      renderMatchBoard();
    } else {
      matchLocked = true;
      if (window.AudioManager && typeof AudioManager.playBonk === "function") {
        AudioManager.playBonk();
      }
      
      try {
        const hBtn = document.querySelector(`.match-card-hanzi[data-uid="${matchSelectedHanzi.uid}"]`);
        const pBtn = document.querySelector(`.match-card-pinyin[data-uid="${matchSelectedPinyin.uid}"]`);
        if (hBtn) hBtn.classList.add("shake-wrong");
        if (pBtn) pBtn.classList.add("shake-wrong");
      } catch {}

      setTimeout(() => {
        matchSelectedHanzi = null;
        matchSelectedPinyin = null;
        matchLocked = false;
        renderMatchBoard();
      }, 700);
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
      btn.addEventListener("click", () => speak(btn.dataset.text, btn));
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
            <button class="pixel-btn btn-pink btn-empty-action" id="btnGoToDaily">🎯 Đến Học 5 Từ Hôm Nay</button>
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
      btn.addEventListener("click", () => speak(btn.dataset.text, btn));
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
    else if (tabKey === "match") startMatchGame();
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
