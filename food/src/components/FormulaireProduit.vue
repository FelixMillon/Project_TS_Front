<template>
  <div class="popup-overlay" v-if="visible">
    <div class="popup-content">
      <h4 v-if="newUpdate" class="mb-3 text-center">Modifier le produit</h4>
      <h4 v-else class="mb-3 text-center">Ajouter un produit</h4>
      <form @submit.prevent="submit">
        <div class="row g-3">
          <div class="col-4">
            <input type="text" class="form-control" v-model="form.libelle" 
            :placeholder="newUpdate ? this.produit.libelle : 'Nom du produit'" >
          </div>
          <div class="col-md-4">
            <input type="number" class="form-control" v-model="form.prix" 
            :placeholder="newUpdate ? this.produit.prix : 'Prix'"  >
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="form.id_cat">
              <option value="">{{ newUpdate ? this.categorie.libelle : 'Choisir' }}</option> 
              <option v-for="(cat, index) in categories" :key="index" :value="cat.id">{{ cat.libelle }}</option>
            </select>

          </div>
          <div class="col-12">
            <textarea class="form-control" v-model="form.description" 
            :placeholder="newUpdate ? this.produit.description : 'Description du produit'" rows="4"></textarea>
          </div>

          <div class="col-md-4">
            <label for="purchaseDate" class="form-label">Date d'achat</label>
            <input type="date" class="form-control" v-model="form.date_achat" >
          </div>

          <div class="col-md-4">
            <label for="expirationDate" class="form-label">Date de péremption</label>
            <input type="date" class="form-control" v-model="form.date_peremption" > 
          </div>


          <div class="col-md-4">
            <label for="img" class="form-label">Image produit</label>
            <input ref="fileInput" type="file" id="img" accept="image/*" @change="fileSelected" />
          </div>

        </div>
        <div class="btn-group text-center">
          <button v-if="!newUpdate" @click="insertProduit" class="btn btn-primary btn-lg" type="button">Ajouter le produit</button>
          <button v-else @click="updateProduit" class="btn btn-primary btn-lg" type="button" >Modifier le produit</button>
          <button @click="closePopup" class="btn btn-danger btn-lg" type="button" >Annuler</button>
        </div>
      </form>
  </div>
</div>
</template>

<script lang="ts">
import {ref } from 'vue';
export default {
  data() {
    return {
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
  props: {
    produit: {
      type: Object,
      required: true
    },
    newUpdate: {
      type: Boolean,
      required: true
    },
    categories: {
      type: Object,
      required: true
    },
    categorie: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closePopup() {
      this.resetform();
      this.$emit('closePopup');
    },
    updateProduit() {
      this.form.id = this.produit.id
      this.$emit('updateProduit', this.form);
      this.closePopup();
    },
    insertProduit() {
      this.$emit('insertProduit', this.form);
      this.closePopup();
    },
  
    //reset formulaire
    resetform(){
      // Reset de toutes les valeurs
       this.form = {
        id : 0,
        libelle: '',
        description: '',
        prix: '',
        date_achat: '',
        date_peremption: '',
        id_cat: '',
        image: null,
      };
    },
    // récupération du fichier chargé
    fileSelected (event: Event) {
      const target = event.target as HTMLInputElement;
      const selectedFile = target.files?.[0];
      if (selectedFile) {
        this.form.image = selectedFile;
      }
    },
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 50%; /* Place le haut du pop-up au milieu de la fenêtre */
  left: 50%; /* Place la gauche du pop-up au milieu de la fenêtre */
  transform: translate(-50%, -50%); /* Centre le pop-up verticalement et horizontalement */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  max-width: 80%; /* Limitez la largeur du contenu si nécessaire */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}
</style>