import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { ProductPrintsApi, ProductPrintsEntity } from "../services/openapi";
import useAxiosConfiguration from "./useAxiosConfiguration";

const usePrints = () => {
  const { getAxiosConfiguration } = useAxiosConfiguration();
 
  const [productPrints, setProductPrints] = useState<ProductPrintsEntity[]>([]);
  const getAllProductPrints = useMemo(() =>  () => {
    const api: ProductPrintsApi = new ProductPrintsApi(getAxiosConfiguration());
    api
      .productPrintsControllerGetAll()
      .then((resp) => {
        if (resp) {
          setProductPrints(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  },[config]);

  return { productPrints, getAllProductPrints };
};

export default usePrints;
