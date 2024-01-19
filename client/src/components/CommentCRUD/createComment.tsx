import { useEffect, useState } from "react";
import { Comment } from "../../interfaces/Comment";

interface CreateCommentProps {
  postid: string;
  onPostCreated: (newComment: Comment) => void;
}

function CreateComment({ postid, onPostCreated }: CreateCommentProps) {
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

  const handleCreateComment = async () => {
    try {
      const response = await fetch(`http://localhost:3000/comments/${postid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body, email, postid }),
      });

      if (response.ok) {
        const newComment = await response.json();
        // Refresh comments after creating a new comment
        // You can call refreshCommentsUnderPost from CommentUnderPost component
        onPostCreated(newComment);
        setBody("");
        console.log("Comment created successfully");
      } else {
        console.error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div>
      <h3>Create Comment:</h3>
      <div>
        <label htmlFor="body">Body:</label>
        <input
          type="text"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button onClick={handleCreateComment}>Create Comment</button>
    </div>
  );
}

export default CreateComment;
