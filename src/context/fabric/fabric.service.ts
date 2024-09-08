import { createContext } from "react";
import {
  Configuration,
  CreateFabricDto,
  FabricDetailsApiApi,
  FabricDetailsEntity,
} from "../../services/openapi";
import { ColDef } from "ag-grid-community";
import { toast } from "react-toastify";
import { getAxiosConfiguration } from "../../util/axios-configuration.util";

export const CREATE_MODAL_TITLE = "Create Fabric";

export const EDIT_MODAL_TITLE = "Edit Fabric";

export interface FabricContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateFabricDto) => void;
  handleEditClick: (id: string, data: CreateFabricDto) => void;
  selectedData: FabricDetailsEntity | null;
  handleCloseModal: () => void;
  showSpinner: boolean;
}

export const fabricContext = createContext<FabricContext | null>(null);

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  { field: "id", hide: true },
  { field: "fabricName", checkboxSelection: true },
  { field: "fabricDescription" },
  { field: "washCare" },
];

export const defaultColDef = {
  flex: 1,
};

export const showToast = (message: string) =>
  toast(message, { autoClose: 100 });

export const getAllFabrics = async () => {
  try {
    const fabricApi: FabricDetailsApiApi = new FabricDetailsApiApi(getAxiosConfiguration());
    return (await fabricApi.fabricControllerFindAll()).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const createFabric = async (payload: CreateFabricDto) => {
  try {
    const fabricApi: FabricDetailsApiApi = new FabricDetailsApiApi(getAxiosConfiguration());
    return (await fabricApi.fabricControllerCreate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const updateFabric = async (id: string, payload: CreateFabricDto) => {
  try {
    const fabricApi: FabricDetailsApiApi = new FabricDetailsApiApi(getAxiosConfiguration());
    return (await fabricApi.fabricControllerUpdate(id, payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const deleteFabric = async (id: string) => {
  try {
    const fabricApi: FabricDetailsApiApi = new FabricDetailsApiApi(getAxiosConfiguration());
    return (await fabricApi.fabricControllerRemove(id)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};
