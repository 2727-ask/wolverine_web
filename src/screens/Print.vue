<template>
    <div class="uk-container" id="printMe">
        <h2 style="text-align:center">Dr. {{this.$route.query.name}} </h2>
        <h3 style="text-align:center;margin-top:0px">Month : {{this.$route.query.month}}  |  Year : {{this.$route.query.year}}  | <a @click="printContent">Print Now</a></h3>
        <hr>
        <table class="uk-table uk-table-small uk-table-divider">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Patient Name</th>
                    <th>Diagnosis Of</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="payment in $store.state.newrecords.paymentRecord"
                :key="payment"
              >
                <td>{{ payment.date }}</td>
                <td>{{ payment.patient_name }}</td>
                <td>{{ payment.facility_name }}</td>
                <td>{{ payment.cut }}</td>
              </tr>
              <tr>
                  <td>Count</td>
                  <td>{{$store.state.newrecords.paymentRecord.length}}</td>
                  <td>Total</td>
                  <td>{{$store.state.newrecords.totalSum}}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import pre from "print-html-element";
    export default {
      data() {
        return {
          data: this.$route.params.date,
        };
      },
      methods: {
        printContent() {
          pre.printElement(document.getElementById('printMe'));
        },
      },
    };
    </script>