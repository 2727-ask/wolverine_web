// import { dialog } from "@electron/remote";
import { auth, signInWithEmailAndPassword, signOut } from "../../../firebaseDb";
// import router from "../../../router";


export default {
    login(context, payload) {
        console.log(context);
        console.log(payload);
        const email = payload.payload.email;
        const password = payload.payload.password
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.email);
                context.commit({
                    type:"setAuthenticationStatus",
                    payload:{
                        user:user,
                        status:true,
                    }
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage)
            });
    },
    signOut(context){
        signOut(auth).then(()=>{
            context.commit({
                type:"setAuthenticationStatus",
                payload:{
                    user:null,
                    status:false,
                }
            })
        }).catch((e)=>{
            console.log(e);
        })
    }
}