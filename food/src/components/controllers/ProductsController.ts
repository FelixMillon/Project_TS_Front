import axios from 'axios';

export interface Product {
  id_pro: number;
  libelle: string;
  prix: number;
  id_cat: number;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get('http://localhost:3000/api/produit/get-all');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
export async function fetchProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    const allProducts = await getProducts();
    return allProducts.filter(product => product.id_cat === categoryId);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
}
