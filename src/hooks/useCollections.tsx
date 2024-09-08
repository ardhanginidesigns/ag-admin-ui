import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import {
  ProductCollectionApi,
  ProductCollectionEntity,
} from "../services/openapi";
import useAxiosConfiguration from "./useAxiosConfiguration";

const useCollections = () => {
  const { getAxiosConfiguration } = useAxiosConfiguration();
  
  const [collections, setCollections] = useState<ProductCollectionEntity[]>([]);
  const getAllCollections = useMemo(() => () => {
    const api: ProductCollectionApi = new ProductCollectionApi(getAxiosConfiguration());
    api
      .productColelctionControllerGetAll()
      .then((resp) => {
        if (resp) {
          setCollections(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  }, [config]);

  return { collections, getAllCollections };
};

export default useCollections;
