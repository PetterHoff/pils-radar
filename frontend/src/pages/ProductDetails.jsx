import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const [productPrices, setProductPrices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductPrices = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("ean", id);

      if (error) {
        setError("Kunne ikke hente priser for dette produktet");
        setProductPrices([]);
        console.log(error);
      } else {
        setProductPrices(data);
        setError(null);
      }

      setLoading(false);
    };

    fetchProductPrices();
  }, [id]);

  const productName = productPrices.length > 0 ? productPrices[0].name : "";
  const updatedDate = productPrices.length > 0 ? productPrices[0].updated : "ukjent dato";


  return (
    <div>
      <Navbar />
      <div className="p-8 sm:p-12 max-w-10xl mx-auto">

  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Produktbilde til venstre */}
          <div className=" flex justify-center md:justify-start bg-white p-4 rounded-sm shadow-md w-fit">
            <img
              src={productPrices.length > 0 ? productPrices[0].image : ""}
              alt={productName}
              className="w-60 h-60 object-contain"
            />
          </div>

          {/*tittel og beskrivelse i midten */}
          <div className="text-center md:text-left flex flex-col justify-center px-2 md:-ml-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{productName}</h2>
            <p className="text-gray-600 leading-relaxed italic  ">
                 Prisene ble sist hentet: {updatedDate.slice(0, 10)}
            </p>
          </div>

          

          {/* Butikk-bokser til høyre */}
          <div className="flex flex-col gap-6 w-full md:w-2/3 md:pr-6 bg-white p-3 rounded-sm divide-y divide-gray-400">
            <p className ="font-semibold py-2">Priser</p>
            {productPrices
              .sort((a, b) => a.price - b.price)
              .map((item, index) => {

                const lowestPrice = productPrices[0].price;
                const isLowest = item.price == lowestPrice;

                return (
                <div
                  key={index}
                  className=" w-full flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.store_logo}
                      alt={item.store}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="font-medium text-gray-800">{item.store}</p>
                  </div>
                  <p 
                    className={`"text-lg" ${
                    isLowest ? "text-green-500 font-semibold" : "text-red-500 font-semibold"
                  }`}
                  >
                    {item.price} kr
                  </p>
                </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
