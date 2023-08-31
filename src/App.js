import "./App.css";
import { faker } from "@faker-js/faker";
import { createContext, useContext, useState } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostContext = createContext();
function App() {
  const [posts, setPosts] = useState(
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedBlog = posts.filter((post) =>
    `${post.title} ${post.body}`.includes(searchQuery)
  );
  console.log(posts);

  return (
    <PostContext.Provider
      value={{
        blogs: searchedBlog,
        setPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      <Header>
        <Results />
        <SearchBlogs />
      </Header>
      <Main>
        <BlogsList />
      </Main>
    </PostContext.Provider>
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
  const { blogs } = useContext(PostContext);
  return <p>🚀 {blogs.length} blogs found</p>;
}

function SearchBlogs() {
  const { setPosts, searchQuery, setSearchQuery } = useContext(PostContext);

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
      <button onClick={() => setPosts([])}>Clear blogs</button>
    </>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}

function BlogsList() {
  const { blogs } = useContext(PostContext);
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
