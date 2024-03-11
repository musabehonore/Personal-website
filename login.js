//login in

function handleFormSubmit(event) {
  event.preventDefault();

  const username = document.getElementById('names').value;
  const password = document.getElementById('password1').value;

  login(username, password);
}

function login(username, password) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  fetch('https://personal-web-backend-318j.onrender.com/api/login', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Login successful:', data);

      if (data.message === 'Login successful!!') {

        localStorage.setItem('isLoggedIn', 'true');

        const token = data.token;
        localStorage.setItem('Token', token);
        const Role = getTokenRole(token);

        showConfirmationMessage();

        setTimeout(() => {
          if (Role === 'admin') {
            window.location.href = '/dashboard/dashboard.html';
          } else if (Role === 'user') {
            window.location.href = '/index.html';
          } else {
            console.error('Unknown user role:', Role);
          }
        }, 3000);
      } else {
        const confMessage = document.getElementById('confirmationMessage');
        const innerMessage = data.message;
        confMessage.innerText = innerMessage;
        showConfirmationMessage();
      }

    })
    .catch(error => {
      console.error('Error signing up:', error);
    });
}

function showConfirmationMessage() {
  const confirmationMessage = document.getElementById('confirmationMessage');
  confirmationMessage.style.display = 'flex';
  setTimeout(() => {
    confirmationMessage.style.display = 'none';
  }, 4000);
}
function getTokenRole(token) {
  const decodedToken = atob(token.split('.')[1]);
  const parsedToken = JSON.parse(decodedToken);

  return parsedToken.role || 'unknown';
}

document.getElementById('loginForm').addEventListener('submit', handleFormSubmit);


