<template>
  <div class="p-3 text-bg-dark fixed-top">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>

        <!-- Navegação -->
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li v-for="(item, index) in navItems" :key="index">
            <a :href="item.link" class="nav-link px-2 text-white">{{ item.name }}</a>
          </li>
        </ul>

        <!-- Botões de Login e Signup -->
        <div class="text-end">
          <button 
            type="button" 
            class="btn btn-outline-light me-2"
            @click="$emit('switchToLogin')"
            v-if="init">
            Login
          </button>
          <button 
            type="button" 
            class="btn btn-secondary" 
            @click="$emit('switchToSignUp')"
            v-if="init">
            Sign-up
          </button>
          <button
            type="button" 
            class="btn btn-danger" 
            @click="$emit('notAuth')"
            v-if="!init">
            Sair
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    navItems: {
      type: Array,
      required: true
    }
  },
  mounted() {
    if (typeof window !== 'undefined' && window.bootstrap) {
      new window.bootstrap.Navbar(document.querySelector('.navbar'));
    }
  },
  data() {
    return {
      init:true
    };
  },
  methods:{
    enter() {
      this.init = false;
    },
    back(){
      this.init = true;
    }
  }
};
</script>

<style scoped>
/* Personalizações e estilo do navbar */
.navbar {
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.nav-link {
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav-link:hover {
  color: #0963eb;
  transform: scale(1.08);
}

/* Ajustando a margem do conteúdo para evitar sobreposição com a navbar fixa */
body {
  padding-top: 80px;
}

@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
  }
}

@media (min-width: 769px) {
  .navbar-nav {
    justify-content: space-evenly;
  }
}
</style>