import React from "react";
import { InlineWrapperWithMargin } from "./wrapper";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";

export function InlineSkeleton(props: SkeletonProps) {
  return <Skeleton inline wrapper={InlineWrapperWithMargin} {...props} />;
}

export function HorizontalErrorView() {
  return <div>Error!</div>;
}

export function ErrorView() {
  return <div>Error!</div>;
}
