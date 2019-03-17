<template>
  <div>
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
                :to="firstStepLink"
                :large="$vuetify.breakpoint.mdAndUp"
                flat
                class="white--text"
              >
                Start
                <v-icon
                  right
                  dark>arrow_forward</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h1 class="headline">Phase Details</h1>
            </div>
          </v-card-title>

          <v-card-text v-html="$md.render(category.description || '')"/>

          <v-card-actions>
            <v-btn
              :to="firstStepLink"
              :color="category.color"
              dark
            >Get Started
              <v-icon
                right
                dark>arrow_forward</v-icon>
            </v-btn>
          </v-card-actions>   
        </v-card>
      </v-flex> 
    </v-layout>
    <v-divider class="divider" />
    <v-layout>
      <v-flex>
        <phases 
          :categories="categories" 
          :current="category.id"
          :country="country.id" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Phases from '~/components/steps/phases'

export default {
  
  middleware: ['require-categories-steps', 'verify-country',  'verify-category'],

  components: {
    Phases
  },

  computed: {
    country () {
      return this.$store.getters['countries/itemBySlug'](this.$route.params.country)
    },

    category () {
      return this.$store.getters['steps/categories/itemByUrl'](this.$route.params)
    },

    categories () {
      return this.country.categories
    },

    firstStep () {
      return this.$store.getters['steps/steps/itemById'](this.category.start)
    },

    firstStepLink () {
      return { 
        name: 'country-steps-category-step', 
        params: { 
          country: this.country.slug, 
          category: this.category.slug, 
          step: this.firstStep.slug
        }
      }
    }
  }
}
</script>

<style scoped>
.subheading {
  padding-bottom: 0;
  font-weight: 500;
}

.divider {
  margin-top: 25px;
  padding: 25px 0 0;
}
</style>
