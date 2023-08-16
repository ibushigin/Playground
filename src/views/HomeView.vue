<template>
  <Loader v-if="cardsLoading"></Loader>
  <div class="cards-container mt-10" v-if="!cardsLoading">
    <div v-for="(card, key) in cards" :key="key" class="card-container">
      <div class="card" @pointermove="interact" @mouseout="interactEnd">
        <img :src="card.imageUrl" :alt="card.name" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, type Ref } from 'vue'
import type { ICard } from '@/interface/ICards'
import Loader from '@/commonComponents/LoaderPage.vue'
import { mtgEndPoints } from '@/enum/mtgApiEnum'

const cards: Ref<ICard[]> = ref([])
const cardsLoading: Ref<boolean> = ref(true)
const imagesLoaded = ref(0)
const interact = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const rect = target.getBoundingClientRect()
  const absolute = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}
const interactEnd = () => {}

const fetchCards = async () => {
  try {
    const response = await axios.get(`${mtgEndPoints.url}${mtgEndPoints.getCards}`)
    cards.value = response.data.cards.filter((card: ICard) => 'imageUrl' in card)
    loadImages()
  } catch (error) {
    console.error(error)
  }
}
const loadImages = () => {
  cards.value.forEach((obj) => {
    const image = new Image()
    image.src = obj.imageUrl
    image.onload = () => {
      imagesLoaded.value++
      if (imagesLoaded.value === cards.value.length) {
        cardsLoading.value = false
      }
    }
  })
}
onMounted(() => {
  fetchCards()
})
</script>

<style scoped lang="scss">
.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 1em;
  .card-container {
    justify-self: center;
  }
  .card {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
