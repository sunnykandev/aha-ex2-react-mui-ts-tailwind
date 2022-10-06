import { useLocation } from "react-router-dom";
import { Drawer, Stack, Toolbar, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import SideMenuButton from "./SideMenuButton";

export const DRAWER_WIDTH = 80;

export default function SideMenu() {
  const routeState = useLocation();
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
            routeState.pathname === "/home" ||
            routeState.pathname === "/" ||
            routeState.pathname === "/result"
              ? true
              : false
          }
          pathname="home"
        />
        <SideMenuButton
          label="Tags"
          isActive={routeState.pathname === "/tags" ? true : false}
          isBadge={true}
          pathname="tags"
        />
      </Stack>
      <div className="flex-1" />
      <Link
        href="https://github.com/sunnykandev/aha-ex2-react-mui-ts-tailwind"
        target="_blank"
        rel="noreferrer"
      >
        <IconButton
          className="ml-3 mr-3 mb-5"
          aria-label="github repository"
          component="label"
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
      </Link>
    </Drawer>
  );
}
