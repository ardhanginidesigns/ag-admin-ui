import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { SubcategoryApi, SubcategoryEntity } from "../services/openapi";
import useAxiosConfiguration from "./useAxiosConfiguration";

const useSubCategories = () => {
  const { getAxiosConfiguration } = useAxiosConfiguration();

  const [subcategories, setSubCategories] = useState<SubcategoryEntity[]>([]);
  const getAllSubCategories = useMemo(
    () => () => {
      const api: SubcategoryApi = new SubcategoryApi(getAxiosConfiguration());
      api
        .subcategoryControllerFindAll()
        .then((resp) => {
          if (resp) {
            setSubCategories(resp?.data);
          }
        })
        .catch((e) => {
          console.log(e);
          showToast("Could not reach out to backend.");
        });
    },
    [config]
  );

  return { subcategories, getAllSubCategories };
};

export default useSubCategories;
