// ============================================================================
// Op Tijd. - Enhanced JavaScript
// ============================================================================

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(45deg) translateY(8px)' 
            : 'none';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(-45deg) translateY(-8px)' 
            : 'none';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Navigation
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.boxShadow = 'none';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handling with FormSpree
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');

// Character counter for message field
if (messageTextarea && charCount) {
    messageTextarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        if (count > 1000) {
            charCount.style.color = 'var(--danger)';
        } else if (count > 800) {
            charCount.style.color = 'var(--warning)';
        } else {
            charCount.style.color = 'var(--text-lighter)';
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFeedback('Vul alle velden in.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFeedback('Voer een geldig e-mailadres in.', 'error');
            return;
        }
        
        // Character limit check
        if (formData.message.length > 1000) {
            showFeedback('Je bericht mag maximaal 1000 karakters bevatten.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // IMPORTANT: Replace 'YOUR_FORM_ID' with your actual FormSpree form ID
            // Get your form ID from https://formspree.io after signing up
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Verzenden mislukt');
            }
            
            // Success
            showFeedback('Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.', 'success');
            contactForm.reset();
            if (charCount) charCount.textContent = '0';
            
        } catch (error) {
            console.error('Fout bij verzenden:', error);
            showFeedback('Er ging iets mis bij het verzenden. Probeer het later opnieuw of stuur een email naar stijn.wouters@hotmail.com', 'error');
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

function showFeedback(message, type) {
    if (!formFeedback) return;
    
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';
    
    // Scroll to feedback
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formFeedback.style.display = 'none';
        }, 5000);
    }
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqId = question.getAttribute('data-faq');
        const answer = document.getElementById(`faq-${faqId}`);
        
        // Toggle active class
        question.classList.toggle('active');
        
        // Toggle answer visibility
        if (answer.classList.contains('open')) {
            answer.classList.remove('open');
            answer.style.maxHeight = '0';
        } else {
            // Close other answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('open');
                ans.style.maxHeight = '0';
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                if (q !== question) q.classList.remove('active');
            });
            
            // Open clicked answer
            answer.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.problem-card, .solution-feature, .mission-card, .value-item, .team-member, .faq-item').forEach(el => {
    observer.observe(el);
});

// Toggle switch interactions (for demo purposes)
const toggleSwitches = document.querySelectorAll('.toggle-switch');

toggleSwitches.forEach(toggle => {
    toggle.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// Add floating animation to phone showcase on scroll
const phoneShowcase = document.querySelector('.phone-showcase');
if (phoneShowcase) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.05;
        phoneShowcase.style.transform = `translateY(${rate}px)`;
    });
}

// Stats counter animation (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Auto-open first FAQ if on FAQ page
    if (window.location.pathname.includes('faq.html')) {
        const firstFaq = document.querySelector('.faq-question');
        if (firstFaq) {
            setTimeout(() => {
                firstFaq.click();
            }, 300);
        }
    }
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateRequired(value) {
    return value.trim().length > 0;
}

// Add real-time validation feedback
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required')) {
            if (!validateRequired(this.value)) {
                this.style.borderColor = 'var(--danger)';
            } else if (this.type === 'email' && !validateEmail(this.value)) {
                this.style.borderColor = 'var(--danger)';
            } else {
                this.style.borderColor = 'var(--success)';
            }
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--accent)';
    });
});

// Handle browser back button
window.addEventListener('popstate', () => {
    // Close mobile menu if open
    if (navLinks && navLinks.classList.contains('active')) {
        navToggle.click();
    }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

console.log('Op Tijd. website loaded successfully! 🎉');

// ============================================================================
// INTERACTIVE DEMO FUNCTIONS
// ============================================================================

// Motivational Quotes (from actual app)
const DEMO_QUOTES = [
    "Geweldig gedaan! 🌟",
    "Je bent echt op dreef! 🚀",
    "Wat een progressie! 💪",
    "Blijf zo doorgaan! ⭐",
    "Je bent fantastisch bezig! ✨",
    "Dit gaat heel goed! 🎯",
    "Top werk! 👏",
    "Je hebt dit helemaal onder controle! 💫",
    "Sterk gedaan! 🔥",
    "Je bent een ster! ⭐",
    "Ongelofelijk goed bezig! 🌈",
    "Dit is echt super! 🎉",
    "Je maakt het waar! 💎",
    "Geweldige focus! 🎯",
    "Je doet het perfect! ✅",
    "Zo moet het! 👌",
    "Fantastisch! 🌟",
    "Je bent unstoppable! 🚀",
    "Blijf deze energie vasthouden! ⚡",
    "Je crusht het! 💪"
];

// Demo Timer State
let demoTimerInterval = null;
let demoTimeLeft = 300; // 5 minutes in seconds
let demoTimerRunning = false;

// Show Random Quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (!quoteDisplay) return;
    
    const randomQuote = DEMO_QUOTES[Math.floor(Math.random() * DEMO_QUOTES.length)];
    
    // Remove animation class
    quoteDisplay.classList.remove('animate');
    
    // Force reflow
    void quoteDisplay.offsetWidth;
    
    // Add animation and update text
    quoteDisplay.classList.add('animate');
    quoteDisplay.textContent = randomQuote;
}

// Trigger Confetti
function triggerConfetti() {
    if (typeof confetti === 'undefined') {
        console.log('Confetti library not loaded');
        return;
    }
    
    // Confetti from center
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    
    // Extra burst after a moment
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }, 200);
}

