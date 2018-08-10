import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from  '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import Signin from  '@/components/User/Signin'
import Signup from  '@/components/User/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Home
    },
    {
      path:'/meetups',
      name:'Meetups',
      component:Meetups
    },
    {
      path:'/meetup/new',
      name:'CreateMeetup',
      component:CreateMeetup
    },
    {
      path:'/profile',
      name:'Profile',
      component:Profile
    },
    {
      path:'/signup',
      name:'Signup',
      component:Signup
    },{
      path:'/signin',
      name:'Signin',
      component:Signin
    }
  ]
})




















