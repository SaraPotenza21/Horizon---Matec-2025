<template>
  <div>
    <div class="position-relative w-100 vh-100 overflow-hidden bg-black">
      <img
        src="/immagini/foto1.JPG"
        alt="Foto 1"
        class="w-100 h-100 position-absolute top-0 start-0"
        style="object-fit: cover; transition: opacity 3s ease-in-out"
        :style="{ opacity: step >= 1 ? (step >= 2 ? 0.5 : 1) : 0 }"
      />

      <transition name="fade-text">
        <img
          v-if="step >= 3"
          src="/immagini/foto2.png"
          alt="Foto 2"
          class="position-absolute start-50 translate-middle-x"
          style="max-width: 200px; top: 25%"
        />
      </transition>

      <!-- Testo -->
      <transition name="fade">
        <h1
          v-if="step >= 4"
          class="testo position-absolute top-50 start-50 translate-middle text-white text-center"
          style="font-size: 2.5rem; font-family: 'Orbitron', sans-serif"
        >
          Un nuovo orizzonte ti aspetta..
        </h1>
      </transition>

      <!-- Navbar -->
      <transition name="fade">
        <Navbar v-if="step >= 5" />
      </transition>
    </div>

    <!-- Titolo SCOPRI LA GALLERY -->
    <section v-if="step >= 6" class="bg-black py-5 text-center">
      <router-link to="/gallery" class="text-decoration-none">
        <h2
          ref="titleGallery"
          class="text-white"
          :class="instantReveal ? 'opacity-100' : 'opacity-0'"
          style="
            font-family: 'Orbitron', sans-serif;
            font-size: 3rem;
            transition: opacity 2s ease;
            cursor: pointer;
          "
        >
          SCOPRI LA GALLERY
        </h2>
      </router-link>
    </section>

    <!-- Carosello continuo -->
    <section v-if="step >= 6" class="bg-black py-4 overflow-hidden">
      <div class="d-flex slider-track">
        <div
          v-for="card in cards.concat(cards)"
          :key="card + '-' + Math.random()"
          class="card bg-dark border-0"
          style="width: 300px; margin: 0 10px"
        >
          <img
            :src="`/immagini/card${card}.jpg`"
            class="card-img-top"
            style="height: 500px; object-fit: cover"
          />
        </div>
      </div>
    </section>

    <!-- Titolo IL GIOCO -->
    <section v-if="step >= 6" class="bg-black py-5 text-center">
      <h2
        ref="titleStory"
        class="text-white"
        :class="instantReveal ? 'opacity-100' : 'opacity-0'"
        style="
          font-family: 'Orbitron', sans-serif;
          font-size: 3rem;
          transition: opacity 2s ease;
        "
      >
        IL GIOCO
      </h2>
    </section>

    <section
      v-if="step >= 6"
      class="container-fluid bg-black py-5"
      style="
        font-family: 'Orbitron', sans-serif;
        font-size: 1.4rem;
        line-height: 2;
      "
    >
      <div class="px-4">
        <p
          ref="storyPart1"
          class="text-white fw-light mb-5"
          :class="instantReveal ? 'opacity-100' : 'opacity-0'"
          style="transition: opacity 4s ease"
        >
          Un <strong>mondo in rovina</strong>, dove la
          <strong>natura selvaggia</strong> ha riconquistato le città e
          <strong>antiche macchine</strong> vagano tra foreste, deserti e
          oceani. Nei panni di <strong>Aloy</strong>, coraggiosa
          <strong>cacciatrice</strong> e <strong>cercatrice di verità</strong>,
          attraverserai <strong>paesaggi mozzafiato</strong>: montagne innevate,
          rovine sommerse e pianure brulicanti di vita e di
          <strong>pericolo</strong>.
        </p>

        <p
          ref="storyPart2"
          class="text-white fw-light mb-5"
          :class="instantReveal ? 'opacity-100' : 'opacity-0'"
          style="transition: opacity 4s ease"
        >
          Affronterai <strong>creature meccaniche imponenti</strong>, ciascuna
          con <strong>comportamenti</strong> e
          <strong>punti deboli</strong> unici, usando <strong>ingegno</strong>,
          <strong>abilità</strong> e <strong>tecnologia dimenticata</strong>.
          Ogni passo ti porterà più vicino a svelare il
          <strong>mistero</strong> di una nuova minaccia che rischia di
          <strong>cancellare</strong> per sempre ciò che resta dell’umanità.
        </p>

        <p
          ref="storyPart3"
          class="text-white fw-light"
          :class="instantReveal ? 'opacity-100' : 'opacity-0'"
          style="transition: opacity 4s ease"
        >
          Preparati a un <strong>viaggio epico</strong> in un
          <strong>open world vibrante</strong>, ricco di
          <strong>storie</strong>, <strong>personaggi indimenticabili</strong> e
          <strong>segreti nascosti</strong> oltre l’orizzonte.
        </p>
      </div>
    </section>

    <!-- Titolo COMMUNITY -->
    <section v-if="step >= 6" class="bg-black py-5 text-center">
      <h2
        ref="titleCommunity"
        class="text-white"
        :class="instantReveal ? 'opacity-100' : 'opacity-0'"
        style="
          font-family: 'Orbitron', sans-serif;
          font-size: 3rem;
          transition: opacity 2s ease;
        "
      >
        COMMUNITY
      </h2>
    </section>

    <!-- Carosello Notizie in Orizzontale -->
    <section v-if="step >= 6" class="bg-black py-5 position-relative">
      <div class="container position-relative">
        <button
          class="btn btn-outline-light position-absolute top-50 start-0 translate-middle-y"
          @click="prevSlide"
          style="z-index: 5"
        >
          ←
        </button>

        <div class="overflow-hidden w-100">
          <div
            class="d-flex"
            :style="{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              transition: isTransitioning
                ? 'transform 0.6s ease-in-out'
                : 'none',
            }"
            @transitionend="handleTransitionEnd"
          >
            <!-- Card con il link -->
            <a
              v-for="(notizia, index) in displayNotizie"
              :key="index"
              :href="notizia.link"
              target="_blank"
              rel="noopener noreferrer"
              class="card bg-white text-dark me-3 flex-shrink-0 text-decoration-none"
              :style="{
                width: `${100 / visibleCards}%`,
                height: '300px',
                position: 'relative',
              }"
            >
              <img
                :src="`/immagini/${notizia.img}`"
                class="card-img-top"
                style="height: 300px; object-fit: cover"
              />
              <div
                class="card-img-overlay d-flex align-items-center justify-content-center bg-dark bg-opacity-75 text-white opacity-0 hover-overlay"
                style="transition: opacity 0.4s"
              >
                <p class="m-0">{{ notizia.testo }}</p>
              </div>
            </a>
          </div>
        </div>

        <button
          class="btn btn-outline-light position-absolute top-50 end-0 translate-middle-y"
          @click="nextSlide"
          style="z-index: 5"
        >
          →
        </button>
      </div>
    </section>

    <FooterComponent v-if="showFooter" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import FooterComponent from "@/components/Footer.vue";

