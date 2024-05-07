import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  return resData;
}

export function getUrl(searchTerms) {
  //let url = "http://localhost:8000/company/names";
  let url;
  if (searchTerms) {
    url = `http://localhost:8000/company?q=${searchTerms}`;
  }
  // for (let i = 1; i < searchTerms.length; i++) {
  //   url += `&q=${searchTerms[i]}`;
  // }
  return url;
}

export function useHttp(url, config, initialData) {
  console.log("--------------- HOOK ------------------");
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function clearData() {
    setData(initialData);
    setError(null);
  }

  const sendRequest = useCallback(
    async function sendRequest(reqData) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: reqData,
        });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && config.query && data.length === 0) {
      console.log("IF IN SENDREQUEST");
      sendRequest();
    }
  }, [config, data, sendRequest]);

  return {
    data,
    isLoading,
    error,
    clearData,
  };
}
