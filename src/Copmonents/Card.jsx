import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const Card = ({ pro }) => {
  const {
    productName,
    productImage,
    description,
    price,
    category,
    ratings,
    createdAt,
  } = pro;
  return (
    <div className="card bg-base-100 shadow-xl rounded-none">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt={`${productName}`}
        />
      </figure>
      <div className="card-body p-5">
        <div className="badge badge-secondary absolute right-5">{price} $</div>
        <h2 className="card-title mt-7">{productName}</h2>
        <p>{description}</p>
        <div className="text-[14px]">Created at: {createdAt}</div>
        <div className="flex items-center justify-between">
          <div className=" border px-2 rounded-xl">{category.split(' ')}</div>
          <div className="flex gap-2">
            {<Rating style={{ maxWidth: 80 }} value={ratings} readOnly />}
            {ratings}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
