import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import { Post } from "../interfaces/Post";

interface Props {
  email: string;
}

function Posts({ email }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      <CreatePost onPostCreated={handlePostCreated} />
      <ul>
        {posts.map((post) => (
          <li key={post.ID}>
            <div>
              <strong>Title:</strong> {post.Title}
            </div>
            <div>
              <strong>Body:</strong> {post.Body}
            </div>
            <div>
              <strong>Email:</strong> {post.Email}
            </div>
            <div>
              <strong>Created At:</strong> {post.CreatedAt}
            </div>
            <div>
              <strong>Updated At:</strong> {post.UpdatedAt}
            </div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
