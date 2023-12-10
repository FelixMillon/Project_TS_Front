<template>
 
  
  <div class="row">
    <h4 class="mb-3 text-center">Les produits</h4>
    <button class="mb-3 text-center" @click="this.switchPopUp">Ajouter un produit</button>
    <Card
      v-for="(produit, index) in produits"
      :key="index"
      class="col-md-4"
      :data="produit"
      @bouton-post-update="handlePostUpdate" 
      @bouton-delete="handleDelete" 
    />
  </div>
  <div>
    <Formulaire
      ref="formulairePopup"
      @closePopup="this.switchPopUp"
      @updateProduit="updateProduit"
      @insertProduit="insertProduit"
      :produit="this.produit"
      :categories="this.categories"
      :newUpdate="this.newUpdate"
      :visible="this.popupVisible"
      :categorie="this.categorie"
    >
    </Formulaire>
  </div>
</template>



<script lang="ts">
import {ref} from 'vue';
import axios from 'axios';
import Card from '../components/Card.vue'
import Formulaire from '../components/Formulaire.vue';

export default {
  components: {
    Card,
    Formulaire
  },
  data() {
    return {
      popupVisible: false,
      newUpdate : false,
      produits : [],
      categories: [],
      produit: {},
      categorie : {},
      form: {
        id : 0,
        libelle: '',
        description: '',
        prix: '',
        date_achat: '',
        date_peremption: '',
        id_cat: '',
        image: ref<File | null>(null),
      }
    };
  },
  methods: {
    // apparition du pop up
    switchPopUp() {
      if(this.popupVisible){
        this.popupVisible = false;
        this.newUpdate = false;
      }else{
        this.$nextTick(() => {
          const popupElement = this.$refs.formulairePopup.$el;
          document.body.scrollTop = popupElement.offsetTop;
          document.documentElement.scrollTop = popupElement.offsetTop;
        });
        this.popupVisible = true;
      }
    },

    // recupération du clic update
    handlePostUpdate(id: number) {
      this.post_update(id)
      this.switchPopUp();
    },

    // recupération du clic delete
    handleDelete(id: number) {
      this.delete(id)
    },

    // Ajout d'un produit
    async insertProduit(formulaire) {
      try{
        await axios.post('http://localhost:3000/api/produit/add/', formulaire, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        console.error('Erreur lors de envois des données produits', error);
      }
      // Refresh et reset forumlaire
      this.AllProducts();
    },

    // récupération du fichier chargé
    fileSelected (event: Event) {
      const target = event.target as HTMLInputElement;
      const selectedFile = target.files?.[0];
      if (selectedFile) {
        this.form.image = selectedFile;
      }
    },

    // creation du formulaire d'update
    async post_update(id: number) {
      // Recuperation du produit demandé
      try {
        await axios.get(`http://localhost:3000/api/produit/get-by-id/${id}/`).then(response => {
          this.produit = response.data;
        })
      } catch (error) {
        console.error('Erreur lors de envois de la réception des produits', error);
      }

      // Recuperation de l'objet categorie produit demander
      try {
        await axios.get(`http://localhost:3000/api/categorie_produit/get-by-id/${this.produit.id_cat}/`).then(response => {
          this.categorie = response.data;
        })
      } catch (error) {
        console.error('Erreur lors de envois de la réception des produits', error);
      }
      this.newUpdate = true;
    },

    // update produit
    async updateProduit(formulaire) {
      try {
        // Envoie du formulaire produit avec l'image
        await axios.put('http://localhost:3000/api/produit/update/', formulaire, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        console.error('Erreur lors de envois des données produits', error);
      }
      // Refresh
      this.AllProducts();
    },

    // suppression produit
    async delete(id: number) {
      await axios.delete(`http://localhost:3000/api/produit/delete/${id}/`);
      this.AllProducts();
    },

    // recuperation de tous les produits
    async AllProducts() {
      try {
        // Effectuer une requête GET pour récupérer des données
        await axios.get('http://localhost:3000/api/produit/get-all/').then(response => {
          // Stockez les données dans la variable du composant
          this.produits = response.data;
        })

      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    },

    // recupération des catégories
    async AllCategory() {
      try {
        // Effectuer une requête GET pour récupérer des données
        await axios.get('http://localhost:3000/api/categorie_produit/get-all/').then(response => {
          // Stockez les données dans la variable du composant
          this.categories = response.data;
        })

      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    },
  },
  created() {
    this.AllProducts();
    this.AllCategory();
  },
}





</script>

<style>
.card {
  width: 250px;
  margin-bottom: 20px;
}
</style>
