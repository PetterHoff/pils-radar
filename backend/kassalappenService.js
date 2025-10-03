import axios from "axios";
import { supabase } from "./supabaseClient.js";
import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://kassal.app/api/v1";
const API_KEY = process.env.KASSALAPPEN_API_KEY;

async function fetchProducts() {
  try {
    // hent unike øl-produkter fra Kassalappen API
    const res = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      params: { search: "pilsner", size: 50, page: 1 }
    });
          
    const products = res.data.data;
    console.log(`Fant ${products.length} produkter`);

    console.log(products[0]);


    for (const product of products) {
      if (!product.ean) continue; // hopp over produkter uten EAN
    }
    products.slice(0, 5).forEach(p => {
      console.log(`${p.name} - ${p.current_price} kr (${p.store[0]?.name})`);
    });
    
    /*
    Mapping
    */
    const mappedProducts = products.map(p => ({
        name: p.name,
        brand: p.brand,
        price: p.current_price,
        store: p.store,
        image: p.image,
      }));

    /*
    insert supabase
    */
    const {error } = await supabase
      .from("Products")
      .insert(mappedProducts);

    if (error) throw error;
    console.log("Produkter lagret i Supabase");
  } catch (err) {
    console.error("Feil:", err.message);
  }
}
export { fetchProducts };