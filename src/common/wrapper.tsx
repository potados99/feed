import React, { PropsWithChildren } from "react";

export function InlineWrapperWithMargin({
  children,
}: PropsWithChildren<unknown>) {
  return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
}
