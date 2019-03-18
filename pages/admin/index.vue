<template>
  <v-layout column>
    <v-flex>
      <h1>Admin dashboard</h1>
    </v-flex>
    <v-flex>
      <country-management 
        v-model="selectedCountry" 
        @input="fetchData"
      />
      
    </v-flex>
    <v-flex v-if="country">
      <category-management 
        v-model="selectedCategory" 
        :country="country" />
    </v-flex>
    <v-flex v-if="category">
      <step-management
        v-model="selectedStep"
        :country="country"
        :category="category"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import CountryManagement from '~/components/admin/country-management'
import CategoryManagement from '~/components/admin/category-management'
import StepManagement from '~/components/admin/step-management'

export default {
  async fetch ({ store }) {
    await Promise.all([
      store.dispatch('steps/categories/fetchAll'),
      store.dispatch('steps/steps/fetchAll')
    ])
  },

  components: {
    CountryManagement,
    CategoryManagement,
    StepManagement
  },

  middleware: ['restrict-admin-only'],

  data () {
    return {
      selectedCountry: 'canada',
      selectedCategory: null,
      selectedStep: null
    }
  },

  computed: {
    country() {
      return this.$store.getters['countries/itemById'](this.selectedCountry)
    },
    category() {
      return this.$store.getters['steps/categories/itemById'](this.selectedCategory)
    }
  },

}
</script>

<style>

</style>
