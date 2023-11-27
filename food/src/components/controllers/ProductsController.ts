import axios from 'axios';

export interface Product {
  id: number;
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
export async function getProductById(productId: number): Promise<Product | null> {
  try {
    const response = await axios.get('http://localhost:3000/api/produit/get-all');
    const products: Product[] = response.data;
    return products.find(product => product.id === productId) || null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
}
export async function fetchProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    const allProducts = await getProducts();
    const filteredProducts = allProducts.filter(product => product.id_cat === categoryId);
    return filteredProducts;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
}

