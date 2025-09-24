import { createStore } from "vuex";

export default createStore({
  state: {
    beasts: [
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
    ],
  },
  mutations: {
    ADD_BEAST(state, beast) {
      state.beasts.push(beast);
    },
  },
  actions: {
    addBeast({ commit }, beast) {
      commit("ADD_BEAST", beast);
    },
  },
  getters: {
    allBeasts: (state) => state.beasts,
  },
});
