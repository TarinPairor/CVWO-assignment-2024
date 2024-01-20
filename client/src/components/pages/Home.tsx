import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import Logout from "../Logout";
import Posts from "../PostCRUD/Posts";

function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [cookies] = useCookies();

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

  console.log("Cookies:", cookies);

  //const isCookiePresent = !!cookies.Authorization;

  return (
    <CookiesProvider>
      <div>
        {user ? (
          <>
            <Posts />
            <p>Welcome {user ? email : "Guest"}</p>
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
