import { useState, useCallback, useEffect } from "react";
//import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { getUrl, sendHttpRequest } from "../../hooks/http";
import Table from "./Table";
import "../../index.scss";

export default function SimilarButton({ companyInfo }) {
  const [isClicked, setIsClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const query = {
    industry: companyInfo.industry,
    country: companyInfo.country,
    keywords: companyInfo.keywords,
  };
  //let data = [];
  const url = getUrl(query);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleButton = useCallback(async () => {
    setIsClicked(true);
    const resData = await sendHttpRequest(url, {});
    setOpen(true);
    setData(resData);
    //console.log(data);
    // setTimeout(function () {
    //   alert(`The link was clicked. Data: ${company.company_name}`);
    // }, 2000);
    setIsClicked(false);
  }, [setIsClicked, url]);
  useEffect(() => {
    if (isClicked) handleButton();
  }, [handleButton, isClicked]);

  return (
    <>
      {/* <Button query={query} handleButton={handleButton} /> */}
      <button onClick={() => handleButton()}>Similar</button>;
      <Modal isOpen={open} handleClose={handleClose}>
        <div className='center modal-position'>
          <h3>Similar companies from {companyInfo.company_name}</h3>
        </div>
        <Table data={data} isModal={true} />
      </Modal>
    </>
  );
}
