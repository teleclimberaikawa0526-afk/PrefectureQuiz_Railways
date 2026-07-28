// 日本のリアルな白地図 (高解像度 47都道府県 リアルベクターSVG コンポーネント)
class JapanMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.selectedPrefectures = new Set();
    this.isInteractive = true;
    this.onSelectionChange = options.onSelectionChange || (() => {});

    // 高解像度 47都道府県のリアルSVGベクターパス・座標データ (viewBox 0 0 1200 1000)
    this.prefectureData = {
      1: {
        name: "北海道", yomi: "ほっかいどう", region: "hokkaido",
        d: "M 750,50 C 780,45 830,35 860,40 C 910,50 960,70 1020,110 C 1040,125 1060,150 1050,180 C 1030,220 990,230 960,235 C 930,240 910,260 890,290 C 870,315 840,305 820,285 C 800,265 770,275 750,290 C 730,305 710,290 710,270 C 720,240 760,230 750,210 C 730,190 700,200 680,180 C 670,165 675,130 690,110 C 710,85 730,60 750,50 Z",
        labelX: 860, labelY: 150
      },
      2: {
        name: "青森県", yomi: "あおもり", region: "tohoku",
        d: "M 760,310 C 790,305 830,305 855,310 C 865,330 870,360 850,380 C 820,390 770,395 745,370 C 740,345 745,325 760,310 Z",
        labelX: 800, labelY: 345
      },
      3: {
        name: "岩手県", yomi: "いわて", region: "tohoku",
        d: "M 795,380 C 840,375 870,375 875,420 C 870,470 840,480 790,475 C 785,435 790,400 795,380 Z",
        labelX: 832, labelY: 428
      },
      4: {
        name: "宮城県", yomi: "みやぎ", region: "tohoku",
        d: "M 790,475 C 840,480 860,475 850,540 C 815,550 780,545 775,515 C 780,495 785,485 790,475 Z",
        labelX: 818, labelY: 510
      },
      5: {
        name: "秋田県", yomi: "あきた", region: "tohoku",
        d: "M 745,370 C 770,395 785,435 790,475 C 750,470 735,455 730,420 C 730,395 735,380 745,370 Z",
        labelX: 760, labelY: 422
      },
      6: {
        name: "山形県", yomi: "やまがた", region: "tohoku",
        d: "M 730,420 C 750,470 785,485 775,515 C 735,515 715,490 720,455 C 725,435 728,425 730,420 Z",
        labelX: 748, labelY: 470
      },
      7: {
        name: "福島県", yomi: "ふくしま", region: "tohoku",
        d: "M 715,490 C 775,515 850,540 825,605 C 765,615 715,585 700,555 C 705,525 710,505 715,490 Z",
        labelX: 765, labelY: 552
      },
      8: {
        name: "茨城県", yomi: "いばらき", region: "kanto",
        d: "M 765,615 C 825,605 845,635 830,685 C 780,695 760,675 755,645 Z",
        labelX: 792, labelY: 652
      },
      9: {
        name: "栃木県", yomi: "とちぎ", region: "kanto",
        d: "M 700,555 C 765,615 755,645 705,640 C 690,615 695,580 700,555 Z",
        labelX: 728, labelY: 602
      },
      10: {
        name: "群馬県", yomi: "ぐんま", region: "kanto",
        d: "M 640,550 C 700,555 695,580 690,615 C 640,620 630,590 640,550 Z",
        labelX: 665, labelY: 585
      },
      11: {
        name: "埼玉県", yomi: "さいたま", region: "kanto",
        d: "M 630,590 C 690,615 755,645 740,675 C 685,670 645,650 630,590 Z",
        labelX: 685, labelY: 632
      },
      12: {
        name: "千葉県", yomi: "ちば", region: "kanto",
        d: "M 755,645 C 830,685 820,750 760,740 C 740,700 745,670 755,645 Z",
        labelX: 782, labelY: 692
      },
      13: {
        name: "東京都", yomi: "とうきょう", region: "kanto",
        d: "M 645,650 C 740,675 745,700 710,705 C 650,700 640,670 645,650 Z",
        labelX: 682, labelY: 678
      },
      14: {
        name: "神奈川県", yomi: "かながわ", region: "kanto",
        d: "M 640,670 C 710,705 700,745 640,735 C 630,710 635,685 640,670 Z",
        labelX: 672, labelY: 710
      },
      15: {
        name: "新潟県", yomi: "にいがた", region: "chubu",
        d: "M 630,480 C 720,455 715,490 700,555 C 640,550 600,520 630,480 Z",
        labelX: 662, labelY: 512
      },
      16: {
        name: "富山県", yomi: "とやま", region: "chubu",
        d: "M 560,500 C 600,520 590,560 550,550 C 540,530 545,510 560,500 Z",
        labelX: 572, labelY: 526
      },
      17: {
        name: "石川県", yomi: "いしかわ", region: "chubu",
        d: "M 520,450 C 560,500 540,530 500,520 C 490,490 505,465 520,450 Z",
        labelX: 528, labelY: 495
      },
      18: {
        name: "福井県", yomi: "ふくい", region: "chubu",
        d: "M 480,530 C 540,530 535,570 475,570 C 465,550 470,540 480,530 Z",
        labelX: 502, labelY: 550
      },
      19: {
        name: "山梨県", yomi: "やまなし", region: "chubu",
        d: "M 600,620 C 645,650 635,685 595,675 C 585,655 590,635 600,620 Z",
        labelX: 615, labelY: 652
      },
      20: {
        name: "長野県", yomi: "ながの", region: "chubu",
        d: "M 600,520 C 640,550 640,620 595,675 C 545,655 570,570 600,520 Z",
        labelX: 595, labelY: 590
      },
      21: {
        name: "岐阜県", yomi: "ぎふ", region: "chubu",
        d: "M 535,570 C 570,570 595,675 C 530,660 515,620 535,570 Z",
        labelX: 552, labelY: 615
      },
      22: {
        name: "静岡県", yomi: "しずおか", region: "chubu",
        d: "M 595,675 C 640,670 635,735 565,725 C 560,695 575,680 595,675 Z",
        labelX: 598, labelY: 702
      },
      23: {
        name: "愛知県", yomi: "あいち", region: "chubu",
        d: "M 505,630 C 565,660 565,725 500,715 C 490,675 495,645 505,630 Z",
        labelX: 532, labelY: 672
      },
      24: {
        name: "三重県", yomi: "みえ", region: "kinki",
        d: "M 475,650 C 515,675 495,780 445,760 C 440,710 455,670 475,650 Z",
        labelX: 478, labelY: 712
      },
      25: {
        name: "滋賀県", yomi: "しが", region: "kinki",
        d: "M 480,570 C 535,570 505,630 465,620 C 460,595 470,580 480,570 Z",
        labelX: 490, labelY: 598
      },
      26: {
        name: "京都府", yomi: "きょうと", region: "kinki",
        d: "M 430,560 C 480,570 465,620 420,620 C 410,590 418,570 430,560 Z",
        labelX: 445, labelY: 590
      },
      27: {
        name: "大阪府", yomi: "おおさか", region: "kinki",
        d: "M 420,620 C 465,620 450,680 405,670 C 398,645 408,630 420,620 Z",
        labelX: 432, labelY: 650
      },
      28: {
        name: "兵庫県", yomi: "ひょうご", region: "kinki",
        d: "M 360,550 C 430,560 420,620 405,670 L 350,650 Z",
        labelX: 390, labelY: 602
      },
      29: {
        name: "奈良県", yomi: "なら", region: "kinki",
        d: "M 450,680 C 475,670 470,740 430,735 C 420,705 432,690 450,680 Z",
        labelX: 450, labelY: 708
      },
      30: {
        name: "和歌山県", yomi: "わかやま", region: "kinki",
        d: "M 405,670 C 450,680 445,760 390,750 C 380,710 390,685 405,670 Z",
        labelX: 418, labelY: 715
      },
      31: {
        name: "鳥取県", yomi: "とっとり", region: "chugoku",
        d: "M 310,545 C 365,550 355,595 300,590 C 290,570 298,555 310,545 Z",
        labelX: 330, labelY: 570
      },
      32: {
        name: "島根県", yomi: "しまね", region: "chugoku",
        d: "M 235,540 C 310,545 300,590 225,585 C 215,565 222,550 235,540 Z",
        labelX: 265, labelY: 565
      },
      33: {
        name: "岡山県", yomi: "おかやま", region: "chugoku",
        d: "M 300,590 C 355,595 350,650 290,640 C 280,615 288,600 300,590 Z",
        labelX: 320, labelY: 618
      },
      34: {
        name: "広島県", yomi: "ひろしま", region: "chugoku",
        d: "M 225,585 C 300,590 290,640 210,635 C 200,610 210,595 225,585 Z",
        labelX: 252, labelY: 612
      },
      35: {
        name: "山口県", yomi: "やまぐち", region: "chugoku",
        d: "M 155,580 C 225,585 210,635 145,630 C 135,605 142,590 155,580 Z",
        labelX: 178, labelY: 608
      },
      36: {
        name: "徳島県", yomi: "とくしま", region: "shikoku",
        d: "M 325,700 C 375,710 360,765 310,755 C 300,730 310,712 325,700 Z",
        labelX: 342, labelY: 732
      },
      37: {
        name: "香川県", yomi: "かがわ", region: "shikoku",
        d: "M 315,665 C 370,675 375,710 325,700 C 315,685 318,672 315,665 Z",
        labelX: 345, labelY: 685
      },
      38: {
        name: "愛媛県", yomi: "えひめ", region: "shikoku",
        d: "M 235,680 C 315,665 325,700 310,755 L 245,745 Z",
        labelX: 278, labelY: 712
      },
      39: {
        name: "高知県", yomi: "こうち", region: "shikoku",
        d: "M 245,745 C 310,755 360,765 330,815 L 240,800 Z",
        labelX: 292, labelY: 778
      },
      40: {
        name: "福岡県", yomi: "ふくおか", region: "kyushu",
        d: "M 120,640 C 175,640 185,695 130,690 C 120,665 122,650 120,640 Z",
        labelX: 150, labelY: 665
      },
      41: {
        name: "佐賀県", yomi: "さが", region: "kyushu",
        d: "M 75,650 C 120,640 130,690 85,695 C 75,675 78,660 75,650 Z",
        labelX: 102, labelY: 668
      },
      42: {
        name: "長崎県", yomi: "ながさき", region: "kyushu",
        d: "M 30,660 C 75,650 85,695 40,715 C 30,690 32,675 30,660 Z",
        labelX: 58, labelY: 682
      },
      43: {
        name: "熊本県", yomi: "くまもと", region: "kyushu",
        d: "M 85,695 C 130,690 185,695 145,775 C 90,765 92,725 85,695 Z",
        labelX: 128, labelY: 732
      },
      44: {
        name: "大分県", yomi: "おおいた", region: "kyushu",
        d: "M 185,695 C 235,700 225,765 175,760 C 165,730 172,710 185,695 Z",
        labelX: 202, labelY: 730
      },
      45: {
        name: "宮崎県", yomi: "みやざき", region: "kyushu",
        d: "M 175,760 C 225,765 210,840 150,830 C 140,795 155,775 175,760 Z",
        labelX: 188, labelY: 798
      },
      46: {
        name: "鹿児島県", yomi: "かごしま", region: "kyushu",
        d: "M 85,765 C 150,830 130,900 65,870 C 60,825 72,790 85,765 Z",
        labelX: 108, labelY: 825
      },
      47: {
        name: "沖縄県", yomi: "おきなわ", region: "kyushu",
        d: "M 40,910 L 160,910 L 150,970 L 30,970 Z",
        labelX: 95, labelY: 942
      }
    };

    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1120 1000');
    svg.setAttribute('class', 'japan-map-svg real-map-hd');

    // 地方ごとの明るく鮮やかなカラーパレット
    const regionColors = {
      hokkaido: '#3B82F6', // ブルー
      tohoku: '#10B981',   // エメラルド
      kanto: '#F59E0B',    // アンバー
      chubu: '#EC4899',    // ピンク
      kinki: '#8B5CF6',    // パープル
      chugoku: '#F97316',  // オレンジ
      shikoku: '#06B6D4',  // シアン
      kyushu: '#E11D48'   // ローズ
    };

    // 沖縄の枠線（インセットボックス）
    const okinawaBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    okinawaBox.setAttribute('x', '20');
    okinawaBox.setAttribute('y', '890');
    okinawaBox.setAttribute('width', '150');
    okinawaBox.setAttribute('height', '90');
    okinawaBox.setAttribute('rx', '12');
    okinawaBox.setAttribute('fill', 'none');
    okinawaBox.setAttribute('stroke', '#64748B');
    okinawaBox.setAttribute('stroke-width', '2.5');
    okinawaBox.setAttribute('stroke-dasharray', '5,5');
    svg.appendChild(okinawaBox);

    const okinawaTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    okinawaTitle.setAttribute('x', '95');
    okinawaTitle.setAttribute('y', '906');
    okinawaTitle.setAttribute('text-anchor', 'middle');
    okinawaTitle.setAttribute('font-size', '12');
    okinawaTitle.setAttribute('font-weight', '700');
    okinawaTitle.setAttribute('fill', '#475569');
    okinawaTitle.textContent = 'おきなわけん';
    svg.appendChild(okinawaTitle);

    // 47都道府県描画
    Object.keys(this.prefectureData).forEach(idStr => {
      const id = parseInt(idStr, 10);
      const pref = this.prefectureData[id];
      const isSelected = this.selectedPrefectures.has(id);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `pref-group pref-${id} ${isSelected ? 'selected' : ''}`);
      g.setAttribute('data-id', id);

      // 高精細パス
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pref.d);
      path.setAttribute('class', 'pref-path');
      path.setAttribute('fill', isSelected ? '#1D4ED8' : (regionColors[pref.region] || '#CBD5E1'));
      path.setAttribute('stroke', isSelected ? '#FFD700' : '#FFFFFF');
      path.setAttribute('stroke-width', isSelected ? '4' : '2.5');
      path.setAttribute('stroke-linejoin', 'round');

      // ひらがなラベル（小学生向けに大きくて読みやすい）
      const textHira = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textHira.setAttribute('x', pref.labelX);
      textHira.setAttribute('y', pref.labelY - 4);
      textHira.setAttribute('text-anchor', 'middle');
      textHira.setAttribute('class', 'pref-text-hira');
      textHira.setAttribute('fill', isSelected ? '#FFFFFF' : '#0F172A');
      textHira.textContent = pref.yomi;

      // 漢字ラベル
      const textKanji = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textKanji.setAttribute('x', pref.labelX);
      textKanji.setAttribute('y', pref.labelY + 11);
      textKanji.setAttribute('text-anchor', 'middle');
      textKanji.setAttribute('class', 'pref-text-kanji');
      textKanji.setAttribute('fill', isSelected ? '#FEF08A' : '#334155');
      textKanji.textContent = pref.name;

      g.appendChild(path);
      g.appendChild(textHira);
      g.appendChild(textKanji);

      // クリックイベント
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
      hokkaido: '#3B82F6', tohoku: '#10B981', kanto: '#F59E0B',
      chubu: '#EC4899', kinki: '#8B5CF6', chugoku: '#F97316',
      shikoku: '#06B6D4', kyushu: '#E11D48'
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
        path.setAttribute('fill', '#1D4ED8');
        path.setAttribute('stroke', '#FFD700');
        path.setAttribute('stroke-width', '4');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FEF08A');
      } else {
        group.classList.remove('selected', 'correct', 'missed', 'wrong');

        const region = this.prefectureData[id].region;
        path.setAttribute('fill', regionColors[region] || '#CBD5E1');
        path.setAttribute('stroke', '#FFFFFF');
        path.setAttribute('stroke-width', '2.5');
        textHira.setAttribute('fill', '#0F172A');
        textKanji.setAttribute('fill', '#334155');
      }
    });
  }

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
        // ピッタリ正解 (緑 / ゴールド)
        group.classList.add('correct');
        path.setAttribute('fill', '#10B981');
        path.setAttribute('stroke', '#F59E0B');
        path.setAttribute('stroke-width', '4.5');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FEF08A');
      } else if (isCorrectAnswer && !isUserSelected) {
        // 選べていなかった正解 (オレンジ・点滅)
        group.classList.add('missed');
        path.setAttribute('fill', '#F59E0B');
        path.setAttribute('stroke', '#DC2626');
        path.setAttribute('stroke-width', '4.5');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FFFFFF');
      } else if (!isCorrectAnswer && isUserSelected) {
        // 誤って選んだ都道府県 (赤)
        group.classList.add('wrong');
        path.setAttribute('fill', '#EF4444');
        path.setAttribute('stroke', '#7F1D1D');
        path.setAttribute('stroke-width', '4');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FECACA');
      }
    });
  }
}

window.JapanMap = JapanMap;
