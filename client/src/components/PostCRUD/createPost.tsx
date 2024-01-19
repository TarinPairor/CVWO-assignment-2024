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
    <div>
      <h2>Create a New Post</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Body:
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <p>{email}</p>
      </label>
      <br />
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
