<template>
  <v-toolbar 
    fixed 
    app
    class="elevation-1"
  >
    <v-toolbar-title>
      <template v-if="$fireAuth.currentUser">
        <nuxt-link 
          :to="{name: 'admin' }" 
          class="home-link"
        >ADMIN</nuxt-link>
        &nbsp;|&nbsp;
      </template>
      <nuxt-link 
        :to="{name: 'index'}" 
        class="home-link"
      >PF Tools</nuxt-link>
      &nbsp;|&nbsp;
      <nuxt-link 
        :to="{name: 'country-steps', params: { country: 'canada' }}" 
        class="home-link"
      >Steps</nuxt-link>
    </v-toolbar-title>

    <v-spacer/>

    <v-menu 
      :nudge-width="100">
      <v-toolbar-title 
        slot="activator" 
        @click="$ga.event('navigation', 'country', 'User is checking available countries')">
        <span>{{ country.name }}</span>
        <v-icon>arrow_drop_down</v-icon>
      </v-toolbar-title>
  
      <v-list>
        <v-list-tile 
          v-for="ctry in countries"
          :key="ctry.id"
          :to="'/' + ctry.slug + '/steps'"
          :disabled="ctry.slug === country.slug"
          nuxt
        >
          <v-list-tile-action>
            <v-icon 
              v-if="ctry.slug === country.slug" 
              color="primary"
            >star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ ctry.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile href="mailto:pf@stabback.com?subject=Add%20a%20country">
          <v-list-tile-content>
            <v-list-tile-title>Let me know your country</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
    <template 
      v-if="$vuetify.breakpoint.mdAndUp" >
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </template>

    <v-menu 
      v-if="$vuetify.breakpoint.mdAndUp" 
      :nudge-width="100">
      <v-toolbar-title 
        slot="activator"
        @click="$ga.event('navigation', 'language', 'User is checking available languages')"
      >
        <span>English</span>
        <v-icon>arrow_drop_down</v-icon>
      </v-toolbar-title>
  
      <v-list>
        <v-list-tile>
          <v-list-tile-title>
            Sorry, just English now
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile
            href="mailto:pf@stabback.com?subject=Add%20a%20language"
          >
            Let me know your language
          </v-list-tile>
        </v-list-tile>
      </v-list>
    </v-menu>
  
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    country () {
      return this.$store.getters['countries/itemBySlug'](this.$route.params.country)
    },

    countries () {
      return this.$store.getters['countries/items']
    }
  }
}
</script>

<style>
a.home-link {
  text-decoration: none !important
}
</style>
