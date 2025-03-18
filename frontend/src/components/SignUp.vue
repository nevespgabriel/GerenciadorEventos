<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="login-box">
        <form @submit.prevent="handleSubmit" class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <h2 class="text-center mb-4">Cadastro</h2>
  
          <!-- Campo de Nome -->
          <div class="form-floating mb-3">
            <input 
              v-model="name" 
              type="text" 
              class="form-control" 
              id="floatingName" 
              placeholder="Seu nome" 
              required
            />
            <label for="floatingName">Nome</label>
          </div>
  
          <!-- Campo de Email -->
          <div class="form-floating mb-3">
            <input 
              v-model="email" 
              type="email" 
              class="form-control" 
              id="floatingEmail" 
              placeholder="name@example.com" 
              required
            />
            <label for="floatingEmail">Email</label>
          </div>
  
          <!-- Campo de Senha -->
          <div class="form-floating mb-3">
            <input 
              v-model="password" 
              type="password" 
              class="form-control" 
              id="floatingPassword" 
              placeholder="Password" 
              required
            />
            <label for="floatingPassword">Senha</label>
          </div>
  
          <!-- Confirmar Senha -->
          <div class="form-floating mb-3">
            <input 
              v-model="confirmPassword" 
              type="password" 
              class="form-control" 
              id="floatingConfirmPassword" 
              placeholder="Confirmar Senha" 
              required
            />
            <label for="floatingConfirmPassword">Confirmar Senha</label>
          </div>
  
          <button class="w-100 btn btn-lg btn-primary" type="submit">Cadastrar</button>
          <hr class="my-4">
          <small class="text-body-secondary">Ao clicar em Cadastrar, você concorda com os termos de uso.</small>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SignUp",
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      handleSubmit() {
        if (this.password === this.confirmPassword) {
          console.log('Nome:', this.name);
          console.log('Email:', this.email);
          console.log('Senha:', this.password);
          // Realizar o processo de cadastro (como uma chamada à API)
        } else {
          console.log('As senhas não coincidem');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Caixa de cadastro mais larga */
  .login-box {
    max-width: 600px;  /* Aumentando a largura máxima */
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-floating input {
    font-size: 1rem;
  }
  
  .w-100 {
    width: 100% !important;
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
  
  hr.my-4 {
    border-color: #ddd;
  }
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  </style>