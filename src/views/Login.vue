<template>
  <div class="inner-form text-center d-flex mt-10">
    <h1>Se connecter</h1>

    <form class="form-auth">
      <v-text-field
          v-model="login"
          label="Nom d'utilisateur"
          required
      ></v-text-field>
      <v-text-field
          v-model="password"
          label="Mot de passe"
          required
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
      ></v-text-field>
      <p>Vous n'avez pas de compte ? <router-link to="/register">Créer un compte</router-link></p>
      <v-btn
          class="mr-4"
          @click="authenticate"
          :disabled="!password && !login"
      >
        Se connecter
      </v-btn>
    </form>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Login',
  data() {
    return {
      error: false,
      login: null,
      password: null,
      showPassword: false
    }
  },
  methods: {
    authenticate: async function () {
      try {
        this.error = false
        const response = await axios.post(this.baseApiURL() + '/auth', {
          login: this.login,
          password: this.password
        })
        this.$data.token = response.data.token
        setTimeout(() => {
          this.$router.push({name: 'Home'})
        }, 100)
      } catch (e) {
        console.error(e);
        this.error = true;
      }
    }
  }
}

</script>

<style>
.form-auth {
  width: 50%;
  margin: auto;
}
.inner-form {
  flex-direction: column;
}
</style>
