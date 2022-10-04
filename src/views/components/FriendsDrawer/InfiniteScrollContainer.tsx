import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { FriendModel } from "../../../models";
import FriendInfoListItem from "./FriendInfoListItem";
import FriendItemSkeleton from "./FriendItemSkeleton";

const defaultHeight = 730;

const getMaxGrowHeight = (id: string): number => {
  const el = document.querySelector(`#${id}`);
  if (!el) return defaultHeight;
  const scrollBoxBoundingRect = el.getBoundingClientRect();
  const screenHeight = window.innerHeight;

  return screenHeight - scrollBoxBoundingRect.top - 30;
};

export default function InfiniteScrollContainer({
  id,
  items,
  emitFetchMore,
  perPageProp = 10,
  pageNumProp = 1,
}: {
  id: string;
  items: FriendModel[];
  emitFetchMore: (pageNum: number, perPage: number) => void;
  perPageProp?: number;
  pageNumProp?: number;
}) {
  const [scrollBoxHeight, setScrollBoxHeight] = useState<number>(defaultHeight);
  const [pageNum, setPageNum] = useState<number>(pageNumProp);
  const [oldItemsCount, setOldItemsCount] = useState<number>(0);

  const fetchMore = () => {
    if (oldItemsCount === items.length) return;
    setOldItemsCount(items.length);
    emitFetchMore(pageNum + 1, perPageProp);
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    setPageNum(Math.round(items.length / perPageProp));
    function handleResize() {
      setScrollBoxHeight(getMaxGrowHeight(id));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [id, items.length, perPageProp]);

  return (
    <div id={id}>
      <InfiniteScroll
        dataLength={items.length}
        next={() => fetchMore()}
        hasMore={true}
        loader={<></>}
        height={scrollBoxHeight}
      >
        {items.length
          ? items.map((item: FriendModel, index: number) => (
              <div key={`followers-${index}`}>
                <FriendInfoListItem
                  avatar={item?.avater}
                  name={item?.name}
                  username={item?.username}
                  isFollowing={item?.isFollowing}
                />
              </div>
            ))
          : [...Array(8)].map((val: null | undefined, index: number) => (
              <div key={`loading-${val}-${index}`}>
                <FriendItemSkeleton />
              </div>
            ))}
        {items.length && oldItemsCount != items.length && (
          <div className="flex justify-center">
            <button
              className="border border-white rounded-full text-white text-bold  hover:text-black hover:bg-white hover:border hover:border-black text-sm mt-5 mb-5 px-10 py-1.5"
              onClick={() => fetchMore()}
            >
              More
            </button>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
