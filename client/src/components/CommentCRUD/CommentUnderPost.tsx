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
      <div key={comment.ID}>
        <br />
        <p>ID: {comment.ID}</p>
        <p>Body: {comment.Body}</p>
        <p>By: {comment.Email}</p>
        <DeleteComment
          commentId={comment.ID}
          onDelete={refreshCommentsUnderPost}
        />
        <br />
      </div>
    ));
  };

  return (
    <div>
      <h3>Post:</h3>
      {memoizedPost && (
        <div>
          <h2>Title: {memoizedPost.Title}</h2>
          <p>Body: {memoizedPost.Body}</p>
          <p>By: {memoizedPost.Email}</p>
        </div>
      )}
      <h3>Comments:</h3>
      {renderComments()}
      <br />
      <Link to={"/"}>Link</Link>
      <CreateComment
        postid={postid || ""}
        onPostCreated={handleCommentsCreated}
      />
    </div>
  );
}

export default CommentUnderPost;
