<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <categories-model-components
        v-if="opneModel"
        :editcategoriespropsdata="editcategoriesdata"
        :modelTitleprops="modelTitle"
        @close-event="closeModel($event)"
      ></categories-model-components>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-data-table
            :headers="headers"
            :items="list.categoriesalldata"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="black">
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-btn color="primary" dark class="mb-2" @click="openModel"
                  >New Item</v-btn
                >
              </v-toolbar>
            </template>
            <template v-slot:[`item.cstatus`]="{ item }">
              <v-switch
                flat
                v-model="item.cstatus"
                color="success"
                :label="`${item.cstatus ? 'Active' : 'Deactive'}`"
                @change="changeStatus(item)"
              ></v-switch>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <!-- <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template> -->
          </v-data-table></v-sheet
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import { axios } from "axios";
import { mapState } from "vuex";
import CategoriesModelComponents from "../components/model/CategoriesModelComponents.vue";

export default {
  components: {
    CategoriesModelComponents,
  },
  head: {
    link: [
      {
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
      },
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
        type: "text/javascript",
      },
      {
        src: "https://unpkg.com/sweetalert/dist/sweetalert.min.js",
      },
    ],
  },
  data: () => ({
    opneModel: false,
    status: "",
    list: [],
    headers: [
      {
        text: "Categories Name",
        align: "start",
        sortable: false,
        value: "cname",
      },
      { text: "Description", value: "cdescription" },
      { text: "Status", value: "cstatus" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
    editcategoriesdata: "",
    modelTitle: null,
  }),

  // computed: {
  //   ...mapState(["categoriesalldata"]),
  // },

  mounted() {
    console.log("mydata", this.$store.state.categoriesalldata);
    this.list = this.$store.state;
  },
  created() {
    this.$store.dispatch("getCategories");
    this.list = this.$store.state;
    // this.initialize();
    console.log(this.$store);
    setTimeout(() => {
      this.$store.state.categoriesalldata[0] = {
        id: 1,
        cname: "cate33",
        cdescription: "cate344",
        cstatus: true,
      };
    }, 3000);
    console.log("mydata2", this.$store.state);
  },

  methods: {
    closeModel(value) {
      this.opneModel = value;
    },
    // Change Status
    async changeStatus(item) {
      await this.$axios.put("http://localhost:3001/categoires/" + item.id, {
        cname: item.cname,
        cdescription: item.cdescription,
        cstatus: item.cstatus ? true : false,
      });
      // this.$store.dispatch("getchangeStatus", item);
      // console.log("dsfdsfdsf");
      // this.$store.commit("UPDATE_STATUS", item);
      // // .then(() => {
      // //   // this.initialize();
      // //   this.$store.commit(chagestatus, item);
      // // });
    },
    // Add Button Click Open Model
    openModel() {
      this.opneModel = !this.opneModel;
      this.modelTitle = "Add Categories";
      this.editcategoriesdata = [];
    },
    editItem(item) {
      this.opneModel = !this.opneModel;
      this.editcategoriesdata = item;
      this.modelTitle = "Edit Categories";
      // this.editedIndex = this.categoriesalldata.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialog = true;
    },
    deleteItem(item) {
      // console.log(item.id);
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store.dispatch("deleteCategories", item);
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
            timer: 3000,
          });
        } else {
          swal("Your imaginary file is safe!", {
            buttons: false,
            timer: 2000,
          });
        }
      });
    },
  },
};
</script>
