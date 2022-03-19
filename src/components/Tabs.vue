<template>
  <div class="uk-button-group">
    <router-link to="/newrecord" class="uk-button uk-button-primary btn">Record</router-link>
    <router-link to="/doctors" class="uk-button uk-button-primary btn">Doctors</router-link>
    <router-link to="/facilities" class="uk-button uk-button-primary btn">Facilities</router-link>
    <router-link to="/payments" class="uk-button uk-button-primary btn">Payments</router-link>
    <router-link to="/profit" class="uk-button uk-button-primary btn">Profit</router-link>
    <a to="#" @click="refreshRequest" class="uk-button uk-button-primary btn">Refresh</a>
  </div>
</template>

<script>
  export default{
    methods:{
      makeDoctorsGetReq() {
      console.log("Triggered");
      this.$store.dispatch({
        type: "doctors/get_doctors",
      });
    },
      makefacilitiesGetReq() {
      console.log(this.resultQuery);
        console.log("Triggered");
        this.$store.dispatch({
          type: "facilities/get_facilities",
        });
    },
    refreshRequest(){
      this.makeDoctorsGetReq();
      this.makefacilitiesGetReq();
    }

    }
  }
</script>

<style scoped>
.uk-button-group{

  

}
.btn{
    margin:20px;
}
@media (max-width:700px)  {
  .uk-button-group{
    width: 100vw;
    overflow-x: auto;
    font-size: 0;
  }
}

@media (min-width:701px)  {
  .uk-button-group{
    display:flex;
    justify-content:center;
    align-items:center
  }
}
</style>
