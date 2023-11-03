import { createRouter, createWebHistory } from 'vue-router'
import Categories from '../views/CategoriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'categories',
      component: Categories
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    }
  ]
})

export default router
