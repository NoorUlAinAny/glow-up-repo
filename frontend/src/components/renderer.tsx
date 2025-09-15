import React from "react";

interface Props {
  htmlString: string;
}

const HTMLRenderer: React.FC<Props> = ({ htmlString }) => {
  return (
    <div 
    dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

export default HTMLRenderer;

