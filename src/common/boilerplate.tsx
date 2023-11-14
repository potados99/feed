import React from "react";
import { InlineWrapperWithMargin } from "./wrapper";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import { useTheme } from "styled-components";

export function InlineSkeleton(props: SkeletonProps) {
  return <ThemedSkeleton inline wrapper={InlineWrapperWithMargin} {...props} />;
}

export function HorizontalErrorView() {
  return <div>Error!</div>;
}

export function ErrorView() {
  return <div>Error!</div>;
}

export function ThemedSkeleton(props: SkeletonProps) {
  const theme = useTheme();

  return <Skeleton baseColor={theme.skeleton} {...props} />;
}