// Toggle Checklist Item
function toggleCheckItem(element) {
    element.classList.toggle('checked');
    const checkbox = element.querySelector('.check-box');
    
    if (element.classList.contains('checked')) {
        checkbox.textContent = '☑';
        
        // Small confetti burst
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 30,
                spread: 40,
                origin: { 
                    x: 0.5, 
                    y: 0.5 
                },
                colors: ['#f1c40f', '#2ecc71', '#3498db']
            });
        }
    } else {
        checkbox.textContent = '☐';
    }
}

// Play Demo Sound
function playDemoSound() {
    const sound = document.getElementById('demoCheckSound');
    const soundWave = document.querySelector('.sound-wave');
    
    if (soundWave) {
        soundWave.classList.add('playing');
        setTimeout(() => {
            soundWave.classList.remove('playing');
        }, 1000);
    }
    
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound playback failed:', e));
    }
}

// Start Demo Timer
function startDemoTimer() {
    const btn = document.getElementById('startTimerBtn');
    const timerDisplay = document.getElementById('demoTimer');
    const progressBar = document.getElementById('demoProgress');
    
    if (!btn || !timerDisplay || !progressBar) return;
    
    if (demoTimerRunning) {
        // Pause
        clearInterval(demoTimerInterval);
        demoTimerRunning = false;
        btn.textContent = '▶ Hervatten';
        btn.style.background = 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)';
    } else {
        // Start
        demoTimerRunning = true;
        btn.textContent = '⏸ Pauzeer';
        btn.style.background = 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)';
        
        demoTimerInterval = setInterval(() => {
            if (demoTimeLeft > 0) {
                demoTimeLeft--;
                
                // Update display
                const minutes = Math.floor(demoTimeLeft / 60);
                const seconds = demoTimeLeft % 60;
                timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                // Update progress
                const progress = ((300 - demoTimeLeft) / 300) * 100;
                progressBar.style.width = progress + '%';
                
                // Timer complete
                if (demoTimeLeft === 0) {
                    clearInterval(demoTimerInterval);
                    demoTimerRunning = false;
                    btn.textContent = '🎉 Voltooid!';
                    btn.style.background = 'linear-gradient(135deg, var(--success) 0%, #27ae60 100%)';
                    
                    // Trigger confetti
                    triggerConfetti();
                    
                    // Show quote
                    setTimeout(() => {
                        showRandomQuote();
                    }, 500);
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                        demoTimeLeft = 300;
                        timerDisplay.textContent = '05:00';
                        progressBar.style.width = '0%';
                        btn.textContent = '▶ Start';
                        btn.style.background = 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)';
                    }, 3000);
                }
            }
        }, 1000);
    }
}

// Screenshots Slider
let currentSlide = 0;
const totalSlides = 4; // Update based on actual number of screenshots

function slideScreenshots(direction) {
    const slides = document.querySelectorAll('.screenshot-item');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slides.length === 0) return;
    
    // Remove active class
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
    }
    
    // Update index
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    
    // Add active class
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.screenshot-item');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slides.length === 0) return;
    
    // Remove active class
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
    }
    
    // Update index
    currentSlide = index;
    
    // Add active class
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

// Initialize slider dots
function initSliderDots() {
    const dotsContainer = document.getElementById('sliderDots');
    const slides = document.querySelectorAll('.screenshot-item');
    
    if (!dotsContainer || slides.length === 0) return;
    
    dotsContainer.innerHTML = '';
    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
}

// Auto-play slider
function startAutoSlide() {
    setInterval(() => {
        slideScreenshots(1);
    }, 5000); // Change slide every 5 seconds
}

// Initialize demo features on load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider dots
    initSliderDots();
    
    // Start auto-slide if screenshots exist
    if (document.querySelectorAll('.screenshot-item').length > 0) {
        startAutoSlide();
    }
    
    // Add keyboard navigation for slider
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            slideScreenshots(-1);
        } else if (e.key === 'ArrowRight') {
            slideScreenshots(1);
        }
    });
    
    console.log('Demo features initialized! 🎉');
});

// Pause auto-slide when user interacts
let autoSlideInterval = null;

function pauseAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        slideScreenshots(1);
        pauseAutoSlide();
    }
    if (touchEndX > touchStartX + 50) {
        slideScreenshots(-1);
        pauseAutoSlide();
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

