import mutations from "./mutations";
import actions from "./actions";

export default{
    namespaced: true,
    state(){
        return{
            isSaving:false,
            isLoading:false,
            isDeleting:false,
            isUpdating:false,
            isDeleted:false,
            totalSum:0,
            totalProfit:0,
            totalCut:0,
            paymentRecord:[],
            todayData:[],
        }
    },
    mutations,
    actions
}
