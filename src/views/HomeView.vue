<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import type { ICard } from '/interface/ICards'

const cards = ref()
const fetchCards = async () => {
  try {
    const response = await axios.get('https://api.magicthegathering.io/v1/cards')
    cards.value = response.data.cards
    console.log(cards.value)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchCards()
})
</script>

<template>
  <div v-for="(card key) in cards" :key="key">
    <img v-if="card.imageUrl" :src="card.imageUrl" :alt="card.name" />
  </div>
</template>
