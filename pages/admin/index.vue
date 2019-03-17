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
    <template v-if="loading">
      <v-flex>
        Loading...
      </v-flex>
    </template> 
    <template v-else>
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
    </template>
  </v-layout>
</template>

<script>
import CountryManagement from '~/components/admin/country-management'
import CategoryManagement from '~/components/admin/category-management'
import StepManagement from '~/components/admin/step-management'

export default {
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
      selectedStep: null,
      loading: true
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

  mounted () {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      this.loading = true

      const search = {
        key: 'country',
        value: this.selectedCountry
      }

      await Promise.all([
        this.$store.dispatch('steps/categories/fetchAll'),
        this.$store.dispatch('steps/steps/fetchByKey', search)
      ])
      this.loading = false
    }
  },

}
</script>

<style>

</style>
