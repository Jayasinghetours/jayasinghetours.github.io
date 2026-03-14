// ============================================
// FILE 3: script.js (all JavaScript)
// ============================================

// ---------- HERO SLIDER ----------
let slideIndex = 1;
const slides = document.querySelectorAll('.hero-slider .slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  
  slides.forEach(s => s.classList.remove('active-slide'));
  dots.forEach(d => d.classList.remove('active-dot'));
  
  slides[slideIndex-1].classList.add('active-slide');
  dots[slideIndex-1].classList.add('active-dot');
}

// Make functions global for onclick attributes
window.changeSlide = (step) => {
  slideIndex += step;
  showSlide(slideIndex);
};

window.currentSlide = (n) => {
  slideIndex = n;
  showSlide(slideIndex);
};

// Auto-play every 6 seconds
setInterval(() => {
  window.changeSlide(1);
}, 6000);

// ---------- MODAL GALLERY MANAGEMENT ----------
const galleryStates = {};

function updateGallery(modalId) {
  const slidesContainer = document.getElementById(`slides-${modalId}`);
  if (!slidesContainer) return;
  
  slidesContainer.style.transform = `translateX(-${galleryStates[modalId] * 100}%)`;
  
  const dotsContainer = document.getElementById(`dots-${modalId}`);
  if (dotsContainer) {
    Array.from(dotsContainer.children).forEach((dot, idx) => {
      dot.classList.toggle('active-gallery-dot', idx === galleryStates[modalId]);
    });
  }
}

window.moveGallery = (modalId, step) => {
  if (galleryStates[modalId] === undefined) galleryStates[modalId] = 0;
  
  const slidesContainer = document.getElementById(`slides-${modalId}`);
  if (!slidesContainer) return;
  
  const total = slidesContainer.children.length;
  galleryStates[modalId] = (galleryStates[modalId] + step + total) % total;
  updateGallery(modalId);
};

window.setGallerySlide = (modalId, index) => {
  galleryStates[modalId] = index;
  updateGallery(modalId);
};

// ---------- MODAL OPEN/CLOSE ----------
window.openModal = (id) => {
  document.getElementById(id).style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Reset gallery to first slide
  galleryStates[id] = 0;
  updateGallery(id);
};

window.closeModal = (id) => {
  document.getElementById(id).style.display = 'none';
  document.body.style.overflow = 'auto';
};

// Close modal when clicking outside content
window.onclick = (event) => {
  const modalIds = ['wagonr', 'axio', 'aqua', 'sigiriya', 'kandy', 'ella', 'yala'];
  
  modalIds.forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
};

// ---------- SCROLL REVEAL ANIMATION ----------
const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
  const windowHeight = window.innerHeight;
  
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 90) {
      el.classList.add('active');
    }
  });
}

// Use requestAnimationFrame for performance
window.addEventListener('scroll', () => {
  requestAnimationFrame(checkReveal);
});

// ---------- INITIALIZATION ON PAGE LOAD ----------
window.addEventListener('load', () => {
  showSlide(1);
  checkReveal();
  
  // Initialize all gallery states to 0
  const modalIds = ['wagonr', 'axio', 'aqua', 'sigiriya', 'kandy', 'ella', 'yala'];
  modalIds.forEach(id => {
    galleryStates[id] = 0;
    // Ensure first gallery dot is active (visual only, transform will be set on open)
  });
});
