export default{
    setIsSaving(context,payload){
        context.isSaving = payload.payload.status;
    },
    setIsDeleting(context,payload){
        context.isDeleting = payload.payload.status;
        context.isDeleted = !payload.payload.status;
    },
    setIsUpdating(context,payload){
        context.isUpdating = payload.payload.status;
    },
    setIsLoading(context,payload){
        context.isLoading = payload.payload.isLoading;
    },
    setPaymentRecord(context,payload){
        context.paymentRecord = payload.payload.paymentRecord;
    },
    setTotalSum(context,payload){
        context.totalSum = payload.payload.totalSum;
    }
}