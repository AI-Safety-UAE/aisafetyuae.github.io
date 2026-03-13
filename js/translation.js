// ============================================================
//  AI Safety UAE — Translation Engine  (js/translation.js)
//  Reads from LANG_EN (en.js) and LANG_AR (ar.js)
// ============================================================

(function () {

  function getLang() {
    return localStorage.getItem('preferredLanguage') || 'en';
  }
  function setLang(lang) {
    localStorage.setItem('preferredLanguage', lang);
  }

  function getStrings(lang) {
    if (lang === 'ar' && typeof LANG_AR !== 'undefined') return LANG_AR;
    if (typeof LANG_EN !== 'undefined') return LANG_EN;
    return {};
  }

  function applyTranslations(lang) {
    var strings = getStrings(lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (strings[key] !== undefined) el.textContent = strings[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (strings[key] !== undefined) el.setAttribute('placeholder', strings[key]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (strings[key] !== undefined) el.setAttribute('aria-label', strings[key]);
    });
  }

  function applyDirection(lang) {
    var html = document.documentElement;
    if (lang === 'ar') {
      html.setAttribute('lang', 'ar');
      html.setAttribute('dir', 'rtl');
      document.body.classList.add('lang-ar');
      document.body.classList.remove('lang-en');
    } else {
      html.setAttribute('lang', 'en');
      html.setAttribute('dir', 'ltr');
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-ar');
    }
  }

  function updateLangButton(lang) {
    var btn = document.getElementById('currentLang');
    if (btn) btn.textContent = lang === 'ar' ? 'العربية' : 'English';
  }

  function renderLanguage(lang) {
    applyDirection(lang);
    applyTranslations(lang);
    updateLangButton(lang);
  }

  window.setLanguage = function (lang) {
    setLang(lang);
    renderLanguage(lang);
    var menu = document.getElementById('langMenu');
    if (menu) menu.classList.add('hidden');
  };

  window.toggleLanguageMenu = function () {
    var menu = document.getElementById('langMenu');
    if (menu) menu.classList.toggle('hidden');
  };

  document.addEventListener('click', function (e) {
    var menu   = document.getElementById('langMenu');
    var button = document.getElementById('langButton');
    if (menu && button && !button.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });

  // Re-run translations after header is injected
  document.addEventListener('headerLoaded', function () {
    renderLanguage(getLang());
    var langButton = document.getElementById('langButton');
    if (langButton) {
      langButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleLanguageMenu();
      });
    }
  });

  // Re-run translations after footer is injected
  document.addEventListener('footerLoaded', function () {
    renderLanguage(getLang());
  });

  function boot() {
    document.body.style.visibility = 'visible';
    renderLanguage(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
