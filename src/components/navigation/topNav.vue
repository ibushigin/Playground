<template>
  <div class="nav mt-10">
    <router-link to="/">Home</router-link>
    <router-link to="/set">View a set</router-link>
    <router-link to="/search-card">Search a card</router-link>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.nav {
  display: flex;
  flex-direction: row;
  gap: 2em;
  a {
    font-style: normal;
    text-decoration: none;
  }
}
</style>
