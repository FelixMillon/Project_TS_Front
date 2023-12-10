<template>
  <th scope="row">{{ cat.id }}</th>
    <td>{{ cat.libelle }}</td>
    <td>{{ cat.description }}</td>
    <td>
      <div class="d-flex justify-content-around">
        <button @click="handle_post_update(cat.id)"  type="button" class="btn btn-primary" >modifier</button>
        <button @click="handle_delete(cat.id)"  type="button" class="btn btn-danger" >supprimer</button>
        <RouterLink :to="'/gestion-produit/' + cat.id"  class="btn btn-primary">Voir les produits</RouterLink>
      </div>
    </td>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  props: {
    cat: {
      type: Object,
      required: true
    }
  },
  methods: {
    handle_post_update(id) {
      // Émettre un événement personnalisé vers le composant parent
      this.$emit('bouton-post-update', id);
    },
    handle_delete(id) {
      // Émettre un événement personnalisé vers le composant parent
      this.$emit('bouton-delete', id);
    },
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
}
</style>
