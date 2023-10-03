import { useEffect, useRef } from "react";

interface IInfiniteScroll {
  callback: () => void;
}

export const InfiniteScroll = ({ callback }: IInfiniteScroll) => {
  const divInfiniteScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const ratio = entry.intersectionRatio;

      if (ratio > 0) {
        callback();
      }
    });

    if (divInfiniteScrollRef.current) {
      intersectionObserver.observe(divInfiniteScrollRef.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, [divInfiniteScrollRef]);

  return <div ref={divInfiniteScrollRef} />;
};
