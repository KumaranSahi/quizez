import {
  Avatar,
  WrapItem,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import { useAuth } from "../../../store";
import { useHistory } from "react-router-dom";
import { setupAuthHeaderForServiceCalls } from "../../../axiosUtils";

export const UserAvatar = () => {
  const { image, signOutUser, dispatch, setAuthLoading, userName } = useAuth();
  const { push } = useHistory();

  return (
    <>
      <Menu>
        <WrapItem>
          <Avatar name={userName} as={MenuButton} src={image} />
        </WrapItem>
        <MenuList>
          <MenuItem
            onClick={() => {
              push("/my-scores");
            }}
          >
            My Scores
          </MenuItem>
          <MenuItem
            onClick={() => {
              signOutUser(dispatch, setAuthLoading);
              setupAuthHeaderForServiceCalls(null);
              push("/sign-up");
            }}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
