<template>
  <v-app>
    <pf-nav />
    <v-content>
      <v-container grid-list-md>
        <v-layout row>
          <v-flex>
            <v-card
              :color="category.color"
            >
              <v-layout 
                :column="$vuetify.breakpoint.smAndDown"
                :align-center="$vuetify.breakpoint.mdAndUp"
              >
                <v-flex grow>

                  <v-card-title primary-title>
                    <div>
                      <h1 class="white--text headline">{{ category.name }}</h1>
                      <span class="white--text">{{ category.subtitle }}</span>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex shrink>
                  <v-btn 
                    :to="{name: 'country-steps-category', params: {
                      country: $route.params.country,
                      category: category.id
                    }}" 
                    :large="$vuetify.breakpoint.mdAndUp"
                    flat
                    class="white--text" 
                  >
                    Phase Details
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout 
          row 
          wrap>
          <v-flex 
            md8 
            order-md2>
            <nuxt />
          </v-flex>
          <v-flex 
            md4 
            order-md1>
            <steps-progress 
              :country="$route.params.country || undefined"
              :step="$route.params.step || undefined"
            />
          </v-flex>
          <help-button />
        </v-layout>
      </v-container>
    </v-content>
    <pf-footer />
  </v-app>
</template>

<script>
import StepsProgress from '~/components/steps/progress'
import PfNav from '~/components/layout/nav'
import PfFooter from '~/components/layout/footer'
import HelpButton from '~/components/help-button'
import { getMaxSteps } from '~/helpers'

export default {

  middleware: ['require-categories-steps', 'require-steps', 'verify-country', 'verify-category', 'verify-step'],
  
  components: {
    StepsProgress, PfNav, PfFooter, HelpButton
  },

  computed: {
    step () {
      if(this.$route.params.step) {
        return this.$store.getters['steps/steps/stepById'](this.$route.params.step)
      }
      return {}
    },

    firstStepInCategory () {
      return this.$store.getters['steps/steps/stepById'](this.category.start)
    },

    stepsInCategory () {
      return this.$store.getters['steps/steps/stepsByCategory'](this.category.id)
    },

    progress () {
      return (1 - (getMaxSteps(this.stepsInCategory, this.step) / getMaxSteps(this.stepsInCategory, this.firstStepInCategory))) * 100
    },

    category () {
      if(this.$route.params.category) {
        return this.$store.getters['steps/categories/categoryById'](this.$route.params.category)
      }
      return {}
    },
  }
}
</script>

<style lang="stylus">

</style>
