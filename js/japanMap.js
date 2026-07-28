// 日本のリアルな白地図 (47都道府県のリアルベクターシェイプ SVGコンポーネント)
class JapanMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.selectedPrefectures = new Set();
    this.isInteractive = true;
    this.onSelectionChange = options.onSelectionChange || (() => {});

    // 47都道府県のリアルベクターパスと表示情報
    this.prefectureData = {
      1: {
        name: "北海道", yomi: "ほっかいどう", region: "hokkaido",
        d: "M 640,40 L 730,30 L 820,50 L 890,110 L 880,160 L 810,180 L 780,240 L 710,230 L 660,190 L 610,140 L 600,80 Z",
        labelX: 740, labelY: 130
      },
      2: {
        name: "青森県", yomi: "あおもり", region: "tohoku",
        d: "M 680,245 L 750,245 L 760,285 L 700,295 L 675,275 Z",
        labelX: 715, labelY: 270
      },
      3: {
        name: "岩手県", yomi: "いわて", region: "tohoku",
        d: "M 710,295 L 765,290 L 760,355 L 705,355 Z",
        labelX: 735, labelY: 325
      },
      4: {
        name: "宮城県", yomi: "みやぎ", region: "tohoku",
        d: "M 705,355 L 760,355 L 745,410 L 695,405 Z",
        labelX: 725, labelY: 382
      },
      5: {
        name: "秋田県", yomi: "あきた", region: "tohoku",
        d: "M 675,275 L 700,295 L 710,295 L 705,355 L 665,345 L 660,300 Z",
        labelX: 682, labelY: 315
      },
      6: {
        name: "山形県", yomi: "やまがた", region: "tohoku",
        d: "M 665,345 L 705,355 L 695,405 L 650,395 Z",
        labelX: 678, labelY: 375
      },
      7: {
        name: "福島県", yomi: "ふくしま", region: "tohoku",
        d: "M 650,395 L 695,405 L 735,415 L 715,465 L 640,445 Z",
        labelX: 680, labelY: 432
      },
      8: {
        name: "茨城県", yomi: "いばらき", region: "kanto",
        d: "M 685,465 L 730,465 L 720,520 L 675,510 Z",
        labelX: 702, labelY: 492
      },
      9: {
        name: "栃木県", yomi: "とちぎ", region: "kanto",
        d: "M 640,445 L 685,465 L 675,510 L 630,490 Z",
        labelX: 658, labelY: 478
      },
      10: {
        name: "群馬県", yomi: "ぐんま", region: "kanto",
        d: "M 590,440 L 640,445 L 630,490 L 585,480 Z",
        labelX: 610, labelY: 465
      },
      11: {
        name: "埼玉県", yomi: "さいたま", region: "kanto",
        d: "M 585,480 L 630,490 L 675,510 L 660,535 L 590,520 Z",
        labelX: 625, labelY: 505
      },
      12: {
        name: "千葉県", yomi: "ちば", region: "kanto",
        d: "M 675,510 L 720,520 L 710,580 L 665,565 Z",
        labelX: 692, labelY: 545
      },
      13: {
        name: "東京都", yomi: "とうきょう", region: "kanto",
        d: "M 590,520 L 660,535 L 650,560 L 595,545 Z",
        labelX: 622, labelY: 540
      },
      14: {
        name: "神奈川県", yomi: "かながわ", region: "kanto",
        d: "M 595,545 L 650,560 L 640,590 L 585,575 Z",
        labelX: 615, labelY: 568
      },
      15: {
        name: "新潟県", yomi: "にいがた", region: "chubu",
        d: "M 575,385 L 650,395 L 640,445 L 590,440 L 555,420 Z",
        labelX: 602, labelY: 412
      },
      16: {
        name: "富山県", yomi: "とやま", region: "chubu",
        d: "M 515,400 L 555,420 L 545,450 L 505,435 Z",
        labelX: 530, labelY: 426
      },
      17: {
        name: "石川県", yomi: "いしかわ", region: "chubu",
        d: "M 480,370 L 515,400 L 505,435 L 470,420 Z",
        labelX: 492, labelY: 405
      },
      18: {
        name: "福井県", yomi: "ふくい", region: "chubu",
        d: "M 450,425 L 505,435 L 490,475 L 440,460 Z",
        labelX: 470, labelY: 450
      },
      19: {
        name: "山梨県", yomi: "やまなし", region: "chubu",
        d: "M 545,490 L 585,480 L 590,520 L 595,545 L 555,535 Z",
        labelX: 570, labelY: 512
      },
      20: {
        name: "長野県", yomi: "ながの", region: "chubu",
        d: "M 555,420 L 590,440 L 585,480 L 545,490 L 555,535 L 515,510 L 545,450 Z",
        labelX: 550, labelY: 472
      },
      21: {
        name: "岐阜県", yomi: "ぎふ", region: "chubu",
        d: "M 490,475 L 545,450 L 515,510 L 465,500 Z",
        labelX: 502, labelY: 485
      },
      22: {
        name: "静岡県", yomi: "しずおか", region: "chubu",
        d: "M 555,535 L 595,545 L 585,575 L 525,565 Z",
        labelX: 562, labelY: 555
      },
      23: {
        name: "愛知県", yomi: "あいち", region: "chubu",
        d: "M 465,500 L 515,510 L 525,565 L 475,555 Z",
        labelX: 495, labelY: 532
      },
      24: {
        name: "三重県", yomi: "みえ", region: "kinki",
        d: "M 435,515 L 475,555 L 450,620 L 415,595 Z",
        labelX: 442, labelY: 565
      },
      25: {
        name: "滋賀県", yomi: "しが", region: "kinki",
        d: "M 440,460 L 490,475 L 465,500 L 435,515 Z",
        labelX: 458, labelY: 488
      },
      26: {
        name: "京都府", yomi: "きょうと", region: "kinki",
        d: "M 395,450 L 440,460 L 435,515 L 390,505 Z",
        labelX: 415, labelY: 482
      },
      27: {
        name: "大阪府", yomi: "おおさか", region: "kinki",
        d: "M 390,505 L 435,515 L 415,555 L 375,545 Z",
        labelX: 402, labelY: 530
      },
      28: {
        name: "兵庫県", yomi: "ひょうご", region: "kinki",
        d: "M 340,445 L 395,450 L 390,505 L 375,545 L 330,520 Z",
        labelX: 362, labelY: 485
      },
      29: {
        name: "奈良県", yomi: "なら", region: "kinki",
        d: "M 415,555 L 435,515 L 440,580 L 400,575 Z",
        labelX: 422, labelY: 556
      },
      30: {
        name: "和歌山県", yomi: "わかやま", region: "kinki",
        d: "M 375,545 L 415,555 L 400,575 L 440,580 L 415,625 L 365,605 Z",
        labelX: 395, labelY: 592
      },
      31: {
        name: "鳥取県", yomi: "とっとり", region: "chugoku",
        d: "M 290,440 L 340,445 L 330,480 L 280,475 Z",
        labelX: 310, labelY: 460
      },
      32: {
        name: "島根県", yomi: "しまね", region: "chugoku",
        d: "M 220,440 L 290,440 L 280,475 L 210,470 Z",
        labelX: 250, labelY: 456
      },
      33: {
        name: "岡山県", yomi: "おかやま", region: "chugoku",
        d: "M 280,475 L 330,480 L 330,520 L 270,515 Z",
        labelX: 302, labelY: 498
      },
      34: {
        name: "広島県", yomi: "ひろしま", region: "chugoku",
        d: "M 210,470 L 280,475 L 270,515 L 195,510 Z",
        labelX: 238, labelY: 492
      },
      35: {
        name: "山口県", yomi: "やまぐち", region: "chugoku",
        d: "M 150,470 L 210,470 L 195,510 L 140,505 Z",
        labelX: 172, labelY: 488
      },
      36: {
        name: "徳島県", yomi: "とくしま", region: "shikoku",
        d: "M 305,565 L 350,575 L 335,620 L 290,610 Z",
        labelX: 320, labelY: 592
      },
      37: {
        name: "香川県", yomi: "かがわ", region: "shikoku",
        d: "M 295,535 L 345,545 L 350,575 L 305,565 Z",
        labelX: 322, labelY: 555
      },
      38: {
        name: "愛媛県", yomi: "えひめ", region: "shikoku",
        d: "M 220,550 L 295,535 L 305,565 L 290,610 L 235,600 Z",
        labelX: 262, labelY: 572
      },
      39: {
        name: "高知県", yomi: "こうち", region: "shikoku",
        d: "M 235,600 L 290,610 L 335,620 L 310,660 L 230,645 Z",
        labelX: 275, labelY: 628
      },
      40: {
        name: "福岡県", yomi: "ふくおか", region: "kyushu",
        d: "M 115,515 L 165,515 L 175,560 L 125,555 Z",
        labelX: 145, labelY: 535
      },
      41: {
        name: "佐賀県", yomi: "さが", region: "kyushu",
        d: "M 75,525 L 115,515 L 125,555 L 85,560 Z",
        labelX: 100, labelY: 538
      },
      42: {
        name: "長崎県", yomi: "ながさき", region: "kyushu",
        d: "M 35,535 L 75,525 L 85,560 L 45,575 Z",
        labelX: 60, labelY: 548
      },
      43: {
        name: "熊本県", yomi: "くまもと", region: "kyushu",
        d: "M 85,560 L 125,555 L 175,560 L 140,625 L 80,615 Z",
        labelX: 118, labelY: 585
      },
      44: {
        name: "大分県", yomi: "おおいた", region: "kyushu",
        d: "M 175,560 L 220,565 L 210,615 L 165,610 Z",
        labelX: 192, labelY: 588
      },
      45: {
        name: "宮崎県", yomi: "みやざき", region: "kyushu",
        d: "M 165,610 L 210,615 L 195,675 L 140,665 Z",
        labelX: 178, labelY: 642
      },
      46: {
        name: "鹿児島県", yomi: "かごしま", region: "kyushu",
        d: "M 80,615 L 140,625 L 140,665 L 195,675 L 160,730 L 85,710 Z",
        labelX: 130, labelY: 672
      },
      47: {
        name: "沖縄県", yomi: "おきなわ", region: "kyushu",
        d: "M 40,730 L 140,730 L 130,775 L 30,775 Z",
        labelX: 85, labelY: 752
      }
    };

    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 920 800');
    svg.setAttribute('class', 'japan-map-svg real-map');

    // 地方ごとの色定義（明るく美しいパステルカラー）
    const regionColors = {
      hokkaido: '#60A5FA', // 青
      tohoku: '#34D399',   // エメラルド
      kanto: '#FBBF24',    // アンバー
      chubu: '#F472B6',    // ピンク
      kinki: '#A78BFA',    // パープル
      chugoku: '#F97316',  // オレンジ
      shikoku: '#10B981',  // グリーン
      kyushu: '#EC4899'   // ローズ
    };

    // 沖縄の枠線（インセット表示用）
    const okinawaBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    okinawaBox.setAttribute('x', '25');
    okinawaBox.setAttribute('y', '715');
    okinawaBox.setAttribute('width', '130');
    okinawaBox.setAttribute('height', '70');
    okinawaBox.setAttribute('rx', '10');
    okinawaBox.setAttribute('fill', 'none');
    okinawaBox.setAttribute('stroke', '#94A3B8');
    okinawaBox.setAttribute('stroke-width', '2');
    okinawaBox.setAttribute('stroke-dasharray', '4,4');
    svg.appendChild(okinawaBox);

    const okinawaTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    okinawaTitle.setAttribute('x', '90');
    okinawaTitle.setAttribute('y', '726');
    okinawaTitle.setAttribute('text-anchor', 'middle');
    okinawaTitle.setAttribute('font-size', '10');
    okinawaTitle.setAttribute('fill', '#64748B');
    okinawaTitle.textContent = 'おきなわけん';
    svg.appendChild(okinawaTitle);

    // 47都道府県の描画
    Object.keys(this.prefectureData).forEach(idStr => {
      const id = parseInt(idStr, 10);
      const pref = this.prefectureData[id];
      const isSelected = this.selectedPrefectures.has(id);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `pref-group pref-${id} ${isSelected ? 'selected' : ''}`);
      g.setAttribute('data-id', id);

      // リアルなシェイプパス
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pref.d);
      path.setAttribute('class', 'pref-path');
      path.setAttribute('fill', isSelected ? '#2563EB' : (regionColors[pref.region] || '#CBD5E1'));
      path.setAttribute('stroke', isSelected ? '#FFD700' : '#FFFFFF');
      path.setAttribute('stroke-width', isSelected ? '3.5' : '2');
      path.setAttribute('stroke-linejoin', 'round');

      // ひらがなラベル（1年生向け）
      const textHira = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textHira.setAttribute('x', pref.labelX);
      textHira.setAttribute('y', pref.labelY - 3);
      textHira.setAttribute('text-anchor', 'middle');
      textHira.setAttribute('class', 'pref-text-hira');
      textHira.setAttribute('fill', isSelected ? '#FFFFFF' : '#0F172A');
      textHira.textContent = pref.yomi;

      // 漢字ラベル
      const textKanji = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textKanji.setAttribute('x', pref.labelX);
      textKanji.setAttribute('y', pref.labelY + 9);
      textKanji.setAttribute('text-anchor', 'middle');
      textKanji.setAttribute('class', 'pref-text-kanji');
      textKanji.setAttribute('fill', isSelected ? '#FEF08A' : '#334155');
      textKanji.textContent = pref.name;

      g.appendChild(path);
      g.appendChild(textHira);
      g.appendChild(textKanji);

      // タップ/クリックイベント
      g.addEventListener('click', () => {
        if (!this.isInteractive) return;
        if (window.audioManager) window.audioManager.playClick();
        this.toggleSelection(id);
      });

      svg.appendChild(g);
    });

    this.container.appendChild(svg);
  }

  toggleSelection(id) {
    if (this.selectedPrefectures.has(id)) {
      this.selectedPrefectures.delete(id);
    } else {
      this.selectedPrefectures.add(id);
    }
    this.updateVisuals();
    this.onSelectionChange(Array.from(this.selectedPrefectures));
  }

  clearSelection() {
    this.selectedPrefectures.clear();
    this.updateVisuals();
    this.onSelectionChange([]);
  }

  setSelection(ids) {
    this.selectedPrefectures = new Set(ids);
    this.updateVisuals();
  }

  getSelectedPrefectures() {
    return Array.from(this.selectedPrefectures);
  }

  setInteractive(interactive) {
    this.isInteractive = interactive;
  }

  updateVisuals() {
    const regionColors = {
      hokkaido: '#60A5FA', tohoku: '#34D399', kanto: '#FBBF24',
      chubu: '#F472B6', kinki: '#A78BFA', chugoku: '#F97316',
      shikoku: '#10B981', kyushu: '#EC4899'
    };

    Object.keys(this.prefectureData).forEach(idStr => {
      const id = parseInt(idStr, 10);
      const group = this.container.querySelector(`.pref-${id}`);
      if (!group) return;

      const isSelected = this.selectedPrefectures.has(id);
      const path = group.querySelector('path');
      const textHira = group.querySelector('.pref-text-hira');
      const textKanji = group.querySelector('.pref-text-kanji');

      if (isSelected) {
        group.classList.add('selected');
        path.setAttribute('fill', '#2563EB');
        path.setAttribute('stroke', '#FFD700');
        path.setAttribute('stroke-width', '3.5');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FEF08A');
      } else {
        group.classList.remove('selected', 'correct', 'missed', 'wrong');

        const region = this.prefectureData[id].region;
        path.setAttribute('fill', regionColors[region] || '#CBD5E1');
        path.setAttribute('stroke', '#FFFFFF');
        path.setAttribute('stroke-width', '2');
        textHira.setAttribute('fill', '#0F172A');
        textKanji.setAttribute('fill', '#334155');
      }
    });
  }

  // クイズ回答後のハイライト表示
  showAnswerFeedback(correctPrefIds) {
    const userSelected = this.getSelectedPrefectures();
    const correctSet = new Set(correctPrefIds);
    const userSet = new Set(userSelected);

    Object.keys(this.prefectureData).forEach(idStr => {
      const id = parseInt(idStr, 10);
      const group = this.container.querySelector(`.pref-${id}`);
      if (!group) return;

      const path = group.querySelector('path');
      const textHira = group.querySelector('.pref-text-hira');
      const textKanji = group.querySelector('.pref-text-kanji');

      const isCorrectAnswer = correctSet.has(id);
      const isUserSelected = userSet.has(id);

      if (isCorrectAnswer && isUserSelected) {
        // ピッタリ正解 (緑/ゴールド)
        group.classList.add('correct');
        path.setAttribute('fill', '#10B981');
        path.setAttribute('stroke', '#F59E0B');
        path.setAttribute('stroke-width', '4');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FEF08A');
      } else if (isCorrectAnswer && !isUserSelected) {
        // 選べていなかった正解 (オレンジ・点滅)
        group.classList.add('missed');
        path.setAttribute('fill', '#F59E0B');
        path.setAttribute('stroke', '#DC2626');
        path.setAttribute('stroke-width', '4');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FFFFFF');
      } else if (!isCorrectAnswer && isUserSelected) {
        // 誤って選んだ都道府県 (赤)
        group.classList.add('wrong');
        path.setAttribute('fill', '#EF4444');
        path.setAttribute('stroke', '#7F1D1D');
        path.setAttribute('stroke-width', '3.5');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FECACA');
      }
    });
  }
}

window.JapanMap = JapanMap;
