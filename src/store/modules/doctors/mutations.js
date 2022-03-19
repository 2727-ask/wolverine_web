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
    setDoctors(context,payload){
        console.log("Setting Doctors");
        console.log(payload.payload);
        context.doctors = payload.payload;
        console.log(context.doctors);
    }
}