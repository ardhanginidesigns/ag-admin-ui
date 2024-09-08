import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import ProductTypeForm from "./ProductTypeForm";
import { productTypeContext, ProductTypeContext } from "../../context/product-type/product-type.service";

function ProductTypeModal() {
  const context: ProductTypeContext | null = useContext(productTypeContext);
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
        <ProductTypeForm></ProductTypeForm>
      </Modal.Body>
    </Modal>
  );
}

export default ProductTypeModal;
