<template>
  <div class="background-container">
    <div
      v-for="(image, index) in images"
      :key="index"
      :style="{
        backgroundImage: `url(${require(`@/assets/event_imgs/${image}`)})`,
      }"
      class="background-image"
      :class="{ active: currentImageIndex === index }"
    />
  </div>
</template>

<script>
export default {
  name: "BackgroundImage",
  data() {
    return {
      images: ["Evento-Corporativo.jpg", "evento2.jpg", "evento3.jpg"],
      currentImageIndex: 0,
    };
  },
  created() {
    setInterval(this.changeBackground, 10000);
  },
  methods: {
    changeBackground() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
    },
  },
};
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}

.background-image.active {
  opacity: 1;
}
</style>
