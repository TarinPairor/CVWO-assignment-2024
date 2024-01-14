import Logout from "./Logout";

interface Props {
  user: never;
}

function Homepage({ user }: Props) {
  return (
    <div>
      <p>Welcome {user ? user.Email : "Guest"}</p>
      <Logout />
    </div>
  );
}

export default Homepage;
