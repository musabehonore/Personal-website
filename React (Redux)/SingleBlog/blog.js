const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');
console.log(blogId);

//fetching the blog......
const SingleBlogFunction = () => {
  const [blog, setBlog] = React.useState(null);

  React.useEffect(() => {
    if (blogId) {
      fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch blog post');
          }
          return res.json();
        })
        .then((data) => {
          const finalBlog = data.finalBlog;
          const blog = finalBlog.blog;
          console.log(blog);

          setBlog(blog);
        })
        .catch((error) => {
          console.error('Error fetching blog post:', error);
        });
    } else {
      console.error('No blog ID provided in the URL');
    }
  }, []);

  if (!blog) {
    return <div className="loading">Loading Blog...</div>;
  }

  return (
    <div>
      <p className="how5" id="title1">{blog.title} </p>
      <div className="intro-pic">
        <img id="image1" src={blog.image} />
      </div>
      <div className="body1" id="content1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  );
};

ReactDOM.render(
  <SingleBlogFunction />,
  document.getElementById('theBlog')
)

// fetching comments.......
const CommentsLoading = () => {

  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    if (blogId) {
      fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}/comments`).then((res) => {
        res.json().then(data => {

          const comments1 = data.data;
          setComments(comments1);

          console.log(comments1);

          const commentDateElements = document.getElementsByClassName('commentDate');

          for (let i = 0; i < commentDateElements.length; i++) {
            const commentDate = commentDateElements[i];

            const commentDateInner = commentDate.innerHTML;
            const updatedDate = commentDateInner.substr(0, 16);
            commentDate.innerHTML = updatedDate;
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    }

  }, []);

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div className="comment1" key={index}>
            <p>
              <img src="commentor2.jpg" />
              <span id="name" className="commentor">{comment.name}  <span id="commentDate" className="commentDate">{comment.date}</span>  <br /> </span> <br /> <span id="comment" className="commenttext">{comment.comment} </span>
            </p>
          </div>

        ))
      ) : (
        <>
          <p class='noComments' >No comments yet</p>
          <p class='noComments2' >Be the first to comment...</p>
        </>

      )}
    </div>
  );
};

ReactDOM.render(
  <CommentsLoading />,
  document.getElementById('commentsContainer')
)

// //likes loading.............
// const LikesLoading = () => {

//   const [likes, setLikes] = React.useState(null);

//   React.useEffect(() => {
//     if (blogId) {
//       fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}/likes`).then((res) => {
//         res.json().then(data => {
//           console.log(data)

//           const likes = data.likes
//           setLikes(likes);
//         })
//       }).catch((err) => {
//         console.log(err)
//       })
//     }

//   }, []);

//   return (
//     <>{likes}</>
//   )

// };

// ReactDOM.render(
//   <LikesLoading />,
//   document.getElementById('likesCount')
// )

// posting a like


const LikeButton = ({ blogId }) => {
  const [likes, setLikes] = React.useState(0);

  React.useEffect(() => {
    fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}/likes`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [blogId]);

  const handleLike = () => {
    fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}/like`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        const updatedLikesCount = data.likes;
        setLikes(updatedLikesCount);
        console.log('Like added successfully:', data);
      })
      .catch(error => {
        console.error('Error adding a like:', error);
      });
  };

  return (
    <button onClick={handleLike} id="likeButton" className="like">
      <div id="likesCount">{likes}</div>
      <img src="likeIcon.png" />
    </button>

  );
};

ReactDOM.render(
  <LikeButton blogId={blogId} />,
  document.getElementById('likesContainer')
);

//Adding a comment...........

const CommentForm = ({ blogId }) => {
  const [yourComment, setYourComment] = React.useState('');
  const [confirmationMessage, setConfirmationMessage] = React.useState('');
  const [User, setUser] = React.useState(null);
  const [ConfirmationMessage2, setConfirmationMessage2] = React.useState('')

  React.useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedToken = decodeToken(token);
      setUser(decodedToken);
    }
  }, []);

  const decodeToken = (token) => {
    const decodedToken = atob(token.split('.')[1]);
    return JSON.parse(decodedToken);
  };

  const handleCommentChange = (event) => {
    setYourComment(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('Token');

    if (!token) {
      console.log('No token found! Please log in.');
      showConfirmationMessage2();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 3900);
      return;
    }

    const formData = new FormData();
    formData.append('name', User.username);
    formData.append('email', User.email);
    formData.append('comment', yourComment);

    fetch(`https://personal-web-backend-318j.onrender.com/api/blogs/${blogId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Comment posted successfully:', data);
        showConfirmationMessage();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch(error => {
        console.error('Error posting a comment:', error);
      });

  };
  const showConfirmationMessage = () => {
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.style.display = 'flex';
    setTimeout(() => {
      confirmationMessage.style.display = 'none';
    }, 4000);
  };
  const showConfirmationMessage2 = () => {
    const confirmationMessage = document.getElementById('confirmationMessage2');
    confirmationMessage.style.display = 'flex';
    setTimeout(() => {
      confirmationMessage.style.display = 'none';
    }, 4000);
  };

  return (
    <form id="commentForm" onSubmit={handleFormSubmit}>
      <div className="commentBox">
        <input className="yourcomment" type="text" id="yourcomment" name="yourcomment" placeholder="Your comment" required
          minLength="9" value={yourComment} onChange={handleCommentChange} />
        <span className="error" aria-live="polite"></span>
      </div>

      <button id="commentButton" type="submit">Comment</button>
      <div id="confirmationMessage" className="confirmation-message">Comment Posted Successfully!!</div>
      <div id="confirmationMessage2" className="confirmation-message">Unauthenticated!  Please first Login</div>

    </form>

  );
};

ReactDOM.render(
  <CommentForm blogId={blogId} />,
  document.getElementById('commentForm')
);

