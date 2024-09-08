import { createContext } from "react";
import { ColDef } from "ag-grid-community";
import { config, showToast } from "../root.context";
import {
  CreateProductStyleDto,
  ProductStyleApi,
  ProductStyleEntity,
} from "../../services/openapi";
import { getAxiosConfiguration } from "../../util/axios-configuration.util";

export const CREATE_MODAL_TITLE = "Create Style";

export const EDIT_MODAL_TITLE = "Edit Style";

export interface ProductStyleContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateProductStyleDto) => void;
  handleEditClick: (id: string, data: CreateProductStyleDto) => void;
  selectedData: ProductStyleEntity | null;
  handleCloseModal: () => void;
  showSpinner: boolean;
}

export const productStyleContext = createContext<ProductStyleContext | null>(
  null
);

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  { field: "id", hide: true },
  { field: "name", checkboxSelection: true },
  { field: "description" },
];

export const getAllStyles = async () => {
  try {
    const api: ProductStyleApi = new ProductStyleApi(getAxiosConfiguration());
    return (await api.productStyleControllerGetAll()).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const createStyle = async (payload: CreateProductStyleDto) => {
  try {
    const api: ProductStyleApi = new ProductStyleApi(getAxiosConfiguration());
    return (await api.productStyleControllerCreate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const updateStyle = async (
  id: string,
  payload: CreateProductStyleDto
) => {
  try {
    const api: ProductStyleApi = new ProductStyleApi(getAxiosConfiguration());
    payload.id = id;
    return (await api.productStyleControllerUpdate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const deleteStyle = async (id: string) => {
  try {
    const api: ProductStyleApi = new ProductStyleApi(getAxiosConfiguration());
    return (await api.productStyleControllerRemove(id)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};
