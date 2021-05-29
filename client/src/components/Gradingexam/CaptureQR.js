import React, { useState, useRef } from "react";
// import {
//   Container,
//   Card,
//   CardContent,
//   makeStyles,
//   Grid,
//   TextField,
//   Button,
// } from "@material-ui/core";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";

function Captune(props) {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultWebCam(result);
      props.data(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
      props.data(result);
    }
  };
  return (
    <>
      <QrReader
        ref={qrRef}
        delay={300}
        style={{ width: "1px" }}
        onError={handleErrorFile}
        onScan={handleScanFile}
        legacyMode
      />
      <QrReader
        delay={300}
        style={{ width: "100%" }}
        onError={handleErrorWebCam}
        onScan={handleScanWebCam}
      />
      <div className="row p-3 ">
      <button className="m-auto btn btn-primary" variant="contained" color="secondary" onClick={onScanFile}>
        Input QR Code
      </button>

      </div>
      
    </>
  );
}

export default Captune;
