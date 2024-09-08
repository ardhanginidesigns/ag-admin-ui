import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProductStyleDto } from "../../services/openapi";
import {
  productStyleContext,
  ProductStyleContext,
} from "../../context/style/style.service";

function ProductStyleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductStyleDto>();

  const context: ProductStyleContext | null = useContext(productStyleContext);

  const onSubmit: SubmitHandler<CreateProductStyleDto> = (data) => {
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
            placeholder="style name"
            {...register("name", {
              required: true,
              value: context?.selectedData ? context?.selectedData.name : "",
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
            placeholder="style description"
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

export default ProductStyleForm;
