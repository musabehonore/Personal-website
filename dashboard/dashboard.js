//logout...... logging out.....
document.getElementById('logoutButton').addEventListener('click', function () {
  localStorage.removeItem('Token');
  localStorage.removeItem('isLoggedIn');
  showConfirmationMessage3();
  setTimeout(() => {
    window.location.reload();
  }, 3000);
});

function showConfirmationMessage3() {
  const confirmationMessage = document.getElementById('confirmationMessage3');
  confirmationMessage.style.display = 'flex';
  setTimeout(() => {
    confirmationMessage.style.display = 'none';
  }, 3000);
}
const isLoggedIn = localStorage.getItem('isLoggedIn');

if (isLoggedIn === 'true') { } else {
  const logoutButton = document.getElementById('logoutButton');
  logoutButton.style.display = 'none';
}

//The Stats
fetch("https://personal-web-backend-318j.onrender.com/api/blogs/")
  .then(response => response.json())
  .then(data => {
    const blogs = data.blogs;

    let totalLikes = 0;
    let totalBlogs = 0;
    let totalComments = 0;
    blogs.forEach(blog => {
      totalLikes += blog.likes;
      totalBlogs++;

      fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blog._id}/comments`)
        .then((res) => {
          res.json().then(data => {
            const comments = data.data

            totalComments += comments.length;
            const totalComments1 = document.getElementById('totalComments1');
            totalComments1.textContent = `${totalComments}`;
          });
        });


    });
    const totalLikes1 = document.getElementById('totalLikes1');
    totalLikes1.textContent = `${totalLikes}`;

    const totalBlogs1 = document.getElementById('totalBlogs1');
    totalBlogs1.textContent = `${totalBlogs}`;


  })
  .catch(error => {
    console.error('Error fetching blogs:', error);
  });

