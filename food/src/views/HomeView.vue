<template>
  <div class="flex flex-col items-center justify-center">
    <form @submit="submit" style="width: 650px" class="flex flex-col space-y-5 px-5 py-14">
      <input @change="fileSelected" type="file" accept="image/*"/>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const file = ref<File | null>(null);
    const caption = ref('');

    const submit = async (event: Event) => {
      event.preventDefault();

      if (!file.value) {
        return;
      }

      const formData = new FormData();
      formData.append('image', file.value);

      await axios.post('http://localhost:3000/api/produit/add/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    };

    const fileSelected = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const selectedFile = target.files?.[0];

      if (selectedFile) {
        file.value = selectedFile;
      }
    };

    return {
      caption,
      submit,
      fileSelected,
    };
  },
});
</script>

<style scoped>
</style>