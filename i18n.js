/**
 * i18n.js — Shared EN/ZH toggle for all pages
 *
 * Usage:
 *   <element data-i18n="key">English fallback</element>
 *   <element data-i18n-html="key">English <strong>fallback</strong></element>
 *
 *   JS: window.i18n.t('key')   // returns translated string
 *       window.i18n.applyI18n() // re-scan DOM and apply
 */

(function () {
  const STORAGE_KEY = 'move-lang';

  const T = {
    // ─── Landing Page ──────────────────────────────────────────
    'hero.subtitle': {
      en: 'A Mixture-of-LoRA-Experts framework that preserves non-verbal vocalizations (laughter, crying, etc.) in speech-to-speech translation with remarkable data efficiency.',
      zh: '一個混合 LoRA 專家架構（Mixture-of-LoRA-Experts），在語音到語音翻譯中保留非語言發聲（笑聲、哭聲等），並具備卓越的資料效率。'
    },
    'hero.authors': {
      en: 'Anonymous Submission',
      zh: '匿名投稿'
    },
    'btn.paper': {
      en: 'Paper (Coming Soon)',
      zh: '論文（即將公開）'
    },
    'btn.dataset': {
      en: 'Dataset',
      zh: '資料集'
    },
    'btn.demo': {
      en: 'Model Demo',
      zh: '模型展示'
    },
    'btn.code': {
      en: 'Code',
      zh: '程式碼'
    },
    'stat.nv': { en: 'NV Preservation', zh: '非語言保留率' },
    'stat.dataset': { en: 'Dataset Scale', zh: '資料集規模' },
    'stat.finetune': { en: 'Min. Fine-tune Data', zh: '最少微調資料' },
    'stat.models': { en: 'Models Compared', zh: '比較模型數' },
    'nav.back': { en: '\u2190 Back to Home', zh: '\u2190 返回首頁' },

    // demos section
    'demos.label': { en: 'Interactive Demos', zh: '互動展示' },
    'demos.title': { en: 'Explore Our Work', zh: '探索我們的研究' },
    'demos.desc': {
      en: 'Listen to our dataset samples and compare model outputs across different emotion categories.',
      zh: '聆聽我們的資料集樣本，並比較不同情緒類別下的模型輸出。'
    },
    'card.dataset.title': { en: 'MoVE Dataset', zh: 'MoVE 資料集' },
    'card.dataset.desc': {
      en: 'Browse ~1,000 hours of bilingual (Chinese \u2194 English) expressive speech pairs across 5 emotion categories with interactive waveform visualization.',
      zh: '瀏覽約 1,000 小時的雙語（中英）表達性語音對，涵蓋 5 種情緒類別，附互動波形視覺化。'
    },
    'card.dataset.arrow': { en: 'Explore Dataset \u2192', zh: '探索資料集 \u2192' },
    'card.eval.title': { en: 'Model Comparison', zh: '模型效果比較' },
    'card.eval.desc': {
      en: 'Listen and compare speech outputs from 8 S2ST models side-by-side: MoVE (Ours), Kimi variants, gpt-4o-audio-preview, SeamlessExpressive, SeamlessM4T-Large-v2, and Cascaded.',
      zh: '聆聽並比較 8 個 S2ST 模型的語音輸出：MoVE（我們的）、Kimi 變體、gpt-4o-audio-preview、SeamlessExpressive、SeamlessM4T-Large-v2 與 Cascaded。'
    },
    'card.eval.arrow': { en: 'Compare Models \u2192', zh: '比較模型 \u2192' },

    // method section
    'method.label': { en: 'Method', zh: '方法' },
    'method.title': { en: 'Our Approach', zh: '我們的方法' },
    'method.desc': {
      en: 'MoVE tackles the expressiveness gap in S2ST through three key contributions.',
      zh: 'MoVE 透過三項關鍵貢獻來解決 S2ST 中的表達力缺口。'
    },
    'arch.title': { en: 'MoVE Architecture', zh: 'MoVE 架構' },
    'arch.data.title': { en: 'Scalable Data Pipeline', zh: '可擴展資料管線' },
    'arch.data.desc': {
      en: 'An automated generation-selection pipeline that creates high-quality expressive S2ST training data, producing a ~1,000-hour bilingual corpus with 5 balanced emotion categories.',
      zh: '一個自動化的生成-篩選管線，產生高品質的表達性 S2ST 訓練資料，建構約 1,000 小時的雙語語料庫，涵蓋 5 種均衡的情緒類別。'
    },
    'arch.moe.title': { en: 'Mixture of LoRA Experts', zh: 'LoRA 專家混合' },
    'arch.moe.desc': {
      en: 'Five specialized vocalization adapters (Angry, Happy, Sad, Laugh, Crying) with a learned soft-weighting router that dynamically blends experts for hybrid expressive states.',
      zh: '五個專門的發聲適配器（憤怒、快樂、悲傷、笑、哭），搭配學習式軟權重路由器，動態混合專家以處理混合表達狀態。'
    },
    'arch.llm.title': { en: 'AudioLLM Fine-tuning', zh: 'AudioLLM 微調' },
    'arch.llm.desc': {
      en: 'First to fine-tune general-purpose AudioLLMs for end-to-end S2ST, demonstrating that as little as 30 minutes of curated data achieves 95% of full-data emotional fidelity.',
      zh: '首次將通用 AudioLLM 微調用於端到端 S2ST，證明僅需 30 分鐘的精選資料即可達到全量資料 95% 的情感保真度。'
    },

    // results section
    'results.label': { en: 'Results', zh: '成果' },
    'results.title': { en: 'Key Findings', zh: '關鍵發現' },
    'results.desc': {
      en: 'MoVE achieves state-of-the-art performance on emotion-preserving English\u2013Chinese S2ST.',
      zh: 'MoVE 在保留情感的英中 S2ST 上達到了最先進的效能。'
    },
    'result.nv.label': { en: 'NV Reproduction Rate', zh: 'NV 重現率' },
    'result.nv.desc': { en: 'vs. \u226414% for existing S2ST systems', zh: '對比現有 S2ST 系統的 \u226414%' },
    'result.nat.label': { en: 'Human Naturalness', zh: '人類自然度評分' },
    'result.nat.desc': { en: 'Highest rated among all compared systems', zh: '在所有比較系統中評分最高' },
    'result.eff.label': { en: 'Data Efficiency', zh: '資料效率' },
    'result.eff.desc': { en: 'of full-data fidelity with just 30 min data', zh: '僅需 30 分鐘資料即達全量保真度' },

    // citation
    'cite.label': { en: 'Citation', zh: '引用' },
    'cite.title': { en: 'Cite Our Work', zh: '引用我們的研究' },
    'cite.desc': { en: 'If you find our work useful, please consider citing:', zh: '如果您覺得我們的研究有用，請考慮引用：' },
    'footer.text': {
      en: 'MoVE \u2014 Anonymous Submission \u00b7 Interspeech 2026',
      zh: 'MoVE \u2014 匿名投稿 \u00b7 Interspeech 2026'
    },

    // ─── Dataset Demo ──────────────────────────────────────────
    'ds.title': { en: 'MoVE Dataset', zh: 'MoVE 資料集' },
    'ds.subtitle': {
      en: 'A large-scale bilingual (Chinese \u2194 English) expressive speech-to-speech translation dataset spanning <strong>~1,000 hours</strong> and <strong>~900k parallel pairs</strong>, presented in our paper:<br/><em style="font-size:0.9em;">MoVE: Translating Laughter and Tears via Mixture of Vocalization Experts in Speech-to-Speech Translation</em>',
      zh: '一個大規模雙語（中文 \u2194 英文）表達性語音到語音翻譯資料集，涵蓋<strong>約 1,000 小時</strong>和<strong>約 90 萬筆平行語料</strong>，發表於我們的論文：<br/><em style="font-size:0.9em;">MoVE: Translating Laughter and Tears via Mixture of Vocalization Experts in Speech-to-Speech Translation</em>'
    },
    'ds.overview.title': { en: 'Dataset Overview', zh: '資料集概覽' },
    'ds.overview.desc': {
      en: 'The <strong>MoVE Dataset</strong> is a large-scale expressive speech-to-speech translation (S2ST) dataset designed to advance research in emotion-preserving cross-lingual speech synthesis. Each sample consists of a <strong>parallel Chinese\u2013English audio pair</strong> produced with matching expressiveness, accompanied by the corresponding transcription text.',
      zh: '<strong>MoVE 資料集</strong>是一個大規模的表達性語音到語音翻譯（S2ST）資料集，旨在推進保留情感的跨語言語音合成研究。每個樣本由一對<strong>中英平行語音</strong>組成，具有匹配的表達性，並附有相應的轉錄文字。'
    },
    'ds.stat.hours': { en: 'Total Hours', zh: '總時數' },
    'ds.stat.pairs': { en: 'Parallel Pairs', zh: '平行語料對' },
    'ds.stat.emo': { en: 'Emotion Categories', zh: '情緒類別' },
    'ds.stat.lang': { en: 'Languages (ZH / EN)', zh: '語言（中／英）' },
    'ds.angry': {
      en: '<strong>Angry</strong> \u2014 speech delivered with frustration, annoyance, or intensity',
      zh: '<strong>憤怒</strong> \u2014 帶有沮喪、煩躁或強烈情緒的語音'
    },
    'ds.happy': {
      en: '<strong>Happy</strong> \u2014 cheerful, upbeat, joyful speech',
      zh: '<strong>快樂</strong> \u2014 愉快、開朗、歡樂的語音'
    },
    'ds.sad': {
      en: '<strong>Sad</strong> \u2014 melancholic, sorrowful, or subdued speech',
      zh: '<strong>悲傷</strong> \u2014 憂鬱、悲痛或低沉的語音'
    },
    'ds.laugh': {
      en: '<strong>Laugh</strong> \u2014 speech containing laughter or spoken in an amused manner',
      zh: '<strong>笑</strong> \u2014 包含笑聲或以愉悅方式說出的語音'
    },
    'ds.crying': {
      en: '<strong>Crying</strong> \u2014 speech with a weeping, sobbing, or distressed quality',
      zh: '<strong>哭</strong> \u2014 帶有哭泣、啜泣或痛苦特質的語音'
    },
    'ds.structure.title': { en: 'Dataset Structure', zh: '資料集結構' },
    'ds.structure.desc': {
      en: 'The released dataset follows the directory structure below. Each audio pair shares the same identifier across languages.',
      zh: '釋出的資料集遵循以下目錄結構。每對音訊在不同語言間共用相同的識別碼。'
    },
    'ds.meta.desc': {
      en: '<strong>metadata.tsv</strong> contains tab-separated columns: <code style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:0.82rem;">zh_path</code> <code style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:0.82rem;">en_path</code> <code style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:0.82rem;">zh_text</code> <code style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:0.82rem;">en_text</code> <code style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:0.82rem;">category</code>',
      zh: '<strong>metadata.tsv</strong> 包含以 tab 分隔的欄位：<code style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:0.82rem;">zh_path</code> <code style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:0.82rem;">en_path</code> <code style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:0.82rem;">zh_text</code> <code style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:0.82rem;">en_text</code> <code style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:0.82rem;">category</code>'
    },
    'ds.demos.title': { en: 'Audio Demos', zh: '音訊展示' },
    'ds.demos.desc': {
      en: 'Below are randomly sampled audio pairs from each expressiveness category. Each sample shows the Chinese and English audio along with available transcription text.',
      zh: '以下是從每個表達性類別中隨機取樣的音訊對。每個樣本顯示中文和英文音訊及可用的轉錄文字。'
    },
    'ds.audio.zh': { en: 'Chinese', zh: '中文' },
    'ds.audio.en': { en: 'English', zh: '英文' },
    'ds.release.text': {
      en: '<strong>Data Availability.</strong> The full dataset (~1,000 hours) will be publicly released upon the camera-ready version of our paper. A download link will be provided at that time. Stay tuned!',
      zh: '<strong>資料可用性。</strong>完整資料集（約 1,000 小時）將在論文最終版本發布後公開釋出。屆時會提供下載連結，敬請期待！'
    },
    'ds.cite.title': { en: 'Citation', zh: '引用' },
    'ds.cite.desc': { en: 'If you use this dataset in your research, please cite our paper:', zh: '如果您在研究中使用此資料集，請引用我們的論文：' },
    'ds.footer': { en: 'MoVE Dataset \u2014 Anonymous Submission \u00b7 2026', zh: 'MoVE 資料集 \u2014 匿名投稿 \u00b7 2026' },

    // ─── Model Comparison ────────────────────────────────────────
    'mc.title': { en: 'Model Comparison', zh: '模型效果比較' },
    'mc.desc': {
      en: 'Listen and compare speech outputs from different S2ST models across various emotion categories. Each row shows the same source utterance translated by each model.',
      zh: '聆聽並比較不同 S2ST 模型在各種情緒類別下的語音輸出。每一列展示同一段原始語音經由各模型翻譯的結果。'
    },
    'mc.loading': { en: 'Loading audio samples...', zh: '載入音訊樣本中...' },
    'mc.source': { en: 'Source', zh: '原始音訊' },
    'mc.model': { en: 'Model', zh: '模型' },
    'mc.sample': { en: 'Sample', zh: '樣本' },
  };

  // ── State ──
  let lang = localStorage.getItem(STORAGE_KEY) || 'en';

  function t(key) {
    const entry = T[key];
    if (!entry) return null;
    return entry[lang] || entry['en'];
  }

  function applyI18n() {
    // data-i18n → textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = t(el.dataset.i18n);
      if (val) el.textContent = val;
    });
    // data-i18n-html → innerHTML
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const val = t(el.dataset.i18nHtml);
      if (val) el.innerHTML = val;
    });
    // Update toggle button state
    const toggleEn = document.getElementById('i18n-en');
    const toggleZh = document.getElementById('i18n-zh');
    if (toggleEn && toggleZh) {
      toggleEn.classList.toggle('active', lang === 'en');
      toggleZh.classList.toggle('active', lang === 'zh');
    }
  }

  function setLang(newLang) {
    lang = newLang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyI18n();
  }

  // ── Inject toggle button ──
  function injectToggle() {
    const style = document.createElement('style');
    style.textContent = `
      .i18n-toggle {
        position: fixed;
        top: 14px;
        right: 14px;
        z-index: 9999;
        display: flex;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #e5e7eb;
        background: rgba(255,255,255,0.92);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        font-family: 'Inter', -apple-system, sans-serif;
        box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      }
      .i18n-toggle button {
        padding: 5px 12px;
        border: none;
        background: transparent;
        color: #8b8da3;
        font-size: 0.76rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s;
        font-family: inherit;
      }
      .i18n-toggle button.active {
        background: #4f46e5;
        color: #fff;
      }
      .i18n-toggle button:hover:not(.active) {
        color: #1d1d2c;
        background: rgba(0,0,0,0.03);
      }
    `;
    document.head.appendChild(style);

    const toggle = document.createElement('div');
    toggle.className = 'i18n-toggle';
    toggle.innerHTML = `
      <button id="i18n-en">EN</button>
      <button id="i18n-zh">中文</button>
    `;
    document.body.appendChild(toggle);

    document.getElementById('i18n-en').addEventListener('click', () => setLang('en'));
    document.getElementById('i18n-zh').addEventListener('click', () => setLang('zh'));
  }

  // ── Init ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { injectToggle(); applyI18n(); });
  } else {
    injectToggle();
    applyI18n();
  }

  // ── Public API ──
  window.i18n = { t, applyI18n, setLang, get lang() { return lang; } };
})();
