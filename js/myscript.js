// ========================================
// 東京福祉不動産 - JavaScript
// jQuery依存を削除し、バニラJSで実装
// ========================================

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', function () {
  initHamburgerMenu();
  initFixedFooter();
  initFadeTransition();
  initPageTransition();
  initScrollAnimation();
  initFAQAccordion();
});

// ========================================
// ハンバーガーメニュー
// ========================================
function initHamburgerMenu() {
  const openBtn = document.querySelector('.openbtn1');
  const gNav = document.getElementById('g-nav');
  const circleBg = document.querySelector('.circle-bg');
  const navLinks = document.querySelectorAll('#g-nav a');

  if (!openBtn) return;

  // ハンバーガーボタンクリック
  openBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    gNav.classList.toggle('panelactive');
    circleBg.classList.toggle('circleactive');
  });

  // ナビゲーションリンククリック時にメニューを閉じる
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      openBtn.classList.remove('active');
      gNav.classList.remove('panelactive');
      circleBg.classList.remove('circleactive');
    });
  });
}

// ========================================
// 固定フッター（スクロールで表示）
// ========================================
function initFixedFooter() {
  const fixedFooter = document.querySelector('.fixedfooter');
  if (!fixedFooter) return;

  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const height = window.innerHeight;
        if (window.scrollY > height) {
          fixedFooter.classList.add('show');
        } else {
          fixedFooter.classList.remove('show');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ========================================
// 遷移アニメーション（フェードイン）
// ========================================
function initFadeTransition() {
  const removeFadeout = function () {
    document.body.classList.remove('fadeout');
  };

  // ページ読み込み完了時にフェードアウトクラスを削除
  window.addEventListener('load', removeFadeout);

  // フェイルセーフ: 読み込みが遅い場合でも3秒後には必ず表示
  setTimeout(removeFadeout, 3000);
}

// ========================================
// ページ遷移アニメーション
// ========================================
function initPageTransition() {
  const links = document.querySelectorAll('a:not([href^="#"]):not([target])');

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const url = this.getAttribute('href');

      // 空のhrefや現在のページへのリンクはスキップ
      if (!url || url === '' || url === window.location.pathname) {
        return;
      }

      // 外部リンクはスキップ
      if (url.startsWith('http') || url.startsWith('//')) {
        return;
      }

      e.preventDefault();
      document.body.classList.add('fadeout');

      setTimeout(function () {
        window.location = url;
      }, 800);
    });
  });
}

// ========================================
// スクロールアニメーション（Intersection Observer）
// ========================================
function initScrollAnimation() {
  const animateElements = document.querySelectorAll('.scroll-animate');

  if (animateElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // 一度表示したら監視を解除（パフォーマンス向上）
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(function (element) {
    observer.observe(element);
  });
}

// ========================================
// FAQアコーディオン
// ========================================
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length === 0) return;

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function () {
      // 他のアイテムを閉じる
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // クリックしたアイテムをトグル
      item.classList.toggle('active');
    });
  });
}

// ========================================
// スムーススクロール（アンカーリンク用）
// ========================================
document.addEventListener('click', function (e) {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;

  const href = target.getAttribute('href');
  if (href === '#') return;

  const element = document.querySelector(href);
  if (!element) return;

  e.preventDefault();

  const headerHeight = document.querySelector('header').offsetHeight || 0;
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
});
