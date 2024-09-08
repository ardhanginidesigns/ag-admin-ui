import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { manufacturerContext, ManufacturerContext } from "../../context/manufacturer/manufacturer.service";
import ManufacturerForm from "./ManufacturerForm";

function ManufacturerModal() {
  const context: ManufacturerContext | null = useContext(manufacturerContext);
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
        <ManufacturerForm></ManufacturerForm>
      </Modal.Body>
    </Modal>
  );
}

export default ManufacturerModal;
