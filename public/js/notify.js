class NotifyJS {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.id = 'notify-container';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `notify-toast notify-${type}`;
    
    const colors = {
      success: { bg: '#27ae60', icon: '✓' },
      error: { bg: '#e74c3c', icon: '✗' },
      info: { bg: '#0057B7', icon: 'ℹ' },
      warning: { bg: '#FFD700', icon: '⚠', textColor: '#333' }
    };

    const config = colors[type] || colors.info;
    const textColor = config.textColor || '#fff';

    toast.style.cssText = `
      background: ${config.bg};
      color: ${textColor};
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      min-width: 250px;
      max-width: 400px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 14px;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
      cursor: pointer;
    `;

    toast.innerHTML = `
      <span style="font-size: 18px; font-weight: bold;">${config.icon}</span>
      <span style="flex: 1;">${message}</span>
      <span style="opacity: 0.7; font-size: 12px;">×</span>
    `;

    if (!document.getElementById('notify-animations')) {
      const style = document.createElement('style');
      style.id = 'notify-animations';
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    this.container.appendChild(toast);

    toast.addEventListener('click', () => {
      this.remove(toast);
    });

    if (duration > 0) {
      setTimeout(() => {
        this.remove(toast);
      }, duration);
    }

    return toast;
  }

  remove(toast) {
    toast.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  }

  error(message, duration = 4000) {
    return this.show(message, 'error', duration);
  }

  info(message, duration = 3000) {
    return this.show(message, 'info', duration);
  }

  warning(message, duration = 3000) {
    return this.show(message, 'warning', duration);
  }
}

const notify = new NotifyJS();
