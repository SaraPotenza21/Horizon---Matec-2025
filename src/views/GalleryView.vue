<template>
  <div
    class="bg-black text-white min-vh-100 d-flex flex-column"
    style="font-family: 'Orbitron', sans-serif"
  >
    <!-- Navbar -->
    <Navbar class="fixed-top" style="z-index: 1000" />

    <!-- Titolo -->
    <div
      class="bg-black text-center"
      style="padding-top: 140px; padding-bottom: 30px"
    >
      <h2 class="text-uppercase fw-normal">Gallery</h2>
    </div>

    <!-- Carosello -->
    <section class="position-relative flex-grow-1">
      <div class="container-fluid position-relative bg-black">
        <!-- Freccia sinistra -->
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
            <div
              v-for="(image, index) in displayImages"
              :key="`${index}-${image.src}`"
              class="card bg-black border-0 me-3 flex-shrink-0 overflow-hidden"
              :style="{ width: cardWidth }"
            >
              <img
                :src="image.src"
                class="card-img-top img-hover"
                :style="{
                  height: '500px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }"
                :alt="image.title"
                @click="selectImage(image)"
              />
            </div>
          </div>
        </div>

        <!-- Freccia destra -->
        <button
          class="btn btn-outline-light position-absolute top-50 end-0 translate-middle-y"
          @click="nextSlide"
          style="z-index: 5"
        >
          →
        </button>
      </div>

      <!-- Overlay -->
      <div
        v-if="selectedImage"
        class="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column flex-md-row align-items-center justify-content-center overflow-auto p-3"
        style="background: rgba(0, 0, 0, 0.85); z-index: 1050"
        @click.self="closeOverlay"
      >
        <img
          :src="selectedImage.src"
          class="mb-3 mb-md-0 me-md-3"
          :alt="selectedImage.title"
          :class="{ 'w-100': windowWidth < 576, 'mw-100': windowWidth >= 576 }"
          :style="{
            maxWidth: windowWidth < 576 ? '100%' : '700px',
            height: 'auto',
            maxHeight: windowWidth < 576 ? '40vh' : '70vh',
            objectFit: windowWidth < 576 ? 'contain' : 'cover',
            border: '4px solid white',
            borderRadius: '10px',
          }"
        />
        <div
          class="bg-dark p-3 p-md-4 rounded text-block"
          :style="{
            maxWidth: windowWidth < 576 ? '95%' : '500px',
            width: '100%',
          }"
        >
          <h4
            class="text-uppercase"
            :style="{ fontSize: windowWidth < 576 ? '1rem' : '1.25rem' }"
          >
            {{ selectedImage.title }}
          </h4>
          <p :style="{ fontSize: windowWidth < 576 ? '0.875rem' : '1rem' }">
            {{ selectedImage.description }}
          </p>
        </div>
      </div>
    </section>

    <div style="height: 60px"></div>

    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "GalleryView",
  components: { Navbar, Footer },
  data() {
    return {
      images: [
        {
          src: "/immagini/card7.JPG",
          title: "Aloy pronta alla battaglia",
          description:
            "Aloy si ferma, il mondo intorno a lei sembra sospeso, mentre attiva il Focus, il suo strumento capace di rivelare segreti nascosti all’occhio umano. Un bagliore bluastro si accende e si propaga a raggiera, creando una sfera di luce che abbraccia l’ambiente circostante, illuminando ogni dettaglio con chiarezza sovrannaturale. Gli alberi, le rocce e persino le ombre sembrano assumere una nuova consistenza, come se il paesaggio stesso stesse svelando le sue verità più profonde.",
        },
        {
          src: "/immagini/card2.JPG",
          title: "Aloy nel cuore del bosco",
          description:
            "Di spalle, Aloy avanza silenziosa tra le sfumature di verde di un fitto bosco, come se fosse parte integrante della natura che la circonda. La sua figura, in lontananza, si staglia contro il dedalo di alberi e fogliame, trasmettendo un senso di esplorazione e mistero. L’armatura e l’equipaggiamento si fondono con i colori del paesaggio, suggerendo un’armonia profonda con l’ambiente e la sua capacità di muoversi senza lasciare traccia.",
        },
        {
          src: "/immagini/card3.JPG",
          title: "L’ira dello Slaughterspine",
          description:
            "Imponente e minaccioso, lo Slaughterspine si erge come una montagna di metallo e potenza bruta. Le sue scaglie meccaniche scintillano alla luce, rivelando un’architettura letale progettata per la distruzione. I suoi occhi rossi incandescenti scrutano l’orizzonte con una determinazione predatoria, mentre l’aria attorno vibra per il ronzio dei suoi sistemi energetici.",
        },
        {
          src: "/immagini/card4.JPG",
          title: "Volando oltre le rovine",
          description:
            "Aloy sfreccia nei cieli in groppa a uno maestoso Sunwing, le sue ali metalliche catturano la luce mentre fendono le correnti d’aria con eleganza e potenza. Sotto di lei, il mondo si dispiega come una mappa vivente: antiche rovine di un’epoca dimenticata emergono dalla vegetazione, raccontando storie di un passato ormai sepolto. Il contrasto tra l’avanzata tecnologia della macchina e i resti silenziosi della civiltà umana crea un senso di meraviglia e malinconia.",
        },
        {
          src: "/immagini/card11.JPG",
          title: "Legame oltre il sangue",
          description:
            "I volti di Aloy e Rost emergono l’uno accanto all’altro, in un’inquadratura ravvicinata che cattura ogni dettaglio delle loro espressioni. Sono di profilo, quasi come se fossero due figure scolpite nella roccia, immobili ma cariche di significato. Rost, con lo sguardo fisso e la barba folta, trasmette la fermezza e la calma di un uomo temprato da anni di difficoltà, ma nei suoi occhi si nasconde anche una malinconia silenziosa, segno di un affetto profondo e incondizionato.",
        },
        {
          src: "/immagini/card15.JPG",
          title: "Il respiro prima della freccia",
          description:
            "Aloy si prepara a scoccare una freccia, immobile come una statua, ma pronta a liberare tutta la potenza e la precisione che la contraddistinguono. Il suo corpo è teso, ogni muscolo lavora in armonia, dalla presa salda sull’arco alla posizione stabile delle gambe, frutto di un addestramento costante e di una determinazione incrollabile. L’aria attorno sembra carica di elettricità, mentre il vento accarezza appena i suoi capelli, portando con sé l’odore della terra e della vegetazione circostante.",
        },
        {
          src: "/immagini/card13.JPG",
          title: "L’occhio oltre il visibile",
          description:
            "Aloy, con il volto dipinto di un intenso viola rituale, indossa una maestosa armatura da battaglia che riflette la sua determinazione e il suo coraggio. Lo sguardo diretto in camera, fermo e penetrante, crea un legame immediato con chi osserva, trasmettendo la forza e la sicurezza di chi è pronta ad affrontare qualsiasi pericolo.",
        },
        {
          src: "/immagini/card8.JPG",
          title: "Tallneck",
          description:
            "Nella quiete della notte, un maestoso Tallneck si staglia contro il cielo stellato, la sua sagoma imponente tracciata dalla luce lunare. La sua testa alta e rotonda, simile a un’antica torre mobile, si muove lentamente, scandendo un ritmo antico come il mondo stesso. Ogni passo produce un lieve tremore nel terreno, un’eco che si fonde con il fruscio del vento tra l’erba alta. Le sue luci pulsano come costellazioni viventi, riflettendo l’armonia tra la tecnologia dimenticata e la natura che lo avvolge.",
        },
        {
          src: "/immagini/card9.JPG",
          title: "Immersione Silenziosa",
          description:
            "Aloy si muove con grazia e determinazione sotto la superficie dell’acqua, il suo volto ben visibile attraverso la maschera respiratoria che le permette di esplorare le profondità senza sosta. I suoi occhi, concentrati e attenti, scrutano l’ambiente sottomarino in cerca di segreti nascosti. I capelli fluttuano liberi nell’acqua, mossi da correnti leggere che trasmettono un senso di calma e mistero. Attorno a lei, il blu profondo avvolge ogni cosa, creando un’atmosfera sospesa e quasi onirica.",
        },
        {
          src: "/immagini/card10.JPG",
          title: "Cavalcata verso l’Orizzonte",
          description:
            "Aloy, salda in groppa a un imponente Bristleback, avanza decisa attraverso un paesaggio selvaggio che si apre davanti a lei. Le ampie distese naturali, illuminate da una luce suggestiva, si estendono fino all’orizzonte, trasmettendo un senso di libertà e vastità. La sua postura rivela determinazione e padronanza, come se ogni passo del suo destriero meccanico fosse guidato da uno scopo preciso. Il vento le corre incontro, portando con sé l’odore della terra e il richiamo dell’avventura. In questo momento, Aloy incarna lo spirito della viaggiatrice instancabile, pronta a spingersi sempre oltre per scoprire cosa l’attende.",
        },
        {
          src: "/immagini/card15.JPG",
          title: "Lo Sguardo della Guerriera",
          description:
            "Aloy affronta l’ignoto con lo sguardo intenso di chi ha attraversato battaglie e superato prove impossibili. I segni di pittura da guerra, tracciati con cura sul volto, raccontano una storia di forza, determinazione e appartenenza a un retaggio di combattenti. Ogni linea dipinta è un simbolo: di protezione, di sfida e di identità. I suoi occhi, fissi e penetranti, trasmettono la calma di chi conosce il pericolo ma non lo teme, mentre attorno a lei il mondo sembra trattenere il respiro, sospeso in attesa. In quell’istante, Aloy incarna la perfetta armonia tra coraggio e strategia, una leader nata che si muove con la sicurezza di chi sa di avere una missione più grande di sé.",
        },
        {
          src: "/immagini/card12.JPG",
          title: "Ruggito dello Stalker al Tramonto",
          description:
            "Il sole cala tingendo il cielo di sfumature ardenti, e tra le ombre allungate della sera si staglia la sagoma di uno Stalker, macchina letale e silenziosa, agile e predatoria come un felino selvaggio. Il metallo che ne ricopre il corpo cattura gli ultimi raggi di luce, scintillando in riflessi dorati e cremisi. Con movimenti calcolati e impercettibili, si prepara all’attacco, mentre un ruggito meccanico rompe la quiete, portando con sé l’eco di una minaccia imminente.",
        },
        {
          src: "/immagini/card1.JPG",
          title: "Aloy contro il Colosso nella Notte",
          description:
            "La notte avvolge la terra in un silenzio carico di tensione, interrotto solo dal crepitio lontano delle macchine e dal fruscio dell’erba mossa dal vento. Aloy, solitaria e determinata, si erge davanti a una creatura colossale, un titano di metallo e luce che incombe su di lei come una montagna vivente. Le luci pulsanti della macchina fendono l’oscurità, disegnando bagliori innaturali sulle rocce e sugli alberi circostanti, mentre il suo respiro profondo si fonde con il battito del cuore.",
        },
        {
          src: "/immagini/card14.JPG",
          title: "Davanti alla Porta del Passato",
          description:
            "Aloy si trova sola, di fronte a una porta monumentale, silenziosa e immobile da secoli. Il metallo antico è segnato dal tempo, ma ancora intatto, avvolto da un’aura di mistero e potere. Dietro quelle pareti si nascondono segreti dimenticati, conoscenze perdute che nessun altro può reclamare. Solo lei, erede di un retaggio unico e portatrice del volto di Elisabet Sobeck, ha il diritto di varcarla. Il vento soffia leggero, sollevando polvere e foglie, mentre i ricordi e le speranze si intrecciano nel suo cuore.",
        },
        {
          src: "/immagini/card6.JPG",
          title: "Lo Sguardo Dorato",
          description:
            "L’immagine cattura un momento di pura intensità, dove un solo occhio diventa finestra sull’anima di una guerriera. Aloy, con il volto segnato da una pittura dorata che scintilla sotto la luce, incarna forza e determinazione. Ogni granello di colore, ogni sfumatura metallica riflette il peso del suo viaggio e la solennità delle battaglie affrontate. Lo sguardo, fermo e imperturbabile, racconta una storia di resilienza, di terre attraversate, di nemici abbattuti e di misteri svelati solo a metà.",
        },
        {
          src: "/immagini/card16.JPG",
          title: "Salto verso l’orizzonte",
          description:
            "Il sole, ormai basso sull’orizzonte, incendia il cielo con pennellate di rosso, arancio e oro, mentre le nuvole sottili si tingono di luce calda. Le pianure sottostanti si riempiono di ombre profonde, e ogni rilievo del paesaggio sembra scolpito dalla luce del tramonto. In mezzo a questo scenario maestoso, un Tallneck si erge imponente, la sua sagoma metallica inconfondibile e solenne contro la distesa del cielo. Sul punto più alto della macchina, Aloy si prepara al salto, i muscoli tesi e lo sguardo rivolto verso la terra lontana.",
        },
        {
          src: "/immagini/card17.JPG",
          title: "La Guerriera alla Luce del Focus",
          description:
            "Un bagliore viola, vibrante e misterioso, illumina il volto di Aloy, fondendosi con la pittura dorata che segna la sua pelle come un marchio di guerra e di destino. Ogni sfumatura della luce sembra raccontare una storia: battaglie vinte contro avversari impossibili, terre attraversate tra pericoli e meraviglie, verità scoperte dove nessuno aveva mai osato cercare. I suoi occhi, fermi e sicuri, sono come lame affilate pronte a penetrare il velo dell’ignoto, scrutando orizzonti che pochi hanno il coraggio di affrontare.",
        },
        {
          src: "/immagini/card18.JPG",
          title: "Tramonto oltre le montagne",
          description:
            "Aloy è seduta con la schiena verso di noi, i capelli mossi leggermente dal vento mentre osserva il sole scivolare lentamente dietro le imponenti montagne all’orizzonte. I colori caldi del tramonto arancioni, rosa e sfumature di viola dipingono il cielo e si riflettono sulle vette rocciose, creando un contrasto delicato con la silhouette della protagonista. Il silenzio del momento sembra sospeso, interrotto solo dal fruscio del vento e dal battito del cuore che accompagna la sua contemplazione.",
        },
      ],
      visibleCards: 3,
      currentIndex: 0,
      isTransitioning: true,
      selectedImage: null,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    displayImages() {
      return [...this.images, ...this.images, ...this.images];
    },
    cardWidth() {
      if (this.windowWidth < 576) return "100%";
      if (this.windowWidth < 992) return "50%";
      return "33.3333%";
    },
  },
  mounted() {
    this.currentIndex = this.images.length;
    window.addEventListener("resize", this.updateWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  },
  methods: {
    nextSlide() {
      this.isTransitioning = true;
      this.currentIndex++;
    },
    prevSlide() {
      this.isTransitioning = true;
      this.currentIndex--;
    },
    handleTransitionEnd() {
      const n = this.images.length;
      if (this.currentIndex >= this.displayImages.length - this.visibleCards) {
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
            this.displayImages.length - (n + this.visibleCards);
          requestAnimationFrame(() => {
            this.isTransitioning = true;
          });
        });
      }
    },
    selectImage(image) {
      this.selectedImage = image;
    },
    closeOverlay() {
      this.selectedImage = null;
    },
    updateWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>

<style scoped>
.img-hover {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.img-hover:hover {
  transform: scale(1.05);
  opacity: 0.85;
}

.text-block {
  opacity: 1;
  pointer-events: auto;
}
</style>
