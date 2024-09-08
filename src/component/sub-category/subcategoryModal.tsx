import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { subCategoryContext, SubCategoryContext } from "../../context/sub-category/sub-category.service";
import SubCategoryForm from "./subcategoryForm";

function SubCategoryModal() {
  const context: SubCategoryContext | null = useContext(subCategoryContext);
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
        <SubCategoryForm></SubCategoryForm>
      </Modal.Body>
    </Modal>
  );
}

export default SubCategoryModal;
