<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text"
                             :width="7"
                             :size="70"
                             ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="red--text">{{meetup.title}}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-dialog :meetup="meetup"></edit-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div><h4 class="info--text">{{meetup.date | date}} -- {{meetup.location}}</h4></div>
            <div><edit-date-dialog :meetup="meetup" v-if="userIsCreator"></edit-date-dialog></div>
            <div>{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default{
    props:['id'],
    computed:{
      meetup(){
        return this.$store.getters.loadedMeetup(this.id)
      },
      loading(){
        return this.$store.getters.loading
      },
      userIsAuthenticated(){
        return this.$store.getters.user !==null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if(!this.userIsAuthenticated){
          return false;
        }
        return this.$store.getters.user.id === this.meetup.creatorId;
      }
    }
  }
</script>
