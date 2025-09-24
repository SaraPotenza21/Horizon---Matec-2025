<template>
  <div class="position-relative w-100 vh-100 overflow-hidden bg-black">
    <!-- Video di sfondo -->
    <video
      autoplay
      muted
      loop
      playsinline
      class="position-absolute top-0 start-0 w-100 h-100"
      style="object-fit: cover; z-index: 1"
      @error="onVideoError"
    >
      <source src="/video/intro.mp4" type="video/mp4" />
      Il tuo browser non supporta il video.
    </video>

    <div
      v-if="videoError"
      class="position-absolute top-0 start-0 w-100 h-100 bg-black"
      style="z-index: 1"
    ></div>

    <!-- Pulsante centrale -->
    <transition name="fade">
      <button
        v-if="showButton"
        class="btn btn-light rounded px-4 py-2 position-absolute start-50 translate-middle-x"
        style="
          bottom: 20%;
          background-color: rgba(255, 255, 255, 0.65);
          font-family: 'Orbitron', sans-serif;
          font-weight: 300;
          font-size: 24px;
          z-index: 2;
        "
        @click="goHome"
      >
        Inizia il Viaggio
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  name: "IntroView",
  data() {
    return {
      showButton: false,
      videoError: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showButton = true;
    }, 3000);
  },
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },
    onVideoError() {
      console.error("Errore nel caricamento del video.");
      this.videoError = true;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.btn-light:hover {
  opacity: 0.7;
  transform: scale(1.05);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
</style>
