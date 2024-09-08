import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProductCollectionDto, } from "../../services/openapi";
import { productCollectionContext, ProductCollectionContext } from "../../context/collection/collection.service";

function ProductCollectionForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductCollectionDto>();

  const context: ProductCollectionContext | null = useContext(productCollectionContext);

  const onSubmit: SubmitHandler<CreateProductCollectionDto> = (data) => {
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
          Name :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="manufacturername"
            placeholder="collection name"
            {...register("name", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.name
                : "",
            })}
          />
          {errors.name && <span>This field is required</span>}
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="manufacturername" className="col-sm-4 col-form-label">
          Description :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="manufacturername"
            placeholder="collection description"
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

export default ProductCollectionForm;
