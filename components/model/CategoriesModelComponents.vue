<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="cname"
                  label="Categorie Name"
                  :rules="cnameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="cdescription"
                  :rules="cdescriptionRules"
                  required
                  label="Description"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn
            v-if="modelTitleprops == 'Edit Categories'"
            color="blue darken-1"
            text
            @click="editcategories"
            >Save</v-btn
          >
          <v-btn
            v-if="modelTitleprops == 'Add Categories'"
            color="blue darken-1"
            text
            @click="addcategories"
            >Save</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    editcategoriespropsdata: {
      type: [Array, Object, String],
      default: {},
    },
    modelTitleprops: String,
  },
  data() {
    return {
      valid: true,
      dialog: true,
      cdescription: this.editcategoriespropsdata.cdescription,
      cdescriptionRules: [(v) => !!v || "Descriptio is required"],
      cname: this.editcategoriespropsdata.cname,
      cnameRules: [(v) => !!v || "Categories Name is required"],
      formTitle: this.modelTitleprops,
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
      // this.$refs.form.reset();
      this.$emit("close-event", false);
    },
    addcategories() {
      let data = {
        cname: this.cname,
        cdescription: this.cdescription,
        cstatus: true,
      };
      const valid = this.$refs.form.validate();
      if (valid) {
        this.$store.dispatch("addcategories", data);
        this.dialog = false;
        this.$emit("close-event", false);
      }
    },
    editcategories() {
      let data = {
        cname: this.cname,
        cdescription: this.cdescription,
        cstatus: this.editcategoriespropsdata.cstatuss,
        id: this.editcategoriespropsdata.id,
      };
      const valid = this.$refs.form.validate();
      if (valid) {
        this.$store.dispatch("updatecategories", data);
        this.dialog = false;
        this.$emit("close-event", false);
      }
    },
  },
  watch: {
    dialog(val) {
      val || this.close() || this.$emit("close-event", false);
    },
  },
};
</script>
