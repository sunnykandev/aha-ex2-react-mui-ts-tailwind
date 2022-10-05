import { useLocation } from "react-router-dom";
import { Drawer, Stack, Toolbar } from "@mui/material";

import SideMenuButton from "./SideMenuButton";

export const DRAWER_WIDTH = 80;

export default function SideMenu() {
  const pathname = useLocation();
  const styles = {
    deskTopToolbar: {
      minHeight: "88px",
      paddingLeft: "24px",
      paddingRight: "24px",
    },
    logo: {
      maxWidth: "unset",
      width: "35px",
    },
    menuContainer: {
      paddingTop: "4px",
    },
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar style={styles.deskTopToolbar}>
        <img src="/logo.svg" alt="logo" className="h-5 w-[35px]"></img>
      </Toolbar>

      <Stack style={styles.menuContainer}>
        <SideMenuButton
          label="Home"
          isActive={
            pathname.pathname === "/home" ||
            pathname.pathname === "/" ||
            pathname.pathname === "/result"
              ? true
              : false
          }
          pathname="home"
        />
        <SideMenuButton
          label="Tags"
          isActive={pathname.pathname === "/tags" ? true : false}
          isBadge={true}
          pathname="tags"
        />
      </Stack>
    </Drawer>
  );
}
