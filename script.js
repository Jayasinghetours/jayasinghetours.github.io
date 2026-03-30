// ==========================================
// PRELOADER LOGIC
// ==========================================
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.opacity !== '0') {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}
window.addEventListener('load', hidePreloader);
setTimeout(hidePreloader, 4000); // 4s failsafe

// ==========================================
// 0. MOBILE MENU TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
  });

  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
}

// ==========================================
// 1. HERO SLIDER LOGIC
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
// 2. MODAL & INNER GALLERY LOGIC (WITH AUTO-PLAY)
// ==========================================
const galleryState = {};
let modalAutoPlay; // Auto play timer eka

window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
    
    galleryState[id] = 0;
    const track = document.getElementById(`track-${id}`);
    if(track) {
      track.style.transform = `translateX(0%)`;
    }

    // Modal eka open kalama thappara 3n 3ta slide wenna patan gannawa
    clearInterval(modalAutoPlay);
    modalAutoPlay = setInterval(() => {
        window.moveModalGallery(id, 1);
    }, 3000);
  }
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
    
    // Modal eka close kalama auto play eka nawathinawa
    clearInterval(modalAutoPlay); 
  }
};

window.moveModalGallery = function(modalId, step) {
  if(galleryState[modalId] === undefined) {
    galleryState[modalId] = 0;
  }
  
  const track = document.getElementById(`track-${modalId}`);
  if(!track) return;
  
  const totalImages = track.children.length;
  galleryState[modalId] += step;
  
  if (galleryState[modalId] >= totalImages) {
    galleryState[modalId] = 0;
  }
  if (galleryState[modalId] < 0) {
    galleryState[modalId] = totalImages - 1;
  }
  
  track.style.transform = `translateX(-${galleryState[modalId] * 100}%)`;

  // Kenek manully arrow eka click kaloth, timer eka reset wenawa
  clearInterval(modalAutoPlay);
  modalAutoPlay = setInterval(() => {
      window.moveModalGallery(modalId, 1);
  }, 3000);
};

window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Eliya click karala close kalath auto play eka nawathinawa
    clearInterval(modalAutoPlay);
  }
};

// ==========================================
// 3. BOOKING FORM LOGIC (EMAIL + WHATSAPP)
// ==========================================

// Email submit button - opens mail client with booking details
window.sendBooking = function(event) {
  event.preventDefault();

  const name    = document.getElementById('name').value;
  const date    = document.getElementById('date').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  const subject = encodeURIComponent(`Booking Inquiry - ${service}`);
  const body    = encodeURIComponent(
    `Hello Jayasinghe Tours,\n\n` +
    `Name: ${name}\n` +
    `Date: ${date}\n` +
    `Service: ${service}\n` +
    `Additional Details: ${message || 'None'}\n\n` +
    `Please confirm availability. Thank you.`
  );

  window.location.href = `mailto:booking@jayasinghetours.com?subject=${subject}&body=${body}`;
};

// WhatsApp booking button — update link dynamically based on form values
function updateWhatsAppBookingLink() {
  const btn     = document.getElementById('whatsapp-booking-btn');
  if (!btn) return;
  const name    = (document.getElementById('name')?.value    || '').trim();
  const date    = (document.getElementById('date')?.value    || '').trim();
  const service = (document.getElementById('service')?.value || '').trim();
  const message = (document.getElementById('message')?.value || '').trim();

  let msg = 'Hi, I want to make a booking inquiry.';
  if (service) {
    msg = `*New Booking Inquiry*%0A%0A` +
          `*Name:* ${encodeURIComponent(name || 'N/A')}%0A` +
          `*Date:* ${encodeURIComponent(date || 'N/A')}%0A` +
          `*Service:* ${encodeURIComponent(service)}%0A` +
          `*Notes:* ${encodeURIComponent(message || 'No additional notes')}%0A%0A` +
          `Please confirm. Thank you!`;
  }
  btn.href = `https://wa.me/94787077007?text=${msg}`;
}

// Attach listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  ['name','date','service','message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateWhatsAppBookingLink);
    if (el) el.addEventListener('input',  updateWhatsAppBookingLink);
  });
  updateWhatsAppBookingLink();
});

// ==========================================
// 4. SCROLL ANIMATIONS (Reveal)
// ==========================================

// Fallback for browsers without IntersectionObserver (old Safari, IE)
if (!('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
} else {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  });
}

// ==========================================
// 5. SMART WHATSAPP BUTTON
// ==========================================
window.addEventListener('scroll', function() {
  const whatsappBtn = document.querySelector('.whatsapp-float');
  const footer = document.querySelector('.premium-footer');
  
  if (!whatsappBtn || !footer) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const footerPosition = document.body.offsetHeight - footer.offsetHeight;

  if (scrollPosition >= footerPosition) {
    whatsappBtn.style.bottom = '100px'; 
  } else {
    whatsappBtn.style.bottom = '25px';
  }
});
