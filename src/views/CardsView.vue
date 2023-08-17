<template>
  <Loader v-if="isLoading"></Loader>
  <allCards/>
</template>
<script setup lang="ts">
import Loader from '@/commonComponents/LoaderPage.vue'
import allCards from '@/components/allCards/allCards.vue'
import useApi from '@/composable/useApi'
const { isLoading } = useApi()
</script>
