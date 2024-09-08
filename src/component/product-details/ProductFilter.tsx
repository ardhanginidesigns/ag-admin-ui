import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  productDetailsContext,
  ProductDetailsContext,
} from "../../context/product-details/product-details.service";
import {
  CategoryEntity,
  ProductTypeEntity,
  SubcategoryEntity,
} from "../../services/openapi";
import { getSubCategoriesByCategory } from "../../context/sub-category/sub-category.service";

function ProductFilter() {
  const context: ProductDetailsContext | null = useContext(
    productDetailsContext
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubcategories] = useState<
    SubcategoryEntity[] | undefined | void
  >([]);
  
  const getSubcategories =  () => {
    getSubCategoriesByCategory(selectedCategory!).then(values => {
      setSubcategories(values);
      console.trace(subCategories);
    });
  };

  useEffect(() => {
    if(selectedCategory) {
      console.trace(selectedCategory);
      getSubcategories();
    } 
  }, [selectedCategory]);

  const onProductTypeSelection = useCallback(
    (event: any) => context?.handleProductTypeSelection(event.target?.value),
    []
  );

  const onProductCategorySelection = useCallback(
    (event: any) => setSelectedCategory(event.target?.value),
    []
  );

  const onProductSubCategorySelection = useCallback(
    (event: any) => setSelectedSubCategory(event.target?.value),
    []
  );

  return (
    <div className="container text-dark">
      <div className="row mb-3">
        <div className="col-6">
          <div className="row align-items-center">
            <div className="col-6">Product Type: </div>
            <div className="col-6">
              <select
                id="productTypeId"
                className="form-control"
                onChange={onProductTypeSelection}
              >
                {context?.productTypes?.map((productType) => (
                  <option value={productType?.id} key={productType?.id}>
                    {productType?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3 align-items-center">
        <div className="col-6">
          <div className="row mb-3 align-items-center">
            <div className="col-6">Product Category: </div>
            <div className="col-6">
              <select
                id="productCategory"
                className="form-control"
                onChange={onProductCategorySelection}
              >
                {context?.categories?.map((category) => (
                  <option value={category?.id} key={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-6">Product Subcategory: </div>
            <div className="col-4">
              <select
                id="productSubCategory"
                className="form-control"
                onChange={onProductSubCategorySelection}
              >
                {subCategories?.map((category) => (
                  <option value={category?.id} key={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-2">
                <button className="btn btn-primary" onClick={() => context?.handleFilter(selectedCategory, selectedSubCategory)}>Filter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
