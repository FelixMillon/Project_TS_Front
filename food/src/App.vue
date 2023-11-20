<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/controllers/Footer.vue'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/categories">Catégories</RouterLink>
        <RouterLink to="/products">Produits</RouterLink>
      </nav>
  </header>

  <RouterView />
  <Footer />
</template>

<style scoped>
header {
  background-color: #F7F8FA;
  color: #007461;
  width: 100%;
  position: fixed;
  top: 0; 
  left: 0;
  z-index: 1000;
  border-bottom: solid #e2e2e2;
}

nav {
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 3.5rem;
}

nav a {
  display: inline-block;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: inherit;
  font-size: 18px;
  transition: background-color 0.3s;
}

nav a.router-link-exact-active {
  font-weight: bold;

}

nav a:hover {
  text-decoration: underline;
  margin-bottom: 5px;
  transition: 0.5;
}

@media (min-width: 1024px) {
  nav {
    justify-content: center;
  }

  nav a {
    padding: 1rem 2rem;
  }
}
</style>
