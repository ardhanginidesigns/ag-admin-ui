import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import ProductDetailsForm from "./ProductDetailsForm";
import { productDetailsContext, ProductDetailsContext } from "../../context/product-details/product-details.service";

function ProductDetailsModal() {
  const context: ProductDetailsContext | null = useContext(productDetailsContext);
  return (
    <Modal
      show={context?.showModal}
      onHide={context?.handleCloseModal}
      onExit={context?.handleCloseModal}
      size="lg"
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{context?.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ProductDetailsForm></ProductDetailsForm>
      </Modal.Body>
    </Modal>
  );
}

export default ProductDetailsModal;
