// 点击事件处理脚本 - 在body底部引用
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href && !e.target.href.includes('#') && 
        !e.target.classList.contains('no-loading')) {
        e.preventDefault();
        
        // 重新显示加载界面
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loader"></div>
            <div class="loading-text">加载中...</div>
        `;
        document.body.appendChild(loadingScreen);
        
        // 添加淡出效果
        document.body.classList.add('fade-out');
        
        // 跳转页面
        setTimeout(() => {
            window.location.href = e.target.href;
        }, 300);
    }
});
