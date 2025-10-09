import {Link} from "react-router-dom"
import "../styles.css"

const ProductCard = ({ product }) => {
    if (!product || !product.ean ) return null;
    
    
    return (
            <div className="p-4 border rounded-lg shadow-md flex flex-col items-center w-64">
            <Link to={`/product/${product.ean}`} className="no-underline text-black">
                    <h3 className="font-semibold text-lg">{product.name}</h3>

                {/* Produktbilde */}
                <div className="w-60 h-100 mt-4 overflow-hidden rounded-md">
                    <img
                        src={product.image}
                        alt={product.name}
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
