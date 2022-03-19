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
    setFacilities(context,payload){
        console.log("Setting Facilities");
        console.log(payload.payload);
        context.facilities = payload.payload;
        console.log(context.facilities);
    }
}