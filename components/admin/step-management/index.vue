<template>
  <v-card>
    <v-card-title primary-title>
      <h2 class="headline">Step management</h2>
    </v-card-title>
    <v-card-text>
      <v-select 
        :value="value" 
        :items="steps"
        item-text="title"
        item-value="id"
        label="Edit Existing Step"
        clearable
        @input="selectExistingStep"
      />
      or
      <v-btn @click="createStep">New Step</v-btn>
    </v-card-text>
    <template v-if="step || newStep">
      <v-divider />
      <v-form 
        @submit.prevent="submit">
        <v-card-title class="headline">
          Meta
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="updatedStep.id"
            :background-color="fieldColor('id')"
            required
            label="ID"
          />
          <v-text-field
            v-model="updatedStep.slug"
            :background-color="fieldColor('slug')"
            required
            label="Slug"
          />
          <v-select 
            v-model="updatedStep.country" 
            :background-color="fieldColor('country')"
            :items="countries"
            label="Country"
            item-text="name"
            item-value="id"
          />
          <v-select 
            v-model="updatedStep.category" 
            :background-color="fieldColor('category')"
            :items="categories"
            label="Category"
            item-text="name"
            item-value="id"
          />
        </v-card-text>
        <v-divider />

        <v-card-title class="headline">
          Content
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="updatedStep.title"
            :background-color="fieldColor('title')"
            required
            label="Title"
          />
          <v-textarea
            v-model="updatedStep.content"
            :background-color="fieldColor('content')"
            required
            label="Content"
          />
        </v-card-text>
        <v-divider />
        <v-card-title class="headline">
          Preview
        </v-card-title>
        <v-card-text
          class="preview" 
          v-html="$md.render(updatedStep.content || '')" />
        <v-divider />
      
        <v-divider />
        <v-card-title class="headline">
          Next step options
        </v-card-title>
        <v-card-text>
          <draggable
            v-model="updatedStep.next" 
            :options="{group:'next'}" 
          >
            <v-flex
              v-for="option in updatedStep.next" 
              :key="option.id">
              <v-card
                :color="fieldColor('next')"
              >
                <v-card-text>
                  <v-text-field
                    v-model="option.prompt"
                    required
                    label="Prompt"
                  />
                  <v-select 
                    v-model="option.id" 
                    :items="allSteps"
                    label="Step"
                    item-text="name"
                    item-value="id"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-btn 
                    color="error" 
                    flat 
                    @click="removeOption(option.id)">Remove</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </draggable>
        </v-card-text>
        <v-card-text>
          <v-flex>
            <v-card>
              <v-card-title 
                primary-title 
                class="headline">
                Add new option
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="newNext.prompt"
                  label="Prompt"
                />
                <v-select 
                  v-model="newNext.id" 
                  :items="allSteps"
                  label="Step"
                  item-text="name"
                  item-value="id"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn 
                  :disabled="!canAddOption"
                  flat 
                  @click="addOption">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn 
            v-if="!newStep"
            :disabled="!canSubmit"
            type="submit"
            flat
            color="primary"
          >Update</v-btn>
          <v-btn 
            v-if="newStep"
            :disabled="!canSubmit"
            type="submit"
            flat
            color="primary"
          >Create</v-btn>
          <v-btn 
            flat
            @click="resetUpdatedStep"
          >Reset</v-btn>
          <v-btn 
            v-if="!newStep"
            :to="{
              name: 'country-steps-category-step',
              params: {
                country: country.slug,
                category: category.slug,
                step: step.slug
              }
            }"
            flat
            target="_blank">Link to step</v-btn>
          <v-btn
            v-if="!newStep"
            flat
            color="error"
            @click="deleteStep">Delete step</v-btn>
        </v-card-actions>
      </v-form>  
    </template>      
  </v-card>
</template>

<script>
import isEqual from 'fast-deep-equal'
import clone from 'clone'
import Draggable from 'vuedraggable'
import { uuid } from '~/helpers'

