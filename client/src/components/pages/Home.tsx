import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import Posts from "../PostCRUD/Posts";
import { User } from "../../interfaces/User";
import { MenuItem, TextField } from "@mui/material";
import { ENDPOINT } from "../Variables";

function Home() {
  const [user, setUser] = useState<User | null>(null);
  //const [, setCookie] = useCookies(["Authorization"]);
  const [tags, setTags] = useState<string[]>([]);

  // LOAD THE EMAIL OF THE LOGGED IN USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        //setCookie("Authorization", user, { path: "/" });
        const response = await fetch(`${ENDPOINT}/validate`, {
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

    const fetchTags = async () => {
      try {
        const response = await fetch(`${ENDPOINT}/tags`);
        if (response.ok) {
          const tagsData = await response.json();
          setTags(tagsData.tags);
        } else {
          // Handle error
          console.error("Failed to fetch tags");
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching tags", error);
      }
    };

    fetchUser();
    fetchTags();
  }, []);

  //const isCookiePresent = !!cookies.Authorization;

  return (
    <div>
      {user ? (
        <>
          <div className="m-4">
            <TextField
              id="outlined-select-tag"
              select
              label="Tags"
              helperText="Tags list"
              sx={{ width: "50%" }}
            >
              {tags?.map((tag: string) => (
                <Link
                  to={`/post/tag/${tag}`}
                  key={tag}
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                </Link>
              ))}
            </TextField>
          </div>
          <Posts />
          <div className="flex flex-col">
            <>Welcome {user ? user.Email : "Guest"}</>
            <Logout />
          </div>
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
