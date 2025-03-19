<template>
  <div class="container col-xl-10 col-xxl-8 px-4 py-5 mt-5">
    <div class="row align-items-center g-lg-5 py-5">
      <div class="col-lg-7 text-center text-lg-start custom-box">
        <h1 class="display-4 fw-bold lh-1 mb-3">Seu evento, sua conexão</h1>
        <p class="col-lg-10 fs-4">
          Conecte-se, organize e viva os melhores eventos com nossa plataforma.
        </p>
      </div>
      <div class="col-md-10 mx-auto col-lg-5 login-box">
        <form
          @submit.prevent="handleSubmit"
          class="p-4 p-md-5 border rounded-3 bg-body-tertiary"
        >
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
              <input type="checkbox" v-model="rememberMe" value="remember-me" />
              Remember me
            </label>
          </div>

          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>
          <hr class="my-4" />
          <small class="text-body-secondary"
            >By clicking Login, you agree to the terms of use.</small
          >
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
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.successMessage = "";
      this.errorMessage = "";
      const userCredentials = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/user/login",
          userCredentials
        );
        this.successMessage = "Login realizado com sucesso!";
        const decodedToken = jwtDecode(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        console.log("Decoded.");
        const userRole = decodedToken.role;
        setTimeout(() => {
          if (userRole === "admin") {
            this.$emit("handleLoginAdm");
          } else {
            this.$emit("handleLoginUser");
          }
        }, 2000);
      } catch (error) {
        console.error(
          "Erro no login:",
          error.response ? error.response.data : error.message
        );
        this.errorMessage =
          "Erro ao realizar login. Verifique suas credenciais e tente novamente.";
      }
    },
  },
};
</script>

<style scoped>
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

h1 {
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  font-weight: 700;
}

p {
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  font-size: 1.25rem;
  line-height: 1.5;
}

.login-box {
  margin-top: 7rem;
}

.custom-box {
  background-color: rgba(20, 20, 20, 0.65);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.custom-box h1,
.custom-box p {
  color: white;
}
</style>
