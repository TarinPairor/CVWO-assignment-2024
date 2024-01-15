// DeletePost.tsx
interface DeletePostProps {
  postId: number;
  onDelete: () => void;
}

function DeletePost({ postId, onDelete }: DeletePostProps) {
  const handleDelete = async () => {
    try {
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
    }
  };

  return <button onClick={handleDelete}>Delete post</button>;
}

export default DeletePost;
