import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { FabricDetailsApiApi, FabricDetailsEntity } from "../services/openapi";
import useAxiosConfiguration from "./useAxiosConfiguration";

const useFabrics = () => {
  const { getAxiosConfiguration } = useAxiosConfiguration();
  
  const [productFabrics, setProductFabrics] = useState<FabricDetailsEntity[]>(
    []
  );
  const getAllProductFabrics = useMemo(() =>  () => {
    const api: FabricDetailsApiApi = new FabricDetailsApiApi(getAxiosConfiguration());
    api
      .fabricControllerFindAll()
      .then((resp) => {
        if (resp) {
          setProductFabrics(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  },[config]);

  return { productFabrics, getAllProductFabrics };
};

export default useFabrics;
