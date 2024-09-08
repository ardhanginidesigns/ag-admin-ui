import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import {
  CategoryApi,
  CreateSubcategoryDto,
  SubcategoryApi,
  SubcategoryEntity,
} from "../../services/openapi/api";
import { CategoryEntity } from "../../services/openapi/api";
import { toast, ToastContainer } from "react-toastify";
import {
  colDefs,
  defaultColDef,
  subCategoryContext,
  SubCategoryContext,
} from "../../context/sub-category/sub-category.service";
import CategoryFilter from "./CategoryFilter";
import SubCategoryModal from "./subcategoryModal";
import { getAxiosConfiguration } from "../../util/axios-configuration.util";

function SubCategoryGrid() {
  
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<SubcategoryEntity[]>([]);
  const [title, setTitle] = useState("Add SubCategory");
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubcategoryEntity | null>(null);
  const [selectedCategory, setSelecetedCategory] = useState<string | null>(
    null
  );
  console.log(`navigated to ${title}`);
  const [categories, setCategories] = useState<CategoryEntity[] | null>(null);

  const gridRef = useRef<AgGridReact>(null);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    console.log(selectedRows);
    selectedRows.length > 0
      ? setSelectedSubCategory(selectedRows[0])
      : setSelectedSubCategory(null);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    getAllSubCategories();
  }, []);

  const handleNewClick = useCallback(() => {
    setShowModal(true);
    setTitle("Add Sub-Category");
  }, []);

  const handleEditClick = useCallback(() => {
    setShowModal(true);
    setTitle("Edit Sub-Category");
  }, []);

  const getAllSubCategories = async () => {
    try {
      const subCategoryApi: SubcategoryApi = new SubcategoryApi(getAxiosConfiguration());
      setRowData((await subCategoryApi.subcategoryControllerFindAll()).data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const getAllSubCategoriesByCategory = async () => {
    try {
      const subCategoryApi: SubcategoryApi = new SubcategoryApi(getAxiosConfiguration());
      setRowData(
        (
          await subCategoryApi.subcategoryControllerFindAllByCategory(
            selectedCategory!
          )
        ).data
      );
    } catch (ex) {
      console.error(ex);
    }
  };

  const getAllCategories = async () => {
    console.log("calling get all acategories.");
    try {
      const categoryApi: CategoryApi = new CategoryApi(getAxiosConfiguration());
      setCategories((await categoryApi.categoryControllerFindAll()).data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const getSubCategories = async () => {
    console.log("selected category " + selectedCategory);
    if (selectedCategory) {
      getAllSubCategoriesByCategory();
    } else {
      getAllSubCategories();
    }
  };

  const createSubCategory = async (payLoad: CreateSubcategoryDto) => {
    try {
      const subCategoryApi: SubcategoryApi = new SubcategoryApi(getAxiosConfiguration());
      await subCategoryApi.subcategoryControllerCreate(payLoad);
    } catch (ex) {
      console.error(ex);
    }
  };

  const updateSubCategory = async (
    id: string,
    payLoad: CreateSubcategoryDto
  ) => {
    console.log("calling update subcategory");
    try {
      const subCategoryApi: SubcategoryApi = new SubcategoryApi(getAxiosConfiguration());
      await subCategoryApi.subcategoryControllerUpdate(id, payLoad);
      showToast("Updated!");
    } catch (ex) {
      console.error(ex);
      showToast("Error occured!");
    }
  };

  const handleCategorySelection = (data: string) => {
    setSelecetedCategory(data);
    console.log("selected category: " + data);
  };

  const showToast = (message: string) => toast(message);

  useEffect(() => {
    getAllCategories();
    getSubCategories();
  }, [selectedCategory]);

  const subCategoryContextData: SubCategoryContext = {
    showModal: showModal,
    handleCloseModal: handleCloseModal,
    handleNewClick: createSubCategory,
    handleEditClick: updateSubCategory,
    title: title,
    selectedData: selectedSubCategory,
    selectedCategory: selectedCategory,
    categories: categories!,
    handleSearch: handleCategorySelection,
  };

  return (
    <>
      <subCategoryContext.Provider value={subCategoryContextData}>
        <div className="row">
          <CategoryFilter></CategoryFilter>
        </div>

        <div className="row">
          <div
            className="col-12 ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              rowSelection="single"
              onSelectionChanged={onSelectionChanged}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <Button
              variant="primary"
              style={{ marginRight: "10px", marginTop: "10px" }}
              onClick={handleNewClick}
            >
              New
            </Button>
            <Button
              variant="secondary"
              style={{ marginRight: "10px", marginTop: "10px" }}
              onClick={handleEditClick}
              disabled={selectedSubCategory ? false : true}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              style={{ marginTop: "10px" }}
              disabled={selectedSubCategory ? false : true}
            >
              Delete
            </Button>
          </div>
        </div>
        <SubCategoryModal></SubCategoryModal>
      </subCategoryContext.Provider>
    </>
  );
}
export default SubCategoryGrid;
