import mutations from "./mutations";
import actions from "./actions";

export default{
    namespaced: true,
    state(){
        return{
            isSaving:false,
            isDeleting:false,
            isUpdating:false,
            isDeleted:false,
            doctors:[]
        }
    },
    mutations,
    actions
}
