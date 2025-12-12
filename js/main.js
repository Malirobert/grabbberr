// ===========================
// MOBILE MENU
// ===========================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

// Open mobile menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close mobile menu
mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===========================
// SMOOTH SCROLLING
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// HEADER SCROLL EFFECT
// ===========================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// REVENUE CALCULATOR
// ===========================

const revenueData = {
    '500k-1m': {
        ads: 5500,
        cpa: 15000,
        brands: 10000,
        affiliate: 13500
    },
    '1m-10m': {
        ads: 12000,
        cpa: 30000,
        brands: 20000,
        affiliate: 25000
    },
    '10m-30m': {
        ads: 50000,
        cpa: 150000,
        brands: 50000,
        affiliate: 100000
    },
    '30m-50m': {
        ads: 100000,
        cpa: 300000,
        brands: 75000,
        affiliate: 200000
    },
    '50m-100m': {
        ads: 200000,
        cpa: 500000,
        brands: 100000,
        affiliate: 300000
    }
};

function updateRevenueCalculator(traffic) {
    const data = revenueData[traffic];
    const total = data.ads + data.cpa + data.brands + data.affiliate;
    const yourShare = Math.round(total * 0.3);

    // Format numbers with commas
    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    // Update amounts
    document.getElementById('adsAmount').textContent = '$' + formatNumber(data.ads);
    document.getElementById('cpaAmount').textContent = '$' + formatNumber(data.cpa);
    document.getElementById('brandsAmount').textContent = '$' + formatNumber(data.brands);
    document.getElementById('affiliateAmount').textContent = '$' + formatNumber(data.affiliate);
    document.getElementById('totalRevenue').textContent = '$' + formatNumber(total);
    document.getElementById('yourShare').textContent = '$' + formatNumber(yourShare) + '/month';

    // Calculate percentages for bars (relative to total)
    const bars = [
        { el: document.getElementById('adsBar'), val: data.ads },
        { el: document.getElementById('cpaBar'), val: data.cpa },
        { el: document.getElementById('brandsBar'), val: data.brands },
        { el: document.getElementById('affiliateBar'), val: data.affiliate }
    ];
    bars.forEach(bar => {
        if (bar.el) {
            bar.el.style.transition = 'none';
            bar.el.style.width = '0%';
        }
    });
    setTimeout(() => {
        bars.forEach(bar => {
            if (bar.el) {
                bar.el.style.transition = 'width 0.8s cubic-bezier(0.4,0,0.2,1)';
                bar.el.style.width = total > 0 ? ((bar.val / total) * 100) + '%' : '0%';
            }
        });
    }, 50);
}

// Traffic option click handlers
const trafficOptions = document.querySelectorAll('.traffic-option');
trafficOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        trafficOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update calculator
        const traffic = option.getAttribute('data-traffic');
        updateRevenueCalculator(traffic);
    });
});

// Initialize with default traffic level
updateRevenueCalculator('500k-1m');

// ===========================
// CONTACT FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        website: document.getElementById('website').value,
        traffic: document.getElementById('traffic').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Log to console (in a real application, you would send this to a server)
    console.log('Form submission:', formData);
    
    // Show success message
    contactForm.style.display = 'none';
    formSuccess.classList.add('active');
    
    // Reset form after 5 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.classList.remove('active');
    }, 5000);
});

// ===========================
// ANIMATE ON SCROLL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.problem-card, .solution-item, .portfolio-card, .revenue-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ===========================
// STATS COUNTER ANIMATION
// ===========================

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                animateStatNumber(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

function animateStatNumber(element) {
    const text = element.textContent;
    
    // For "$0" or "0" text
    if (text.includes('0') && !text.includes('30')) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease-in';
            element.style.opacity = '1';
        }, 100);
    }
    
    // For "30%" text
    if (text.includes('30')) {
        let current = 0;
        const target = 30;
        const increment = 1;
        const duration = 1500;
        const stepTime = duration / (target / increment);
        
        element.textContent = '0%';
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current + '%';
            
            if (current >= target) {
                clearInterval(timer);
                element.textContent = '30%';
            }
        }, stepTime);
    }
}

// ===========================
// FORM VALIDATION
// ===========================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = 'var(--danger-color)';
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailInput.style.borderColor = 'var(--danger-color)';
    }
});

// URL validation
const websiteInput = document.getElementById('website');
websiteInput.addEventListener('blur', () => {
    try {
        new URL(websiteInput.value);
        websiteInput.style.borderColor = 'var(--border-color)';
    } catch {
        websiteInput.style.borderColor = 'var(--danger-color)';
    }
});

// ===========================
// PREVENT FORM SUBMISSION ERRORS
// ===========================

contactForm.addEventListener('submit', (e) => {
    let isValid = true;
    
    formInputs.forEach(input => {
        if (input.hasAttribute('required') && input.value.trim() === '') {
            isValid = false;
            input.style.borderColor = 'var(--danger-color)';
        }
    });
    
    if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
    }
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Lazy load images if any are added
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// CONSOLE MESSAGE
// ===========================

console.log('%cGrabbber', 'font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cTransform your video downloader into passive income', 'font-size: 16px; color: #b4b4c8;');
console.log('%cInterested in joining? Fill out the form on our website!', 'font-size: 14px; color: #00d4ff;');
