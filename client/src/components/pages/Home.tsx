// Home.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data after a successful login or when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/validate", {
          method: "GET",
          credentials: "include", // Include credentials to send the cookie
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          console.error(
            "Server returned an error:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user}</p>
          {/* Add other relevant fields */}
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default Home;
