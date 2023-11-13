import React, { useRef } from "react";

export default function useFocus(): [React.MutableRefObject<any>, () => void] {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    if (htmlElRef.current) {
      (htmlElRef.current as any).focus();
    }
  };

  return [htmlElRef, setFocus];
}
