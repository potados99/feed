import React, { useCallback, useState } from "react";

export default function useApi<Type>(
  fetcher: () => Promise<Type>,
  initial: Type,
  deps: any[] = [],
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Type>(initial);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    fetcher()
      .then(setData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, deps /*dependency에 변경이 있을 때마다 fetch 함수를 갱신합니다.*/);

  React.useEffect(() => {
    fetchData();
  }, [fetchData /*fetch 함수가 갱신되면 새로 실행합니다.*/]);

  return {
    isLoading,
    isError,
    data,
    reload: fetchData,
  };
}
