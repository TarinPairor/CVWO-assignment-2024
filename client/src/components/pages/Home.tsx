import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import Logout from "../Logout";
import Posts from "../PostCRUD/Posts";
import { User } from "../../interfaces/User";

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [, setCookie] = useCookies(["Authorization"]);

  // LOAD THE EMAIL OF THE LOGGED IN USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setCookie("Authorization", user, { path: "/" });
        const response = await fetch(
          "https://go-render-backend.onrender.com/validate",
          {
            method: "GET",
            credentials: "include", // Include credentials to send cookies
          }
        );

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

  //const isCookiePresent = !!cookies.Authorization;

  return (
    <CookiesProvider>
      <div>
        {!user ? (
          <>
            <Posts />
            <p>Welcome {user ? "user.Email" : "Guest"}</p>
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
    </CookiesProvider>
  );
}

export default Home;
