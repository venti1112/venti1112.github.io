// 加载动画初始化脚本 - 在head中引用
(function() {
    // 内联关键CSS
    const style = document.createElement('style');
    style.textContent = `
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
        }
        .loader {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #2bc5a2;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
        .loading-text {
            color: #2bc5a2;
            font-size: 1.2rem;
            font-weight: 500;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // 创建加载界面
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loader"></div>
        <div class="loading-text">加载中...</div>
    `;
    document.body.insertBefore(loadingScreen, document.body.firstChild);

    // 预加载背景图
    const bgImage = new Image();
    bgImage.src = '/assets/image/wp.jpg';

    // 隐藏加载界面函数 - 供外部调用
    window.hideLoading = function() {
        loadingScreen.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
            style.remove();
        }, 500);
    };

    // 自动隐藏机制
    window.addEventListener('load', hideLoading);
    document.addEventListener('DOMContentLoaded', hideLoading);
    setTimeout(hideLoading, 3000);
    if (document.readyState === 'complete') hideLoading();
})();
