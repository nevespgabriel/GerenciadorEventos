<template>
  <div id="app">
    <Navbar @switchToSignUp="switchToSignUp" />
    <Login v-if="!showSignUp" />
    <SignUp v-if="showSignUp" />
    <Background />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue'; 
import Navbar from './components/Navbar.vue';
import Background from "./components/Background.vue";

export default {
  name: 'App',
  components: {
    Login,
    SignUp,
    Navbar,
    Background
  },
  data() {
    return {
      showSignUp: false,  // Variável que controla qual componente exibir
    };
  },
  methods: {
    switchToSignUp() {
      this.showSignUp = true;
    },
  },
};
</script>
