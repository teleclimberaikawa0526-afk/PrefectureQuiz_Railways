// 日本地図SVGコンポーネント (47都道府県のインタラクティブビジュアル選択)
class JapanMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.selectedPrefectures = new Set();
    this.isInteractive = true;
    this.onSelectionChange = options.onSelectionChange || (() => {});
    
    // 47都道府県のマスター情報（ISOコード 1〜47、名前、読み、地域グループ、SVGグリッド位置/形状）
    this.prefectureInfo = {
      1: { name: "北海道", yomi: "ほっかいどう", region: "hokkaido", col: 10, row: 1 },
      2: { name: "青森県", yomi: "あおもり", region: "tohoku", col: 9, row: 3 },
      3: { name: "岩手県", yomi: "いわて", region: "tohoku", col: 9, row: 4 },
      4: { name: "宮城県", yomi: "みやぎ", region: "tohoku", col: 9, row: 5 },
      5: { name: "秋田県", yomi: "あきた", region: "tohoku", col: 8, row: 4 },
      6: { name: "山形県", yomi: "やまがた", region: "tohoku", col: 8, row: 5 },
      7: { name: "福島県", yomi: "ふくしま", region: "tohoku", col: 9, row: 6 },
      8: { name: "茨城県", yomi: "いばらき", region: "kanto", col: 9, row: 7 },
      9: { name: "栃木県", yomi: "とちぎ", region: "kanto", col: 8, row: 7 },
      10: { name: "群馬県", yomi: "ぐんま", region: "kanto", col: 7, row: 7 },
      11: { name: "埼玉県", yomi: "さいたま", region: "kanto", col: 8, row: 8 },
      12: { name: "千葉県", yomi: "ちば", region: "kanto", col: 9, row: 8 },
      13: { name: "東京都", yomi: "とうきょう", region: "kanto", col: 8, row: 9 },
      14: { name: "神奈川県", yomi: "かながわ", region: "kanto", col: 8, row: 10 },
      15: { name: "新潟県", yomi: "にいがた", region: "chubu", col: 7, row: 6 },
      16: { name: "富山県", yomi: "とやま", region: "chubu", col: 6, row: 6 },
      17: { name: "石川県", yomi: "いしかわ", region: "chubu", col: 5, row: 6 },
      18: { name: "福井県", yomi: "ふくい", region: "chubu", col: 5, row: 7 },
      19: { name: "山梨県", yomi: "やまなし", region: "chubu", col: 7, row: 9 },
      20: { name: "長野県", yomi: "ながの", region: "chubu", col: 7, row: 8 },
      21: { name: "岐阜県", yomi: "ぎふ", region: "chubu", col: 6, row: 8 },
      22: { name: "静岡県", yomi: "しずおか", region: "chubu", col: 7, row: 10 },
      23: { name: "愛知県", yomi: "あいち", region: "chubu", col: 6, row: 9 },
      24: { name: "三重県", yomi: "みえ", region: "kinki", col: 5, row: 9 },
      25: { name: "滋賀県", yomi: "しが", region: "kinki", col: 5, row: 8 },
      26: { name: "京都府", yomi: "きょうと", region: "kinki", col: 4, row: 8 },
      27: { name: "大阪府", yomi: "おおさか", region: "kinki", col: 4, row: 9 },
      28: { name: "兵庫県", yomi: "ひょうご", region: "kinki", col: 3, row: 8 },
      29: { name: "奈良県", yomi: "なら", region: "kinki", col: 5, row: 10 },
      30: { name: "和歌山県", yomi: "わかやま", region: "kinki", col: 4, row: 10 },
      31: { name: "鳥取県", yomi: "とっとり", region: "chugoku", col: 2, row: 7 },
      32: { name: "島根県", yomi: "しまね", region: "chugoku", col: 1, row: 7 },
      33: { name: "岡山県", yomi: "おかやま", region: "chugoku", col: 2, row: 8 },
      34: { name: "広島県", yomi: "ひろしま", region: "chugoku", col: 1, row: 8 },
      35: { name: "山口県", yomi: "やまぐち", region: "chugoku", col: 0, row: 8 },
      36: { name: "徳島県", yomi: "とくしま", region: "shikoku", col: 3, row: 10 },
      37: { name: "香川県", yomi: "かがわ", region: "shikoku", col: 3, row: 9 },
      38: { name: "愛媛県", yomi: "えひめ", region: "shikoku", col: 2, row: 9 },
      39: { name: "高知県", yomi: "こうち", region: "shikoku", col: 2, row: 10 },
      40: { name: "福岡県", yomi: "ふくおか", region: "kyushu", col: -1, row: 9 },
      41: { name: "佐賀県", yomi: "さが", region: "kyushu", col: -2, row: 9 },
      42: { name: "長崎県", yomi: "ながさき", region: "kyushu", col: -3, row: 9 },
      43: { name: "熊本県", yomi: "くまもと", region: "kyushu", col: -2, row: 10 },
      44: { name: "大分県", yomi: "おおいた", region: "kyushu", col: -1, row: 10 },
      45: { name: "宮崎県", yomi: "みやざき", region: "kyushu", col: -1, row: 11 },
      46: { name: "鹿児島県", yomi: "かごしま", region: "kyushu", col: -2, row: 11 },
      47: { name: "沖縄県", yomi: "おきなわ", region: "kyushu", col: -4, row: 11 }
    };

    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 850 720');
    svg.setAttribute('class', 'japan-map-svg');

    // 地方ごとの色定義
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

    const cellWidth = 50;
    const cellHeight = 52;
    const offsetX = 280;
    const offsetY = 30;

    // 各都道府県のボタン描画
    Object.keys(this.prefectureInfo).forEach(idStr => {
      const id = parseInt(idStr, 10);
      const pref = this.prefectureInfo[id];
      
      const x = offsetX + pref.col * (cellWidth + 6);
      const y = offsetY + pref.row * (cellHeight + 6);
      const isSelected = this.selectedPrefectures.has(id);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `pref-group pref-${id} ${isSelected ? 'selected' : ''}`);
      g.setAttribute('data-id', id);

      // 背景長方形（丸みのあるタイル）
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', pref.id === 1 ? cellWidth * 1.8 : cellWidth);
      rect.setAttribute('height', cellHeight);
      rect.setAttribute('rx', '8');
      rect.setAttribute('ry', '8');
      rect.setAttribute('class', 'pref-tile');
      rect.setAttribute('fill', isSelected ? '#3B82F6' : regionColors[pref.region] || '#E5E7EB');
      rect.setAttribute('stroke', isSelected ? '#1D4ED8' : '#FFFFFF');
      rect.setAttribute('stroke-width', isSelected ? '3' : '2');

      // 県名テキスト（1年生向けひらがなメイン、下に漢字）
      const textHira = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textHira.setAttribute('x', x + (pref.id === 1 ? cellWidth * 0.9 : cellWidth / 2));
      textHira.setAttribute('y', y + 22);
      textHira.setAttribute('text-anchor', 'middle');
      textHira.setAttribute('class', 'pref-text-hira');
      textHira.setAttribute('fill', isSelected ? '#FFFFFF' : '#1F2937');
      textHira.textContent = pref.yomi;

      const textKanji = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textKanji.setAttribute('x', x + (pref.id === 1 ? cellWidth * 0.9 : cellWidth / 2));
      textKanji.setAttribute('y', y + 40);
      textKanji.setAttribute('text-anchor', 'middle');
      textKanji.setAttribute('class', 'pref-text-kanji');
      textKanji.setAttribute('fill', isSelected ? '#E0F2FE' : '#4B5563');
      textKanji.textContent = pref.name;

      g.appendChild(rect);
      g.appendChild(textHira);
      g.appendChild(textKanji);

      // イベントリスナー
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
    Object.keys(this.prefectureInfo).forEach(idStr => {
      const id = parseInt(idStr, 10);
      const group = this.container.querySelector(`.pref-${id}`);
      if (!group) return;

      const isSelected = this.selectedPrefectures.has(id);
      const rect = group.querySelector('rect');
      const textHira = group.querySelector('.pref-text-hira');
      const textKanji = group.querySelector('.pref-text-kanji');

      if (isSelected) {
        group.classList.add('selected');
        rect.setAttribute('fill', '#2563EB');
        rect.setAttribute('stroke', '#FFD700');
        rect.setAttribute('stroke-width', '3.5');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FEF08A');
      } else {
        group.classList.remove('selected');
        group.classList.remove('correct');
        group.classList.remove('missed');
        group.classList.remove('wrong');

        const region = this.prefectureInfo[id].region;
        const regionColors = {
          hokkaido: '#60A5FA', tohoku: '#34D399', kanto: '#FBBF24',
          chubu: '#F472B6', kinki: '#A78BFA', chugoku: '#F97316',
          shikoku: '#10B981', kyushu: '#EC4899'
        };

        rect.setAttribute('fill', regionColors[region] || '#E5E7EB');
        rect.setAttribute('stroke', '#FFFFFF');
        rect.setAttribute('stroke-width', '2');
        textHira.setAttribute('fill', '#1F2937');
        textKanji.setAttribute('fill', '#4B5563');
      }
    });
  }

  // クイズ回答後のフィードバック表示 (正解・不足・誤選択のハイライト)
  showAnswerFeedback(correctPrefIds) {
    const userSelected = this.getSelectedPrefectures();
    const correctSet = new Set(correctPrefIds);
    const userSet = new Set(userSelected);

    Object.keys(this.prefectureInfo).forEach(idStr => {
      const id = parseInt(idStr, 10);
      const group = this.container.querySelector(`.pref-${id}`);
      if (!group) return;

      const rect = group.querySelector('rect');
      const textHira = group.querySelector('.pref-text-hira');
      const textKanji = group.querySelector('.pref-text-kanji');

      const isCorrectAnswer = correctSet.has(id);
      const isUserSelected = userSet.has(id);

      if (isCorrectAnswer && isUserSelected) {
        // ピッタリ正解 (緑 / ゴールド)
        group.classList.add('correct');
        rect.setAttribute('fill', '#10B981');
        rect.setAttribute('stroke', '#F59E0B');
        rect.setAttribute('stroke-width', '4');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FEF08A');
      } else if (isCorrectAnswer && !isUserSelected) {
        // 正解なのに選べていなかった都道府県 (黄色・点滅)
        group.classList.add('missed');
        rect.setAttribute('fill', '#F59E0B');
        rect.setAttribute('stroke', '#DC2626');
        rect.setAttribute('stroke-width', '4');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FFFFFF');
      } else if (!isCorrectAnswer && isUserSelected) {
        // 正解じゃないのに選んでしまった都道府県 (赤)
        group.classList.add('wrong');
        rect.setAttribute('fill', '#EF4444');
        rect.setAttribute('stroke', '#7F1D1D');
        rect.setAttribute('stroke-width', '3');
        textHira.setAttribute('fill', '#FFFFFF');
        textKanji.setAttribute('fill', '#FECACA');
      }
    });
  }
}

window.JapanMap = JapanMap;
