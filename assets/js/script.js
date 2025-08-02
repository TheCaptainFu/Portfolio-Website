/**
 * Portfolio Website JavaScript
 * 
 * Features:
 * - Mobile navigation toggle
 * - Portfolio filtering
 * - Loading animations
 * - Form validation
 * - Smooth scrolling
 * - Accessibility improvements
 * 
 * @author Your Name
 * @version 1.0.0
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        animationDuration: 300,
        loadingDelay: 100,
        scrollOffset: 80
    };

    // DOM Elements Cache
    const DOM = {
        hamburgerBtn: null,
        mobileMenu: null,
        filterBtns: null,
        projectItems: null,
        contactForm: null,
        loadingElements: null,
        skipLink: null
    };

    /**
     * Initialize the application
     */
    function init() {
        // Cache DOM elements
        cacheDOMElements();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize loading animations
        initLoadingAnimations();
        
        // Initialize accessibility features
        initAccessibility();
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        console.log('Portfolio website initialized successfully');
    }

    /**
     * Cache DOM elements for better performance
     */
    function cacheDOMElements() {
        DOM.hamburgerBtn = document.getElementById('hamburger-btn');
        DOM.mobileMenu = document.getElementById('mobile-menu');
        DOM.filterBtns = document.querySelectorAll('.filter-btn');
        DOM.projectItems = document.querySelectorAll('.project-item');
        DOM.contactForm = document.querySelector('form');
        DOM.loadingElements = document.querySelectorAll('.loading');
        DOM.skipLink = document.querySelector('.skip-link');
    }

    /**
     * Setup all event listeners
     */
    function setupEventListeners() {
        // Mobile menu toggle
        if (DOM.hamburgerBtn && DOM.mobileMenu) {
            DOM.hamburgerBtn.addEventListener('click', toggleMobileMenu);
            DOM.hamburgerBtn.addEventListener('keydown', handleMobileMenuKeydown);
        }

        // Portfolio filtering
        if (DOM.filterBtns.length > 0 && DOM.projectItems.length > 0) {
            DOM.filterBtns.forEach(btn => {
                btn.addEventListener('click', handleFilterClick);
                btn.addEventListener('keydown', handleFilterKeydown);
            });
        }

        // Contact form submission
        if (DOM.contactForm) {
            DOM.contactForm.addEventListener('submit', handleFormSubmit);
            
            // Real-time validation
            const inputs = DOM.contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', validateField);
                input.addEventListener('input', clearFieldError);
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', handleOutsideClick);
        
        // Handle escape key to close mobile menu
        document.addEventListener('keydown', handleEscapeKey);
        
        // Handle window resize
        window.addEventListener('resize', handleWindowResize);
    }

    /**
     * Initialize loading animations
     */
    function initLoadingAnimations() {
        // Trigger loading animations with staggered delays
        DOM.loadingElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('loaded');
            }, CONFIG.loadingDelay * (index + 1));
        });
    }

    /**
     * Initialize accessibility features
     */
    function initAccessibility() {
        // Ensure skip link works properly
        if (DOM.skipLink) {
            DOM.skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(DOM.skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Add focus indicators for keyboard navigation
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--primary-color)';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    /**
     * Initialize smooth scrolling for anchor links
     */
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - CONFIG.scrollOffset;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Toggle mobile menu visibility
     */
    function toggleMobileMenu() {
        const isHidden = DOM.mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            DOM.mobileMenu.classList.remove('hidden');
            DOM.hamburgerBtn.setAttribute('aria-expanded', 'true');
            DOM.hamburgerBtn.classList.add('active');
            // Focus first menu item
            const firstMenuItem = DOM.mobileMenu.querySelector('a');
            if (firstMenuItem) firstMenuItem.focus();
        } else {
            DOM.mobileMenu.classList.add('hidden');
            DOM.hamburgerBtn.setAttribute('aria-expanded', 'false');
            DOM.hamburgerBtn.classList.remove('active');
        }
    }

    /**
     * Handle keyboard navigation for mobile menu
     */
    function handleMobileMenuKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    }

    /**
     * Handle filter button clicks
     */
    function handleFilterClick(e) {
        const filter = e.target.getAttribute('data-filter');
        
        // Update active button
        DOM.filterBtns.forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        e.target.classList.remove('bg-gray-200', 'text-gray-700');
        e.target.classList.add('bg-blue-600', 'text-white');
        e.target.setAttribute('aria-pressed', 'true');
        
        // Filter projects with animation
        filterProjects(filter);
    }

    /**
     * Handle keyboard navigation for filter buttons
     */
    function handleFilterKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFilterClick(e);
        }
    }

    /**
     * Filter projects with smooth animation
     */
    function filterProjects(filter) {
        DOM.projectItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                // Animate in
                setTimeout(() => {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    item.style.display = 'none';
                }, CONFIG.animationDuration);
            }
        });
    }

    /**
     * Handle form submission
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isValid = validateForm();
        
        if (isValid) {
            // Show loading state
            const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                DOM.contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    }

    /**
     * Validate entire form
     */
    function validateForm() {
        const requiredFields = DOM.contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    /**
     * Validate individual field
     */
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        clearFieldError(e);
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
            isValid = false;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }

    /**
     * Show field error
     */
    function showFieldError(field, message) {
        field.classList.add('border-red-500');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        // Insert error message
        field.parentNode.appendChild(errorElement);
    }

    /**
     * Clear field error
     */
    function clearFieldError(e) {
        const field = e.target;
        field.classList.remove('border-red-500');
        
        // Remove error message
        const errorElement = field.parentNode.querySelector('.text-red-500');
        if (errorElement) {
            errorElement.remove();
        }
    }

    /**
     * Show notification
     */
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    /**
     * Handle clicks outside mobile menu
     */
    function handleOutsideClick(e) {
        if (DOM.mobileMenu && !DOM.mobileMenu.classList.contains('hidden')) {
            if (!DOM.mobileMenu.contains(e.target) && !DOM.hamburgerBtn.contains(e.target)) {
                toggleMobileMenu();
            }
        }
    }

    /**
     * Handle escape key press
     */
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            if (DOM.mobileMenu && !DOM.mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        }
    }

    /**
     * Handle window resize
     */
    function handleWindowResize() {
        // Close mobile menu on desktop
        if (window.innerWidth >= 768 && DOM.mobileMenu && !DOM.mobileMenu.classList.contains('hidden')) {
            DOM.mobileMenu.classList.add('hidden');
            DOM.hamburgerBtn.setAttribute('aria-expanded', 'false');
            DOM.hamburgerBtn.classList.remove('active');
        }
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose public API for customization
    window.PortfolioTheme = {
        init: init,
        toggleMobileMenu: toggleMobileMenu,
        filterProjects: filterProjects,
        showNotification: showNotification
    };

})(); 