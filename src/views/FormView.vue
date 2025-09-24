<template>
  <div
    class="d-flex flex-column min-vh-100 text-white"
    style="background-color: black; font-family: 'Orbitron', sans-serif"
  >
    <!-- Navbar -->
    <Navbar />

    <!-- Titolo pagina -->
    <div class="text-center mt-5 pt-5 mb-4">
      <h1 class="display-4" style="font-weight: normal">Contattaci</h1>
    </div>

    <transition appear name="fade-in" mode="out-in">
      <div class="container mt-3 flex-grow-1">
        <div
          class="card bg-dark bg-opacity-75 text-white shadow p-4 form-container"
        >
          <h2 class="mb-4 text-center">Modulo di Contatto</h2>

          <form @submit.prevent="submitForm" novalidate>
            <!-- Nome -->
            <div class="mb-3">
              <label class="form-label">Nome</label>
              <input
                type="text"
                class="form-control"
                v-model.trim="form.nome"
                :class="{ 'is-invalid': errors.nome }"
              />
              <div class="invalid-feedback">{{ errors.nome }}</div>
            </div>

            <!-- Email -->
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                v-model.trim="form.email"
                :class="{ 'is-invalid': errors.email }"
              />
              <div class="invalid-feedback">{{ errors.email }}</div>
            </div>

            <!-- Messaggio -->
            <div class="mb-3">
              <label class="form-label">Messaggio</label>
              <textarea
                class="form-control"
                rows="4"
                v-model.trim="form.messaggio"
                :class="{ 'is-invalid': errors.messaggio }"
              ></textarea>
              <div class="invalid-feedback">{{ errors.messaggio }}</div>
            </div>

            <!-- Pulsante -->
            <button type="submit" class="btn btn-light w-100">Invia</button>
          </form>

          <!-- Messaggio di conferma -->
          <div v-if="successMessage" class="alert alert-success mt-3">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </transition>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "FormView",
  components: { Navbar, Footer },
  data() {
    return {
      form: {
        nome: "",
        email: "",
        messaggio: "",
      },
      errors: {},
      successMessage: "",
    };
  },
  created() {
    const savedForm = localStorage.getItem("contactForm");
    if (savedForm) {
      this.form = JSON.parse(savedForm);
    }
  },
  watch: {
    form: {
      handler(newVal) {
        localStorage.setItem("contactForm", JSON.stringify(newVal));
      },
      deep: true,
    },
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.form.nome) this.errors.nome = "Il nome è obbligatorio.";
      if (!this.form.email) {
        this.errors.email = "L’email è obbligatoria.";
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        this.errors.email = "Inserisci un’email valida.";
      }
      if (!this.form.messaggio)
        this.errors.messaggio = "Il messaggio è obbligatorio.";
      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        this.successMessage = "Messaggio inviato con successo!";
        this.form = { nome: "", email: "", messaggio: "" };
        localStorage.removeItem("contactForm");
      }
    },
  },
};
</script>

<style scoped>
.fade-in-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-in-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 15px;
}

.is-invalid {
  border-color: #dc3545;
}
.invalid-feedback {
  display: block;
}
</style>
