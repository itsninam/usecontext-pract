import "./App.css";

function App() {
  return (
    <div className="App">
      <Header>
        <Results />
        <SearchBlogs />
      </Header>
    </div>
  );
}

export default App;

function Header({ children }) {
  return (
    <header>
      <Logo />
      <div className="right-container">{children}</div>
    </header>
  );
}

function Logo() {
  return <h1>⚛️ Atomic Blog</h1>;
}

function Results() {
  return <p>🚀 X blogs found</p>;
}

function SearchBlogs() {
  return (
    <>
      <form>
        <label htmlFor="search-blogs">Search blogs: </label>
        <input type="text" id="search-blogs" />
      </form>
      <button>Clear posts</button>
    </>
  );
}
