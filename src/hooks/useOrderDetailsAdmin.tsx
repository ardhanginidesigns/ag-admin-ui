import { useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { OrderResponse } from "../services/openapi/api";
import { OrderApiApi } from "../services/openapi";
import useAxiosConfiguration from "./useAxiosConfiguration";

const useOrderDetailsAdmin = () => {
  const { getAxiosConfiguration } = useAxiosConfiguration();
  const [productOrders, setProductOrders] = useState<OrderResponse[]>([]);

  const getAllOrders = useMemo(() => () => {
    const api: OrderApiApi = new OrderApiApi(getAxiosConfiguration());
    api
      .orderControllerFindAll()
      .then((resp) => {
        if (resp) {
          setProductOrders(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  },[config]);

  const getOrderesByUser = (userId: string) => {
    const api: OrderApiApi = new OrderApiApi(getAxiosConfiguration());
    api
      .orderControllerFindAllByUserId(userId)
      .then((resp) => {
        if (resp) {
          setProductOrders(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  };

  const completeCodOrder = (orderId: string) => {
    const api: OrderApiApi = new OrderApiApi(getAxiosConfiguration());
    api
      .orderControllerCompleteCodOrder()
      .then(() => {
        getAllOrders();
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  };

  const rejectOrder = (orderId: string) => {
    const api: OrderApiApi = new OrderApiApi(getAxiosConfiguration());
    api
      .orderControllerRejectOrder()
      .then(() => {
        getAllOrders();
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  };

  return {
    productOrders,
    getAllOrders,
    getOrderesByUser,
    completeCodOrder,
    rejectOrder,
  };
};

export default useOrderDetailsAdmin;
