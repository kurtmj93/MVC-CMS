const newUserForm = async function(event) {
    event.preventDefault();
  
    // grab form input elements
    const userEl = document.querySelector('#usernameInput');
    const passEl = document.querySelector('#passwordInput');
  
    const response = await fetch('/api/users', { // POST inputs to API/USERS
      method: 'POST',
      body: JSON.stringify({
        username: userEl.value,
        password: passEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard'); // send user back to main
    } else {
      alert('Failed to sign up'); 
    }
  };

  
  document
    .querySelector('#signup')
    .addEventListener('submit', newUserForm);