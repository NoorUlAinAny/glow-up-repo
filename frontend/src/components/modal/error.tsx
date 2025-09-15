import React from "react";
import Modal from ".";

interface Props {
  error: string;
  shown: boolean;
  close: () => void;
}

const ErrorModal: React.FC<Props> = ({ shown, close, error }) => {
  return (
    <Modal shown={shown} close={close} title="Error">
        <p className="text-danger">{error}</p>
    </Modal>
  );
};

export default ErrorModal;