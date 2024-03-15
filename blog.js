const form = document.querySelector("form");
// const names = document.getElementById("names");
const message = document.getElementById("yourcomment");
// const namesError = document.querySelector("#names + span.error");
const messageError = document.querySelector("#yourcomment + span.error");

// names.addEventListener("input", () => {
//   if (names.validity.valid) {
//     namesError.textContent = "";
//     namesError.className = "error";
//   } else {
//     showNameError();
//   }
// });

message.addEventListener("input", () => {
  if (message.validity.valid) {
    messageError.textContent = "";
    messageError.className = "error";
  } else {
    showMessageError();
  }
});

form.addEventListener("submit", (event) => {
  if (!message.validity.valid) {
    showNameError();
    showMessageError();
    event.preventDefault();
  }
});

// function showNameError() {
//   if (names.validity.valueMissing) {
//     namesError.textContent = "Your name is needed";
//   } else if (names.validity.tooShort) {
//     namesError.textContent = `A name should be at least ${names.minLength} characters... you entered ${names.value.length}`;
//   }
// }

function showMessageError() {
  if (message.validity.valueMissing) {
    messageError.textContent = "Your comment is needed";
  } else if (message.validity.tooShort) {
    messageError.textContent = `A comment should be at least ${message.minLength} characters... you entered ${message.value.length}`;
  }
}

//fetching blog..
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');
  // const blogId = '65e1e6d16d14c490fa496f6c';
  console.log(blogId)


  if (blogId) {
    fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}`)

      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch blog post');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        const finalBlog = data.finalBlog;
        const blog = finalBlog.blog;
        document.getElementById('title1').textContent = blog.title;
        document.getElementById('content1').innerHTML = blog.content;
        document.getElementById('image1').src = blog.image;
      })
      .catch((error) => {
        console.error('Error fetching blog post:', error);
      });
  } else {
    console.error('No blog ID provided in the URL');
  }

   //like....
   if (blogId) {
    fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}/likes`).then((res) => {
      res.json().then(data => {
        console.log(data)


        const likes = data.likes
        const likesCount = document.getElementById('likesCount')

        console.log(likes);

        if (likes > 0) {
          likesCount.innerHTML = likes
        }

      })
    }).catch((err) => {
      console.log(err)
    })
  }
  //add a like
  const likeButton = document.getElementById('likeButton');
  likeButton.addEventListener('click', function () {

    fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}/like`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        const updatedLikesCount = data.likes;
        likesCount.textContent = updatedLikesCount;
        console.log('Like added successfully:', data);
      })
      .catch(error => {
        console.error('Error adding a like:', error);
      });
  });

  // comments loading
  if (blogId) {
    fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}/comments`).then((res) => {
      res.json().then(data => {


        const comments = data.data
        const commentsContainer = document.getElementById('commentsContainer')

        console.log(comments);
        if (comments.length > 0) {
          comments?.forEach(comment => {
            commentsContainer.innerHTML +=
              `
            <div class="comment1">
            <p>
              <img  src="commentor2.jpg">
              <span id="name" class="commentor">${comment.name}  <span id="commentDate" class="commentDate"> ${comment.date}</span>  <br/> </span> <br/> <span id="comment" class="commenttext">${comment.comment} </span> 
              
            </p>        
          </div>
            `
          });

          const commentDateElements = document.getElementsByClassName('commentDate');

          for (let i = 0; i < commentDateElements.length; i++) {
            const commentDate = commentDateElements[i];

            const commentDateInner = commentDate.innerHTML;
            const updatedDate = commentDateInner.substr(0, 17);
            commentDate.innerHTML = updatedDate;
          }

          // autoSlide();
        }
        else {
          const commentsContainer = document.getElementById('commentsContainer');
          commentsContainer.innerHTML = `
          <p class='noComments' >No comments yet</p>
          <p class='noComments2' >Be the first to comment...</p> `
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  }


  //post a comment

  document.getElementById('commentForm').onsubmit = function () {
    return checkToken();
  };


  function checkToken() {
    const token = localStorage.getItem('Token');

    if (!token) {
      console.log('No token found! Please log in.');
      event.preventDefault();
      const confMessage = document.getElementById('confirmationMessage');
      const innerMessage = 'Unauthenticated!  please first Login';
      confMessage.innerText = innerMessage;
      showConfirmationMessage();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 3900);
      return false;
    }

    return true;
  }

  const token = localStorage.getItem('Token');
  function getTokenRole(token) {
    const decodedToken = atob(token.split('.')[1]);
    const parsedToken = JSON.parse(decodedToken);

    return parsedToken;
  }
  const User = getTokenRole(token);
  const name1 = User.username;
  const email1 = User.email;
  console.log(User)

  function handleFormSubmit(event) {
    event.preventDefault();

    const name = name1;
    const email = email1;
    const yourcomment = document.getElementById('yourcomment').value;

    postComment(name, email, yourcomment);
  }


  function postComment(name, email, yourcomment) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('comment', yourcomment);

    const Token = localStorage.getItem('Token');
    fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Token}`,
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Comment posted successfully:', data);

        showConfirmationMessage();
        // document.getElementById('yourcomment').reset();
      })
      .catch(error => {
        console.error('Error posting a comment:', error);
      });
  }

  function showConfirmationMessage() {
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.style.display = 'flex';
    setTimeout(() => {
      confirmationMessage.style.display = 'none';
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, 4000);
  }

  document.getElementById('commentForm').addEventListener('submit', handleFormSubmit);

});

