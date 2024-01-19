import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import Posts from "../PostCRUD/Posts";

function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  // LOAD THE EMAIL OF THE LOGGED IN USER
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
          setEmail(userData.user.Email);
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
          <Posts />
          <p>Welcome {user ? email : "Guest"}</p>
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
