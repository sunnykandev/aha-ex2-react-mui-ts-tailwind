import { useLocation } from "react-router-dom";

export default function Header() {
  const pathname = useLocation();

  return (
    <div>
      {(pathname.pathname === "/" || pathname.pathname === "/home") && (
        <div className="fixed top-0 w-full h-[70px] bg-[#0000] flex justify-start items-center">
          <div className="pl-[21px]">
            <img src="/logo.svg" alt="logo" className="h-5 w-[35px]"></img>
          </div>
        </div>
      )}
    </div>
  );
}
