<template>
  <div class="uk-card uk-card-default" style="width:100%">
    <div class="uk-child-width-1-2@s" uk-grid>
      <div>
        <h5 class="chip heading">Dr {{ doctor_name }}</h5>
      </div>
      <div>
        <div class="uk-child-width-1-2@s action-frame" uk-grid>
          <div>
            <h5 class="action">
              <a uk-icon="icon: pencil" @click="openEditor"></a>
            </h5>
          </div>
          <div>
            <h5 class="action">
              <a uk-icon="icon: trash" @click="openDeleter"></a>
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isEditorOpen === true">
      <hr />
      <div>
        <form
          class="uk-grid-small uk-padding"
          @submit.prevent="submitForm"
          uk-grid
        >
          <div class="uk-width-1-1 name-field">
            <input
              class="uk-input"
              type="text"
              v-model="name"
              placeholder="Enter Doctor Name"
              required
            />
          </div>
          <div class="uk-width-1-2 name-field">
            <input
              class="uk-input"
              type="text"
              v-model="dphone"
              placeholder="Phone Number"
            />
          </div>
          <div class="uk-width-1-2 name-field">
            <input
              class="uk-input"
              type="text"
              v-model="daddress"
              placeholder="Address"
            />
          </div>
          <div class="uk-width-1-1 name-field">
                <label>Is Cut Not Applicable</label>
                <input type="checkbox" v-model="isCutnotApplicable" style="margin-left:10px">
          </div>
          <div class="uk-width-1-1 name-field">
            <button
              class="uk-button uk-button-primary"
              @click="makeupdateRequest"
              :disabled="$store.state.doctors.isUpdating"
            >
              <div
                v-if="$store.state.doctors.isUpdating"
                uk-spinner="ratio :0.8"
              ></div>
              <div v-else>Update</div>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      class="uk-container"
      v-if="isDeleterOpen === true && $store.state.doctors.isDeleted === false"
    >
      <hr />
      <h5 style="text-align: center">
        Are You Sure To Delete {{ doctor_name }}
      </h5>
      <p class="uk-align-center" uk-margin>
        <button
          class="uk-button uk-button-default uk-align-center"
          @click="openDeleter"
        >
          Cancel
        </button>
        <button
          class="uk-button uk-button-danger uk-align-center"
          @click="makedeleteRequest"
          :disabled="$store.state.doctors.isDeleting"
        >
          <div
            v-if="$store.state.doctors.isDeleting"
            uk-spinner="ratio :0.8"
          ></div>
          <div v-else>Delete</div>
        </button>
      </p>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.doctor_name,
      dphone: this.phone,
      isCutnotApplicable: this.isCutNotApplicable,
      daddress: this.address,
      isEditorOpen: false,
      isDeleterOpen: false,
    };
  },
  props: {
    id: null,
    doctor_name: null,
    phone: null,
    address: null,
    isCutNotApplicable: null,
  },
  methods: {
    openEditor() {
      this.isEditorOpen = !this.isEditorOpen;
    },
    openDeleter() {
      this.isDeleterOpen = !this.isDeleterOpen;
      this.$store.state.doctors.isDeleted = false;
    },
    makedeleteRequest() {
      this.$store.dispatch({
        type: "doctors/delete_doctor",
        payload: {
          id: this.id,
        },
      });
    },
    makeupdateRequest() {
      this.$store.dispatch({
        type: "doctors/update_doctor",
        payload: {
          id: this.id,
          name: this.name,
          phone: this.dphone,
          address: this.daddress,
          isCutNotApplicable:this.isCutnotApplicable
        },
      });
    },
  },
};
</script>

<style scoped>
.chip {
  padding:2px;
  width:100%;
  transition: width 2s, height 4s;
}

.uk-card {
  margin: 7px;
  width:100%;
  transition: width 2s, height 4s;
}

.heading {
  text-align: left;
  margin-left: 5px;
}

.action {
  padding: 7px;

}

.action-frame {
  margin: 0px;
}
</style>
