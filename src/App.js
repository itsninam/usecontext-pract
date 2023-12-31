import "./App.css";
import { useState } from "react";
import { PostProvider, usePosts } from "./PostProvider";

// function createRandomPost() {
//   return {
//     title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
//     body: faker.hacker.phrase(),
//   };
// }

function App() {
  return (
    <PostProvider>
      <Header>
        <Results />
        <SearchBlogs />
      </Header>
      <Main>
        <AddBlog />
        <BlogsList />
      </Main>
    </PostProvider>
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
  const { blogs } = usePosts();
  return <p>🚀 {blogs.length} blogs found</p>;
}

function SearchBlogs() {
  const { setPosts, searchQuery, setSearchQuery } = usePosts();

  const handleClearPosts = () => {
    setPosts([]);
  };

  return (
    <>
      <form>
        <label htmlFor="search-blogs">Search blogs: </label>
        <input
          type="text"
          id="search-blogs"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </form>
      <button onClick={handleClearPosts}>Clear blogs</button>
    </>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}

function BlogsList() {
  const { blogs } = usePosts();

  if (!blogs.length) {
    return <h2>No blogs found...</h2>;
  }

  return (
    <ul>
      {blogs.map((blog, index) => {
        return <Blog blog={blog} key={index} />;
      })}
    </ul>
  );
}

function Blog({ blog }) {
  return (
    <li>
      <span>{blog.title}</span>
      <span>{blog.body}</span>
    </li>
  );
}

function AddBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { handleAddBlog } = usePosts();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !body) {
      return alert("Please enter a title and a message!");
    }
    handleAddBlog({ title, body });

    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-blog-form">
      <label htmlFor="blog-name">Enter a blog name:</label>
      <input
        type="text"
        id="blog-name"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="blog-message">Enter a blog message:</label>
      <input
        type="text"
        id="blog-message"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />

      <button type="submit">Post</button>
    </form>
  );
}
