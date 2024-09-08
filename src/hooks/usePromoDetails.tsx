import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import {
  CreatePromoDto,
  PromoDetailsApi,
  PromoDetailsEntity,
} from "../services/openapi";
import useAxiosConfiguration from "./useAxiosConfiguration";

const usePromoDetails = () => {
  const { getAxiosConfiguration } = useAxiosConfiguration();
  const [productPromos, setProductPromos] = useState<PromoDetailsEntity[]>([]);
  const getAllPromoDetails = useMemo(() => () => {
    const api: PromoDetailsApi = new PromoDetailsApi(getAxiosConfiguration());
    api
      .promoDetailsControllerGetAll()
      .then((resp) => {
        if (resp) {
          setProductPromos(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  },[config]);

  const editPromoDetails = (payLoad: CreatePromoDto) => {
    const api: PromoDetailsApi = new PromoDetailsApi(getAxiosConfiguration());
    api
      .promoDetailsControllerCreateOrupdate(payLoad)
      .then(() => {
        getAllPromoDetails();
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  };

  const removePromoDetails = (promoId: string) => {
    const api: PromoDetailsApi = new PromoDetailsApi(getAxiosConfiguration());
    api
      .promoDetailsControllerRemove(promoId)
      .then(() => {
        getAllPromoDetails();
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  };

  return {
    productPromos,
    getAllPromoDetails,
    editPromoDetails,
    removePromoDetails,
  };
};

export default usePromoDetails;
