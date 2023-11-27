<template>
  <div v-if="loading">
    Chargement des catégories...
  </div>
  <div v-else>
    <h1>Liste des catégories</h1>
    <div class="categories-container">
      <div v-for="category in categories" :key="category.id" class="category">
        <router-link :to="'/categorie/' + category.id">
          <h2>{{ category.libelle }}</h2> 
        </router-link>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { useCategoriesLogic } from "../components/controllers/CategoriesController";
import type { Product } from "@/components/controllers/ProductsController";


interface CategoryWithProducts {
  id: number;
  libelle: string; 
  products: Product[];
}


export default {
  name: 'CategoriesVue',
  data() {
    return {
      categories: [] as CategoryWithProducts[],
      loading: true,
    };
  },
  async created() {
    try {
      this.categories = await useCategoriesLogic();
      console.log("cat", this.categories); 
      
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>


<style scoped>
@import '../assets/tableStyles.css';

a {
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
</style>
