<template>
    <div class="uk-container login-container">
        <img class="uk-border-circle uk-margin" src="../assets/login_avatar.png" width="200" height="200" alt="Border circle">
        <form @submit.prevent="submitForm">
            <div class="uk-margin">
                <div class="uk-inline">
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                    <input class="uk-input" v-model="user" type="text" style="width:100%" required>
                </div>
            </div>

            <div class="uk-margin">
                <div class="uk-inline">
                    <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                    <input class="uk-input" v-model="password" type="text" style="width:100%" required>
                </div>
            </div>

            <div class="uk-margin">
                <div class="uk-inline">
                    <button class="uk-button uk-button-secondary">Login</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default{
        methods: {
            submitForm(){
                let payload = { email:this.user, password:this.password }
                // let payload = { email:"ashutoshkumbhar27@gmail.com", password:"Asdfghjkl@27" }
                this.$store.dispatch({
                    type:"auth/login",
                    payload:payload
                })
            }
        },
    }
</script>

<style scoped>
    .login-container{
        display: grid;
        place-items: center;
        margin-top: 15vh;
    }
    .uk-input{
        width:35vw;
    }  
</style>