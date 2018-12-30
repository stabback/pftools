export default async function ({ store, error }) {
  if(store.getters['steps/steps/steps'].length === 0) {
    await store.dispatch('steps/steps/fetchSteps')
  }

  if(store.getters['steps/categories/categories'].length === 0) {
    return error({statusCode: 500, message: 'No steps could be found!'})
  }
}