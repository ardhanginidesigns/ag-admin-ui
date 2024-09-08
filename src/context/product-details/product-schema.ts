export class ProductSchema {
  /**
   *
   * @type {string}
   * @memberof ProductSnapshotDto
   */
  "productid": string;
  /**
   *
   * @type {string}
   * @memberof ProductSnapshotDto
   */
  "producttype": string;
  /**
   *
   * @type {string}
   * @memberof ProductSnapshotDto
   */
  "category": string;
  /**
   *
   * @type {string}
   * @memberof ProductSnapshotDto
   */
  "subcategory": string;
  /**
   *
   * @type {string}
   * @memberof ProductSnapshotDto
   */
  "skuid": string;
  /**
   *
   * @type {string}
   * @memberof ProductSnapshotDto
   */
  "productname": string;
  /**
   *
   * @type {string}
   * @memberof ProductSnapshotDto
   */
  "productdescription": string;
  /**
   *
   * @type {number}
   * @memberof ProductSnapshotDto
   */
  "offerprice": number;
  /**
   *
   * @type {number}
   * @memberof ProductSnapshotDto
   */
  "actualprice": number;
  /**
   *
   * @type {boolean}
   * @memberof ProductSnapshotDto
   */
  "isTrending": boolean;
  /**
   *
   * @type {boolean}
   * @memberof ProductSnapshotDto
   */
  "isBestSeller": boolean;
  /**
   *
   * @type {boolean}
   * @memberof ProductSnapshotDto
   */
  "isNew": boolean;
  /**
   *
   * @type {number}
   * @memberof ProductSnapshotDto
   */
  "availableQuantity": number;
  /**
   *
   * @type {number}
   * @memberof ProductSnapshotDto
   */
  "averageReview": number;
  /**
   *
   * @type {string}
   * @memberof ProductSnapshotDto
   */
  "return_exchange_policy": string;
  /**
   *
   * @type {number}
   * @memberof ProductSnapshotDto
   */
  "maxQuantityPerCart": number;

  /**
   *
   * @type {string}
   * @memberof SareeDetailsDto
   */
  "fabricname": string;
  /**
   *
   * @type {string}
   * @memberof SareeDetailsDto
   */
  "fabricDescription": string;
  /**
   *
   * @type {string}
   * @memberof SareeDetailsDto
   */
  "washcare": string;
  /**
   *
   * @type {number}
   * @memberof SareeDetailsDto
   */
  "length": number;
  /**
   *
   * @type {number}
   * @memberof SareeDetailsDto
   */
  "width": number;
  /**
   *
   * @type {boolean}
   * @memberof SareeDetailsDto
   */
  "blouse_piece": boolean;
  /**
   *
   * @type {string}
   * @memberof SareeDetailsDto
   */
  "blouse_desc"?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof SareeDetailsDto
   */
  "sareeImage": string;

  "cgst": number;
  "sgst": number;

  "collectionId"?: string;
  "styleId"?: string;
  "printId"?: string;
  "colorId"?: string;
  "promoId"?: string;
  "occassionId"?: string;
  "isExclusive"?: boolean;
  "isShippable"?: boolean;
  "maxAllowedReturnDays": number;

  "maxAllowedCancellationDays": number;
}

export class FileUploadDto {
  productId: string | undefined;
  productTypeId: string | undefined;
  file: File | undefined;
  description: string | undefined;
}
