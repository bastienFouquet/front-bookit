<template>
  <div class="inner-form text-center d-flex mt-10">
    <h1>Créer un compte</h1>
    <form class="form-auth">
      <v-text-field
          v-model="login"
          label="Nom d'utilisateur"
          required
      ></v-text-field>
      <v-text-field
          v-model="password"
          label="Mot de passe"
          :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPw ? 'text' : 'password'"
          :rules="[rules.min, rules.uppercase, rules.lowercase, rules.digit, rules.space]"
          hint="Au moins 8 characters, dont une majuscule, une minuscule et un chiffre."
          @click:append="showPw = !showPw"
          required
      ></v-text-field>
      <v-text-field
          v-model="confirmPassword"
          label="Confirmation du mot de passe"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirmPassword ? 'text' : 'password'"
          :rules="[rules.min, rules.uppercase, rules.lowercase, rules.digit, rules.space]"
          hint="Au moins 8 characters, dont une majuscule, une minuscule et un chiffre."
          @click:append="showConfirmPassword = !showConfirmPassword"
          required
      ></v-text-field>
      <p>Vous avez un compte ? <router-link to="/login">Se connecter</router-link></p>
      <v-btn
          class="mr-4"
          @click="register"
          :disabled="!login || !password || password !== confirmPassword || password.length < 8"
      >
        Créer un compte
      </v-btn>
    </form>
    <v-alert
        v-if="error"
        border="right"
        colored-border
        type="error"
        elevation="2"
        width="60%"
        class="ma-auto mt-4"
    >
      Une erreure est survenue. Veuillez réessayer !
    </v-alert>
    <v-alert
        v-if="success"
        border="right"
        colored-border
        type="success"
        elevation="2"
        width="60%"
        class="ma-auto mt-4"

    >
      <v-row align="center">
        <v-col class="grow">
          Compte créé avec succès !
        </v-col>
        <v-col class="shrink">
          <v-btn to="/login">Se connecter</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Register',
  data: function () {
    return {
      showPw: false,
      showConfirmPassword: false,
      login: null,
      success: false,
      error: false,
      password: null,
      confirmPassword: null,
      rules: {
        min: v => v.length >= 8 || 'Minimum 8 caractères !',
        uppercase: v => this.hasUpperCase(v) || 'Il doit y avoir au moins une majuscule.',
        lowercase: v => this.hasLowerCase(v) || 'Il doit y avoir au moins une minuscule.',
        digit: v=> this.hasDigit(v) || 'Il doit y avoir au moins un chiffre.',
        space: v => this.hasNoWhiteSpace(v) || 'Il ne doit pas y avoir d\'espace'
      }
    }
  },
  methods: {
    register: async function () {
      try {
        this.error = false;
        this.success = false;
        await axios.post(this.usersApiURL() + '/users',{
          login: this.login,
          password: this.password,
          confirmationPassword: this.confirmPassword
        });
        this.success = true;
      } catch (e) {
        console.error(e);
        this.error = true;
      }
    },
    hasUpperCase: function (str) {
      return str.match(/[A-Z]/);
    },
    hasLowerCase: function (str) {
      return str.match(/[a-z]/);
    },
    hasDigit: function (str) {
      return str.match(/[0-9]/);
    },
    hasNoWhiteSpace: function (str) {
      return !str.match(/[" "]/);
    }
  }
}

</script>


