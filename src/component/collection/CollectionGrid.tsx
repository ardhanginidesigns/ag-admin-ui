import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateProductCollectionDto, ProductCollectionEntity } from "../../services/openapi/api";
import Spinner from "../common/spinner";
import { defaultColDef, showToast } from "../../context/root.context";
import ProductCollectionModal from "./CollectionModal";
import { colDefs, CREATE_MODAL_TITLE, createCollection, deleteCollection, EDIT_MODAL_TITLE, getAllCollections, productCollectionContext, ProductCollectionContext, updateCollection } from "../../context/collection/collection.service";

function ProductCollectionGrid() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<ProductCollectionEntity[]>([]);
  const [title, setTitle] = useState(CREATE_MODAL_TITLE);
  const [selectedRow, setSelectedRow] = useState<ProductCollectionEntity | null>(
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
      setRowData((await getAllCollections())!);
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const create = async (payLoad: CreateProductCollectionDto) => {
    setShowSpinner(true);
    try {
      await createCollection(payLoad);
      showToast("Created!");
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const update = async (id: string, payLoad: CreateProductCollectionDto) => {
    setShowSpinner(true);
    try {
      await updateCollection(id, payLoad);
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
      await deleteCollection(selectedRow?.id!);
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

  const contextData: ProductCollectionContext = {
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
      <productCollectionContext.Provider value={contextData}>
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
        <ProductCollectionModal></ProductCollectionModal>
        <Spinner visible={showSpinner}></Spinner>
      </productCollectionContext.Provider>
    </>
  );
}
export default ProductCollectionGrid;
