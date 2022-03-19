<template>
  <div class="uk-container">
    <h1>Profit</h1>
    <div class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
      <div>
        <div class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle" style="height: 100px">
          <input type="date" class="uk-input" v-model="date" @change="getInsights" style="width:90%" />
        </div>
      </div>
    </div>
    <div class="uk-overflow-auto uk-height-large" style="margin-top: 20px">
    <table class="uk-table uk-overflow-auto uk-table-small uk-table-divider uk-text-nowrap">
      <thead>
          <tr>
              <th>Doctor Name</th>
              <th>Patient Name</th>
              <th>Purpose</th>
              <th>Cut</th>
              <th>Profit</th>
              <th>Total</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="x in this.$store.state.insights.paymentRecord" :key="x">
              <td>{{x.doctor_name}}</td>
              <td>{{x.patient_name}}</td>
              <td>{{x.facility_name}}</td>
              <td>{{x.cut}}</td>
              <td>{{x.profit}}</td>
              <td>{{x.cut + x.profit}}</td>
          </tr>
          <tr>
            <td>Cut</td>
            <td style="color:green"><b>{{this.$store.state.insights.totalCut}}</b></td>
            <td>Profit</td>
            <td style="color:green"><b>{{this.$store.state.insights.totalProfit}}</b></td>
            <td>Total</td>
            <td style="color:green"><b>{{this.$store.state.insights.totalSum}}</b></td>
          </tr>
      </tbody>
  </table>
  </div>
</div>
</template>
<script>
  export default {
    methods: {
      getInsights () {
        let date = new Date(this.date);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        console.log(this.resultQuery)
        console.log('Triggered')
        this.$store.dispatch({
          type: 'insights/getInsightsPayments',
          payload:{
            year:year,
            month:month,
            day:day
          }
        })
      }
    }
  }
</script>
