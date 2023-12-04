<template>
  <h4 class="mb-3 text-center">Ajouter un produit</h4>
  <form @submit.prevent="submit">
    <div class="row g-3">
      <div class="col-4">
        <input type="text" class="form-control" v-model="form.libelle" id="productName" :placeholder="newupdate ? this.produit.libelle : 'Nom du produit'" >
      </div>
      <div class="col-md-4">
        <input type="number" class="form-control" v-model="form.prix" id="productPrice" :placeholder="newupdate ? this.produit.prix : 'Prix'"  >
      </div>
      <div class="col-md-4">
        <select class="form-select" v-model="form.id_cat">
          <option value="">{{ newupdate ? this.categorie.libelle : 'Choisir' }}</option> 
          <option v-for="(cat, index) in categories" :key="index" :value="cat.id">{{ cat.libelle }}</option>
        </select>

      </div>
      <div class="col-12">
        <textarea class="form-control" v-model="form.description" id="productDescription"
         :placeholder="newupdate ? this.produit.description : 'Description du produit'" rows="4"></textarea>
      </div>

      <div class="col-md-4">
        <label for="purchaseDate" class="form-label">Date d'achat</label>
        <input type="date" class="form-control" v-model="form.date_achat" id="purchaseDate" >
      </div>

      <div class="col-md-4">
        <label for="expirationDate" class="form-label">Date de péremption</label>
        <input type="date" class="form-control" v-model="form.date_peremption" id="expirationDate"> 
      </div>


      <div class="col-md-4">
        <label for="img" class="form-label">Image produit</label>
        <input ref="fileInput" type="file" id="img" accept="image/*" @change="fileSelected" />
      </div>

    </div>
    <div class="btn-group text-center">
      <button v-if="!newupdate" class="btn btn-primary btn-lg" type="submit">Ajouter le produit</button>
      <button v-if="newupdate" @click="this.update()" class="btn btn-primary btn-lg" type="button" >Modifier le produit</button>
      <button @click="this.resetform()" class="btn btn-danger btn-lg" type="button" >Annuler</button>
    </div>


  </form>


  <div class="row">
    <h4 class="mb-3 text-center">Les produits</h4>

    <div v-for="(produit, index) in produits" :key="index" class="col-md-4">
      <div class="card text-center">
        <img :src="produit.url_image" class="card-img-top" width="100" alt="Image 1">
        <div class="card-body">
          <h5 class="card-title">{{ produit.libelle }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ produit.prix }} euros</h6>
          <p class="card-text">{{ produit.description }}</p>
          <div class="btn-group">
            <button @click="this.post_update(produit.id)"  type="button" class="btn btn-primary">Modifier</button>
            <button @click="this.delete(produit.id)"  type="button" class="btn btn-danger">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>



<script lang="ts">
import {ref } from 'vue';
import axios from 'axios';

export default {
  data() {

    return {
      newupdate : false,
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
    }
  },
  methods: {
    async submit() {
      try{
        // Envoie du formulaire produit avec l'image
        await axios.post('http://localhost:3000/api/produit/add/', this.form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        console.error('Erreur lors de envois des données produits', error);
      }
      // Refresh et reset forumlaire
      this.AllProducts();
      this.resetform();
    },
    fileSelected (event: Event) {
      const target = event.target as HTMLInputElement;
      const selectedFile = target.files?.[0];
      if (selectedFile) {
        this.form.image = selectedFile;
      }
    }, 
    async post_update(id: number) {
      // Recuperation de l'objet produit demander
      try {
        await axios.get(`http://localhost:3000/api/produit/get-by-id/${id}/`).then(response => {
          this.produit = response.data;
          console.log(this.produit)
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
      this.newupdate = true;
    },
    async update() {
      try {
        // Envoie du formulaire produit avec l'image
        this.form.id = this.produit.id
       // console.log(this.form)
        await axios.put('http://localhost:3000/api/produit/update/', this.form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        console.error('Erreur lors de envois des données produits', error);
      }
      // Refresh et reset forumlaire
      this.AllProducts();
      this.resetform();
    },
    async delete(id: number) {
      await axios.delete(`http://localhost:3000/api/produit/delete/${id}/`);
      this.AllProducts();
    },
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
      
      this.newupdate = false;
      this.produit = {};
    },
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
