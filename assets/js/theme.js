// 从localStorage获取存储的主题名称
const getStoredTheme = () => {
  try {
    return localStorage.getItem('theme')
  } catch (e) {
    return null;
  }
}

// 存储主题到localStorage
const setStoredTheme = theme => {
  try {
    localStorage.setItem('theme', theme)
  } catch (e) {
    // 私隐模式或存储被阻止时静默失败
  }
}

// 获取首选主题（优先使用存储的主题，否则默认为浅色）
const getPreferredTheme = () => {
  const storedTheme = getStoredTheme()
  if (storedTheme) {
    return storedTheme
  }

  return 'light'
}

// 设置主题到HTML元素的data-bs-theme属性
const setTheme = theme => {
  const newTheme = theme === 'auto' ? 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
    theme
  document.documentElement.setAttribute('data-bs-theme', newTheme)
}

// 应用首选主题
setTheme(getPreferredTheme())

// 更新主题切换按钮UI的状态
const showActiveTheme = (theme, focus = false) => {
  const btnToActive = document.querySelector('[data-bs-theme-value]');
  if (!btnToActive) {
    return;
  }

  // 重置所有主题按钮状态
  document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
    element.classList.remove('active');
    element.setAttribute('aria-pressed', 'false');
  });

  // 激活当前主题按钮
  btnToActive.classList.add('active');
  btnToActive.setAttribute('aria-pressed', 'true');

  // 更新按钮文本内容为Unicode符号
  if (theme === 'dark') {
    btnToActive.textContent = '☀️';
  } else {
    btnToActive.textContent = '🌙';
  }

  // 动态更新按钮的data-bs-theme-value为相反主题值，实现切换逻辑
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  btnToActive.setAttribute('data-bs-theme-value', nextTheme);

  if (focus) {
    btnToActive.focus();
  }
}

// 页面加载完成后初始化主题UI
window.addEventListener('DOMContentLoaded', () => {
  const currentTheme = getPreferredTheme();
  
  // 显示当前激活的主题状态
  showActiveTheme(currentTheme);

  // 为所有主题切换按钮绑定点击事件
  document.querySelectorAll('[data-bs-theme-value]')
    .forEach(toggle => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-bs-theme-value')
        setStoredTheme(theme)
        setTheme(theme)
        showActiveTheme(theme, true)
      })
    })
})