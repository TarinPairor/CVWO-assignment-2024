import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CommentUnderPost from "./components/CommentCRUD/CommentUnderPost";
import LinkedEntities from "./components/LinkedEntities";
import MarkdownEditor from "./components/Markdown";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Singup";
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
          <Route path="/markdown" element={<MarkdownEditor />} />
          <Route path="/linkedentities" element={<LinkedEntities />} />
          <Route path="/sentiment" element={<SentimentAnalysisComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
