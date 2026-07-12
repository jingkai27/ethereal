(function () {
  const STORAGE_KEY = 'ethereal-36-questions-state';

  const questionEl = document.getElementById('question');
  const progressEl = document.getElementById('progress');
  const drawBtn = document.getElementById('drawBtn');
  const resetBtn = document.getElementById('resetBtn');

  function shuffledIndices() {
    const indices = QUESTIONS.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.queue) || !Array.isArray(parsed.asked)) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  let state = loadState() || { queue: shuffledIndices(), asked: [] };

  function totalAsked() {
    return state.asked.length;
  }

  function showQuestion(text) {
    questionEl.classList.remove('is-visible');
    // force reflow so the animation replays each time
    void questionEl.offsetWidth;
    questionEl.textContent = text;
    questionEl.classList.add('is-visible');
  }

  function updateProgress() {
    const asked = totalAsked();
    if (asked === 0) {
      progressEl.textContent = 'before we begin';
    } else if (state.queue.length === 0) {
      progressEl.textContent = `question ${asked} of ${QUESTIONS.length} — the last one`;
    } else {
      progressEl.textContent = `question ${asked} of ${QUESTIONS.length}`;
    }
  }

  function draw() {
    if (state.queue.length === 0) return;
    const index = state.queue.pop();
    state.asked.push(index);
    saveState();
    updateProgress();
    showQuestion(QUESTIONS[index]);

    if (state.queue.length === 0) {
      drawBtn.disabled = true;
      drawBtn.querySelector('.draw-btn__label').textContent = 'All 36 Drawn';
      resetBtn.hidden = false;
      setTimeout(() => {
        showQuestion(QUESTIONS[index] + ' — that was the last one.');
      }, 2400);
    }
  }

  function reset() {
    state = { queue: shuffledIndices(), asked: [] };
    saveState();
    drawBtn.disabled = false;
    drawBtn.querySelector('.draw-btn__label').textContent = 'Draw a Question';
    resetBtn.hidden = true;
    updateProgress();
    showQuestion('Draw a question to begin the quiet.');
  }

  drawBtn.addEventListener('click', draw);
  resetBtn.addEventListener('click', reset);

  // restore UI to match any persisted state on load
  updateProgress();
  if (state.queue.length === 0 && totalAsked() > 0) {
    drawBtn.disabled = true;
    drawBtn.querySelector('.draw-btn__label').textContent = 'All 36 Drawn';
    resetBtn.hidden = false;
  }
})();
