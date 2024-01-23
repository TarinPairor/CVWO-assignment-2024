// src/components/Info.tsx
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Info: React.FC = () => {
  const [cookies] = useCookies(["Authorization"]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cookies.Authorization) {
          // You can include logic to parse the token if needed
          // For simplicity, assuming the token directly contains user information
          const tokenData = cookies.Authorization.split(".")[1];
          const decodedData = JSON.parse(atob(tokenData));

          setUser(decodedData); // Assuming user information is present in the token
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    fetchData();
  }, [cookies.Authorization]);

  return (
    <div>
      <h2>User Information</h2>
      {user ? (
        <div>
          <p>ID: {user.sub}</p>
          {/* Add more fields as needed based on the token structure */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Info;
