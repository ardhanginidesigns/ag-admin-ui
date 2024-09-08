import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import {
  CategoryEntity,
  CreateProductDto,
  ProductTypeEntity,
  SareeEntity,
} from "../../services/openapi/api";
import Spinner from "../common/spinner";
import { ProductSchema } from "../../context/product-details/product-schema";
import ProductFilter from "./ProductFilter";
import {
  addProductImage,
  colDefs,
  CREATE_MODAL_TITLE,
  defaultColDef,
  EDIT_MODAL_TITLE,
  productDetailsContext,
  showToast,
} from "../../context/product-details/product-details.service";
import {
  createProductDetails,
  deleteProductDetails,
  getAllProductsWithoutPagination,
  ProductDetailsContext,
  transformToProductSchema,
  updateProductDetails,
} from "../../context/product-details/product-details.service";
import ProductDetailsModal from "./ProductDetailsModal";
import { getAllCategories } from "../../context/category/category.service";
import { getAllProductTypes } from "../../context/product-type/product-type.service";
import { config, RootContext, rootContext } from "../../context/root.context";
import ProductFileUploadModal from "./ProductFileUploadModal";

type ProductFilter = {
  category: string | null;
  subCategory: string | null;
};

function ProductDetailsGrid() {
  // Row Data: The data to be displayed.
  const rootcontext: RootContext | null = useContext(rootContext);
  useEffect(() => {
    console.trace(rootcontext?.appName);
  }, [rootcontext]);

  const [rowData, setRowData] = useState<ProductSchema[]>([]);
  const [categories, setCategories] = useState<
    CategoryEntity[] | undefined | void
  >([]);
  const [productTypes, setProductTypes] = useState<
    ProductTypeEntity[] | undefined | void
  >([]);
  const [title, setTitle] = useState(CREATE_MODAL_TITLE);
  const [selectedRow, setSelectedRow] = useState<ProductSchema | null>(null);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [filter, setFilter] = useState<ProductFilter>({
    category: null,
    subCategory: null,
  });

  const [selectedProductType, setSelectedProductType] = useState<string | null>(
    null
  );
  const [allProducts, setAllProducts] = useState<SareeEntity[]>([]);

  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  const getCategories = async () => {
    setCategories(await getAllCategories());
  };

  const getTypes = async () => {
    getAllProductTypes().then((values) => {
      setProductTypes(values);
      if (values && values.length > 0 && !selectedProductType) {
        getAll(values[0]?.id!);
      }
    });
  };

  //const [selectedSkuId, setSelectedSkuId] = useState<String|null

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
    setShowFileUploadModal(false);
    getAll(selectedProductType!);
  }, []);

  const handleNewClick = useCallback(() => {
    setShowModal(true);
    setTitle(CREATE_MODAL_TITLE);
  }, []);

  const handleEditClick = useCallback(() => {
    setShowModal(true);
    setTitle(EDIT_MODAL_TITLE);
  }, []);

  const handleUpload = async (
    productId: string,
    productTypeId: string,
    image: File,
    description: string
  ) => {
    console.trace(
      `handleImageUpload : ${productId}, ${productTypeId}, ${image}, ${description}`
    );
    await addProductImage(description, productId, productTypeId, image);
  };

  const handleProductImageUpload = useCallback(() => {
    console.trace("Image upload called");
    setShowFileUploadModal(true);
    setTitle(EDIT_MODAL_TITLE);
  }, []);

  const getAll = async (productType: string) => {
    setShowSpinner(true);
    let type: string = selectedProductType ? selectedProductType : productType;
    if (!type) {
      type = productTypes![0]?.id!;
    }
    try {
      console.trace("calling get all products.");
      getAllProductsWithoutPagination(type).then((value) => {
        if (value) {
          console.trace("response from product api");
          console.trace(value);
          setAllProducts(value);
          setRowData(value.map((entity) => transformToProductSchema(entity)));
        }
      });
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const create = async (payLoad: CreateProductDto) => {
    setShowSpinner(true);
    try {
      console.trace(payLoad);
      await createProductDetails(payLoad);
      showToast("Created!");
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  const update = async (id: string, payLoad: CreateProductDto) => {
    setShowSpinner(true);
    try {
      await updateProductDetails(id, payLoad);
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
      await deleteProductDetails(selectedProductType!, selectedRow?.productid!);
      showToast("Deleted!");
    } catch (ex) {
      console.error(ex);
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    getTypes();
    getCategories();
  }, [config]);

  useEffect(() => {
    getAll(selectedProductType!);
  }, [selectedProductType]);

  const productDetailsContextData: ProductDetailsContext = {
    showModal: showModal,
    handleCloseModal: handleCloseModal,
    handleNewClick: create,
    handleEditClick: update,
    title: title,
    selectedData: selectedRow!,
    showSpinner: showSpinner,
    handleProductTypeSelection: function (typeId: string): void {
      setSelectedProductType(typeId);
    },
    handleFilter: function (
      categoryId: string | null,
      subCategoryId: string | null
    ): void {
      setFilter({ category: categoryId, subCategory: subCategoryId });
    },
    selectedProductType: selectedProductType
      ? selectedProductType
      : productTypes
      ? productTypes![0]?.id!
      : "",
    categories: categories!,
    productTypes: productTypes!,
    showFileUploadModal: showFileUploadModal,
    handleImageUpload: handleUpload,
  };

  return (
    <>
      <productDetailsContext.Provider value={productDetailsContextData}>
        <ProductFilter></ProductFilter>
        <div className="row">
          <div
            className="col-12 ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 800 }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact
              rowHeight={120}
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
              variant="primary"
              style={{ marginRight: "10px", marginTop: "10px" }}
              onClick={handleProductImageUpload}
              disabled={selectedRow ? false : true}
            >
              Edit Product Image
            </Button>
            <Button
              variant="primary"
              style={{ marginRight: "10px", marginTop: "10px" }}
              onClick={handleEditClick}
              disabled={selectedRow ? false : true}
            >
              See Orders for selected product
            </Button>
            <Button
              variant="secondary"
              style={{ marginRight: "10px", marginTop: "10px" }}
              onClick={handleEditClick}
              disabled={selectedRow ? false : true}
            >
              Recharge Inventory
            </Button>
            <Button
              variant="danger"
              style={{ marginRight: "10px", marginTop: "10px" }}
              onClick={handleEditClick}
              disabled={selectedRow ? false : true}
            >
              Throw From Inventory
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
        <ProductDetailsModal></ProductDetailsModal>
        <ProductFileUploadModal></ProductFileUploadModal>
        <Spinner visible={showSpinner}></Spinner>
      </productDetailsContext.Provider>
    </>
  );
}
export default ProductDetailsGrid;
