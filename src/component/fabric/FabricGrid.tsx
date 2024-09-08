import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import {
  CreateFabricDto,
  FabricDetailsEntity,
} from "../../services/openapi/api";
import { ToastContainer } from "react-toastify";
import {
  CREATE_MODAL_TITLE,
  createFabric,
  EDIT_MODAL_TITLE,
  FabricContext,
  getAllFabrics,
  updateFabric,
  fabricContext,
  showToast,
  deleteFabric,
  colDefs,
  defaultColDef,
} from "../../context/fabric/fabric.service";
import FabricModal from "./FabricModal";
import Spinner from "../common/spinner";

function FabricGrid() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<FabricDetailsEntity[]>([]);
  const [title, setTitle] = useState(CREATE_MODAL_TITLE);
  const [selectedRow, setSelectedRow] = useState<FabricDetailsEntity | null>(
    null
  );
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

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
    setTitle(CREATE_MODAL_TITLE);
  }, []);

  const handleEditClick = useCallback(() => {
    setShowModal(true);
    setTitle(EDIT_MODAL_TITLE);
  }, []);

  const getAll = async () => {
    setShowSpinner(true);
    try {
      setRowData((await getAllFabrics())!);
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const create = async (payLoad: CreateFabricDto) => {
    setShowSpinner(true);
    try {
      await createFabric(payLoad);
      showToast("Created!");
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const update = async (id: string, payLoad: CreateFabricDto) => {
    setShowSpinner(true);
    try {
      await updateFabric(id, payLoad);
      showToast("Updated!");
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const deleteEntity = async () => {
    setShowSpinner(true);
    try {
      await deleteFabric(selectedRow?.id!);
      showToast("Deleted!");
    } catch (ex) {
      console.error(ex);
    }finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const fabricContextData: FabricContext = {
    showModal: showModal,
    handleCloseModal: handleCloseModal,
    handleNewClick: create,
    handleEditClick: update,
    title: title,
    selectedData: selectedRow,
    showSpinner: showSpinner,
  };

  return (
    <>
      <fabricContext.Provider value={fabricContextData}>
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
        <FabricModal></FabricModal>
        <Spinner visible={showSpinner}></Spinner>
      </fabricContext.Provider>
    </>
  );
}
export default FabricGrid;
