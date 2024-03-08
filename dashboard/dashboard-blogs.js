// Rich text editor................
// $('#text-one').trumbowyg();

ClassicEditor
  .create(document.querySelector('#richText'))
  .then(editor => {
    console.log('Editor initialized:', editor);
  })
  .catch(error => {
    console.error('Error initializing editor:', error);
  });


//today's blogs.....
function loading() {
  fetch("http://localhost:7000/api/blogs").then((res) => {
    res.json().then(data => {

      const blogs = data.blogs
      const blogsContainer = document.getElementById('blogsContainer')

      console.log(blogs);
      if (blogs.length > 0) {
        blogs?.map(blog => {
          blogsContainer.innerHTML +=
            `
            <div>
            <div id="blog1">
              <div id="image-container">
                <img id="blogpic1" src="${blog.image}">
              </div>
              <p id="how">${blog.title}</p>
              <div id="things">${blog.content}</div>
              <p id="stats1"> <span id="date1">${blog.date}</span><span id="likes1">${blog.likes} Likes</span><span
                  id="comments1">Comments</span></p>
              <div id="learn1">
                <p> <a href="blog.html?id=${blog._id}">Learn More</a> </p>
                <img src="Frame.png">
              </div>
            </div>
            <div id="icons1">
              <button id="edit1" >
                <img id="edit11" src="edit1.png">
              </button>
              <button id="delete1" onclick="deleteBlog('${blog._id}')">
                <img id="delete11" src="delete1.png">
              </button>
            </div>
          </div>
          
        
          `
        })
      }
      else {
        const blogsContainer = document.getElementById('blogsContainer');
        blogsContainer.innerHTML = ' <H1>No Blog found</H1> '
      }
    })
  }).catch((err) => {
    console.log(err)
  })
}
loading()

// posting a blog..............

function handleFormSubmit(event) {
  event.preventDefault();

  const title = document.getElementById('title1').value;
  const image = document.getElementById('image1').files[0];
  const content = document.getElementById('richText').value;


  createBlog(title, image, content);
}

function createBlog(title, image, content) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('image', image);
  formData.append('content', content);


  fetch('http://localhost:7000/api/blogs', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Blog post created successfully:', data);
      if (data.error === undefined) {
        showConfirmationMessage2();
      }else{
        const confMessage = document.getElementById('confirmationMessage2');
        const innerMessage = data.error;
        confMessage.innerText = innerMessage;
      }
      showConfirmationMessage2();
    })
    .catch(error => {
      console.error('Error creating blog post:', error);
    });
}
function showConfirmationMessage2() {

  const confirmationMessage = document.getElementById('confirmationMessage2');
  confirmationMessage.style.display = 'flex';
  setTimeout(() => {
    confirmationMessage.style.display = 'none';
    setTimeout(() => {
      window.location.reload();
    });
  }, 4000);

}



document.getElementById('blogForm').addEventListener('submit', handleFormSubmit);

//Patching the blog (editing a blog)....

// // Function to handle click event on edit button
// function handleEditButtonClick(blogId) {
//   // Fetch details of the blog post from the server
//   fetch(`http://localhost:7000/api/blogs/${blogId}`)
//     .then(response => response.json())
//     .then(data => {
//       // Populate form fields with fetched data
//       document.getElementById('title1').value = data.title;
//       // Handle image display if needed
//       // document.getElementById('image1').value = data.image;
//       document.getElementById('richText').value = data.content;

//       // Show the form for editing
//       document.getElementById('blogForm').style.display = 'block';
//       // Update form action to include blog ID for updating
//       document.getElementById('blogForm').setAttribute('data-blog-id', blogId);
//       // Change button text to "Update"
//       document.getElementById('submitButton').innerText = 'Update';
//     })
//     .catch(error => {
//       console.error('Error fetching blog details:', error);
//     });
// }

// // Add event listener to edit buttons
// document.querySelectorAll('.editButton').forEach(button => {
//   button.addEventListener('click', function() {
//     const blogId = this.getAttribute('data-blog-id');
//     handleEditButtonClick(blogId);
//   });
// });

// // Function to handle form submission for editing a blog post
// function handleFormSubmit(event) {
//   event.preventDefault(); 

//   const blogId = document.getElementById('blogForm').getAttribute('data-blog-id');
//   const title = document.getElementById('title1').value;
//   const image = document.getElementById('image1').files[0]; 
//   const content = document.getElementById('richText').value;

//   updateBlog(blogId, title, image, content);
// }

