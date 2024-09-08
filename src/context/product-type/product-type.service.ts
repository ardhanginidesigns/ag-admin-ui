import { createContext } from "react";
import {
  Configuration,
  CreateProductTypeDto,
  ProductTypeApi,
  ProductTypeEntity,
} from "../../services/openapi";
import { ColDef } from "ag-grid-community";
import { toast } from "react-toastify";
import { getAxiosConfiguration } from "../../util/axios-configuration.util";

const entityName = 'ProductType';
export const CREATE_MODAL_TITLE = `Create ${entityName}`;

export const EDIT_MODAL_TITLE = `Edit ${entityName}`;

export interface ProductTypeContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateProductTypeDto) => void;
  handleEditClick: (id: string, data: CreateProductTypeDto) => void;
  selectedData: ProductTypeEntity | null;
  handleCloseModal: () => void;
  showSpinner: boolean;
}

export const productTypeContext = createContext<ProductTypeContext | null>(null);

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  { field: "id", hide: true },
  { field: "name", checkboxSelection: true },
  { field: "description" },
];

export const defaultColDef = {
  flex: 1,
};

export const showToast = (message: string) =>
  toast(message, { autoClose: 100 });

export const getAllProductTypes = async () => {
  const productTypeApi: ProductTypeApi = new ProductTypeApi(getAxiosConfiguration());
  try {
    return (await productTypeApi.productTypeControllerFindAll()).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const createProductType = async (payload: CreateProductTypeDto) => {
  const productTypeApi: ProductTypeApi = new ProductTypeApi(getAxiosConfiguration());
  try {
    return (await productTypeApi.productTypeControllerCreate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const updateProductType = async (id: string, payload: CreateProductTypeDto) => {
  const productTypeApi: ProductTypeApi = new ProductTypeApi(getAxiosConfiguration());
  try {
    return (await productTypeApi.productTypeControllerUpdate(id, payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const deleteProductType = async (id: string) => {
  const productTypeApi: ProductTypeApi = new ProductTypeApi(getAxiosConfiguration());
  try {
    return (await productTypeApi.productTypeControllerRemove(id)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};
