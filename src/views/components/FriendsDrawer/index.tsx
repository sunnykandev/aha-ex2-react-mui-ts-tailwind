import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Drawer } from "@mui/material";

import FriendsList from "./FriendsList";

export default function FriendsDrawer() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const handleToggle = () => {
    setIsShow(!isShow);
  };

  const styles = {
    usersPanel: {
      width: "375px",
      paddingTop: "14px",
    },
  };

  return (
    <>
      <div
        style={styles.usersPanel}
        className="hidden xl-max:block bg-medium-black"
      >
        <FriendsList />
      </div>
      <div
        className="cursor-pointer fixed top-12 right-0 bg-white bg-opacity-10 rounded-l-xl hidden sm:block xl-max:hidden pl-4 py-4"
        onClick={handleToggle}
      >
        <ArrowBackIosIcon fontSize="large" style={{ color: "white" }} />
      </div>
      <Drawer open={isShow} anchor="right" onClose={handleToggle}>
        <div style={styles.usersPanel}>
          <FriendsList />
        </div>
      </Drawer>
    </>
  );
}
