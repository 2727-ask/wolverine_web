<template>
  <div class="uk-container">
  <h2>Doctors</h2>
    <div class="uk-child-width-expand@s" uk-grid>
      <div>
        <div class="uk-card uk-card-primary uk-card-body">
          <div class="uk-container">
            <input
              type="text"
              class="uk-input"
              v-model="searchQuery"
              placeholder="Search"
            />
          </div>
        </div>
        <div class="uk-card uk-card-default uk-card-body doctors-list-frame">
          <br />
          <div class="doctor-count-frame">
            <div style="margin-left:4px" uk-grid>
              <div>
                <h3 class="doctor-count">
                  Associated Doctors :
                  <b>{{ $store.state.doctors.doctors.length }}</b>
                </h3>
              </div>
              <div>
                <a
                  uk-icon="icon: refresh"
                  @click="makeDoctorsGetReq"
                ></a>
              </div>
            </div>
          </div>
          <DoctorChip
            v-for="doctor in resultQuery"
            :key="doctor"
            :id="doctor.id"
            :doctor_name="doctor.name"
            :phone="doctor.phone"
            :address="doctor.address"
            :isCutNotApplicable="doctor.isCutNotApplicable"
          ></DoctorChip>
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-default uk-card-body">
          <form class="uk-grid-small" uk-grid @submit.prevent="submitForm">
            <div class="uk-width-1-1">
              <h4>Add New Doctor</h4>
            </div>
            <div class="uk-width-1-1">
              <input
                class="uk-input"
                type="text"
                v-model="name"
                placeholder="Enter Doctor Name"
                required
              />
            </div>
            <div class="uk-width-1-2@s">
              <input
                class="uk-input"
                type="tel"
                v-model="phone"
                placeholder="Enter Phone (Optional)"
              />
            </div>
            <div class="uk-width-1-2@s">
              <input
                class="uk-input"
                type="text"
                v-model="address"
                placeholder="Enter Address (Optional)"
              />
            </div>
            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label
                ><input
                  class="uk-checkbox"
                  type="checkbox"
                  v-model="isCutNotApplicable"
                /><i class="uk-padding-small">Do Not Pay Cut</i></label
              >
            </div>
            <div class="uk-width-1-1">
              <button
                class="uk-button uk-button-primary uk-width-1-1"
                :disabled="$store.state.doctors.isSaving"
              >
                <div
                  v-if="$store.state.doctors.isSaving"
                  uk-spinner="ratio :0.8"
                ></div>
                <div v-else>Save</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="js">
import DoctorChip from "../components/DoctorChip.vue";
export default {
  data() {
    return {
      isDisabled: false,
      searchQuery: null,
    };
  },
  components: {
    DoctorChip,
  },

  computed: {
    resultQuery() {
      console.log("Triggered");
      if (this.searchQuery) {
        return this.$store.state.doctors.doctors.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.$store.state.doctors.doctors;
      }
    },
  },

  methods: {
    submitForm() {
      let payload = {};
      payload.name = this.name;
      this.phone === undefined
        ? (payload.phone = null)
        : (payload.phone = this.phone);
      this.address === undefined
        ? (payload.address = null)
        : (payload.address = this.address);
      this.isCutNotApplicable === undefined
        ? (payload.isCutNotApplicable = false)
        : (payload.isCutNotApplicable = true);
      this.$store.dispatch({
        type: "doctors/add_doctor",
        payload: payload,
      });
    },
    makeDoctorsGetReq() {
      console.log(this.resultQuery);
      //   console.log("Triggered");
      //   this.$store.dispatch({
      //     type: "doctors/get_doctors",
      //   });
    },
  },
};
</script>

<style scoped>
.doctors-list-frame {
  height: 50vh;
  overflow-y: scroll;
}
.doctor-count {
  text-algn: left;
}
</style>
