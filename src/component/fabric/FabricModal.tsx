import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import {
  fabricContext,
  FabricContext,
} from "../../context/fabric/fabric.service";
import FabricForm from "./FabricForm";
import { InfinitySpin } from "react-loader-spinner";

function FabricModal() {
  const context: FabricContext | null = useContext(fabricContext);
  return (
    <Modal
      show={context?.showModal}
      onHide={context?.handleCloseModal}
      size="lg"
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{context?.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FabricForm></FabricForm>
      </Modal.Body>
    </Modal>
  );
}

export default FabricModal;
