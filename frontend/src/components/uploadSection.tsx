import React, { useRef, useState } from 'react';
import { Upload, Camera, Image, AlertCircle } from 'lucide-react';
import Button from "../components/button";


interface UploadSectionProps {
  onCameraOpen: () => void;
  setImage: (image: File) => void;
}


export const UploadSection = ({ onCameraOpen,setImage }: UploadSectionProps) => {
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };
  const handleFile = (file: File) => {
    setUploadError('');
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file (JPG, PNG, etc.)');
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size should be less than 10MB');
      return;
    }
    setImage(file);    
  };
  const handleCameraCapture = () => {
    onCameraOpen();
  };

  return (
    <div className="upload-section">
      <div className="upload-container">
        <div className="upload-card">
          <div className="upload-header">
            <h1>𝕌𝕡𝕝𝕠𝕒𝕕 𝕐𝕠𝕦𝕣 ℙ𝕙𝕠𝕥𝕠</h1>
            <p>Upload a clear photo of your face for AI-powered skin analysis</p>
          </div>

          <div className={`upload-dropzone ${isDragging ? 'dragging' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <div className="upload-inner">
              <div className="circle-indicator">
                <Upload size={32} className="text-primary" />
              </div>
              <div>
                <h3>Drag & drop your image here</h3>
                <p>or choose from your device</p>
              </div>

              <div className="upload-buttons">
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Image size={20} />
                  <span className="ms-2">Upload Image</span>
                </Button>


                <Button onClick={handleCameraCapture}>
                    <Camera size={20} />
                    <span className="ms-2">Use Camera</span>
                </Button>
                
                </div>

                <p className="upload-note">
                  Supported formats: JPG, PNG, WebP • Max size: 10MB
                </p>
            </div>
          </div>

          {uploadError && (
            <div className="alert alert-danger d-flex align-items-center gap-2 mt-4" role="alert">
              <AlertCircle size={20} />
              {uploadError}
            </div>
          )}
            
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="d-none"/>
        </div>
      </div>
    </div>
  );
};
