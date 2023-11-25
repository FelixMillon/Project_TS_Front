<template>
  <div class="product-details-container" v-if="productDetails">
    <div class="product-card">
      <div class="product-image">
        <img src="../assets/imgs/la-defense-paris_0.jpg" alt="la d" />
      </div>
      <div class="product-info">
        <h1>{{ productDetails.libelle }}</h1>
        <p><strong>Prix:</strong> {{ productDetails.prix }}€</p>
        <p><strong>Description:</strong> {{ productDetails.description }}</p>
        <p><strong>Date d'achat:</strong> {{ productDetails.date_achat }}</p>
        <p><strong>Date de péremption:</strong> {{ productDetails.date_peremption }}</p>
        <router-link to="/categories" class="back-button">Retour aux catégories</router-link>
      </div>
    </div>
  </div>
  <div v-else>
    Chargement des détails du produit...
  </div>
</template>

<script lang="ts">
import products from '../assets/products.json';


interface Product {
  id_pro: number;
  libelle: string;
  description: string;
  prix: number;
  date_achat: string;
  date_peremption: string;
  id_cat: number;
}

export default {
  name: 'ProductsView',
  data() {
    return {
      productId: typeof this.$route.params.id === 'string' ? this.$route.params.id : this.$route.params.id[0],
      productDetails: null as Product | null
    };
  },
  mounted() {
    this.fetchProductDetails();
  },
  methods: {
    fetchProductDetails() {
      const id = parseInt(this.productId);
      this.productDetails = products.find(product => product.id_pro === id) || null;
    }
  }
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
  flex: 1; /* Take the rest of the space available */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  margin-top: 0;
  font-size: 2rem; /* Adjust size as needed */
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

/* .product-card {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  max-width: 900px;
  margin: auto;
} */



</style>