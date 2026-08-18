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
,
  {
    id: "hitachi",
    name: "とっきゅう ひたち",
    kanjiName: "特急 ひたち (E657系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [8, 7, 4],
    prefectureNames: ["いばらき", "ふくしま", "みやぎ"],
    imageUrl: "images/hitachi.jpg",
    trivia: "とうきょうから うみ沿いを走って いばらきけん や みやぎけん までいくよ！"
  },
  {
    id: "inaho",
    name: "とっきゅう いなほ",
    kanjiName: "特急 いなほ (E653系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [15, 6, 5],
    prefectureNames: ["にいがた", "やまがた", "あきた"],
    imageUrl: "images/inaho.jpg",
    trivia: "にほんかいの ゆうひ みたいな オレンジ色の とっきゅうだよ。"
  },
  {
    id: "tokachi",
    name: "とっきゅう とかち",
    kanjiName: "特急 とかち (キハ261系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [1],
    prefectureNames: ["ほっかいどう"],
    imageUrl: "images/tokachi.jpg",
    trivia: "ほっかいどうの おおきな だいちを はしる しろと あおの でんしゃ！"
  },
  {
    id: "kamui",
    name: "とっきゅう カムイ",
    kanjiName: "特急 カムイ (789系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [1],
    prefectureNames: ["ほっかいどう"],
    imageUrl: "images/kamui.jpg",
    trivia: "さっぽろと あさひかわ をむすぶ、シルバーの かっこいい でんしゃ。"
  },
  {
    id: "new_red_arrow",
    name: "ニューレッドアロー",
    kanjiName: "特急 ニューレッドアロー (西武10000系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [13, 11],
    prefectureNames: ["とうきょう", "さいたま"],
    imageUrl: "images/new_red_arrow.jpg",
    trivia: "せいぶてつどうの むかしからある ゆうめいな とっきゅうでんしゃ！"
  },
  {
    id: "laview",
    name: "とっきゅう ラビュー",
    kanjiName: "特急 ラビュー (西武001系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [13, 11],
    prefectureNames: ["とうきょう", "さいたま"],
    imageUrl: "images/laview.jpg",
    trivia: "まどが とっても おおきくて、うちゅうせん みたいな かたちの でんしゃ！"
  },
  {
    id: "resort_shirakami",
    name: "リゾートしらかみ",
    kanjiName: "観光列車 リゾートしらかみ",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [2, 5],
    prefectureNames: ["あおもり", "あきた"],
    imageUrl: "images/resort_shirakami.jpg",
    trivia: "うみと やまの けしきが たのしめる、おおきなまどの かんこうれっしゃ！"
  },
  {
    id: "tango_no_umi",
    name: "たんごのうみ",
    kanjiName: "特急 丹後の海",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [26, 28],
    prefectureNames: ["きょうと", "ひょうご"],
    imageUrl: "images/tango_no_umi.jpg",
    trivia: "きょうとの うみぞいを はしる、きの ぬくもりが ある でんしゃ。"
  },
  {
    id: "green_mover_max",
    name: "グリーンムーバーマックス",
    kanjiName: "広島電鉄 グリーンムーバーマックス",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [34],
    prefectureNames: ["ひろしま"],
    imageUrl: "images/green_mover_max.jpg",
    trivia: "ひろしまの まちを はしる、ながーい ろめんでんしゃ だよ。"
  },
  {
    id: "osaka_monorail",
    name: "おおさかモノレール",
    kanjiName: "大阪モノレール",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [27],
    prefectureNames: ["おおさか"],
    imageUrl: "images/osaka_monorail.jpg",
    trivia: "そらを とぶように たかいところを はしる モノレール！"
  },
  {
    id: "ishizuchi",
    name: "とっきゅう いしづち",
    kanjiName: "特急 いしづち (8600系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [37, 38],
    prefectureNames: ["かがわ", "えひめ"],
    imageUrl: "images/ishizuchi.jpg",
    trivia: "ＳＬを イメージした まっくろい おかおの とっきゅうだよ。"
  },
  {
    id: "shimanto",
    name: "とっきゅう しまんと",
    kanjiName: "特急 しまんと (2700系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [37, 39],
    prefectureNames: ["かがわ", "こうち"],
    imageUrl: "images/shimanto.jpg",
    trivia: "あか と みどり の もようが かっこいい、しこくの とっきゅう！"
  },
  {
    id: "chiba_monorail",
    name: "ちばモノレール",
    kanjiName: "千葉モノレール",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [12],
    prefectureNames: ["ちば"],
    imageUrl: "images/chiba_monorail.jpg",
    trivia: "レールに ぶらさがって はしる、めずらしい けんすいしき モノレール！"
  },
  {
    id: "rapiit",
    name: "とっきゅう ラピート",
    kanjiName: "特急 ラピート (南海50000系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [27],
    prefectureNames: ["おおさか"],
    imageUrl: "images/rapiit.jpg",
    trivia: "てつじん みたいな まるい かおが とくちょうの、くうこういき とっきゅう！"
  },
  {
    id: "hinotori",
    name: "とっきゅう ひのとり",
    kanjiName: "特急 ひのとり (近鉄80000系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [27, 29, 24, 23],
    prefectureNames: ["おおさか", "なら", "みえ", "あいち"],
    imageUrl: "images/hinotori.jpg",
    trivia: "メタリックな あかい ボディが かっこいい、きんてつの エース！"
  },
  {
    id: "yui_rail",
    name: "ゆいレール",
    kanjiName: "ゆいレール",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [47],
    prefectureNames: ["おきなわ"],
    imageUrl: "images/yui_rail.jpg",
    trivia: "おきなわを はしる 唯一の てつどう！モノレールだよ。"
  },
  {
    id: "kamome",
    name: "しんかんせん かもめ",
    kanjiName: "西九州新幹線 かもめ (N700S系)",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [41, 42],
    prefectureNames: ["さが", "ながさき"],
    imageUrl: "images/kamome.jpg",
    trivia: "さがけんと ながさきけんを むすぶ、あか と しろの あたらしい しんかんせん！"
  },
  {
    id: "super_oki",
    name: "とっきゅう スーパーおき",
    kanjiName: "特急 スーパーおき (キハ187系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [31, 32, 35],
    prefectureNames: ["とっとり", "しまね", "やまぐち"],
    imageUrl: "images/super_oki.jpg",
    trivia: "きいろ と あお の しかくくて はやい でんしゃ！"
  },
  {
    id: "alps_express",
    name: "アルペンとっきゅう",
    kanjiName: "富山地方鉄道 アルペン特急",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [16],
    prefectureNames: ["とやま"],
    imageUrl: "images/alps_express.jpg",
    trivia: "むかしは せいぶてつどうの レッドアロー だった でんしゃだよ。"
  },
  {
    id: "toki",
    name: "しんかんせん とき",
    kanjiName: "上越新幹線 とき (E7系)",
    category: "しんかんせん",
    categoryName: "新幹線",
    prefectures: [13, 11, 10, 15],
    prefectureNames: ["とうきょう", "さいたま", "ぐんま", "にいがた"],
    imageUrl: "images/toki.jpg",
    trivia: "ぐんまけんや にいがたけんの ゆきやまを こえて はしる しんかんせん！"
  },
  {
    id: "kuroshio",
    name: "とっきゅう くろしお",
    kanjiName: "特急 くろしお (287系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [26, 27, 30],
    prefectureNames: ["きょうと", "おおさか", "わかやま"],
    imageUrl: "images/kuroshio.jpg",
    trivia: "パンダの かおが かかれている ことも ある、わかやまへいく とっきゅう！"
  },
  {
    id: "uzushio",
    name: "とっきゅう うずしお",
    kanjiName: "特急 うずしお (2600系)",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [37, 36],
    prefectureNames: ["かがわ", "とくしま"],
    imageUrl: "images/uzushio.jpg",
    trivia: "とくしまけん と かがわけん をむすぶ はやい でんしゃだよ。"
  },
  {
    id: "umisachi_yamasachi",
    name: "うみさちやまさち",
    kanjiName: "観光特急 海幸山幸",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [45],
    prefectureNames: ["みやざき"],
    imageUrl: "images/umisachi_yamasachi.jpg",
    trivia: "ほんものの きの いた をはった、おもちゃみたいな かわいい でんしゃ。"
  },
  {
    id: "enoden",
    name: "えのでん",
    kanjiName: "江ノ島電鉄 (江ノ電)",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [14],
    prefectureNames: ["かながわ"],
    imageUrl: "images/enoden.jpg",
    trivia: "うみの よこや いえと いえの あいだを コトコト はしる でんしゃ。"
  },
  {
    id: "shonan_monorail",
    name: "しょうなんモノレール",
    kanjiName: "湘南モノレール",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [14],
    prefectureNames: ["かながわ"],
    imageUrl: "images/shonan_monorail.jpg",
    trivia: "レールに ぶらさがって ジェットコースターみたいに はしる モノレール！"
  },
  {
    id: "kurobe_gorge",
    name: "くろべ トロッコでんしゃ",
    kanjiName: "黒部峡谷鉄道 トロッコ電車",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [16],
    prefectureNames: ["とやま"],
    imageUrl: "images/kurobe_gorge.jpg",
    trivia: "まどが なくて かぜを かんじながら やまおくを はしる ちいさな でんしゃ。"
  },
  {
    id: "hakone_tozan",
    name: "はこねとざんてつどう",
    kanjiName: "箱根登山鉄道 (アレグラ号)",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [14],
    prefectureNames: ["かながわ"],
    imageUrl: "images/hakone_tozan.jpg",
    trivia: "ジグザグに すすみながら、きつい やまみちを のぼっていく でんしゃ！"
  },
  {
    id: "botchan_ressha",
    name: "ぼっちゃんれっしゃ",
    kanjiName: "伊予鉄道 坊っちゃん列車",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [38],
    prefectureNames: ["えひめ"],
    imageUrl: "images/botchan_ressha.jpg",
    trivia: "ＳＬの かたちを しているけど、じつは ディーゼルで うごく ろめんでんしゃ だよ。"
  },
  {
    id: "randen",
    name: "らんでん",
    kanjiName: "嵐電 (京福電気鉄道)",
    category: "でんしゃ",
    categoryName: "SL・その他の電車",
    prefectures: [26],
    prefectureNames: ["きょうと"],
    imageUrl: "images/randen.jpg",
    trivia: "きょうとの まちの なかや、どうろの うえを はしる でんしゃ。"
  },
  {
    id: "asoboy",
    name: "とっきゅう あそぼーい！",
    kanjiName: "特急 あそぼーい！",
    category: "とっきゅう",
    categoryName: "特急電車",
    prefectures: [43, 44],
    prefectureNames: ["くまもと", "おおいた"],
    imageUrl: "images/asoboy.jpg",
    trivia: "いぬの キャラクター「くろちゃん」が いっぱい かかれた たのしい でんしゃ！"
  }
];
