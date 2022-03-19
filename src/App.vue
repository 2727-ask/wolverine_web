<template>
<NavBar BrandName="Wolverine"></NavBar>
<Login id="login-page" v-if="!$store.state.auth.isAuthenticated"></Login>
<Tabs v-if="$store.state.auth.isAuthenticated"></Tabs>
<router-view v-if="$store.state.auth.isAuthenticated" />
</template>
<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);
import "./../node_modules/uikit/dist/js/uikit.min.js";
import "./../node_modules/uikit/dist/js/uikit-icons.min.js"
import NavBar from "./components/NavBar";
import Tabs from "./components/Tabs";
import Login from "./screens/Login";
export default{
  methods: {
    
  },
  components:{
    NavBar,
    Tabs,
    Login
  }
}

</script>


<style>
@import "./../node_modules/uikit/dist/css/uikit.min.css";


</style>
