<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="login-box">
      <form @submit.prevent="handleSubmit" class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
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

        <!-- Campo de CPF -->
        <div class="form-floating mb-3">
          <input 
            v-model="cpf" 
            type="text" 
            class="form-control" 
            id="floatingCPF" 
            placeholder="000.000.000-00" 
            required
          />
          <label for="floatingCPF">CPF</label>
          <small v-if="cpfError" class="text-danger">{{ cpfError }}</small>
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
          <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
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
          <small v-if="confirmPasswordError" class="text-danger">{{ confirmPasswordError }}</small>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Cadastrar</button>

        <hr class="my-4">
        <small class="text-body-secondary">Ao clicar em Cadastrar, você concorda com os termos de uso.</small>

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
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "SignUp",
    data() {
      return {
        name: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: '',
        cpfError: '',
        passwordError: '',
        confirmPasswordError: '',
        successMessage: '',  // Mensagem de sucesso
        errorMessage: ''     // Mensagem de erro
      };
    },
    methods: {
      validateCPF(cpf) {
        const cpfRegex = /^(?!000\.000\.000\-00)(?!111\.111\.111\-11)(?!222\.222\.222\-22)(?!333\.333\.333\-33)(?!444\.444\.444\-44)(?!555\.555\.555\-55)(?!666\.666\.666\-66)(?!777\.777\.777\-77)(?!888\.888\.888\-88)(?!999\.999\.999\-99)\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfRegex.test(cpf);
      },
      validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
      },
      async handleSubmit() {
        // Resetando erros e mensagens
        this.cpfError = '';
        this.passwordError = '';
        this.confirmPasswordError = '';
        this.successMessage = '';
        this.errorMessage = '';
  
        // Validando CPF
        if (!this.validateCPF(this.cpf)) {
          this.cpfError = 'O CPF deve ser válido no formato XXX.XXX.XXX-XX e não pode ser um CPF inválido ou repetido.';
          return;
        }
  
        // Validando Senha
        if (!this.validatePassword(this.password)) {
          this.passwordError = 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.';
          return;
        }
  
        // Confirmando se as senhas batem
        if (this.password !== this.confirmPassword) {
          this.confirmPasswordError = 'As senhas não coincidem.';
          return;
        }
  
        // Dados para envio
        const newUser = {
          name: this.name,
          cpf: this.cpf,
          email: this.email,
          password: this.password
        };
  
        try {
          // Enviar requisição para a rota /signup usando axios
          console.log(newUser);
          const response = await axios.post('http://localhost:3000/user/signup', newUser);
          console.log("FOI");
          // Exibir mensagem de sucesso
          this.successMessage = 'Cadastro realizado com sucesso!';
  
          // Após 2 segundos, redirecionar para a tela de login
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000); // Redireciona após 2 segundos
  
        } catch (error) {
          console.error('Erro no cadastro:', error.response ? error.response.data : error.message);
          this.errorMessage = 'Erro ao cadastrar. Tente novamente.';
        }
      }
    }
  }
  </script>
  
  
  <style scoped>
/* Espaço abaixo da navbar fixa */
body {
  padding-top: 180px; /* Altura aproximada da navbar */
}

.login-box {
  max-width: 600px;  /* Aumentando a largura máxima */
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 12rem 0rem 0rem 0rem; /* Espaço abaixo do formulário */
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