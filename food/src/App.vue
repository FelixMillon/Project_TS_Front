<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'

</script>

<template>

  <div class="container">
    <Header />

      <RouterView />

   



    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" >
      <div class="col-md-4 d-flex align-items-center">
          <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
              <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
          </a>
          <span class="mb-3 mb-md-0 text-body-secondary">© 2023 Projet TS, Commerce</span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          KERRAZ Mohamed | MACCIONI Elone <br> GALMICHE Ian | MILLON Félix
      </ul>
  </footer>



  </div>
  
</template>
