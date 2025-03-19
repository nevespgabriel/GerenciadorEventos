<template>
  <div class="container col-xl-10 col-xxl-8 px-4 py-5 mt-5">
    <div class="row align-items-center g-lg-5 py-5">
      <!-- Texto à esquerda -->
      <div class="col-lg-7 text-center text-lg-start custom-box">
        <h1 class="display-4 fw-bold lh-1 mb-3">Seu evento, sua conexão</h1>
        <p class="col-lg-10 fs-4">Conecte-se, organize e viva os melhores eventos com nossa plataforma.</p>
      </div>

      <!-- Formulário de login à direita -->
      <div class="col-md-10 mx-auto col-lg-5 login-box">
        <form @submit.prevent="handleSubmit" class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <div class="form-floating mb-3">
            <input 
              v-model="email" 
              type="email" 
              class="form-control" 
              id="floatingInput" 
              placeholder="name@example.com" 
              required
            />
            <label for="floatingInput">Email address</label>
          </div>

          <div class="form-floating mb-3">
            <input 
              v-model="password" 
              type="password" 
              class="form-control" 
              id="floatingPassword" 
              placeholder="Password" 
              required
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" v-model="rememberMe" value="remember-me"> Remember me
            </label>
          </div>

          <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
          <hr class="my-4">
          <small class="text-body-secondary">By clicking Login, you agree to the terms of use.</small>

          <!-- Exibindo Mensagem de Sucesso ou Erro -->
          <div v-if="successMessage" class="alert alert-success mt-3">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="alert alert-danger mt-3">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export default {
  name: "LoginPage",
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      successMessage: '',  // Mensagem de sucesso
      errorMessage: ''     // Mensagem de erro
    };
  },
  methods: {
    async handleSubmit() {
      // Resetando mensagens
      this.successMessage = '';
      this.errorMessage = '';

      // Dados de login
      const userCredentials = {
        email: this.email,
        password: this.password,
      };

      try {
        // Enviar requisição para a rota /login usando axios
        const response = await axios.post('http://localhost:3000/user/login', userCredentials);
        localStorage.setItem('authToken', response.data.token);

        // Exibir mensagem de sucesso
        this.successMessage = 'Login realizado com sucesso!';

        const decodedToken = jwtDecode(response.data.token);
        console.log("Decoded.");
        const userRole = decodedToken.role;  // Aqui você obtém a role do usuário a partir do token

        // Após 2 segundos, redirecionar para o dashboard ou outra página com base na role
        setTimeout(() => {

          // Se o usuário for admin, redireciona para a área de admin
          if (userRole === 'admin') {
            this.$emit('handleLoginAdm');  // Substitua com sua rota de admin
          } else {
            this.$emit('handleLoginUser');   // Substitua com sua rota de usuário normal
          }
        }, 2000);

      } catch (error) {
        console.error('Erro no login:', error.response ? error.response.data : error.message);
        this.errorMessage = 'Erro ao realizar login. Verifique suas credenciais e tente novamente.';
      }
    }
  }
}
</script>
  
  <style scoped>
  /* Estilização personalizada do formulário */
  .form-floating input {
    font-size: 1rem;
  }
  
  .w-100 {
    width: 100% !important;
  }
  
  .checkbox label {
    font-size: 0.9rem;
  }
  
  hr.my-4 {
    border-color: #ddd;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
  }
  
  .bg-body-tertiary {
    background-color: #f8f9fa;
  }
  
  .text-body-emphasis {
    color: #343a40;
  }
  
  /* Estilizando o texto à esquerda (h1 e p) */
  h1 {
    color: white; /* Cor branca */
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); /* Sombras suaves no texto */
    font-weight: 700; /* Peso da fonte mais forte */
  }
  
  p {
    color: white; /* Cor branca */
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3); /* Sombras suaves no texto */
    font-size: 1.25rem; /* Tamanho da fonte um pouco maior */
    line-height: 1.5; /* Melhor espaçamento entre as linhas */
  }
  
  .login-box {
    margin-top: 7rem;
  }

  .custom-box {
  background-color: rgba(20, 20, 20, 0.65); /* Fundo preto com 70% de opacidade */
  padding: 2rem; /* Adiciona espaçamento interno */
  border-radius: 15px; /* Bordas arredondadas */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Sombra sutil para dar profundidade */
}

.custom-box h1,
.custom-box p {
  color: white; /* Torna o texto branco */
}
  </style>
  
  
  