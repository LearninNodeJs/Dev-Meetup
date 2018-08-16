<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator" class="primary">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title> Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                required></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="editDescription"
                required multi-line></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click.native="editDialog=false">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click.native="onChangeSaved">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
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
        editedTitle:this.meetup.title,
        editDescription:this.meetup.description
      }
    },
    methods:{
      onChangeSaved(){
        if(this.editedTitle.trim() ==='' || this.editDescription ===''){
          return;
        }
        this.editDialog = false;
        this.$store.dispatch('updateMeetupData',{
          id:this.meetup.id,
          title:this.editedTitle,
          description:this.editDescription
        });
      }
    }
  }
</script>
