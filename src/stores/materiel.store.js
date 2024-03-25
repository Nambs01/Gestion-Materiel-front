import { defineStore } from 'pinia';
import axios from 'axios';

export const useMaterielStore = defineStore('materiel', {
  state: () => ({
    materiels: null,
    errorMessage: null
  }),

  actions: {
    async getAllMateriel() {
      await axios
        .get('http://127.0.0.1:3000/api/materiels')
        .then((response) => {
          this.materiels = response.data.materiels;
          console.log('get success');
        })
        .catch((error) => {
          console.log('error', error);
        });
    },

    async addMateriel(num_materiel, design, etat, quantite) {
      await axios
        .post('http://127.0.0.1:3000/api/materiels', {
          num_materiel,
          design,
          etat,
          quantite
        })
        .then(() => {
          this.materiels = [...this.materiels, { num_materiel, design, etat, quantite }];
          console.log('Add success');
        })
        .catch((error) => {
          console.log(error);
          throw Error(error);
        });
    },

    async updateMateriel(num_materiel, design, etat, quantite) {
      await axios
        .patch(`http://127.0.0.1:3000/api/materiels/${num_materiel}`, {
          num_materiel,
          design,
          etat,
          quantite
        })
        .then(async () => {
          console.log('Update success');
          await this.getAllMateriel();
        })
        .catch((error) => {
          console.log(error);
          throw Error(error);
        });
    },

    async deleteMateriel(num_materiel) {
      await axios.delete(`http://127.0.0.1:3000/api/materiels/${num_materiel}`).then(async () => {
        console.log('Delete success');
        await this.getAllMateriel();
      });
    }
  },

  getters: {
    getMaterielById: (state) => {
      return (id) => {
        return state.materiels.filter((materiel) => {
          return materiel.num_materiel === id;
        })[0];
      };
    },
    counteMateriels: (state) => {
      return async () => {
        let counteBon = 0;
        let counteMauvais = 0;
        let counteAbime = 0;
        let total = 0;

        await state.materiels.forEach((materiel) => {
          total += materiel.quantite;

          switch (materiel.etat) {
            case 'Bon':
              counteBon += materiel.quantite;
              break;
            case 'Mauvais':
              counteMauvais += materiel.quantite;
              break;
            case 'Abimé':
              counteAbime += materiel.quantite;
              break;
          }
        });

        return {
          counteBon,
          counteMauvais,
          counteAbime,
          total
        };
      };
    }
  }
});
