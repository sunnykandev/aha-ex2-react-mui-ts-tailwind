import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

import { AnimalModel } from "../../../models";
import AnimalItem from "./AnimalItem";
import AnimalItemSkeleton from "./AnimalItemSkeleton";

const defaultHeight = 730;

const getMaxGrowHeight = (): number => {
  const el = document.querySelector("#targetElement");
  if (!el) return defaultHeight;
  const scrollBoxBoundingRect = el.getBoundingClientRect();
  const screenHeight = window.innerHeight;

  return screenHeight - scrollBoxBoundingRect.top - 30;
};

export default function InfiniteScrollContainer({
  items,
  hasMore,
  fetchMoreData,
}: {
  items: AnimalModel[];
  hasMore: boolean;
  fetchMoreData: () => void;
}) {
  const [scrollBoxHeight, setScrollBoxHeight] = useState<number>(defaultHeight);

  useEffect(() => {
    function handleResize() {
      setScrollBoxHeight(getMaxGrowHeight());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="targetElement">
      <InfiniteScroll
        className="mt-[7px] md:mt-[8px] mr-[-5px]"
        dataLength={items.length}
        next={() => fetchMoreData()}
        hasMore={hasMore}
        loader={<></>}
        height={scrollBoxHeight}
      >
        <Grid className="md:mt-[-18px]" container>
          {items.length
            ? items.map((item: AnimalModel, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={`animal-${index}`}>
                  <AnimalItem
                    avater={item.avater}
                    name={item.name}
                    username={item.username}
                  />
                </Grid>
              ))
            : [...Array(20)].map((value: null | undefined, index: number) => (
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
        {items.length && hasMore && (
          <div>
            <Button
              className="w-full text-sm font-bold h-[40px] max-w-[343px] mr-[2px] ml-[20px] mt-[18px] mb-[30px]"
              onClick={() => fetchMoreData()}
            >
              MORE
            </Button>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
