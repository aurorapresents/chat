/* script.js — main logic for Aurora offline chat */

(() => {
  // DOM elements
  const chatLog = document.getElementById('chatLog');
  const userInput = document.getElementById('userInput');
  const inputForm = document.getElementById('inputForm');
  const sendBtn = document.getElementById('sendBtn');
  const quickButtons = document.querySelectorAll('.quick');
  const clearBtn = document.getElementById('clearBtn');
  const themeBtns = document.querySelectorAll('.theme-btn');

  // Ensure KB exists
  if (typeof AURORA_KB === 'undefined') {
    console.error('AURORA_KB not loaded. Make sure data.js is included.');
    appendBot('Error: Knowledge base missing. Please include data.js', true);
    return;
  }

  // Utility: sanitize and normalize text
  function norm(text) {
    return String(text).toLowerCase().replace(/[^\w\s]/g, '').trim();
  }

  // Add message helper
  function appendMessage(text, cls = 'bot', instant = false) {
    const el = document.createElement('div');
    el.className = `msg ${cls}`;
    if (instant) {
      el.textContent = text;
      chatLog.appendChild(el);
      scrollToBottom();
      return el;
    }

    // animated typing-like insertion
    const typingEl = document.createElement('div');
    typingEl.className = 'msg bot';
    typingEl.setAttribute('data-typing', 'true');

    // show three dots first
    typingEl.innerHTML = '<span class="typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>';
    chatLog.appendChild(typingEl);
    scrollToBottom();

    // simulate "thinking" time proportional to text length (min 400ms)
    const delay = Math.min(1400 + text.length * 6, 2600);
    setTimeout(() => {
      typingEl.removeAttribute('data-typing');
      typingEl.innerHTML = ''; // clear dots
      // type text char by char
      let i = 0;
      function typeChar() {
        typingEl.textContent += text.charAt(i);
        i++;
        scrollToBottom();
        if (i < text.length) {
          setTimeout(typeChar, 20);
        }
      }
      typeChar();
    }, delay);
    return typingEl;
  }

  function appendUser(text) {
    const el = document.createElement('div');
    el.className = 'msg user';
    el.textContent = text;
    chatLog.appendChild(el);
    scrollToBottom();
  }

  function appendBot(text, instant = false) {
    appendMessage(text, 'bot', instant);
  }

  function scrollToBottom() {
    // smooth scroll
    chatLog.scrollTo({ top: chatLog.scrollHeight + 200, behavior: 'smooth' });
  }

  // Matching logic: finds a KB key where every word from key is included in message OR vice versa
  function findKey(message) {
    const msg = norm(message);
    // direct includes
    for (const key of Object.keys(AURORA_KB)) {
      const nk = norm(key);
      if (msg.includes(nk) || nk.includes(msg)) return key;
    }
    // partial match: check words overlap
    const msgWords = new Set(msg.split(/\s+/));
    let best = null;
    let bestScore = 0;
    for (const key of Object.keys(AURORA_KB)) {
      const kw = norm(key).split(/\s+/);
      let score = 0;
      for (const w of kw) {
        if (msgWords.has(w)) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        best = key;
      }
    }
    // require at least one matching token
    return bestScore > 0 ? best : null;
  }

  // Choose random response for key
  function getResponseFor(key) {
    const arr = AURORA_KB[key];
    if (!arr) return AURORA_FALLBACKS[Math.floor(Math.random() * AURORA_FALLBACKS.length)];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // handle incoming message
  function handleMessage(raw) {
    const text = (raw || '').trim();
    if (!text) return;
    appendUser(text);
    // find key
    const key = findKey(text);
    if (key) {
      const reply = getResponseFor(key);
      appendBot(reply);
    } else {
      // fallback: try to find by tokens (e.g., "materials", "what is")
      const fallbackMap = {
        'material': ['materials required', 'materials required', 'materials required'],
        'what': ['what is ai waste separator', 'introduction'],
        'how': ['how it works'],
        'future': ['future scope'],
        'objective': ['objectives']
      };
      let handled = false;
      for (const token in fallbackMap) {
        if (norm(text).includes(token)) {
          const k = fallbackMap[token][0];
          const reply = getResponseFor(k);
          appendBot(reply);
          handled = true;
          break;
        }
      }
      if (!handled) {
        // default fallback
        const fallback = AURORA_FALLBACKS[Math.floor(Math.random() * AURORA_FALLBACKS.length)];
        appendBot(fallback);
      }
    }
  }

  // form submit
  inputForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const val = userInput.value;
    if (!val) return;
    userInput.value = '';
    handleMessage(val);
  });

  // quick buttons
  quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-q');
      userInput.value = '';
      handleMessage(q);
    });
  });

  // send on Enter handled by form submit, but add explicit Enter handler to prevent newline
  userInput.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      inputForm.requestSubmit();
    }
  });

  // clear chat
  clearBtn.addEventListener('click', () => {
    chatLog.innerHTML = '';
    appendBot("Hello! I'm Aurora 💫 — your offline AI helper for the Waste Separator Project. How can I assist you today?");
  });

  // initialize: seed initial message if empty
  if (chatLog.children.length === 0) {
    appendBot("Hello! I'm Aurora 💫 — your offline AI helper for the Waste Separator Project. How can I assist you today?");
  }

  // theme handling & persistence
  function applyTheme(theme) {
    document.body.classList.remove('theme-dark','theme-light','theme-pink','theme-blue');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('aurora-theme', theme);
  }
  themeBtns.forEach(b => {
    b.addEventListener('click', () => {
      const t = b.getAttribute('data-theme');
      applyTheme(t);
    });
  });
  // apply saved theme
  const saved = localStorage.getItem('aurora-theme') || 'dark';
  applyTheme(saved);

  // accessible focus
  userInput.focus();
})();
