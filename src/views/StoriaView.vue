<template>
  <div class="bg-black text-white" style="font-family: 'Orbitron', sans-serif">
    <Navbar />

    <!-- Pulsante Audio  -->
    <div class="bottoneAudio" style="top: 90px; left: 20px; z-index: 1050">
      <button
        @click="toggleAudio"
        class="btn btn-outline-light btn-sm"
        style="font-size: 0.9rem; padding: 0.2rem 0.4rem"
      >
        <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
      </button>
    </div>

    <div class="container main-content">
      <!-- Titolo -->
      <h1 class="text-center mb-5 animate-title">LA STORIA</h1>

      <div class="row">
        <!-- Colonna testo + immagini -->
        <div class="col-lg-8">
          <div
            v-for="(item, index) in storyContent"
            :key="index"
            class="mb-5 animate-on-scroll"
          >
            <div class="fs-4 lh-lg" v-html="item.text"></div>

            <div
              v-if="item.image"
              class="card bg-dark border-light mt-3"
              style="max-width: 100%"
            >
              <img
                :src="item.image"
                class="img-fluid rounded-start"
                alt="Immagine storia"
              />
            </div>
          </div>
        </div>

        <!-- Colonna notizie -->
        <div class="col-lg-4">
          <div
            v-for="(news, i) in newsCards"
            :key="i"
            class="card bg-dark border-light news-card"
          >
            <div class="card-body">
              <h5 class="card-title">{{ news.title }}</h5>
              <p class="card-text">{{ news.description }}</p>
              <a
                :href="news.link"
                target="_blank"
                class="btn btn-outline-light btn-sm"
              >
                Leggi di più
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "StoriaView",
  components: { Navbar, Footer },
  data() {
    return {
      isPlaying: false,
      audio: null,
      storyContent: [
        {
          text: `<p>Il mondo non è più degli uomini. Secoli dopo il crollo della civiltà, la Terra è dominata da tribù primitive e creature meccaniche. Aloy, già salvatrice del pianeta da HADES, deve affrontare una nuova minaccia: una piaga rossa che avvelena il suolo e macchine sempre più ostili.</p>`,
          image: "/immagini/fotostoria1.jpg",
        },
        {
          text: `<p>Per fermarla deve ricostruire GAIA, recuperando le funzioni AETHER, POSEIDON e DEMETER, nascoste in territori remoti. Nel West Proibito affronta deserti, giungle e popoli diffidenti, tra cui i Tenakth e gli Utaru, e si scontra con la ribelle Regalla.</p>`,
          image: "/immagini/fotostoria2.jpg",
        },
        {
          text: `<p>Dietro il caos agiscono i Far Zenith, coloni spaziali immortali, e il loro segreto più oscuro: Nemesis, un’IA decisa a distruggere tutto. Aloy dovrà affrontare una guerra che deciderà il destino del pianeta.</p>`,
          image: "/immagini/fotostoria3.jpg",
        },
      ],
      newsCards: [
        {
          title: "Una statua di Aloy a Firenze rende omaggio alle eroine",
          description: "Statua simbolo di coraggio, inclusione e diversità",
          link: "https://www.corriere.it/tecnologia/22_febbraio_17/a-firenze-statua-aloy-videogioco-horizon-forbidden-west-omaggio-eroine-italiane-f5f4a55c-8ff9-11ec-990d-642ea57e6940.shtml",
        },
        {
          title: "Continuano le avventure: DLC Burning Shores",
          description:
            "Horizon Forbidden West: Burning Shores, nuovo DLC ricco di contenuti e ambientazioni mozzafiato.",
          link: "https://www.playstation.com/it-it/games/horizon-forbidden-west/burning-shores/",
        },
        {
          title: "Chi presta la voce e il volto ad Aloy?",
          description:
            "Hannah Hoekstra è la modella per il volto e Ashly Burch è la doppiatrice originale di Aloy, premiata per la sua performance.",
          link: "https://www.everyeye.it/notizie/chi-attrice-aloy-protagonista-horizon-zero-dawn-502100.html",
        },
        {
          title: "Lozowchuk: la musica tra Morricone e semplicità",
          description:
            "Il compositore Oleksa Lozowchuk racconta come ha creato la colonna sonora di Horizon Forbidden West, ispirata a Morricone e alla semplicità emotiva.",
          link: "https://www.rollingstone.it/musica/interviste-musica/la-musica-di-horizon-forbidden-west-tra-ennio-morricone-e-la-ricerca-della-semplicita/621551/",
        },
        {
          title: "Aloy: un’icona di stile su Vanity Fair",
          description:
            "Vanity Fair dedica una copertina digitale ad Aloy, simbolo di emancipazione e personaggio privo di stereotipi femminili.",
          link: "https://www.vanityfair.it/article/aloy-eroina-horizon-forbidden-west-videogioco-seconda-stagione-intervista-creatori",
        },
        {
          title: "Le macchine, tra scienza e gioco",
          description:
            "Un articolo approfondisce come la robotica reale abbia ispirato le creature meccaniche di Horizon.",
          link: "https://www.everyeye.it/articoli/speciale-horizon-macchine-biomorfe-guerrilla-realta-videogioco-53444.html",
        },
      ],
    };
  },
  mounted() {
    this.audio = new Audio("/audio/audio1.mp3");
    this.audio.loop = true;

    document.querySelector(".animate-title").classList.add("fade-in-up");

    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
          entry.target.classList.remove("opacity-0");
        }
      });
    });
    elements.forEach((el) => {
      el.classList.add("opacity-0");
      observer.observe(el);
    });
  },
  beforeUnmount() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  },
  methods: {
    toggleAudio() {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
  },
};
</script>

<style scoped>
.main-content {
  padding-top: 150px;
}
.opacity-0 {
  opacity: 0;
}
.fade-in-up {
  animation: fadeInUp 1s ease forwards;
}
@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.card img {
  height: 220px;
  object-fit: cover;
}
.card-title {
  color: white;
}
.card-text {
  color: #ccc;
}

/* Card per mobile */
.news-card {
  margin-bottom: 2rem;
  transform: scale(0.95);
}
.news-card .card-title {
  font-size: 0.95rem;
}
.news-card .card-text {
  font-size: 0.8rem;
}

/* Desktop  */
@media (min-width: 992px) {
  .news-card {
    margin-bottom: 4rem;
    transform: scale(0.95);
  }
  .news-card .card-title {
    font-size: 1rem;
  }
  .news-card .card-text {
    font-size: 0.85rem;
  }
  .bottoneAudio {
    position: fixed;
  }
}

@media (max-width: 991px) {
  .main-content {
    padding-top: 120px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .bottoneAudio {
    position: absolute;
  }
}
</style>
