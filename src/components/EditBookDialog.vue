<template>
  <v-card>
    <v-card-title class="headline">Ajouter un mouvement</v-card-title>
    <v-card-text>
      Nom du livre : {{editedItem.title}}
      <v-form>
        <v-container>
          <v-row>
            <v-col
                cols="12"
                md="6"
            >
              <v-select
                  v-model="type"
                  :items="types"
                  item-value="id"
                  item-text="value"
                  label="Type"
                  required
              ></v-select>
            </v-col>
            <v-col
                cols="12"
                md="6"
            >
              <v-text-field
                  type="number"
                  v-model="quantity"
                  label="Quantité"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-btn @click="addOperation" :disabled="type == null || quantity == 0" class="ma-auto">Ajouter</v-btn>
      <v-data-table
          :headers="headers"
          :items="operations"
          :items-per-page="5"
          class="elevation-1"
      >
        <template v-slot:item.createdAt="{ item }">
          {{ item.createdAt | formatDate }}
        </template>
        <template v-slot:no-data>
          Aucun mouvement sur le stock de ce livre
        </template>
      </v-data-table>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('close')">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="">OK</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>

</template>

<script>

import axios from "axios";

export default {
  name: 'EditBookDialog',
  props: ['editedItem'],
  data() {
    return {
      headers: [
        {text: 'Date', value: 'createdAt'},
        {text: 'Quantité', value: 'quantity'},
        {text: 'Type', value: 'type.value'}
      ],
      types: [],
      quantity: 0,
      operations: this.editedItem.operations,
      type: null,
      addOperationState: false
    }
  },
  async created() {
    await this.getTypes();
  },
  filters: {
    formatDate: function (date) {
      return date.split('T')[0];
    }
  },
  watch: {
    editedItem: 'setOperations'
  },
  methods: {
    getTypes: async function () {
      try {
        const response = await axios.get(this.booksApiURL() + '/types',this.getHeaders());
        this.types = response.data;
      } catch (e) {
        console.error(e);
      }
    },
    addOperation: async function () {
      try {
        const response = await axios.post(this.booksApiURL() + '/operations',{
          book: this.editedItem.id,
          type: this.type,
          quantity: this.quantity
        }, this.getHeaders());
        if(response){
          this.operations.push(response.data);
          this.addOperationState = true;
          this.$emit('refresh');
        }


      } catch (e) {
        console.error(e)
      }
    },
    setOperations: function () {
      this.operations = this.editedItem.operations;
    }
  }
}

</script>
