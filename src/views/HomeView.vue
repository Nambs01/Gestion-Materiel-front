<template>
  <main>
    <h2 class="is-size-3 has-text-weight-medium has-text-black">Liste des materiels</h2>
    <RouterLink class="button is-success is-small" to="/add">AJOUTER</RouterLink>
    <div class="columns my-2 is-multiline">
      <div class="column is-12-tablet is-8-desktop">
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr class="is-link">
              <th class="has-text-light">Numero Materiel</th>
              <th class="has-text-light">Design</th>
              <th class="has-text-light">Etat</th>
              <th class="has-text-light">Quantite</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="materiel in useMaterielStore().materiels">
              <td>{{ materiel.num_materiel }}</td>
              <td>{{ materiel.design }}</td>
              <td class="has-text-centered">
                <p :class="styleEtat(materiel.etat)">{{ materiel.etat }}</p>
              </td>
              <td>{{ materiel.quantite }}</td>
              <td>
                <RouterLink
                  :to="{ name: 'update', params: { id: materiel.num_materiel } }"
                  class="button is-small is-link is-light mx-2"
                >
                  Modifier
                </RouterLink>
                <button
                  class="button is-small is-link mx-2"
                  @click="suppression(materiel.num_materiel, materiel.design)"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="column is-12-tablet is-4-desktop">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Statistique</p>
          </header>
          <div class="card-content">
            <table class="table is-striped is-fullwidth">
              <tbody>
                <tr>
                  <th>Bon</th>
                  <td>{{ counteBon }}</td>
                </tr>
                <tr>
                  <th>Mauvais</th>
                  <td>{{ counteMauvais }}</td>
                </tr>
                <tr>
                  <th>Abimé</th>
                  <td>{{ counteAbime }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="is-link">
                  <th class="has-text-light">TOTAL</th>
                  <td class="has-text-light">{{ total }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModalDelete" class="modal is-active">
      <div class="modal-background is-flex is-align-items-center">
        <div class="modal-content">
          <div class="card">
            <header class="card-header has-background-danger-40">
              <p class="card-header-title has-text-light">Suppression</p>
            </header>
            <div class="card-content">
              <p class="has-text-centered">
                Voulez-vous vraiment supprimer le {{ design_supprimer }} "{{
                  num_materiel_supprimer
                }}" ?
              </p>
            </div>
            <footer class="card-footer p-2">
              <button
                class="card-footer-item button is-link is-light mr-1"
                @click="showModalDelete = false"
              >
                Annuler
              </button>
              <button class="card-footer-item button is-danger ml-1" @click="vadation_suppression">
                Supprimer
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useMaterielStore } from '@/stores/materiel.store';

const showModalDelete = ref(false);
const counteAbime = ref();
const counteBon = ref();
const counteMauvais = ref();
const total = ref();
const num_materiel_supprimer = ref();
const design_supprimer = ref();

const styleEtat = (etat) => {
  switch (etat) {
    case 'Bon':
      return 'tag is-rounded is-success';
    case 'Mauvais':
      return 'tag is-rounded is-warning';
    case 'Abimé':
      return 'tag is-rounded is-danger';

    default:
      break;
  }
};

const suppression = (num_materiel, design) => {
  showModalDelete.value = true;
  num_materiel_supprimer.value = num_materiel;
  design_supprimer.value = design;
};

const vadation_suppression = async () => {
  await useMaterielStore().deleteMateriel(num_materiel_supprimer.value);
  await updateStatistique();
  showModalDelete.value = false;
};

const updateStatistique = async () => {
  const statistique = await useMaterielStore().counteMateriels();
  counteBon.value = statistique.counteBon;
  counteMauvais.value = statistique.counteMauvais;
  counteAbime.value = statistique.counteAbime;
  total.value = statistique.total;
};

onMounted(async () => {
  await useMaterielStore().getAllMateriel();
  await updateStatistique();
});
</script>
