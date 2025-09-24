<template>
  <nav
    class="navbar navbar-expand-lg fixed-top w-100 bg-white bg-opacity-75 backdrop-blur shadow-sm"
    style="font-family: 'Orbitron', sans-serif; z-index: 1000"
  >
    <div class="container-fluid">
      <!-- Icona profilo -->
      <router-link
        class="navbar-brand ms-2 text-dark profile-icon"
        to="/profile"
      >
        <i class="bi bi-person-circle fs-3"></i>
      </router-link>

      <!-- Bottone hamburger mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Link navigazione -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/storia">Storia</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/macchine">Macchine</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/gallery">Gallery</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/armi">Armi</router-link>
            <!-- ⬅ prima del form -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contatti">Form</router-link>
          </li>
        </ul>

        <!-- Barra di ricerca live -->
        <div class="position-relative">
          <input
            v-model="query"
            @input="filterResults"
            class="form-control me-2"
            type="search"
            placeholder="Cerca..."
          />

          <!-- Dropdown risultati -->
          <div
            v-if="query && filteredResults.length"
            class="dropdown-results position-absolute w-100 border rounded mt-1"
          >
            <div
              v-for="(item, index) in filteredResults"
              :key="index"
              class="dropdown-item"
              @click="goTo(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "horizonNavbar",
  data() {
    return {
      query: "",
      allItems: [
        { name: "Watcher", path: "/macchine#watcher" },
        { name: "Sunwing", path: "/macchine#sunwing" },
        { name: "Slaughterspine", path: "/macchine#slaughterspine" },
        { name: "Slitherfang", path: "/macchine#slitherfang" },
        { name: "Clawstrider", path: "/macchine#clawstrider" },
        { name: "Home", path: "/home" },
        { name: "Storia", path: "/storia" },
        { name: "Armi", path: "/armi" }, // ⬅ aggiunto
        { name: "Form", path: "/contatti" },
        { name: "Community", path: "/home#community" },
        { name: "Profilo", path: "/profile" },
        { name: "Gallery", path: "/gallery" },
      ],
      filteredResults: [],
    };
  },
  methods: {
    filterResults() {
      const q = this.query.toLowerCase();
      this.filteredResults = this.allItems.filter((item) =>
        item.name.toLowerCase().includes(q)
      );
    },
    goTo(item) {
      this.$router.push(item.path);
      this.query = "";
      this.filteredResults = [];
    },
  },
};
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.navbar {
  position: fixed !important;
  top: 0;
  left: 0;
}
.nav-link {
  position: relative;
  color: #212529 !important;
  transition: color 0.3s ease;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #000;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}
.nav-link:hover {
  color: #000 !important;
}
.nav-link:hover::after {
  width: 100%;
}
.profile-icon i {
  transition: color 0.3s ease;
}
.profile-icon:hover i {
  color: white !important;
}
body {
  padding-top: 80px;
}

/* Dropdown risultati ricerca */
.dropdown-results {
  background-color: #fff;
  max-height: 300px;
  overflow-y: auto;
  z-index: 2000;
}
.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
  color: #000;
  transition: background 0.2s;
}
.dropdown-item:hover {
  background-color: #f0f0f0;
  color: #000;
}
</style>
