import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const getContent = () => {
  return {
    header: "Velkommen til MatBørsen",
    subtitle: "Her finner du dagens beste priser",
  };
}
const Header = ({content}) => {
  return (
    <div>
    <h1>{content.header}</h1>
    <p>{content.subtitle}</p>
    </div>
  );
}

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
            <p>{product.name}</p>
          ))}
        </div>
        )}
      </div>
  )
}

export default App;
