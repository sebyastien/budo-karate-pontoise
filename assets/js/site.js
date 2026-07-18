/* ASSOA Karaté — interactions */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* --- En-tête compact au défilement --- */
  var header = $('#siteHeader');
  var onScroll = function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    var toTop = $('#toTop');
    if (toTop) toTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Menu mobile --- */
  var nav = $('#nav'), burger = $('#navBurger'), overlay = $('#navOverlay'), closeBtn = $('#navClose');
  var openNav = function () {
    nav.classList.add('open'); overlay.hidden = false;
    burger.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden';
  };
  var closeNav = function () {
    nav.classList.remove('open'); overlay.hidden = true;
    burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  };
  if (burger) burger.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (overlay) overlay.addEventListener('click', closeNav);
  $$('.nav a').forEach(function (a) { a.addEventListener('click', closeNav); });

  /* --- Diaporama du hero --- */
  var slides = $$('.hero-slides img');
  if (slides.length > 1) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 5500);
  }

  /* --- Révélations + compteurs au défilement --- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      if (en.target.hasAttribute('data-count')) countUp(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 }) : null;

  if (io) { $$('.reveal, [data-count]').forEach(function (el) { io.observe(el); }); }
  else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0, dur = 1400, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.firstChild.nodeValue = Math.round(target * (0.5 - Math.cos(p * Math.PI) / 2)).toString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* --- Retour en haut --- */
  var toTop = $('#toTop');
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();
