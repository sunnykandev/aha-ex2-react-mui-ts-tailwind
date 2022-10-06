import { useLocation, useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import FriendsDrawer from "../../components/FriendsDrawer";
import AnimalsList from "./AnimalsList";

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchKeyword: string = location.state.keyword; // Search term passed from home page.
  const pageCount: number = location.state.count; // Result count per page passed from home page.

  return (
    <>
      <div className="w-full flex flex-row">
        <div className="w-full xl-max:w-2/3 px-4 sm:px-10 md:px-28 lg:px-25 pt-20 sm:pt-[78px] flex flex-col justify-between flex-grow">
          <Stack spacing={2}>
            <div className="md:hidden flex flex-row items-center ml-[9px] md:ml-[-21px] mt-[-63px] mb-[22px]">
              <ArrowBackIosIcon
                fontSize="medium"
                onClick={() =>
                  navigate("/", {
                    state: { keyword: searchKeyword, count: pageCount },
                  })
                }
                className="cursor-pointer mr-[10px] h-[24px] text-white"
              />
              <Typography className="text-[24px] md:text-[30px]">
                Home Page
              </Typography>
            </div>
            <div className="flex flex-row items-center ml-[4px] md:ml-[-21px]">
              <ArrowBackIosIcon
                fontSize="medium"
                onClick={() =>
                  navigate("/", {
                    state: { keyword: searchKeyword, count: pageCount },
                  })
                }
                className="cursor-pointer mr-[22px] h-[24px] text-white hidden md:block"
              />
              <Typography className="text-[24px] md:text-[30px]">
                Results
              </Typography>
            </div>
            <AnimalsList searchKeyword={searchKeyword} pageCount={pageCount} />
          </Stack>
        </div>
        <FriendsDrawer />
      </div>
    </>
  );
}
