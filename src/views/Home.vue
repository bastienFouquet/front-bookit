<template>
  <div class="content-accueil">
    <v-data-table
        :headers="headers"
        :items="books"
        class="elevation-1 data-table-books"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Liste des livres</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="addDialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="secondary"
                  v-bind="attrs"
                  v-on="on"
              >
                Ajouter un livre
              </v-btn>
            </template>
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
                    @click="addDialog = false"
                >
                  Annuler
                </v-btn>
                <v-btn
                    color="success"
                    depressed
                    :disabled="editedItem.isbn.length !== 13"
                    @click="createBook"
                >
                  Ajouter
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="manageDialog" max-width="500px">
            <v-card>
              <v-card-title class="headline">{{editedItem.title}}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="manageDialog = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.quantity="{ item }">
        <v-chip
            color="secondary"
        >
          {{ item.quantity }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="manageDialog = true; editedItem = item"
        >
          mdi-pencil
        </v-icon>

      </template>
      <template v-slot:no-data>
        Il n'y a pas de livre
      </template>
    </v-data-table>
    <v-alert
        border="right"
        colored-border
        type="success"
        elevation="2"
        width="180px"
        class="ma-auto mt-4 alert-addBook"
        v-if="addBookState"
    >
      <v-row align="center">
        <v-col class="grow">
          Livre ajouté !
        </v-col>
      </v-row>
    </v-alert>
    <v-row align="center" justify="space-around" class="ma-3">
      <v-btn>Deconnexion</v-btn>
    </v-row>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Home',
  data() {
    return {
      books: [],
      search: '',
      addBookState: false,
      addDialog: false,
      manageDialog: false,
      editedIndex: -1,
      defaultItem: {
        title: '',
        isbn: '',
        quantity: 1
      },
      editedItem: {
        title: '',
        isbn: '',
        quantity: 1
      },
      headers: [
        {text: 'Titre', value: 'title'},
        {text: 'ISBN', value: 'isbn'},
        {text: 'Quantité', value: 'quantity'},
        {text: 'Modifications Stock', value: 'actions', sortable: false}
      ]
    }
  },
  async created () {
    await this.getBooks()
  },
  methods: {
    getBooks: async function () {
      try {
        const response = await axios.get(this.booksApiURL() + '/books');
        this.books = response.data
      } catch (e) {
        console.error(e);
      }
    },
    addOperations: async function (item) {
      try {
        console.log(item);
        //const response = await axios.put(this.booksApiURL() + '/books/' + item.id);
      } catch (e) {
        console.error(e);
      }
    },
    createBook: async function () {
      try {
        await axios.post(this.booksApiURL() + '/books', {
          title: this.editedItem.title,
          isbn: this.editedItem.isbn,
          quantity: this.editedItem.quantity,
        });
        await this.getBooks();
        this.addBookState = true;
        this.addDialog = false;
      } catch (e) {
        console.error(e);
      }

    },
  },
}

</script>

<style scoped>
.content-accueil {
  position: relative;
}

.data-table-books {
  margin-top: 80px;
}

.alert-addBook {
  position: absolute;
  top: -100px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>

