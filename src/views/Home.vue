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
              <v-btn v-if="$data.user.role.label === 'Admin'"
                  color="secondary"
                  v-bind="attrs"
                  v-on="on"
              >
                Ajouter un livre
              </v-btn>
            </template>
            <AddBookDialog :editedItem="editedItem" v-on:createBook="createBook" v-on:close="addDialog = false"></AddBookDialog>
          </v-dialog>
          <v-dialog v-model="manageDialog" max-width="500px">
            <EditBookDialog v-on:refresh="getBooks" :editedItem="editedItem" v-on:close="manageDialog = false"></EditBookDialog>
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
    <v-row align="center" justify="space-around" class="ma-3 flex-column">
      Connecté en tant que {{this.user.login}}
      <v-btn @click="disconnect" class="my-3">Deconnexion</v-btn>
    </v-row>
  </div>
</template>

<script>

import axios from "axios";

import AddBookDialog from "@/components/AddBookDialog";

import EditBookDialog from "@/components/EditBookDialog";

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
  components: {
    AddBookDialog,
    EditBookDialog
  },
  async created () {
    await this.getBooks()
  },
  methods: {
    getBooks: async function () {
      try {
        const response = await axios.get(this.booksApiURL() + '/books', this.getHeaders());
        this.books = response.data
      } catch (e) {
        console.error(e);
      }
    },
    createBook: async function () {
      try {
        const response = await axios.post(this.booksApiURL() + '/books', {
          title: this.editedItem.title,
          isbn: this.editedItem.isbn,
          quantity: this.editedItem.quantity,
        }, this.getHeaders());
        if (response) {
          await this.getBooks();
          this.addBookState = true;
          this.addDialog = false;
        }
      } catch (e) {
        console.error(e);
      }

    },
    disconnect: function () {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('login');
    }
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

