<template>
  <div v-if="country && step">
    <v-list class="transparent">
      <v-subheader>
        <h2 class="title font-weight-light grey--text text--darken-3">Overall Progress</h2>
      </v-subheader>
      <v-list-tile
        v-for="group in groups"
        :key="group.key"
        :to="{ name: 'country-steps-category', params: { country: $route.params.country, category: group.id }}"
        avatar
      >
        <v-list-tile-action>
          <v-progress-circular
            v-if="group.value < 100"
            :rotate="270"
            :color="group.color"
            :value="group.value"
          />
          <v-avatar
            v-else
            size="32"
          >
            <v-icon 
              :color="group.color"
              size="32"
            >check_circle</v-icon>
          </v-avatar>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title v-text="group.name" />
        </v-list-tile-content>

        <v-list-tile-avatar>
          <v-icon 
            v-if="group.key === $route.params.category" 
          >star</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { getMaxSteps } from '~/helpers'

export default {
  props: {
    country: {
      type: String,
      required: false,
      default: undefined
    },
    step: {
      type: String,
      required: false,
      default: undefined
    }
  },

  computed: {

    categories() {
      return this.thisCountry.categories.map(cat =>  this.$store.getters['steps/categories/categoryById'](cat))
    },

    thisCountry () {
      return this.$store.getters['countries/countryById'](this.country)
    },

    category () {
      return this.$store.getters['steps/categories/categoryById'](this.$route.params.category)
    },

    thisStep () {
      return this.$store.getters['steps/steps/stepById'](this.$route.params.step)
    },

    groups () {
      let complete = true
      let value
      let steps
      let startMaxSteps
      let startStep

      const g = this.categories.map((category) => {
        if(category.id === this.category.id) {
          complete = false
          steps = this.$store.getters['steps/steps/stepsByCategory'](this.category.id)
          startStep = steps.find(s => s.id === this.category.start)
          startMaxSteps = getMaxSteps(steps, startStep)
          value = ((startMaxSteps - getMaxSteps(steps, this.thisStep)) / startMaxSteps) * 100
          if(value < 5) {
            value = 5
          }
        } else {
          value = complete ? 100 : 0
        }        

        return {
          id: category.id,
          color: category.color,
          name: category.name,
          value
        }
      })
      
      return g
    },
  }
}
</script>

<style>
</style>
