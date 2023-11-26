<template>
  <div v-if="loading">
    Chargement des détails du produit...
  </div>
  <div v-else-if="productDetails" class="product-details-container">
    <div class="product-card">
    <p>salut</p>
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
import axios from 'axios';

export default {
  name: 'ProductView',
  data() {
    return {
      productId: null as string | null,
      productDetails: null,
      loading: true,
    };
  },
  async created() {
    this.productId = typeof this.$route.params.id === 'string' ? this.$route.params.id : this.$route.params.id[0];
    await this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/api/produit/get/${this.productId}`);
        this.productDetails = response.data;
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        this.loading = false;
      }
    },
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