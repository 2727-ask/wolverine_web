import { db } from '../../../firebaseDb'
export default {
  getInsightsPayments (context, payload) {
    console.log(context)
    console.log(payload)
    context.commit({
      type: 'setIsLoading',
      payload: {
        status: true
      }
    })
    const userid = context.rootState.auth.userInfo.uid
    let year = payload.payload.year
    let month = payload.payload.month
    let day = payload.payload.day
    console.log(year, month)

    let data = [];
    let totalCut = 0;
    let totalSum = 0;
    let totalProfit = 0;

    const query = db
      .collection('centres')
      .doc(userid)
      .collection('payments')
      .doc(`${year}`)
      .collection('p')
      .where('month', '==', parseInt(month))
      .where('day', '==', parseInt(day))
    query.onSnapshot(
      querySnapshot => {
        console.log(`Received query snapshot of size ${querySnapshot.size}`)
        querySnapshot.forEach((doc)=>{
            data.push(doc.data());
            totalCut = totalCut + doc.data().cut;
            totalSum = totalSum + doc.data().profit + doc.data().cut;
            totalProfit = totalProfit + doc.data().profit
        });
        context.commit({
          type: 'setPaymentRecord',
          payload: {
            paymentRecord:data
          }
        });
        context.commit({
          type: 'setTotalCut',
          payload: {
            totalCut:totalCut
          }
        });
        context.commit({
          type: 'setTotalProfit',
          payload: {
            totalProfit:totalProfit
          }
        });
        context.commit({
          type: 'setTotalSum',
          payload: {
            totalSum:totalSum
          }
        });


      },
      err => {
        console.log(`Encountered error: ${err}`)
      }
    )
  }
}
