import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Singup";

function App() {
  return (
    <div>
      <div className="w-full h-screen text-4xl text-blue-700 flex items-center justify-center">
        Hello World
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
