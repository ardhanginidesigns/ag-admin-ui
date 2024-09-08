import { createContext } from "react";
import {
  CategoryEntity,
  Configuration,
  CreateProductDto,
  ProductApi,
  ProductTypeEntity,
  SareeEntity,
  SubcategoryEntity,
} from "../../services/openapi";
import { ColDef } from "ag-grid-community";
import { toast } from "react-toastify";
import { ProductSchema } from "./product-schema";
import ProductImage from "../../component/common/ProductImage";
import { ProductImageApiApi } from "../../services/openapi/api";
import { getAxiosConfiguration } from "../../util/axios-configuration.util";

const entityName = "Product details";
export const CREATE_MODAL_TITLE = `Create ${entityName}`;

export const EDIT_MODAL_TITLE = `Edit ${entityName}`;

export interface ProductDetailsContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateProductDto) => void;
  handleEditClick: (id: string, data: CreateProductDto) => void;
  selectedData: ProductSchema | null;
  handleCloseModal: () => void;
  showSpinner: boolean;
  handleProductTypeSelection: (typeId: string) => void;
  handleFilter: (
    categoryId: string | null,
    subCategoryId: string | null
  ) => void;
  selectedProductType: string | null;
  categories: CategoryEntity[] | [];
  productTypes: ProductTypeEntity[] | [];
  showFileUploadModal: boolean;
  handleImageUpload: (
    productId: string,
    productTypeId: string,
    image: File,
    description: string
  ) => void;
}

export const productDetailsContext =
  createContext<ProductDetailsContext | null>(null);

export const transformToProductSchema = (data: SareeEntity) => {
  const snapshot: ProductSchema = new ProductSchema();
  snapshot.actualprice = data.actualprice;
  snapshot.availableQuantity = data.available_qty;
  snapshot.averageReview = data.averageReview;
  snapshot.blouse_desc = data.sareeDetails.blouse_desc;
  snapshot.blouse_piece = data.sareeDetails.blousePieceIncluded;
  snapshot.category = data.category.name;
  snapshot.fabricname = data.sareeDetails.fabricDetails.fabricName;
  snapshot.fabricDescription =
    data?.sareeDetails?.fabricDetails?.fabricDescription;
  snapshot.washcare = data?.sareeDetails?.fabricDetails?.washCare;
  snapshot.isBestSeller = data?.isBestSeller;
  snapshot.isNew = data?.isNew;
  snapshot.isTrending = data?.isTrending;
  snapshot.length = data?.sareeDetails?.length;
  snapshot.maxQuantityPerCart = data.maxQuantityPerCart;
  snapshot.offerprice = data.offerprice;
  snapshot.productdescription = data.productDescription;
  snapshot.productid = data?.id!;
  snapshot.productname = data.productName;
  snapshot.producttype = data.productType.name;
  snapshot.return_exchange_policy = data.returnExchangePolicy;
  snapshot.sareeImage = data.productImages![0]?.imageSource;
  snapshot.skuid = data.skuid;
  snapshot.subcategory = data.subCategory.name;
  snapshot.width = data.sareeDetails.width;
  snapshot.cgst = data.cgst;
  snapshot.sgst = data.sgst;

  snapshot.isExclusive = data?.isExclusive;
  snapshot.collectionId = data?.collection?.id;
  snapshot.styleId = data?.style?.id;
  snapshot.printId = data?.print?.id;
  snapshot.promoId = data?.promoDetails?.id;
  snapshot.colorId = data?.colour?.id;
  snapshot.occassionId = data?.occassion?.id;

  snapshot.maxAllowedCancellationDays = data?.maxAllowedCancellationDays;
  snapshot.maxAllowedReturnDays = data?.maxAllowedReturnDays;
  snapshot.isShippable = data?.isShippable;

  return snapshot;
};

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef<ProductSchema>[] = [
  { field: "productid", hide: true },
  { field: "skuid", checkboxSelection: true },
  {
    field: "sareeImage",
    cellRenderer: ProductImage,
  },
  {
    field: "productname",
  },
  {
    field: "producttype",
  },
  {
    field: "category",
  },
  {
    field: "subcategory",
  },
];

export const defaultColDef = {
  flex: 1,
};

export const showToast = (message: string) =>
  toast(message, { autoClose: 100 });

export const getAllProductsWithoutPagination = async (
  productTypeId: string
) => {
  try {
    const productDetailsApi: ProductApi = new ProductApi(
      getAxiosConfiguration()
    );
    if (!productTypeId) return;
    return (
      await productDetailsApi.productControllerFindAll(
        false,
        1,
        1,
        productTypeId
      )
    ).data;
  } catch (e) {
    console.error(e);
    showToast("Could not reach out to backend.");
  }
};

//product image update api



export const addProductImage = async (
  description: string,
  productId: string,
  productTypeId: string,
  file: File
) => {
  const productImageApi: ProductImageApiApi = new ProductImageApiApi(getAxiosConfiguration());
  try {
    await productImageApi.productImageControllerUploadProductImage(
      description,
      productId,
      productTypeId,
      file
    );
  } catch (ex) {
    console.error(ex);
  }
};

export const getAllProductsWithPagination = async (
  productTypeId: string,
  nextPage: number,
  offset: number
) => {
  const productDetailsApi: ProductApi = new ProductApi(
    getAxiosConfiguration()
  );
  if (!productTypeId) return;
  try {
    return (
      await productDetailsApi.productControllerFindAll(
        true,
        nextPage,
        offset,
        productTypeId
      )
    ).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const createProductDetails = async (payload: CreateProductDto) => {
  const productDetailsApi: ProductApi = new ProductApi(
    getAxiosConfiguration()
  );
  try {
    return (await productDetailsApi.productControllerCreate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const updateProductDetails = async (
  id: string,
  payload: CreateProductDto
) => {
  const productDetailsApi: ProductApi = new ProductApi(
    getAxiosConfiguration()
  );
  try {
    payload.productId = id;
    return (await productDetailsApi.productControllerCreate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const deleteProductDetails = async (
  productTypeId: string,
  id: string
) => {
  const productDetailsApi: ProductApi = new ProductApi(
    getAxiosConfiguration()
  );
  try {
    return (await productDetailsApi.productControllerRemove(productTypeId, id))
      .data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};
