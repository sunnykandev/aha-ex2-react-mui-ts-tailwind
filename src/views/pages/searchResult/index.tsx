import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { AnimalModel } from "../../../models";
import FriendsDrawer from "../../components/FriendsDrawer";
import InfiniteScrollContainer from "./InfiniteScrollContainer";

export default function SearchResult() {
  const navigation = useNavigate();
  const location = useLocation();
  const Keyword: string = location.state.keyword;
  const Count: number = location.state.count;
  const searchKeyword = Keyword;
  const pageCount = Count;

  const [resultData, setResultData] = useState<AnimalModel[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchSearchResult = useCallback(
    (num: number, count: number, keyword: string) => {
      axios({
        method: "get",
        url: `https://avl-frontend-exam.herokuapp.com/api/users/all?page=${num}&pageSize=${count}&keyword=${keyword}`,
      })
        .then((res) => {
          const fetchedData = res?.data?.data;
          setResultData((data) => data.concat(fetchedData ? fetchedData : []));
          if (!fetchedData || !fetchedData.length) setHasMore(false);
        })
        .catch((error) => console.error(`Error ${error}`));
    },
    []
  );

  const fetchMoreData = () => {
    setPageNum(pageNum + 1);
    fetchSearchResult(pageNum, pageCount, searchKeyword);
  };

  useEffect(() => {
    fetchSearchResult(1, pageCount, searchKeyword);
  }, [pageCount, searchKeyword, fetchSearchResult]);

  return (
    <>
      <div className="w-full flex flex-row">
        <div className="w-full xl-max:w-2/3 px-4 sm:px-10 md:px-28 lg:px-25 pt-20 sm:pt-[78px] flex flex-col justify-between flex-grow">
          <Stack spacing={2}>
            <div className="md:hidden flex flex-row items-center ml-[9px] md:ml-[-21px] mt-[-63px] mb-[22px]">
              <ArrowBackIosIcon
                fontSize="medium"
                onClick={() => navigation("/")}
                className="cursor-pointer mr-[10px] h-[24px] text-white"
              />
              <Typography className="text-[24px] md:text-[30px]">
                Home Page
              </Typography>
            </div>
            <div className="flex flex-row items-center ml-[4px] md:ml-[-21px]">
              <ArrowBackIosIcon
                fontSize="medium"
                onClick={() => navigation("/")}
                className="cursor-pointer mr-[22px] h-[24px] text-white hidden md:block"
              />
              <Typography className="text-[24px] md:text-[30px]">
                Results
              </Typography>
            </div>
            <InfiniteScrollContainer
              items={resultData}
              hasMore={hasMore}
              fetchMoreData={fetchMoreData}
            />
          </Stack>
        </div>
        <FriendsDrawer />
      </div>
    </>
  );
}
