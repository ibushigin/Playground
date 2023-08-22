<template>
  <Loader v-if="isLoading"></Loader>
  <div class="mt-10 mb-10" v-if="!isLoading">
    <select v-model="setModel" @change="selectSet">
      <option v-for="option in allSets" :value="option.id" :key="option.name">
        {{ option.name }}
      </option>
    </select>
    <div class="cards-container mt-10">
      <img
        v-for="(card, index) in cards"
        :key="index"
        :src="card.image_uris?.normal"
        :alt="card.name"
        class="card"
        @pointermove="interact"
        @mouseout="interactEnd"
        @click="activateCard(index)"
        :class="{ active: activeImage === index }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Loader from '@/commonComponents/LoaderPage.vue'
import { ref, onMounted } from 'vue'
import useApi from '@/composable/useApi'
import useMouse from '@/composable/useMouse'
import * as Scry from 'scryfall-sdk'
const { isLoading } = useApi()
const cards = ref<Scry.Card[]>([])
const setModel = ref<string>('')
const selectedSet = ref({} as Scry.Set)
const allSets = ref<Scry.Set[]>([])
const activeImage = ref<number>(-1)
const { interact, interactEnd } = useMouse()

const selectSet = async () => {
  isLoading.value = true
  selectedSet.value = await Scry.Sets.byId(setModel.value)
  cards.value = await selectedSet.value.getCards()
  isLoading.value = false
}
const activateCard = (index: number) => {
  console.log(index, activeImage.value)
  if (activeImage.value !== index) {
    activeImage.value = index
  } else {
    activeImage.value = -1
  }
}

onMounted(async () => {
  isLoading.value = true
  allSets.value = (await Scry.Sets.all()).filter((set) => {
    return !set.parent_set_code
  })
  isLoading.value = false
})
</script>

<style scoped lang="scss">
.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 1em;
  .card-container {
    display: flex;
    justify-content: center;
  }
  @keyframes enlargeAndFloat {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(2);
    }
  }
  .active {
    animation: enlargeAndFloat 0.5s forwards;
    z-index: 1;
  }
  .card {
    width: 50%;
    height: auto;
    justify-self: center;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
