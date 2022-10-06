import { useState, useEffect, useCallback } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

import Api from "../../../service/Api";
import { AnimalModel } from "../../../models";
import AnimalItem from "./AnimalItem";
import AnimalItemSkeleton from "./AnimalItemSkeleton";
import InfiniteScrollContainer from "../../components/InfiniteScrollContainer";

export default function AnimalsList({
  searchKeyword,
  pageCount,
}: {
  searchKeyword: string;
  pageCount: number;
}) {
  const [searchResultItems, setSearchResultItems] = useState<AnimalModel[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch animal search result based on page number, count per page and search keyword.
  const fetchSearchResult = useCallback(
    async (num: number, count: number, keyword: string) => {
      setIsLoading(true);
      const res = await Api().get(
        `users/all?page=${num}&pageSize=${count}&keyword=${keyword}`
      );
      setIsLoading(false);
      const fetchedData = res?.data?.data;
      // Concatenate fetched items to already existing items.
      setSearchResultItems((data) =>
        data.concat(fetchedData ? fetchedData : [])
      );
      // If no data is fetched, no more send request.
      if (!fetchedData || !fetchedData.length) setHasMore(false);
    },
    []
  );

  const fetchMoreData = () => {
    setPageNum(pageNum + 1);
    fetchSearchResult(pageNum, pageCount, searchKeyword);
  };

  useEffect(() => {
    // Fetch first page of items when mounted.
    fetchSearchResult(1, pageCount, searchKeyword);
  }, [pageCount, searchKeyword, fetchSearchResult]);

  return (
    <InfiniteScrollContainer
      elementId="searchResult"
      itemsLength={searchResultItems.length}
      hasMore={hasMore}
      fetchMore={fetchMoreData}
    >
      <div id="searchResult" className="pb-10">
        <Grid className="md:mt-[-18px]" container>
          {searchResultItems.length !== 0 &&
            searchResultItems.map((item: AnimalModel, index: number) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={`animal-${index}`}>
                <AnimalItem
                  avater={item.avater}
                  name={item.name}
                  username={item.username}
                />
              </Grid>
            ))}
          {isLoading &&
            [...Array(6)].map((value: null | undefined, index: number) => (
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
            ))}
        </Grid>
        {searchResultItems.length && hasMore && (
          <div>
            <Button
              className="w-full text-sm font-bold h-[40px] max-w-[343px] mr-[2px] ml-[20px] mt-[18px] mb-[30px]"
              onClick={() => fetchMoreData()}
            >
              MORE
            </Button>
          </div>
        )}
      </div>
    </InfiniteScrollContainer>
  );
}
