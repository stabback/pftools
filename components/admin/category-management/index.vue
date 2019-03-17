<template>
  <v-card>
    <v-card-title primary-title>
      <h2 class="headline">Category management</h2>
    </v-card-title>
    <v-card-text>
      <v-select 
        :value="value" 
        :items="categories"
        item-text="name"
        item-value="id"
        label="Category"
        clearable
        @input="selectExistingCategory"
      />
      or
      <v-btn @click="createCategory">New Category</v-btn>
    </v-card-text>
    <template v-if="category || newCategory">
      <v-divider />
      <v-form 
        @submit.prevent="submit">
        <v-card-title class="headline">
          Meta
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="updatedCategory.id"
            :background-color="fieldColor('id')"
            required
            label="ID"
          />
          <v-text-field
            v-model="updatedCategory.slug"
            :background-color="fieldColor('slug')"
            required
            label="Slug"
          />
          <v-select 
            v-model="updatedCategory.start" 
            :background-color="fieldColor('start')"
            :items="steps"
            label="Starting Step"
            item-text="title"
            item-value="id"
          />
          <v-text-field
            v-model="updatedCategory.color"
            :background-color="fieldColor('color')"
            :color="updatedCategory.color"
            required
            label="Color"
          />
        </v-card-text>
        <v-card-title class="headline">
          Content
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="updatedCategory.name"
            :background-color="fieldColor('name')"
            required
            label="Name"
          />
          <v-text-field
            v-model="updatedCategory.subtitle"
            :background-color="fieldColor('subtitle')"
            required
            label="Subtitle"
          />
          <v-textarea
            v-model="updatedCategory.description"
            :background-color="fieldColor('description')"
            required
            label="Description"
          />
        </v-card-text>
        <v-divider />
        <v-card-title class="headline">
          Preview
        </v-card-title>
        <v-card-text
          class="preview" 
          v-html="$md.render(updatedCategory.description || '')" />
        <v-divider />
        <v-card-actions>
          <v-btn 
            v-if="!newCategory"
            :disabled="!canSubmit"
            type="submit"
            flat
            color="primary"
          >Update</v-btn>
          <v-btn 
            v-if="newCategory"
            :disabled="!canSubmit"
            type="submit"
            flat
            color="primary"
          >Create</v-btn>
          <v-btn 
            flat
            @click="resetUpdatedCategory"
          >Reset</v-btn>
          <v-btn 
            v-if="!newCategory"
            :to="{
              name: 'country-steps-category',
              params: {
                country: country.slug,
                category: category.slug
              }
            }"
            flat
            target="_blank">Link to category</v-btn>
          <v-btn
            v-if="!newCategory"
            flat
            color="error"
            @click="deleteCategory">Delete category</v-btn>
        </v-card-actions>
      </v-form>        
    </template>
  </v-card>
</template>

<script>
import isEqual from 'fast-deep-equal'
import clone from 'clone'
import { uuid } from '~/helpers'


export default {
  props: {
    value: {
      type: String,
      required: false,
      default: null
    },
    country: {
      type: Object,
      required: true
    },
  },

  data () {
    return {
      newCategory: false,
      updatedCategory: {
        id: '',
        name: '',
        start: '',
        slug: '',
        color: '',
        subtitle: '',
        description: ''
      },
    }
  },

  computed: {
    categories() {
      return this.$store.getters['steps/categories/items']
    },
    category() {
      return this.$store.getters['steps/categories/itemById'](this.value)
    },
    canSubmit () {
      return (
        (this.category && !isEqual(this.updatedCategory, this.category) || this.newCategory)
      )
    },
    steps() {
      return this.$store.getters['steps/steps/items']
    }
  },

  watch: {
    value () {
      this.updateValue()
    }
  },

  methods: {
    createCategory () {
      this.$emit('input', undefined)
      this.clearUpdatedCategory()
      this.updatedCategory.id = uuid()
      this.newCategory = true
    },

    fieldColor(key) {
      return (!this.category || this.newCategory || (isEqual(this.updatedCategory[key], this.category[key]))) ? undefined : 'warning'
    },

    clearUpdatedCategory () {
      this.updatedCategory.name = ''
      this.updatedCategory.id = ''
      this.updatedCategory.start = ''
      this.updatedCategory.slug = ''
      this.color = '',
      this.subtitle = '',
      this.description = ''
    },

    resetUpdatedCategory () {
      this.updatedCategory = clone(this.category)
    },

    updateValue () {
      if(this.category) {
        this.resetUpdatedCategory()
      } else {
        this.clearUpdatedCategory()
      }
    },

    selectExistingCategory (e) {
      this.$emit('input', e)
      this.newCategory = false
    },
    
    async submit() {

      if(!this.newCategory && this.category.id !== this.updatedCategory.id) {
        if(this.categories.find(category => category.id === this.updatedCategory.id)) {
          window.alert("Aborting, you are attempting to set an ID to the ID of an existing category")
          return
        } else {
          if(!window.confirm("You're updating an id - are you sure you want to do this?  This may break steps or countries")) {
            return
          }
        }
      }
      const item = {
        ...this.category,
        ...this.updatedCategory
      }

      if(this.newCategory) {
        await this.$store.dispatch('steps/categories/create', item)
        this.newCategory = false
      } else {
        await this.$store.dispatch('steps/categories/update', item)
      }

      this.updateValue()
    },

    async deleteCategory() {
      if(window.prompt("Warning - this action can't be reversed.  Type 'confirm' to confirm you want to delete the selected category.") !== "confirm") {
        window.alert("Aborting")
        return
      }

      await this.$store.dispatch('steps/categories/delete', this.category.id)

      this.$emit('input', null)
      this.newCategory = false
    }
  }
}
</script>

<style scoped>

</style>
