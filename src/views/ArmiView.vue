<template>
  <div class="bg-black text-white min-vh-100 d-flex flex-column">
    <!-- Navbar -->
    <Navbar />

    <!-- Titolo -->
    <section
      class="text-center"
      style="padding-top: 150px; padding-bottom: 40px"
    >
      <h1 class="display-4" style="font-family: 'Orbitron', sans-serif">
        Le Armi
      </h1>
      <p class="lead">
        Clicca su un’arma per scoprire tutte le sue specifiche.
      </p>
    </section>

    <div class="bg-black" style="height: 60px"></div>

    <!-- Carosello fatto con Bootstrap -->
    <section class="container py-4">
      <div id="armiCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button
            v-for="(arma, index) in armi"
            :key="index"
            type="button"
            data-bs-target="#armiCarousel"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-current="index === 0 ? 'true' : undefined"
            :aria-label="'Slide ' + (index + 1)"
          ></button>
        </div>

        <div class="carousel-inner">
          <div
            v-for="(arma, index) in armi"
            :key="index"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <img
              :src="arma.img"
              class="d-block w-100 cursor-pointer"
              style="max-height: 500px; object-fit: cover"
              :alt="arma.nome"
              data-bs-toggle="modal"
              data-bs-target="#armaModal"
              @click="selectedArma = arma"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>{{ arma.nome }}</h5>
              <p>{{ arma.tipologia }}</p>
            </div>
          </div>
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#armiCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#armiCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>

    <div class="bg-black" style="height: 80px"></div>

    <!-- Dettagli per ogni arma -->
    <div
      class="modal fade"
      id="armaModal"
      tabindex="-1"
      aria-labelledby="armaModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header border-bottom-0">
            <h5 class="modal-title" id="armaModalLabel">
              {{ selectedArma.nome }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p><strong>Tipologia:</strong> {{ selectedArma.tipologia }}</p>
            <p>
              <strong>Classe nemici ideale:</strong>
              {{ selectedArma.classeNemici }}
            </p>
            <p>
              <strong>Tipologia munizioni:</strong> {{ selectedArma.munizioni }}
            </p>
            <p><strong>Rarità:</strong> {{ selectedArma.rarita }}</p>
            <p><strong>Descrizione:</strong> {{ selectedArma.descrizione }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <FooterComponent />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import FooterComponent from "@/components/Footer.vue";

export default {
  name: "ArmiView",
  components: { Navbar, FooterComponent },
  data() {
    return {
      selectedArma: {},
      armi: [
        {
          nome: "Lancia Pesante",
          tipologia: "Corpo a corpo / Lancia",
          classeNemici: "Macchine corazzate o medie",
          munizioni: "Nessuna (corpo a corpo)",
          rarita: "Comune / Base",
          descrizione:
            "La Lancia Pesante è un’arma robusta e versatile, perfetta per affrontare macchine corazzate e nemici ravvicinati. Grazie alla sua portata e alla possibilità di caricare attacchi, Aloy può infliggere colpi potenti mirati ai punti deboli, stordire le macchine e controllare il combattimento corpo a corpo. Ideale come arma primaria nei primi scontri o in situazioni dove la precisione a distanza non è possibile.",
          img: "immagini/arma1.jpg",
        },
        {
          nome: "Shredder Gauntlet",
          tipologia: "Corpo a corpo",
          classeNemici:
            "Gruppi di nemici leggeri, macchine con componenti esposte",
          munizioni: "Dischi rotanti affilati",
          rarita: "Rara",
          descrizione:
            "Il Shredder Gauntlet è un’arma devastante che lancia dischi rotanti affilati capaci di rimbalzare tra più nemici. Questo permette di colpire più bersagli contemporaneamente e danneggiare componenti meccanici esposte. È particolarmente efficace contro gruppi di nemici o macchine di piccola taglia, offrendo ad Aloy un approccio aggressivo e dinamico al combattimento corpo a corpo.",
          img: "immagini/arma2.jpg",
        },
        {
          nome: "Arco da Cacciatore",
          tipologia: "Arco leggero a distanza",
          classeNemici: "Macchine leggere e medie",
          munizioni: "Frecce standard, infuocate, esplosive",
          rarita: "Comune / Base",
          descrizione:
            "L’Arco da Cacciatore è la scelta ideale per chi preferisce la precisione a distanza. Capace di lanciare frecce standard, infuocate o esplosive, permette di colpire i punti deboli delle macchine con efficacia e discrezione. Perfetto per approcci tattici, permette ad Aloy di pianificare gli attacchi da lontano, infliggendo danni mirati senza esporsi troppo al pericolo.",
          img: "immagini/arma3.jpg",
        },
        {
          nome: "Lancia Punte",
          tipologia: "Lancia a distanza / Trappola",
          classeNemici: "Macchine di media e grande taglia",
          munizioni: "Punte esplosive o elementali",
          rarita: "Rara",
          descrizione:
            "La Lancia Punte è un’arma versatile che combina attacco a distanza e capacità di trappola. Può lanciare punte esplosive o infuocate, infliggendo danni consistenti alle macchine corazzate. Ideale per il combattimento strategico, consente ad Aloy di controllare il campo di battaglia, creare ostacoli e preparare attacchi combinati sfruttando effetti elementali.",
          img: "immagini/arma4.jpg",
        },
        {
          nome: "Arco da Guerra",
          tipologia: "Arco pesante a distanza",
          classeNemici: "Macchine corazzate e boss",
          munizioni: "Frecce pesanti, infuocate, esplosive",
          rarita: "Epica",
          descrizione:
            "L’Arco da Guerra è una potente arma a lunga distanza, progettata per infliggere danni massicci alle macchine corazzate e ai nemici più resistenti. Le frecce pesanti possono rompere parti corazzate, mentre le varianti infuocate o esplosive aumentano l’efficacia contro gruppi di nemici o boss. Ideale per attacchi strategici e scontri prolungati, è un’arma indispensabile per Aloy nei combattimenti più impegnativi.",
          img: "immagini/arma5.jpg",
        },
        {
          nome: "Dawnshock Cannon",
          tipologia: "Cannone pesante / Energia elettrica",
          classeNemici: "Macchine corazzate di grande taglia e boss",
          munizioni: "Cariche elettriche ad alto impatto",
          rarita: "Leggendaria",
          descrizione:
            "Il Dawnshock Cannon è un’arma devastante che spara potenti cariche elettriche capaci di immobilizzare e danneggiare gravemente anche le macchine più corazzate. Perfetta per scontri con nemici di grande taglia, permette ad Aloy di combinare potenza e controllo del campo di battaglia. Le sue cariche elettriche possono interrompere attacchi nemici, stordire le macchine e creare opportunità per attacchi combinati.",
          img: "immagini/arma6.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.carousel-caption h5 {
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
}
.carousel-caption p {
  font-size: 1rem;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
