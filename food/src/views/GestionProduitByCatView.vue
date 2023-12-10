<template>
  <div class="mb-3 text-center" v-if="produits.length == 0">
    <h5>Aucun produit dans cette catégorie</h5>
  </div>
  <div v-else>
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
  </div>
</template>



<script lang="ts">
import {ref} from 'vue';
import Card from '../components/Card.vue'
import Formulaire from '../components/FormulaireProduit.vue';
import ProduitService from '../modele/produit.ts';
import CategorieService from '../modele/categorie.ts';

export default {
  props: {
    idCat: {
      type: Number,
      required: true
    }
  },
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
      idCat: 0,
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
          this.$refs.formulairePopup.$el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
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
      this.getProduitsByCat();
    },
  
    // Preparation du formulaire
    async prepareForm(id: number) {
      // Recuperation du produit demandé
      this.getProduit(id)
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
      this.getProduitsByCat();
    },

    // suppression produit
    async deleteProduit(id: number) {
      try {
        const response = await ProduitService.deleteProduit(id);
        console.log(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
      this.getProduitsByCat();
    },

    // recuperation de tous les produits
    async getProduitsByCat() {
      try {
        this.produits = await ProduitService.getProduitsByCat(this.idCat)
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
  },
  created() {
    this.idCat = this.$route.params.idCat;
    this.getProduitsByCat();
    this.getCategories();
  },
  mounted(){
    this.idCat = this.$route.params.idCat;
  }
}





</script>

<style>
.card {
  width: 250px;
  margin-bottom: 20px;
}
</style>
