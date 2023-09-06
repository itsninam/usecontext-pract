import { faker } from "@faker-js/faker";
import { createContext, useContext, useState } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedBlog = !searchQuery
    ? posts
    : posts.filter((post) =>
        `${post.title} ${post.body}`
          .toLowerCase()
          .includes(searchQuery.toLocaleLowerCase())
      );

  const handleAddBlog = (newBlog) => {
    setPosts([...posts, newBlog]);
  };

  return (
    <PostContext.Provider
      value={{
        blogs: searchedBlog,
        setPosts,
        searchQuery,
        setSearchQuery,
        handleAddBlog,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostsContexts was used outside of the PostProvider");
  return context;
};

export { usePosts, PostProvider };
