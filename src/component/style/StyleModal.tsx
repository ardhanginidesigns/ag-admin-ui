import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import ProductStyleForm from "../product-print/PrintForm";
import { productStyleContext, ProductStyleContext } from "../../context/style/style.service";

function ProductStyleModal() {
  const context: ProductStyleContext | null = useContext(productStyleContext);
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
        <ProductStyleForm></ProductStyleForm>
      </Modal.Body>
    </Modal>
  );
}

export default ProductStyleModal;
