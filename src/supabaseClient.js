// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ofnzesujtovsjacbmdvi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mbnplc3VqdG92c2phY2JtZHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDAyMjEsImV4cCI6MjA5MDYxNjIyMX0.r2MHSz8AHUSnynh8pDMECLCUfe-crUTBlFjbKD8sK7A";

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch all products
export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("Product_tbl")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data;
};

// Fetch a single product
export const fetchProductById = async (id) => {
  const { data, error } = await supabase
    .from("Product_tbl")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
};