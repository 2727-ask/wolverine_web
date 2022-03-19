<template>
  <div class="uk-container" style="margin-top: 5vh">
    <div
      class="uk-card uk-align-center uk-card-default uk-card-body uk-width-1-2@m"
    >
      <div
        class="uk-card uk-align-center uk-card-primary uk-card-body"
        style="z-index: 0px"
      >
        <h3>New Record</h3>
      </div>
      <form class="uk-grid-small" uk-grid @submit.prevent="submitForm">
        <div class="uk-width-1-1">
          <input
            class="uk-input"
            type="text"
            placeholder="Patient Name"
            v-model="patient_name"
            required
          />
        </div>
        <div class="uk-width-1-2@s">
          <input
            class="uk-input"
            type="number"
            placeholder="Age"
            v-model="age"
            required
          />
        </div>
        <div class="uk-width-1-2@s">
          <select
            class="uk-select"
            aria-placeholder="Gender"
            v-model="gender"
            required
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div class="uk-width-1-1@s">
          <input
            class="uk-input"
            type="date"
            placeholder="Date"
            v-model="date"
            required
          />
        </div>
        <div class="uk-width-1-2@s">
          <label for="doctors">Reffered By</label>
          <vue3-simple-typeahead
            :items="$store.state.doctors.doctors"
            placeholder="Enter Name"
            @selectItem="selectDoctor"
            minInputLength="1"
            :itemProjection="
              (item) => {
                return item.name;
              }
            "
          />
        </div>
        <div class="uk-width-1-2@s">
          <label for="facilities">Purpose</label>
          <vue3-simple-typeahead
            :items="$store.state.facilities.facilities"
            placeholder="Enter Name"
            @selectItem="selectFacility"
            minInputLength="1"
            :itemProjection="
              (item) => {
                return item.name;
              }
            "
          />
        </div>
        <div class="uk-width-1-2@s">
          <label
            ><input
              class="uk-checkbox"
              v-model="isCutNA"
              @change="activate_donot_pay_cut"
              type="checkbox"
            /><i style="margin-left: 30px">Do Not Pay Cut</i></label
          >
        </div>
        <div class="uk-width-1-1@s" style="width: 100%">
          <button
            class="uk-button uk-button-primary"
            style="width: 100%"
            type="text"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <div id="modal-overflow" ref="modal" uk-modal>
    <div class="uk-modal-dialog">
      <button class="uk-modal-close-default" type="button" uk-close></button>

      <div class="uk-modal-header">
        <h2 class="uk-modal-title">Verify Information</h2>
      </div>

      <div class="uk-modal-body" uk-overflow-auto>
        <p>
          Patient Name:&ensp; <b>{{ this.patient_name }}</b>
        </p>
        <p>
          Patient Age:&ensp;<b>{{ this.age }}</b>
        </p>
        <p>
          Patient Gender:&ensp;<b>{{ this.gender }}</b>
        </p>
        <p>
          Date Of Diagnosis:&ensp;<b>{{ this.date }}</b>
        </p>
        <p>
          Diagnosis Of&ensp;<b>{{ this.fac.name }}</b>
        </p>
        <p>
          Reffered By&ensp;<b>{{ this.doc.name }}</b>
        </p>
        <p>
          Cut&ensp;<b>{{ this.cut }}</b>
        </p>
        <p>
          Profit&ensp;<b>{{ this.profit }}</b>
        </p>
      </div>

      <div class="uk-modal-footer uk-text-right">
        <button
          class="uk-button uk-button-default uk-modal-close"
          type="button"
        >
          Cancel
        </button>
        <button
          class="uk-button uk-button-primary"
          @click="makeSaveRequest"
          :disabled="$store.state.newrecords.isSaving"
        >
          <div
            v-if="$store.state.newrecords.isSaving"
            uk-spinner="ratio :0.8"
          ></div>
          <div v-else>Save</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import UIkit from "uikit";


export default {
  data() {
    return {
      searchQuery: null,
      cut: null,
      total: null,
      is_doctor_honest: false,
      is_price_card_visible: false,
      patient_pays: null,
      profit: null,
      fac: {},
      doc: {},
      payload: null,
    };
  },
  components: {},
  methods: {
    check_doctor_is_honest_or_not() {
      this.doc.isCutNotApplicable
        ? (this.is_doctor_honest = true)
        : (this.is_doctor_honest = false);
    },
    createInsights() {
      if (this.is_doctor_honest) {
        this.cut = 0;
        this.profit = this.fac.total;
      } else if (this.isCutNA && this.is_doctor_honest == false) {
        this.cut = 0;
        this.profit = this.fac.total - this.fac.cut;
      } else {
        this.cut = this.fac.cut;
        this.profit = this.fac.total - this.fac.cut;
      }
    },
    selectDoctor(doctor) {
      console.log(doctor);
      this.doc = doctor;
      this.check_doctor_is_honest_or_not();
    },
    selectFacility(facility) {
      console.log(facility);
      this.fac = facility;
    },
    submitForm() {
      this.createInsights();
      var data = {};
      data.name = this.patient_name;
      data.age = this.age;
      data.gender = this.gender;
      data.date = this.date;
      data.facility = this.fac;
      data.doctor = this.doc;
      data.profit = this.profit;
      data.cut = this.cut;

      let modal = this.$refs.modal;
      UIkit.modal(modal).show();
      this.payload = data;
      console.log(data);
    },
    makeSaveRequest() {
      this.$store.dispatch({
        type: "newrecords/add_record",
        payload: this.payload,
      });
    },
  },
};
</script>

<style>
.simple-typeahead-input {
  width: 100%;
  border: 0 none;
  padding: 0 10px;
  background: #fff;
  color: #666;
  border: 1px solid #e5e5e5;
  transition: 0.2s ease-in-out;
  transition-property: color, background-color, border;
  box-sizing: border-box;
  margin: 0;
  border-radius: 0;
  font: inherit;
  height: 4.8vh;
}
</style>
