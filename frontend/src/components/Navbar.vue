<template>
  <div class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>

        <!-- Navegação -->
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Sobre</a></li>
        </ul>

        <!-- Barra de Pesquisa -->
        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input
            type="search"
            class="form-control form-control-dark text-bg-dark"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <!-- Botões de Login e Signup -->
        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2">Login</button>
          <button 
            type="button" 
            class="btn btn-secondary" 
            @click="$emit('switchToSignUp')"> <!-- Emite o evento para o App.vue -->
            Sign-up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  mounted() {
    // Verificando se o JavaScript do Bootstrap foi carregado corretamente
    if (typeof window !== 'undefined' && window.bootstrap) {
      // Inicialização do componente de navbar caso necessário
      new window.bootstrap.Navbar(document.querySelector('.navbar'));
    }
  },
};
</script>

<style scoped>
/* Personalizações e estilo do navbar */
.navbar {
  padding: 1rem 2rem; /* Padding mais equilibrado para a navbar */
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.nav-link {
  font-size: 1.1rem; /* Aumenta o tamanho da fonte */
  font-weight: 500;
  padding: 0.5rem 1.2rem; /* Aumenta o padding para espaçamento adequado */
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav-link:hover {
  color: #0963eb; /* Cor ao passar o mouse */
  transform: scale(1.08);
}

/* Responsividade */
@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
  }
}

@media (min-width: 769px) {
  .navbar-nav {
    justify-content: space-evenly; /* Espaço equilibrado entre os itens */
  }
}
</style>