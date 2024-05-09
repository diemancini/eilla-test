import { useEffect, useState, useCallback } from "react";

export async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  return resData;
}

export function getUrl(companyData) {
  //let url = "http://localhost:8000/company/names";
  const numberObjects = Object.keys(companyData).length;
  let url = "http://localhost:8000/company";
  if (numberObjects === 1 && companyData.company_name === undefined) return url;
  let query = "?";
  //Object.keys(companyData).length === 3 ? (url += "/similar") : "";
  if (numberObjects === 3) {
    url += "/similar";
  }

  for (const [key, value] of Object.entries(companyData)) {
    query += `${key}=${value}&`;
  }

  url += query.slice(0, -1);
  //console.log(query);
  return url;
}

export function useHttp(url, config, initialData) {
  //console.log("--------------- HOOK ------------------");
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
        if (resData.length > 0) setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && config.query && data.length === 0) {
      // console.log("IF IN SENDREQUEST");
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
