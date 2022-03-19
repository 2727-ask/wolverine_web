<template>
  <div class="uk-container main-frame">
    <h2 style="text-align: center"><u>Payments</u></h2>
    <div
      class="uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center"
      uk-grid
    >
      <div>
        <div class="uk-card uk-card-default uk-card-body">
          <b>Dr {{ this.$route.query.name }}</b>
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-default uk-card-body">
          <input
            type="month"
            class="uk-input"
            v-model="dateyearstamp"
            @change="getDateYear"
          />
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-default uk-card-body">
          <div uk-grid>
            <div><b>Rs {{ $store.state.newrecords.totalSum }}/-</b></div>
            <div style="margin-left:3px"><router-link :to="{ name: 'Print', query: { name:`${doctor_name}`,year:`${year}`,month:`${month}`}}">Print</router-link></div>
        </div>     
        </div>
      </div>
    </div>

    <div class="uk-overflow-auto uk-height-large" style="margin-top: 20px">
      <table class="uk-table uk-table-striped uk-table uk-text-nowrap">
        <thead class="uk-background-primary">
          <tr>
            <th>Date</th>
            <th>Patient Name</th>
            <th>Diagnosis Of</th>
            <th>Cut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td><b style="font-size: 2em">Count</b></td>
            <td>
              <b style="font-size: 2em; color: blue">{{
                $store.state.newrecords.paymentRecord.length
              }}</b>
            </td>
            <td><b style="font-size: 2em">Total</b></td>
            <td>
              <b style="font-size: 2em; color: green">{{
                $store.state.newrecords.totalSum
              }}</b>
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr
            v-for="payment in $store.state.newrecords.paymentRecord"
            :key="payment"
          >
            <td>{{ payment.date }}</td>
            <td>{{ payment.patient_name }}</td>
            <td>{{ payment.facility_name }}</td>
            <td>{{ payment.cut }}</td>
            <td>
              <a
                uk-icon="icon: more-vertical"
                :id="payment.id"
                @click="toggleModal(payment)"
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal For Updation -->
  <div id="modal-example" ref="modal_ref" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Update Payment Cut</h2>
      <p>
        Updating Cut for <b>{{ this.patient_name }}</b>
      </p>
      <input type="number" class="uk-input" v-model="newcut" />
      <p class="uk-text-right">
        <button
          class="uk-button uk-button-default uk-modal-close"
          type="button"
        >
          Cancel
        </button>
        <button
          class="uk-button uk-button-primary"
          @click="makeUpdatePaymentRequest"
          :disabled="$store.state.newrecords.isUpdating"
        >
          <div
            v-if="$store.state.newrecords.isUpdating"
            uk-spinner="ratio :0.8"
          ></div>
          <div v-else>Update</div>
        </button>
      </p>

      <hr />
      <p>
        Delete Payment Record For
        <b style="color: red">{{ this.patient_name }}</b>
        <slide-unlock
          style="margin-top:5vh"
          ref="vueslideunlock"
          :auto-width="true"
          :circle="true"
          :disabled="false"
          :noanimate="false"
          :width="600"
          :height="60"
          text="slide to delete"
          success-text="Successfully Deleted"
          @completed="makeDeleteRequest"
        />
      </p>
    </div>
  </div>
</template>
<script>
import UIkit from "uikit";
import SlideUnlock from "vue-slide-unlock";
export default {
  data() {
    return {
      doctor_id: this.$route.query.id,
      doctor_name: null,
      year: null,
      month: null,
      modal_payment_id: null,
      patient_name: null,
      uyear: null,
      success_text:"Deleted",
    };
  },
  components: {
    SlideUnlock,
  },
  mounted() {
    this.doctor_id = this.$route.query.id;
    this.doctor_name = this.$route.query.name;
    let today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    console.log(this.year, this.month);
    this.makeGetPaymentRequest(this.doctor_id, this.year, this.month);
  },
  methods: {
    getDateYear() {
      let date = new Date(this.dateyearstamp);
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      console.log(this.year, this.month);
      this.makeGetPaymentRequest(this.doctor_id,this.year,this.month);
    },
    toggleModal(record) {
      console.log(record.id);
      this.newcut = record.cut;
      this.modal_payment_id = record.id;
      this.patient_name = record.patient_name;
      this.uyear = record.year;
      let modal = this.$refs.modal_ref;
      this.$refs.vueslideunlock.reset()
      UIkit.modal(modal).show();
    },
    makeDeleteRequest(){
      let payload = {};
      payload.id = this.modal_payment_id;
      payload.doctor_id = this.doctor_id;
      payload.year = this.uyear;
      payload.month = this.month;
      this.$store.dispatch({
        type: "newrecords/delete_record",
        payload: payload,
      });
      this.success_text = "Deleting";
    },
    makeUpdatePaymentRequest() {
      let payload = {};
      payload.id = this.modal_payment_id;
      payload.doctor_id = this.doctor_id;
      payload.cut = this.newcut;
      payload.year = this.uyear;
      payload.month = this.month;
      this.$store.dispatch({
        type: "newrecords/update_record",
        payload: payload,
      });
    },
    makeGetPaymentRequest(doctor_id, year, month) {
      let payload = {};
      payload.doctor_id = doctor_id;
      payload.month = month;
      payload.year = year;

      this.$store.dispatch({
        type: "newrecords/get_records",
        payload: payload,
      });
    },
  },
};
</script>

<style scoped>
.info {
  margin-left: 30px;
}
th {
  color: white;
}
</style>
