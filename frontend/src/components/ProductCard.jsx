import "../styles.css"

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.name}
            </h3>
            <p className="text-2xl font-bold text-green-600">
                {typeof product.price === 'number' 
                    ? `${product.price.toFixed(2)} kr` 
                    : product.price}
            </p>
        </div>
    )
}

export default ProductCard