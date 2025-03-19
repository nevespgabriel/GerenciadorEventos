<template>
    <div class="container mt-5">
      <!-- Título -->
      <div class="row mb-4">
        <div class="col-md-12 text-center">
          <h1 class="display-4">Eventos Disponíveis</h1>
        </div>
      </div>
      
      <!-- Barra de Pesquisa -->
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="input-group">
            <input
              v-model="searchTerm"
              type="text"
              class="form-control"
              placeholder="Pesquisar eventos"
            />
            <button @click="searchEvents" class="btn btn-primary" type="button">
              Buscar
            </button>
          </div>
        </div>
      </div>
  
      <hr>
      
      <!-- Seção de Eventos -->
      <div class="row">
        <div v-for="event in filteredEvents" :key="event.id" class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ event.name }}</h5>
              <p class="card-text">Local: {{ event.location }}</p>
              <p class="card-text">Capacidade: {{ event.capacity }}</p>
              <p class="card-text">Data e Hora: {{ formatDate(event.datetime) }}</p>
              
              <!-- Botão de Inscrever-se -->
              <div class="d-flex justify-content-end">
                <button class="btn btn-success" @click="enroll(event.id)">
                  Inscrever-se
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { jwtDecode } from "jwt-decode";
  export default {
    data() {
      return {
        events: [], // Lista de eventos abertos
        searchTerm: '', // Termo de pesquisa
      };
    },
    computed: {
      // Filtrar eventos com base no termo de pesquisa
      filteredEvents() {
        if (this.searchTerm) {
          return this.events.filter((event) =>
            event.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }
        return this.events;
      },
    },
    methods: {
      // Buscar eventos abertos pela rota /event/open
      async fetchOpenEvents() {
        try {
            const token = localStorage.getItem('authToken');
            const decodedToken = jwtDecode(token);
            const response = await axios.get('http://localhost:3000/event/open', {
            headers: {
                Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
            },
            });

            const events = response.data; // Lista de eventos abertos
            const filteredEvents = [];

            console.log("ate´")
            for (const event of events) {
            try {
                // Verifica se o usuário já está inscrito no evento
                const registrationResponse = await axios.get(`http://localhost:3000/registration/${event.idEvent}/${decodedToken.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho para verificar a inscrição
                },
                });

                const registration = registrationResponse.data;

                // Se a inscrição não for encontrada ou não for ativa, mantém o evento na lista
                if (!registration || !registration.isActive) {
                filteredEvents.push(event);
                }

            } catch (err) {
                if (err.response && err.response.status === 404) {
                // Se a inscrição não for encontrada (404), o evento deve ser mantido na lista
                filteredEvents.push(event);
                } else {
                console.error('Erro ao verificar inscrição:', err);
                }
            }
            }

            this.events = filteredEvents; // Define a lista de eventos filtrados

        } catch (error) {
            console.error('Erro ao buscar eventos abertos:', error);
        }
    },
  
      // Inscrição em evento
      async enroll(eventId) {
        try {
          const token = localStorage.getItem('authToken');
          const decodedToken = jwtDecode(token);
          await axios.post(
            `http://localhost:3000/registration`,
            {
                idUser: decodedToken.id,
                idEvent: eventId
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Inscrição realizada com sucesso!");
        } catch (error) {
          console.error('Erro ao se inscrever no evento:', error);
        }
      },
  
      // Função para formatar a data e hora
      formatDate(datetime) {
        const date = new Date(datetime);
        const options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        };
        return date.toLocaleString('pt-BR', options);
      },
    },
    mounted() {
      this.fetchOpenEvents();
    },
  };
  </script>
  
  <style scoped>
  /* Estilos customizados */
  .container {
    padding-top: 7rem;
  }
  
  /* Estilos do título */
  h1 {
    font-size: 3rem;
    font-weight: bold;
    color: #343a40;
  }
  
  /* Barra de pesquisa */
  .input-group {
    max-width: 600px;
    margin: 0 auto;
  }
  
  h5{
        margin-bottom: 1.2rem;
        font-weight: 600;
    }

  hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 768px) {
    .container {
      padding-top: 12rem;
    }
  
    h1 {
      font-size: 2.5rem;
    }
  }
  </style>