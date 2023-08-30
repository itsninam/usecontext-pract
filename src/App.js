import "./App.css";
import { faker } from "@faker-js/faker";
import { useState } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {
  const [posts, setPosts] = useState(
    Array.from({ length: 30 }, () => createRandomPost())
  );

  console.log(posts);
  return (
    <>
      <Header>
        <Results />
        <SearchBlogs />
      </Header>
    </>
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
