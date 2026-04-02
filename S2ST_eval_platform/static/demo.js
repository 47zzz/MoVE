/**
 * demo.js
 * Logic for fetching and rendering S2ST data
 */

let allSets = [];
let groupedData = {}; // { emotionName: [ sets... ] }
let activeEmotion = null;

// Audio player management
let activeAudio = null;
let activePlayBtn = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('static/data_manifest.json');
    if (!res.ok) throw new Error('Network response was not ok');

    const manifest = await res.json();
    // Support both { sets: [...] } wrapper and flat array
    const rawSets = manifest.sets || manifest;

    // Fix audio paths: ../data/ -> data/ (for static serving from root)
    allSets = rawSets.map(s => ({
      ...s,
      source: s.source ? s.source.replace(/^\.\.\//, '') : s.source,
      models: Object.fromEntries(
        Object.entries(s.models).map(([k, v]) => [k, v.replace(/^\.\.\//, '')])
      )
    }));

    if (allSets.length === 0) {
      showError("No data sets found.");
      return;
    }
    
    processData();
    renderNav();
    
    // Select the first emotion by default
    const firstEmotion = Object.keys(groupedData)[0];
    if (firstEmotion) {
      selectEmotion(firstEmotion);
    }
    
    hideLoading();
    
  } catch (err) {
    console.error('Error fetching data:', err);
    showError();
  }
});

function processData() {
  allSets.forEach(set => {
    // Group strictly by emotion string
    if (!groupedData[set.emotion]) {
      groupedData[set.emotion] = [];
    }
    groupedData[set.emotion].push(set);
  });
}

function renderNav() {
  const navContainer = document.getElementById('emotion-nav');
  navContainer.innerHTML = '';
  
  const emotions = Object.keys(groupedData).sort();
  
  emotions.forEach(emo => {
    const btn = document.createElement('button');
    btn.className = 'emotion-tab';
    btn.textContent = emo;
    btn.dataset.emotion = emo;
    
    btn.addEventListener('click', () => {
      // Remove active class from all
      document.querySelectorAll('.emotion-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectEmotion(emo);
    });
    
    navContainer.appendChild(btn);
  });
}

function selectEmotion(emo) {
  activeEmotion = emo;
  // Update nav UI if called programmatically
  const btn = document.querySelector(`.emotion-tab[data-emotion="${emo}"]`);
  if (btn) btn.classList.add('active');
  
  renderSets(groupedData[emo] || []);
}

function renderSets(sets) {
  const container = document.getElementById('content-area');
  container.innerHTML = '';
  
  if (sets.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted); padding: 2rem;">No data available for this emotion.</p>';
    return;
  }
  
  sets.forEach((set, index) => {
    const card = document.createElement('div');
    card.className = 'set-card';
    card.style.animation = `fadeUp 0.4s ease ${index * 0.05}s both`;
    
    const header = document.createElement('div');
    header.className = 'set-header';
    header.innerHTML = `
      <div class="set-title">Set: ${set.set.replace('set_', '')}</div>
      <div class="set-badge">${set.emotion}</div>
    `;
    card.appendChild(header);
    
    const grid = document.createElement('div');
    grid.className = 'audio-grid';
    
    // Render source first if available
    if (set.source) {
      grid.appendChild(createPlayerElement('Source Audio', set.source, true));
    }
    
    // Render the rest of the models
    const modelNames = Object.keys(set.models).sort();
    modelNames.forEach(modelName => {
      // Format model name for display (e.g. gen_openai -> OpenAI)
      const displayLabel = formatModelName(modelName);
      grid.appendChild(createPlayerElement(displayLabel, set.models[modelName], false, modelName));
    });
    
    card.appendChild(grid);
    container.appendChild(card);
  });
}

function formatModelName(raw) {
  let name = raw.replace(/^gen_/, ''); // remove gen_ prefix
  
  // Custom nice formatting
  const map = {
    'openai': 'OpenAI',
    'cascaded': 'Cascaded Baseline',
    'MoE_top5_attention': 'MoE (Top 5 Attention)',
    'ours_100hr': 'Ours (100hr)',
    'seamlessm4t': 'SeamlessM4T',
    'kimi_instruct': 'Kimi Instruct',
    'expressive': 'Expressive Model'
  };
  
  return map[name] || name.replace(/_/g, ' ');
}

// Custom Player Creation
function createPlayerElement(label, url, isSource = false, rawName = '') {
  const wrap = document.createElement('div');
  wrap.className = `player-item ${isSource ? 'source-item' : ''}`;
  
  const iconHtml = isSource 
    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`
    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  wrap.innerHTML = `
    <div class="player-info">
      <div class="player-label" style="${!isSource ? 'color: var(--text-muted);' : ''}">
        ${iconHtml}
        ${isSource ? 'Source' : 'Model'}
      </div>
      <div class="model-name" title="${label}">${label}</div>
    </div>
    
    <div class="custom-audio-wrapper">
      <button class="play-btn">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      </button>
      
      <div class="timeline">
        <div class="timeline-progress">
           <div class="timeline-thumb"></div>
        </div>
      </div>
      
      <div class="time-display">0:00</div>
    </div>
  `;
  
  setupAudioLogic(wrap, url);
  return wrap;
}

function setupAudioLogic(wrapper, url) {
  const audio = new Audio(url);
  const playBtn = wrapper.querySelector('.play-btn');
  const btnIcon = playBtn.querySelector('svg');
  const timeline = wrapper.querySelector('.timeline');
  const progress = wrapper.querySelector('.timeline-progress');
  const timeDisplay = wrapper.querySelector('.time-display');
  
  const playIcon = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
  const pauseIcon = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
  const replayIcon = `<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>`;

  // Helper formatting
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Update time display when metadata loads
  audio.addEventListener('loadedmetadata', () => {
    timeDisplay.textContent = formatTime(audio.duration);
  });

  // Time update for progress bar
  audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    timeDisplay.textContent = formatTime(audio.currentTime);
  });

  // Handle Play/Pause
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      // If another audio is playing, pause it and reset its UI
      if (activeAudio && activeAudio !== audio) {
        activeAudio.pause();
        if (activePlayBtn) {
          activePlayBtn.innerHTML = playIcon;
          activePlayBtn.closest('.player-item').style.borderColor = 'transparent';
        }
      }
      
      // Play this audio
      audio.play().catch(e => console.error("Error playing audio:", e));
      btnIcon.innerHTML = pauseIcon;
      wrapper.style.borderColor = 'var(--accent-glow)';
      
      activeAudio = audio;
      activePlayBtn = btnIcon;
    } else {
      audio.pause();
      btnIcon.innerHTML = playIcon;
      wrapper.style.borderColor = 'transparent';
      activeAudio = null;
      activePlayBtn = null;
    }
  });

  // Reset icon when audio ends naturally
  audio.addEventListener('ended', () => {
    btnIcon.innerHTML = replayIcon;
    wrapper.style.borderColor = 'transparent';
    progress.style.width = '100%';
    activeAudio = null;
    activePlayBtn = null;
  });

  // Click on timeline to seek
  timeline.addEventListener('click', (e) => {
    const rect = timeline.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    
    if (audio.duration) {
      audio.currentTime = (clickX / width) * audio.duration;
    }
  });
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

function showError(msg) {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'none';
  
  const errContainer = document.getElementById('error-state');
  errContainer.style.display = 'flex';
  if (msg) {
    errContainer.querySelector('p').textContent = msg;
  }
}

// Add keyframes for fadeUp
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);
