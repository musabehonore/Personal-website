// //.....React fetch blogs......................

// console.log('Kabayeee')

// const BlogList = () => {
//   const [blogs, setBlogs] = React.useState([]);

//   React.useEffect(() => {
//     console.log("Fetching blogs...");
//     fetch("https://personal-web-backend-318j.onrender.com/api/blogs/")
//       .then(response => response.json())
//       .then(data => {
//         console.log("Blogs data:", data);
//         setBlogs(data.blogs);
//       })
//       .catch(error => {
//         console.error('Error fetching blogs:', error);
//       });
//   }, []);

//   console.log("Rendered blogs:", blogs);

//   return (
//     <div>
//       {blogs.length > 0 ? (
//         blogs.map(blog => (
//           <div key={blog._id} className="blog">
//             <img src={blog.image} alt={blog.title} />
//             <h2>{blog.title}</h2>
//             <p>{blog.content}</p>
//             <p>{blog.date}</p>
//             <p>{blog.likes} Likes</p>
//             <p>Comments</p>
//             <a href={`blog/${blog._id}`}>Learn More</a>
//           </div>
//         ))
//       ) : (
//         <h1>No Blogs Found</h1>
//       )}
//     </div>
//   );
// };


// ReactDOM.render(
//   <BlogList />, document.getElementById('blogsBox')
// );


import React from 'react';
import {Text} from 'react-native';

const Cat = () => {
  return <Text>Hello, I am your cat!</Text>;
};

export default Cat;

