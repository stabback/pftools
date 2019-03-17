<template>
  <v-card color="#FFEEEE">
    <v-card-title primary-title>
      <h2 class="headline">Country management</h2>
      <v-btn
        @click="collapsed = !collapsed"
      >{{ collapsed ? 'Expand' : 'Collapse' }}</v-btn>
    </v-card-title>
    <v-card-text 
      v-if="collapsed" 
      v-text="value" />
    <div v-else>
      <v-card-text>
        <v-select 
          :value="value" 
          :items="countries"
          item-text="name"
          item-value="id"
          label="Edit Existing Country"
          clearable
          @input="selectExistingCountry"
        />
        or
        <v-btn @click="createCountry">New Country</v-btn>
      </v-card-text>
      <template v-if="country || newCountry">
        <v-divider />
        <v-form 
          @submit.prevent="submit">
          <v-card-title class="headline">
            Meta
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="updatedCountry.id"
              :background-color="fieldColor('id')"
              required
              label="ID (doubles as slug)"
            />
            <v-select 
              v-model="updatedCountry.start" 
              :background-color="fieldColor('start')"
              :items="steps"
              label="Starting Step"
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
              v-model="updatedCountry.name"
              :background-color="fieldColor('name')"
              required
              label="Name"
            />
          </v-card-text>
          <v-card-text>
            <draggable
              v-model="updatedCountry.categories" 
              :options="{group:'categories'}" 
            >
              <v-flex
                v-for="(category, index) in updatedCountry.categories" 
                :key="category">
                <v-card
                  :color="fieldColor('categories')"
                >
                  <v-card-text>
                    <v-layout 
                      row 
                      align-center>
                      <v-flex grow>
                        <template v-if="categories.find(c => c.id === category)">
                          {{ categories.find(c => c.id === category).title }}
                        </template>
                        <template v-else>
                          ERROR - category does not exist [{{ category }}]
                        </template>
                      </v-flex>
                      <v-flex shrink>                
                        <v-btn 
                          color="error" 
                          flat 
                          @click="removeCategory(index)">Remove</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
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
                  Add new category
                </v-card-title>
                <v-card-text>
                  <v-select 
                    v-model="newCategory" 
                    :items="categories"
                    label="Category"
                    item-text="title"
                    item-value="id"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-btn 
                    :disabled="!canAddCategory"
                    flat 
                    @click="addCategory">Add</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-card-text>

          <v-divider />
          <v-card-actions>
            <v-btn 
              v-if="!newCountry"
              :disabled="!canSubmit"
              type="submit"
              flat
              color="primary"
            >Update</v-btn>
            <v-btn 
              v-if="newCountry"
              :disabled="!canSubmit"
              type="submit"
              flat
              color="primary"
            >Create</v-btn>
            <v-btn 
              flat
              @click="resetUpdatedCountry"
            >Reset</v-btn>
            <v-btn 
              v-if="!newCountry"
              :to="{
                name: 'country-steps',
                params: {
                  country: country.slug,
                }
              }"
              flat
              target="_blank">Link to country</v-btn>
            <v-btn
              v-if="!newCountry"
              flat
              color="error"
              @click="deleteCountry">Delete country</v-btn>
            <v-btn
              flat
              @click="collapsed = true"
              v-text="'Collapse'"
            />
          </v-card-actions>
        </v-form>        
      </template>
    </div>
  </v-card>
</template>

<script>
import isEqual from 'fast-deep-equal'
import clone from 'clone'
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  props: {
    value: {
      type: String,
      required: false,
      default: null
    }
  },

  data () {
    return {
      newCountry: false,
      newCategory: '',
      collapsed: true,
      updatedCountry: {
        id: '',
        name: '',
        start: '',
        categories: []
      }
    }
  },

  computed: {
    categories() {
      return this.$store.getters['steps/categories/items'].map(category => {
        return {
          ...category,
          title: category.name + ' [' + category.id + ']'
        }
      })
    },
    countries() {
      return this.$store.getters['countries/items']
    },
    country() {
      return this.$store.getters['countries/itemById'](this.value)
    },
    canSubmit () {
      return (
        (this.country && !isEqual(this.updatedCountry, this.country) || this.newCountry)
      )
    },
    steps() {
      let category
      let name
      return this.$store.getters['steps/steps/items'].map(step => {
        category = this.$store.getters['steps/categories/itemById'](step.category)
        name = category.name + ' | ' + step.title + ' [' + step.id + ']'
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

    canAddCategory () {
      return this.newCategory !== ''
    }
  },

  watch: {
    value () {
      this.updateValue()
    }
  },

  mounted() {
    this.updateValue()
  },

  methods: {
    removeCategory(id) {
      this.updatedCountry.categories = [
        ...this.updatedCountry.categories.slice(0, id),
        ...this.updatedCountry.categories.slice(id + 1)
      ]
    },

    selectExistingCountry (e) {
      this.$emit('input', e)
      this.newCountry = false
    },

    createCountry () {
      this.$emit('input', undefined)
      this.clearUpdatedCountry()
      this.newCountry = true
    },

    clearUpdatedCountry() {
      this.newCategory = ''
      this.updatedCountry.name = ''
      this.updatedCountry.id = ''
      this.updatedCountry.start = ''
      this.updatedCountry.categories = []
    },

    resetUpdatedCountry() {
      this.updatedCountry = clone(this.country)
    },

    addCategory() {
      this.updatedCountry.categories.push(this.newCategory)
      this.newCategory = ''
    },

    fieldColor(key) {
      return (!this.country || this.newCountry || (isEqual(this.updatedCountry[key], this.country[key]))) ? undefined : 'warning'
    },

    updateValue () {
      if(this.country) {
        this.resetUpdatedCountry()
      } else {
        this.clearUpdatedCountry()
      }
    },

    async submit() {
      if(!this.newCountry && this.country.id !== this.updatedCountry.id) {
        if(this.countries.find(country => country.id === this.updatedCountry.id)) {
          window.alert("Aborting, you are attempting to set an ID to the ID of an existing country")
          return
        } else {
          if(!window.confirm("You're updating an id - are you sure you want to do this?  This may break... everything?")) {
            return
          }
        }
      }
      const item = {
        ...this.country,
        ...this.updatedCountry
      }

      if(this.newCountry) {
        await this.$store.dispatch('countries/create', item)
        this.newCountry = false
      } else {
        await this.$store.dispatch('countries/update', item)
      }

      this.updateValue()
    },

    async deleteCountry() {
      if(window.prompt("Warning - this action can't be reversed.  Type 'confirm' to confirm you want to delete the selected country.") !== "confirm") {
        window.alert("Aborting")
        return
      }

      await this.$store.dispatch('countries/delete', this.country.id)

      this.$emit('input', null)
      this.newCountry = false
    }
  },
}
</script>

<style>

</style>
