// でんしゃで覚える！都道府県クイズ アプリケーションコントローラー
class QuizApp {
  constructor() {
    this.currentTrain = null;
    this.selectedTrainName = null;
    this.selectedPrefectures = [];
    this.score = 0;
    this.combo = 0;
    this.lives = 5; // 5回まちがえるとゲームオーバー
    this.gameMode = 'from_train';
    this.fromMapState = 0; // 0=pref_selection, 1=train_selection
    this.targetPrefCode = null;
    this.japanMap = null;
    this.playTimer = null;
    this.lastActivityTime = Date.now();

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
    // ユーザーの操作（アクティビティ）を記録
    const updateActivity = () => { this.lastActivityTime = Date.now(); };
    document.addEventListener('click', updateActivity);
    document.addEventListener('touchstart', updateActivity, { passive: true });

    // タイトル画面のボタン
    document.getElementById('btn-start-from-train').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playWhistle();
      this.gameMode = 'from_train';
      this.startNewGame();
    });

    document.getElementById('btn-start-from-map').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playWhistle();
      this.gameMode = 'from_map';
      this.startNewGame();
    });

    document.getElementById('btn-back-title').addEventListener('click', () => {
      if (window.audioManager) window.audioManager.playClick();
      this.showScreen('screen-title');
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
      this.checkAnswerFromTrain();
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

    const resetPlayTimeBtn = document.getElementById('btn-reset-playtime');
    if (resetPlayTimeBtn) {
      resetPlayTimeBtn.addEventListener('click', () => {
        if (confirm('今日のプレイ時間をリセットして、0分に戻しますか？')) {
          window.storageManager.resetTodayPlaySeconds();
          document.getElementById('play-time-display').textContent = `今日のプレイ時間: 0分`;
          alert('プレイ時間をリセットしました。');
          // 制限解除のためにタイムアップ画面を隠す
          document.getElementById('screen-timeup').classList.remove('active');
        }
      });
    }

    // タイムアップ画面からの保護者解除ボタン
    document.getElementById('btn-timeup-unlock').addEventListener('click', () => {
      this.openPasscodeModal();
    });
  }

  // 1日ごとのプレイ時間計測タイマー
  startPlayTimer() {
    if (this.playTimer) clearInterval(this.playTimer);
    this.playTimer = setInterval(() => {
      // クイズ画面が開かれている ＆ 1分以内に操作がある場合のみ加算
      const isQuizScreen = document.getElementById('screen-quiz').classList.contains('active');
      const isActive = (Date.now() - this.lastActivityTime) < 60000; // 60秒以内の操作

      if (isQuizScreen && isActive && window.storageManager) {
        window.storageManager.addTodayPlaySeconds(10);
        if (window.storageManager.isTimeLimitReached()) {
          this.showScreen('screen-timeup');
        }
      }
    }, 10000); // 10秒ごとに判定
  }

  updateHeaderUI() {
    const isTest = window.storageManager.isTestMode();
    const highScore = window.storageManager.getHighScore(this.gameMode || 'from_train');

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
    const rankTitle = this.getRankTitle(window.storageManager.getHighScore('from_train') + window.storageManager.getHighScore('from_map'));
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
    this.selectedPrefectures = [];
    this.lastActivityTime = Date.now();
    this.updateHeaderUI();
    this.updateGameStatsUI();
    this.showScreen('screen-quiz');
    this.nextQuestion();
  }

  updateGameStatsUI() {
    document.getElementById('score-val').textContent = `${this.score}点`;
    document.getElementById('combo-val').textContent = `🔥 ${this.combo}コンボ`;
    
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

  nextQuestion() {
    document.getElementById('feedback-panel').classList.remove('active');
    
    this.japanMap.clearSelection();
    this.selectedTrainName = null;
    this.selectedPrefectures = [];

    const trains = window.TRAIN_DATA;
    const randomIndex = Math.floor(Math.random() * trains.length);
    this.currentTrain = trains[randomIndex];

    if (this.gameMode === 'from_train') {
      this.japanMap.setInteractive(true);
      document.getElementById('btn-submit-answer').style.display = 'inline-block';
      
      document.getElementById('from-train-question-block').style.display = 'block';
      document.getElementById('from-map-pref-question-block').style.display = 'none';
      document.getElementById('from-map-train-question-block').style.display = 'none';
      document.getElementById('train-photo-card').style.display = 'block';
      
      const mapTitle = document.getElementById('map-q-title');
      if (mapTitle) mapTitle.textContent = '② この電車が はしっている とどうふけんを タップしよう！';
      
      const mapDesc = document.getElementById('map-q-desc');
      if (mapDesc) mapDesc.style.display = 'block';
      
      this.updateSelectedPrefCountUI();
      
      const imgElem = document.getElementById('train-photo');
      const loadingElem = document.getElementById('train-photo-loading');
      imgElem.style.display = 'none';
      loadingElem.style.display = 'flex';
      imgElem.onload = () => { loadingElem.style.display = 'none'; imgElem.style.display = 'block'; };
      imgElem.onerror = () => { loadingElem.style.display = 'none'; imgElem.style.display = 'block'; };
      imgElem.src = this.currentTrain.imageUrl;
      if (imgElem.complete && imgElem.naturalWidth > 0) {
        loadingElem.style.display = 'none';
        imgElem.style.display = 'block';
      }

      document.getElementById('train-category-badge').textContent = this.currentTrain.categoryName;
      this.renderTrainChoicesFromTrain();

    } else if (this.gameMode === 'from_map') {
      this.fromMapState = 0;
      this.japanMap.setInteractive(false);
      document.getElementById('btn-submit-answer').style.display = 'none';
      
      document.getElementById('from-train-question-block').style.display = 'none';
      document.getElementById('train-photo-card').style.display = 'none';
      
      document.getElementById('from-map-pref-question-block').style.display = 'block';
      document.getElementById('from-map-train-question-block').style.display = 'none';
      
      const mapTitle = document.getElementById('map-q-title');
      if (mapTitle) mapTitle.textContent = '✨ ひかっている とどうふけんは どこかな？ ✨';
      
      const mapDesc = document.getElementById('map-q-desc');
      if (mapDesc) mapDesc.style.display = 'none';
      document.getElementById('selected-pref-count').textContent = '';
      
      const prefs = this.currentTrain.prefectures;
      this.targetPrefCode = prefs[Math.floor(Math.random() * prefs.length)];
      this.japanMap.setSelection([this.targetPrefCode], { hideNames: true });
      
      this.renderPrefChoicesFromMap();
      this.renderTrainChoicesFromMap(); // Pre-render but keep hidden
    }
  }

  renderTrainChoicesFromTrain() {
    const container = document.getElementById('train-choices-container');
    container.innerHTML = '';
    const allTrains = window.TRAIN_DATA;
    const distractors = allTrains.filter(t => t.id !== this.currentTrain.id);
    distractors.sort(() => Math.random() - 0.5);
    const chosenDistractors = distractors.slice(0, 4);
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

  renderPrefChoicesFromMap() {
    const container = document.getElementById('map-pref-choices-container');
    container.innerHTML = '';
    
    // Create distractors from the map data
    const allPrefs = Object.keys(this.japanMap.prefectureMetadata).map(k => parseInt(k, 10));
    const distractors = allPrefs.filter(p => p !== this.targetPrefCode);
    distractors.sort(() => Math.random() - 0.5);
    const chosenDistractors = distractors.slice(0, 3);
    
    const options = [this.targetPrefCode, ...chosenDistractors];
    options.sort(() => Math.random() - 0.5);

    options.forEach(prefId => {
      const meta = this.japanMap.prefectureMetadata[prefId];
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `<span class="choice-hira">${meta.yomi}</span>`;
      btn.addEventListener('click', () => {
        if (this.fromMapState !== 0) return;
        if (window.audioManager) window.audioManager.playClick();
        
        if (prefId === this.targetPrefCode) {
          if (window.audioManager) window.audioManager.playCorrect();
          btn.classList.add('correct');
          btn.style.background = '#d1fae5';
          btn.style.borderColor = '#10b981';
          this.fromMapState = 1;
          document.getElementById('from-map-train-question-block').style.display = 'block';
        } else {
          btn.classList.add('wrong');
          btn.style.background = '#ffe4e6';
          btn.style.borderColor = '#f43f5e';
          this.checkAnswerFromMap(false);
        }
      });
      container.appendChild(btn);
    });
  }

  renderTrainChoicesFromMap() {
    const container = document.getElementById('map-train-choices-container');
    container.innerHTML = '';
    
    const allTrains = window.TRAIN_DATA;
    const distractors = allTrains.filter(t => t.id !== this.currentTrain.id);
    distractors.sort(() => Math.random() - 0.5);
    const chosenDistractors = distractors.slice(0, 3);
    
    const options = [this.currentTrain, ...chosenDistractors];
    options.sort(() => Math.random() - 0.5);

    options.forEach(train => {
      const btn = document.createElement('button');
      btn.className = 'map-train-btn';
      btn.innerHTML = `<img src="${train.imageUrl}" alt="${train.name}" /><span>${train.name}</span>`;
      btn.addEventListener('click', () => {
        if (this.fromMapState !== 1) return;
        if (window.audioManager) window.audioManager.playClick();
        
        if (train.id === this.currentTrain.id) {
          btn.classList.add('correct');
          this.checkAnswerFromMap(true);
        } else {
          btn.classList.add('wrong');
          this.checkAnswerFromMap(false);
        }
      });
      container.appendChild(btn);
    });
  }

  checkAnswerFromTrain() {
    if (!this.selectedTrainName) {
      alert('電車の なまえを 選択肢から えらんでね！');
      return;
    }
    if (this.selectedPrefectures.length === 0) {
      alert('電車が はしっている 都道府県を 日本地図から えらんでね！');
      return;
    }

    this.japanMap.setInteractive(false);

    const isTrainNameCorrect = (this.selectedTrainName === this.currentTrain.name);
    const correctPrefSet = new Set(this.currentTrain.prefectures);
    const userPrefSet = new Set(this.selectedPrefectures);

    let correctHits = 0;
    let wrongHits = 0;
    userPrefSet.forEach(id => {
      if (correctPrefSet.has(id)) correctHits++;
      else wrongHits++;
    });

    const totalCorrectPrefCount = correctPrefSet.size;
    let pointsEarned = 0;
    let isPerfect = false;

    if (isTrainNameCorrect) {
      const ratio = correctHits / totalCorrectPrefCount;
      let rawScore = Math.round(ratio * 100);
      const penalty = wrongHits * 15;
      pointsEarned = Math.max(0, rawScore - penalty);

      if (correctHits === totalCorrectPrefCount && wrongHits === 0) {
        isPerfect = true;
      }
    } else {
      const ratio = correctHits / totalCorrectPrefCount;
      pointsEarned = Math.max(0, Math.round(ratio * 40) - (wrongHits * 10));
    }

    this.japanMap.showAnswerFeedback(this.currentTrain.prefectures);
    this.processPostAnswer(isPerfect, pointsEarned);
  }

  checkAnswerFromMap(isCorrect) {
    let pointsEarned = 0;
    let isPerfect = false;

    if (isCorrect) {
      isPerfect = true;
      pointsEarned = 100;
    }

    this.japanMap.showAnswerFeedback(this.currentTrain.prefectures);
    this.processPostAnswer(isPerfect, pointsEarned);
  }

  processPostAnswer(isPerfect, pointsEarned) {
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
      window.storageManager.saveHighScore(this.gameMode, this.score);
      this.updateHeaderUI();
    } else {
      if (window.audioManager) window.audioManager.playWrong();
      this.combo = 0;
      this.lives -= 1;
    }

    const feedbackPanel = document.getElementById('feedback-panel');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackBody = document.getElementById('feedback-body');

    if (isPerfect) {
      feedbackTitle.className = 'feedback-title correct';
      feedbackTitle.innerHTML = `🎉 だいせいかい！ 100てん！`;
    } else if (pointsEarned > 0) {
      feedbackTitle.className = 'feedback-title correct';
      feedbackTitle.innerHTML = `🌟 ナイス！ ${pointsEarned}てん かくとく！`;
    } else {
      feedbackTitle.className = 'feedback-title wrong';
      feedbackTitle.innerHTML = `❌ ざんねん… （のこり ❤️ ${this.lives}つ）`;
    }

    feedbackBody.innerHTML = `
      <p class="fb-train-name">🚅 <strong>${this.currentTrain.kanjiName}</strong> (${this.currentTrain.name})</p>
      <p class="fb-route">📍 都道府県: <strong>${this.currentTrain.prefectureNames.join('・')}</strong></p>
      <p class="fb-trivia">💡 ${this.currentTrain.trivia}</p>
    `;

    this.updateGameStatsUI();
    feedbackPanel.classList.add('active');

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

  triggerGameOver() {
    if (window.audioManager) window.audioManager.playGameOver();
    
    const isNewRecord = window.storageManager.saveHighScore(this.gameMode, this.score);
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
          <img class="album-card-img" src="${train.imageUrl}" alt="${train.name}" />
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

    const todaySeconds = window.storageManager.getTodayPlaySeconds();
    const todayMinutes = Math.floor(todaySeconds / 60);
    document.getElementById('play-time-display').textContent = `今日のプレイ時間: ${todayMinutes}分`;

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
