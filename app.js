// ── DARK / LIGHT MODE TOGGLE ──
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('themeIcon');
  const current = html.getAttribute('data-theme');

  if (current === 'dark') {
    html.setAttribute('data-theme', 'light');
    icon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    icon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

// Sayfa yüklendiğinde kayıtlı temayı uygula
(function applyStoredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.textContent = stored === 'light' ? '🌙' : '☀️';
    }
  }
})();

// ── KARAKTER SAYACI ──
function updateCounter(textarea) {
  const counter = document.getElementById('charCounter');
  if (!counter) return;
  const remaining = 280 - textarea.value.length;
  counter.textContent = remaining;
  counter.className = 'compose-counter';
  if (remaining <= 20 && remaining > 0) {
    counter.classList.add('warning');
  } else if (remaining <= 0) {
    counter.classList.add('danger');
  }
}

// ── TWEET GÖNDER ──
function sendTweet() {
  const textarea = document.getElementById('composeText');
  const counter = document.getElementById('charCounter');
  if (!textarea) return;
  const text = textarea.value.trim();
  if (!text) return;

  const list = document.getElementById('tweetList');
  if (!list) return;

  const newCard = document.createElement('article');
  newCard.className = 'tweet-card';
  newCard.innerHTML = `
    <div class="tweet-avatar-col">
      <img src="img/twitter-profil.jpg" alt="Ben" class="tweet-avatar" />
    </div>
    <div class="tweet-content">
      <div class="tweet-header">
        <span class="tweet-name">Melitto</span>
        <span class="tweet-handle">@mükemelitto</span>
        <span class="tweet-dot">·</span>
        <span class="tweet-time">şimdi</span>
        <button class="tweet-more-btn">···</button>
      </div>
      <div class="tweet-text">${escapeHtml(text)}</div>
      <div class="tweet-actions">
        <button class="tweet-action-btn reply-btn" onclick="handleReply(this)">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>0</span>
        </button>
        <button class="tweet-action-btn retweet-btn" onclick="handleRetweet(this)">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          <span>0</span>
        </button>
        <button class="tweet-action-btn like-btn" onclick="handleLike(this)">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span>0</span>
        </button>
        <button class="tweet-action-btn">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span>0</span>
        </button>
        <button class="tweet-action-btn">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>
    </div>
  `;

  list.insertBefore(newCard, list.firstChild);

  textarea.value = '';
  if (counter) {
    counter.textContent = '280';
    counter.className = 'compose-counter';
  }
}

// ── BEĞENİ ──
function handleLike(btn) {
  const span = btn.querySelector('span');
  const count = parseInt(span.textContent.replace(/[^0-9]/g, '')) || 0;
  if (btn.classList.contains('liked')) {
    btn.classList.remove('liked');
    span.textContent = Math.max(0, count - 1);
  } else {
    btn.classList.add('liked');
    span.textContent = count + 1;
  }
}

// ── RETWEET ──
function handleRetweet(btn) {
  const span = btn.querySelector('span');
  const count = parseInt(span.textContent) || 0;
  if (btn.classList.contains('retweeted')) {
    btn.classList.remove('retweeted');
    btn.style.color = '';
    span.textContent = Math.max(0, count - 1);
  } else {
    btn.classList.add('retweeted');
    btn.style.color = 'var(--color-retweet)';
    span.textContent = count + 1;
  }
}

// ── YANIT ──
function handleReply(btn) {

}

// ── PROFİL SEKMELERİ ──
function switchProfileTab(clickedTab, tabName) {
  const allTabs = document.querySelectorAll('.profile-tab');
  allTabs.forEach(t => t.classList.remove('active'));
  clickedTab.classList.add('active');
}

// ── FEED SEKMELERİ ──
document.querySelectorAll('.feed-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── MEVCUT TWEET AKSİYONLARINA EVENT DELEGATION ──
document.addEventListener('click', function (e) {
  const likeBtn = e.target.closest('.like-btn');
  const retweetBtn = e.target.closest('.retweet-btn');

  if (likeBtn && !likeBtn.hasAttribute('onclick') && !e.target.closest('.compose-area')) {
    handleLike(likeBtn);
  }
  if (retweetBtn && !retweetBtn.hasAttribute('onclick')) {
    handleRetweet(retweetBtn);
  }
});

// ── HTML ESCAPE ──
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');
}