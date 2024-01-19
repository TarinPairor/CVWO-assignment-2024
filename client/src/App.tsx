import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CommentUnderPost from "./components/CommentCRUD/CommentUnderPost";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Singup";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:postid" element={<CommentUnderPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
