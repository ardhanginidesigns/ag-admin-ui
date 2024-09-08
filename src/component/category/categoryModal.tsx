import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import CategoryForm from "./categoryForm";
import { CreateCategoryDto } from "../../services/openapi";
import { CategoryContext, context } from "../../context/category/category.service";

function CategoryModal() {
  const categoryContext: CategoryContext | null = useContext(context);
  return (
    <Modal
      show={categoryContext?.showModal}
      onHide={categoryContext?.handleCloseModal}
      size="lg"
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{categoryContext?.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CategoryForm></CategoryForm>
      </Modal.Body>
    </Modal>
  );
}

export default CategoryModal;
