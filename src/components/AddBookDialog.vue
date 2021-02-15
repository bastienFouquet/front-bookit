<template>
  <v-card>
    <v-card-title>
      <span class="headline">Ajouter un livre</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
                v-model="editedItem.title"
                label="Titre du livre"
                required
                hint="Entrer le titre du livre"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-text-field
                required
                v-model="editedItem.isbn"
                label="ISBN"
                hint="Numéro unique à 13 chiffres"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
                type="number"
                required
                v-model="editedItem.quantity"
                label="Quantité"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="red"
          text
          @click="$emit('close')"
      >
        Annuler
      </v-btn>
      <v-btn
          color="success"
          depressed
          :disabled="editedItem.isbn.length !== 13"
          @click="$emit('createBook')"
      >
        Ajouter
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'AddBookDialog',
  props: ['editedItem']
}

</script>
