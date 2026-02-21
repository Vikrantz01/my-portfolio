(function () {
    document.getElementById('year').textContent = new Date().getFullYear();

    // Live time display
    const liveTimeElement = document.getElementById('live-time');
    function updateTime() {
        if (liveTimeElement) {
            const now = new Date();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
            hours = String(hours).padStart(2, '0');
            liveTimeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        }
    }
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);

    // nav toggle (responsive)
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    const navOverlay = document.getElementById('nav-overlay');
    function closeNav() {
        nav.setAttribute('data-open', 'false');
        navToggle.classList.remove('active');
        if (navOverlay) navOverlay.style.display = 'none';
    }
    function openNav() {
        nav.setAttribute('data-open', 'true');
        navToggle.classList.add('active');
        if (navOverlay) navOverlay.style.display = 'block';
    }
    navToggle.addEventListener('click', () => {
        const open = nav.getAttribute('data-open') === 'true';
        if (!open) {
            openNav();
        } else {
            closeNav();
        }
    });
    if (navOverlay) {
        navOverlay.addEventListener('click', closeNav);
    }
    // Close nav on link click (mobile)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 700) closeNav();
        });
    });

    // dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.textContent = '☀️';
    }
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDark);
            darkModeToggle.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // loader handling: ensure loader shows at least min time and hides on window.load
    const siteLoader = document.getElementById('site-loader');
    const LOADER_MIN_MS = 3000; // keep loader visible at least this long (1s)
    const LOADER_MAX_MS = 15000; // safety fallback (15s)
    const loaderStart = Date.now();

    function hideLoader() {
        if (!siteLoader) return;
        siteLoader.setAttribute('aria-hidden', 'true');
        // remove from DOM after transition to keep things clean
        setTimeout(() => {
            if (siteLoader && siteLoader.parentNode) siteLoader.parentNode.removeChild(siteLoader);
        }, 350);
    }

    function onLoaded() {
        const elapsed = Date.now() - loaderStart;
        const remaining = Math.max(0, LOADER_MIN_MS - elapsed);
        setTimeout(hideLoader, remaining);
    }

    // Hide loader when window finishes loading
    window.addEventListener('load', onLoaded);
    // Safety: hide after max timeout even if load never fires
    setTimeout(() => { hideLoader(); }, LOADER_MAX_MS);

    // portfolio is rendered statically in HTML to avoid duplication

    // lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    function openLightbox(item) {
        lightboxImg.src = item.img;
        lightboxCaption.textContent = item.title;
        lightbox.setAttribute('aria-hidden', 'false');
    }
    function closeLightbox() {
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        lightboxCaption.textContent = '';
    }
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    // contact form (fake)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks! Your message was sent (demo).');
        form.reset();
    });
})();
