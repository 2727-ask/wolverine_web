import actions from "./actions";
import mutations from "./mutations";
export default{
    namespaced:true,
    state(){
        return{
            isAuthenticated:false,
            userName:null,
            email:null,
            userInfo:null,
        }
    },
    actions,
    mutations
}