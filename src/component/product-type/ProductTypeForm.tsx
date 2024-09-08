import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProductTypeDto } from "../../services/openapi";
import { productTypeContext, ProductTypeContext } from "../../context/product-type/product-type.service";

function ProductTypeForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductTypeDto>();

  const context: ProductTypeContext | null = useContext(productTypeContext);

  const onSubmit: SubmitHandler<CreateProductTypeDto> = (data) => {
    if (context?.selectedData) {
      context?.handleEditClick(context.selectedData?.id!, data);
    } else {
      context?.handleNewClick(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group row mb-3">
        <label htmlFor="manufacturername" className="col-sm-4 col-form-label">
          Manufacturer Name :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="manufacturername"
            placeholder="fabric name"
            {...register("name", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.name
                : "saree",
            })}
          />
          {errors.name && <span>This field is required</span>}
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="origin" className="col-sm-4 col-form-label">
          Origin :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="origin"
            placeholder="fabric description"
            {...register("description", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.description
                : "",
            })}
          />
          {errors.description && <span>This field is required</span>}
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductTypeForm;
