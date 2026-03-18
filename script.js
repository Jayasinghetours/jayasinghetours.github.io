// ==========================================
// PRELOADER LOGIC
// ==========================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // 1.5 seconds thiyanawa lassanata pennanna
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ==========================================
// HERO SLIDER LOGIC
// ==========================================
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let sliderInterval;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active-slide'));
  dots.forEach(d => d.classList.remove('active-dot'));
  if(slides[index]) slides[index].classList.add('active-slide');
  if(dots[index]) dots[index].classList.add('active-dot');
}

function nextSlide() {
  if(slides.length === 0) return;
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

sliderInterval = setInterval(nextSlide, 5000);

window.currentSlide = function(index) {
  clearInterval(sliderInterval); 
  slideIndex = index;
  showSlide(slideIndex);
  sliderInterval = setInterval(nextSlide, 5000); 
};

// ==========================================
// MODAL & GALLERY LOGIC
// ==========================================
const galleryState = {};

window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
    galleryState[id] = 0;
    const track = document.getElementById(`track-${id}`);
    if(track) track.style.transform = `translateX(0%)`;
  }
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
  }
};

window.moveModalGallery = function(modalId, step) {
  const track = document.getElementById(`track-${modalId}`);
  if(!track) return;
  const totalImages = track.children.length;
  galleryState[modalId] = (galleryState[modalId] + step + totalImages) % totalImages;
  track.style.transform = `translateX(-${galleryState[modalId] * 100}%)`;
};

// ==========================================
// WHATSAPP BOOKING LOGIC
// ==========================================
window.sendBooking = function(event) {
  event.preventDefault(); 
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const service = document.getElementById('service').value;
  
  const whatsappMessage = `Hello Jayasinghe Tours!%0A%0AI would like to inquire:%0A*Name:* ${name}%0A*Date:* ${date}%0A*Selected:* ${service}`;
  const phone = "94787077007";
  window.open(`https://wa.me/${phone}?text=${whatsappMessage}`, '_blank');
};

// ==========================================
// SCROLL REVEAL
// ==========================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
