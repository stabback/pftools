<template>
  <h1>Redirecting...</h1>
</template>

<script>
export default {
  asyncData({ redirect }) {
    return redirect({ name: 'country', params: { country: 'canada' }})
  }
}
</script>
