import { useCallback, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateProductDto,
  FabricDetailsEntity,
  ManufacturerEntity,
  SubcategoryEntity,
} from "../../services/openapi";
import {
  productDetailsContext,
  ProductDetailsContext,
} from "../../context/product-details/product-details.service";
import {
  getAllSubCategories,
  getSubCategoriesByCategory,
} from "../../context/sub-category/sub-category.service";
import { getAllManufacturers } from "../../context/manufacturer/manufacturer.service";
import { getAllFabrics } from "../../context/fabric/fabric.service";
import { config, rootContext, RootContext } from "../../context/root.context";
import useColors from "../../hooks/useColors";
import usePrints from "../../hooks/usePrints";
import useProductOccassions from "../../hooks/useProductOccassions";
import useCollections from "../../hooks/useCollections";
import useStyles from "../../hooks/useStyles";
import usePromoDetails from "../../hooks/usePromoDetails";

function ProductDetailsForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductDto>();

  const context: ProductDetailsContext | null = useContext(
    productDetailsContext
  );
  const [subCategories, setSubCategories] = useState<SubcategoryEntity[]>([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerEntity[]>([]);
  const [fabrics, setFabrics] = useState<FabricDetailsEntity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  //use hooks for all the filterable attributes
  const { productColors, getAllProductColors } = useColors();
  const { productPrints, getAllProductPrints } = usePrints();
  const { productOccassions, getAllProductOccassions } = useProductOccassions();
  const { collections, getAllCollections } = useCollections();
  const { productStyles, getAllProductStyles } = useStyles();
  const { productPromos, getAllPromoDetails } = usePromoDetails();

  useEffect(() => {
    getAllCollections();
    getAllProductColors();
    getAllProductPrints();
    getAllProductOccassions();
    getAllProductStyles();
    getAllPromoDetails();
    getManufacturers();
    getFabrics();
    console.trace(context?.selectedData);
    if (context?.selectedData) {
      getSubCategoriesByCategory(
        context?.categories?.find((value, index, array) => {
          return value.name === context?.selectedData?.category;
        })?.id!
      ).then((data) => {
        setSubCategories(data!);
      });
    } else if (context?.categories) {
      getSubCategoriesByCategory(context.categories![0]?.id!).then((data) => {
        setSubCategories(data!);
      });
    }
  }, [config]);

  const getManufacturers = async () => {
    setManufacturers((await getAllManufacturers())!);
  };

  const getFabrics = async () => {
    setFabrics((await getAllFabrics())!);
  };

  const onCategorySelectionChange = useCallback(async (event: any) => {
    console.trace(event.target!.value);
    setSelectedCategory(event.target!.value);
    getSubCategoriesByCategory(event.target!.value).then((data) => {
      setSubCategories(data!);
    });
  }, []);

  const rootcontext: RootContext | null = useContext(rootContext);
  useEffect(() => {
    //console.trace(rootcontext?.appName);
  }, [rootcontext]);

  useEffect(() => {
    if (context?.selectedData) {
      setValue(
        "productTypeId",
        context?.productTypes?.find((value, index, array) => {
          return value.name === context?.selectedData?.producttype;
        })?.id!
      );
      setValue(
        "categoryId",
        context?.categories?.find((value, index, array) => {
          return value.name === context?.selectedData?.category;
        })?.id!
      );
      setValue(
        "subCategoryId",
        subCategories?.find((value, index, array) => {
          return value.name === context?.selectedData?.subcategory;
        })?.id!
      );
      setValue(
        "productDetails.fabricDetailsId",
        fabrics?.find((value, index, array) => {
          return value.fabricName === context?.selectedData?.fabricname;
        })?.id!
      );
      //set values for other data
      setValue(
        "collectionId",
        collections?.find((value, index, array) => {
          return value.id === context?.selectedData?.collectionId;
        })?.id!
      );
      setValue(
        "colorId",
        productColors?.find((value, index, array) => {
          return value.id === context?.selectedData?.colorId;
        })?.id!
      );
      setValue(
        "occassionId",
        productOccassions?.find((value, index, array) => {
          return value.id === context?.selectedData?.occassionId;
        })?.id!
      );
      setValue(
        "printId",
        productPrints?.find((value, index, array) => {
          return value.id === context?.selectedData?.printId;
        })?.id!
      );
      setValue(
        "styleId",
        productStyles?.find((value, index, array) => {
          return value.id === context?.selectedData?.styleId;
        })?.id!
      );
      setValue(
        "promoId",
        productPromos?.find((value, index, array) => {
          return value.id === context?.selectedData?.promoId;
        })?.id!
      );
    }
  }, [collections, context?.categories, context?.productTypes, context?.selectedData, fabrics, productColors, productOccassions, productPrints, productPromos, productStyles, setValue, subCategories]);

  useEffect(() => {
    if (selectedCategory) {
      getSubCategoriesByCategory(selectedCategory).then((values) => {
        console.trace(values);
        if (values) {
          setSubCategories(values);
        }
      });
    }
  }, [selectedCategory]);

  const onSubmit: SubmitHandler<CreateProductDto> = (data) => {
    if (context?.selectedData) {
      console.trace(data);
      context?.handleEditClick(context.selectedData?.productid!, data);
    } else {
      context?.handleNewClick(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxHeight: 600, overflowY: "scroll", overflowX: "hidden" }}
    >
      {/* product type */}
      <div className="form-group row mb-3">
        <label htmlFor="productType" className="col-sm-4 col-form-label">
          Product Type:
        </label>
        <div className="col-sm-4">
          <select
            id="productType"
            className="form-control"
            {...register("productTypeId", {
              required: true,
            })}
          >
            {context?.productTypes?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* category  */}
      <div className="form-group row mb-3">
        <label htmlFor="category" className="col-sm-4 col-form-label">
          Category Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="category"
            className="form-control"
            {...register("categoryId", {
              required: true,
            })}
            onChange={onCategorySelectionChange}
          >
            {context?.categories?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* sub-category  */}
      <div className="form-group row mb-3">
        <label htmlFor="sub-category" className="col-sm-4 col-form-label">
          SubCategory Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="sub-category"
            className="form-control"
            {...register("subCategoryId", {
              required: true,
            })}
          >
            {subCategories?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* manufacturers  */}
      <div className="form-group row mb-3">
        <label htmlFor="manufacturer" className="col-sm-4 col-form-label">
          Manufacturer Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="manufacturer"
            className="form-control"
            {...register("manufacturerId", {
              required: true,
            })}
          >
            {manufacturers?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="productname" className="col-sm-4 col-form-label">
          Manufacturer Name :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="productname"
            placeholder="product name"
            {...register("productName", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.productname
                : "",
            })}
          />
          {errors.productName && <span>This field is required</span>}
        </div>
      </div>
      {/*product description */}
      <div className="form-group row mb-3">
        <label
          htmlFor="product-description"
          className="col-sm-4 col-form-label"
        >
          description :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="product-description"
            placeholder="product description"
            {...register("productDescription", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.productdescription
                : "",
            })}
          />
          {errors.productDescription && <span>This field is required</span>}
        </div>
      </div>
      {/*product skuid */}
      <div className="form-group row mb-3">
        <label htmlFor="skuid" className="col-sm-4 col-form-label">
          Skuid :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="skuid"
            placeholder="skuid"
            {...register("skuid", {
              required: true,
              value: context?.selectedData ? context?.selectedData.skuid : "",
            })}
          />
          {errors.skuid && <span>This field is required</span>}
        </div>
      </div>
      {/*product returnExchangePolicy */}
      <div className="form-group row mb-3">
        <label
          htmlFor="returnExchangePolicy"
          className="col-sm-4 col-form-label"
        >
          Return exchange policy :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="returnExchangePolicy"
            placeholder="returnExchangePolicy"
            {...register("returnExchangePolicy", {
              required: true,
              value: context?.selectedData ? context?.selectedData.skuid : "",
            })}
          />
          {errors.returnExchangePolicy && <span>This field is required</span>}
        </div>
      </div>
      {/*product actual price */}
      <div className="form-group row mb-3">
        <label htmlFor="actualprice" className="col-sm-4 col-form-label">
          Actual Price :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="actualprice"
            placeholder="actual price"
            {...register("actualprice", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.actualprice)
                : 0,
            })}
          />
          {errors.actualprice && <span>This field is required</span>}
        </div>
      </div>
      {/*product offer price */}
      <div className="form-group row mb-3">
        <label htmlFor="offerprice" className="col-sm-4 col-form-label">
          Offer Price :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="offerprice"
            placeholder="offer price"
            {...register("offerprice", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.offerprice)
                : 0,
            })}
          />
          {errors.offerprice && <span>This field is required</span>}
        </div>
      </div>
      {/*product cgst */}
      <div className="form-group row mb-3">
        <label htmlFor="cgst" className="col-sm-4 col-form-label">
          cgst :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="cgst"
            placeholder="cgst"
            {...register("cgst", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.cgst)
                : 0,
            })}
          />
          {errors.cgst && <span>This field is required</span>}
        </div>
      </div>
      {/*product sgst */}
      <div className="form-group row mb-3">
        <label htmlFor="sgst" className="col-sm-4 col-form-label">
          sgst :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="sgst"
            placeholder="sgst"
            {...register("sgst", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.sgst)
                : 0,
            })}
          />
          {errors.sgst && <span>This field is required</span>}
        </div>
      </div>
      {/*product length */}
      <div className="form-group row mb-3">
        <label htmlFor="length" className="col-sm-4 col-form-label">
          length :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="length"
            placeholder="length"
            {...register("productDetails.length", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.length)
                : 0,
            })}
          />
          {errors.productDetails?.length && <span>This field is required</span>}
        </div>
      </div>
      {/*product width */}
      <div className="form-group row mb-3">
        <label htmlFor="width" className="col-sm-4 col-form-label">
          width :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="width"
            placeholder="width"
            {...register("productDetails.width", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.width)
                : 0,
            })}
          />
          {errors.productDetails?.width && <span>This field is required</span>}
        </div>
      </div>
      {/*product blouse piece included */}
      <div className="form-group row mb-3">
        <label
          htmlFor="isBlousePieceIncluded"
          className="col-sm-4 col-form-label"
        >
          blouse Piece included :{" "}
        </label>
        <div className="col-sm-4">
          <select
            className="form-control"
            id="isBlousePieceIncluded"
            {...register("productDetails.isBlousePieceIncluded", {
              required: true,
              value: context?.selectedData
                ? Boolean(context?.selectedData.blouse_piece)
                : false,
            })}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.productDetails?.isBlousePieceIncluded && (
            <span>This field is required</span>
          )}
        </div>
      </div>
      {/*product blouse piece description */}
      <div className="form-group row mb-3">
        <label htmlFor="blouseDescription" className="col-sm-4 col-form-label">
          blouse Piece description :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="blouseDescription"
            {...register("productDetails.blouseDescription", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData?.blouse_desc
                : "",
            })}
          />
          {errors.productDetails?.blouseDescription && (
            <span>This field is required</span>
          )}
        </div>
      </div>
      {/* collections  */}
      <div className="form-group row mb-3">
        <label htmlFor="collections" className="col-sm-4 col-form-label">
          Collections Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="collections"
            className="form-control"
            {...register("collectionId", {
              required: false,
            })}
          >
            <option value="">None</option>
            {collections?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* prints  */}
      <div className="form-group row mb-3">
        <label htmlFor="prints" className="col-sm-4 col-form-label">
          Prints Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="prints"
            className="form-control"
            {...register("printId", {
              required: false,
            })}
          >
            <option value="">None</option>
            {productPrints?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* styles  */}
      <div className="form-group row mb-3">
        <label htmlFor="styles" className="col-sm-4 col-form-label">
          Styles Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="styles"
            className="form-control"
            {...register("styleId", {
              required: false,
            })}
          >
            <option value="">None</option>
            {productStyles?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* colors  */}
      <div className="form-group row mb-3">
        <label htmlFor="colors" className="col-sm-4 col-form-label">
          Colors Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="colors"
            className="form-control"
            {...register("colorId", {
              required: false,
            })}
          >
            <option value="">None</option>
            {productColors?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* occassion  */}
      <div className="form-group row mb-3">
        <label htmlFor="occassion" className="col-sm-4 col-form-label">
          Occassion Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="occassion"
            className="form-control"
            {...register("occassionId", {
              required: false,
            })}
          >
            <option value="">None</option>
            {productOccassions?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* promos  */}
      <div className="form-group row mb-3">
        <label htmlFor="promo" className="col-sm-4 col-form-label">
          Select Promo :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="promo"
            className="form-control"
            {...register("promoId", {
              required: false,
            })}
          >
            <option value="">None</option>
            {productPromos?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.description}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/*product is trending? */}
      <div className="form-group row mb-3">
        <label htmlFor="isTrending" className="col-sm-4 col-form-label">
          Select as trending :{" "}
        </label>
        <div className="col-sm-4">
          <select
            className="form-control"
            id="isTrending"
            {...register("isTrending", {
              required: true,
              value: context?.selectedData
                ? Boolean(context?.selectedData?.isTrending)
                : false,
            })}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors?.isTrending && <span>This field is required</span>}
        </div>
      </div>
      {/*product is bestseller? */}
      <div className="form-group row mb-3">
        <label htmlFor="isBestseller" className="col-sm-4 col-form-label">
          Select as best seller :{" "}
        </label>
        <div className="col-sm-4">
          <select
            className="form-control"
            id="isBestseller"
            {...register("isBestSeller", {
              required: true,
              value: context?.selectedData
                ? Boolean(context?.selectedData?.isBestSeller)
                : false,
            })}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors?.isBestSeller && <span>This field is required</span>}
        </div>
      </div>
      {/*product is exclusive? */}
      <div className="form-group row mb-3">
        <label htmlFor="isExclusive" className="col-sm-4 col-form-label">
          Select as exclusive :{" "}
        </label>
        <div className="col-sm-4">
          <select
            className="form-control"
            id="isExclusive"
            {...register("isExclusive", {
              required: true,
              value: context?.selectedData
                ? Boolean(context?.selectedData?.isExclusive)
                : false,
            })}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors?.isExclusive && <span>This field is required</span>}
        </div>
      </div>
      {/*product is shippable? */}
      <div className="form-group row mb-3">
        <label htmlFor="isShippable" className="col-sm-4 col-form-label">
          Select as shippable :{" "}
        </label>
        <div className="col-sm-4">
          <select
            className="form-control"
            id="isShippable"
            {...register("isShippable", {
              required: true,
              value: context?.selectedData
                ? Boolean(context?.selectedData?.isShippable)
                : false,
            })}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors?.isShippable && <span>This field is required</span>}
        </div>
      </div>
      {/*product maxPerCart */}
      <div className="form-group row mb-3">
        <label htmlFor="maxQuantityPerCart" className="col-sm-4 col-form-label">
          Max Quantity per cart :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="maxQuantityPerCart"
            {...register("maxQuantityPerCart", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData?.maxQuantityPerCart)
                : 3,
            })}
          />
          {errors.maxQuantityPerCart && <span>This field is required</span>}
        </div>
      </div>
      {/* fabric details */}
      <div className="form-group row mb-3">
        <label htmlFor="productType" className="col-sm-4 col-form-label">
          Fabric:
        </label>
        <div className="col-sm-4">
          <select
            id="productType"
            className="form-control"
            {...register("productDetails.fabricDetailsId", {
              required: true,
            })}
          >
            {fabrics.map((option) => (
              <option value={option.id} key={option.id}>
                {option.fabricName}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/*product max days for cancellation */}
      <div className="form-group row mb-3">
        <label htmlFor="cancellation" className="col-sm-4 col-form-label">
          max days allowed for cancellation :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="cancellation"
            placeholder="cancellation days"
            {...register("maxAllowedCancellationDays", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData?.maxAllowedCancellationDays)
                : 3,
            })}
          />
          {errors.maxAllowedCancellationDays && (
            <span>This field is required</span>
          )}
        </div>
      </div>
      {/*product max days for return */}
      <div className="form-group row mb-3">
        <label htmlFor="return" className="col-sm-4 col-form-label">
          max days allowed for return :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="return"
            placeholder="return days"
            {...register("maxAllowedReturnDays", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData?.maxAllowedReturnDays)
                : 3,
            })}
          />
          {errors.maxAllowedReturnDays && <span>This field is required</span>}
        </div>
      </div>
      <div className="form-group row mb-3">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary" disabled={false}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductDetailsForm;
