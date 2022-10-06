import { useEffect, useState } from "react";

import { FriendModel } from "../../../models";
import FriendInfoListItem from "./FriendInfoListItem";
import FriendItemSkeleton from "./FriendItemSkeleton";
import InfiniteScrollContainer from "../../components/InfiniteScrollContainer";

export default function FriendsList({
  elementId, // id attribute of scrollable box container.
  items,
  emitFetchMore, // fetch more request is handled by parent.
  perPageProp = 10,
  pageNumProp = 1,
}: {
  elementId: string;
  items: FriendModel[];
  emitFetchMore: (pageNum: number, perPage: number) => void;
  perPageProp?: number;
  pageNumProp?: number;
}) {
  const [pageNum, setPageNum] = useState<number>(pageNumProp);
  const [oldItemsCount, setOldItemsCount] = useState<number>(0); // number of items prior to sending new fetch more request.

  const fetchMore = () => {
    // Ignore fetch more event if previous request has no response yet.
    if (oldItemsCount === items.length) return;
    setOldItemsCount(items.length); // Make oldItemsCount up-to-date.
    emitFetchMore(pageNum + 1, perPageProp); // Emit new request for next page items to parent.
    setPageNum(pageNum + 1); // Update page number.
  };

  useEffect(() => {
    // Set the start page based on number of items that are currently stored in redux state. (instead of blindly start from page 1.)
    setPageNum(Math.round(items.length / perPageProp));
    // Adjust scrollable container's height whenever screen size changes.
  }, [items.length, perPageProp]);

  return (
    <InfiniteScrollContainer
      elementId={elementId}
      itemsLength={items.length}
      hasMore={true}
      fetchMore={fetchMore}
    >
      <div id={elementId} className="pb-5">
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
          : [...Array(12)].map((val: null | undefined, index: number) => (
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
      </div>
    </InfiniteScrollContainer>
  );
}
