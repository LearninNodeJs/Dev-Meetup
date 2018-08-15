import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
      loadedMeetups:[
        {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',id:'adsfefsfsfeew',title:'Meetup In New York',date:new Date(),location:'New York',description:'Its Gonna Be Lit New York'},
        {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Boulevard_des_Capucines%2C_Paris_31_July_2010.jpg',id:'adsfefeew',title:'Meetup In Paris',date:new Date(),location:'Paris',description:'Lets meets on the Greatest City'},
        {imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Nairobi_uhuru_park.JPG',id:'adsfefsffeew',title:'Meetup In Nairobi',date:new Date(),location:'Nairobi',description:'The Sillicon Savannah of Africa!!!!!'}
      ],
      user:null,
      loading:false,
      error:null
    },
    mutations:{
      setLoadedMeetups(state,payload){
          state.loadedMeetups = payload;
      },
      createMeetup(state,payload){
        state.loadedMeetups.push(payload);
      },
      setUser(state,payload){
        state.user = payload;
      },
      setLoading(state,payload){
        state.loading = payload;
      },
      setError(state,payload){
        state.error = payload;
      },
      clearError(state){
        state.error = null;
      }
    },
    actions:{
      loadMeetups({commit}){
        commit('setLoading',true);
        firebase.database().ref('meetups').once('value')
          .then(data=>{
              const meetups = [];
              const objects = data.val();
              console.log(objects)
              for(let key in objects){
                meetups.push({
                  id:key,
                  title:objects[key].title,
                  description:objects[key].description,
                  imageUrl:objects[key].imageUrl,
                  location:objects[key].location,
                  date:objects[key].date,
                  creatorId:objects[key].creatorIds
                });
              }
              commit('setLoading',false);
              commit('setLoadedMeetups',meetups);
          })
          .catch((error) =>{
              commit('setLoading',false);
              console.log(error);
          });
      },
      createMeetup({commit,getters},payload){
        const meetup = {
          title:payload.title,
          location:payload.location,
          imageUrl:payload.imageUrl,
          description:payload.description,
          date:payload.date.toISOString(),
          creatorId:getters.user.id
        };
        firebase.database().ref('meetups').push(meetup)
          .then((data)=>{
            const key = data.key;
            console.log(data);
            commit('createMeetup',{...meetup,id:key});
          })
          .catch((error)=>{
            console.log(error);
          });

      },
      createUserWithFirebase({commit},payload){
        commit('setLoading',true);
        commit('clearError');
        firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
          .then(user =>{
            commit('setLoading',false);
               const newUser = {
                id: user.uid,
                registeredMeetups: [],
              };
              commit('setUser',newUser);

          })
          .catch(errors =>{
              commit('setLoading',false);
              commit('setError',errors);
              console.log(errors.message);
          });

      },
      signInWithFirebase({commit},payload){
        commit('setLoading',true);
        commit('clearError');
        firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
          .then(user=>{
            commit('setLoading',false);
            const newUser = {
              id:user.uid,
              registeredMeetups: []
            }
            commit('setUser',newUser);
          })
          .catch(errors =>{
              commit('setError',errors);
              commit('setLoading',false);
              console.log(errors.message);
          })
      },
      autoSignIn({commit},payload){
        commit('setUser',{id:payload.uid,registeredMeetups:[]});
      },
      onLogoutHandler({commit}){
          firebase.auth().signOut();
          commit('setUser',null);
      },
      clearError({commit}){
        commit('clearError');
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
      },
      user(state){
        return state.user;
      },
      error(state){
        return state.error
      },
      loading(state){
        return state.loading
      }
    }
});
