<template>
  <v-container
    grid-list-md
    class="wrap">
    <v-layout 
      row
      class="title-row"
    >
      <v-flex grow>
        <h2 class="title font-weight-light">This step</h2>
      </v-flex>
      <v-flex shrink>
        <v-btn 
          @click="$router.back()"
        >Back</v-btn>
      </v-flex>
    </v-layout>
    <v-layout column>
      <v-flex>
        <v-card>
          <v-card-title primary-title>
            <h1 class="headline">{{ step.title }}</h1>
          </v-card-title>

          <v-card-text 
            v-html="$md.render(step.content || '')" />

          <v-card-actions>
            <v-btn 
              v-for="option in options" 
              :key="option.id"
              :to="buildStepLink(option)"
              flat
            >
              {{ option.prompt }}
              <v-icon
                v-if="options.length === 1"
                right
                dark>arrow_forward</v-icon>
              <v-icon
                v-else-if="option.prompt.toLowerCase() === 'yes'"
                right
                dark>done</v-icon>
              <v-icon
                v-else-if="option.prompt.toLowerCase() === 'no'"
                right
                dark>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex class="additional-info">
        <v-layout column>
          <v-flex>
            <h2 class="title font-weight-light">Additional Information</h2>
          </v-flex>
          <v-flex>
            <v-card 
              hover
              target="_blank" 
              href="https://reddit.com/r/personalfinancecanada">
              <v-card-text>
                <v-avatar>
                  <img src="~/assets/reddit.png" >
                </v-avatar>
                &nbsp;&nbsp;Built with the help of the PFC subreddit
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card >
              <v-card-text>
                These cards will be used to provide links, additional information on the step, etc
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'step',

  transition: 'slide-left',

  computed: {

    step () {
      return this.$store.getters['steps/steps/itemByUrl'](this.$route.params)
    },

    category () {
      return this.$store.getters['steps/categories/itemByUrl'](this.$route.params)
    },

    options () {
      if(!this.step.next) {
        return []
      }
      let step
      let category
      return this.step.next.map(option => {
        step = this.$store.getters['steps/steps/itemById'](option.id)
        return {
          ...option,
          step
        }
      })
    }

  },

  methods: {
    buildStepLink (option) {
      return { 
        name: 'country-steps-category-step', 
        params: { 
          country: option.step.country.slug,
          category: option.step.category.slug,
          step: option.step.slug
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrap
  padding: 0

.title-row 
  padding: 25px 0 10px;
  .flex 
    align-content: center
    display: flex
    align-items: center

.container div.flex.additional-info
  padding-top: 25px
</style>
