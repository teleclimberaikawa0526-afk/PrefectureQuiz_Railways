// LocalStorage 管理クラス (通常モード / テストモードの完全分離・保護者設定対応)
class StorageManager {
  constructor() {
    this.KEYS = {
      IS_TEST_MODE: 'prefecture_quiz_is_test_mode',
      NORMAL_HIGHSCORE: 'prefecture_quiz_normal_highscore',
      NORMAL_ALBUM: 'prefecture_quiz_normal_album',
      TEST_HIGHSCORE: 'prefecture_quiz_test_highscore',
      TEST_ALBUM: 'prefecture_quiz_test_album',
      PASSCODE: 'prefecture_quiz_passcode',
      TIME_LIMIT: 'prefecture_quiz_time_limit_mins',
      DAILY_TIME_PREFIX: 'prefecture_quiz_daily_time_'
    };
  }

  // テストモードフラグ
  isTestMode() {
    return localStorage.getItem(this.KEYS.IS_TEST_MODE) === 'true';
  }

  setTestMode(enabled) {
    localStorage.setItem(this.KEYS.IS_TEST_MODE, enabled ? 'true' : 'false');
  }

  // ハイスコア取得
  getHighScore() {
    const key = this.isTestMode() ? this.KEYS.TEST_HIGHSCORE : this.KEYS.NORMAL_HIGHSCORE;
    return parseInt(localStorage.getItem(key) || '0', 10);
  }

  // ハイスコア更新（更新された場合 true を返す）
  saveHighScore(score) {
    const current = this.getHighScore();
    if (score > current) {
      const key = this.isTestMode() ? this.KEYS.TEST_HIGHSCORE : this.KEYS.NORMAL_HIGHSCORE;
      localStorage.setItem(key, score.toString());
      return true;
    }
    return false;
  }

  // 図鑑（解放済み電車IDリスト）の取得
  getUnlockedAlbum() {
    const key = this.isTestMode() ? this.KEYS.TEST_ALBUM : this.KEYS.NORMAL_ALBUM;
    const raw = localStorage.getItem(key);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  // 電車を図鑑に追加
  unlockTrain(trainId) {
    const list = this.getUnlockedAlbum();
    if (!list.includes(trainId)) {
      list.push(trainId);
      const key = this.isTestMode() ? this.KEYS.TEST_ALBUM : this.KEYS.NORMAL_ALBUM;
      localStorage.setItem(key, JSON.stringify(list));
      return true;
    }
    return false;
  }

  // 保護者用パスワード (デフォルト: "0724")
  getPasscode() {
    return localStorage.getItem(this.KEYS.PASSCODE) || "0724";
  }

  setPasscode(newCode) {
    if (newCode && newCode.trim().length >= 4) {
      localStorage.setItem(this.KEYS.PASSCODE, newCode.trim());
      return true;
    }
    return false;
  }

  // 1日のプレイ制限時間設定（分、デフォルト: 20）
  getTimeLimitMinutes() {
    const val = localStorage.getItem(this.KEYS.TIME_LIMIT);
    return val !== null ? parseInt(val, 10) : 20;
  }

  setTimeLimitMinutes(mins) {
    localStorage.setItem(this.KEYS.TIME_LIMIT, mins.toString());
  }

  // 本日の累計プレイ時間（秒）
  getTodayKey() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${this.KEYS.DAILY_TIME_PREFIX}${yyyy}-${mm}-${dd}`;
  }

  getTodayPlaySeconds() {
    const key = this.getTodayKey();
    return parseInt(localStorage.getItem(key) || '0', 10);
  }

  resetTodayPlaySeconds() {
    localStorage.setItem(this.getTodayKey(), '0');
  }

  addTodayPlaySeconds(seconds) {
    const current = this.getTodayPlaySeconds();
    const updated = current + seconds;
    localStorage.setItem(this.getTodayKey(), updated.toString());
    return updated;
  }

  // プレイ時間が制限時間に達したかチェック (制限なし 0 の場合は常に false)
  isTimeLimitReached() {
    const limitMins = this.getTimeLimitMinutes();
    if (limitMins <= 0) return false; // 0 = 制限なし
    const limitSecs = limitMins * 60;
    return this.getTodayPlaySeconds() >= limitSecs;
  }

  // データリセット
  resetNormalData() {
    localStorage.removeItem(this.KEYS.NORMAL_HIGHSCORE);
    localStorage.removeItem(this.KEYS.NORMAL_ALBUM);
  }

  resetTestData() {
    localStorage.removeItem(this.KEYS.TEST_HIGHSCORE);
    localStorage.removeItem(this.KEYS.TEST_ALBUM);
  }
}

window.storageManager = new StorageManager();
