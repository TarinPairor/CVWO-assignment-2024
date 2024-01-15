import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import { Post } from "../interfaces/Post";
import UpdatePost from "./updatePost";
import DeletePost from "./deletePost";

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [email, setEmail] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/validate", {
          method: "GET",
          credentials: "include", // Include credentials to send cookies
        });

        if (response.ok) {
          const userData = await response.json();
          setEmail(userData.user.Email);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  const handlePostCreated = async (newPost: Post) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
    await refreshPosts();
  };

  const handleUpdateClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleUpdateClose = () => {
    setSelectedPost(null);
  };

  const refreshPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostUpdate = async () => {
    // Call refreshPosts after updating the post
    await refreshPosts();

    // Close the update form
    handleUpdateClose();
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      <CreatePost onPostCreated={handlePostCreated} />
      <ul>
        {posts.map((post) => (
          <li key={post.ID}>
            <div>
              <strong>ID:</strong>
              {post.ID}
            </div>
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
            {/* Only display the update button if the post is created by the logged-in user */}
            <div>
              {post.Email === email && (
                <button onClick={() => handleUpdateClick(post)}>
                  Update Post
                </button>
              )}
            </div>
            <div>
              {post.Email === email && (
                <DeletePost postId={post.ID} onDelete={refreshPosts} />
              )}
            </div>
            <br />
          </li>
        ))}
      </ul>
      {/* Display the UpdatePost component when a post is selected for update */}
      {selectedPost && (
        <UpdatePost
          postId={selectedPost.ID}
          title={selectedPost.Title}
          body={selectedPost.Body}
          onUpdate={handlePostUpdate}
        />
      )}
    </div>
  );
}

export default Posts;
