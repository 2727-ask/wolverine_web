<template>
<div class="uk-container main-frame">
    <h2>Payment Manager</h2>
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
          <PaymentChip
            v-for="doctor in resultQuery"
            :key="doctor"
            :id="doctor.id"
            :doctor_name="doctor.name"
            :phone="doctor.phone"
            :address="doctor.address"
            :isCutNotApplicable="doctor.isCutNotApplicable"
          ></PaymentChip>
        </div>
      </div>
</div>
</template>
<script>
    import PaymentChip from "../components/PaymentChip.vue";
    export default {
      data() {
        return {
          isDisabled: false,
          searchQuery: null,
        };
      },
      components: {
        PaymentChip,
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
    .main-frame{
        width: 90vw;
    }    
    .doctors-list-frame {
      height: 50vh;
      overflow-y: scroll;
    }
    .doctor-count {
      text-align: left;
    }
    </style>
    