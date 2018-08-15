<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title>
            <h4 class="primary--text">Sign In</h4>
          </v-card-title>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignInClicked">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    outline></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    outline></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn outline class="primary--text" type="submit" :disabled="loading" :loading="loading">
                      Sign In
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached </v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data(){
      return {
        email:'',
        password:'',
      }
    },
    computed:{
      user(){
        return this.$store.getters.user;
      },
      error(){
        return this.$store.getters.error;
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    watch:{
      user(value){
        if(value !==null && value !== undefined){
          this.$router.push('/home');
        }
      }
    },
    methods:{
      onSignInClicked(){
        this.$store.dispatch('signInWithFirebase',{email:this.email,password:this.password});
      },
      onDismissed(){
        console.log('Dismissed');
        this.$store.dispatch('clearError');
      }
    }
  }
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

