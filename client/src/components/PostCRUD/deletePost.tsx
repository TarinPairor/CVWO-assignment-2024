import { useState } from "react";

// DeletePost.tsx
interface DeletePostProps {
  postId: number;
  onDelete: () => void;
}

function DeletePost({ postId, onDelete }: DeletePostProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
      });
      console.log(`Delete post successfully of id:${postId}`);
      if (response.ok) {
        // Call the onDelete callback to refresh the posts list
        onDelete();
      } else {
        // Handle error
        console.error("Failed to delete post");
      }
    } catch (error) {
      // Handle error
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button onClick={handleDelete}>
      {isDeleting ? "Deleting..." : "Delete Post"}
    </button>
  );
}

export default DeletePost;