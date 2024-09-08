import { useCallback, useContext } from "react";
import { CreateCategoryDto } from "../../services/openapi/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { CategoryContext, context } from "../../context/category/category.service";

function CategoryForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateCategoryDto>();
  const categoryContext: CategoryContext | null = useContext(context);
  const onSubmit: SubmitHandler<CreateCategoryDto> = (data) => {
    if (categoryContext?.selectedData) {
      categoryContext?.handleEditClick(categoryContext.selectedData?.id!, data);
    } else {
      categoryContext?.handleNewClick(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
          Category Name :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="categoryName"
            placeholder="Category Name"
            {...register("name", {
              required: true,
              value: categoryContext?.selectedData
                ? categoryContext?.selectedData.name
                : "",
            })}
          />
          {errors.name && <span>This field is required</span>}
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
          Category Description :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="categoryDescription"
            placeholder="Category description"
            {...register("description", {
              required: true,
              value: categoryContext?.selectedData
                ? categoryContext?.selectedData.description
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

export default CategoryForm;
