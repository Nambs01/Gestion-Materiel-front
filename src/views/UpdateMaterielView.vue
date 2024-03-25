<template>
  <div class="columns is-justify-content-center">
    <div class="column is-8-desktop is-10-tablet">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title is-size-5">Modification de materiel</p>
        </header>
        <div class="card-content">
          <form action="">
            <div class="field">
              <label for="num_materiel" class="label">
                Numero materiel <span class="has-text-danger">*</span>
              </label>
              <div class="control">
                <input
                  type="text"
                  name="num_materiel"
                  v-model="num_materiel"
                  :class="error_num_materiel ? 'input is-danger' : 'input'"
                  placeholder="Entrer le numero du materiel"
                  required
                />
              </div>
              <p class="help is-danger">{{ error_num_materiel }}</p>
            </div>
            <div class="field">
              <label for="design" class="label">
                Design <span class="has-text-danger">*</span>
              </label>
              <div class="control">
                <input
                  type="text"
                  name="design"
                  v-model="design"
                  :class="error_design ? 'input is-danger' : 'input'"
                  placeholder="Entrer le nom du materiel"
                  required
                />
              </div>
              <p class="help is-danger">{{ error_design }}</p>
            </div>
            <div class="field">
              <label for="etat" class="label">Etat <span class="has-text-danger">*</span></label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select name="etat" v-model="etat">
                    <option value="Bon">Bon</option>
                    <option value="Mauvais">Mauvais</option>
                    <option value="Abimé">Abimé</option>
                  </select>
                </div>
              </div>
              <p class="help is-danger">{{ error_etat }}</p>
            </div>
            <div class="field">
              <label for="qt" class="label">Quantité <span class="has-text-danger">*</span></label>
              <div class="control">
                <input
                  type="number"
                  name="qt"
                  v-model="quantite"
                  :class="error_quantite ? 'input is-danger' : 'input'"
                  placeholder="Entrer la quantité du materiel"
                  required
                />
              </div>
              <p class="help is-danger">{{ error_quantite }}</p>
            </div>
            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <RouterLink class="button is-link is-light" to="/">Annuler</RouterLink>
              </p>
              <p class="control">
                <button class="button is-link" @click="validationUpdate">Valider</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModalSuccess" class="modal is-active">
    <div class="modal-background is-flex is-align-items-center">
      <div class="modal-content is-flex is-justify-content-center">
        <div class="card success-content p-5">
          <div class="card-content">
            <p class="title has-text-success-30">{{ '>> Succès' }}</p>
            <p>La modification des informations d'un matériel est effectutée avec succès.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useMaterielStore } from '@/stores/materiel.store';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();

const showModalSuccess = ref(false);
const num_materiel = ref();
const design = ref();
const etat = ref();
const quantite = ref();

const error_num_materiel = ref();
const error_design = ref();
const error_etat = ref();
const error_quantite = ref();

onMounted(() => {
  const materiel = useMaterielStore().getMaterielById(route.params.id);
  num_materiel.value = materiel.num_materiel;
  design.value = materiel.design;
  etat.value = materiel.etat;
  quantite.value = materiel.quantite;
});

const validationUpdate = async (e) => {
  e.preventDefault();
  num_materiel.value = num_materiel.value?.trim();
  design.value = design.value?.trim();
  if (!num_materiel.value) {
    error_num_materiel.value = 'Verifie le numero du matériel !';
  }
  if (!design.value) {
    error_design.value = 'Verifie le design du matériel !';
  }
  if (!etat.value) {
    error_etat.value = "Choisi l'état du matériel !";
  }
  if (!quantite.value) {
    error_quantite.value = 'Verifie la quantité du matériel !';
  }

  if (num_materiel.value && design.value && etat.value && quantite.value) {
    try {
      await useMaterielStore().updateMateriel(
        num_materiel.value,
        design.value,
        etat.value,
        quantite.value
      );
      showModalSuccess.value = true;
      setTimeout(() => {
        showModalSuccess.value = false;
        router.push('/');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.success-content {
  width: fit-content;
}
</style>
