import { useContext } from "react";
import { CreateManufacturerDto } from "../../services/openapi/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { manufacturerContext, ManufacturerContext } from "../../context/manufacturer/manufacturer.service";

function ManufacturerForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateManufacturerDto>();
  const context: ManufacturerContext | null = useContext(manufacturerContext);
  const onSubmit: SubmitHandler<CreateManufacturerDto> = (data) => {
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
            placeholder="Manufacturer Name"
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
        <label htmlFor="origin" className="col-sm-4 col-form-label">
          Origin :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="origin"
            placeholder="Manufacturer origin"
            {...register("origin", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.origin
                : "",
            })}
          />
          {errors.origin && <span>This field is required</span>}
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="address" className="col-sm-4 col-form-label">
          address :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="origin"
            placeholder="Manufacturer address"
            {...register("address", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.address
                : "",
            })}
          />
          {errors.address && <span>This field is required</span>}
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

export default ManufacturerForm;
