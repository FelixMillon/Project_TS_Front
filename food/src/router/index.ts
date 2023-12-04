import { createRouter, createWebHistory } from 'vue-router'
import CategoriesView from '../views/CategoriesView.vue'
import HomeView from '../views/HomeView.vue'
import Gestion_ProduitView from "../views/Gestion_ProduitView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/categories",
      name: "categories",
      component: CategoriesView,
    },
    {
      path: "/gestion-produit/",
      name: "gestion-produit",
      component: Gestion_ProduitView,
    },
  ],
});

export default router
