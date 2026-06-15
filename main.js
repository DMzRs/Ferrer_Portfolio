// ── Image Modal ──
const certModal = document.getElementById('cert-modal');
const certModalImg = document.getElementById('cert-modal-img');

function openModal(src, alt) {
  certModalImg.src = src;
  certModalImg.alt = alt;
  certModal.classList.add('open');
}

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const fullSrc = card.getAttribute('data-cert-full');
    const img = card.querySelector('.cert-photo');
    openModal(fullSrc || img.src, img.alt);
  });
});

document.querySelectorAll('[data-modal-trigger]').forEach(el => {
  el.addEventListener('click', () => {
    const img = el.querySelector('img');
    if (img) openModal(img.src, img.alt);
  });
});

certModal.addEventListener('click', e => {
  if (e.target === certModal) {
    certModal.classList.remove('open');
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') certModal.classList.remove('open');
});

// ── Navbar scroll style ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ── Active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${e.target.id}` ? '#F0F0F0' : '';
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

// ── Carousel ──
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('[data-track]');
  const prevBtn = carousel.querySelector('[data-prev]');
  const nextBtn = carousel.querySelector('[data-next]');
  const dotsContainer = carousel.querySelector('[data-dots]');
  const slides = track.querySelectorAll('img');
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  prevBtn.addEventListener('click', e => {
    e.stopPropagation();
    goTo(index - 1);
  });

  nextBtn.addEventListener('click', e => {
    e.stopPropagation();
    goTo(index + 1);
  });

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.addEventListener('click', e => {
      e.stopPropagation();
      goTo(i);
    });
    dotsContainer.appendChild(dot);
  });

  if (slides.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  update();
});
