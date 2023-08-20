<template>
  <Loader v-if="isLoading"></Loader>
  <div class="mt-10 mb-10" v-if="!isLoading">
    <select v-model="setModel" @change="test">
      <option v-for="option in allSets" :value="option.id" :key="option.name">
        {{ option.name }}
      </option>
    </select>
    <div class="cards-container mt-10">
      <div v-for="(card, key) in cards" :key="key" class="card-container">
        <img
          :src="card.image_uris?.normal"
          :alt="card.name"
          class="card"
          @pointermove="interact"
          @mouseout="interactEnd"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Loader from '@/commonComponents/LoaderPage.vue'
import { ref, onMounted, type Ref } from 'vue'
import useApi from '@/composable/useApi'
import useMouse from '@/composable/useMouse'
import * as Scry from 'scryfall-sdk'
const { isLoading } = useApi()
const cards = ref<Scry.Card[]>([])
const setModel = ref('')
const selectedSet = ref({} as Scry.Set)
const allSets = ref<Scry.Set[]>([])
const { interact, interactEnd } = useMouse()

const test = async () => {
  isLoading.value = true
  selectedSet.value = await Scry.Sets.byId(setModel.value)
  cards.value = await selectedSet.value.getCards()
  isLoading.value = false
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 1em;
  .card-container {
    display: flex;
    justify-content: center;
  }
  .card {
    width: 50%;
    height: auto;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
