<template>
  <h1>Redirecting...</h1>
</template>

<script>
export default {
  asyncData({ redirect }) {
    return redirect({ name: 'country-steps-category-step', params: { country: 'canada', category: 'budget', step: 'create-budget' }})
  }
}
</script>
