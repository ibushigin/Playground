<template>
  <div class="loader-container">
    <div class="loader">
      <div class="ball magic-swamp-bg"></div>
      <div class="ball magic-mountain-bg"></div>
      <div class="ball magic-forest-bg"></div>
      <div class="ball magic-plain-bg"></div>
      <div class="ball magic-island-bg"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped lang="scss">
.loader-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.loader {
  width: 500px;
  height: 500px;
  position: relative;
  .ball {
    border: 6px black solid;
    border-radius: 50%;
    height: 15%;
    width: 15%;
    padding: 5px;
    position: absolute;
    transform: translate(-50%, -50%) scale(1);
    animation: pulse 2s infinite;
    &:first-child {
      top: 15%;
      left: 50%;
    }
    &:nth-child(2) {
      left: 85%;
      top: 45%;
    }
    &:nth-child(3) {
      top: 85%;
      left: 75%;
    }
    &:nth-child(4) {
      top: 85%;
      left: 25%;
    }
    &:nth-child(5) {
      left: 15%;
      top: 45%;
    }
  }
}

.icon {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: translate(-50%, -50%) scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
