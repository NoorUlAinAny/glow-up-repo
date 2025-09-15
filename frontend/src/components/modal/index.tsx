import React from "react";
import { Modal as BootstrapModal } from 'react-bootstrap';

interface ModalProps {
  shown: boolean;
  close: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ shown, close, title, children }) => {
  return (
    <BootstrapModal show={shown} onHide={close} size='lg'>
      <BootstrapModal.Header closeButton>
  <BootstrapModal.Title>
    <span style={{
      fontWeight: "bold",
      fontSize: "2rem",
      background: "linear-gradient(to right, #C5796D, #DBE6F6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}>
      {title}
    </span>
  </BootstrapModal.Title>
</BootstrapModal.Header>
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;