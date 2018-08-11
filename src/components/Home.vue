<template>
  <v-container >
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="info">Organize Meetups</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click.native="onLoadMeetUp(meetup.id)"
          >

            <div class="title text-xs-center">
              {{meetup.title}}
            </div>

          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join Our Awesome Meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default{
    data(){
      return{
        meetups:[
          {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',id:'adsfefsfsfeew',title:'Meetup In New York'},
          {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Boulevard_des_Capucines%2C_Paris_31_July_2010.jpg',id:'adsfefeew',title:'Meetup In Paris'},
          {imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Nairobi_uhuru_park.JPG',id:'adsfefsffeew',title:'Meetup In Nairobi'}


        ]
      }
    },
    methods:{
      onLoadMeetUp(id){
          this.$router.push('/meetup/'+id);
      }
    }
}
</script>
<style scoped>
  .title {
    position:absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color:white;
    font-size: 2em;
    padding:20px;

  }

</style>
