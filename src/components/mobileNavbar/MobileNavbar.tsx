import classes from "./MobileNavbar.module.css";
import {
  faHome,
  faHistory,
  faBookOpen,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store";
import { HStack, useColorModeValue, useMediaQuery } from "@chakra-ui/react";

export const MobileNavbar = () => {
  const { isAdmin } = useAuth();
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  return (
    <HStack
      bg={useColorModeValue("white", "gray.900")}
      width="100%"
      zIndex="banner"
      position="fixed"
      bottom="0%"
      height="4rem"
      justifyContent="space-around"
      alignItems="center"
      display={isLargerThan700 ? "none" : "flex"}
    >
      <NavLink to="/" exact activeClassName={classes["active-mobile"]}>
        <FontAwesomeIcon icon={faHome} />
      </NavLink>
      <NavLink
        to="/mobile-leaderboard"
        activeClassName={classes["active-mobile"]}
      >
        <FontAwesomeIcon icon={faBookOpen} />
      </NavLink>
      {isAdmin && (
        <NavLink to="/my-quizes" activeClassName={classes["active-mobile"]}>
          <FontAwesomeIcon icon={faBook} />
        </NavLink>
      )}
      <NavLink to="/my-scores" activeClassName={classes["active-mobile"]}>
        <FontAwesomeIcon icon={faHistory} />
      </NavLink>
    </HStack>
  );
};
