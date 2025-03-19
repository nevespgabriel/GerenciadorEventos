<template>
    <div class="container mt-5">
      <!-- Barra de Pesquisa e Botão Criar Evento -->
      <div class="row mb-4">
        <!-- Barra de Pesquisa -->
        <div class="col-md-8">
          <div class="input-group">
            <input
              v-model="searchTerm"
              type="text"
              class="form-control"
              placeholder="Pesquisar eventos"
            />
            <button
              @click="searchEvents"
              class="btn btn-primary"
              type="button"
            >
              Buscar
            </button>
          </div>
        </div>
        <!-- Botão Criar Evento -->
        <div class="col-md-4 text-md-end mt-3 mt-md-0">
            <button @click="showModal = true" class="btn btn-success">Criar Evento</button>
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
              <p
                class="card-text"
                :class="{
                  'text-success': event.status === 'open',
                  'text-danger': event.status === 'canceled',
                  'text-warning': event.status === 'completed',
                  'text-muted': event.status === 'closed',
                }"
              >
                Status: {{ event.status }}
              </p>
              <!-- Botões de Editar e Excluir -->
              <div class="d-flex justify-content-end btns">
                <button
                  class="btn btn-warning"
                  @click="editEvent(event)"
                  aria-label="Editar evento"
                >
                  <img class="icon" src="../assets/icons/edit_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png">
                </button>
                <button
                  class="btn btn-danger"
                  @click="deleteEvent(event.id)"
                  aria-label="Excluir evento"
                >
                  <img class="icon" src="../assets/icons/delete_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png">
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal de Criar/Editar Evento -->
      <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
        <h5 class="modal-title">{{ isEditMode ? 'Editar Evento' : 'Criar Novo Evento' }}</h5>
        <hr>
        <!-- Formulário de Cadastro de Evento -->
        <form @submit.prevent="submitEvent">
        <div class="form-group">
            <label for="eventName">Nome do Evento</label>
            <input
            v-model="newEvent.name"
            type="text"
            id="eventName"
            class="form-control"
            placeholder="Nome do Evento"
            required
            />
        </div>

        <div class="form-group mt-3">
            <label for="eventLocation">Local do Evento</label>
            <input
            v-model="newEvent.location"
            type="text"
            id="eventLocation"
            class="form-control"
            placeholder="Local do Evento"
            required
            />
        </div>

        <div class="form-group mt-3">
            <label for="eventCapacity">Capacidade</label>
            <input
            v-model="newEvent.capacity"
            type="number"
            id="eventCapacity"
            class="form-control"
            placeholder="Capacidade"
            required
            />
        </div>

        <div class="form-group mt-3">
            <label for="eventDatetime">Data e Hora</label>
            <input
            v-model="newEvent.datetime"
            type="datetime-local"
            id="eventDatetime"
            class="form-control"
            required
            />
        </div>

        <!-- Adicionando o campo de status para edição -->
        <div v-if="isEditMode" class="form-group mt-3">
            <label for="eventStatus">Status do Evento</label>
            <select
            v-model="newEvent.status"
            id="eventStatus"
            class="form-control"
            required
            >
            <option value="open">Aberto</option>
            <option value="closed">Fechado</option>
            <option value="completed">Concluído</option>
            <option value="canceled">Cancelado</option>
            </select>
        </div>

        <!-- Botões Cancelar e Adicionar -->
        <div class="mt-4 text-end">
            <button @click="closeModal" class="btn btn-danger me-2">
            Cancelar
            </button>
            <button type="submit" class="btn btn-success">
            {{ isEditMode ? 'Atualizar' : 'Adicionar' }}
            </button>
        </div>
        </form>
    <   </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from "axios";
export default {
  data() {
    return {
      events: [], // Lista de eventos que será preenchida pela requisição
      successMessage: '',
      searchTerm: '', // Termo de pesquisa
      showModal: false, // Controla se o modal está visível
      isEditMode: false, // Controla se estamos no modo de edição
      newEvent: {
        name: '',
        location: '',
        capacity: '',
        datetime: '',
      },
      eventToEdit: null, // Evento que será editado
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
    // Buscar eventos pela rota /event
    async fetchEvents() {
      try {
        this.events = [];
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3000/event', {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        });
        this.events = response.data;
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    },

    // Formatar data e hora para exibição
    formatDate(datetime) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return new Date(datetime).toLocaleDateString(undefined, options);
    },

    // Método para abrir o modal de edição
    editEvent(event) {
      this.isEditMode = true;
      this.showModal = true;
      this.newEvent = { ...event }; // Preencher os campos do modal com os dados do evento
      this.eventToEdit = event.id; // Armazenar o id do evento que será editado
    },

    // Fechar o modal
    closeModal() {
      this.showModal = false;
      this.newEvent = { name: '', location: '', capacity: '', datetime: '' }; // Resetar os campos
      this.isEditMode = false;
    },

    // Enviar a criação ou edição do evento
    async submitEvent() {
      try {
        const token = localStorage.getItem('authToken');
        let response;
        if (this.isEditMode) {
          // Editar evento
          response = await axios.put(
            `http://localhost:3000/event/${this.eventToEdit}`,
            this.newEvent,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          // Criar evento
          response = await axios.post(
            'http://localhost:3000/event',
            this.newEvent,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        // Atualizar a lista de eventos
        this.fetchEvents();
        this.closeModal();
      } catch (error) {
        console.error('Erro ao salvar evento:', error);
      }
    },

    // Excluir evento
    async deleteEvent(id) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.delete(`http://localhost:3000/event/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.fetchEvents();
      } catch (error) {
        console.error('Erro ao excluir evento:', error);
      }
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>
  
  <style scoped>
  /* Estilos customizados para garantir espaçamento adequado */
  .container {
    padding-top: 7rem; /* Adicionando padding-top para empurrar o conteúdo para baixo */
  }
  
  /* Estilo do modal (overlay e conteúdo) */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    .container {
      padding-top: 12rem;
    }
  }

  .btns>*{
    margin-right: 1rem;
    border-radius: 5rem;
  }

  .icon{
    width: 24px;
  }
  </style>
  
  