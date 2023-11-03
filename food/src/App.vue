<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
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
</template>

<style scoped>
header {
  background-color: #333; 
  color: #fff;
  width: 100%;
  position: fixed;
  top: 0; 
  left: 0;
  z-index: 1000;
}

nav {
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 4rem;
}

nav a {
  display: inline-block;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

nav a:hover {
  background-color: #555;
}

@media (min-width: 1024px) {
  nav {
    justify-content: flex-start;
  }

  nav a {
    padding: 1rem 2rem;
  }
}
</style>
