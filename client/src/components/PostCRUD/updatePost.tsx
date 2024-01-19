import { useEffect, useState } from "react";

interface UpdatePostProps {
  postId: number;
  title: string;
  body: string;
  onUpdate: () => void;
}

const UpdatePost: React.FC<UpdatePostProps> = ({
  postId,
  title,
  body,
  onUpdate,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/validate", {
          method: "GET",
          credentials: "include", // Include credentials to send cookies
        });

        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
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

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email, // Pass the email from props
          Title: newTitle,
          Body: newBody,
        }),
      });
      console.log(
        `Updated post successfully to title:${newTitle} body:${newBody} by ${email}`
      );
      if (response.ok) {
        // Call the onUpdate callback to refresh the posts list
        onUpdate();
        // Reset the form or close the update form
        setNewTitle("");
        setNewBody("");
      } else {
        // Handle error
        console.error("Failed to update post");
      }
    } catch (error) {
      // Handle error
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <h3>Update Post</h3>
      <label>
        New Title:
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        New Body:
        <textarea
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleUpdate}>
        <strong>Update Post</strong>
      </button>
    </div>
  );
};

export default UpdatePost;
