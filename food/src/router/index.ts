import { createRouter, createWebHistory } from 'vue-router'
import GestionCategorieView from '../views/GestionCategorieView.vue'
import HomeView from '../views/HomeView.vue'
import GestionProduitView from "../views/GestionProduitView.vue";
import GestionProduitByCatView from "../views/GestionProduitByCatView.vue";
import LogInView from "../views/LogInView.vue";
import SignInView from "../views/SignInView.vue";
import ManageCookies from "../modele/manageCookies.ts";


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
    {
      path: "/gestion-produit/:idCat",
      name: "gestion-produit-by-cat",
      component: GestionProduitByCatView,
    },
    {
      path: "/signin/",
      name: "signin",
      component: SignInView,
    },
    {
      path: "/login/",
      name: "login",
      component: LogInView,
    },
  ],
});

router.beforeEach((to: any, from: any, next: any) => {
  const token = ManageCookies.readCookie('myTStoken');
  if (!token && to.name !== 'login' && to.name !== 'signin') {
    next({ name: 'signin' });
  } else {
    next();
  }
});

export default router
