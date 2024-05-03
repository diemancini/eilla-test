import { useEffect, useState, useCallback } from "react";
//import { QueryClient } from "react-query";

//delete after
//export const queryClient = new QueryClient();

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  //const results = getFormatedJson(resData);

  return resData;
}

export function getUrl() {
  const url = "http://localhost:3000";
  return url;
}

export function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(body, requestOptions) {
      setIsLoading(true);
      try {
        //const resData = await sendHttpRequest(url, requestOptions);
        const resData = await sendHttpRequest(url, requestOptions);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest(null, null);
    }
  }, [url, sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    //sendRequest,
    clearData,
  };
}
