import React, { useCallback, useContext, } from "react";
import {
  subCategoryContext,
  SubCategoryContext,
} from "../../context/sub-category/sub-category.service";
type FormSchema = {
  categoryId: string;
};
function CategoryFilter() {
  const context: SubCategoryContext | null = useContext(subCategoryContext);
  const onSelection = useCallback((event: any) => {
    context?.handleSearch(event?.target?.value);
  },[]);
  return (
    <form>
      <div className="form-group row text-dark my-3">
        <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
          Select category To filter:{" "}
        </label>
        <div className="col-sm-4">
          <select id="inputEmail3" className="form-control" onChange={onSelection}>
            {context?.categories?.map((option) => (
              <option value={option.id} key={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}

export default CategoryFilter;
