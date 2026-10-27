
import { Link } from "react-router-dom";

function ProductCart(props) {
  return (
    <>
      <Link to={`/product_det/${props.data.product_tbl_id}`}>
        <div className="max-w-xs overflow-hidden rounded-xl border border-gray-100 bg-white p-2 font-sans shadow-md transition duration-300 hover:shadow-lg">

          {/* Product Image */}
          <div className="relative h-[320px] w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={props.data.product_img}
              alt={props.data.product_name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="pt-2">

            {/* Product Name */}
            <h3 className="truncate text-[17px] font-bold text-[#383838]">
              {props.data.product_name}
            </h3>

            {/* Rating and Best Seller */}
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded bg-emerald-700 px-2 py-1 text-xs font-bold text-white">
                ★ 4.5
              </span>

              <span className="text-xs text-gray-500">
                Best Seller
              </span>
            </div>

            {/* Product Price */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-400 line-through">
                ₹1,499
              </span>

              <span className="text-[20px] font-bold text-[#383838]">
                ₹{props.data.price}
              </span>
            </div>

            {/* Free Delivery */}
            <p className="mt-1 flex items-center gap-1 text-xs text-gray-600">
              <span>🚚</span>
              <span>Free Delivery</span>
            </p>

          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductCart;
