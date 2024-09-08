import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProductPrintDto } from "../../services/openapi";
import { productPrintContext, ProductPrintContext } from "../../context/print/print.service";

function ProductPrintForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductPrintDto>();

  const context: ProductPrintContext | null = useContext(productPrintContext);

  const onSubmit: SubmitHandler<CreateProductPrintDto> = (data) => {
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
            placeholder="print name"
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
            placeholder="print description"
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

export default ProductPrintForm;
