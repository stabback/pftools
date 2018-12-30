<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-btn
      slot="activator"
      fixed
      dark
      fab
      bottom
      right
      color="primary"
      @click="$ga.event('help-fab', 'clicked', 'User clicked the FAB button', analyticsPayload)"
    >
      ?
    </v-btn>
  
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Thanks for trying out the service!
      </v-card-title>
  
      <v-card-text>
        <p>I'm hoping to build out a set of tools to help people understand and manage their finances.  All I've got so far is an interactive version of the "What to do with your money" flowchart.</p>
        <p>I'm hoping to tweak the flow and help provide more information soon.  In the meantime, can you let me know what you need help with?</p> 
      </v-card-text>

      <v-card-text>
        <v-btn 
          href="mailto:pf@stabback.com?subject=Help%20needed%20with%20step" 
          @click="$ga.event('help-fab', 'step', 'I don\'t understand this step', analyticsPayload)">I don't understand this step</v-btn><br >
        <v-btn 
          href="mailto:pf@stabback.com?subject=Help%20needed%20with%20application" 
          @click="$ga.event('help-fab', 'application', 'I need help with the application', analyticsPayload)">I need help with the application</v-btn><br >
        <v-btn 
          href="mailto:pf@stabback.com?subject=Something%20is%20broken" 
          @click="$ga.event('help-fab', 'broken', 'Something is broken', analyticsPayload)">Something is broken</v-btn><br >
        <v-btn 
          href="mailto:pf@stabback.com?subject=Information%20is%20wrong" 
          @click="$ga.event('help-fab', 'bad-info', 'The information is wrong', analyticsPayload)">The information is wrong</v-btn><br >
        <v-btn 
          href="mailto:pf@stabback.com?subject=Hello%21" 
          @click="$ga.event('help-fab', 'contact', 'I want to get in touch', analyticsPayload)">I want to get in touch</v-btn>
      </v-card-text>
  
      <v-divider/>
  
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          flat
          @click="$ga.event('help-fab', 'closed', 'User closed the help dialog', analyticsPayload); dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },

  computed: {
    analyticsPayload () {
      return {
        step: this.$route.params.step
      }
    }
  }
}
</script>

<style>

</style>
