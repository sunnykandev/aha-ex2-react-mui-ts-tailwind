import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";

import AnimalItem from "./AnimalItem";
import FriendsDrawer from "../home/FriendsDrawer";
import AnimalItemSkeleton from "./AnimalItemSkeleton";

export default function SearchResult() {
  const navigation = useNavigate();
  const location = useLocation();
  const Keyword: string = location.state.keyword;
  const Count: number = location.state.count;
  const searchKeyword = Keyword;
  const pageCount = Count;

  const [resultData, setResultData] = useState<AnimalInfo[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const styles = {
    searchButton: {
      height: "40px",
      maxWidth: "343px",
      marginRight: "2px",
      marginLeft: "20px",
      marginTop: "18px",
      marginBottom: "30px",
    },
  };

  interface AnimalInfo {
    id: string;
    avater: string;
    name: string;
    username: string;
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `https://avl-frontend-exam.herokuapp.com/api/users/all?page=${pageNum}&pageSize=${pageCount}&keyword=${searchKeyword}`,
    })
      .then((res) => {
        setResultData(res.data.data);
        setHasMore(res.data.totalPages > pageNum);
      })
      .catch((err) => console.log(err));
  });

  const fetchMoreData = () => {
    setPageNum(pageNum + 1);
    axios({
      method: "get",
      url: `https://avl-frontend-exam.herokuapp.com/api/users/all?page=${pageNum}&pageSize=${pageCount}&keyword=${searchKeyword}`,
    })
      .then((res) => {
        const moreData = res?.data?.data;
        setResultData(resultData.concat(moreData));
        setHasMore(res.data.totalPages > pageNum);
      })
      .catch((error) => console.error(`Error ${error}`));
    return () => {};
  };

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
            <InfiniteScroll
              className="mt-[7px] md:mt-[8px] mr-[-5px]"
              dataLength={resultData.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4> </h4>}
              height={730}
            >
              <Grid className="md:mt-[-18px]" container>
                {resultData.length
                  ? resultData.map((item: AnimalInfo, index: number) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        key={`animal-${index}`}
                      >
                        <AnimalItem
                          imgsrc={item.avater}
                          title={item.name}
                          username={item.username}
                        />
                      </Grid>
                    ))
                  : [...Array(20)].map(
                      (value: null | undefined, index: number) => (
                        <Grid
                          key={`skeleton-${value}-${index}`}
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={4}
                        >
                          <AnimalItemSkeleton />
                        </Grid>
                      )
                    )}
              </Grid>
              {resultData.length && (
                <div>
                  <Button
                    className="w-full text-sm font-bold"
                    style={styles.searchButton}
                    onClick={fetchMoreData}
                  >
                    MORE
                  </Button>
                </div>
              )}
            </InfiniteScroll>
          </Stack>
        </div>
        <FriendsDrawer />
      </div>
    </>
  );
}
