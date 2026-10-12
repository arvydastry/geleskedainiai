/* Demo interakcijos: reveal, header, meniu, krepšelis/norų sąrašas (tik demonstracijai), parduotuvės filtrai */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveal on scroll */
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6%' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* Sticky header shadow */
  var header = document.getElementById('header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile nav */
  var tg = document.querySelector('[data-nav-toggle]');
  if (tg) tg.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open'); tg.setAttribute('aria-expanded', open);
  });

  /* Toast */
  var toast = document.querySelector('[data-toast]'), tt;
  function say(msg) { toast.textContent = msg; toast.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('is-on'); }, 2200); }

  /* Cart & wishlist counters (demo) */
  var cart = 0, wish = 0;
  var cc = document.querySelector('[data-cart-count]'), wc = document.querySelector('[data-wish-count]');
  document.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]');
    if (add) {
      e.preventDefault(); cart++; cc.textContent = cart;
      cc.classList.add('bump'); setTimeout(function () { cc.classList.remove('bump'); }, 450);
      add.classList.add('is-added'); add.textContent = 'Pridėta ✓';
      setTimeout(function () { add.classList.remove('is-added'); add.textContent = 'Į krepšelį'; }, 1600);
      say('Prekė pridėta į krepšelį');
    }
    var w = e.target.closest('[data-wish]');
    if (w) {
      e.preventDefault(); var on = w.classList.toggle('is-on'); wish += on ? 1 : -1; wc.textContent = wish;
      say(on ? 'Pridėta į norų sąrašą' : 'Pašalinta iš norų sąrašo');
    }
    if (e.target.closest('[data-filters-toggle]')) document.body.classList.toggle('filters-open');
  });
  document.querySelectorAll('[data-demo-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); say('Ačiū! Tai demonstracinė forma.'); f.reset(); });
  });

  /* Shop filters & sorting */
  var grid = document.querySelector('[data-grid]');
  if (!grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
  var empty = document.querySelector('[data-empty]'), count = document.querySelector('[data-count]');
  var cats = Array.prototype.slice.call(document.querySelectorAll('input[name=cat]'));
  var sw = Array.prototype.slice.call(document.querySelectorAll('[data-color]'));
  var tags = Array.prototype.slice.call(document.querySelectorAll('[data-tag]'));
  var pr = document.querySelector('[data-price-max]'), pl = document.querySelector('[data-price-label]');
  var sort = document.querySelector('[data-sort]');

  function apply() {
    var c = cats.filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
    var cols = sw.filter(function (b) { return b.classList.contains('is-on'); }).map(function (b) { return b.dataset.color; });
    var tg = tags.filter(function (b) { return b.classList.contains('is-on'); }).map(function (b) { return b.dataset.tag; });
    var max = pr ? +pr.value : 1e9, n = 0;
    cards.forEach(function (k) {
      var kc = k.dataset.color.split(' '), kt = (k.dataset.tags || '').split(' ');
      var ok = (!c.length || c.indexOf(k.dataset.cat) > -1)
        && (!cols.length || cols.some(function (x) { return kc.indexOf(x) > -1; }))
        && (!tg.length || tg.some(function (x) { return kt.indexOf(x) > -1; }))
        && (+k.dataset.price <= max);
      k.hidden = !ok; if (ok) n++;
    });
    count.textContent = n; empty.hidden = n > 0;
    var v = sort ? sort.value : 'pop';
    cards.slice().sort(function (a, b) {
      if (v === 'asc') return a.dataset.price - b.dataset.price;
      if (v === 'desc') return b.dataset.price - a.dataset.price;
      if (v === 'new') return b.dataset.date.localeCompare(a.dataset.date);
      return a.dataset.order - b.dataset.order;
    }).forEach(function (k) { grid.appendChild(k); });
  }
  cats.forEach(function (i) { i.addEventListener('change', apply); });
  sw.forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('is-on'); apply(); }); });
  tags.forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('is-on'); apply(); }); });
  if (pr) pr.addEventListener('input', function () { pl.textContent = pr.value + ' €'; apply(); });
  if (sort) sort.addEventListener('change', apply);
  var reset = document.querySelector('[data-filter-reset]');
  if (reset) reset.addEventListener('click', function () {
    cats.forEach(function (i) { i.checked = false; });
    sw.concat(tags).forEach(function (b) { b.classList.remove('is-on'); });
    if (pr) { pr.value = pr.max; pl.textContent = pr.max + ' €'; }
    if (sort) sort.value = 'pop';
    apply();
  });
  var h = location.hash.replace('#', '');
  var hc = cats.filter(function (i) { return i.value === h; })[0];
  if (hc) { hc.checked = true; apply(); }
})();
