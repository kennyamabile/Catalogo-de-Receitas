
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h5 text-center">Sobre o Sistema</v-card-title>
          <v-card-text class="text-center">
            <p>Versão do sistema: <strong>1.0.0</strong></p>
            <p>Este é um catálogo simples de receitas saudáveis. Demonstração de Vue 3 + Vuetify 3, uso de rotas, componentes, diretivas (v-for, v-if, v-else, v-bind, v-on, v-model),
        persistência em localStorage e um CRUD básico.</p>
<br>
            <p>Dicas gerais:</p>
            <ul style="list-style-type: disc; text-align: left; display: inline-block;">
              <li>Use ingredientes frescos sempre que possível.</li>
              <li>Equilibre proteínas, carboidratos e fibras nas receitas.</li>
              <li>Tags auxiliam na busca por intolerâncias ou preferências.</li>
              
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>
