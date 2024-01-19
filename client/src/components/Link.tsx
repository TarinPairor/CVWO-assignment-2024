import { Link } from "react-router-dom";

interface LinkProps {
  url: string;
}

function LinkButton({ url }: LinkProps) {
  return (
    <div>
      <Link to={url}>Link</Link>
    </div>
  );
}

export default LinkButton;
