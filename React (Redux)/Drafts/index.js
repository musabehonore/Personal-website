
// const BlogsFunction = () => {
//   const [blogs, setBlogs] = React.useState([]);

//   React.useEffect(() => {
//     fetch("https://personal-web-backend-318j.onrender.com/api/blogs/").then((res) => {
//       res.json().then(data => {

//         const blogs = data.blogs

//         console.log(blogs)
//         setBlogs(blogs);
//         autoSlide();
//       })
//     })
//   }, []);
//   function autoSlide() {
//     const blogsContainer = document.getElementById('blogsContainer');
//     let currentPosition = 0;
//     const blogWidth = blogsContainer.children[0].offsetWidth;

//     const slideInterval = setInterval(() => {
//       currentPosition += 1;
//       blogsContainer.style.transform = `translateX(-${currentPosition * (blogWidth + 20)}px)`;
//       if (currentPosition >= blogsContainer.children.length) {
//         currentPosition = 0;
//         blogsContainer.style.transform = `translateX(0)`;
//       }
//     }, 3000);
//   }

//   return (
//     <div id="blogsContainer">
//       {blogs.length > 0 ? (
//         blogs.map(blog => (
//           <div id="blog1" key={blog._id}>
//             <div id="image-container">
//               <img id="blogpic1" src={blog.image} />
//             </div>
//             <p id="how">{blog.title}</p>
//             <div id="things" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
//             <p id="stats1"> <span id="date1">{blog.date}</span><span id="likes1">{blog.likes} Likes</span><span id="comments1">Comments</span></p>
//             <div id="learn1">
//               <p> <a href={`blog.html?id=${blog._id}`}>Learn More</a> </p>
//               <img src="Frame.png" />
//             </div>
//           </div>
//         ))

//       ) : (
//         <div className='loading'>Loading Blogs...</div>
//       )}
//     </div>
//   );
// }

// ReactDOM.render(
//   <BlogsFunction />,
//   document.getElementById('bContainer1')
// )



// Define Redux actions
const FETCH_BLOGS_REQUEST = 'FETCH_BLOGS_REQUEST';
const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';

// Action creators
const fetchBlogsRequest = () => ({
  type: FETCH_BLOGS_REQUEST
});

const fetchBlogsSuccess = (blogs) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: blogs
});

const fetchBlogsFailure = (error) => ({
  type: FETCH_BLOGS_FAILURE,
  payload: error
});

// Define reducer
const initialState = {
  loading: false,
  blogs: [],
  error: ''
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
        error: ''
      };
    case FETCH_BLOGS_FAILURE:
      return {
        loading: false,
        blogs: [],
        error: action.payload
      };
    default:
      return state;
  }
};

// Define store
const store = Redux.createStore(blogReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Define React component
const { Provider, connect } = ReactRedux;

const BlogsFunction = ({ blogs, loading, error, fetchBlogs }) => {
  React.useEffect(() => {
    fetchBlogs();
  }, []);

  
  return (
    <div id="blogsContainer">
      {loading ? (
        <div className='loading'>Loading Blogs...</div>
      ) : error ? (
        <div className='error'>Error fetching blogs: {error}</div>
      ) : (
        blogs.map(blog => (
          <div id="blog1" key={blog._id}>
            <div id="image-container">
              <img id="blogpic1" src={blog.image} />
            </div>
            <p id="how">{blog.title}</p>
            <div id="things" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <p id="stats1"> <span id="date1">{blog.date}</span><span id="likes1">{blog.likes} Likes</span><span id="comments1">Comments</span></p>
            <div id="learn1">
              <p> <a href={`blog.html?id=${blog._id}`}>Learn More</a> </p>
              <img src="Frame.png" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Map Redux state to component props
const mapStateToProps = state => ({
  blogs: state.blogs,
  loading: state.loading,
  error: state.error
});

// Map Redux actions to component props
const mapDispatchToProps = dispatch => ({
  fetchBlogs: () => {
    dispatch(fetchBlogsRequest());
    fetch("https://personal-web-backend-318j.onrender.com/api/blogs/")
      .then(res => res.json())
      .then(data => {
        dispatch(fetchBlogsSuccess(data.blogs));
        autoSlide();

        console.log(data.blogs)

        function autoSlide() {
          const blogsContainer = document.getElementById('blogsContainer');
      
          if (blogsContainer && blogsContainer.children.length > 0) {
      
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
          }
        }
      })
      .catch(error => dispatch(fetchBlogsFailure(error.message)));
  }
});

// Connect component with Redux
const ConnectedBlogsFunction = connect(mapStateToProps, mapDispatchToProps)(BlogsFunction);

// Render the connected component
ReactDOM.render(
  <Provider store={store}>
    <ConnectedBlogsFunction />
  </Provider>,
  document.getElementById('bContainer1')
);
