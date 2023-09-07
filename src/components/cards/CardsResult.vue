<template>
  <Loader v-if="isLoading"></Loader>
  <div class="mt-10 mb-10" v-if="!isLoading">
    <select v-model="setModel" @change="selectSet">
      <option v-for="option in allSets" :value="option.id" :key="option.name">
        {{ option.name }}
      </option>
    </select>
    <div class="card-container">
      <div
        ref="cardRef"
        class="card mt-10"
        v-for="(card, index) in cards"
        :key="index"
        :class="{ active: activeImage === index }"
        @pointermove="interact"
        @mouseout="interactEnd"
        @click="activateCard(index)"
      >
        <img :src="card.image_uris?.normal" :alt="card.name" class="card-recto" />
        <img :src="verso" alt="back print" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import verso from '@/assets/img/card-verso.jpg'
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
const cardRef = ref<HTMLInputElement[]>([])
const cardCenteredTop = ref<string>()
const cardCenteredLeft = ref<string>()

const { interact, interactEnd } = useMouse()

const getCardPosition = (index: number) => {
  cardCenteredTop.value = `${
    (window.innerHeight - 354) / 2 - cardRef.value[index].getBoundingClientRect().top
  }px`
  cardCenteredLeft.value = `${
    (window.innerWidth - 250) / 2 - cardRef.value[index].getBoundingClientRect().left
  }px`
  console.log(cardRef.value[index].getBoundingClientRect().top, window.innerHeight)
}

const selectSet = async () => {
  isLoading.value = true
  selectedSet.value = await Scry.Sets.byId(setModel.value)
  cards.value = await selectedSet.value.getCards()
  isLoading.value = false
}
const activateCard = (index: number) => {
  if (activeImage.value !== index) {
    activeImage.value = index
    getCardPosition(index)
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
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  row-gap: 1em;
  justify-items: center;
  justify-content: space-between;
}
.card {
  width: 250px;
  height: 354px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: 2s;

  &:hover {
    cursor: pointer;
  }
  img {
    width: 250px;
    height: 354px;
    position: absolute;
    backface-visibility: hidden;
    transition: 1.5s;
    border-radius: 3%;
    &:nth-child(2) {
      transform: rotateY(180deg);
    }
  }
}
.card.active {
  transform: translateY(v-bind(cardCenteredTop)) translateX(v-bind(cardCenteredLeft)) scale(2);
  position: sticky;
  z-index: 1;
  img:nth-child(2) {
    transform: rotateY(-180deg);
  }
  img:nth-child(1) {
    transform: rotateY(-360deg);
  }
}
</style>
