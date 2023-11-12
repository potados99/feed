import React, { useState } from "react";
import useApi from "./useApi";

export default function useApiData<Type>(
  fetcher: () => Promise<Type>,
  initial: Type,
  deps: any[] = [],
) {
  const [data, setData] = useState<Type>(initial);
  const { isLoading, isError, invoke } = useApi(
    () => fetcher().then(setData),
    deps,
  );

  React.useEffect(() => {
    invoke();
  }, [invoke]);

  return {
    isLoading,
    isError,
    data,
    reload: invoke,
  };
}
