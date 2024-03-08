//signing up

function handleFormSubmit(event) {
  event.preventDefault();

  const username = document.getElementById('names').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password1').value;

  signUp(username, email, password);
}

function signUp(username, email, password) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);

  fetch('http://localhost:7000/api/signup', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Sign Up successful:', data.message);
    
  if (data.message === 'User created successfully') {
    showConfirmationMessage();
  }else{
    const confMessage = document.getElementById('confirmationMessage');
    const innerMessage = data.message;
    confMessage.innerText = innerMessage;
    showConfirmationMessage();
  }
    
    // document.getElementById('password1').reset();
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

document.getElementById('signupForm').addEventListener('submit', handleFormSubmit);
