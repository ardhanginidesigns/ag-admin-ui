import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import ColorForm from "./ColorForm";
import { productColorContext, ProductColourContext } from "../../context/color/color.service";

function ProductColourModal() {
  const context: ProductColourContext | null = useContext(productColorContext);
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
        <ColorForm></ColorForm>
      </Modal.Body>
    </Modal>
  );
}

export default ProductColourModal;
