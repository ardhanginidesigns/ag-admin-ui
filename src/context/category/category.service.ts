import { createContext } from "react";
import { CategoryApi, CategoryEntity, Configuration, CreateCategoryDto } from "../../services/openapi";
import { ColDef } from "ag-grid-community";
import { getAxiosConfiguration } from "../../util/axios-configuration.util";

export interface CategoryContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateCategoryDto) => void;
  handleEditClick: (id: string, data: CreateCategoryDto) => void;
  selectedData: CategoryEntity | null;
  handleCloseModal: () => void;
}

export const context = createContext<CategoryContext | null>(null);

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  { field: "id", hide: true },
  { field: "name", checkboxSelection: true },
  { field: "description" },
  { field: "isActive" },
];

export const defaultColDef = {
  flex: 1,
};


export const getAllCategories = async () => {
  try {
    const categoryApi: CategoryApi = new CategoryApi(getAxiosConfiguration());
    return (await categoryApi.categoryControllerFindAll()).data;
  } catch (ex) {
    console.error(`could not fetch categories ${ex}`);
  }
 
}

