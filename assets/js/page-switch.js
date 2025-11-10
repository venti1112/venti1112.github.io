let currentPage = 'home';
let isAnimating = false;
let nextPage = null;
function updateUnderlinePosition(pageId) {
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    const underline = document.querySelector('.nav-underline');
    if (!activeLink || !underline) return;
    const container = document.querySelector('.nav-container');
    if (!container) return;
    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const left = linkRect.left - containerRect.left;
    const width = linkRect.width;
    const extendedWidth = width + 2;
    const adjustedLeft = left - 1;
    underline.style.left = `${adjustedLeft}px`;
    underline.style.width = `${extendedWidth}px`;
}
function showPage(pageId) {
    const currentElement = document.getElementById(currentPage);
    const targetElement = document.getElementById(pageId);
    if (isAnimating) {
        nextPage = pageId;
        return;
    }
    if (currentPage === pageId) return;
    isAnimating = true;
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const currentIndex = navLinks.findIndex(link => link.getAttribute('data-page') === currentPage);
    const targetIndex = navLinks.findIndex(link => link.getAttribute('data-page') === pageId);
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('nav-active');
    });
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('nav-active');
        updateUnderlinePosition(pageId);
    }
    targetElement.classList.add('active');
    targetElement.style.display = 'block';
    void targetElement.offsetWidth;
    if (currentIndex < targetIndex) {
        currentElement.classList.add('slide-out-left');
    } else {
        currentElement.classList.add('slide-out-right');
    }
    targetElement.classList.add('slide-in-bottom');
    setTimeout(() => {
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('slide-in-bottom', 'slide-out-left', 'slide-out-right');
        });
        if (currentElement) {
            currentElement.classList.remove('active');
            currentElement.style.display = '';
        }
        currentPage = pageId;
        isAnimating = false;
        if (nextPage) {
            const target = nextPage;
            nextPage = null;
            showPage(target);
        }
    }, 500);
}
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1) || 'home';
    showPage(hash);
    updateUnderlinePosition(hash);
    window.addEventListener('resize', () => {
        updateUnderlinePosition(currentPage);
    });
});

window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showPage(hash);
    }
});