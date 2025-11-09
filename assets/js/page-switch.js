// 页面切换逻辑
let currentPage = 'home';

function showPage(pageId) {
    // 获取当前活动页面和目标页面
    const currentElement = document.getElementById(currentPage);
    const targetElement = document.getElementById(pageId);
    
    // 如果目标页面就是当前页面，则不做任何操作
    if (currentPage === pageId) return;
    
    // 确定动画方向（根据导航链接的位置）
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const currentIndex = navLinks.findIndex(link => link.getAttribute('data-page') === currentPage);
    const targetIndex = navLinks.findIndex(link => link.getAttribute('data-page') === pageId);
    
    // 添加动画类
    if (currentElement && targetElement) {
        if (currentIndex < targetIndex) {
            // 向右移动 - 当前页面向左滑出，新页面从右侧滑入
            currentElement.classList.add('slide-out-left');
            targetElement.classList.add('slide-in-right');
        } else {
            // 向左移动 - 当前页面向右滑出，新页面从左侧滑入
            currentElement.classList.add('slide-out-right');
            targetElement.classList.add('slide-in-left');
        }
        
        // 在动画结束后更新页面显示状态
        setTimeout(() => {
            // 隐藏所有页面内容
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.remove('active');
                // 移除动画类
                page.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
            });
            
            // 显示目标页面
            targetElement.classList.add('active');
        }, 500);
    } else {
        // 如果没有动画，直接切换（后备方案）
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });
        if (targetElement) {
            targetElement.classList.add('active');
        }
    }
    
    // 更新导航栏激活状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('nav-active');
    });
    
    // 激活当前页面对应的导航链接
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('nav-active');
    }
    
    // 更新当前页面记录
    currentPage = pageId;
}

// 处理导航链接点击事件
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page');
        showPage(pageId);
        // 更新URL但不刷新页面
        history.pushState(null, null, `#${pageId}`);
    });
});

// 处理页面加载时的hash
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showPage(hash);
        currentPage = hash;
    }
});

// 处理浏览器前进后退按钮
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showPage(hash);
        currentPage = hash;
    }
});