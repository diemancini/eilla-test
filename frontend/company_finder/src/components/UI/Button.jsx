import { useEffect, useState, useCallback } from "react";
import { sendHttpRequest, getUrl } from "../../hooks/http";

//const requestConfig = { query: "" };

export default function Button({ query, handleButton }) {
  //const [isClicked, setIsClicked] = useState(false);
  //const url = getUrl(query);

  // const handleButton = useCallback(async () => {
  //   setIsClicked(true);
  //   const data = await sendHttpRequest(url, {});
  //   console.log(data);
  //   // setTimeout(function () {
  //   //   alert(`The link was clicked. Data: ${company.company_name}`);
  //   // }, 2000);
  //   setIsClicked(false);
  // }, [setIsClicked, url]);
  // useEffect(() => {
  //   if (isClicked) handleButton();
  // }, [handleButton, isClicked]);

  return <button onClick={() => handleButton()}>Similar</button>;
}
