<template>
  <li>
    <a>
      <img
        class="uk-border-circle"
        :src="avatar_url"
        width="30"
        height="30"
        alt="Avatar"
      />
      <div class="uk-navbar-dropdown">
        <ul class="uk-nav uk-navbar-dropdown-nav">
          <li class="uk-active">
            <a style="font-size: 12px; overflow: hidden"
              >Signed In As <br />{{ userName }}</a
            >
          </li>
          <li class="uk-nav-divider"></li>
          <li><router-link to="/your_profile/">Your Profile</router-link></li>
          <li class="uk-nav-divider"></li>
          <li><a  @click="requestSignOut">Log Out</a></li>
        </ul>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  data() {
    return {
      avatar_url: null,
      userName: null,
    };
  },
  created() {
    this.makeDoctorsGetReq();
    this.makefacilitiesGetReq();
  },
  methods: {
    requestSignOut(){
      this.$store.dispatch({
        type:"auth/signOut"
      })
    },
    makeDoctorsGetReq() {
      console.log("Triggered");
      this.$store.dispatch({
        type: "doctors/get_doctors",
      });
    },
    makefacilitiesGetReq() {
      console.log(this.resultQuery);
        console.log("Triggered");
        this.$store.dispatch({
          type: "facilities/get_facilities",
        });
    },
  },
  mounted() {
    this.avatar_url = `https://avatars.dicebear.com/api/initials/:${this.$store.state.auth.email}.svg`;
    this.userName = this.$store.state.auth.userName;
  },
};
</script>
