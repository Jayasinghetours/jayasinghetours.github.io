// HERO SLIDER
let currentIdx = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlides() {
    slides.forEach((s, i) => {
        s.classList.toggle('active-slide', i === currentIdx);
        dots[i].classList.toggle('active-dot', i === currentIdx);
    });
    currentIdx = (currentIdx + 1) % slides.length;
}
setInterval(showSlides, 5000);

// MODAL LOGIC
function openModal(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Stop scrolling background
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal if clicking outside the box
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// BOOKING FORM
function sendBooking(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;
    
    const text = `Hello Jayasinghe Tours! I'm ${name}. I want to book a ${service} for ${date}.`;
    const url = `https://wa.me/94787077007?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

// REVEAL ON SCROLL
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
