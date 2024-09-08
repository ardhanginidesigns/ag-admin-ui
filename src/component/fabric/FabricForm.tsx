import { useContext } from "react";
import { CreateFabricDto, CreateManufacturerDto } from "../../services/openapi/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { manufacturerContext, ManufacturerContext } from "../../context/manufacturer/manufacturer.service";
import { fabricContext, FabricContext } from "../../context/fabric/fabric.service";

function FabricForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFabricDto>();

  const context: FabricContext | null = useContext(fabricContext);

  const onSubmit: SubmitHandler<CreateFabricDto> = (data) => {
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
            {...register("fabricName", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.fabricName
                : "",
            })}
          />
          {errors.fabricName && <span>This field is required</span>}
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
            {...register("fabricDescription", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.fabricDescription
                : "",
            })}
          />
          {errors.washCare && <span>This field is required</span>}
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
            placeholder="wash care description"
            {...register("washCare", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.washCare
                : "",
            })}
          />
          {errors.washCare && <span>This field is required</span>}
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

export default FabricForm;
