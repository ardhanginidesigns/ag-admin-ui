import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { productDetailsContext, ProductDetailsContext } from '../../context/product-details/product-details.service';
import ProductImageUpload from './ProductImageUpload';

function ProductFileUploadModal() {
    const context: ProductDetailsContext | null = useContext(productDetailsContext);
  return (
    <Modal
      show={context?.showFileUploadModal}
      onHide={context?.handleCloseModal}
      size="lg"
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{context?.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ProductImageUpload></ProductImageUpload>
      </Modal.Body>
    </Modal>
  )
}

export default ProductFileUploadModal