export default {
  name: "HomeView",
  components: { Navbar, FooterComponent },
  data() {
    return {
      step: 0,
      cards: Array.from({ length: 18 }, (_, i) => i + 1),
      visibleCards: 2,
      currentIndex: 0,
      isTransitioning: true,
      showFooter: false,
      instantReveal: false,
      notizie: [
        {
          img: "notizia1.jpg",
          testo: "SCOPRI LE FAN ART DELLA NOSTRA COMMUNITY!",
          link: "https://www.playstation.com/en-us/horizon/community/",
        },
        {
          img: "notizia2.jpg",
          testo: "SCOPRI COME CREARE UNO SQUARCIAVENTO DI CARTA!",
          link: "https://secure.cdn.us.playstation.com/horizon-forbidden-west/paper-guides/HFW-papercraft-manual-sunwing-EN-color.pdf",
        },
        {
          img: "notizia3.jpg",
          testo: "CREA IL COSPLAY DI ALOY!",
          link: "https://secure.cdn.us.playstation.com/horizon-forbidden-west/cosplay/horizon-forbidden-west-aloy-commander-cosplay-guide.pdf",
        },
      ],
    };
  },
  computed: {
    displayNotizie() {
      return [...this.notizie, ...this.notizie, ...this.notizie];
    },
  },
  mounted() {
    const alreadyPlayed = sessionStorage.getItem("homeIntroPlayed") === "1";
    if (alreadyPlayed) {
      this.step = 6;
      this.instantReveal = true;
      this.$nextTick(() => this.revealAllImmediate());
    } else {
      setTimeout(() => (this.step = 1), 500);
      setTimeout(() => (this.step = 2), 4000);
      setTimeout(() => (this.step = 3), 8000);
      setTimeout(() => (this.step = 4), 9000);
      setTimeout(() => (this.step = 5), 11000);
      setTimeout(() => {
        this.step = 6;
        sessionStorage.setItem("homeIntroPlayed", "1");
      }, 13000);
    }
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    revealRef(el) {
      if (!el) return;
      el.classList.replace("opacity-0", "opacity-100");
    },
    revealAllImmediate() {
      this.revealRef(this.$refs.titleGallery);
      this.revealRef(this.$refs.titleStory);
      this.revealRef(this.$refs.storyPart1);
      this.revealRef(this.$refs.storyPart2);
      this.revealRef(this.$refs.storyPart3);
      this.revealRef(this.$refs.titleCommunity);
    },
    handleScroll() {
      if (!this.instantReveal && this.step >= 6) {
        const inViewport = (el) =>
          el && el.getBoundingClientRect().top < window.innerHeight - 100;
        if (inViewport(this.$refs.titleGallery))
          this.revealRef(this.$refs.titleGallery);
        if (inViewport(this.$refs.titleStory))
          this.revealRef(this.$refs.titleStory);
        if (inViewport(this.$refs.storyPart1))
          this.revealRef(this.$refs.storyPart1);
        if (inViewport(this.$refs.storyPart2))
          this.revealRef(this.$refs.storyPart2);
        if (inViewport(this.$refs.storyPart3))
          this.revealRef(this.$refs.storyPart3);
        if (inViewport(this.$refs.titleCommunity))
          this.revealRef(this.$refs.titleCommunity);
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 5
      ) {
        this.showFooter = true;
      }
    },
    nextSlide() {
      this.isTransitioning = true;
      this.currentIndex++;
    },
    prevSlide() {
      this.isTransitioning = true;
      this.currentIndex--;
    },
    handleTransitionEnd() {
      const n = this.notizie.length;
      if (this.currentIndex >= this.displayNotizie.length - this.visibleCards) {
        this.isTransitioning = false;
        requestAnimationFrame(() => {
          this.currentIndex = n;
          requestAnimationFrame(() => {
            this.isTransitioning = true;
          });
        });
      }
      if (this.currentIndex < 0) {
        this.isTransitioning = false;
        requestAnimationFrame(() => {
          this.currentIndex =
            this.displayNotizie.length - (n + this.visibleCards);
          requestAnimationFrame(() => {
            this.isTransitioning = true;
          });
        });
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-text-enter-active,
.fade-text-leave-active {
  transition: opacity 1.5s ease;
}
.fade-text-enter-from,
.fade-text-leave-to {
  opacity: 0;
}

.card img {
  transition: transform 0.5s ease;
}
.card img:hover {
  transform: scale(1.05);
}

.slider-track {
  display: flex;
  width: calc(300px * 36);
  animation: scroll 150s linear infinite;
}
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
.hover-overlay:hover {
  opacity: 1 !important;
}

/* x mobile: sposta leggermente il testo verso il basso */
@media (max-width: 575.98px) {
  .testo {
    top: 60% !important;
  }
}
</style>
