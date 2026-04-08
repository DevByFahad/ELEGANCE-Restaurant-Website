// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Menu Data
    const menuData = {
        starters: [
            { name: 'Truffle Burrata', price: '$18' },
            { name: 'Caviar Blini', price: '$28' },
            { name: 'Seared Scallops', price: '$22' },
        ],
        mains: [
            { name: 'Wagyu Steak', price: '$65' },
            { name: 'Lobster Risotto', price: '$48' },
            { name: 'Pan-Seared Duck Breast', price: '$55' },
        ],
        desserts: [
            { name: 'Chocolate Soufflé', price: '$16' },
            { name: 'Vanilla Crème Brûlée', price: '$14' },
            { name: 'Lemon Tart', price: '$12' },
        ],
        wine: [
            { name: 'Château Margaux', price: '$120' },
            { name: 'Dom Pérignon', price: '$150' },
            { name: 'Screaming Eagle', price: '$300' },
        ],
    };

    const menuItemsContainer = document.getElementById('menu-items');
    const tabs = document.querySelectorAll('.tab');

    // Render menu function
    function renderMenu(category) {
        menuItemsContainer.innerHTML = '';
        const items = menuData[category];
        if (!items) return;
        items.forEach(({ name, price }) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');
            itemDiv.innerHTML = `<span>${name}</span><span>${price}</span>`;
            menuItemsContainer.appendChild(itemDiv);
        });
        menuItemsContainer.focus();
    }

    // Initialize menu
    renderMenu('starters');

    // Tabs click handler
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update ARIA & active classes
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            });

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');

            renderMenu(tab.dataset.tab);
        });

        // Keyboard navigation on tabs (left/right arrows)
        tab.addEventListener('keydown', e => {
            const index = Array.from(tabs).indexOf(e.currentTarget);
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % tabs.length;
                tabs[nextIndex].focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + tabs.length) % tabs.length;
                tabs[prevIndex].focus();
            }
        });
    });

    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    let testimonialIndex = 0;

    function showTestimonial(i) {
        testimonials.forEach((t, idx) => {
            t.classList.toggle('active', idx === i);
        });
    }

    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
    }, 5000);

    // Booking form handling
    const bookingForm = document.getElementById('booking-form');
    const successMsg = document.getElementById('success');

    bookingForm.addEventListener('submit', e => {
        e.preventDefault();

        // Simple validation
        if (!bookingForm.checkValidity()) {
            bookingForm.reportValidity();
            return;
        }

        // Simulate sending
        successMsg.textContent = 'Reservation request sent successfully!';
        bookingForm.reset();

        // Remove message after 5 seconds
        setTimeout(() => {
            successMsg.textContent = '';
        }, 5000);
    });
});