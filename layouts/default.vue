<template>
  <v-app>
    <pf-nav />
    <v-content>
      <v-container grid-list-md>
        <nuxt/>
      </v-container>
    </v-content>
    <pf-footer />
  </v-app>
</template>

<script>
import PfNav from '~/components/layout/nav'
import PfFooter from '~/components/layout/footer'
export default {
  components: {
    PfNav, PfFooter
  }
}
</script>

<style scoped lang="stylus">
  a
    text-decoration: none;
</style>
