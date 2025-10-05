<template>
  <v-form ref="formRef" v-model="isValid" @submit.prevent="submit">
    <!-- Campo de Título -->
    <v-text-field 
      v-model="local.title" 
      label="Título" 
      :rules="[required]" 
      required
    ></v-text-field>

    <!-- Campo de Ingredientes -->
    <v-textarea 
      v-model="local.ingredients" 
      label="Ingredientes" 
      rows="3" 
      :rules="[required]" 
      required
    ></v-textarea>

    <!-- Campo de Modo de Preparo -->
    <v-textarea 
      v-model="local.instructions" 
      label="Modo de preparo" 
      rows="4" 
      :rules="[required]" 
      required
    ></v-textarea>

    <!-- Botões de Ação -->
    <v-row>
      <v-col>
        <v-btn type="submit" color="primary" :disabled="!isValid">{{ local.id ? 'Salvar' : 'Adicionar' }}</v-btn>
        <v-btn type="button" text @click="onClear">Cancelar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref, watch } from 'vue'

// Recebendo as props do componente pai
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      id: null,
      title: '',
      ingredients: '',
      instructions: ''
    })
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const defaultForm = { id: null, title: '', ingredients: '', instructions: '' }
const local = ref({ ...props.modelValue })
const formRef = ref(null)

const isValid = ref(false)  // Controle de validade do formulário

// Sincroniza mudanças vindas do componente pai (edição e reset)
watch(() => props.modelValue, (newValue) => {
  local.value = { ...newValue }
  formRef.value?.resetValidation()
}, { immediate: true, deep: true })

const required = v => (v && v.toString().trim().length > 0) || 'Campo obrigatório'

// Função de submit
function submit() {
  if (!isValid.value) return // Não envia se o formulário não for válido
  emit('submit', { ...local.value })
  onClear() // Limpar após submissão
}

// Função que limpa os dados do formulário
function onClear() {
  local.value = { ...defaultForm }
  emit('update:modelValue', { ...local.value })
  formRef.value?.resetValidation()
}
</script>
