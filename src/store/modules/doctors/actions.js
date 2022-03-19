import { db } from "../../../firebaseDb";
import { v4 as uuidv4 } from 'uuid';
export default {
    add_doctor(context, payload) {
        console.log(context)
        console.log(payload)
        context.commit({
            type: "setIsSaving",
            payload: {
                status: true
            }
        });
        const userid = context.rootState.auth.userInfo.uid;
        console.log(userid)

        let id = uuidv4();
        let name = payload.payload.name;
        let address = payload.payload.address;
        let phone = payload.payload.phone;
        let isCutNotApplicable = payload.payload.isCutNotApplicable;

        let data = {
            id: id,
            name: name,
            address: address,
            phone: phone,
            isCutNotApplicable: isCutNotApplicable
        }

        db.collection("centres").doc(userid).collection("doctors").doc(id).set(data).then(() => {
            console.log("data saved");
            context.commit({
                type: "setIsSaving",
                payload: {
                    status: false
                }
            });
            context.dispatch({
                type:"get_doctors"
            }); 
        });
    },

    async get_doctors(context, payload) {
        console.log(context)
        console.log(payload)
        let doctors = []
        const userid = context.rootState.auth.userInfo.uid;
        console.log(userid)
        let snapshot = await db.collection("centres").doc(userid).collection("doctors").orderBy('name').get();
        snapshot.forEach(doc => {
            doctors.push(doc.data())
        });
        context.commit({
            type:"setDoctors",
            payload:doctors
        })   
    },

    update_doctor(context,payload){
        console.log(context)
        console.log(payload)
        context.commit({
            type:"setIsUpdating",
            payload:{
                status:true
            }
        }) 
        const userid = context.rootState.auth.userInfo.uid;
        let doctorId = payload.payload.id; 
        let name = payload.payload.name;
        let address = (payload.payload.address);
        let phone = payload.payload.phone;
        let isCutNotApplicable = payload.payload.isCutNotApplicable;
        let query = db.collection("centres").doc(userid).collection("doctors").doc(doctorId).update({
            name:name,
            address:address,
            phone:phone,    
            isCutNotApplicable:isCutNotApplicable
        });
        query.then(()=>{
            console.log("Data Updated");
            context.commit({
                type:"setIsUpdating",
                payload:{
                    status:false
                }
            }) 
            context.dispatch({
                type:"get_doctors"
            })       
        }).catch((e)=>{
            console.log(e);
            context.commit({
                type:"setIsUpdating",
                payload:{
                    status:false
                }
            }) 
        })

    },


    delete_doctor(context,payload){
        console.log(context)
        console.log(payload)
        context.commit({
            type:"setIsDeleting",
            payload:{
                status:true
            }
        }) 
        const userid = context.rootState.auth.userInfo.uid;
        console.log(userid)
        let doctorId = payload.payload.id;
        let query = db.collection("centres").doc(userid).collection("doctors").doc(doctorId).delete();
        query.then(()=>{
            console.log("Deleted");
            context.commit({
                type:"setIsDeleting",
                payload:{
                    status:false
                }
            })
            context.dispatch({
                type:"get_doctors"
            })   
        }).catch((e)=>{
            console.log(e);
            context.commit({
                type:"setIsDeleting",
                payload:{
                    status:false
                }
            }) 
        })
    }
}