import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const defaultHeight = 730; // Set default height of scrollable box.

/* Calculate the distance from bottom of item with specific id 
to the bottom of screen. */
const getMaxGrowHeight = (id: string): number => {
  const el = document.querySelector(`#${id}`);
  if (!el) return defaultHeight;
  const scrollBoxBoundingRect = el.getBoundingClientRect();
  const screenHeight = window.innerHeight;

  return screenHeight - scrollBoxBoundingRect.top - 30; // give some padding i.e. 30 px
};

export default function InfiniteScrollContainer({
  elementId, // id attribute of scrollable box container.
  itemsLength,
  hasMore = true,
  fetchMore, // fetch more request is handled by parent.
  children,
}: {
  elementId: string;
  itemsLength: number;
  hasMore: boolean;
  fetchMore: () => void;
  children: React.ReactNode;
}) {
  const [scrollBoxHeight, setScrollBoxHeight] = useState<number>(defaultHeight);

  useEffect(() => {
    // Adjust scrollable container's height whenever screen size changes.
    function handleResize() {
      setScrollBoxHeight(getMaxGrowHeight(elementId));
    }
    // Set the initial height of scrollable container.
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [elementId]);

  return (
    <InfiniteScroll
      dataLength={itemsLength}
      next={fetchMore}
      hasMore={hasMore}
      loader={<></>}
      height={scrollBoxHeight}
    >
      {children}
    </InfiniteScroll>
  );
}
