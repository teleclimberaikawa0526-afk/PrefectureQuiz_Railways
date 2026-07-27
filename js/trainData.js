// 日本全国の電車データ（実写画像・走行都道府県・解説）
window.TRAIN_DATA = [
  {
    id: "hayabusa_e5",
    name: "E5けい はやぶさ",
    kanjiName: "E5系 はやぶさ",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [2, 3, 4, 7, 9, 11, 13], // 青森, 岩手, 宮城, 福島, 栃木, 埼玉, 東京
    prefectureNames: ["あおもり", "いわて", "みやぎ", "ふくしま", "とちぎ", "さいたま", "とうきょう"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Shinkansen-E5-U2.jpg/800px-Shinkansen-E5-U2.jpg",
    trivia: "みどりいろの かっこいい しんかんせん！ とうきょうから あおもりまで すごい スピードで はしるよ。"
  },
  {
    id: "nozomi_n700s",
    name: "N700S のぞみ",
    kanjiName: "N700S のぞみ",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [13, 14, 22, 23, 21, 25, 26, 27, 28, 33, 34, 35, 40], // 東京, 神奈川, 静岡, 愛知, 岐阜, 滋賀, 京都, 大阪, 兵庫, 岡山, 広島, 山口, 福岡
    prefectureNames: ["とうきょう", "かながわ", "しずおか", "あいち", "ぎふ", "しが", "きょうと", "おおさか", "ひょうご", "おかやま", "ひろしま", "やまぐち", "ふくおか"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Shinkansen-N700S-J0.jpg/800px-Shinkansen-N700S-J0.jpg",
    trivia: "とうかいどう・さんようしんかんせんの さいしんがた！ とうきょうから はかたまで を むすんでいるよ。"
  },
  {
    id: "kagayaki_e7",
    name: "E7けい かがやき",
    kanjiName: "E7系 かがやき",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [13, 11, 10, 20, 15, 16, 17, 18], // 東京, 埼玉, 群馬, 長野, 新潟, 富山, 石川, 福井
    prefectureNames: ["とうきょう", "さいたま", "ぐんま", "ながの", "にいがた", "とやま", "いしかわ", "ふくい"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Shinkansen_E7_F1.jpg/800px-Shinkansen_E7_F1.jpg",
    trivia: "ほくりくしんかんせんの でんしゃ！ あおい いろが 特徴で、ながの や とやま、つるが まで はしるよ。"
  },
  {
    id: "komachi_e6",
    name: "E6けい こまち",
    kanjiName: "E6系 こまち",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [5, 3, 4, 7, 9, 11, 13], // 秋田, 岩手, 宮城, 福島, 栃木, 埼玉, 東京
    prefectureNames: ["あきた", "いわて", "みやぎ", "ふくしま", "とちぎ", "さいたま", "とうきょう"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/JRE-E6-Z2.jpg/800px-JRE-E6-Z2.jpg",
    trivia: "あかい ボディが おしゃれな あきたしんかんせん！ とうきょうから あきたまで はしるよ。"
  },
  {
    id: "tsubame_800",
    name: "800けい つばめ",
    kanjiName: "800系 つばめ",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [40, 41, 43, 46], // 福岡, 佐賀, 熊本, 鹿児島
    prefectureNames: ["ふくおか", "さが", "くまもと", "かごしま"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Kyushu-Shinkansen-800-U007.jpg/800px-Kyushu-Shinkansen-800-U007.jpg",
    trivia: "きゅうしゅうしんかんせんの でんしゃ！ なかは 木のかおりがする 和風のデザインだよ。"
  },
  {
    id: "tsubasa_e3",
    name: "E3けい つばさ",
    kanjiName: "E3系 つばさ",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [6, 4, 7, 9, 11, 13], // 山形, 宮城, 福島, 栃木, 埼玉, 東京
    prefectureNames: ["やまがた", "みやぎ", "ふくしま", "とちぎ", "さいたま", "とうきょう"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/E3-2000_L64.jpg/800px-E3-2000_L64.jpg",
    trivia: "やまがたしんかんせんの でんしゃ！ むらさき色と おしどり色が とても きれいだね。"
  },
  {
    id: "doctor_yellow",
    name: "ドクターイエロー",
    kanjiName: "ドクターイエロー (923形)",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [13, 14, 22, 23, 21, 25, 26, 27, 28, 33, 34, 35, 40], // 東京〜福岡
    prefectureNames: ["とうきょう", "かながわ", "しずおか", "あいち", "ぎふ", "しが", "きょうと", "おおさか", "ひょうご", "おかやま", "ひろしま", "やまぐち", "ふくおか"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Class923-T4.jpg/800px-Class923-T4.jpg",
    trivia: "きいろい しんかんせん！ せんろや でんきを チェックする 「しんかんせんの おいしゃさん」だよ。"
  },
  {
    id: "azusa_e353",
    name: "とっきゅう あずさ",
    kanjiName: "特急 あずさ (E353系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [13, 19, 20], // 東京, 山梨, 長野
    prefectureNames: ["とうきょう", "やまなし", "ながの"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/E353_S101.jpg/800px-E353_S101.jpg",
    trivia: "しんじゅくから やまなし、ながのの まつもとまで はしる かっこいい 特急だよ！"
  },
  {
    id: "thunderbird_683",
    name: "とっきゅう サンダーバード",
    kanjiName: "特急 サンダーバード",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [27, 26, 25, 18, 17], // 大阪, 京都, 滋賀, 福井, 石川
    prefectureNames: ["おおさか", "きょうと", "しが", "ふくい", "いしかわ"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/JR_West_683-4000_T41.jpg/800px-JR_West_683-4000_T41.jpg",
    trivia: "おおさか・きょうとから ふくい や いしかわの つるが・たけふまで スピーディーに はしるよ。"
  },
  {
    id: "hida_hc85",
    name: "とっきゅう ひだ",
    kanjiName: "特急 ひだ (HC85系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [23, 21, 16], // 愛知, 岐阜, 富山
    prefectureNames: ["あいち", "ぎふ", "とやま"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/JRC_HC85_D1.jpg/800px-JRC_HC85_D1.jpg",
    trivia: "なごやから ぎふの ひだたかやま、とやままで 山のなかを はしる ハイブリッド特急！"
  },
  {
    id: "yufuin_nomori",
    name: "とっきゅう ゆふいんのもり",
    kanjiName: "特急 ゆふいんの森",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [40, 44], // 福岡, 大分
    prefectureNames: ["ふくおか", "おおいた"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/JRK_Kiha72.jpg/800px-JRK_Kiha72.jpg",
    trivia: "みどりいろの レトロで クラシックな とっきゅう！ はかたから ゆふいんおんせんまで はしるよ。"
  },
  {
    id: "narita_express",
    name: "なりた エクスプレス",
    kanjiName: "成田エクスプレス (N'EX)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [12, 13, 14], // 千葉, 東京, 神奈川
    prefectureNames: ["ちば", "とうきょう", "かながわ"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/JR_East_E259_Ne001.jpg/800px-JR_East_E259_Ne001.jpg",
    trivia: "なりたくうこうと とうきょう・よこはまを むすぶ赤と黒のデザインが 特徴の とっきゅう！"
  },
  {
    id: "sonic_883",
    name: "とっきゅう ソニック",
    kanjiName: "特急 ソニック (883系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [40, 44], // 福岡, 大分
    prefectureNames: ["ふくおか", "おおいた"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/JRK_883_Ao-17.jpg/800px-JRK_883_Ao-17.jpg",
    trivia: "あおい メタリックボディの めっちゃかっこいい とっきゅう！ ふくおかから おおいがわまで カーブも すいすい。"
  },
  {
    id: "shimakaze_50000",
    name: "かんこうとっきゅう しまかぜ",
    kanjiName: "観光特急 しまかぜ",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [27, 29, 24, 23], // 大阪, 奈良, 三重, 愛知
    prefectureNames: ["おおさか", "なら", "みえ", "あいち"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Kintetsu_50000_SV01.jpg/800px-Kintetsu_50000_SV01.jpg",
    trivia: "おおさか・なごや・きょうとから いせしままで はしる ごうかな かんこう特急！"
  },
  {
    id: "sl_yamaguchi",
    name: "SLやまぐちごう",
    kanjiName: "SLやまぐち号",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [35, 32], // 山口, 島根
    prefectureNames: ["やまぐち", "しまね"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/JRW_SL_Yamaguchi_C571.jpg/800px-JRW_SL_Yamaguchi_C571.jpg",
    trivia: "けむりを もくもく だして はしる じょうききかんしゃ！ やまぐちと つわのの間を はしるよ。"
  },
  {
    id: "yamanote_line",
    name: "やまのてせん",
    kanjiName: "山手線 (E235系)",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [13], // 東京
    prefectureNames: ["とうきょう"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/JRE-E235-0_01.jpg/800px-JRE-E235-0_01.jpg",
    trivia: "とうきょうの まちなかを まあるく ぐるぐる はしる、きみどり色の でんしゃ！"
  },
  {
    id: "hankyu_train",
    name: "はんきゅうでんしゃ",
    kanjiName: "阪急電車",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [27, 26, 28], // 大阪, 京都, 兵庫
    prefectureNames: ["おおさか", "きょうと", "ひょうご"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hankyu1000_1000F.jpg/800px-Hankyu1000_1000F.jpg",
    trivia: "マルーン色（えんじ色）の ピカピカな でんしゃ！ おおさか・きょうと・こうべを むすんでいるよ。"
  },
  {
    id: "fujisan_view",
    name: "ふじさんビューとっきゅう",
    kanjiName: "富士山ビュー特急",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [19], // 山梨
    prefectureNames: ["やまなし"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Fujikyu_8500_8501.jpg/800px-Fujikyu_8500_8501.jpg",
    trivia: "やまなしけんで ふじさんを ながめながら はしる あかい かんこう特急だよ！"
  },
  {
    id: "odoriko_e257",
    name: "とっきゅう おどりこ",
    kanjiName: "特急 踊り子 (E257系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [13, 14, 22], // 東京, 神奈川, 静岡
    prefectureNames: ["とうきょう", "かながわ", "しずおか"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/E257-2000_NA-01.jpg/800px-E257-2000_NA-01.jpg",
    trivia: "とうきょうから いずはんとう（しずおかけん）まで はしる、うみの いろの とっきゅう！"
  },
  {
    id: "yakumo_273",
    name: "とっきゅう やくも",
    kanjiName: "特急 やくも (273系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [33, 31, 32], // 岡山, 鳥取, 島根
    prefectureNames: ["おかやま", "とっとり", "しまね"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/JR_West_273_Y1.jpg/800px-JR_West_273_Y1.jpg",
    trivia: "おかやまから とっとり・しまねの いずもたいしゃまで 山を こえて はしる あたらしい 特急！"
  }
];
