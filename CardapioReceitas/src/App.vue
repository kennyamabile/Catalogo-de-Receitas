<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Catálogo de Receitas Saudáveis</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text :to="{ name: 'cards' }" router>Listagem</v-btn>
      <v-btn text :to="{ name: 'crud' }" router>CRUD</v-btn>
      <v-btn text :to="{ name: 'about' }" router>Sobre</v-btn>
    </v-app-bar>

    <v-main class="pa-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
</script>

<style>
body { font-family: Roboto, Arial, sans-serif; }
</style>
