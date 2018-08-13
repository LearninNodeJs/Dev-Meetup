import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
      loadedMeetups:[
        {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',id:'adsfefsfsfeew',title:'Meetup In New York',date:new Date(),location:'New York',description:'Its Gonna Be Lit New York'},
        {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Boulevard_des_Capucines%2C_Paris_31_July_2010.jpg',id:'adsfefeew',title:'Meetup In Paris',date:new Date(),location:'Paris',description:'Lets meets on the Greatest City'},
        {imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Nairobi_uhuru_park.JPG',id:'adsfefsffeew',title:'Meetup In Nairobi',date:new Date(),location:'Nairobi',description:'The Sillicon Savannah of Africa!!!!!'}
      ],
      user:{
        id:'initial',
        registeredMeetups:['adsfefsffeew']
      }
    },
    mutations:{
      createMeetup(state,payload){
        state.loadedMeetups.push(payload);
      }
    },
    actions:{
      createMeetup({commit},payload){
        const meetup = {
          title:payload.title,
          location:payload.location,
          imageUrl:payload.imageUrl,
          description:payload.description,
          date:payload.date,
          id:'fdswfw'
        };
        commit('createMeetup',meetup);
      }
    },
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
