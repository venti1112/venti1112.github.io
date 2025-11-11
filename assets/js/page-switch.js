const pageTitles = {
    home: '首页',
    about: '关于我',
    rustdesk: 'RustDesk服务器'
};
let currentPage = null;
let isAnimating = false;
let nextPage = null;
let underline, container;
let contentBox;
function updateUnderlinePosition(pageId, animate = false) {
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (!activeLink || !underline || !container) return;
    document.body.offsetHeight;
    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const containerStyle = getComputedStyle(container);
    const paddingLeft = parseFloat(containerStyle.paddingLeft);
    const borderLeft = parseFloat(containerStyle.borderLeftWidth);
    const left = linkRect.left - containerRect.left - paddingLeft - borderLeft;
    const width = linkRect.width;
    const extendedWidth = width + 2;
    const adjustedLeft = Math.floor(left) - 0.5;
    if (animate) {
        underline.style.width = '0';
        void underline.offsetWidth;
        underline.style.transform = `translateX(${adjustedLeft}px)`;
        underline.style.width = `${extendedWidth}px`;
    } else {
        underline.style.transform = `translateX(${adjustedLeft}px)`;
        underline.style.width = `${extendedWidth}px`;
    }
}
function initPageScripts() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.removeEventListener('click', copyServerCode);
        button.addEventListener('click', copyServerCode);
    });
}
function showPage(pageId, isInitial = false) {
    if (currentPage === pageId && !isInitial) return;
    if (isAnimating) {
        nextPage = pageId;
        return;
    }
    const contentLoading = document.getElementById('content-loading');
    contentLoading.style.display = 'flex';
    fetch(`/page/${pageId}.html`)
        .then(response => {
            if (!response.ok) throw new Error(`加载页面失败: ${response.status}`);
            return response.text();
        })
        .then(html => {
            contentLoading.style.display = 'none';
            if (!currentPage) {
                document.getElementById('page-content').innerHTML = html;
                currentPage = pageId;
                document.title = `${pageTitles[pageId]} - venti1112的小站`;
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('nav-active');
                });
                const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav-active');
                    updateUnderlinePosition(pageId, true);
                }
                
                if (isInitial) {
                    window.history.replaceState(null, null, `#${pageId}`);
                }
                
                initPageScripts();
                return;
            }
            isAnimating = true;
            const targetHtml = html;
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('nav-active');
            });
            const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
            if (activeLink) {
                activeLink.classList.add('nav-active');
                updateUnderlinePosition(pageId, true);
            }
            const navLinks = Array.from(document.querySelectorAll('.nav-link'));
            const currentIndex = navLinks.findIndex(link => link.getAttribute('data-page') === currentPage);
            const targetIndex = navLinks.findIndex(link => link.getAttribute('data-page') === pageId);
            if (currentIndex < targetIndex) {
                contentBox.classList.add('slide-out-left');
            } else {
                contentBox.classList.add('slide-out-right');
            }
            setTimeout(() => {
                document.getElementById('page-content').innerHTML = targetHtml;
                contentBox.classList.remove('slide-out-left', 'slide-out-right');
                contentBox.classList.add('slide-in-bottom');
                setTimeout(() => {
                    contentBox.classList.remove('slide-in-bottom');
                    currentPage = pageId;
                    isAnimating = false;
                    document.documentElement.scrollTop = 0;
                    document.title = `${pageTitles[pageId]} - venti1112的小站`;
                    initPageScripts();
                    if (nextPage) {
                        const target = nextPage;
                        nextPage = null;
                        showPage(target);
                    }
                }, 500);
            }, 500);
        })
        .catch(error => {
            console.error(error);
            contentLoading.style.display = 'none';
            alert(`页面加载失败: ${error.message}\n请检查网络连接或重试`);
        });
}

window.addEventListener('load', function() {
    underline = document.querySelector('.nav-underline');
    container = document.querySelector('.nav-container');
    contentBox = document.querySelector('.content-box');
    if (typeof copyServerCode === 'function') {
        initPageScripts();
    }
    const hash = window.location.hash.substring(1) || 'home';
    showPage(hash, true);
    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            document.body.offsetHeight;
            container.offsetHeight;
            if (currentPage) updateUnderlinePosition(currentPage);
        }, 200);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    const mediaQuery = window.matchMedia('(max-width: 768px), (max-width: 480px)');
    mediaQuery.addEventListener('change', handleResize);
});
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showPage(hash);
    }
});