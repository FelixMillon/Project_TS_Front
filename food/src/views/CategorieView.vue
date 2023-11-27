<template>
    <div>
        <h1>Produits de la Catégorie: {{ categoryName }}</h1>
        <div v-if="loading">
            Chargement des produits...
        </div>
        <div v-else>
            <ul>
                <li v-for="product in products" :key="product.id">
                    <router-link :to="{ name: 'ProductView', params: { id: product.id } }">
                        {{ product.libelle }} - {{ product.prix }}€
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { useCategoriesLogic } from '../components/controllers/CategoriesController';
import { fetchProductsByCategory } from '../components/controllers/ProductsController';
import type { Product } from '@/components/controllers/ProductsController';

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
        const routeParam = this.$route.params.id;
        const categoryId = typeof routeParam === 'string' ? parseInt(routeParam) : parseInt(routeParam[0]);

        if (!isNaN(categoryId)) {
            const categories = await useCategoriesLogic();
            const selectedCategory = categories.find(cat => cat.id === categoryId);
            this.categoryName = selectedCategory ? selectedCategory.libelle : 'Catégorie Inconnue';

            this.products = await fetchProductsByCategory(categoryId);
        } else {
            console.error('Invalid category ID');
        }

        this.loading = false;
    }
};
</script>
