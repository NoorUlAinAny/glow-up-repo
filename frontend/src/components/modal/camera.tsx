import React, { useRef, useState } from "react";
import Modal from ".";
import Button from "../button";

interface Props {
  shown: boolean;
  close: () => void;
  setImage: (image: File) => void;
}
type ModalState = 'instructions' | 'camera' | 'image';

const CameraModal: React.FC<Props> = ({ shown, close, setImage }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imageStr,setImageStr] = useState('');
  const [modalState, setModalState] = useState<ModalState>('instructions');

  const closeModal = ():void => {
    close();
    setModalState('instructions');
  }
  const startCamera = async () => {
    setModalState('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  const capturePhoto = () => {
    setModalState('image');
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 300, 200);
        const dataURL = canvasRef.current.toDataURL("image/png");
        setImageStr(dataURL);
      }
    }
    stopCamera();
  };
  const analyzeImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        setImage(blob as File);
      }, "image/png");
    } catch (err) {
      console.error("Error analyzing image:", err);
    }
    closeModal();
  };
  return (
    <Modal shown={shown} close={closeModal} title="𝕤𝕜𝕚𝕟 𝕘𝕝𝕠𝕨">
        <>
          <canvas ref={canvasRef} width="300" height="200" style={{ display: "none" }}/>
          {modalState === 'instructions' && (
            <div className="d-flex flex-column justify-content-center gap-4  align-items-center">
              <h1>𝕚𝕟𝕤𝕥𝕣𝕒𝕔𝕥𝕚𝕠𝕟</h1>
                <div>
                  <p>👓 Take off your glasses and ensure there's no bangs on your forehead.</p> 
                  <p>💡 Make sure that you're in a well-lighted environment.</p>
                  <p>💄 Testing with no-makeup will get more accurate results.</p> 
                  <p>📷 Look straight into the camera and keep your face inside the circle.</p>
                </div>
                <Button  onClick={startCamera}>GET STARTED</Button>
            </div>
          )}

          {(modalState === 'camera') && (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h3 className="text-center mb-3">Take a Picture</h3>
              <div className="d-flex justify-content-center">
              <video ref={videoRef} width="300" height="200" autoPlay className="border rounded"/>
              </div>
              <Button onClick={capturePhoto}>Capture</Button>
            </div>
          )}

          {modalState === 'image' && (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img src={imageStr} alt="Captured" className="border rounded mb-3" />
              <Button onClick={analyzeImage}>Analyze</Button>
            </div>
          )}
        </>
    </Modal>
  );
};

export default CameraModal;