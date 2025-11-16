// ===================================
// IshaanFarms Website JavaScript
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ===================================
    // Smooth Scrolling for Navigation Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolling down
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===================================
    // Scroll Animations (Intersection Observer)
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add stagger effect for cards
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('product-card') ||
                    entry.target.classList.contains('contact-card')) {
                    
                    const cards = entry.target.parentElement.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('section, .feature-card, .product-card, .contact-card');
    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
    
    // ===================================
    // Product Card Hover Effects
    // ===================================
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===================================
    // Floating Badge Animation
    // ===================================
    const floatingBadge = document.querySelector('.floating-badge');
    if (floatingBadge) {
        // Add pulse effect on scroll
        let badgePulseTimeout;
        window.addEventListener('scroll', function() {
            floatingBadge.style.transform = 'scale(1.1)';
            
            clearTimeout(badgePulseTimeout);
            badgePulseTimeout = setTimeout(() => {
                floatingBadge.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // ===================================
    // Scroll Indicator in Hero
    // ===================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = featuresSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator when scrolling down
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // ===================================
    // Add Click Analytics (Optional)
    // ===================================
    const trackableButtons = document.querySelectorAll('.product-btn, .contact-btn, .hero-btn, .nav-cta');
    trackableButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log('Button clicked:', buttonText);
            // You can add analytics tracking here if needed
        });
    });
    
    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // ===================================
    // Add Loading Animation
    // ===================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===================================
    // Price Animation on Scroll
    // ===================================
    const priceElements = document.querySelectorAll('.price-amount');
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceElement = entry.target;
                const finalPrice = priceElement.textContent;
                const numericPrice = parseInt(finalPrice.replace(/[^0-9]/g, ''));
                
                // Animate price counting up
                let currentPrice = 0;
                const increment = numericPrice / 50;
                const duration = 1000;
                const stepTime = duration / 50;
                
                const counter = setInterval(() => {
                    currentPrice += increment;
                    if (currentPrice >= numericPrice) {
                        priceElement.textContent = finalPrice;
                        clearInterval(counter);
                    } else {
                        priceElement.textContent = '₹' + Math.floor(currentPrice);
                    }
                }, stepTime);
                
                priceObserver.unobserve(priceElement);
            }
        });
    }, { threshold: 0.5 });
    
    priceElements.forEach(element => {
        priceObserver.observe(element);
    });
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🌾 Welcome to IshaanFarms! 🌾', 'color: #8B4513; font-size: 20px; font-weight: bold;');
    console.log('%cFreshly milled, pure, and full of authentic taste ❤️', 'color: #228B22; font-size: 14px;');
    console.log('%cContact: 9505415453', 'color: #3E2723; font-size: 12px;');
    
});

// ===================================
// Handle Window Resize
// ===================================
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    }, 250);
});

// ===================================
// Prevent Right Click on Images (Optional)
// ===================================
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
});
*/