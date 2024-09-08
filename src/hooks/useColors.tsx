import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { ProductColorApi, ProductColorEntity } from "../services/openapi";
import useAxiosConfiguration from "./useAxiosConfiguration";

const useColors = () => {
  const { getAxiosConfiguration } = useAxiosConfiguration();
  
  const [productColors, setProductColors] = useState<ProductColorEntity[]>([]);
  const getAllProductColors = useMemo(() => () => {
    const api: ProductColorApi = new ProductColorApi(getAxiosConfiguration());
    api
      .productColorControllerGetAll()
      .then((resp) => {
        if (resp) {
          setProductColors(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  }, [config]);

  return { productColors, getAllProductColors };
};

export default useColors;
