<template>
  <h1>Redirecting...</h1>
</template>

<script>
export default {
  middleware: ['require-categories-steps'],

  asyncData({ redirect, store, error, params }) {
    const country = store.getters['countries/itemBySlug'](params.country)
    if(!country) {
      return error({statusCode: 404, message: 'Country not found'})
    }

    const step = store.getters['steps/steps/itemById'](country.start)

    return redirect({ name: 'country-steps-category-step', params: { 
      country: country.slug, 
      category: step.category.slug, 
      step: step.slug 
    }})
  }
}
</script>
