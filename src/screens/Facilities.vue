<template>
  <div class="uk-container">
    <h2>Facilities</h2>
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
        <div class="uk-card uk-card-default uk-card-body facilities-list-frame">
          <br />
          <div class="facilities-count-frame">
            <div style="margin-left: 4px" uk-grid>
              <div>
                <h3 class="facilities-count">
                  Total Facilities :
                  <b>{{ $store.state.facilities.facilities.length }}</b>
                </h3>
              </div>
              <div>
                <a
                  uk-icon="icon: refresh"
                  @click="makefacilitiesGetReq"
                ></a>
              </div>
            </div>
          </div>
          <FacilityChip
            v-for="facility in resultQuery"
            :key="facility"
            :id="facility.id"
            :facility_name="facility.name"
            :fcut="facility.cut"
            :ftotal="facility.total"
          ></FacilityChip>
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-default uk-card-body">
          <form class="uk-grid-small" uk-grid @submit.prevent="submitForm">
            <div class="uk-width-1-1">
              <h4>Add New Facility</h4>
            </div>
            <div class="uk-width-1-1">
              <input
                class="uk-input"
                type="text"
                v-model="name"
                placeholder="Enter Facility Name"
                required
              />
            </div>
            <div class="uk-width-1-2@s">
              <input
                class="uk-input"
                type="number"
                v-model="total"
                placeholder="Enter Total Price"
                required
              />
            </div>
            <div class="uk-width-1-2@s">
              <input
                class="uk-input"
                type="number"
                v-model="cut"
                placeholder="Enter Cut Price"
                required
              />
            </div>
           
            <div class="uk-width-1-1">
              <button
                class="uk-button uk-button-primary uk-width-1-1"
                :disabled="$store.state.facilities.isSaving"
              >
                <div
                  v-if="$store.state.facilities.isSaving"
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

<script>
import FacilityChip from "../components/FacilityChip.vue";
export default {
  data() {
    return {
      isDisabled: false,
      searchQuery: null,
    };
  },
  components: {
    FacilityChip,
  },

  computed: {
    resultQuery() {
      console.log("Triggered");
      if (this.searchQuery) {
        return this.$store.state.facilities.facilities.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.$store.state.facilities.facilities;
      }
    },
  },

  methods: {
    
    submitForm() {
      let payload = {};
      payload.name = this.name;
      payload.cut = this.cut;
      payload.total = this.total;
      console.log(payload);
      
      this.$store.dispatch({
        type: "facilities/add_facility",
        payload: payload,
      });
    },
    
  },
};
</script>

<style scoped>
.facilities-list-frame {
  height: 50vh;
  overflow-y: scroll;
}
.facilities-count {
  text-algn: left;
}
</style>
