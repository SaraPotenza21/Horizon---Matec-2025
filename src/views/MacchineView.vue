<template>
  <div class="bg-black text-white" style="font-family: 'Orbitron', sans-serif">
    <!-- Navbar -->
    <div class="position-absolute top-0 w-100" style="z-index: 10">
      <Navbar />
    </div>

    <!-- Video a schermo intero -->
    <div class="position-relative" style="height: 100vh; overflow: hidden">
      <video
        src="/video/videomacchine.MP4"
        autoplay
        muted
        loop
        playsinline
        class="w-100 h-100"
        style="object-fit: cover; object-position: center 20%"
      ></video>

      <!-- Titolo con la sovraimpressione -->
      <h1
        class="position-absolute top-50 start-50 translate-middle text-center text-uppercase"
        style="font-size: 4rem; z-index: 5; letter-spacing: 3px"
      >
        SCOPRI IL BESTIARIO
      </h1>
    </div>

    <!-- Sezioni bestiario -->
    <div class="container my-5">
      <div
        v-for="(beast, index) in beasts"
        :key="index"
        class="row align-items-center mb-5"
      >
        <!-- Contenitore delle immagini -->
        <div class="col-md-6">
          <div
            class="position-relative rounded overflow-hidden slide-stack"
            @mouseenter="start(index)"
            @mouseleave="stop(index)"
          >
            <img
              v-for="(src, i) in allImages(beast)"
              :key="i"
              :src="src"
              class="d-block w-100 h-100 slide-img"
              :class="{ 'is-active': isActive(index, i) }"
              alt=""
              draggable="false"
            />
          </div>
        </div>

        <!-- Colonna del testo -->
        <div class="col-md-6">
          <h3 class="fw-bold mb-3 text-uppercase">{{ beast.name }}</h3>
          <p class="mb-0">{{ beast.description }}</p>
        </div>
      </div>

      <!-- Pulsante per mostrare il form -->
      <div class="text-center my-3" v-if="!showAddForm">
        <button
          class="btn text-white border border-white"
          style="background: none"
          @click="showAddForm = true"
        >
          Aggiungi una nuova macchina
        </button>
      </div>

      <!-- Form a comparsa per aggiungere nuova macchina -->
      <div v-if="showAddForm" class="row align-items-center mb-5">
        <!-- Colonna sinistra: aggiunta dell'immagine-->
        <div class="col-md-6">
          <div
            class="position-relative rounded overflow-hidden d-flex justify-content-center align-items-center"
            style="height: 300px; background: #111"
          >
            <img
              v-if="previewImage"
              :src="previewImage"
              class="w-100 h-100"
              style="object-fit: cover"
            />
            <label
              v-else
              for="beastImage"
              class="text-white fw-bold"
              style="font-size: 4rem; cursor: pointer"
            >
              +
            </label>
            <input
              type="file"
              id="beastImage"
              @change="handleImageUpload"
              style="display: none"
            />
          </div>
        </div>

        <!-- Colonna destra: campi con info da inserire-->
        <div class="col-md-6">
          <input
            v-model="newBeast.name"
            type="text"
            placeholder="Nome macchina"
            class="form-control mb-3"
          />
          <textarea
            v-model="newBeast.description"
            placeholder="Descrizione macchina"
            class="form-control"
            rows="4"
          ></textarea>
          <button
            class="btn text-white border border-white mt-3"
            style="background: none"
            @click.prevent="addBeast"
          >
            Aggiungi Macchina
          </button>
        </div>
      </div>
    </div>

    <!-- Alert di conferma -->
    <div v-if="showAlert" class="overlay">
      <div class="custom-alert">
        <h3>Aggiunta completata!</h3>
        <p>{{ lastAdded.name }} è stata aggiunta al bestiario.</p>
        <button @click="closeAlert">OK</button>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "MacchineView",
  components: { Navbar, Footer },
  data() {
    return {
      active: [],
      hovering: [],
      timers: {},
      showAddForm: false,
      newBeast: { name: "", description: "", image: "", extraImages: [] },
      previewImage: null,
      showAlert: false,
      lastAdded: {},
    };
  },
  computed: {
    ...mapGetters(["allBeasts"]),
    beasts() {
      return this.allBeasts;
    },
  },
  mounted() {
    // inizializza active/hovering in base ai dati dello store
    this.active = this.beasts.map(() => 0);
    this.hovering = this.beasts.map(() => false);

    this.beasts.forEach((b) => {
      this.allImages(b).forEach((src) => {
        const im = new Image();
        im.src = src;
      });
    });
  },
  beforeUnmount() {
    Object.values(this.timers).forEach((id) => clearInterval(id));
  },
  methods: {
    allImages(beast) {
      return [beast.image, ...(beast.extraImages || [])];
    },
    isActive(index, i) {
      return this.hovering[index] ? this.active[index] === i : i === 0;
    },
    start(index) {
      this.hovering[index] = true;
      if (this.timers[index]) clearInterval(this.timers[index]);

      let i = this.active[index];
      const total = this.allImages(this.beasts[index]).length;

      i = (i + 1) % total;
      this.active[index] = i;

      this.timers[index] = setInterval(() => {
        i = (i + 1) % total;
        this.active[index] = i;
      }, 1500);
    },
    stop(index) {
      this.hovering[index] = false;
      if (this.timers[index]) clearInterval(this.timers[index]);
      this.active[index] = 0;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        this.newBeast.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    addBeast() {
      if (!this.newBeast.name) return;

      const beastToAdd = {
        ...this.newBeast,
        extraImages: [],
        image: this.newBeast.image || "/immagini/default.jpg",
      };

      // invio al Vuex store
      this.$store.dispatch("addBeast", beastToAdd);

      // aggiorno gli array di stato locale per l'animazione
      this.active.push(0);
      this.hovering.push(false);

      this.lastAdded = beastToAdd;
      this.showAlert = true;

      // reset del form
      this.newBeast = { name: "", description: "", image: "", extraImages: [] };
      this.previewImage = null;
      this.showAddForm = false;
    },
    closeAlert() {
      this.showAlert = false;
    },
  },
};
</script>

<style scoped>
.slide-stack {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  position: relative;
  overflow: hidden;
}
.slide-stack .slide-img {
  position: absolute;
  inset: 0;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  user-select: none;
}
.slide-stack .slide-img.is-active {
  opacity: 1;
}

/* Alert popup */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.custom-alert {
  background: #111;
  color: #fff;
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
}
.custom-alert button {
  margin-top: 15px;
  background: none;
  color: #fff;
  border: 1px solid #fff;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
}
.custom-alert button:hover {
  background: #222;
}
</style>
