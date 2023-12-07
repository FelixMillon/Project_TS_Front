import products from '../../assets/products.json';
import categories from '../../assets/categories.json';

export function useCategoriesLogic() {
  // Organiser les produits par catégories
  const productsByCategory = categories.map((cat) => ({
    category: cat.libelle,
    products: products.filter(product => product.id_cat === cat.id_cat),
  }));

  return productsByCategory;
}
