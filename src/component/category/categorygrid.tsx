import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import CategoryModal from "./categoryModal";
import { CategoryApi, CreateCategoryDto } from "../../services/openapi/api";
import { CategoryEntity } from "../../services/openapi/api";
import { toast } from "react-toastify";
import {
  CategoryContext,
  colDefs,
  context,
  defaultColDef,
} from "../../context/category/category.service";
import { getAxiosConfiguration } from "../../util/axios-configuration.util";

function CategoryGrid() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<CategoryEntity[]>([]);
  const [title, setTitle] = useState("Add Category");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryEntity | null>(null);

  const gridRef = useRef<AgGridReact>(null);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    console.log(selectedRows);
    selectedRows.length > 0
      ? setSelectedCategory(selectedRows[0])
      : setSelectedCategory(null);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    getAllCategories();
  }, []);

  const handleNewClick = useCallback(() => {
    setShowModal(true);
    setTitle("Add Category");
  }, []);

  const handleEditClick = useCallback(() => {
    setShowModal(true);
    setTitle("Edit Category");
  }, []);

  const getAllCategories = async () => {
    try {
      const categoryApi: CategoryApi = new CategoryApi(getAxiosConfiguration());
      setRowData((await categoryApi.categoryControllerFindAll()).data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const createCategory = async (payLoad: CreateCategoryDto) => {
    console.log("calling create category");
    try {
      const categoryApi: CategoryApi = new CategoryApi(getAxiosConfiguration());
      await categoryApi.categoryControllerCreate(payLoad);
      showToast("Created!");
    } catch (ex) {
      console.error(ex);
      showToast("Error occured!");
    }
  };

  const updateCategory = async (id: string, payLoad: CreateCategoryDto) => {
    try {
      const categoryApi: CategoryApi = new CategoryApi(getAxiosConfiguration());
      await categoryApi.categoryControllerUpdate(id, payLoad);
      showToast("Updated!");
    } catch (ex) {
      console.error(ex);
      showToast("Error occured!");
    }
  };

  const showToast = (message: string) => toast(message, {autoClose: 100});
  useEffect(() => {
    getAllCategories();
  }, []);

  const categoryContext: CategoryContext = {
    showModal: showModal,
    handleCloseModal: handleCloseModal,
    handleNewClick: createCategory,
    handleEditClick: updateCategory,
    title: title,
    selectedData: selectedCategory,
  };

  return (
    <>
      <context.Provider value={categoryContext}>
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
              disabled={selectedCategory ? false : true}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              style={{ marginTop: "10px" }}
              disabled={selectedCategory ? false : true}
            >
              Delete
            </Button>
          </div>
        </div>
        <CategoryModal></CategoryModal>
      </context.Provider>
    </>
  );
}
export default CategoryGrid;
