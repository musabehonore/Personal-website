function loading() {
  fetch("http://localhost:7000/api/blogs/").then((res) => {
    res.json().then(data => {

      const blogs = data.blogs
      const blogsContainer = document.getElementById('blogsContainer')

      console.log(blogs);
      if (blogs.length > 0) {
        blogs?.forEach(blog => {
          blogsContainer.innerHTML +=
            `
          <div id="blog1">
          <div id="image-container">
            <img id="blogpic1" src="${blog.image}">
          </div>
          <p id="how">${blog.title}</p>
          <div id="things">${blog.content}</div>
          <p id="stats1"> <span id="date1">${blog.date}</span><span id="likes1">${blog.likes} Likes</span><span id="comments1">Comments</span></p>
          <div id="learn1">
            <p> <a href="blog.html?id=${blog._id}">Learn More</a> </p>
            <img src="Frame.png">
          </div>
        </div>
          `
        });
        autoSlide();
      }
      else {
        const blogsContainer = document.getElementById('blogsContainer');
        blogsContainer.innerHTML = ' <H1> No Blog found </H1> '
      }
    })
  }).catch((err) => {
    console.log(err)
  })
}
loading()


//auto sliding

function autoSlide() {
  const blogsContainer = document.getElementById('blogsContainer');
  let currentPosition = 0;
  const blogWidth = blogsContainer.children[0].offsetWidth;

  const slideInterval = setInterval(() => {
    currentPosition += 1;
    blogsContainer.style.transform = `translateX(-${currentPosition * (blogWidth + 20)}px)`;
    if (currentPosition >= blogsContainer.children.length) {
      currentPosition = 0;
      blogsContainer.style.transform = `translateX(0)`;
    }
  }, 3000);

  // blogsContainer.addEventListener('mouseenter', () => {
  //   clearInterval(slideInterval);
  // });

  // blogsContainer.addEventListener('mouseleave', () => {
  //   slideInterval = setInterval(() => {
  //     currentPosition += 1; 
  //     blogsContainer.style.transform = `translateX(-${currentPosition * (blogWidth + 20)}px)`; // Adjust 20 for margin between blogs
  //     if (currentPosition >= blogsContainer.children.length) {
  //       currentPosition = 0;
  //       blogsContainer.style.transform = `translateX(0)`;
  //     }
  //   }, 4000); 
  // });
}


//sending a query

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('names').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  postQuery(name, email, message);
}

function postQuery(name, email, message) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);

  fetch('http://localhost:7000/api/queries', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Query posted successfully:', data);
      if (!data.error === undefined) {
        const confMessage = document.getElementById('confirmationMessage');
        const innerMessage = data.error;
        confMessage.innerText = innerMessage;
      }

      showConfirmationMessage();
      document.getElementById('message1').reset();
    })
    .catch(error => {
      console.error('Error posting query:', error);
    });
}

function showConfirmationMessage() {
  const confirmationMessage = document.getElementById('confirmationMessage');
  confirmationMessage.style.display = 'flex';
  setTimeout(() => {
    confirmationMessage.style.display = 'none';
  }, 4000);
}

document.getElementById('message1').addEventListener('submit', handleFormSubmit);


