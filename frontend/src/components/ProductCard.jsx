import "../styles.css"

const ProductCard = ({ product }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md flex flex-col items-center w-64">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p>{product.price} kr</p>
            <div className="w-48 h-100 mt-4 overflow-hidden rounded-md">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    )
}

export default ProductCard
