import axios from 'axios';

interface Category {
  id: number;
  libelle: string;
}

type Product = {
  id_pro: number;
  libelle: string;
  prix: number;
  id_cat: number;
};

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await axios.get('http://localhost:3000/api/categorie_produit/get-all');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
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

export async function useCategoriesLogic(): Promise<Array<{ id: number; libelle: string; products: Product[] }>> {
  const categories: Category[] = await getCategories();
  const products: Product[] = await getProducts();

  // Organiser les produits par catégories
  const productsByCategory = categories.map((cat: Category) => ({
    id: cat.id,
    libelle: cat.libelle,
    products: products.filter((product: Product) => product.id_cat === cat.id),
  }));

  return productsByCategory;
}
