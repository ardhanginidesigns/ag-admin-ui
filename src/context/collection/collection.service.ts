import { createContext } from "react";
import { ColDef } from "ag-grid-community";
import { config, showToast } from "../root.context";
import {
  CreateProductCollectionDto,
  ProductCollectionApi,
  ProductCollectionEntity,
} from "../../services/openapi";
import { getAxiosConfiguration } from "../../util/axios-configuration.util";

export const CREATE_MODAL_TITLE = "Create Collection";

export const EDIT_MODAL_TITLE = "Edit Collection";

export interface ProductCollectionContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateProductCollectionDto) => void;
  handleEditClick: (id: string, data: CreateProductCollectionDto) => void;
  selectedData: ProductCollectionEntity | null;
  handleCloseModal: () => void;
  showSpinner: boolean;
}

export const productCollectionContext =
  createContext<ProductCollectionContext | null>(null);

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  { field: "id", hide: true },
  { field: "name", checkboxSelection: true },
  { field: "description" },
];



export const getAllCollections = async () => {
  try {
    const api: ProductCollectionApi = new ProductCollectionApi(getAxiosConfiguration());
    return (await api.productColelctionControllerGetAll()).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const createCollection = async (payload: CreateProductCollectionDto) => {
  try {
    const api: ProductCollectionApi = new ProductCollectionApi(getAxiosConfiguration());
    return (await api.productColelctionControllerCreate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const updateCollection = async (
  id: string,
  payload: CreateProductCollectionDto
) => {
  try {
    const api: ProductCollectionApi = new ProductCollectionApi(getAxiosConfiguration());
    payload.id = id;
    return (await api.productColelctionControllerUpdate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const deleteCollection = async (id: string) => {
  try {
    const api: ProductCollectionApi = new ProductCollectionApi(getAxiosConfiguration());
    return (await api.productColelctionControllerRemove(id)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};
