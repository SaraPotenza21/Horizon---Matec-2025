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
        <!-- Colonna sinistra: aggiunta dell' immagine-->
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
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "MacchineView",
  components: { Navbar, Footer },
  data() {
    const beasts = [
      {
        image: "/immagini/animale1copertina.JPG",
        extraImages: [
          "/immagini/animale1.1.JPG",
          "/immagini/animale1.2.JPG",
          "/immagini/animale1.3.JPG",
        ],
        name: "Watcher",
        description:
          "Piccola macchina da ricognizione bipede, dotata di sensori ottici ad alta precisione. Sorveglia il territorio e invia segnali di allarme alle macchine vicine quando rileva minacce. Agile e veloce, può sferrare attacchi rapidi con la testa, ma la sua armatura è leggera e vulnerabile agli attacchi mirati.",
      },
      {
        image: "/immagini/animale2copertina.JPG",
        extraImages: [
          "/immagini/animale2.1.JPG",
          "/immagini/animale2.2.JPG",
          "/immagini/animale2.3.JPG",
        ],
        name: "Sunwing",
        description:
          "Macchina volante ispirata a un pterosauro, capace di raccogliere energia solare tramite pannelli alari retrattili. Sorvola vaste aree alla ricerca di intrusi, effettuando attacchi in picchiata estremamente letali. La sua velocità e la capacità di volare a grandi altezze la rendono difficile da colpire.",
      },
      {
        image: "/immagini/animale3copertina.JPG",
        extraImages: [
          "/immagini/animale3.1.JPG",
          "/immagini/animale3.2.JPG",
          "/immagini/animale3.3.JPG",
        ],
        name: "Slaughterspine",
        description:
          "Colosso corazzato progettato per il combattimento diretto. Dotato di cannoni a energia, spine metalliche e un corpo quasi impenetrabile. La sua potenza distruttiva è pari solo alla sua resistenza: affrontarlo senza un piano preciso equivale a condannarsi.",
      },
      {
        image: "/immagini/animale4copertina.JPG",
        extraImages: [
          "/immagini/animale4.1.JPG",
          "/immagini/animale4.2.JPG",
          "/immagini/animale4.3.JPG",
        ],
        name: "Slitherfang",
        description:
          "Macchina serpente di dimensioni imponenti, capace di colpire con morsi velenosi o scariche elettriche. Può sollevarsi per intimidire e colpire a distanza con precisione letale.",
      },
      {
        image: "/immagini/animale5copertina.JPG",
        extraImages: [
          "/immagini/animale5.1.JPG",
          "/immagini/animale5.2.JPG",
          "/immagini/animale5.3.JPG",
        ],
        name: "Clawstrider",
        description:
          "Predatore meccanico ispirato ai velociraptor, progettato per inseguire e abbattere rapidamente le prede. I suoi artigli possono squarciare anche metalli leggeri, mentre la velocità e la coordinazione in branco lo rendono un nemico letale.",
      },
    ];

    return {
      beasts,
      active: beasts.map(() => 0),
      hovering: beasts.map(() => false),
      timers: {},
      showAddForm: false,
      newBeast: { name: "", description: "", image: "", extraImages: [] },
      previewImage: null,
      showAlert: false,
      lastAdded: {},
    };
  },
  mounted() {
    // Preload immagini
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

      this.beasts.push(beastToAdd);
      this.active.push(0);
      this.hovering.push(false);

      this.lastAdded = beastToAdd;
      this.showAlert = true;

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
