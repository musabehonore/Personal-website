// Rich text editor................
$('#text-one').trumbowyg();

// Creating new blogs..........

const blogForm = document.getElementById("blogForm");
const blogsContainer = document.querySelector("#blogs1");
const titleInput = blogForm['title'];
const summaryInput = blogForm['summary'];
const bodyInput = blogForm['body'];

const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

const addBlog = (title, summary, body) => {
  blogs.push({
    title: title,
    summary: summary,
    body: body,
  });

  localStorage.setItem("blogs", JSON.stringify(blogs));

  return blogs;

};

const createBlogElement = ({ title, summary, body }) => {
  const blogDiv = document.createElement('div');
  blogDiv.className = 'blog1container';

  const blogContentDiv = document.createElement('div');
  blogContentDiv.className = 'blog3';

  const blogImage = document.createElement('img');
  blogImage.className = 'blogpic1';
  blogImage.src = 'gallery_add_icon_240526.png'; // I will update the image when it will be needed
  const blogTitle = document.createElement('p');
  blogTitle.className = 'how';
  blogTitle.innerText = title;

  const blogSummary = document.createElement('p');
  blogSummary.className = 'things';
  blogSummary.innerText = summary;

  const blogBody = document.createElement('p');
  blogBody.innerText = body; // Insert body content

  const blogStats = document.createElement('p');
  blogStats.className = 'stats1';
  const dateSpan = document.createElement('span');
  dateSpan.className = 'date1';
  dateSpan.innerText = '17-01-2024'; // Static date
  const likesSpan = document.createElement('span');
  likesSpan.className = 'likes1';
  likesSpan.innerText = '15 Likes'; // Static likes
  const commentsSpan = document.createElement('span');
  commentsSpan.className = 'comments1';
  commentsSpan.innerText = '5 Comments'; // Static comments
  blogStats.appendChild(dateSpan);
  blogStats.appendChild(likesSpan);
  blogStats.appendChild(commentsSpan);

  const learnMoreDiv = document.createElement('div');
  learnMoreDiv.className = 'learn1';
  const learnMoreLink = document.createElement('a');
  // learnMoreLink.href = 'blog3.html'; // Update the href if it should be dynamic
  learnMoreLink.innerText = 'Learn More';
  const learnMoreImg = document.createElement('img');
  learnMoreImg.src = 'Frame.png';
  learnMoreDiv.appendChild(learnMoreLink);
  learnMoreDiv.appendChild(learnMoreImg);

  blogContentDiv.appendChild(blogImage);
  blogContentDiv.appendChild(blogTitle);
  blogContentDiv.appendChild(blogSummary);
  blogContentDiv.appendChild(blogBody);
  blogContentDiv.appendChild(blogStats);
  blogContentDiv.appendChild(learnMoreDiv);

  const iconsDiv = document.createElement('div');
  iconsDiv.className = 'icons';
  const editImg = document.createElement('img');
  editImg.src = 'edit1.png';
  const updateImg = document.createElement('img');
  updateImg.src = 'update1.png';
  const deleteImg = document.createElement('img');
  deleteImg.src = 'delete1.png';
  iconsDiv.appendChild(editImg);
  iconsDiv.appendChild(updateImg);
  iconsDiv.appendChild(deleteImg);

  blogDiv.appendChild(blogContentDiv);
  blogDiv.appendChild(iconsDiv);

  blogsContainer.appendChild(blogDiv);
}


blogs.forEach(createBlogElement);

blogForm.onsubmit = e => {
  e.preventDefault();

  const newBlog = addBlog(
    titleInput.value,
    summaryInput.value,
    bodyInput.value   
  );

  createBlogElement(newBlog);

  titleInput.value = "";
  summaryInput.value = "";
  bodyInput.value = "";

};


