// ==========================================
// 1. PRELOADER FAILSAFE
// ==========================================
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }
}
window.addEventListener('load', hidePreloader);
setTimeout(hidePreloader, 4000); // 4s failsafe

// ==========================================
// 2. MODAL LOGIC + CLICK OUTSIDE TO CLOSE
// ==========================================
window.openModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Close when clicking outside of the modal-content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// ==========================================
// 3. HERO SLIDER
// ==========================================
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active-slide'));
    dots.forEach(d => d.classList.remove('active-dot'));
    if(slides[index]) slides[index].classList.add('active-slide');
    if(dots[index]) dots[index].classList.add('active-dot');
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}
setInterval(nextSlide, 5000);

window.currentSlide = (index) => { slideIndex = index; showSlide(slideIndex); };

// ==========================================
// 4. WHATSAPP BOOKING
// ==========================================
window.sendBooking = function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;
    const msg = `Hi Jayasinghe Tours!%0A*Booking Inquiry*%0AName: ${name}%0ADate: ${date}%0ASelection: ${service}`;
    window.open(`https://wa.me/94787077007?text=${msg}`, '_blank');
};

// ==========================================
// 5. SCROLL REVEAL
// ==========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
