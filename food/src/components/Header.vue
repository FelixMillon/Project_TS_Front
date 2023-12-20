

<template>

  <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
          <img src="../assets/imgs/logo.png" class="bi" width="60" height="60" role="img" aria-label="Bootstrap"/>
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
        <button v-if="this.token != null" type="button" @click="this.logOut()" class="btn btn-outline-primary me-2">Se déconnecter</button>
        <RouterLink v-else to="/signin/" class="btn btn-outline-primary me-2">Se connecter</RouterLink>
        <RouterLink  to="/login/" class="btn btn-primary">S'inscrire</RouterLink>
      </div>
    </header>
  </div>
  
</template>

<script lang="ts">
  
  import ManageCookies from "../modele/manageCookies";
  import router from '../router'; 
  export default {
    data() {
        return {
            token: ManageCookies.readCookie('myTStoken')
        };
    },
    methods: {
        logOut() {
            ManageCookies.deleteCookie('myTStoken');
            this.token = null;
            router.push('/signin/');
        },
    },
    computed: {
      storedToken() {
        return this.$store.getters.getToken;
      },
    },
    watch: {
      storedToken(newValue, oldValue) {
        this.token = newValue;
      },
    }
  };
</script>
