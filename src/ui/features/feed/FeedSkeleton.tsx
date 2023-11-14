import React from "react";
import FeedItem from "./FeedItem";

type Props = {
  count: number;
};

export default function FeedSkeleton({ count }: Props) {
  return (
    <div>
      {new Array(count).fill(0).map((_, i) => (
        <FeedItem
          isLoading={true}
          key={i}
          hasNext={i < count - 1}
          hasPrevious={i > 0}
        />
      ))}
    </div>
  );
}
