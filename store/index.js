export const state = () => ({
  counter: 0
})

export const actions = {
  async nuxtClientInit ({dispatch}) {
    await Promise.all([
      dispatch('countries/fetchAll'),
      dispatch('steps/steps/fetchAll'),
      dispatch('steps/categories/fetchAll')
    ])
  }
}