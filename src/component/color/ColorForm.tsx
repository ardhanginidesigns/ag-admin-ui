import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProductColorDto } from "../../services/openapi";
import { productColorContext, ProductColourContext } from '../../context/color/color.service';

function ColorForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductColorDto>();

  const context: ProductColourContext | null = useContext(productColorContext);

  const onSubmit: SubmitHandler<CreateProductColorDto> = (data) => {
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
          Colour Name :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="manufacturername"
            placeholder="color name"
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

export default ColorForm;
