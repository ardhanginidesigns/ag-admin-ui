import React from "react";
import { Modal } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";

function Spinner({ visible }: { visible: boolean }) {
  return (
    <Modal show={visible} backdrop={true}>
      <Modal.Body>
        <InfinitySpin width="200" color="#4fa94d" />
      </Modal.Body>
    </Modal>
  );
}

export default Spinner;
