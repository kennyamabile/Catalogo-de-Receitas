<template>
  <div class="page-content">
    <v-row>
      <!-- Formulário de cadastro/edição -->
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title>{{ editIndex === null ? "Nova Receita" : "Editar Receita" }}</v-card-title>
          <v-card-text>
            <RecipeForm
              :modelValue="form"
              @update:modelValue="onFormUpdate"
              @submit="onSubmit"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Lista de receitas -->
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title>Receitas</v-card-title>
          <v-card-text>
            <v-row>
              <template v-if="recipes.length > 0">
                <v-col cols="12" v-for="r in recipes" :key="r.id">
                  <v-row align="center">
                    <v-col cols="9">
                      <strong>{{ r.title }}</strong>
                    </v-col>
                    <v-col cols="3" class="text-right">
                      <v-btn small color="primary" v-on:click="onEdit(r)">Editar</v-btn>
                      <v-btn small color="error" v-on:click="confirmDelete(r.id)">Remover</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </template>
              <template v-else>
                <div class="text-center pa-4">
                  Nenhuma receita cadastrada.
                </div>
              </template>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Confirm Dialog -->
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

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :timeout="3000">{{ snackbar.message }}</v-snackbar>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import RecipeForm from '../components/RecipeForm.vue'
import { readRecipes, saveRecipes } from '../lib/storage'

const recipes = ref(readRecipes())
const editIndex = ref(null)

const form = reactive({
  id: null,
  title: '',
  ingredients: '',
  instructions: ''
})

const confirmDialog = ref(false)
const deleteTarget = ref(null)
const snackbar = ref({ show: false, message: '' })

function onFormUpdate(payload) {
  Object.assign(form, { ...payload })
}

function onSubmit(data) {
  // Validação no submit para garantir que todos os campos estão preenchidos
  if (!data.title || !data.ingredients || !data.instructions) {
    snackbar.value = { show: true, message: 'Todos os campos são obrigatórios!' }
    return
  }

  // Caso os campos estejam ok, atualiza a lista
  if (!data.id) {
    data.id = Date.now().toString()
    recipes.value.push({ ...data })
    snackbar.value = { show: true, message: 'Receita adicionada.' }
  } else {
    const idx = recipes.value.findIndex(r => r.id === data.id)
    if (idx >= 0) {
      recipes.value[idx] = { ...data }
      snackbar.value = { show: true, message: 'Receita atualizada.' }
    }
  }

  saveRecipes(recipes.value)
  resetForm()  // Limpar o formulário após o envio
}

function onEdit(recipe) {
  editIndex.value = recipes.value.findIndex(r => r.id === recipe.id)
  Object.assign(form, { ...recipe })
}

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
    if (editIndex.value === idx) resetForm()
  }
  confirmDialog.value = false
  deleteTarget.value = null
}

function resetForm() {
  editIndex.value = null
  Object.assign(form, { id: null, title: '', ingredients: '', instructions: '' })
}
</script>

<style scoped>
.page-content {
  padding-top: 80px;
}
</style>
