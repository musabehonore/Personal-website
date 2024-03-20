
import {fetchBlogsRequest, fetchBlogsSuccess, fetchBlogsFailure} from './actions';
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

const mapStateToProps = state => ({
  blogs: state.blogs,
  loading: state.loading,
  error: state.error
});

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

const ConnectedBlogsFunction = connect(mapStateToProps, mapDispatchToProps)(BlogsFunction);

export default ConnectedBlogsFunction;