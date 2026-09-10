document.addEventListener('DOMContentLoaded', function() {
  
  document.addEventListener('submit', function(e) {
    const form = e.target;
    
    if (form.action.endsWith('/task') && form.method.toLowerCase() === 'post') {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      fetch(form.action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success || data.code === 'success') {
          notify.success(data.message);
          setTimeout(() => {
            window.location.href = data.redirect || '/';
          }, 1000);
        } else {
          notify.error(data.message || 'Failed to create task');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        notify.error('Failed to create task. Please try again.');
      });
      
      return;
    }
    
    if (form.action.includes('/task/') && (form.action.includes('/done') || form.action.includes('/delete'))) {
      e.preventDefault();
      
      const url = form.action;
      const isDelete = form.action.includes('/delete');
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success || data.code === 'success') {
          if (isDelete) {
            notify.success(data.message);
            const taskItem = form.closest('.task-item');
            if (taskItem) {
              taskItem.style.transition = 'all 0.3s ease-out';
              taskItem.style.opacity = '0';
              taskItem.style.transform = 'translateX(-100%)';
              setTimeout(() => {
                taskItem.remove();
                const taskList = document.querySelector('.task-list');
                if (taskList && taskList.children.length === 0) {
                  location.reload();
                }
              }, 300);
            }
          } else {
            notify.success(data.message);
            const taskItem = form.closest('.task-item');
            if (taskItem) {
              taskItem.classList.add('done');
              const taskTitle = taskItem.querySelector('.task-title');
              if (taskTitle) {
                taskTitle.classList.add('done');
              }
              form.remove();
            }
          }
        } else {
          notify.error(data.message || 'An error occurred');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        notify.error('Failed to perform action. Please try again.');
      });
    }
  });
  
});
