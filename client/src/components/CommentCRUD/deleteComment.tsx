// DeleteComment.tsx
import { useState } from "react";

interface DeleteCommentProps {
  commentId: number;
  onDelete: () => void;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({
  commentId,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Make the DELETE request to delete the comment by commentId
      const response = await fetch(
        `http://localhost:3000/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Handle successful deletion (e.g., refresh comments under post)
        // You might want to call a callback function or use state to trigger a refresh
        onDelete();
        console.log("Comment deleted successfully");
      } else {
        // Handle deletion error
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete Comment"}
    </button>
  );
};

export default DeleteComment;
