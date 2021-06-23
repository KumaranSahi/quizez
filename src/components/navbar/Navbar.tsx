import classes from "./Navbar.module.css";
import { Avatar } from "./avatar/Avatar";
import { useAuth } from "../../store";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const { token } = useAuth();
  const { push } = useHistory();
  return (
    <div className={classes["navbar-container"]}>
      <h1 className={classes["navbar-logo"]} onClick={() => push("/")}>
        QuizEz
      </h1>
      {token ? <Avatar /> : <div></div>}
    </div>
  );
};
