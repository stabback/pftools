<template>
  <v-card>
    <v-toolbar 
      color="primary" 
      dark>
      <v-toolbar-title>Phases</v-toolbar-title>
    </v-toolbar>
    <v-list two-line>
      <v-list-tile
        v-for="(category, index) in categories"
        :key="category.id"
        :to="{ name: 'country-steps-category', params: { country, category: category.id }}"
        :avatar="!!current"
        :disabled="current && current === category.id"
      >
        <v-list-tile-action v-if="current">
          <v-avatar
            v-if="current === category.id"
            size="32"
          >
            <v-icon 
              :color="category.color"
              size="32"
            >star</v-icon>
          </v-avatar>
          <v-avatar
            v-else
            size="32"
          >
            <v-icon 
              :color="category.color"
              size="32"
            >star_border</v-icon>
          </v-avatar>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Phase {{ index }}: {{ category.name }}
          </v-list-tile-title>
          <v-list-tile-sub-title>{{ category.subtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>

      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array, 
      required: true,
    },
    country: {
      type: String,
      required: true
    },
    current: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style>

</style>
