// CreatePost.tsx
import { useEffect, useState } from "react";
import { Post } from "../../interfaces/Post";

const CreatePost: React.FC<{ onPostCreated: (newPost: Post) => void }> = ({
  onPostCreated,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");

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
          // Handle error
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  const handleCreatePost = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Title: title, Body: body, Email: email }),
      });

      console.log(
        `Created post successfully with title:${title} body:${body} by ${email}`
      );
      if (response.ok) {
        const newPost = await response.json();

        onPostCreated(newPost);
        // Clear input fields after creating a post
        setTitle("");
        setBody("");
        setEmail("");
        // window.location.reload();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Create a New Post
      </h2>
      <label className="block mb-4">
        <span className="text-gray-700">Title:</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Body:</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Email: {email}</span>
      </label>
      <button
        onClick={handleCreatePost}
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-700 transition duration-300"
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
