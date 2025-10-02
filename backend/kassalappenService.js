import axios from "axios";
import { supabase } from "./supabaseClient.js";

const API_URL = "https://kassal.app/api/v1";
const API_KEY = process.env.KASSALAPPEN_API_KEY;

export async function fetchProducts() {
  try {
    const res = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const products = res.data.data;

    /*
    Mapping
    */
    const mappedProducts = products.map(p => ({
      name: p.name,
      brand: p.brand,
      price: p.current_price,
      store: p.store
    }))
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
