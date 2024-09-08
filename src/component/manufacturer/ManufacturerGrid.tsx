import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateManufacturerDto, ManufacturerEntity } from "../../services/openapi/api";
import { ToastContainer } from "react-toastify";
import { createManufacturer, deleteManufacturer, getAllManufacturers, ManufacturerContext, showToast, updateManufacturer, manufacturerContext, colDefs, defaultColDef } from '../../context/manufacturer/manufacturer.service';
import ManufacturerModal from "./ManufacturerModal";

function ManufacturerGrid() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<ManufacturerEntity[]>([]);
  const [title, setTitle] = useState("Add Category");
  const [selectedRow, setSelectedRow] =
    useState<ManufacturerEntity | null>(null);

  const gridRef = useRef<AgGridReact>(null);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    console.log(selectedRows);
    selectedRows.length > 0
      ? setSelectedRow(selectedRows[0])
      : setSelectedRow(null);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    getAll();
  }, []);

  const handleNewClick = useCallback(() => {
    setShowModal(true);
    setTitle("Add Manufacturer");
  }, []);

  const handleEditClick = useCallback(() => {
    setShowModal(true);
    setTitle("Edit Manufacturer");
  }, []);

  const getAll = async () => {
    try {
      setRowData((await getAllManufacturers())!);
    } catch (ex) {
      console.error(ex);
    }
  };

  const create = async (payLoad: CreateManufacturerDto) => {
    try {
      await createManufacturer(payLoad);
      showToast("Created!");
    } catch (ex) {
      console.error(ex);
    }
  };

  const update = async (id: string, payLoad: CreateManufacturerDto) => {
    try {
      await updateManufacturer(id, payLoad);
      showToast("Updated!");
    } catch (ex) {
      console.error(ex);
    }
  };

  const deleteEntity = async() => {
    try {
      await deleteManufacturer(selectedRow?.id!);
      showToast("Deleted!");
    } catch(ex) {
      console.error(ex);
    }
  };
  
  useEffect(() => {
    getAll();
  }, []);

  const manufacturerContextData: ManufacturerContext = {
    showModal: showModal,
    handleCloseModal: handleCloseModal,
    handleNewClick: create,
    handleEditClick: update,
    title: title,
    selectedData: selectedRow,
  };

  return (
    <>
      <manufacturerContext.Provider value={manufacturerContextData}>
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
              disabled={selectedRow ? false : true}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              style={{ marginTop: "10px" }}
              disabled={selectedRow ? false : true}
            >
              Delete
            </Button>
          </div>
        </div>
        <ManufacturerModal></ManufacturerModal>
      </manufacturerContext.Provider>
    </>
  );
}
export default ManufacturerGrid;
