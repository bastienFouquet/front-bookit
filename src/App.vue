<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
      <div class="d-flex align-center justify-center ma-auto">
        <router-link class="px-10 text-decoration-none white--text" to="/">Accueil</router-link>
        <v-icon
            large
            color="white darken-2"
        >
          mdi-library
        </v-icon>
        <p class="text-uppercase text-h4 ps-2 ma-0">Book'it</p>
        <router-link class="px-10 text-decoration-none white--text" to="/add">Ajouter un livre</router-link>
      </div>

    </v-app-bar>

    <v-main class="inner-content">
      <div class="app">
        <div class="content pa-5 overflow-y-auto">
          <router-view/>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
};
</script>

<style>
.app {
  width: 900px;
  margin: 50px auto;
  height: 700px;
}
.inner-content {
  background: #D3D3D3;
  display: flex;
  justify-content: center;
}
.content {
  background: white;
  height: 100%;
}
</style>
