// 日本のリアル白地図 (高解像度 47都道府県 正確なベクターSVGコンポーネント)
class JapanMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.selectedPrefectures = new Set();
    this.isInteractive = true;
    this.onSelectionChange = options.onSelectionChange || (() => {});
    
    // SVG読み込み完了を待つPromise（外部からアクセス可能にする場合）
    this.ready = this.render();
  }

  // 読みと地方名のデータのみ保持（座標やパスはSVGから取得する）
  get prefectureMetadata() {
    return {
      1: { name: "北海道", yomi: "ほっかいどう", region: "hokkaido" },
      2: { name: "青森県", yomi: "あおもり", region: "tohoku" },
      3: { name: "岩手県", yomi: "いわて", region: "tohoku" },
      4: { name: "宮城県", yomi: "みやぎ", region: "tohoku" },
      5: { name: "秋田県", yomi: "あきた", region: "tohoku" },
      6: { name: "山形県", yomi: "やまがた", region: "tohoku" },
      7: { name: "福島県", yomi: "ふくしま", region: "tohoku" },
      8: { name: "茨城県", yomi: "いばらき", region: "kanto" },
      9: { name: "栃木県", yomi: "とちぎ", region: "kanto" },
      10: { name: "群馬県", yomi: "ぐんま", region: "kanto" },
      11: { name: "埼玉県", yomi: "さいたま", region: "kanto" },
      12: { name: "千葉県", yomi: "ちば", region: "kanto" },
      13: { name: "東京都", yomi: "とうきょう", region: "kanto" },
      14: { name: "神奈川県", yomi: "かながわ", region: "kanto" },
      15: { name: "新潟県", yomi: "にいがた", region: "chubu" },
      16: { name: "富山県", yomi: "とやま", region: "chubu" },
      17: { name: "石川県", yomi: "いしかわ", region: "chubu" },
      18: { name: "福井県", yomi: "ふくい", region: "chubu" },
      19: { name: "山梨県", yomi: "やまなし", region: "chubu" },
      20: { name: "長野県", yomi: "ながの", region: "chubu" },
      21: { name: "岐阜県", yomi: "ぎふ", region: "chubu" },
      22: { name: "静岡県", yomi: "しずおか", region: "chubu" },
      23: { name: "愛知県", yomi: "あいち", region: "chubu" },
      24: { name: "三重県", yomi: "みえ", region: "kinki" },
      25: { name: "滋賀県", yomi: "しが", region: "kinki" },
      26: { name: "京都府", yomi: "きょうと", region: "kinki" },
      27: { name: "大阪府", yomi: "おおさか", region: "kinki" },
      28: { name: "兵庫県", yomi: "ひょうご", region: "kinki" },
      29: { name: "奈良県", yomi: "なら", region: "kinki" },
      30: { name: "和歌山県", yomi: "わかやま", region: "kinki" },
      31: { name: "鳥取県", yomi: "とっとり", region: "chugoku" },
      32: { name: "島根県", yomi: "しまね", region: "chugoku" },
      33: { name: "岡山県", yomi: "おかやま", region: "chugoku" },
      34: { name: "広島県", yomi: "ひろしま", region: "chugoku" },
      35: { name: "山口県", yomi: "やまぐち", region: "chugoku" },
      36: { name: "徳島県", yomi: "とくしま", region: "shikoku" },
      37: { name: "香川県", yomi: "かがわ", region: "shikoku" },
      38: { name: "愛媛県", yomi: "えひめ", region: "shikoku" },
      39: { name: "高知県", yomi: "こうち", region: "shikoku" },
      40: { name: "福岡県", yomi: "ふくおか", region: "kyushu" },
      41: { name: "佐賀県", yomi: "さが", region: "kyushu" },
      42: { name: "長崎県", yomi: "ながさき", region: "kyushu" },
      43: { name: "熊本県", yomi: "くまもと", region: "kyushu" },
      44: { name: "大分県", yomi: "おおいた", region: "kyushu" },
      45: { name: "宮崎県", yomi: "みやざき", region: "kyushu" },
      46: { name: "鹿児島県", yomi: "かごしま", region: "kyushu" },
      47: { name: "沖縄県", yomi: "おきなわ", region: "kyushu" }
    };
  }

  async render() {
    if (!this.container) return;
    this.container.innerHTML = '<div style="padding: 40px; text-align: center; color: #666; font-size: 1.2rem;">地図データを読み込み中...</div>';

    try {
      const svgText = typeof MAP_FULL_SVG !== 'undefined' ? MAP_FULL_SVG : '';
      if (!svgText) throw new Error('SVGデータが見つかりません');
      
      this.container.innerHTML = svgText;
      const svg = this.container.querySelector('svg');
      if (!svg) throw new Error('SVG要素が見つかりません');

      svg.setAttribute('class', 'japan-map-svg real-map-hd');
      // クイズ画面に収まるようにviewBoxとサイズを調整
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');

      // CSSでホバーやクリックを処理しやすいように、各都道府県のgタグを整理する
      const prefGroups = svg.querySelectorAll('g.prefecture');
      
      // getBBox は DOM に描画されていないと正しく計算できないため、
      // offsetWidth 等と同様にレイアウト後である必要がある。
      // this.container に innerHTML してあるため、基本的に取得可能。
      
      prefGroups.forEach(g => {
        const id = parseInt(g.getAttribute('data-code'), 10);
        if (isNaN(id)) return;
        
        const meta = this.prefectureMetadata[id];
        if (!meta) return;

        // クラス名をアプリの仕様に合わせる
        g.setAttribute('class', `pref-group pref-${id}`);
        g.setAttribute('data-id', id);
        
        // パス・ポリゴン要素にデフォルトのクラスや属性を付与
        const shapes = g.querySelectorAll('path, polygon');
        shapes.forEach(shape => {
          shape.setAttribute('class', 'pref-path');
          shape.setAttribute('stroke-linejoin', 'round');
          // pointer-eventsを形状に限定して、正確なクリック判定にする
          shape.style.pointerEvents = 'all';
        });

        // BBoxを取得して、ラベル(都道府県名)を中心に追加する
        let bbox = { x: 0, y: 0, width: 0, height: 0 };
        try {
          bbox = g.getBBox();
        } catch (e) {
          console.warn('getBBox error on init', id);
        }
        
        // 中心座標の計算
        // 最大のポリゴン/パスのBBoxを使うとより正確 (離島等がある場合のため)
        let mainShape = shapes[0];
        let maxArea = 0;
        shapes.forEach(shape => {
            try {
                const sbox = shape.getBBox();
                const area = sbox.width * sbox.height;
                if (area > maxArea) {
                    maxArea = area;
                    mainShape = shape;
                }
            } catch(e) {}
        });
        
        let centerX = 0;
        let centerY = 0;
        try {
            const mainBbox = mainShape.getBBox();
            centerX = mainBbox.x + mainBbox.width / 2;
            centerY = mainBbox.y + mainBbox.height / 2;
        } catch (e) {
            centerX = bbox.x + bbox.width / 2;
            centerY = bbox.y + bbox.height / 2;
        }
        
        // 特殊な位置調整 (一部の県は少し中心をずらすと綺麗に収まる)
        if (id === 12) { centerX += 10; centerY += 15; } // 千葉
        if (id === 13) { centerX -= 5; centerY -= 5; }  // 東京
        if (id === 14) { centerX += 5; centerY += 5; }  // 神奈川
        if (id === 47) { centerX += 30; centerY -= 10; } // 沖縄

        // ラベル用のg要素（クリック判定を邪魔しないよう pointer-events: none）
        const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        labelGroup.style.pointerEvents = 'none';

        const textHira = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textHira.setAttribute('x', centerX);
        textHira.setAttribute('y', centerY + 4);
        textHira.setAttribute('text-anchor', 'middle');
        textHira.setAttribute('class', `pref-text-hira pref-text-hira-${id}`);
        textHira.setAttribute('font-size', '14px');
        textHira.setAttribute('font-weight', 'bold');
        textHira.style.display = 'none'; // デフォルトは非表示
        textHira.textContent = meta.yomi;

        labelGroup.appendChild(textHira);
        g.appendChild(labelGroup); // 各都道府県のグループ内に戻す（座標空間を合わせるため）

        // --- クリック・タップイベントの設定 ---
        let touchStartX = 0;
        let touchStartY = 0;

        const handleSelection = (e) => {
          if (!this.isInteractive) return;
          const now = Date.now();
          // 短期間に複数回発火するのを防ぐ（300ms以内）
          if (this.lastToggleTime && now - this.lastToggleTime < 300) return;
          this.lastToggleTime = now;
          
          if (e.cancelable && e.type === 'touchend') e.preventDefault();
          if (window.audioManager) window.audioManager.playClick();
          this.toggleSelection(id);
        };

        g.addEventListener('touchstart', (e) => {
          if (e.changedTouches && e.changedTouches.length > 0) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
          }
        }, { passive: true });

        g.addEventListener('touchend', (e) => {
          if (e.changedTouches && e.changedTouches.length > 0) {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const dist = Math.sqrt(Math.pow(touchEndX - touchStartX, 2) + Math.pow(touchEndY - touchStartY, 2));
            if (dist < 20) { // 20px未満ならタップ
              handleSelection(e);
            }
          }
        });

        g.addEventListener('click', (e) => {
          handleSelection(e);
        });
      });

      // 初期状態のビジュアルを適用
      this.updateVisuals();

      // Panzoomの初期化 (スマホでのピンチ操作、PCでのドラッグ等)
      this.container.style.overflow = 'hidden';
      this.container.style.touchAction = 'none';
      if (typeof panzoom !== 'undefined') {
        this.panZoomInstance = panzoom(svg, {
          maxZoom: 10,
          minZoom: 1,
          bounds: true,
          boundsPadding: 0.1,
          zoomDoubleClickSpeed: 1,
        });
      }
      
    } catch (err) {
      console.error(err);
      this.container.innerHTML = '<div style="color: red; padding: 20px;">地図の読み込みに失敗しました。リロードしてください。</div>';
    }
  }

  toggleSelection(id) {
    const group = this.container.querySelector(`.pref-${id}`);
    if (this.selectedPrefectures.has(id)) {
      this.selectedPrefectures.delete(id);
    } else {
      this.selectedPrefectures.add(id);
      // SVGでのz-indexハック：選択された要素をDOMの最後に移動して最前面に表示する
      if (group && group.parentNode) {
        group.parentNode.appendChild(group);
      }
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

    Object.keys(this.prefectureMetadata).forEach(idStr => {
      const id = parseInt(idStr, 10);
      const group = this.container.querySelector(`.pref-${id}`);
      if (!group) return;

      const isSelected = this.selectedPrefectures.has(id);
      const shapes = group.querySelectorAll('path, polygon');
      const textHira = group.querySelector('.pref-text-hira'); // 元に戻す

      if (isSelected) {
        group.classList.add('selected');
        shapes.forEach(shape => {
          shape.setAttribute('fill', '#1D4ED8');
          shape.setAttribute('stroke', '#FFD700');
          shape.setAttribute('stroke-width', '2');
        });
        if (textHira) {
          textHira.setAttribute('fill', '#FFFFFF');
          textHira.style.display = 'block'; // 選択時に表示
        }
      } else {
        group.classList.remove('selected', 'correct', 'missed', 'wrong');

        const region = this.prefectureMetadata[id].region;
        shapes.forEach(shape => {
          shape.setAttribute('fill', regionColors[region] || '#CBD5E1');
          shape.setAttribute('stroke', '#FFFFFF');
          shape.setAttribute('stroke-width', '0.5');
        });
        if (textHira) {
          textHira.setAttribute('fill', '#0F172A');
          textHira.style.display = 'none'; // 未選択時は非表示
        }
      }
    });
  }

  showAnswerFeedback(correctPrefIds) {
    const userSelected = this.getSelectedPrefectures();
    const correctSet = new Set(correctPrefIds);
    const userSet = new Set(userSelected);

    Object.keys(this.prefectureMetadata).forEach(idStr => {
      const id = parseInt(idStr, 10);
      const group = this.container.querySelector(`.pref-${id}`);
      if (!group) return;

      const shapes = group.querySelectorAll('path, polygon');
      const textHira = group.querySelector('.pref-text-hira'); // 元に戻す

      const isCorrectAnswer = correctSet.has(id);
      const isUserSelected = userSet.has(id);

      if (isCorrectAnswer && isUserSelected) {
        if (group.parentNode) group.parentNode.appendChild(group); // 最前面に移動
        group.classList.add('correct');
        shapes.forEach(shape => {
          shape.setAttribute('fill', '#10B981');
          shape.setAttribute('stroke', '#F59E0B');
          shape.setAttribute('stroke-width', '1.5');
        });
        if (textHira) {
            textHira.setAttribute('fill', '#FFFFFF');
            textHira.style.display = 'block';
        }
      } else if (isCorrectAnswer && !isUserSelected) {
        if (group.parentNode) group.parentNode.appendChild(group); // 最前面に移動
        group.classList.add('missed');
        shapes.forEach(shape => {
          shape.setAttribute('fill', '#F59E0B');
          shape.setAttribute('stroke', '#DC2626');
          shape.setAttribute('stroke-width', '1.5');
        });
        if (textHira) {
            textHira.setAttribute('fill', '#FFFFFF');
            textHira.style.display = 'block';
        }
      } else if (!isCorrectAnswer && isUserSelected) {
        group.classList.add('wrong');
        shapes.forEach(shape => {
          shape.setAttribute('fill', '#EF4444');
          shape.setAttribute('stroke', '#7F1D1D');
          shape.setAttribute('stroke-width', '1.5');
        });
        if (textHira) {
            textHira.setAttribute('fill', '#FFFFFF');
            textHira.style.display = 'block';
        }
      }
    });
  }
}

window.JapanMap = JapanMap;
