import { useState, useEffect, useMemo } from "react";
import CreatePost from "./createPost";
import { Post } from "../../interfaces/Post";
import UpdatePost from "./updatePost";
import DeletePost from "./deletePost";

import CircularProgress from "@mui/material/CircularProgress";

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [email, setEmail] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [load, setLoad] = useState(false);

  // LOAD THE EMAIL OF THE LOGGED IN USER
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

  // HANDLE THE CREATION OF A NEW POST BY APPENDING IT TO THE PREVIOUS POST
  const handlePostCreated = async (newPost: Post) => {
    setLoad(true);
    setPosts((prevPosts) => [...prevPosts, newPost]);
    await refreshPosts();
    setLoad(false);
  };

  //SET THE SELECTED POST TO THE POST WHERE THE UPDATE BUTTON WAS CLICKED AND DISPLAYS AN UPDATE FORM
  const handleUpdateClick = (post: Post) => {
    setSelectedPost(post);
  };

  // CLOSE THE UPDATE FORM
  const handleUpdateClose = () => {
    setSelectedPost(null);
  };

  // GENERATE THE POSTS
  const refreshPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  //HANDLE THE UPDATING OF POST WHILE ALSO UPDATING THE DATA
  const handlePostUpdate = async () => {
    // Call refreshPosts after updating the post
    await refreshPosts();

    // Close the update form
    handleUpdateClose();
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const genurl = (postid: number) => `/post/${postid}`;
  const memoizedPost = useMemo(() => posts, [posts]);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-6">All Posts</h2>
      {load ? (
        <CircularProgress />
      ) : (
        <CreatePost onPostCreated={handlePostCreated} />
      )}
      <ul className="space-y-6">
        {memoizedPost.map((post) => (
          <li key={post.ID} className="border-b pb-4">
            {selectedPost && selectedPost.ID === post.ID && (
              <div>
                <UpdatePost
                  postId={selectedPost.ID}
                  title={selectedPost.Title}
                  body={selectedPost.Body}
                  onUpdate={handlePostUpdate}
                />
                <button onClick={handleUpdateClose}>Close</button>
              </div>
            )}
            <div className=" cursor-pointer  transform transition-transform duration-300 hover:scale-105">
              <a href={genurl(post.ID)}>
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
              </a>
            </div>
            {/* Only display the update button if the post is created by the logged-in user */}
            <div>
              {post.Email === email && (
                <button
                  onClick={() => handleUpdateClick(post)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
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
    </div>
  );
}

export default Posts;
