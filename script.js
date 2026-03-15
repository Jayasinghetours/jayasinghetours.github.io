// HERO SLIDER LOGIC
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let sliderInterval;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active-slide'));
  dots.forEach(d => d.classList.remove('active-dot'));
  
  slides[index].classList.add('active-slide');
  dots[index].classList.add('active-dot');
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

// Start auto-play
sliderInterval = setInterval(nextSlide, 5000);

// Allow manual dot clicking
window.currentSlide = function(index) {
  clearInterval(sliderInterval); // Pause auto-play when user clicks
  slideIndex = index;
  showSlide(slideIndex);
  sliderInterval = setInterval(nextSlide, 5000); // Resume auto-play
};

// MODAL POPUP LOGIC
window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevents background scrolling
  }
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restores scrolling
  }
};

// Close modal if user clicks the dark background outside the white box
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

// WHATSAPP BOOKING FORM LOGIC
window.sendBooking = function(event) {
  event.preventDefault(); // Prevents page reload
  
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const service = document.getElementById('service').value;
  
  // Create a clean WhatsApp message
  const whatsappMessage = `Hello Jayasinghe Tours!%0A%0A` +
                          `I would like to make an inquiry:%0A` +
                          `*Name:* ${name}%0A` +
                          `*Date:* ${date}%0A` +
                          `*Service:* ${service}%0A%0A` +
                          `Please let me know the availability.`;
                          
  // Your phone number
  const phone = "94787077007";
  
  // Open WhatsApp in a new tab
  window.open(`https://wa.me/${phone}?text=${whatsappMessage}`, '_blank');
};

// SCROLL REVEAL ANIMATION (Smooth entry for cards)
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optional: Stop observing once revealed so it doesn't animate out
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Attach observer to all elements with '.reveal' class
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
});
