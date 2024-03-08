const form = document.querySelector("form");
const names = document.getElementById("names");
const message = document.getElementById("yourcomment");
const namesError = document.querySelector("#names + span.error");
const messageError = document.querySelector("#yourcomment + span.error");

names.addEventListener("input", () => {
  if (names.validity.valid) {
    namesError.textContent = "";
    namesError.className = "error";
  } else {
    showNameError();
  }
});

message.addEventListener("input", () => {
  if (message.validity.valid) {
    messageError.textContent = "";
    messageError.className = "error";
  } else {
    showMessageError();
  }
});

form.addEventListener("submit", (event) => {
  if (!names.validity.valid || !message.validity.valid) {
    showNameError();
    showMessageError();
    event.preventDefault();
  }
});

function showNameError() {
  if (names.validity.valueMissing) {
    namesError.textContent = "Your name is needed";
  } else if (names.validity.tooShort) {
    namesError.textContent = `A name should be at least ${names.minLength} characters... you entered ${names.value.length}`;
  }
}

function showMessageError() {
  if (message.validity.valueMissing) {
    messageError.textContent = "Your comment is needed";
  } else if (message.validity.tooShort) {
    messageError.textContent = `A comment should be at least ${message.minLength} characters... you entered ${message.value.length}`;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');
  console.log(blogId)

  if (blogId) {
    fetch(`http://localhost:7000/api/blogs/${blogId}`)

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
        document.getElementById('content1').textContent = blog.content;
        document.getElementById('image1').src = blog.image;
      })
      .catch((error) => {
        console.error('Error fetching blog post:', error);
      });
  } else {
    console.error('No blog ID provided in the URL');
  }
});
