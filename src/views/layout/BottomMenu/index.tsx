import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

import SideMenuButton from "../SideMenu/SideMenuButton";

export default function BottomMenu() {
  const pathname = useLocation();
  const isPhoneMode = useMediaQuery("(max-width:640px)");
  const styles = {
    menu: {
      boxShadow: "inset 0px 0.5px 0px #000000cc",
      backdropFilter: "blur(27.1828px)",
      backgroundColor: "#18181833",
    },
  };

  return (
    <div>
      {isPhoneMode && (
        <>
          {(pathname.pathname === "/" || pathname.pathname === "/home") && (
            <div
              className="h-[66px] w-full fixed bottom-0 flex flex-row justify-center items-center"
              style={styles.menu}
            >
              <SideMenuButton
                icon={<ContentCopy />}
                label="Home"
                isActive={
                  pathname.pathname === "/home" || pathname.pathname === "/"
                    ? true
                    : false
                }
                pathname="home"
              />
              <SideMenuButton
                icon={<ContentCopy />}
                label="Tags"
                isBadge={false}
                pathname="tags"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
