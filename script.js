// Registration form
document.getElementById('registrationForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    
    const result = await response.json();
    const msgEl = document.getElementById('message');
    msgEl.textContent = result.message;
    msgEl.className = response.ok ? 'alert alert-success' : 'alert alert-danger';
    msgEl.classList.remove('d-none');
});

// Login form
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const result = await response.json();
    const msgEl = document.getElementById('message');
    msgEl.textContent = result.message;
    msgEl.className = response.ok ? 'alert alert-success' : 'alert alert-danger';
    msgEl.classList.remove('d-none');
});