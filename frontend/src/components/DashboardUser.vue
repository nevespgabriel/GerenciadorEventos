<template>
  <div class="container mt-5">
    <!-- Título -->
    <div class="row mb-4">
      <div class="col-md-12 text-center">
        <h1 class="display-4" v-if="!registrations">Eventos Disponíveis</h1>
        <h1 class="display-4" v-if="registrations">Inscrições</h1>
      </div>
    </div>

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

    <hr />

    <div class="row">
      <div
        v-for="event in filteredEvents"
        :key="event.id"
        class="col-md-4 mb-4"
      >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ event.name }}</h5>
            <p class="card-text">Local: {{ event.location }}</p>
            <p class="card-text" v-if="!registrations">
              Capacidade: {{ event.capacity }}
            </p>
            <p class="card-text" v-if="registrations">
              Status: {{ event.eventStatus }}
            </p>
            <p class="card-text">
              Data e Hora: {{ formatDate(event.datetime) }}
            </p>

            <div class="d-flex justify-content-end">
              <button
                class="btn btn-success"
                @click="enroll(event.id)"
                v-if="!registrations"
              >
                Inscrever-se
              </button>
              <button
                class="btn btn-danger"
                @click="cancel(event.event.id)"
                v-if="registrations"
              >
                Cancelar Inscrição
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
      events: [],
      searchTerm: "",
      registrations: false,
    };
  },
  computed: {
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
    async showForUser() {
      this.registrations = true;
      try {
        const token = localStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const response = await axios.get(
          `http://localhost:3000/registration/${decodedToken.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const regists = response.data;
        const filteredEvents = [];

        for (const regist of regists) {
          try {
            if (regist.status != "canceled") {
              regist.name = regist.event.name;
              regist.location = regist.event.location;
              regist.datetime = regist.event.datetime;
              regist.eventStatus = regist.event.status;
              filteredEvents.push(regist);
            }
          } catch (err) {
            alert("Erro ao buscar inscrições.");
          }
        }

        this.events = filteredEvents;
      } catch (error) {
        console.error("Erro ao buscar eventos inscritos:", error);
      }
    },
    async fetchOpenEvents() {
      this.registrations = false;
      try {
        const token = localStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const response = await axios.get("http://localhost:3000/event/open", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const events = response.data;
        const filteredEvents = [];

        for (const event of events) {
          try {
            console.log(event);
            const registrationResponse = await axios.get(
              `http://localhost:3000/registration/${event.id}/${decodedToken.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const registration = registrationResponse.data;

            if (!registration || registration.status != "confirmed") {
              filteredEvents.push(event);
            }
          } catch (err) {
            if (err.response && err.response.status === 404) {
              filteredEvents.push(event);
            } else {
              console.error("Erro ao verificar inscrição:", err);
            }
          }
        }

        this.events = filteredEvents;
      } catch (error) {
        console.error("Erro ao buscar eventos abertos:", error);
      }
    },

    async enroll(eventId) {
      try {
        const token = localStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        const registrationResponse = await axios.get(
          `http://localhost:3000/registration/${eventId}/${decodedToken.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        const registration = registrationResponse.data;
        if (!registration) {
          await axios.post(
            `http://localhost:3000/registration`,
            {
              idUser: decodedToken.id,
              idEvent: eventId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          await axios.put(
            `http://localhost:3000/registration/${eventId}/${decodedToken.id}`,
            {
              status: "confirmed",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        alert("Inscrição realizada com sucesso!");
        this.fetchOpenEvents();
      } catch (error) {
        alert("Erro ao se inscrever no evento");
      }
    },
    async cancel(eventId) {
      try {
        const token = localStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        await axios.put(
          `http://localhost:3000/registration/${eventId}/${decodedToken.id}`,
          {
            status: "canceled",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Inscrição cancelada com sucesso!");
        this.showForUser();
      } catch (error) {
        alert("Erro ao cancelar inscrição!");
      }
    },

    formatDate(datetime) {
      const date = new Date(datetime);
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleString("pt-BR", options);
    },
  },
  mounted() {
    this.fetchOpenEvents();
  },
};
</script>

<style scoped>

.container {
  padding-top: 7rem;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  color: #343a40;
}

.input-group {
  max-width: 600px;
  margin: 0 auto;
}

h5 {
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
