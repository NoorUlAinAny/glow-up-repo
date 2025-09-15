import React, { useEffect, useRef, useState } from "react";
import { ArrowDownWideNarrow } from 'lucide-react';
import Image from "../assets/images/pages/home/621fa0b480c336bce0fb09cd5ee2c419.jpg"

import Layout from "../layout";
import { analyze } from "../api";
import Button from "../components/button";
import HowItWorks from "../components/howitwork";
import CameraModal from "../components/modal/camera";
import ResultModal from "../components/modal/results";
import { UploadSection } from "../components/uploadSection";
import ErrorModal from "../components/modal/error";

export default function Home(): React.ReactElement {
  const [error,setError] = useState('');
  const [result, setResult] = useState({});
  const [image, setImage] = useState<File>();
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [captureModal, setCaptureModal] = useState<boolean>(false);

  const uploadRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToWorks = () => {
    worksRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const analyzeImage = async (img:File) => {
    try {
      const response = await analyze(img);
      setCaptureModal(false);
      if (typeof response === 'string') {
        setError(response);
        setErrorModal(true);
      } else {
        setResult(response);
        setResultModal(true);
      }
    } catch (err) {
      setResultModal(false);
      setCaptureModal(false);
      setError(err as string);
      setErrorModal(true);
      console.error("Error analyzing image:", err);
    }
  };

  useEffect(() => {
    if (image) {
      analyzeImage(image);
    }
  }, [image]);

  return (
    <Layout 
      topBgImg="home"
      gotoGetStarted={scrollToUpload}
      gotoHowItWorks={scrollToWorks}
      topSection={(
        <>
          <div className="main-text">
            <h1>AI-Powered Skin Analysis</h1>
            <p>Discover your skin's unique needs with our advanced AI technology. Get personalized recommendations and track your journey to healthier skin.</p>
            <Button onClick={scrollToUpload}>
              <ArrowDownWideNarrow size={20} />
              <span className="ms-2">Get Started</span>
            </Button>
          </div>
          <img src= {Image} alt="example"></img>
        </>
      )}
    >
      <>
        <CameraModal 
          shown={captureModal}
          close={() => setCaptureModal(false)}
          setImage={(img:File) => setImage(img)}
        />

        <ResultModal
          shown={resultModal}
          close={() => setResultModal(false)}
          results={result}
        />

        {error && <ErrorModal shown={errorModal} close={() => setErrorModal(false)} error={error} />}

        <div ref={uploadRef}>
          <UploadSection
            setImage={(img:File) => setImage(img)}
            onCameraOpen={() => setCaptureModal(true)}
          />
        </div>
        <div ref={worksRef}>
          <HowItWorks />
        </div>
      </>
    </Layout>
  );
}
