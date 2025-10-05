<template>
  <v-row align="center">
    <v-col cols="12" md="6">
      <v-text-field v-model="searchLocal" label="Pesquisar título/ingredientes"></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  search: String
})
const emit = defineEmits(['update:search'])

const searchLocal = ref(props.search || '')

watch(searchLocal, v => emit('update:search', v))
</script>
