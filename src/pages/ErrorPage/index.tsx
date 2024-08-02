import { Link } from "react-router-dom";
import { PagesEnum } from "@/types/enums";

function Main() {
  return (
    <div>
      <div>404</div>
      <div>Oops. This page has gone missing.</div>
      <div>You may have mistyped the address or the page may have moved.</div>

      <Link to={PagesEnum.HOME}>Back to Home</Link>
    </div>
  );
}

export default Main;
