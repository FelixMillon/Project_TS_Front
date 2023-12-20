<template>
    <div class="col-md-4">
      <div class="card text-center">
        <img :src="data.url_image" class="card-img-top" width="100" alt="Image 1">
        <div class="card-body">
          <h5 class="card-title">{{ data.libelle }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ data.prix }} euros</h6>
          <p class="card-text">{{ data.description }}</p>
          <div class="btn-group">
            <button @click="handle_post_update(data.id)"  type="button" class="btn btn-primary">Modifier</button>
            <button @click="handle_delete(data.id)"  type="button" class="btn btn-danger">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    handle_post_update(id) {
      this.$emit('bouton-post-update', id);
    },
    handle_delete(id) {
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
