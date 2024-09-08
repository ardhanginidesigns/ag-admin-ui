import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import ProductOccassionForm from "./OccassionForm";
import { ProductOccassionContext, productOccassionContext } from "../../context/occassion/occassion.service";

function ProductOccassionModal() {
  const context: ProductOccassionContext | null = useContext(productOccassionContext);
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
        <ProductOccassionForm></ProductOccassionForm>
      </Modal.Body>
    </Modal>
  );
}

export default ProductOccassionModal;
