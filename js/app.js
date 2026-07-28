// でんしゃで覚える！都道府県クイズ アプリケーションコントローラー
class QuizApp {
  constructor() {
    this.currentTrain = null;
    this.selectedTrainName = null;
    this.selectedPrefectures = [];
    this.score = 0;
    this.combo = 0;
    this.lives = 5; // 5回まちがえるとゲームオーバー
    this.japanMap = null;
    this.playTimer = null;

    this.initDOM();
    this.initEvents();
    this.updateHeaderUI();
    this.startPlayTimer();
    this.showScreen('screen-title');
  }

  initDOM() {
    // 日本地図の初期化
    this.japanMap = new JapanMap('map-container', {
      onSelectionChange: (selectedIds) => {
        this.selectedPrefectures = selectedIds;
        this.updateSelectedPrefCountUI();
      }
    });
  }

  initEvents() {
    // タイトル画面のボタン
    document.getElementById('btn-start-game').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playWhistle();
      this.startNewGame();
    });

    document.getElementById('btn-view-album').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playClick();
      this.openAlbumScreen();
    });

    document.getElementById('btn-open-settings').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playClick();
      this.openPasscodeModal();
    });

    // クイズ画面の回答ボタン
    document.getElementById('btn-submit-answer').addEventListener('click', () => {
      this.checkAnswer();
    });

    // クイズ画面の「つぎへ」ボタン
    document.getElementById('btn-next-quiz').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playClick();
      this.nextQuestion();
    });

    // でんしゃ図鑑画面の閉じるボタン
    document.getElementById('btn-close-album').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playClick();
      this.showScreen('screen-title');
    });

    // ゲームオーバー画面のボタン
    document.getElementById('btn-retry').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playWhistle();
      this.startNewGame();
    });

    document.getElementById('btn-gameover-album').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playClick();
      this.openAlbumScreen();
    });

    // テンキーパスコード入力画面
    document.getElementById('btn-close-passcode').addEventListener('click', () => {
      this.closePasscodeModal();
    });

    document.querySelectorAll('.numpad-btn[data-num]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (window.audioManager) window.audioManager.playClick();
        const num = e.currentTarget.getAttribute('data-num');
        if (num !== null) {
          this.handlePasscodeDigit(num);
        }
      });
    });

    document.getElementById('btn-passcode-clear').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playClick();
      this.clearPasscodeDigit();
    });

    document.getElementById('btn-passcode-enter').addEventListener('click', () => {
      this.verifyPasscode();
    });

    // 設定画面の閉じる・保存イベント
    document.getElementById('btn-close-settings').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playClick();
      this.closeSettingsModal();
    });

    document.getElementById('test-mode-toggle').addEventListener('change', (e) => {
      if (window.audioManager) window.audioManager.playClick();
      const isTest = e.target.checked;
      window.storageManager.setTestMode(isTest);
      this.updateHeaderUI();
      alert(isTest ? '🧪 テストモードを ON にしました。' : '通常モードに切り替えました。');
    });

    document.getElementById('btn-save-passcode').addEventListener('click', () => {
      const newCode = document.getElementById('input-new-passcode').value;
      if (window.storageManager.setPasscode(newCode)) {
        if (window.audioManager) window.audioManager.playCorrect();
        alert('パスワードを 変更しました！');
        document.getElementById('input-new-passcode').value = '';
      } else {
        if (window.audioManager) window.audioManager.playWrong();
        alert('パスワードは 4けた以上の 数字を入力してください。');
      }
    });

    document.getElementById('select-time-limit').addEventListener('change', (e) => {
      const mins = parseInt(e.target.value, 10);
      window.storageManager.setTimeLimitMinutes(mins);
      if (window.audioManager) window.audioManager.playClick();
    });

    document.getElementById('btn-reset-normal-data').addEventListener('click', () => {
      if (confirm('通常モードの ハイスコアと 図鑑データを リセットしますか？')) {
        window.storageManager.resetNormalData();
        this.updateHeaderUI();
        alert('通常モードの データを リセットしました。');
      }
    });

    document.getElementById('btn-reset-test-data').addEventListener('click', () => {
      if (confirm('テストモードの ハイスコアと 図鑑データを リセットしますか？')) {
        window.storageManager.resetTestData();
        this.updateHeaderUI();
        alert('テストモードの データを リセットしました。');
      }
    });

    // タイムアップ画面からの保護者解除ボタン
    document.getElementById('btn-timeup-unlock').addEventListener('click', () => {
      this.openPasscodeModal();
    });
  }

  // 1分ごとのプレイ時間計測タイマー
  startPlayTimer() {
    if (this.playTimer) clearInterval(this.playTimer);
    this.playTimer = setInterval(() => {
      // プレイ中のみ加算
      if (window.storageManager) {
        window.storageManager.addTodayPlaySeconds(10);
        if (window.storageManager.isTimeLimitReached()) {
          this.showScreen('screen-timeup');
        }
      }
    }, 10000); // 10秒ごとに累計加算
  }

  updateHeaderUI() {
    const isTest = window.storageManager.isTestMode();
    const highScore = window.storageManager.getHighScore();

    // テストモードバッジの切り替え
    const testBadge = document.getElementById('test-mode-badge');
    if (testBadge) {
      testBadge.style.display = isTest ? 'inline-block' : 'none';
    }

    // ハイスコア表示
    const highScoreElem = document.getElementById('header-highscore');
    if (highScoreElem) {
      highScoreElem.textContent = `${highScore} てん`;
    }

    // タイトル画面のハイスコア表示
    const titleHighScore = document.getElementById('title-highscore-val');
    if (titleHighScore) {
      titleHighScore.textContent = `${highScore} てん`;
    }

    // タイトル画面のランク称号表示
    const rankTitle = this.getRankTitle(highScore);
    const titleRankElem = document.getElementById('title-rank-name');
    if (titleRankElem) {
      titleRankElem.textContent = rankTitle;
    }
  }

  getRankTitle(score) {
    if (score >= 3000) return '👑 ぜんこく えきちょう マスター';
    if (score >= 2000) return '🚅 すーぱー しんかんせん はかせ';
    if (score >= 1000) return '🚃 でんしゃ はかせ';
    if (score >= 500) return '🎫 みならい しゃしょう';
    return '🌱 でんしゃ すきな こ';
  }

  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
    }
  }

  // --- ゲーム開始 ---
  startNewGame() {
    this.score = 0;
    this.combo = 0;
    this.lives = 5;
    this.updateGameStatsUI();
    this.showScreen('screen-quiz');
    this.nextQuestion();
  }

  updateGameStatsUI() {
    document.getElementById('score-val').textContent = `${this.score}点`;
    document.getElementById('combo-val').textContent = `🔥 ${this.combo}コンボ`;
    
    // ハートマーク更新
    const heartsContainer = document.getElementById('hearts-container');
    heartsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const span = document.createElement('span');
      span.className = `heart-icon ${i < this.lives ? 'active' : 'empty'}`;
      span.textContent = '❤️';
      heartsContainer.appendChild(span);
    }
  }

  updateSelectedPrefCountUI() {
    const countElem = document.getElementById('selected-pref-count');
    if (countElem) {
      countElem.textContent = `${this.selectedPrefectures.length}個 えらんでいるよ`;
    }
  }

  // 次のクイズ問題へ
  nextQuestion() {
    // フィードバックパネルを隠す
    document.getElementById('feedback-panel').classList.remove('active');
    
    // 地図の選択状態解除
    this.japanMap.clearSelection();
    this.japanMap.setInteractive(true);
    this.selectedTrainName = null;

    // ランダムに電車を選択
    const trains = window.TRAIN_DATA;
    const randomIndex = Math.floor(Math.random() * trains.length);
    this.currentTrain = trains[randomIndex];

    // 電車実写写真のセット
    const imgElem = document.getElementById('train-photo');
    const loadingElem = document.getElementById('train-photo-loading');
    imgElem.style.display = 'none';
    loadingElem.style.display = 'flex';

    imgElem.src = this.currentTrain.imageUrl;
    imgElem.onload = () => {
      loadingElem.style.display = 'none';
      imgElem.style.display = 'block';
    };
    imgElem.onerror = () => {
      // 万が一画像が読み込めない場合のフォールバック
      loadingElem.innerHTML = `<span style="font-size: 2.5rem;">🚅</span><br><span>${this.currentTrain.name}</span>`;
    };

    // 電車のカテゴリバッジ
    document.getElementById('train-category-badge').textContent = this.currentTrain.categoryName;

    // 5択の選択肢を作成（正解1つ + ダミー4つ）
    this.renderTrainChoices();
  }

  renderTrainChoices() {
    const container = document.getElementById('train-choices-container');
    container.innerHTML = '';

    const allTrains = window.TRAIN_DATA;
    const distractors = allTrains.filter(t => t.id !== this.currentTrain.id);
    
    // シャッフルしてダミーを4つ選出
    distractors.sort(() => Math.random() - 0.5);
    const chosenDistractors = distractors.slice(0, 4);

    // 正解とダミーを合わせてシャッフル
    const options = [this.currentTrain, ...chosenDistractors];
    options.sort(() => Math.random() - 0.5);

    options.forEach(train => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `<span class="choice-hira">${train.name}</span><br><span class="choice-kanji">(${train.kanjiName})</span>`;
      
      btn.addEventListener('click', () => {
        if (window.audioManager) window.audioManager.playClick();
        document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedTrainName = train.name;
      });

      container.appendChild(btn);
    });
  }

  // 回答判定 (割合部分点 & 0点以外ライフ減少なし)
  checkAnswer() {
    if (!this.selectedTrainName) {
      alert('電車の なまえを 選択肢から えらんでね！');
      return;
    }

    if (this.selectedPrefectures.length === 0) {
      alert('電車が はしっている 都道府県を 日本地図から えらんでね！');
      return;
    }

    this.japanMap.setInteractive(false);

    // ① 電車名判定
    const isTrainNameCorrect = (this.selectedTrainName === this.currentTrain.name);

    // ② 都道府県位置判定
    const correctPrefSet = new Set(this.currentTrain.prefectures);
    const userPrefSet = new Set(this.selectedPrefectures);

    let correctHits = 0;
    let wrongHits = 0;

    userPrefSet.forEach(id => {
      if (correctPrefSet.has(id)) {
        correctHits++;
      } else {
        wrongHits++;
      }
    });

    const totalCorrectPrefCount = correctPrefSet.size;

    // 部分点計算 (全問正解で100点)
    let pointsEarned = 0;
    let isPerfect = false;

    if (isTrainNameCorrect) {
      // 電車名正解の場合、都道府県の正解割合に応じたスコア (100点満点)
      const ratio = correctHits / totalCorrectPrefCount;
      let rawScore = Math.round(ratio * 100);

      // 間違えて選んでしまった都道府県がある場合は減点（0点未満にはならない）
      const penalty = wrongHits * 15;
      pointsEarned = Math.max(0, rawScore - penalty);

      // 完全ピッタリ正解（電車名正解 ＆ 都道府県過不足なし）
      if (correctHits === totalCorrectPrefCount && wrongHits === 0) {
        isPerfect = true;
      }
    } else {
      // 電車名が間違っていた場合でも、都道府県が合っていれば少量の部分点を付与
      const ratio = correctHits / totalCorrectPrefCount;
      pointsEarned = Math.max(0, Math.round(ratio * 40) - (wrongHits * 10));
    }

    // 日本地図に正解・過不足のハイライトを表示
    this.japanMap.showAnswerFeedback(this.currentTrain.prefectures);

    // 0点以外ならライフ（ハート）は減らない！
    const isZeroPoints = (pointsEarned === 0);

    if (!isZeroPoints) {
      if (isPerfect) {
        this.combo += 1;
        const comboBonus = (this.combo > 1) ? (this.combo * 20) : 0;
        pointsEarned += comboBonus;
      }
      if (window.audioManager) window.audioManager.playCorrect();

      this.score += pointsEarned;
      window.storageManager.unlockTrain(this.currentTrain.id);
      window.storageManager.saveHighScore(this.score);
      this.updateHeaderUI();
    } else {
      // 0点（完全ミス）の場合のみライフを1つ消費
      if (window.audioManager) window.audioManager.playWrong();
      this.combo = 0;
      this.lives -= 1;
    }

    // フィードバックパネルの表示
    const feedbackPanel = document.getElementById('feedback-panel');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackBody = document.getElementById('feedback-body');

    if (isPerfect) {
      feedbackTitle.className = 'feedback-title correct';
      feedbackTitle.innerHTML = `🎉 パーフェクト！ 100てん！`;
    } else if (pointsEarned > 0) {
      feedbackTitle.className = 'feedback-title correct';
      feedbackTitle.innerHTML = `🌟 ナイス！ ${pointsEarned}てん かくとく！`;
    } else {
      feedbackTitle.className = 'feedback-title wrong';
      feedbackTitle.innerHTML = `❌ 0てん… （のこり ❤️ ${this.lives}つ）`;
    }

    feedbackBody.innerHTML = `
      <p class="fb-train-name">🚅 <strong>${this.currentTrain.kanjiName}</strong> (${this.currentTrain.name}) ${isTrainNameCorrect ? '✅' : '❌'}</p>
      <p class="fb-route">📍 都道府県の正解: <strong>${correctHits} / ${totalCorrectPrefCount} 個 正解</strong> (${this.currentTrain.prefectureNames.join('・')})</p>
      <p class="fb-trivia">💡 ${this.currentTrain.trivia}</p>
    `;

    this.updateGameStatsUI();
    feedbackPanel.classList.add('active');

    // 残りライフチェック
    if (this.lives <= 0) {
      document.getElementById('btn-next-quiz').textContent = '結果をみる';
      document.getElementById('btn-next-quiz').onclick = () => {
        this.triggerGameOver();
      };
    } else {
      document.getElementById('btn-next-quiz').textContent = 'つぎの クイズへ！';
      document.getElementById('btn-next-quiz').onclick = () => {
        this.nextQuestion();
      };
    }
  }

  // ゲームオーバー処理
  triggerGameOver() {
    if (window.audioManager) window.audioManager.playGameOver();
    
    const isNewRecord = window.storageManager.saveHighScore(this.score);
    this.updateHeaderUI();

    document.getElementById('gameover-score-val').textContent = `${this.score} 点`;
    document.getElementById('gameover-record-badge').style.display = isNewRecord ? 'inline-block' : 'none';

    if (isNewRecord && window.audioManager) {
      window.audioManager.playFanfare();
    }

    const rank = this.getRankTitle(this.score);
    document.getElementById('gameover-rank-val').textContent = rank;

    this.showScreen('screen-gameover');
  }

  // でんしゃ図鑑（コレクション）画面の表示
  openAlbumScreen() {
    const container = document.getElementById('album-grid');
    container.innerHTML = '';

    const unlockedIds = window.storageManager.getUnlockedAlbum();
    const allTrains = window.TRAIN_DATA;

    document.getElementById('album-progress-text').textContent = `あつめた 電車: ${unlockedIds.length} / ${allTrains.length} しゅるい`;

    allTrains.forEach(train => {
      const isUnlocked = unlockedIds.includes(train.id);

      const card = document.createElement('div');
      card.className = `album-card ${isUnlocked ? 'unlocked' : 'locked'}`;

      if (isUnlocked) {
        card.innerHTML = `
          <img class="album-card-img" src="${train.imageUrl}" alt="${train.name}" referrerpolicy="no-referrer" crossorigin="anonymous" />
          <div class="album-card-body">
            <span class="album-card-category">${train.categoryName}</span>
            <h4 class="album-card-title">${train.name}</h4>
            <p class="album-card-route">📍 ${train.prefectureNames.join('・')}</p>
            <p class="album-card-trivia">${train.trivia}</p>
          </div>
        `;
      } else {
        card.innerHTML = `
          <div class="album-card-locked-icon">🔒</div>
          <div class="album-card-body">
            <h4 class="album-card-title">？？？？？</h4>
            <p class="album-card-route">クイズに正解して 解放しよう！</p>
          </div>
        `;
      }

      container.appendChild(card);
    });

    this.showScreen('screen-album');
  }

  // --- テンキーパスコード モーダル ---
  openPasscodeModal() {
    this.currentPassInput = '';
    this.updatePasscodeDotsUI();
    document.getElementById('modal-passcode').classList.add('active');
  }

  closePasscodeModal() {
    document.getElementById('modal-passcode').classList.remove('active');
  }

  handlePasscodeDigit(digit) {
    if (this.currentPassInput.length < 8) {
      this.currentPassInput += digit;
      this.updatePasscodeDotsUI();
      // 4桁入力時に自動照合を試みる
      if (this.currentPassInput.length === 4 && this.currentPassInput === window.storageManager.getPasscode()) {
        setTimeout(() => this.verifyPasscode(), 150);
      }
    }
  }

  clearPasscodeDigit() {
    this.currentPassInput = '';
    this.updatePasscodeDotsUI();
  }

  updatePasscodeDotsUI() {
    const dotsElem = document.getElementById('passcode-dots');
    if (!this.currentPassInput) {
      dotsElem.textContent = 'パスコードを入力';
      dotsElem.style.color = '#94a3b8';
    } else {
      dotsElem.textContent = '● '.repeat(this.currentPassInput.length);
      dotsElem.style.color = '#1e293b';
    }
  }

  verifyPasscode() {
    const correctCode = window.storageManager.getPasscode();
    const input = this.currentPassInput.trim();

    // 完全一致、または数値変換一致（"0724" と "724" などの表記揺れ対応）
    const isMatch = (input === correctCode) ||
                    (parseInt(input, 10) === parseInt(correctCode, 10) && input.length >= 3);

    if (isMatch) {
      if (window.audioManager) window.audioManager.playCorrect();
      this.closePasscodeModal();
      this.openSettingsModal();
    } else {
      if (window.audioManager) window.audioManager.playWrong();
      alert(`パスコードが ちがいます！（デフォルト: 0724）`);
      this.clearPasscodeDigit();
    }
  }

  // --- 保護者用設定モーダル ---
  openSettingsModal() {
    const isTest = window.storageManager.isTestMode();
    document.getElementById('test-mode-toggle').checked = isTest;

    const timeLimit = window.storageManager.getTimeLimitMinutes();
    document.getElementById('select-time-limit').value = timeLimit.toString();

    document.getElementById('modal-settings').classList.add('active');
  }

  closeSettingsModal() {
    document.getElementById('modal-settings').classList.remove('active');
    // タイムアップ画面が開いていた場合、もし制限時間が解除されていれば画面を戻す
    if (!window.storageManager.isTimeLimitReached()) {
      document.getElementById('screen-timeup').classList.remove('active');
      this.showScreen('screen-title');
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.quizApp = new QuizApp();
});
