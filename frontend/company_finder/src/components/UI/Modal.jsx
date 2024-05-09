import React from "react";

const MODAL_STYLES = {
  position: "absolute",
  backgroundColor: "#FFF",
  padding: "15px",
  zIndex: "1000",
  width: "70%",
  top: "5%",
  bottom: "5%",
  borderRadius: ".5em",
  overflow: "scroll",
};
const OVERLAY_STYLE = {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  top: "0%",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,.8)",
  zIndex: "1000",
};

export default function Modal({ isOpen, handleClose, children }) {
  //console.log(isOpen);
  if (!isOpen) return null;
  return (
    <>
      {/* <div className='overlay-style'>
        <div className='modal-styles'> */}
      <div style={OVERLAY_STYLE}>
        <div style={MODAL_STYLES}>
          <button className='modal-close' onClick={() => handleClose()}>
            Close
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
