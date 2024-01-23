import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CommentUnderPost from "./components/CommentCRUD/CommentUnderPost";
import LinkedEntities from "./components/LinkedEntities";
import MarkdownEditor from "./components/Markdown";
import HealthCheck from "./components/pages/HealthCheck";
import Home from "./components/pages/Home";
import Info from "./components/pages/Info";
import Login from "./components/pages/Login";
import SimpleHome from "./components/pages/SimpleHome";
import SimpleLogin from "./components/pages/SimpleLogin";
import Signup from "./components/pages/Singup";
import PostsUnderTag from "./components/PostCRUD/PostsUnderTag";
import SentimentAnalysisComponent from "./components/SentimentAnalysis";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:postid" element={<CommentUnderPost />} />
          <Route path="/post/tag/:tag" element={<PostsUnderTag />} />
          <Route path="/markdown" element={<MarkdownEditor />} />
          <Route path="/linkedentities" element={<LinkedEntities />} />
          <Route path="/sentiment" element={<SentimentAnalysisComponent />} />
          <Route path="/health" element={<HealthCheck />} />
          <Route path="/simple/login" element={<SimpleLogin />} />
          <Route path="/simple/home" element={<SimpleHome />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
