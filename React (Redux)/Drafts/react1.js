function Greeting() {
  return (<h1>Hello World</h1>)
}

ReactDOM.render(
  <React.StrictMode>
  <Greeting/>
  </React.StrictMode>,
  document.getElementById('root')
);
