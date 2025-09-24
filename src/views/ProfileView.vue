<template>
  <div
    class="d-flex flex-column min-vh-100 text-white"
    style="
      background: url('/immagini/sfondoprofilo.jpg') no-repeat center
        center/cover;
      font-family: 'Orbitron', sans-serif;
    "
  >
    <!-- Navbar -->
    <Navbar />

    <div
      class="container flex-grow-1 d-flex justify-content-center align-items-start mt-7 pt-7"
    >
      <div
        class="card bg-dark bg-opacity-75 text-white shadow p-4 text-center"
        style="max-width: 400px; width: 100%"
      >
        <!-- Form di iscrizione -->
        <div v-if="!saved">
          <h2 class="mb-4">ISCRIVITI</h2>
          <form @submit.prevent="saveProfile">
            <div class="mb-3">
              <label class="form-label">Nome</label>
              <input
                type="text"
                v-model="profile.nome"
                class="form-control"
                placeholder="Inserisci il tuo nome"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Cognome</label>
              <input
                type="text"
                v-model="profile.cognome"
                class="form-control"
                placeholder="Inserisci il tuo cognome"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                v-model="profile.email"
                class="form-control"
                placeholder="Inserisci la tua email"
                required
              />
            </div>
            <button type="submit" class="btn btn-light w-100">Salva</button>
          </form>
        </div>

        <!-- Profilo salvato -->
        <div v-else>
          <!-- Immagine di default -->
          <img
            :src="profile.img"
            @error="profile.img = '/immagini/default.png'"
            alt="Foto profilo"
            class="rounded-circle mb-3"
            style="width: 100px; height: 100px; object-fit: cover"
          />

          <h3>{{ profile.nome }} {{ profile.cognome }}</h3>
          <p>{{ profile.email }}</p>
          <button @click="editProfile" class="btn btn-light w-100 mt-3">
            Modifica il tuo profilo
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "ProfileView",
  components: { Navbar, Footer },
  data() {
    return {
      profile: {
        nome: "",
        cognome: "",
        email: "",
        img: "/immagini/avatar.jpg",
      },
      saved: false,
    };
  },
  mounted() {
    const savedProfile = sessionStorage.getItem("userProfile");
    if (savedProfile) {
      this.profile = JSON.parse(savedProfile);
      this.saved = true;
    }
  },
  methods: {
    saveProfile() {
      sessionStorage.setItem("userProfile", JSON.stringify(this.profile));
      this.saved = true;
    },
    editProfile() {
      this.saved = false;
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 15px;
}
.mt-7 {
  margin-top: 5rem !important;
}
.pt-7 {
  padding-top: 5rem !important;
}
</style>
