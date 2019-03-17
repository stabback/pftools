<template>
  <h1>Redirecting...</h1>
</template>

<script>
export default {
  middleware: ['require-categories-steps'],

  asyncData({ redirect, store, error, params }) {
    const country = store.getters['countries/itemById'](params.country)
    if(!country) {
      return error({statusCode: 404, message: 'Country not found'})
    }

    const category = store.getters['steps/categories/itemById'](country.categories[0])

    const step = store.getters['steps/steps/itemById'](category.start)

    return redirect({ name: 'country-steps-category-step', params: { country: 'canada', category: category.slug, step: step.slug }})
  }
}
</script>
