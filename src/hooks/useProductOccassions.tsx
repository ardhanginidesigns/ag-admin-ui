import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import {
  ProductOccassionApi,
  ProductOccassionEntity,
} from "../services/openapi";
import useAxiosConfiguration from "./useAxiosConfiguration";

const useProductOccassions = () => {
  const { getAxiosConfiguration } = useAxiosConfiguration();

  const [productOccassions, setProductOccassions] = useState<
    ProductOccassionEntity[]
  >([]);
  const getAllProductOccassions = useMemo(
    () => () => {
      const api: ProductOccassionApi = new ProductOccassionApi(
        getAxiosConfiguration()
      );
      api
        .productOccassionControllerGetAll()
        .then((resp) => {
          if (resp) {
            setProductOccassions(resp?.data);
          }
        })
        .catch((e) => {
          console.log(e);
          showToast("Could not reach out to backend.");
        });
    },
    [config]
  );

  return { productOccassions, getAllProductOccassions };
};

export default useProductOccassions;
