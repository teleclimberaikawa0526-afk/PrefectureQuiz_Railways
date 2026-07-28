// 日本全国の電車データ（ローカル実写画像・走行都道府県・解説）
window.TRAIN_DATA = [
  {
    id: "hayabusa_e5",
    name: "E5けい はやぶさ",
    kanjiName: "E5系 はやぶさ",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [2, 3, 4, 7, 9, 11, 13], // 青森, 岩手, 宮城, 福島, 栃木, 埼玉, 東京
    prefectureNames: ["あおもり", "いわて", "みやぎ", "ふくしま", "とちぎ", "さいたま", "とうきょう"],
    imageUrl: "images/hayabusa_e5.jpg",
    trivia: "みどりいろの かっこいい しんかんせん！ とうきょうから あおもりまで すごい スピードで はしるよ。"
  },
  {
    id: "nozomi_n700s",
    name: "N700S のぞみ",
    kanjiName: "N700S のぞみ",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [13, 14, 22, 23, 21, 25, 26, 27, 28, 33, 34, 35, 40], // 東京〜福岡
    prefectureNames: ["とうきょう", "かながわ", "しずおか", "あいち", "ぎふ", "しが", "きょうと", "おおさか", "ひょうご", "おかやま", "ひろしま", "やまぐち", "ふくおか"],
    imageUrl: "images/nozomi_n700s.jpg",
    trivia: "とうかいどう・さんようしんかんせんの さいしんがた！ とうきょうから はかたまで を むすんでいるよ。"
  },
  {
    id: "kagayaki_e7",
    name: "E7けい かがやき",
    kanjiName: "E7系 かがやき",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [13, 11, 10, 20, 15, 16, 17, 18], // 東京〜福井
    prefectureNames: ["とうきょう", "さいたま", "ぐんま", "ながの", "にいがた", "とやま", "いしかわ", "ふくい"],
    imageUrl: "images/kagayaki_e7.jpg",
    trivia: "ほくりくしんかんせんの でんしゃ！ あおい いろが 特徴で、ながの や とやま、つるが まで はしるよ。"
  },
  {
    id: "komachi_e6",
    name: "E6けい こまち",
    kanjiName: "E6系 こまち",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [5, 3, 4, 7, 9, 11, 13], // 秋田〜東京
    prefectureNames: ["あきた", "いわて", "みやぎ", "ふくしま", "とちぎ", "さいたま", "とうきょう"],
    imageUrl: "images/komachi_e6.jpg",
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
    imageUrl: "images/tsubame_800.jpg",
    trivia: "きゅうしゅうしんかんせんの でんしゃ！ なかは 木のかおりがする 和風のデザインだよ。"
  },
  {
    id: "tsubasa_e3",
    name: "E3けい つばさ",
    kanjiName: "E3系 つばさ",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [6, 4, 7, 9, 11, 13], // 山形〜東京
    prefectureNames: ["やまがた", "みやぎ", "ふくしま", "とちぎ", "さいたま", "とうきょう"],
    imageUrl: "images/tsubasa_e3.jpg",
    trivia: "やまがたしんかんせんの でんしゃ！ むらさき色と おしどり色が とても きれいだね。"
  },
  {
    id: "doctor_yellow",
    name: "ドクターイエロー",
    kanjiName: "ドクターイエロー (923形)",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [13, 14, 22, 23, 21, 25, 26, 27, 28, 33, 34, 35, 40],
    prefectureNames: ["とうきょう", "かながわ", "しずおか", "あいち", "ぎふ", "しが", "きょうと", "おおさか", "ひょうご", "おかやま", "ひろしま", "やまぐち", "ふくおか"],
    imageUrl: "images/doctor_yellow.jpg",
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
    imageUrl: "images/azusa_e353.jpg",
    trivia: "しんじゅくから やまなし、ながのの まつもとまで はしる かっこいい 特急だよ！"
  },
  {
    id: "thunderbird_683",
    name: "とっきゅう サンダーバード",
    kanjiName: "特急 サンダーバード",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [27, 26, 25, 18, 17], // 大阪〜石川
    prefectureNames: ["おおさか", "きょうと", "しが", "ふくい", "いしかわ"],
    imageUrl: "images/thunderbird_683.jpg",
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
    imageUrl: "images/hida_hc85.jpg",
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
    imageUrl: "images/yufuin_nomori.jpg",
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
    imageUrl: "images/narita_express.jpg",
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
    imageUrl: "images/sonic_883.jpg",
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
    imageUrl: "images/shimakaze_50000.jpg",
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
    imageUrl: "images/sl_yamaguchi.jpg",
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
    imageUrl: "images/yamanote_line.jpg",
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
    imageUrl: "images/hankyu_train.jpg",
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
    imageUrl: "images/fujisan_view.jpg",
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
    imageUrl: "images/odoriko_e257.jpg",
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
    imageUrl: "images/yakumo_273.jpg",
    trivia: "おかやまから とっとり・しまねの いずもたいしゃまで 山を こえて はしる あたらしい 特急！"
  }
];
