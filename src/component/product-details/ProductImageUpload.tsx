import React, { useCallback, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  productDetailsContext,
  ProductDetailsContext,
} from "../../context/product-details/product-details.service";
import { useForm } from "react-hook-form";

function ProductImageUpload() {
  const context: ProductDetailsContext | null = useContext(
    productDetailsContext
  );
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data:any) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("imageDescription", data.description);
    formData.append("productId", context?.selectedData?.productid!);
    formData.append("productTypeId", context?.selectedProductType!);

    const res = await fetch("http://localhost:3001/product-image/upload", {
      method: "POST",
      body: formData,
    }).then((res) => console.trace(res.json));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" {...register("file")} />
          </Form.Group>
          <Form.Label htmlFor="inputPassword5">Description</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            {...register("description")}
          />
          <Form.Text id="passwordHelpBlock" muted>
            You should provide the description.
          </Form.Text>
        </div>
        <div className="row">
          <button type="submit">save</button>{" "}
        </div>
      </form>
    </div>
  );
}

export default ProductImageUpload;