export default {
  components: {
    Draggable
  },

  props: {
    value: {
      type: String,
      required: false,
      default: null
    },
    category: {
      type: Object,
      required: true
    },
    country: {
      type: Object,
      required: true
    },
  },

  data () {
    return {
      newNext: {
        id: '',
        prompt: ''
      },
      updatedStep: {
        id: '',
        title: '',
        slug: '',
        country: '',
        category: '',
        content: '',
        next: []
      },
      newStep: false
    }
  },

  computed: {
    countries() {
      return this.$store.getters['countries/items']
    },
    categories() {
      return this.$store.getters['steps/categories/items']
    },
    allSteps() {
      let category
      let name
      return this.$store.getters['steps/steps/items'].map(step => {
        category = this.$store.getters['steps/categories/itemById'](step.category)
        name = category.name + ' | ' + step.title
        return {
          ...step,
          name
        }
      }).sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })
    },
    steps() {
      return this.$store.getters['steps/steps/itemsByCategory'](this.category.id)
    },
    step() {
      return this.$store.getters['steps/steps/itemById'](this.value)
    },
    canSubmit () {
      return (
        (this.step && !isEqual(this.updatedStep, this.step) || this.newStep)
      )
    },
    canAddOption () {
      return this.newNext.id !== '' && this.newNext.prompt !== ''
    }
  },

  watch: {
    value () {
      this.updateValue()
    }
  },

  methods: {
    selectExistingStep (e) {
      this.$emit('input', e)
      this.newStep = false
    },

    createStep () {
      this.$emit('input', undefined)
      this.clearUpdatedStep()
      this.updatedStep.id = uuid()
      this.updatedStep.country = this.country.id
      this.updatedStep.category = this.category.id
      this.newStep = true
    },

    clearUpdatedStep() {
        this.updatedStep.id = ''
        this.updatedStep.title = ''
        this.updatedStep.slug = ''
        this.updatedStep.country = ''
        this.updatedStep.category = ''
        this.updatedStep.content = ''
        this.updatedStep.next = []
        this.newNext.prompt = ''
        this.newNext.id = ''
    },

    resetUpdatedStep() {
      this.updatedStep = clone(this.step)
    },

    addOption() {
      this.updatedStep.next.push(clone(this.newNext))
        this.newNext.prompt = ''
        this.newNext.id = ''
    },

    removeOption(id) {
      this.updatedStep.next = this.updatedStep.next.filter(option => option.id !== id)
    },

    fieldColor(key) {
      return (!this.step || this.newStep || (isEqual(this.updatedStep[key], this.step[key]))) ? undefined : 'warning'
    },

    updateValue () {
      if(this.step) {
        this.resetUpdatedStep()
      } else {
        this.clearUpdatedStep()
      }
    },
    
    async submit() {
      if(!this.newStep && this.step.id !== this.updatedStep.id) {
        if(this.steps.find(step => step.id === this.updatedStep.id)) {
          window.alert("Aborting, you are attempting to set an ID to the ID of an existing step")
          return
        } else {
          if(!window.confirm("You're updating an id - are you sure you want to do this?  This may break other steps")) {
            return
          }
        }
      }
      const item = {
        ...this.step,
        ...this.updatedStep
      }

      if(this.newStep) {
        await this.$store.dispatch('steps/steps/create', item)
        this.newStep = false
      } else {
        await this.$store.dispatch('steps/steps/update', item)
      }

      this.updateValue()
    },

    async deleteStep() {
      if(window.prompt("Warning - this action can't be reversed.  Type 'confirm' to confirm you want to delete the selected step.") !== "confirm") {
        window.alert("Aborting")
        return
      }

      await this.$store.dispatch('steps/steps/delete', this.step.id)

      this.$emit('input', null)
      this.newStep = false
    }
  }
}
</script>

<style>

</style>
