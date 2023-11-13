import { useEffect, useState } from "react";

export default function useBackButton(): [boolean, () => void, () => void] {
  const [isBack, setIsBack] = useState(false);
  const handleEvent = () => {
    setIsBack(true);
  };

  useEffect(() => {
    window.addEventListener("popstate", handleEvent);
    return () => window.removeEventListener("popstate", handleEvent);
  });

  const push = () => {
    window.history.pushState(null, "", document.URL);
  };

  const pop = () => {
    window.history.back();
  };

  return [isBack, push, pop];
}
