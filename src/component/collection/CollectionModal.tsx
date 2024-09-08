import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import ProductCollectionForm from "./CollectionForm";
import { productCollectionContext, ProductCollectionContext } from "../../context/collection/collection.service";

function ProductCollectionModal() {
  const context: ProductCollectionContext | null = useContext(productCollectionContext);
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
        <ProductCollectionForm></ProductCollectionForm>
      </Modal.Body>
    </Modal>
  );
}

export default ProductCollectionModal;
