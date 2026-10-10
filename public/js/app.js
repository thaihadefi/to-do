document.addEventListener('DOMContentLoaded', function() {
  
  document.addEventListener('submit', function(e) {
    const form = e.target;
    const isTaskForm = form.action.includes('/api/tasks') || form.action.endsWith('/task');

    if (isTaskForm && form.method.toLowerCase() === 'post') {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.setAttribute('disabled', '');
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const targetUrl = form.action.includes('/api/tasks') ? form.action : '/api/tasks';

      fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        return { ok: response.ok, status: response.status, data: result };
      })
      .then(({ ok, data: result }) => {
        if (ok && result.code === 'success') {
          notify.success(result.message || 'Task created successfully!');
          setTimeout(() => {
            window.location.href = result.redirect || '/';
          }, 800);
        } else {
          notify.error(result.message || 'Failed to create task');
          if (submitBtn) {
            submitBtn.classList.remove('is-loading');
            submitBtn.removeAttribute('disabled');
          }
        }
      })
      .catch((error) => {
        console.error('Error creating task:', error);
        notify.error('Network error. Please try again.');
        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.removeAttribute('disabled');
        }
      });
    }
  });

  document.addEventListener('click', function(e) {
    const button = e.target.closest('[button-api]');
    if (!button) return;

    e.preventDefault();

    const api = button.getAttribute('data-api');
    const method = (button.getAttribute('data-method') || 'GET').toUpperCase();
    const payloadAttr = button.getAttribute('data-payload');
    let payload = null;

    if (payloadAttr) {
      try {
        payload = JSON.parse(payloadAttr);
      } catch (err) {
        console.error('Failed to parse data-payload JSON:', err);
      }
    }

    const doFetch = () => {
      button.classList.add('is-loading');
      button.setAttribute('disabled', '');

      const fetchOptions = {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      if (payload && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
        fetchOptions.body = JSON.stringify(payload);
      }

      fetch(api, fetchOptions)
        .then(async (res) => {
          const resData = await res.json().catch(() => ({}));
          return { ok: res.ok, status: res.status, data: resData };
        })
        .then(({ ok, data: resData }) => {
          button.classList.remove('is-loading');
          button.removeAttribute('disabled');

          if (ok && resData.code === 'success') {
            notify.success(resData.message || 'Action completed successfully!');

            const taskItem = button.closest('.task-item');
            if (method === 'DELETE') {
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
            } else if (method === 'PATCH') {
              if (taskItem) {
                taskItem.classList.add('done');
                const taskTitle = taskItem.querySelector('.task-title');
                if (taskTitle) {
                  taskTitle.classList.add('done');
                }
                button.remove();
              }
            }
          } else {
            notify.error(resData.message || 'An error occurred');
          }
        })
        .catch((error) => {
          console.error('Fetch error:', error);
          button.classList.remove('is-loading');
          button.removeAttribute('disabled');
          notify.error('Failed to perform action. Please try again.');
        });
    };

    doFetch();
  });

});
