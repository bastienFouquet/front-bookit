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
          :rules="[rules.min]"
          hint="Au moins 8 characters"
          @click:append="showPw = !showPw"
          required
      ></v-text-field>
      <v-text-field
          v-model="confirmPassword"
          label="Confirmation du mot de passe"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirmPassword ? 'text' : 'password'"
          :rules="[rules.min]"
          hint="Au moins 8 characters"
          @click:append="showConfirmPassword = !showConfirmPassword"
          required
      ></v-text-field>
      <p>Vous avez un compte ? <router-link to="/login">Se connecter</router-link></p>
      <v-btn
          class="mr-4"
          @click="submit"
          :disabled="!login || !password || !confirmPassword"
      >
        Créer un compte
      </v-btn>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      showPw: false,
      showConfirmPassword: false,
      login: null,
      password: null,
      confirmPassword: null,
      rules: {
        min: v => v.length >= 8 || 'Minimum 8 caractères !'
      }
    }
  }
}

</script>


