import { useContext, useEffect } from "react";
import { CreateCategoryDto, CreateSubcategoryDto } from "../../services/openapi/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { subCategoryContext, SubCategoryContext } from "../../context/sub-category/sub-category.service";

function SubCategoryForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateSubcategoryDto>();
  const context: SubCategoryContext | null = useContext(subCategoryContext);
  const onSubmit: SubmitHandler<CreateSubcategoryDto> = (data) => {
    if (context?.selectedData) {
      context?.handleEditClick(context.selectedData?.id!, data);
    } else {
      context?.handleNewClick(data);
    }
  };

  useEffect(() => {
    console.trace(context?.selectedData);
    if(context?.selectedData?.category) {
      setValue('categoryid', context?.selectedData?.category?.id!);
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group row mb-3">
        <label htmlFor="category" className="col-sm-4 col-form-label">
          Category Name :{" "}
        </label>
        <div className="col-sm-4">
          <select id="category" className="form-control" {...register("categoryid", {
              required: true
            })}>
            {context?.categories?.map((option) => (
              <option value={option.id} key={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
          SubCategory Name :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="categoryName"
            placeholder="Category Name"
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
        <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
          SubCategory Description :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="categoryDescription"
            placeholder="Category description"
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

export default SubCategoryForm;
