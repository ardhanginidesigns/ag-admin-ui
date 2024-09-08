import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { ProductStyleApi, ProductStyleEntity } from "../services/openapi";
import useAxiosConfiguration from "./useAxiosConfiguration";

const useStyles = () => {
  const { getAxiosConfiguration } = useAxiosConfiguration();
  
  const [productStyles, setProductStyles] = useState<ProductStyleEntity[]>([]);
  const getAllProductStyles = useMemo(() =>  () => {
    const api: ProductStyleApi = new ProductStyleApi(getAxiosConfiguration());
    api
      .productStyleControllerGetAll()
      .then((resp) => {
        if (resp) {
          setProductStyles(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  },[config]);

  return { productStyles, getAllProductStyles };
};

export default useStyles;
