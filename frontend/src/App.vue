<template>
  <div id="app">
    <!-- Navbar com eventos para alternar entre login e signup -->
    <Navbar :navItems="navItems" ref="navbarRef" @switchToSignUp="switchToSignUp" @switchToLogin="switchToLogin" @notAuth="notAuth"/>

    <!-- Exibe o componente Login ou Signup com base na variável showSignUp -->
    <Login v-if="!showSignUp && !isAuthenticated" @handleLoginAdm="handleLoginAdm" @handleLoginUser="handleLoginUser"/>
    <SignUp @switchToLogin="switchToLogin" v-if="showSignUp && !isAuthenticated"/>
    <DashboardAdm v-if="isAuthorized" />
    <DashboardUser v-if="isAuthenticated && !isAuthorized" />

    <!-- Exibe o dashboard após o login, se autenticado -->
    <router-view v-if="isAuthenticated" /> <!-- Aqui, o Vue Router vai mostrar o Dashboard -->

    <!-- Componente de fundo comum para todas as telas -->
    <Background v-if="!isAuthenticated"/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import Navbar from './components/Navbar.vue';
import Background from './components/Background.vue';
import { useRouter } from 'vue-router'; // Para usar o Vue Router diretamente
import DashboardAdm from './components/DashboardAdm.vue';
import DashboardUser from './components/DashboardUser.vue';

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
      showSignUp: false,  // Controla a tela de login ou signup
      isAuthorized: false,
      isAuthenticated: false,  // Controla a autenticação do usuário
      navItems: [  // Lista inicial de itens de navegação
        { name: 'Home', link: '#' },
        { name: 'FAQs', link: '#' },
        { name: 'Sobre', link: '#' }
      ]
    };
  },
  methods: {
    // Alterna para a tela de signup
    switchToSignUp() {
      this.showSignUp = true;
    },
    // Alterna para a tela de login
    switchToLogin() {
      this.showSignUp = false;
    },
    // Manipula o sucesso no login
    handleLoginAdm() {
      this.isAuthenticated = true;
      this.isAuthorized = true;
      // Após 2 segundos, redireciona para o dashboard
      setTimeout(() => {
        this.navItems.splice(0, this.navItems.length);
        this.navItems.push({name: 'Home', link: "#"});
        this.navItems.push({name: 'Meus Eventos', link: "#"});
        this.navItems.push({name: 'Usuários', link: "#"});
        this.$refs.navbarRef.enter();
        this.$router.push('/dashboard-adm');  // Redireciona para o dashboard
      }, 2000);
    },
    notAuth(){
      this.isAuthenticated = false;
      this.isAuthorized = false;
      localStorage.removeItem('authToken');
      this.navItems.splice(0, this.navItems.length);
      this.navItems.push({name: 'Home', link: "#"});
      this.navItems.push({name: 'FAQs', link: "#"});
      this.navItems.push({name: 'Sobre', link: "#"});
      this.$refs.navbarRef.back();
    },

    handleLoginUser() {
      this.isAuthenticated = true;

      // Após 2 segundos, redireciona para o dashboard
      setTimeout(() => {
        this.navItems.splice(0, this.navItems.length);
        this.navItems.push({name: 'Home', link: "#"});
        this.navItems.push({name: 'Meus Eventos', link: "#"});
        this.navItems.push({name: 'FAQs', link: "#"});
        this.navItems.push({name: 'Sobre', link: "#"});
        this.$refs.navbarRef.enter();
        this.$router.push('/dashboard-user');  // Redireciona para o dashboard
      }, 2000);
    }
  }
};
</script>
