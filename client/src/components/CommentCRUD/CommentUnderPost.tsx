// CommentUnderPost.tsx
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Comment } from "../../interfaces/Comment";
import { Post } from "../../interfaces/Post";
import CreateComment from "./CreateComment";
import DeleteComment from "./DeleteComment";

function CommentUnderPost() {
  const { postid } = useParams<{ postid: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post | null>(null);

  const refreshCommentsUnderPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/comments/post?postid=${postid}`
      );
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentsCreated = async (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
    await refreshCommentsUnderPost();
  };

  const refreshPost = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postid}`);
      const data = await response.json();
      setPost(data.post);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    refreshCommentsUnderPost();
    refreshPost();
  }, []);

  // Memoize the comments and post
  const memoizedComments = useMemo(() => comments, [comments]);
  const memoizedPost = useMemo(() => post, [post]);

  const renderComments = () => {
    return memoizedComments.map((comment) => (
      <div key={comment.ID} className="my-4 p-4 border border-gray-300 rounded">
        <p className="text-xl font-bold">ID: {comment.ID}</p>
        <p>Body: {comment.Body}</p>
        <p>By: {comment.Email}</p>
        <DeleteComment
          commentId={comment.ID}
          onDelete={refreshCommentsUnderPost}
        />
      </div>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h3 className="text-3xl font-semibold mb-4">Post:</h3>
      {memoizedPost && (
        <div className="mb-4">
          <h2 className="text-4xl font-bold">{memoizedPost.Title}</h2>
          <p className="text-lg">Body: {memoizedPost.Body}</p>
          <p>By: {memoizedPost.Email}</p>
        </div>
      )}
      <h3 className="text-3xl font-semibold mb-4">Comments:</h3>
      {renderComments()}
      <br />
      <Link to={"/"} className="text-blue-500 hover:underline">
        Back to Posts
      </Link>
      <CreateComment
        postid={postid || ""}
        onPostCreated={handleCommentsCreated}
      />
    </div>
  );
}

export default CommentUnderPost;
