import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateProductStyleDto, ProductStyleEntity } from "../../services/openapi/api";
import Spinner from "../common/spinner";
import { defaultColDef, showToast } from "../../context/root.context";
import ProductStyleModal from "./StyleModal";
import { colDefs, CREATE_MODAL_TITLE, createStyle, deleteStyle, EDIT_MODAL_TITLE, getAllStyles, productStyleContext, ProductStyleContext, updateStyle } from "../../context/style/style.service";

function ProductStyleGrid() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<ProductStyleEntity[]>([]);
  const [title, setTitle] = useState(CREATE_MODAL_TITLE);
  const [selectedRow, setSelectedRow] = useState<ProductStyleEntity | null>(
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
      setRowData((await getAllStyles())!);
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const create = async (payLoad: CreateProductStyleDto) => {
    setShowSpinner(true);
    try {
      await createStyle(payLoad);
      showToast("Created!");
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const update = async (id: string, payLoad: CreateProductStyleDto) => {
    setShowSpinner(true);
    try {
      await updateStyle(id, payLoad);
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
      await deleteStyle(selectedRow?.id!);
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

  const contextData: ProductStyleContext = {
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
      <productStyleContext.Provider value={contextData}>
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
        <ProductStyleModal></ProductStyleModal>
        <Spinner visible={showSpinner}></Spinner>
      </productStyleContext.Provider>
    </>
  );
}
export default ProductStyleGrid;
