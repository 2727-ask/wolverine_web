import { db } from "../../../firebaseDb";
import { v4 as uuidv4 } from 'uuid';


export default {
    add_record(context, payload) {
        console.log(context);
        console.log(payload);
        context.commit({
            type: "setIsSaving",
            payload: {
                status: true
            }
        });
        const userid = context.rootState.auth.userInfo.uid;
        let payment_id = uuidv4();
        let date = new Date(payload.payload.date);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let doctor_id = payload.payload.doctor.id;
        console.log(year, month);
        let data = {
            id: payment_id,
            patient_name: payload.payload.name,
            age: payload.payload.age,
            gender: payload.payload.gender,
            date: payload.payload.date,
            year: year,
            month: month,
            day: day,
            doctor_id: doctor_id,
            doctor_name: payload.payload.doctor.name,
            facility_id: payload.payload.facility.id,
            facility_name: payload.payload.facility.name,
            cut: payload.payload.cut,
            profit: payload.payload.profit,
        }
        console.log(data);
        try {
            db.collection("centres").doc(userid).collection("payments").doc(`${year}`).collection("p").doc(payment_id).set(data).then(() => {
                console.log("Data Saved");
                context.commit({
                    type: "setIsSaving",
                    payload: {
                        status: false
                    }
                });
            })
        } catch (error) {
            console.log(error);
        }
    },

    delete_record(context, payload) {
        console.log(context);
        console.log(payload);
        const userid = context.rootState.auth.userInfo.uid;
        let year = payload.payload.year;
        let payment_id = payload.payload.id;
        let doctor_id = payload.payload.doctor_id;
        let month = payload.payload.month;

        try {
            db.collection("centres").doc(userid).collection("payments").doc(`${year}`).collection("p").doc(payment_id).delete().then(() => {
                context.commit({
                    type: "setIsDeleting",
                    payload: {
                        status: true
                    }
                });
                context.dispatch(
                    {
                        type: "get_records",
                        payload: {
                            doctor_id: doctor_id,
                            year: year,
                            month: month
                        }
                    }
                )
            }).catch((e) => {
                console.log(e);
                context.commit({
                    type: "setIsDeleting",
                    payload: {
                        status: false
                    }
                });
            })
        } catch (error) {
            console.log(error);
        }
    },

    update_record(context, payload) {
        console.log(context);
        console.log(payload);
        context.commit({
            type: "setIsUpdating",
            payload: {
                status: true
            }
        });
        const userid = context.rootState.auth.userInfo.uid;
        let year = payload.payload.year;
        let payment_id = payload.payload.id;
        let cut = payload.payload.cut;
        let doctor_id = payload.payload.doctor_id;
        let month = payload.payload.month;
        try {
            db.collection("centres").doc(userid).collection("payments").doc(`${year}`).collection("p").doc(payment_id).update(
                {
                    cut: cut
                }
            ).then(() => {
                console.log("Data Updated Successfully");
                context.dispatch(
                    {
                        type: "get_records",
                        payload: {
                            doctor_id: doctor_id,
                            year: year,
                            month: month
                        }
                    }
                )
                context.commit({
                    type: "setIsUpdating",
                    payload: {
                        status: false
                    }
                });
            });
        } catch (error) {
            console.log(error);
            context.commit({
                type: "setIsUpdating",
                payload: {
                    status: false
                }
            });
        }
    },

    async get_records(context, payload) {
        console.log(context);
        console.log(payload);
        context.commit({
            type: "setIsLoading",
            payload: {
                status: true
            }
        });
        const userid = context.rootState.auth.userInfo.uid;
        let year = payload.payload.year;
        let month = payload.payload.month;
        let doctor_id = payload.payload.doctor_id;
        console.log(year, month, doctor_id);
        let paymentRecord = [];
        let totalSum = 0;
        try {
            let query = await db.collection("centres").doc(userid).collection("payments").doc(`${year}`).collection("p").where('doctor_id', '==', doctor_id).where('month', '==', month).orderBy('date').get();
            if (query.empty) {
                console.log("No Data Found");
                context.commit({
                    type: "setPaymentRecord",
                    payload: {
                        paymentRecord: []
                    }
                });
                context.commit({
                    type: "setTotalSum",
                    payload: {
                        totalSum: 0
                    }
                });
            } else {
                query.forEach(doc => {
                    totalSum = totalSum + doc.data().cut;
                    paymentRecord.push(doc.data())
                });
                context.commit({
                    type: "setPaymentRecord",
                    payload: {
                        paymentRecord: paymentRecord
                    }
                });
                context.commit({
                    type: "setTotalSum",
                    payload: {
                        totalSum: totalSum
                    }
                });
                context.commit({
                    type: "setIsLoading",
                    payload: {
                        status: false
                    }
                });
            }
        } catch (error) {
            console.log(error);
            context.commit({
                type: "setIsLoading",
                payload: {
                    status: false
                }
            });
        }
    }

}