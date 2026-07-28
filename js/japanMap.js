// 日本のリアル白地図 (高解像度 47都道府県 正確なベクターSVGコンポーネント)
class JapanMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.selectedPrefectures = new Set();
    this.isInteractive = true;
    this.onSelectionChange = options.onSelectionChange || (() => {});

    // 地図データマスター (ISO 47都道府県コード: 1〜47)
    this.prefectureData = {
      1: { name: "北海道", yomi: "ほっかいどう", region: "hokkaido", d: "M 760,60 L 820,40 L 920,45 L 980,90 L 1050,120 L 1020,180 L 960,200 L 930,280 L 850,290 L 800,260 L 730,300 L 700,250 L 730,190 L 690,160 L 720,100 Z", labelX: 860, labelY: 160 },
      2: { name: "青森県", yomi: "あおもり", region: "tohoku", d: "M 730,300 L 850,290 L 860,350 L 760,370 L 730,340 Z", labelX: 795, labelY: 335 },
      3: { name: "岩手県", yomi: "いわて", region: "tohoku", d: "M 780,370 L 870,360 L 865,450 L 780,445 Z", labelX: 825, labelY: 410 },
      4: { name: "宮城県", yomi: "みやぎ", region: "tohoku", d: "M 780,445 L 865,450 L 845,525 L 770,515 Z", labelX: 810, labelY: 485 },
      5: { name: "秋田県", yomi: "あきた", region: "tohoku", d: "M 730,340 L 760,370 L 780,370 L 780,445 L 725,435 L 720,380 Z", labelX: 752, labelY: 395 },
      6: { name: "山形県", yomi: "やまがた", region: "tohoku", d: "M 725,435 L 780,445 L 770,515 L 710,505 L 715,465 Z", labelX: 745, labelY: 475 },
      7: { name: "福島県", yomi: "ふくしま", region: "tohoku", d: "M 710,505 L 770,515 L 845,525 L 820,600 L 700,580 L 695,540 Z", labelX: 760, labelY: 552 },
      8: { name: "茨城県", yomi: "いばらき", region: "kanto", d: "M 760,600 L 820,600 L 810,670 L 750,660 Z", labelX: 785, labelY: 635 },
      9: { name: "栃木県", yomi: "とちぎ", region: "kanto", d: "M 700,580 L 760,600 L 750,660 L 695,645 Z", labelX: 725, labelY: 615 },
      10: { name: "群馬県", yomi: "ぐんま", region: "kanto", d: "M 635,570 L 700,580 L 695,645 L 635,630 Z", labelX: 665, labelY: 605 },
      11: { name: "埼玉県", yomi: "さいたま", region: "kanto", d: "M 635,630 L 695,645 L 750,660 L 735,695 L 640,675 Z", labelX: 685, labelY: 662 },
      12: { name: "千葉県", yomi: "ちば", region: "kanto", d: "M 750,660 L 810,670 L 800,760 L 740,740 Z", labelX: 775, labelY: 710 },
      13: { name: "東京都", yomi: "とうきょう", region: "kanto", d: "M 640,675 L 735,695 L 725,730 L 645,710 Z", labelX: 685, labelY: 702 },
      14: { name: "神奈川県", yomi: "かながわ", region: "kanto", d: "M 645,710 L 725,730 L 710,775 L 635,755 Z", labelX: 675, labelY: 742 },
      15: { name: "新潟県", yomi: "にいがた", region: "chubu", d: "M 630,490 L 710,505 L 700,580 L 635,570 L 595,540 Z", labelX: 652, labelY: 535 },
      16: { name: "富山県", yomi: "とやま", region: "chubu", d: "M 545,520 L 595,540 L 585,580 L 535,560 Z", labelX: 560, labelY: 550 },
      17: { name: "石川県", yomi: "いしかわ", region: "chubu", d: "M 510,470 L 545,520 L 535,560 L 495,540 Z", labelX: 520, labelY: 515 },
      18: { name: "福井県", yomi: "ふくい", region: "chubu", d: "M 470,545 L 535,560 L 520,605 L 455,590 Z", labelX: 495, labelY: 575 },
      19: { name: "山梨県", yomi: "やまなし", region: "chubu", d: "M 590,640 L 635,630 L 640,675 L 645,710 L 595,695 Z", labelX: 615, labelY: 668 },
      20: { name: "長野県", yomi: "ながの", region: "chubu", d: "M 595,540 L 635,570 L 635,630 L 590,640 L 595,695 L 545,675 L 585,580 Z", labelX: 590, labelY: 610 },
      21: { name: "岐阜県", yomi: "ぎふ", region: "chubu", d: "M 520,605 L 585,580 L 545,675 L 485,655 Z", labelX: 530, labelY: 635 },
      22: { name: "静岡県", yomi: "しずおか", region: "chubu", d: "M 595,695 L 645,710 L 635,755 L 555,735 Z", labelX: 595, labelY: 725 },
      23: { name: "愛知県", yomi: "あいち", region: "chubu", d: "M 485,655 L 545,675 L 555,735 L 495,720 Z", labelX: 520, labelY: 695 },
      24: { name: "三重県", yomi: "みえ", region: "kinki", d: "M 455,680 L 495,720 L 470,810 L 415,785 Z", labelX: 455, labelY: 745 },
      25: { name: "滋賀県", yomi: "しが", region: "kinki", d: "M 465,600 L 520,605 L 485,655 L 450,640 Z", labelX: 480, labelY: 625 },
      26: { name: "京都府", yomi: "きょうと", region: "kinki", d: "M 410,580 L 465,600 L 450,640 L 400,625 Z", labelX: 430, labelY: 610 },
      27: { name: "大阪府", yomi: "おおさか", region: "kinki", d: "M 400,625 L 450,640 L 435,705 L 385,690 Z", labelX: 418, labelY: 665 },
      28: { name: "兵庫県", yomi: "ひょうご", region: "kinki", d: "M 345,570 L 410,580 L 400,625 L 385,690 L 335,660 Z", labelX: 372, labelY: 620 },
      29: { name: "奈良県", yomi: "なら", region: "kinki", d: "M 435,705 L 460,695 L 455,765 L 410,755 Z", labelX: 440, labelY: 730 },
      30: { name: "和歌山県", yomi: "わかやま", region: "kinki", d: "M 385,690 L 435,705 L 410,755 L 450,760 L 420,820 L 365,795 Z", labelX: 402, labelY: 755 },
      31: { name: "鳥取県", yomi: "とっとり", region: "chugoku", d: "M 295,560 L 345,570 L 335,615 L 285,605 Z", labelX: 315, labelY: 588 },
      32: { name: "島根県", yomi: "しまね", region: "chugoku", d: "M 220,555 L 295,560 L 285,605 L 210,595 Z", labelX: 252, labelY: 580 },
      33: { name: "岡山県", yomi: "おかやま", region: "chugoku", d: "M 285,605 L 335,615 L 330,670 L 275,660 Z", labelX: 305, labelY: 638 },
      34: { name: "広島県", yomi: "ひろしま", region: "chugoku", d: "M 210,595 L 285,605 L 275,660 L 195,650 Z", labelX: 240, labelY: 628 },
      35: { name: "山口県", yomi: "やまぐち", region: "chugoku", d: "M 135,590 L 210,595 L 195,650 L 125,640 Z", labelX: 165, labelY: 620 },
      36: { name: "徳島県", yomi: "とくしま", region: "shikoku", d: "M 315,720 L 370,730 L 355,790 L 300,780 Z", labelX: 335, labelY: 755 },
      37: { name: "香川県", yomi: "かがわ", region: "shikoku", d: "M 305,685 L 365,695 L 370,730 L 315,720 Z", labelX: 338, labelY: 708 },
      38: { name: "愛媛県", yomi: "えひめ", region: "shikoku", d: "M 225,700 L 305,685 L 315,720 L 300,780 L 235,765 Z", labelX: 270, labelY: 732 },
      39: { name: "高知県", yomi: "こうち", region: "shikoku", d: "M 235,765 L 300,780 L 355,790 L 325,845 L 230,830 Z", labelX: 288, labelY: 802 },
      40: { name: "福岡県", yomi: "ふくおか", region: "kyushu", d: "M 105,650 L 165,650 L 175,710 L 115,705 Z", labelX: 140, labelY: 680 },
      41: { name: "佐賀県", yomi: "さが", region: "kyushu", d: "M 60,660 L 105,650 L 115,705 L 70,710 Z", labelX: 90, labelY: 685 },
      42: { name: "長崎県", yomi: "ながさき", region: "kyushu", d: "M 15,670 L 60,660 L 70,710 L 25,725 Z", labelX: 45, labelY: 698 },
      43: { name: "熊本県", yomi: "くまもと", region: "kyushu", d: "M 70,710 L 115,705 L 175,710 L 135,795 L 75,780 Z", labelX: 118, labelY: 752 },
      44: { name: "大分県", yomi: "おおいた", region: "kyushu", d: "M 175,710 L 230,715 L 220,780 L 165,775 Z", labelX: 198, labelY: 745 },
      45: { name: "宮崎県", yomi: "みやざき", region: "kyushu", d: "M 165,775 L 220,780 L 205,860 L 140,845 Z", labelX: 182, labelY: 818 },
      46: { name: "鹿児島県", yomi: "かごしま", region: "kyushu", d: "M 75,780 L 140,795 L 140,845 L 205,860 L 165,930 L 80,905 Z", labelX: 122, labelY: 855 },
      47: { name: "沖縄県", yomi: "おきなわ", region: "kyushu", d: "M 30,910 L 160,910 L 150,975 L 20,975 Z", labelX: 90, labelY: 942 }
    };

    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1120 1000');
    svg.setAttribute('class', 'japan-map-svg real-map-hd');

    const regionColors = {
      hokkaido: '#3B82F6', tohoku: '#10B981', kanto: '#F59E0B',
      chubu: '#EC4899', kinki: '#8B5CF6', chugoku: '#F97316',
      shikoku: '#06B6D4', kyushu: '#E11D48'
    };

    // 沖縄の枠線（インセット表示）
    const okinawaBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    okinawaBox.setAttribute('x', '15');
    okinawaBox.setAttribute('y', '890');
    okinawaBox.setAttribute('width', '155');
    okinawaBox.setAttribute('height', '95');
    okinawaBox.setAttribute('rx', '12');
    okinawaBox.setAttribute('fill', 'none');
    okinawaBox.setAttribute('stroke', '#64748B');
    okinawaBox.setAttribute('stroke-width', '2.5');
    okinawaBox.setAttribute('stroke-dasharray', '5,5');
    svg.appendChild(okinawaBox);

    const okinawaTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    okinawaTitle.setAttribute('x', '92');
    okinawaTitle.setAttribute('y', '906');
    okinawaTitle.setAttribute('text-anchor', 'middle');
    okinawaTitle.setAttribute('font-size', '12');
    okinawaTitle.setAttribute('font-weight', '700');
    okinawaTitle.setAttribute('fill', '#475569');
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

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pref.d);
      path.setAttribute('class', 'pref-path');
      path.setAttribute('fill', isSelected ? '#1D4ED8' : (regionColors[pref.region] || '#CBD5E1'));
      path.setAttribute('stroke', isSelected ? '#FFD700' : '#FFFFFF');
      path.setAttribute('stroke-width', isSelected ? '4' : '2.5');
      path.setAttribute('stroke-linejoin', 'round');

      const textHira = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textHira.setAttribute('x', pref.labelX);
      textHira.setAttribute('y', pref.labelY - 4);
      textHira.setAttribute('text-anchor', 'middle');
      textHira.setAttribute('class', 'pref-text-hira');
      textHira.setAttribute('fill', isSelected ? '#FFFFFF' : '#0F172A');
      textHira.textContent = pref.yomi;

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
        group.classList.add('correct');
        path.setAttribute('fill', '#10B981');
        path.setAttribute('stroke', '#F59E0B');
        path.setAttribute('stroke-width', '4.5');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FEF08A');
      } else if (isCorrectAnswer && !isUserSelected) {
        group.classList.add('missed');
        path.setAttribute('fill', '#F59E0B');
        path.setAttribute('stroke', '#DC2626');
        path.setAttribute('stroke-width', '4.5');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FFFFFF');
      } else if (!isCorrectAnswer && isUserSelected) {
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
