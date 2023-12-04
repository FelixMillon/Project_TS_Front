<template>
  <div class="d-flex justify-content-around">
    <div class="row">
      <div v-for="(produit, index) in produitsbycat" :key="index" class="col-md-4 mb-3">
        <div class="card text-center">
          <img :src="produit.url_image" class="card-img-top" width="25%" alt="Image 1">
          <div class="card-body">
            <h5 class="card-title">{{ produit.libelle }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ produit.prix }} euros</h6>
            <p class="card-text">{{ produit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>


  
</template>
  
<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      produitsbycat: []
    }
  },
  methods: {
    async AllProducts() {
      try {
        // Effectuer une requête GET pour récupérer des données
        await axios.get('http://localhost:3000/api/produit/get-all/').then(response => {
          // Stockez les données dans la variable du composant
          this.produitsbycat = response.data;
        })

      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    },
    
  },
  created() {
    this.AllProducts();
  },
}
</script>


