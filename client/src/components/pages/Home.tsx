import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout";

function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/validate", {
          method: "GET",
          credentials: "include", // Include credentials to send cookies
        });

        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUser(userData.user);
        } else {
          // Handle error
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div>
      {user ? (
        <>
          <p>Welcome {user ? user.Email : "Guest"}</p>
          <Logout />
        </>
      ) : (
        <div className="flex flex-row">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
