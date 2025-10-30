document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Login failed');
        }
        
        const data = await res.json();
        
        // Store the token for later requests
        localStorage.setItem('token', data.token);

        alert('Login successful!');
        window.location.href = '../website.html'; // Redirect to the main issues page

    } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
    }
});
