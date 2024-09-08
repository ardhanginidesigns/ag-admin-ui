import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateProductOccassionDto, ProductOccassionEntity } from "../../services/openapi/api";
import Spinner from "../common/spinner";
import { defaultColDef, showToast } from "../../context/root.context";
import ProductOccassionModal from "./OccassionModal";
import { colDefs, CREATE_MODAL_TITLE, createOccassion, deleteOccassion, EDIT_MODAL_TITLE, getAllOccassions, productOccassionContext, ProductOccassionContext, updateOccassion } from "../../context/occassion/occassion.service";

function ProductOccassionGrid() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<ProductOccassionEntity[]>([]);
  const [title, setTitle] = useState(CREATE_MODAL_TITLE);
  const [selectedRow, setSelectedRow] = useState<ProductOccassionEntity | null>(
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
      setRowData((await getAllOccassions())!);
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const create = async (payLoad: CreateProductOccassionDto) => {
    setShowSpinner(true);
    try {
      await createOccassion(payLoad);
      showToast("Created!");
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const update = async (id: string, payLoad: CreateProductOccassionDto) => {
    setShowSpinner(true);
    try {
      await updateOccassion(id, payLoad);
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
      await deleteOccassion(selectedRow?.id!);
      showToast("Deleted!");
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const contextData: ProductOccassionContext = {
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
      <productOccassionContext.Provider value={contextData}>
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
        <ProductOccassionModal></ProductOccassionModal>
        <Spinner visible={showSpinner}></Spinner>
      </productOccassionContext.Provider>
    </>
  );
}
export default ProductOccassionGrid;
