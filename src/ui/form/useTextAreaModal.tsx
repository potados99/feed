import useFocus from "../../common/useFocus";
import { useEffect, useState } from "react";

export default function useTextAreaModal() {
  const [visible, setVisible] = useState<boolean>(false);
  const [textAreaRef, setFocus] = useFocus();

  useEffect(() => {
    setVisible(true);
    setTimeout(setFocus, 500); // wait until animation ends.

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return {
    visible,
    textAreaRef,
  };
}
