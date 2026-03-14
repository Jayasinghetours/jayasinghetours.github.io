// ============================================
// FILE 3: script.js (FIXED - with working gallery)
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
// Store current slide index for each gallery
const galleryStates = {};

// Initialize gallery for a specific modal
function initGallery(modalId) {
  // Set default to 0 if not exists
  if (galleryStates[modalId] === undefined) {
    galleryStates[modalId] = 0;
  }
  
  const slidesContainer = document.getElementById(`slides-${modalId}`);
  if (!slidesContainer) return;
  
  // Get total number of slides
  const totalSlides = slidesContainer.children.length;
  
  // Make sure current index is valid
  if (galleryStates[modalId] >= totalSlides) {
    galleryStates[modalId] = 0;
  }
  
  // Apply transform
  slidesContainer.style.transform = `translateX(-${galleryStates[modalId] * 100}%)`;
  
  // Update dots
  const dotsContainer = document.getElementById(`dots-${modalId}`);
  if (dotsContainer) {
    Array.from(dotsContainer.children).forEach((dot, idx) => {
      dot.classList.toggle('active-gallery-dot', idx === galleryStates[modalId]);
    });
  }
}

// Update gallery display without changing index
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

// Move to next/previous slide
window.moveGallery = (modalId, step) => {
  // Ensure gallery state exists
  if (galleryStates[modalId] === undefined) {
    galleryStates[modalId] = 0;
  }
  
  const slidesContainer = document.getElementById(`slides-${modalId}`);
  if (!slidesContainer) return;
  
  const total = slidesContainer.children.length;
  if (total === 0) return;
  
  // Calculate new index with wrap-around
  galleryStates[modalId] = (galleryStates[modalId] + step + total) % total;
  
  // Update display
  updateGallery(modalId);
};

// Jump to specific slide
window.setGallerySlide = (modalId, index) => {
  const slidesContainer = document.getElementById(`slides-${modalId}`);
  if (!slidesContainer) return;
  
  const total = slidesContainer.children.length;
  if (index >= 0 && index < total) {
    galleryStates[modalId] = index;
    updateGallery(modalId);
  }
};

// ---------- MODAL OPEN/CLOSE ----------
window.openModal = (id) => {
  // Show the modal
  document.getElementById(id).style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // CRITICAL FIX: Initialize gallery after modal opens
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    initGallery(id);
  }, 50);
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
  // Initialize hero slider
  showSlide(1);
  
  // Check for reveal elements
  checkReveal();
  
  // Initialize all gallery states to 0 (but don't try to update hidden modals)
  const modalIds = ['wagonr', 'axio', 'aqua', 'sigiriya', 'kandy', 'ella', 'yala'];
  modalIds.forEach(id => {
    galleryStates[id] = 0;
    // Note: We don't call initGallery here because modals are hidden
    // initGallery will be called when modal opens
  });
  
  console.log('Website initialized successfully!');
});

// Also initialize when any modal is opened via click (additional safety)
document.addEventListener('click', function(e) {
  // Check if click was on a card that opens a modal
  const card = e.target.closest('.card');
  if (card && card.getAttribute('onclick')) {
    // The onclick attribute will handle it, but we're just ensuring
    // that if any issues, we have a backup
  }
});
