# Catálogo de Receitas (Vue 3 + Vite + Vuetify)

Discente: Kenny Amabile da Rocha
Matricula: 20230005088

## Descrição do projeto
Site para cadastrar receitas


### Recursos implementados
- Rotas: CRUD (`/crud`), Listagem em cards filtráveis (`/cards`), Sobre (`/about`).
- Vue Router, Vuetify 3, localStorage para persistência (chave: `healthy_recipes_v1`).
- Componentização: `RecipeForm`, `RecipeCard`, `FilterBar`.
- Diretivas e bindings demonstradas: `v-for`, `v-if`, `v-else`, `v-bind` (ex.: `v-bind:recipe`), `v-on` (ex.: `v-on:click`), `v-model`.
- UI Vuetify: App bar, cards, forms, dialog de confirmação (v-dialog) e feedback com snackbar (v-snackbar).
- CRUD: criar, listar, atualizar e remover receitas; sincronização com localStorage.
- Validações simples no formulário (campos obrigatórios).

## Como rodar
1. Instale dependências:
```bash
npm install
```

2. Rode em modo de desenvolvimento:
```bash
npm run dev
```

3. Abra no navegador (Vite mostrará o endereço, tipicamente `http://localhost:5173`)

## Observações
- Dados são salvos em `localStorage` na chave `healthy_recipes_v1`.
- As confirmações de remoção fazem uso de `v-dialog` (não mais `window.confirm`).
- O projeto foi ajustado para demonstrar explicitamente `v-else`, `v-bind:` e `v-on:` conforme solicitado no enunciado.
