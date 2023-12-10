import { createRouter, createWebHistory } from 'vue-router'
import GestionCategorieView from '../views/GestionCategorieView.vue'
import HomeView from '../views/HomeView.vue'
import GestionProduitView from "../views/GestionProduitView.vue";


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
      component: GestionCategorieView,
    },
    {
      path: "/gestion-produit/",
      name: "gestion-produit",
      component: GestionProduitView,
    },
  ],
});

export default router
