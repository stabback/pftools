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
          <div 
            v-for="descriptor in category.description" 
            :key="JSON.stringify(descriptor.content)">

            <v-card-text 
              v-if="descriptor.type==='paragraph'" 
              v-text="descriptor.content"/>

            <v-card-text 
              v-if="descriptor.type==='unordered-list'" >
              <p>{{ descriptor.content.introduction }}</p>
              <ul>
                <li 
                  v-for="item in descriptor.content.items" 
                  :key="item.content" 
                  v-text="item.content"/>
              </ul>
            </v-card-text>

            <v-card-title
              v-if="descriptor.type==='heading-1'"
              class="subheading"
              v-text="descriptor.content"
            />
          </div>
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
  
  middleware: ['verify-country',  'verify-category'],

  components: {
    Phases
  },

  computed: {
    country () {
      return this.$store.getters['countries/countryById'](this.$route.params.country)
    },

    category () {
      return this.$store.getters['steps/categories/categoryById'](this.$route.params.category)
    },

    categories () {
      return this.country.categories.map(category => this.$store.getters['steps/categories/categoryById'](category))
    },

    firstStepLink () {
      return { 
        name: 'country-steps-category-step', 
        params: { 
          country: this.country.id, 
          category: this.category.id, 
          step: this.category.start
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
