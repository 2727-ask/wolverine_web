<template>
    <div class="uk-container" style="margin-top:10vh">
        <img class="uk-border-circle uk-align-center" :src="avatar_url" width="120" height="120" alt="Avatar" />
        <h1 class="heading" style="text-align:center">Ashutosh Kumbhar</h1>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                avatar_url: null,
                userName: null
            }
        },
        mounted() {
            this.avatar_url = `https://avatars.dicebear.com/api/initials/:${this.$store.state.auth.email}.svg`;
            this.userName = this.$store.state.auth.userName;
        },
    }
</script>
<style scoped>
    .heading {
        background: #391BCF;
        background: -webkit-linear-gradient(to right, #391BCF 0%, #CF2EA4 77%);
        background: -moz-linear-gradient(to right, #391BCF 0%, #CF2EA4 77%);
        background: linear-gradient(to right, #391BCF 0%, #CF2EA4 77%);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;

    }
</style>