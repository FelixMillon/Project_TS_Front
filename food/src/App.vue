<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
          <img src="./assets/imgs/logo.png" class="bi" width="60" height="60" role="img" aria-label="Bootstrap"/>
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><RouterLink to="/" class="nav-link px-2 link">Accueil</RouterLink></li>
        <li><RouterLink to="/categories" class="nav-link px-2 link">Catégories</RouterLink></li>
        <li><RouterLink to="/gestion-produit" class="nav-link px-2 link">Gestion des produits</RouterLink></li>
        <li><RouterLink to="/" class="nav-link px-2 link">A propos</RouterLink></li>
        <li><RouterLink to="/" class="nav-link px-2 link">F.A.Q.</RouterLink></li>
      </ul>

      <div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-primary me-2">Se connecter</button>
        <button type="button" class="btn btn-primary">S'inscrire</button>
      </div>
    </header>

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
