import React from 'react';
import { Upload, Brain, FileText, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Image',
      description: 'Take or upload a clear photo of your face in good lighting',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced AI model analyzes your skin for various conditions',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FileText,
      title: 'Detailed Report',
      description: 'Get comprehensive results with confidence scores and affected areas',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: CheckCircle,
      title: 'Recommendations',
      description: 'Receive personalized skincare recommendations based on your analysis',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="container mb-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold text-dark mb-4">How It Works</h2>
        <p className="fs-4 text-muted">Get professional-grade skin analysis in just a few simple steps</p>
      </div>
      
      <div className="row g-4">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="col-md-6 col-lg-3 text-center">
              <div className="position-relative mb-4">
                <div className="circle-indicator mx-auto gradient-primary rounded-4 shadow-lg">
                  <IconComponent size={32} className="text-black" />
                </div>
                
                
              </div>
              
              <h3 className="h5 fw-bold text-dark mb-3">{step.title}</h3>
              <p className="text-muted">{step.description}</p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-5 gradient-primary  p-5 text-white">
        <div
          className="row g-4 text-center rounded-4"
          style={{
            background: "linear-gradient(to right, #C5796D, #DBE6F6)"
          }}
>          <div className="col-md-4 ">
            <div className="display-6 fw-bold mb-2">92.2%</div>
            <p className="text-black-50 fs-5">Accuracy Rate</p>
          </div>
          <div className="col-md-4">
            <div className="display-6 fw-bold mb-2">&lt;5s</div>
            <p className="text-black-50 fs-5">Analysis Time</p>
          </div>
          <div className="col-md-4">
            <div className="display-6 fw-bold mb-2">27k+</div>
            <p className="text-black-50 fs-5">Images Analyzed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;