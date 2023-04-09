const loginForm = async function(event) {
    event.preventDefault();
  
    // grab form input elements
    const userEl = document.querySelector('#usernameInput');
    const passEl = document.querySelector('#passwordInput');
  
    const response = await fetch('/api/users/login', { // POST inputs to API/USERS
      method: 'POST',
      body: JSON.stringify({
        username: userEl.value,
        password: passEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard'); // send user to dashboard
    } else {
      alert('Failed to sign up'); 
    }
  };

  
  document
    .querySelector('#login')
    .addEventListener('submit', loginForm);