<template>
  <v-card>
    <v-card-title>{{ recipe.title }}</v-card-title>
    <v-card-text>
      <strong>Ingredientes:</strong>
      <div style="white-space:pre-wrap">{{ recipe.ingredients }}</div>
      <strong>Modo de preparo:</strong>
      <div style="white-space:pre-wrap">{{ recipe.instructions }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn text v-on:click="$emit('delete-request')">Remover</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({ recipe: { type: Object, required: true } })
</script>
