import { createRouter, createWebHistory } from 'vue-router'
import CategoriesView from '../views/CategoriesView.vue'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import CategorieView from '../views/CategorieView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
    {
      path: '/categorie/:id',
      name: 'categorie',
      component: CategorieView
    },    
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductView
    }
  ]
})

export default router
