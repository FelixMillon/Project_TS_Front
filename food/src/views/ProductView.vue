<template>
  <div v-if="loading">
    Chargement des détails du produit...
  </div>
  <div v-else-if="productDetails" class="product-details-container">
    <div class="product-card">
      <h1>{{ productDetails.libelle }}</h1>
      <p>Prix : {{ productDetails.prix }}€</p>
    </div>
    <router-link to="/categories" class="back-button">
      Retour aux catégories
    </router-link>
  </div>
  <div v-else>
    Le produit n'a pas été trouvé.
  </div>
</template>
<script lang="ts">
import { getProductById } from '../components/controllers/ProductsController';
import type { Product } from '../components/controllers/ProductsController';

export default {
  name: 'ProductView',
  data() {
    return {
      productId: null as number | null,
      productDetails: null as Product | null,
      loading: true,
    };
  },
  async created() {
    this.loading = true;
    const routeParam = this.$route.params.id;
    this.productId = typeof routeParam === 'string' ? parseInt(routeParam) : parseInt(routeParam[0]);

    if (!isNaN(this.productId)) {
      this.productDetails = await getProductById(this.productId);
      if (!this.productDetails) {
        console.error('Produit non trouvé');
      }
    } else {
      console.error('Invalid product ID');
    }

    this.loading = false;
  },
};
</script>

<style scoped>
.product-details-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.product-card {
  display: flex;
  max-width: 900px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.product-image {
  width: 40%;
  display: flex;
  align-items: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  margin-top: 0;
  font-size: 2rem;
}

.price {
  font-size: 1.5rem;
  color: #5c940d;
}

.description, .date-info {
  margin: 10px 0;
}

.back-button {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #f2f2f2;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  border: 1px solid #ddd;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #e2e2e2;
}

@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
  }

  .product-image, .product-info {
    width: 100%; /* Set to full width on smaller screens */
  }
}
</style>