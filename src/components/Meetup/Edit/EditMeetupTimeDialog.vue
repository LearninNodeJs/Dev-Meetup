<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator" class="primary">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title> Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%;" actions format="24hrs">
              <template>
                <v-btn class="blue--text darken-1" flat @click.native="editDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" flat @click.native="onChangeSaved">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
  export default{
    props:['meetup'],
    data(){
      return {
          editDialog:false,
          editableTime:null
      }
    },
    methods:{
      onChangeSaved(){
          if(this.editableTime.trim() === null || this.editableTime.trim() ===undefined){
            return
          }

          const newDate = new Date(this.meetup.date);
          const newDay = new Date(this.editableDate).getUTCDate();
          const newMonth = new Date(this.editableDate).getUTCMonth();
          const newYear = new Date(this.editableDate).getUTCFullYear();
          newDate.setUTCDate(newDay);
          newDate.setUTCMonth(newMonth);
          newDate.setUTCFullYear(newYear);

          this.$store.dispatch('updateMeetupData',{
            id:this.meetup.id,
            date:newDate
          })
      }
    }
  }
</script>
