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

    if (isActive) {
      document.body.style.overflow = 'hidden';
      // Add a slight delay for the links to fade in
      const links = navLinks.querySelectorAll('a');
      links.forEach((link, index) => {
        link.style.transitionDelay = `${0.1 * (index + 1)}s`;
      });
    } else {
      document.body.style.overflow = 'auto';
    }
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
  if (slides[index]) slides[index].classList.add('active-slide');
  if (dots[index]) dots[index].classList.add('active-dot');
}

function nextSlide() {
  if (slides.length === 0) return;
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

sliderInterval = setInterval(nextSlide, 5000);

window.currentSlide = function (index) {
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

window.openModal = function (id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    galleryState[id] = 0;
    const track = document.getElementById(`track-${id}`);
    if (track) {
      track.style.transform = `translateX(0%)`;
    }

    // Modal eka open kalama thappara 3n 3ta slide wenna patan gannawa
    clearInterval(modalAutoPlay);
    modalAutoPlay = setInterval(() => {
      window.moveModalGallery(id, 1);
    }, 3000);
  }
};

window.closeModal = function (id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    // Modal eka close kalama auto play eka nawathinawa
    clearInterval(modalAutoPlay);
  }
};

window.moveModalGallery = function (modalId, step) {
  if (galleryState[modalId] === undefined) {
    galleryState[modalId] = 0;
  }

  const track = document.getElementById(`track-${modalId}`);
  if (!track) return;

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

window.onclick = function (event) {
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
window.sendBooking = function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  const subject = encodeURIComponent(`Booking Inquiry - ${service}`);
  const body = encodeURIComponent(
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
  const btn = document.getElementById('whatsapp-booking-btn');
  if (!btn) return;
  const name = (document.getElementById('name')?.value || '').trim();
  const date = (document.getElementById('date')?.value || '').trim();
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
  ['name', 'date', 'service', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateWhatsAppBookingLink);
    if (el) el.addEventListener('input', updateWhatsAppBookingLink);
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
  // Lower threshold so cards animate on mobile even when partially visible
  // rootMargin '0px' avoids cutting off last items just above the fold
  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px 0px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Run immediately — also catches elements already visible on load
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Also run after DOM content loaded (safety net)
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal:not(.active)').forEach(el => observer.observe(el));
  });
}

// ==========================================
// 5. CUSTOM CHAT WIDGET
// ==========================================
function toggleChat() {
  const chatWidget = document.getElementById('chat-widget');
  if (chatWidget.classList.contains('open')) {
    chatWidget.classList.remove('open');
  } else {
    chatWidget.classList.add('open');
    document.getElementById('chat-user-input').focus();
    
    // Set 'Just now' time to current time on open
    const timeInit = document.getElementById('chat-time-init');
    if (timeInit && timeInit.innerText === 'Just now') {
      const now = new Date();
      timeInit.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
  }
}

let chatState = 0;
let chatData = { interest: '', name: '', date: '' };

function handleQuickReply(text) {
  // Hide quick replies
  const quickRepliesDiv = document.getElementById('chat-quick-replies');
  if (quickRepliesDiv) {
    quickRepliesDiv.style.display = 'none';
  }
  
  // Set the input box value and trigger send
  const input = document.getElementById('chat-user-input');
  input.value = text;
  sendChatMessage();
}

function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

function showTypingIndicator() {
  const chatBody = document.getElementById('chat-widget-body');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message bot-message typing-bubble-wrapper';
  typingDiv.id = 'typing-indicator';
  
  typingDiv.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chatBody.appendChild(typingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
  const typingDiv = document.getElementById('typing-indicator');
  if (typingDiv) typingDiv.remove();
}

function addBotMessage(text) {
  const chatBody = document.getElementById('chat-widget-body');
  const botReplyDiv = document.createElement('div');
  botReplyDiv.className = 'chat-message bot-message';
  botReplyDiv.innerHTML = `<div class="message-content"><p>${text}</p></div>`;
  chatBody.appendChild(botReplyDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chat-user-input');
  const msg = input.value.trim();
  if (!msg) return;

  // Hide quick replies if user typed manually
  const quickRepliesDiv = document.getElementById('chat-quick-replies');
  if (quickRepliesDiv && quickRepliesDiv.style.display !== 'none') {
    quickRepliesDiv.style.display = 'none';
  }

  // Add user message to UI
  const chatBody = document.getElementById('chat-widget-body');
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'chat-message user-message';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = `<p>${msg.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`;
  
  userMsgDiv.appendChild(contentDiv);
  chatBody.appendChild(userMsgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  input.value = '';

  // Show typing indicator
  setTimeout(showTypingIndicator, 300);

  if (chatState === 0) {
    chatData.interest = msg;
    setTimeout(() => {
      removeTypingIndicator();
      addBotMessage("Great! First, could you please let me know your <b>Name</b>?");
      chatState = 1;
    }, 1200);
  } 
  else if (chatState === 1) {
    chatData.name = msg;
    setTimeout(() => {
      removeTypingIndicator();
      addBotMessage(`Nice to meet you, ${chatData.name.replace(/</g, "&lt;")}! What is your expected <b>Arrival Date</b> to Sri Lanka?`);
      chatState = 2;
    }, 1200);
  }
  else if (chatState === 2) {
    chatData.date = msg;
    setTimeout(() => {
      removeTypingIndicator();
      addBotMessage("Thank you! I am redirecting you to our live team on WhatsApp to finalize your inquiry...");
      chatState = 3;
      
      // Final Redirect
      setTimeout(() => {
        const finalText = `*Website Inquiry*%0A%0A*Interest/Query:* ${chatData.interest}%0A*Name:* ${chatData.name}%0A*Arrival Date:* ${chatData.date}`;
        const waUrl = `https://wa.me/94787077007?text=${finalText}`;
        window.open(waUrl, '_blank');
        addBotMessage(`If it doesn't open automatically, <a href="${waUrl}" target="_blank" style="color:#128c7e; font-weight:bold;">click here</a>.`);
      }, 1000);
    }, 1500);
  }
  else {
    // If they keep chatting after state 3
    setTimeout(() => {
      removeTypingIndicator();
      const finalText = `*Additional Message:* ${msg}`;
      const waUrl = `https://wa.me/94787077007?text=${finalText}`;
      window.open(waUrl, '_blank');
    }, 800);
  }
}

// Adjust chat widget position near footer
window.addEventListener('scroll', function () {
  const chatWidget = document.getElementById('chat-widget');
  const footer = document.querySelector('.premium-footer');

  if (!chatWidget || !footer) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const footerPosition = document.body.offsetHeight - footer.offsetHeight;

  if (scrollPosition >= footerPosition) {
    chatWidget.style.bottom = '100px';
  } else {
    chatWidget.style.bottom = '25px';
  }
});
