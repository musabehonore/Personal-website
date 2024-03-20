const FETCH_BLOGS_REQUEST = 'FETCH_BLOGS_REQUEST';
const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';

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

export default{FETCH_BLOGS_REQUEST, FETCH_BLOGS_SUCCESS, FETCH_BLOGS_FAILURE, fetchBlogsRequest, fetchBlogsSuccess, fetchBlogsFailure}