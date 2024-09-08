import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { CategoryApi, CategoryEntity } from "../services/openapi";
import useAxiosConfiguration from "./useAxiosConfiguration";

const useCategories = () => {
  const { getAxiosConfiguration } = useAxiosConfiguration();
  
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const getAllCategories = useMemo(() => () => {
    const api: CategoryApi = new CategoryApi(getAxiosConfiguration());
    return api
      .categoryControllerFindAll()
      .then((resp) => {
        if (resp) {
          setCategories(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  }, [config]);

  return { categories, getAllCategories };
};

export default useCategories;
