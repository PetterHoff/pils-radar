import { Link } from "react-router-dom";
import "../styles.css";

const ProductCard = ({ product }) => {
  if (!product || !product.ean) return null;

  return (
    <div className="max-w-[320px] w-full mx-auto rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200 bg-white flex flex-col justify-between p-4">
      <Link to={`/product/${product.ean}`} className="no-underline text-black flex flex-col h-full">
        
        {/* Produktnavn */}
        <h3 className="font-semibold text-base sm:text-lg text-center mb-3 line-clamp-2">
          {product.name}
        </h3>

        {/* Produktbilde */}
        <div className="w-full h-40 sm:h-48 flex items-center justify-center overflow-hidden mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain max-h-full"
          />
        </div>

        {/* Pris + butikklogo */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t">
          <div className="flex items-center space-x-2">
            <img
              src={product.store_logo}
              alt={product.store}
              className="w-8 h-8 rounded-full"
            />
            <p className="text-sm font-medium">{product.store}</p>
          </div>
          <p className="text-lg ">{product.price} kr</p>
        </div>

      </Link>
    </div>
  );
};

export default ProductCard;
