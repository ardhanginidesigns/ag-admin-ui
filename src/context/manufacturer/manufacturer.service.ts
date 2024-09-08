import { createContext } from "react";
import {
  Configuration,
  CreateManufacturerDto,
  ManufacturerApiApi,
  ManufacturerEntity,
} from "../../services/openapi";
import { ColDef } from "ag-grid-community";
import { toast } from "react-toastify";
import { getAxiosConfiguration } from "../../util/axios-configuration.util";

export interface ManufacturerContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateManufacturerDto) => void;
  handleEditClick: (id: string, data: CreateManufacturerDto) => void;
  selectedData: ManufacturerEntity | null;
  handleCloseModal: () => void;
}

export const manufacturerContext = createContext<ManufacturerContext | null>(
  null
);

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  { field: "id", hide: true },
  { field: "name", checkboxSelection: true },
  { field: "origin" },
  { field: "address" },
];

export const defaultColDef = {
  flex: 1,
};


export const showToast = (message: string) =>
  toast(message, { autoClose: 100 });

export const getAllManufacturers = async () => {
  try {
    const manufacturerApi: ManufacturerApiApi = new ManufacturerApiApi(getAxiosConfiguration());
    return (await manufacturerApi.manufacturerControllerFindAll()).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const createManufacturer = async (payload: CreateManufacturerDto) => {
  try {
    const manufacturerApi: ManufacturerApiApi = new ManufacturerApiApi(getAxiosConfiguration());
    return (await manufacturerApi.manufacturerControllerCreate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const updateManufacturer = async (
  id: string,
  payload: CreateManufacturerDto
) => {
  try {
    const manufacturerApi: ManufacturerApiApi = new ManufacturerApiApi(getAxiosConfiguration());
    return (await manufacturerApi.manufacturerControllerUpdate(id, payload))
      .data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const deleteManufacturer = async (
    id: string
  ) => {
    try {
      const manufacturerApi: ManufacturerApiApi = new ManufacturerApiApi(getAxiosConfiguration());
      return (await manufacturerApi.manufacturerControllerRemove(id))
        .data;
    } catch (e) {
      showToast("Could not reach out to backend.");
    }
  };
