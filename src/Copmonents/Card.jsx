import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Card component to display product details
const Card = ({ product }) => {
  // Destructure product properties
  const {
    productName,
    productImage,
    brandName,
    description,
    price,
    category,
    ratings,
    createdAt,
  } = product;

  return (
    <div className="card bg-base-100 shadow-xl rounded-none">
      {/* Product Image */}
      <figure>
        <img
          src={productImage}
          alt={productName || "Product Image"}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body p-5">
        {/* Product Title */}
        <h2 className="card-title text-lg font-semibold">{productName}</h2>

        {/* Product Details: Brand and Price */}
        <div className="flex items-center justify-between mb-2 ">
          <div className="badge bg-blue-800 text-white">{`Brand: ${brandName}`}</div>
          <div className="badge bg-blue-800 text-white">{`${price} $`}</div>
        </div>

        {/* Product Description */}
        <p className="">{description}</p>

        {/* Product Creation Date */}
        <div className="text-sm mt-2">
          Created at:{" "}
          {new Date(createdAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>

        {/* Product Category and Ratings */}
        <div className="flex items-center justify-between mt-3">
          <div className="border px-2 py-1 rounded-xl bg-gray-100 text-gray-900">
            {category}
          </div>
          <div className="flex items-center gap-2">
            <Rating style={{ maxWidth: 80 }} value={ratings} readOnly />
            <span>{ratings}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
