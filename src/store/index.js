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
      updateMeetup(state,payload){
        const meetup = state.loadedMeetups.find(meetup =>{
          return meetup.id === payload.id
        });
        if(payload.title){
          meetup.title = payload.title
        }
        if(payload.description){
          meetup.description = payload.description;
        }
        if(payload.date){
          meetup.date = payload.date;
        }
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
              console.log(objects);
              for(let key in objects){
                meetups.push({
                  id:key,
                  title:objects[key].title,
                  description:objects[key].description,
                  imageUrl:objects[key].imageUrl,
                  location:objects[key].location,
                  date:objects[key].date,
                  creatorId:objects[key].creatorId
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
          description:payload.description,
          date:payload.date.toISOString(),
          creatorId:getters.user.id
        };
        let imageUrl;
        let key;
        firebase.database().ref('meetups').push(meetup)
          .then((data)=>{
             key = data.key;
             return key;
          })
          .then(key =>{
            const filename = payload.image.name;
            const ext =filename.slice(filename.lastIndexOf('.'));
            return firebase.storage().ref('meetups/'+ key + '.' +ext).put(payload.image);
          })
          .then(fileData =>{
            let imagePath = fileData.metadata.fullPath;
            return firebase.storage().ref().child(imagePath).getDownloadURL();
          })
          .then(url => {
              imageUrl = url
              return firebase.database().ref('meetups').child(key).update({imageUrl:imageUrl})
          })
          .then(()=>{
            commit('createMeetup',{
              ...meetup,
              imageUrl:imageUrl,
              id:key

            });
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
            user.user.displayName
            console.log(user.user.displayName)
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
      },
      updateMeetupData({commit},payload){
        commit('setLoading',true);
        const updateObject ={};
        if(payload.title){
          updateObject.title = payload.title
        }
        if(payload.description){
          updateObject.description = payload.description;
        }
        if(payload.date){
          updateObject.date = payload.date;
        }
        firebase.database().ref('meetups').child(payload.id).update(updateObject)
          .then(()=>{
            commit('setLoading',false);
            commit('updateMeetup',payload);
          })
          .catch(error =>{
            console.log(error);
            commit('setLoading',false);
          })
      },
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
