import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";

//components
import Header from "./components/Header.jsx";
import ProductCard from "./components/ProductCard.jsx"

const getContent = () => {
  return {
    header: "Velkommen til MatBørsen",
    subtitle: "Her finner du dagens beste priser",
  };
};




const App = () => {
  const content = getContent();
  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const {data, error} = await supabase
        .from('Products') 
        .select()
        
        if (error){
          setFetchError('could not fetch the products')
          setProducts(null)
          console.log(error)

        }
        if (data){
          setProducts(data)
          setFetchError(null)
        }
    }
    fetchProducts()

  }, [])

  return (
    <div>
      <Header content = {content}/>
      <h2>Data fra supabase</h2>
      {fetchError && (<p>{fetchError}</p>)}
      {products && (
        <div className="products">
          {products.map(product => (
            <ProductCard key = {product.id} product = {product}/>
          ))}
        </div>
        )}
      </div>
  )
}

export default App;
