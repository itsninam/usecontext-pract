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

  console.log(posts);
  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
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
  const { posts } = useContext(PostContext);
  return <p>🚀 {posts.length} blogs found</p>;
}

function SearchBlogs() {
  const { setPosts } = useContext(PostContext);
  return (
    <>
      <form>
        <label htmlFor="search-blogs">Search blogs: </label>
        <input type="text" id="search-blogs" />
      </form>
      <button onClick={() => setPosts([])}>Clear blogs</button>
    </>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}

function BlogsList() {
  const { posts } = useContext(PostContext);
  if (!posts.length) {
    return <h2>No blogs found...</h2>;
  }

  return (
    <ul>
      {posts.map((post, index) => {
        return <Blog post={post} key={index} />;
      })}
    </ul>
  );
}

function Blog({ post }) {
  return (
    <li>
      <span>{post.title}</span>
      <span>{post.body}</span>
    </li>
  );
}
