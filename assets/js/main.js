function copyServerCode() {
    const code = document.getElementById('serverCode').innerText;
    navigator.clipboard.writeText(code)
        .then(() => {
            alert('服务器配置代码已复制到剪贴板');
        })
        .catch(err => {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制代码');
        });
}
