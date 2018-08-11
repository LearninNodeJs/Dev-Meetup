import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
      loadedMeetups:[
        {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',id:'adsfefsfsfeew',title:'Meetup In New York',date:'2017-07-12'},
        {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Boulevard_des_Capucines%2C_Paris_31_July_2010.jpg',id:'adsfefeew',title:'Meetup In Paris',date:'2018-06-13'},
        {imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Nairobi_uhuru_park.JPG',id:'adsfefsffeew',title:'Meetup In Nairobi',date:'2017-12-25'}
      ],
      user:{
        id:'initial',
        registeredMeetups:['adsfefsffeew']
      }
    },
    mutations:{},
    actions:{},
    getters:{
      loadedMeetups(state){
        return state.loadedMeetups.sort(function(meetupA,meetupB){
            return meetupA.date > meetupB.date;
        });
      },
      featuredMeetups(state,getters){
        return getters.loadedMeetups.slice(0,5);
      },
      loadedMeetup(state){
          return function(meetupId){
            return state.loadedMeetups.find(function (meetup) {
                return meetup.id === meetupId;
            });
          }
      }
    }
});
