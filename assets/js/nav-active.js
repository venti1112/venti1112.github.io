// 导航栏活动状态处理
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('nav a');
    
    // 遍历导航链接
    navLinks.forEach(link => {
        // 检查链接路径是否匹配当前页面路径
        if (link.getAttribute('href') === currentPath) {
            // 添加active类
            link.classList.add('active');
        }
    });
});
