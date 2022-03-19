<template>
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
      <a class="uk-navbar-item uk-logo">{{ BrandName }}</a>
    </div>

    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <AvatarDropdown BrandName="Wolverine" v-if="$store.state.auth.isAuthenticated"></AvatarDropdown>
      </ul>
    </div>
  </nav>
</template>

<script>
import AvatarDropdown from "./AvatarDropdown";
export default {
  components:{
    AvatarDropdown
  },
  data() {
    return {  
      
    };
  },
  props: {
    BrandName: null,
    AvatarSeed: null,
  },
  methods:{
    requestSignOut(){
      this.$store.dispatch({
        type:"auth/signOut"
      })
    }
  }
};
</script>
