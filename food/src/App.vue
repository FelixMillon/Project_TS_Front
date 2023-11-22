<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/controllers/Footer.vue'
import Header from './components/controllers/header.vue'
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style scoped>
header {
  background-color: #ffffff;
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
  height: 3.rem;
}

nav a {
  display: inline-block;
  padding: 1rem 0.5rem;
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
  color: black;
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
