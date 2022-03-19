<template>
<router-link :to="{ name: 'Payment_Details', query: { name:`${doctor_name}`,id:`${id}` }}">
    <div class="uk-card uk-card-default">
      <div class="uk-child-width-1-2@s" uk-grid>
        <div>
          <h5 class="chip heading">Dr {{ doctor_name }}</h5>
        </div>
      </div>
    </div>
  </router-link>
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
  methods: {},
};
</script>

<style scoped>
.chip {
  padding: 7px;
  transition: width 2s, height 4s;
}

.chip:hover {
  color: #ffffff;
}

.uk-card {
  margin: 7px;
  transition: width 2s, height 4s;
}

.uk-card:hover {
  background-color: #338fff;
  color: #ffffff;
}

.heading {
  text-align: left;
  margin-left: 5px;
}

.action {
  padding: 7px;
  margin: 1px;
}

.action-frame {
  margin: 0px;
}
</style>
