export const state = () => ({
  counter: 0
})

export const actions = {
  async nuxtClientInit ({dispatch}) {
    await dispatch('countries/fetchCountries')
  }
}