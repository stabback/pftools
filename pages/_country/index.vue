<template>
  <div class="wrap">
    <template v-if="country">
      <h1>Personal Finance tools</h1>
      <br >
      <p>Hey, thanks for clicking around!</p>
      <p>I'm hoping to build out a set of tools to help people understand and manage their finances.  All I've got so far is an interactive version of the "What to do with your money" flowchart.  Take a look!</p>
      <v-btn 
        :to="{ 
          name: 'country-steps', 
          params: 
            { 
              country: 'canada' 
            }
        }
        "
        color="primary"
      >Money Steps</v-btn>
      <v-btn href="mailto:pf@stabback.com">Contact me</v-btn>
      <v-btn href="https://reddit.com/r/personalfinancecanada">Read Subreddit</v-btn>
      <v-btn @click="writeToRealtimeDb">Write</v-btn>
      <v-btn @click="readFromRealtimeDb">Read</v-btn>
    </template>

    <v-layout 
      v-else 
      align-center
      justify-center
      fill-height
      class="not-supported"
    >
      <v-flex>
        <h1 class="display-2">Thanks for your interest!</h1>
        <p>Unfortunately, right now I'm just getting setup with Canada.  In the future, we'd like to support <code>{{ $route.params.country }}</code>.</p>
        <v-btn 
          :to="{ 
            name: 'country', 
            params: 
              { 
                country: 'canada' 
              }
          }
          "
          color="primary"
        >View Canada</v-btn>
        <v-btn href="mailto:pf@stabback.com">Contact me</v-btn>
        <v-btn href="https://reddit.com/r/personalfinancecanada">Read Subreddittt</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  asyncData({redirect, params, store}) {

    const country = store.getters['countries/countryById'](params.country)

    return {
      country
    }
  },

  computed: {
    countries () {
      return this.$store.getters['countries/countries']
    }
  },

  methods: {
    async writeToRealtimeDb() {
      // console.log(this.countries)
      // const countryRef = this.$fireDb.ref('countries')
      // try {
      //   countryRef.set(this.countries.reduce((acc,country) => {
      //     return {
      //       ...acc,
      //       [country.id]: country
      //     }
      //   }, {}))
      // } catch (e) {
      //   alert(e)
      //   return
      // }
      // alert('Success.')
    },
    async readFromRealtimeDb() {
      
      this.$store.dispatch('countries/fetchCountries')
      // const messageRef = this.$fireDb.ref('message')
      // try {
      //   const snapshot = await messageRef.once('value')
      //   alert(snapshot.val().message)
      // } catch (e) {
      //   alert(e)
      //   return
      // }
    }
  }
}
</script>

<style scoped lang="stylus">
  .wrap 
    width: 100%;
    .not-supported
      padding: 50px 0
      text-align: center;
      h1
        margin-bottom: 20px;
</style>
