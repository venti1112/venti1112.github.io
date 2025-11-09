// 页面切换逻辑
function showPage(pageId) {
    // 隐藏所有页面内容
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示指定页面
    document.getElementById(pageId).classList.add('active');
    
    // 更新导航栏激活状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('nav-active');
    });
    
    // 激活当前页面对应的导航链接
    document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('nav-active');
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
    }
});

// 处理浏览器前进后退按钮
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showPage(hash);
    }
});