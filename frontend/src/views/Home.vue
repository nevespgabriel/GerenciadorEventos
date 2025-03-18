<template>
  <div>
    <Navbar />
    <h1>Bem-vindo à Home</h1>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
  }
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-top: 20px;
}
</style>