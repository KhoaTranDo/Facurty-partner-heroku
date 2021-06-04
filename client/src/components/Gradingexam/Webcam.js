import React from "react";
import Webcam from "react-webcam";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";
const videoConstraints = {
  facingMode: "user"
};

const WebcamCapture = (props) => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);
  // const [devices, setDevices] = React.useState([]);
 
  //   Doi camera
  // const [deviceId, setDeviceId] = React.useState({});
 
  const handleClick = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);
 

  const capture = React.useCallback(
    (e) => {
      e.preventDefault();
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);

      props.image(imageSrc);
    },
    [webcamRef, setImgSrc]
  );

  return (
    <>
      {/* <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </> */}
      <div className="form-row">
        <div className="col form-group">
          <Webcam
            audio={false}
            ref={webcamRef}
            width="100%"
            height="100%"
            videoConstraints={{
              ...videoConstraints,
              facingMode
            }}
            screenshotFormat="image/PNG"
          />

          {/* {imgSrc && <img src={imgSrc} />} */}
        </div>
        {/* form-group end.// */}
        {/* form-group end.// */}
      </div>
      <div className="form-group m-auto col-3">
        <button
          type="submit"
          onClick={capture}
          className="btn btn-primary btn-block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-camera"
            viewBox="0 0 16 16"
            height='25px'
            width='25px'
          >
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
          </svg>
        </button>
        <button onClick={handleClick}  className="btn btn-primary btn-block">Switch</button>
      </div>
    </>
  );
};

export default WebcamCapture;
