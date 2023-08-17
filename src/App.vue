<template>
  <topNav />
  <RouterView />
</template>

<script setup lang="ts">
import topNav from '@/components/navigation/topNav.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss"></style>
