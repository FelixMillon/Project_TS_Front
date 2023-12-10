<template>
 <div>
    <Formulaire
      ref="formulairePopup"
      @closePopup="this.switchPopUp"
      @updateCategorie="updateCategorie"
      @insertCategorie="insertCategorie"
      :newUpdate="this.newUpdate"
      :visible="this.popupVisible"
      :categorie="this.categorie"
    >
    </Formulaire>
  </div>
  <div class="row">
    <h4 class="mb-3 text-center">Les catégories</h4>
    <button class="mb-3 text-center" @click="this.switchPopUp">Ajouter une catégorie</button>
    <table class="table">
    <thead>
      <tr  >
        <th scope="col">#</th>
        <th scope="col">libelle</th>
        <th scope="col">description</th>
        <th scope="col" class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">

      <tr v-for="(cat, index) in categories" :key="index">
        <TableLine
          :key="index"
          class="col-md-4"
          :cat="cat"
          @closePopup="switchPopUp"
          @bouton-post-update="handlePostUpdate" 
          @bouton-delete="handleDelete" 
        />
      </tr>

    </tbody>
  </table>
  </div>
</template>



<script lang="ts">
import TableLine from '../components/TableLine.vue'
import Formulaire from '../components/FormulaireCategorie.vue';
import CategorieService from '../modele/categorie.ts';
export default {
  components: {
    TableLine,
    Formulaire
  },
  data() {

    return {
      newUpdate: false,
      categories: [],
      categorie: {},
      popupVisible: false,
      form: {
        id: 0,
        libelle: '',
        description: ''
      }
    }
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
      this.deleteCategorie(id)
    },

    // Ajout d'une categorie
    async insertCategorie(formulaire: Object) {
      try{
        await CategorieService.insertCategorie(formulaire)
      } catch (error) {
        console.error('Erreur lors de envois des données produits', error);
      }
      // Refresh et reset forumlaire
      this.getCategories();
    },

    // Preparation du formulaire
    async prepareForm(id: number) {
      this.getCategorie(id)
      this.newUpdate = true;
    },
  
    // mise à jour categorie
    async updateCategorie(formulaire: Object) {
      try {
        await CategorieService.updateCategorie(formulaire)
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
      this.getCategories();
    },
  
    // suppression categorie
    async deleteCategorie(id: number) {
      try {
        await CategorieService.deleteCategorie(id)
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
      this.getCategories();
    },
  
    // recupération des catégories
    async getCategories() {
      try {
        this.categories = await CategorieService.getCategories()
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    },

    // recupération d'une categorie
    async getCategorie(id: number) {
      try {
        this.categorie = await CategorieService.getCategorie(id)
      } catch (error) {
        console.error('Erreur lors de envois de la réception des produits', error);
      }
    },
  },
  created() {
    this.getCategories();
  },
}





</script>

<style>
.card {
  width: 250px;
  margin-bottom: 20px;
}
</style>
