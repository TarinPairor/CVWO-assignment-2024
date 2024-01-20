import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { User } from "../../interfaces/User";
import Logout from "../Logout";
import Posts from "../PostCRUD/Posts";

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const cookies = useCookies(["Authorization"]);

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

  const isCookiePresent = !!cookies;

  return (
    <div>
      {isCookiePresent ? (
        <>
          <Posts />
          <p>Welcome {user ? user.Email : "Guest"}</p>
          <Logout />
        </>
      ) : (
        <div className="flex flex-row justify-center space-x-4">
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="text-green-500 hover:text-green-700 transition duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
