<template>
    <div>
        <h1>Produits de la Catégorie: {{ categoryName }}</h1>
        <div v-if="loading">
            Chargement des produits...
        </div>
        <div v-else>
            <ul>
                <li v-for="product in products" :key="product.id_pro">
                    <router-link :to="{ name: 'ProductView', params: { id: product.id_pro } }">
                        {{ product.libelle }} - {{ product.prix }}€
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { fetchProductsByCategory } from '../components/controllers/ProductsController';
import type { Product } from '../components/controllers/ProductsController';

export default {
    name: 'CategorieView',
    data() {
        return {
            products: [] as Product[],
            categoryName: '',
            loading: true,
        };
    },
    async created() {
        this.loading = true;
        const categoryParam = this.$route.params.category;
        this.categoryName = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

        try {
            const categoryId = parseInt(this.categoryName);
            if (!isNaN(categoryId)) {
                this.products = await fetchProductsByCategory(categoryId);
            } else {
                console.error('Invalid category ID');
            }
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            this.loading = false;
        }
    }
};
</script>
