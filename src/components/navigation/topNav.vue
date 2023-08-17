<template>
  <div class="nav mt-10">
    <a href="/">Home</a>
    <a href="/cards">View all cards</a>
    <a href="/search-card">Search a card</a>
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
