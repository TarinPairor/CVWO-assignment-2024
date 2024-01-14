// Signup.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    // Implement signup logic here, similar to the backend logic
    // You may use fetch or axios to communicate with your backend API
    // Update the URL and request method accordingly

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pass_word: password }), // Change property name to pass_word
    });

    if (response.ok) {
      // Save the token or user data to the state or local storage
      // Redirect to the desired page (e.g., dashboard)
      navigate("/");
    } else {
      // Handle signup error
      console.error("Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
