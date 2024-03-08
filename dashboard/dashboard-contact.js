function loading() {
  fetch("http://localhost:7000/api/queries").then((res) => {
    res.json().then(data => {


      const queries = data.queries
      const messagesContainer = document.getElementById('messagesContainer')

      console.log(queries);
      if (queries.length > 0) {
        queries?.forEach(message => {
          messagesContainer.innerHTML +=
            `
          <div class="message10">
  <div class="image2">
    <img src="commentor2.jpg">
  </div>
  <div class="box">
    <div class="text5">
      <p id="name" class="commentor">${message.name} <span class="commentorEmail"> ${message.email}</span> </p>
      <p id="message" class="comment1">${message.message}</p>
    </div>
    <div class="like">
      <p>Like &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reply</p>
      <input type="text">
    </div>
  </div>
  <button class="delete" onclick="deleteQuery('${message._id}')">
    <img src="delete1.png">
  </button>   
</div>
          `
        });
        // autoSlide();
      }
      else {
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.innerHTML = ' <H1>No Queries found</H1> '
      }
    })
  }).catch((err) => {
    console.log(err)
  })
}
//deleting a query.....
function deleteQuery(queryId) {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'block';

  const customDialog = document.getElementById('customDialog');
  customDialog.style.display = 'block';

  const confirmDeleteButton = document.getElementById('confirmDelete');
  const cancelDeleteButton = document.getElementById('cancelDelete');

  confirmDeleteButton.addEventListener('click', () => {
    fetch(`http://localhost:7000/api/queries/${queryId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Query deleted successfully');
        showConfirmationMessage();
      } else {
        console.error('Failed to delete query');
      }
    })
    .catch(error => {
      console.error('Error deleting query:', error);
    });

    overlay.style.display = 'none';
    customDialog.style.display = 'none';
  });

  cancelDeleteButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    customDialog.style.display = 'none';
  });
}

function showConfirmationMessage() {
  const confirmationMessage = document.getElementById('confirmationMessage');
  confirmationMessage.style.display = 'flex';
  setTimeout(() => {
    confirmationMessage.style.display = 'none';
    setTimeout(() => {
      window.location.reload();
    }); 
  }, 3000); 
}


loading()