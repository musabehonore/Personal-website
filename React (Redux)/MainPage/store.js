
import blogReducer from "./reducer";

const store = Redux.createStore(blogReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;