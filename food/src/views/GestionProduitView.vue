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
import Card from '../components/Card.vue'
import Formulaire from '../components/FormulaireProduit.vue';
import ProduitService from '../modele/produit.ts';
import CategorieService from '../modele/categorie.ts';

export default {
  components: {
    Card,
    Formulaire
  },
  data() {
    return {
      popupVisible: false,
      newUpdate : false,
      username : "",
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
        this.scrollToCenter();
        this.popupVisible = true;
      }
    },

    // recupération du clic update
    handlePostUpdate(id: number) {
      this.prepareForm(id)
      this.switchPopUp();
    },

    // recupération du clic delete
    handleDelete(id: number) {
      this.deleteProduit(id)
    },

    // Ajout d'un produit
    async insertProduit(formulaire: Object) {
      try{
        await ProduitService.insertProduit(formulaire)
      } catch (error) {
        console.error('Erreur lors de envois des données produits', error);
      }
      // Refresh et reset forumlaire
      this.getProduits();
    },
  
    // Preparation du formulaire
    async prepareForm(id: number) {
      // Recuperation du produit demandé
      await this.getProduit(id)
      this.getCategorie(this.produit.id_cat)
      this.newUpdate = true;
    },

    // update produit
    async updateProduit(formulaire: Object) {
      try {
        await ProduitService.updateProduit(formulaire)
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
      this.getProduits();
    },

    // suppression produit
    async deleteProduit(id: number) {
      try {
        await ProduitService.deleteProduit(id)
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
      this.getProduits();
    },

    // recuperation de tous les produits
    async getProduits() {
      try {
        this.produits = await ProduitService.getProduits()
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    },

    // recuperation d'un produit
    async getProduit(id: number) {
      try {
        this.produit = await ProduitService.getProduit(id)
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    },
  
    // recupération des catégories
    async getCategories() {
      try {
        this.categories = await CategorieService.getCategories()
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    },

    // recupération la catégorie du produit
    async getCategorie(id_cat: number) {
      try {
        this.categorie = await CategorieService.getCategorie(id_cat)
      } catch (error) {
        console.error('Erreur lors de envois de la réception des produits', error);
      }
    },
  
    // scroll vers le centre
    scrollToCenter() {
      var centerX = Math.max(0, (window.innerWidth - window.innerWidth) / 2);
      var centerY = Math.max(0, (window.innerHeight - window.innerHeight)) + Math.floor(this.produits.length / 3)*250;
      if (document.documentElement.scrollTo) {
          document.documentElement.scrollTo({
              left: centerX,
              top: centerY,
              behavior: 'smooth'
          });
      } else {
          document.documentElement.scrollLeft = centerX;
          document.documentElement.scrollTop = centerY;
      }
    }
  },
  created() {
    this.getProduits();
    this.getCategories();
  }
}

</script>

<style>
.card {
  width: 250px;
  margin-bottom: 20px;
}
</style>
