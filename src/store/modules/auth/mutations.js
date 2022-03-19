export default{
    setAuthenticationStatus(context,payload){
        let status = payload.payload.status;
        let user = payload.payload.user
        context.isAuthenticated = status;
        context.userInfo = user;
        context.email = user.email;
        context.userName = (user.email).replace("@gmail.com","")
    }
}
