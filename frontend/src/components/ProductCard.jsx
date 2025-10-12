import {Link} from "react-router-dom"
import "../styles.css"

const ProductCard = ({ product }) => {
    if (!product || !product.ean ) return null;
    
    
    return (
            <div className="max-w-xs m mx-auto rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white/80 backdrop-blur-sm">
            <Link to={`/product/${product.ean}`} className="no-underline text-black">
                    <h3 className="font-semibold text-lg text-center">{product.name}</h3>

                {/* Produktbilde */}
                <div className="w-60 h-100 mt-4 overflow-hidden rounded-md flex items-center justify-center">
                    <img
                        src={product.image}
                        className="w-full h-full object-contain"
                    />
                </div>


                {/* Pris og butikklogo ved siden av hverandre */}
                <div className="w-48 h-48 flex justify-center items-center overflow-hidden rounded-lg">
                    <img
                        src={product.store_logo}
                        alt={product.store}
                        className="w-10 h-10 rounded-full"
                    />
                    <p className="font-medium w-32">{product.store}</p>
                    <p className="text-lg">{product.price} kr</p>

                </div>

                
             </Link>
            </div>
        )
    }

export default ProductCard;
