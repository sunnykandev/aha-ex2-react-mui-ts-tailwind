import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import Container from "./Container";
import BottomMenu from "./BottomMenu";
import Header from "./Header";
import SideMenu from "./SideMenu";

export default function Layout() {
  const isMobileMode = useMediaQuery("(max-width:768px)");

  return (
    <div className="overflow-x-hidden bg-dark-black sm:bg-medium-gray">
      <Header />
      <div className="">
        {isMobileMode && <Header />}
        {!isMobileMode && <SideMenu />}
        <div className="ml-0 md:ml-20">
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
      {isMobileMode && <BottomMenu />}
    </div>
  );
}
