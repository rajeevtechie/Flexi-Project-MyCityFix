document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, lastname, email, password, gender })
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Registration failed');
        }

        alert('Registration successful! Redirecting to home page...');
        window.location.href = 'home.html'; // ✅ Redirect to home page

    } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
    }
});
