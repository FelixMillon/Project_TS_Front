<template>
  <table>
    <thead>
      <tr>
        <th v-for="category in categories" :key="category.category">
          {{ category.category }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for="category in categories" :key="category.category">
          <ul>
            <li v-for="product in category.products" :key="product.id_pro">
              <a href="#">
                {{ product.libelle }} - {{ product.prix }}€
              </a>
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { useCategoriesLogic } from "../components/controllers/CategoriesController";

export default {
  name: 'CategorieVue',
  data() {
    return {
      categories: useCategoriesLogic()
    };
  },
};
</script>

<style scoped>
  @import '../assets/tableStyles.css';

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
