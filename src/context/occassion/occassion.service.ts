import { createContext } from "react";
import { ColDef } from "ag-grid-community";
import { config, showToast } from "../root.context";
import {
  CreateProductOccassionDto,
  ProductOccassionApi,
  ProductOccassionEntity,
} from "../../services/openapi";
import { getAxiosConfiguration } from "../../util/axios-configuration.util";

export const CREATE_MODAL_TITLE = "Create Occassion";

export const EDIT_MODAL_TITLE = "Edit Occassion";

export interface ProductOccassionContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateProductOccassionDto) => void;
  handleEditClick: (id: string, data: CreateProductOccassionDto) => void;
  selectedData: ProductOccassionEntity | null;
  handleCloseModal: () => void;
  showSpinner: boolean;
}

export const productOccassionContext =
  createContext<ProductOccassionContext | null>(null);

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  { field: "id", hide: true },
  { field: "name", checkboxSelection: true },
  { field: "description" },
];



export const getAllOccassions = async () => {
  try {
    const api: ProductOccassionApi = new ProductOccassionApi(getAxiosConfiguration());
    return (await api.productOccassionControllerGetAll()).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const createOccassion = async (payload: CreateProductOccassionDto) => {
  try {
    const api: ProductOccassionApi = new ProductOccassionApi(getAxiosConfiguration());
    return (await api.productOccassionControllerCreate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const updateOccassion = async (
  id: string,
  payload: CreateProductOccassionDto
) => {
  try {
    const api: ProductOccassionApi = new ProductOccassionApi(getAxiosConfiguration());
    payload.id = id;
    return (await api.productOccassionControllerUpdate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const deleteOccassion = async (id: string) => {
  try {
    const api: ProductOccassionApi = new ProductOccassionApi(getAxiosConfiguration());
    return (await api.productOccassionControllerRemove(id)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};
