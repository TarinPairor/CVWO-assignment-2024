// DeleteComment.tsx
import { CircularProgress } from "@mui/material";
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

  return isDeleting ? (
    <div className="flex items-center justify-center">
      <CircularProgress />
    </div>
  ) : (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`bg-red-500 text-white px-4 py-2 rounded-md ${
        isDeleting
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-red-700 transition duration-300"
      }`}
    >
      Delete Comment
    </button>
  );
};

export default DeleteComment;
