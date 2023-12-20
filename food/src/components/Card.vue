<template>
<div class="flex mb-12">
        <a href="#" class="group relative block overflow-hidden w-1/3 mx-10">
    <img
        :src="produit.url_image"
        alt=""
        class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
    />

    <div class="relative border border-gray-100 bg-white p-6">
        <span class="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"> New </span>

        <h3 class="mt-4 text-lg font-medium text-gray-900">Robot Toy</h3>

        <p class="mt-1.5 text-sm text-gray-700">$14.99</p>

        <form class="mt-4">
        <button
            class="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
        >
            Add to Cart
        </button>
        </form>
    </div>
  </a>

  <a href="#" class="group relative block overflow-hidden w-1/3 mx-10">
    <img
        src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
        alt=""
        class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
    />

    <div class="relative border border-gray-100 bg-white p-6">
        <span class="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"> New </span>

        <h3 class="mt-4 text-lg font-medium text-gray-900">Robot Toy</h3>

        <p class="mt-1.5 text-sm text-gray-700">$14.99</p>

        <form class="mt-4">
        <button
            class="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
        >
            Add to Cart
        </button>
        </form>
    </div>
  </a>

  <a href="#" class="group relative block overflow-hidden w-1/3 mx-10">
    <img
        src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
        alt=""
        class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
    />

    <div class="relative border border-gray-100 bg-white p-6">
        <span class="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"> New </span>

        <h3 class="mt-4 text-lg font-medium text-gray-900">Robot Toy</h3>

        <p class="mt-1.5 text-sm text-gray-700">$14.99</p>

        <form class="mt-4">
        <button
            class="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
        >
            Add to Cart
        </button>
        </form>
    </div>
  </a>
</div>

  
</template>

<script setup lang="ts">
 const name = 'Card';
</script>