<template>
  <h4 class="mb-3 text-center">Ajouter une categorie</h4>
  <form @submit.prevent="submit">
    <div class="row g-3">

      <div class="col-12">
        <input type="text" class="form-control" v-model="form.libelle" id="productName"
          :placeholder="newupdate ? this.categorie.libelle : 'Libelle catégorie'">
      </div>
    
      <div class="col-12">
        <textarea class="form-control" v-model="form.description" id="productDescription"
          :placeholder="newupdate ? this.categorie.description : 'Description catégorie'" rows="4"></textarea>
      </div>

    </div>
    <div class="btn-group text-center">
      <button v-if="!newupdate" class="btn btn-primary btn-lg" type="submit">Ajouter une catégorie</button>
      <button v-if="newupdate" @click="this.update()" class="btn btn-primary btn-lg" type="button">Modifier la catégorie</button>
      <button @click="this.resetform()" class="btn btn-danger btn-lg" type="button">Annuler</button>
    </div>

  </form>


  <div class="row">
    <h4 class="mb-3 text-center">Les catégories</h4>

    <table class="table">
    <thead>
      <tr  >
        <th scope="col">#</th>
        <th scope="col">libelle</th>
        <th scope="col">description</th>
        <th scope="col" class="text-center">Action</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">

      <tr v-for="(cat, index) in categories" :key="index">
        <th scope="row">{{ cat.id }}</th>
        <td>{{ cat.libelle }}</td>
        <td>{{ cat.description }}</td>
        <td>
          <div class="d-flex justify-content-around">
            <button @click="this.post_update(cat.id)"  type="button" class="btn btn-primary" >modifier</button>
            <button @click="this.delete(cat.id)"  type="button" class="btn btn-danger" >supprimer</button>
          </div>
         
        </td>
      </tr>

    </tbody>
  </table>



  </div>
</template>



<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';

export default {

  data() {

    return {
      newupdate: false,
      categories: [],
      categorie: {},
      form: {
        id: 0,
        libelle: '',
        description: ''
      }
    }
  },
  methods: {
    async submit() {
      try {
        // Envoie du formulaire produit avec l'image
        await axios.post('http://localhost:3000/api/categorie_produit/add/', this.form);
      } catch (error) {
        console.error('Erreur lors de envois des données produits', error);
      }
      // Refresh et reset forumlaire
      this.AllCategory();
      this.resetform();
    },
    async post_update(id: number) {
      // Recuperation de l'objet produit demander

      try {
        await axios.get(`http://localhost:3000/api/categorie_produit/get-by-id/${id}/`).then(response => {
          this.categorie = response.data;
        })
      } catch (error) {
        console.error('Erreur lors de envois de la réception des produits', error);
      }
      this.form.id = id;
      this.newupdate = true;
    },
    async update() {
      try {
        // Envoie du formulaire produit avec l'image
        // this.form.id = this.categorie.id
        console.log(this.form)
        await axios.put('http://localhost:3000/api/categorie_produit/update/', this.form);
      } catch (error) {
        console.error('Erreur lors de envois des données produits', error);
      }
      // Refresh et reset forumlaire
      this.AllCategory();
      this.resetform();
    },
    async delete(id: number) {
      await axios.delete(`http://localhost:3000/api/categorie_produit/delete/${id}/`);
      this.AllCategory();
    },
    resetform() {
      // Reset de toutes les valeurs
      this.form = {
        id: 0,
        libelle: '',
        description: ''
      };

      this.newupdate = false;
      this.categorie = {};
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
