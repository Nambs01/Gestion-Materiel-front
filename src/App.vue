<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <main data-theme="light">
    <NavBar />
    <div class="section hero is-fullheight-with-navbar is-light">
      <div class="container">
        <RouterView />
      </div>
    </div>
  </main>
</template>
