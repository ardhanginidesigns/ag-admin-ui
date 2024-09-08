import { CustomCellRendererProps } from "ag-grid-react";

function ProductImage(props: CustomCellRendererProps) {
  console.trace(props);
  return (
    <img
      style={{ height: 120, width: 90 }}
      src={props.value}
      alt="product thumbnail"
    ></img>
  );
}

export default ProductImage;
