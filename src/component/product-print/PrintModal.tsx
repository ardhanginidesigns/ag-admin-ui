import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import ProductPrintForm from "./PrintForm";
import { ProductPrintContext, productPrintContext } from "../../context/print/print.service";

function ProductPrintModal() {
  const context: ProductPrintContext | null = useContext(productPrintContext);
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
        <ProductPrintForm></ProductPrintForm>
      </Modal.Body>
    </Modal>
  );
}

export default ProductPrintModal;
