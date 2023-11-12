import React, { useCallback, useState } from "react";

export default function useApi<Type>(
  apiCall: () => Promise<Type>,
  deps: any[] = [],
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const invoke = useCallback(() => {
    setIsLoading(true);
    apiCall()
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, deps /*dependency에 변경이 있을 때마다 invoke 함수를 갱신합니다.*/);

  return {
    isLoading,
    isError,
    invoke,
  };
}
