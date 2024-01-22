// LogoutButton.tsx
const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://go-render-backend.onrender.com/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        // Logout was successful
        console.log("Logout successful");
        // You may choose to redirect or update the UI as needed
        window.location.reload();
      } else {
        // Logout failed
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
