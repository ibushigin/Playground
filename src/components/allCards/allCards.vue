<template>
  <div class="cards-container mt-10" v-if="!isLoading">
    <div v-for="(card, key) in cards" :key="key" class="card-container">
      <div class="card" @pointermove="interact" @mouseout="interactEnd">
        <img :src="card.image_uris.normal" :alt="card.name" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useApi from '@/composable/useApi'
import useMouse from '@/composable/useMouse'
import * as Scry from 'scryfall-sdk'
const { isLoading } = useApi()
const cards = ref()
const set = ref()
const { interact, interactEnd } = useMouse()

onMounted(async () => {
  set.value = await Scry.Sets.byCode('40k')
  cards.value = await set.value.getCards()
  console.log(cards.value)
})
</script>

<style scoped lang="scss">
.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 1em;
  .card-container {
    justify-self: center;
  }
  .card {
    img {
      width: 50%;
      height: auto;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
