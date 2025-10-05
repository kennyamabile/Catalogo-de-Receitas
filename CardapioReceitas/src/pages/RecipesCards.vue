<template>
  <div class="page-content">
    <v-row class="mb-4">
      <v-col cols="12">
        <FilterBar v-model:search="search" />
      </v-col>
    </v-row>

    <v-row>
      <template v-if="filtered.length > 0">
        <v-col cols="12" md="4" v-for="r in filtered" :key="r.id">
          <RecipeCard v-bind:recipe="r" v-on:delete-request="confirmDelete(r.id)" />
        </v-col>
      </template>
      <template v-else>
        <div class="text-center pa-4">Nenhuma receita encontrada.</div>
      </template>
    </v-row>

    <v-dialog v-model="confirmDialog" persistent max-width="450">
      <v-card>
        <v-card-title class="headline">Confirmar remoção</v-card-title>
        <v-card-text>Deseja remover esta receita?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDialog = false">Cancelar</v-btn>
          <v-btn color="error" @click="onConfirmDelete">Remover</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :timeout="3000">{{ snackbar.message }}</v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import FilterBar from '../components/FilterBar.vue'
import { readRecipes, saveRecipes } from '../lib/storage'

const recipes = ref(readRecipes())
const search = ref('')
const confirmDialog = ref(false)
const deleteTarget = ref(null)
const snackbar = ref({ show: false, message: '' })

function confirmDelete(id) {
  deleteTarget.value = id
  confirmDialog.value = true
}

function onConfirmDelete() {
  const id = deleteTarget.value
  const idx = recipes.value.findIndex(r => r.id === id)
  if (idx >= 0) {
    recipes.value.splice(idx, 1)
    saveRecipes(recipes.value)
    snackbar.value = { show: true, message: 'Receita removida.' }
  }
  confirmDialog.value = false
  deleteTarget.value = null
}

const filtered = computed(() => {
  const q = (search.value || '').toLowerCase().trim()
  if (!q) return recipes.value
  return recipes.value.filter(r => (r.title || '').toLowerCase().includes(q) || (r.ingredients || '').toLowerCase().includes(q))
})
</script>

<style scoped>
.page-content {
  padding-top: 80px;
}
</style>
