import { DeliveryAddressEntity } from "../services/openapi";

export const formatAddress = (addressEntity?: DeliveryAddressEntity) => {
    return addressEntity
    ? `${addressEntity.firstName} ${addressEntity.lastName},${addressEntity.addressLine1},${addressEntity.addressLine2},${addressEntity.town},${addressEntity.state},${addressEntity.pin},${addressEntity.mobileNumber}`
    : "";
};