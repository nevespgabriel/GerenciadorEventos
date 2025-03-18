<template>
    <div class="background-container">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        :style="{
          backgroundImage: `url(${require(`@/assets/event_imgs/${image}`)})`
        }"
        class="background-image"
        :class="{'active': currentImageIndex === index}"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'BackgroundImage',
    data() {
      return {
        images: [
          'Evento-Corporativo.jpg',
          'evento2.jpg',
          'evento3.jpg',
        ],
        currentImageIndex: 0,
      };
    },
    created() {
      // Altere o intervalo para um valor maior, por exemplo, 10 segundos (10000ms)
      setInterval(this.changeBackground, 10000); // Agora a troca de imagem ocorre a cada 10 segundos
    },
    methods: {
      changeBackground() {
        // Troca a imagem de forma cíclica
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }
    }
  };
  </script>
  
  <style scoped>
  .background-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1; /* Coloca a imagem atrás do conteúdo */
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
    opacity: 0; /* As imagens começam com opacidade 0 */
    transition: opacity 4s ease-in-out; /* Transição suave com 4 segundos de duração */
  }
  
  .background-image.active {
    opacity: 1; /* Aplica opacidade 1 na imagem ativa */
  }
  </style>