// // Function to update a blog post
// function updateBlog(blogId, title, image, content) {
//   const formData = new FormData();
//   formData.append('title', title);
//   formData.append('image', image);
//   formData.append('content', content);

//   fetch(`http://localhost:7000/api/blogs/${blogId}`, {
//     method: 'PATCH',
//     body: formData
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Blog post updated successfully:', data);
//     })
//     .catch(error => {
//       console.error('Error updating blog post:', error);
//     });
// }

// // Add event listener to the blog form submit event
// document.getElementById('blogForm').addEventListener('submit', handleFormSubmit);


// function deleteBlog(blogId) {
//   fetch(`http://localhost:7000/api/blogs/${blogId}`, {
//     method: 'DELETE'
//   })
//   .then(response => {
//     if (response.ok) {
//       console.log('Blog post deleted successfully');
//       // Optionally, you can perform additional actions after deleting the blog post, such as updating the UI
//     } else {
//       throw new Error('Failed to delete blog post');
//     }
//   })

//   .catch(error => {
//     console.error('Error deleting blog post:', error);
//   });
// }

// // Example usage:
// // Assuming you have a button with id="deleteButton" and a data attribute data-blog-id containing the ID of the blog post to be deleted
// // Attach click event listener to the delete button
// document.getElementById('delete1').addEventListener('click', function(event) {
//   // Prevent the default behavior of the delete button (e.g., form submission)
//   event.preventDefault();

//   // Get the parent element of the delete button, which should be the blog element
//   const blogElement = this.parentElement;


//   // Extract the blog id from the data-blog-id attribute of the blog element
//   const blogId = blogElement.getAttribute('data-blog-id');
//   // Confirm with the user if they want to delete the blog post
//   if (confirm('Are you sure you want to delete this blog post?')) {
//     // Call the deleteBlog function with the extracted blog id
//     deleteBlog(blogId);
//   }
// });

console.log('1')

// function handleEditButtonClick(blogId) {
//   fetch('http://localhost:7000/api/blogs/65e307dceccd2e7927942509').then((res) => {
//     res.json().then(data => {
//       const finalBlog = data.finalBlog; 
//       const blog = finalBlog.blog; 
//       // const blog = data.blog;

//       console.log(blog)
//       document.getElementById('title1').value = blog.title;
//       // document.getElementById('image1').value = blog.image;
//       document.getElementById('richText').value = blog.content;
//     })
//   }).catch ((err) => { console.log(err) });
// }

// document.getElementById('edit1').addEventListener('click', () => {
//   const blogId = '65e307dceccd2e7927942509';
//   handleEditButtonClick(blogId);
// });

// document.getElementById('createButton').addEventListener('click', () => {
//   const title = document.getElementById('title1').value;
//   const content = document.getElementById('richText').value;
//   // const image = document.getElementById('image1').value;
//   const blogId = document.getElementById('blogId').value;

//   Copyfetch(`http://localhost:7000/api/blogs/${blogId}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       title: title,
//       content: content
//     })
//   }).then((res) => {
//     console.log('Blog Updated');
//   }).catch((err) => {
//     console.log(err);
//   });
// });

console.log('2')
// function deleteBlog(blogId) {
//   fetch(`http://localhost:7000/api/blogs/${blogId}`, {
//     method: 'DELETE'
//   })
//   .then(response => {
//     if (response.ok) {
//       console.log('Blog post deleted successfully');
//       // Optionally, you can perform additional actions after deleting the blog post, such as updating the UI
//     } else {
//       throw new Error('Failed to delete blog post');
//     }
//   })
//   .catch(error => {
//     console.error('Error deleting blog post:', error);
//   });
// }

// // Event listener for the delete button
// document.getElementById('delete1').addEventListener('click', () => {
//   const blogId = `${blog._id}` ; // Add the correct blog ID here
//   const confirmDelete = confirm('Are you sure you want to delete this blog post?');
//   if (confirmDelete) {
//     deleteBlog(blogId);
//   }
// });

function deleteBlog(blogId) {

  const overlay = document.getElementById('overlay');
  overlay.style.display = 'block';

  const customDialog = document.getElementById('customDialog');
  customDialog.style.display = 'block';

  const confirmDeleteButton = document.getElementById('confirmDelete');
  const cancelDeleteButton = document.getElementById('cancelDelete');

  confirmDeleteButton.addEventListener('click', () => {
    fetch(`http://localhost:7000/api/blogs/${blogId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Blog deleted successfully');

          showConfirmationMessage();
        } else {
          console.error('Failed to delete the blog');
        }
      })
      .catch(error => {
        console.error('Error deleting the blog:', error);
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
  }, 4000);

}


loading()