export default async function ({ store, error }) {
  const promises = []
  if(store.getters['steps/categories/categories'].length === 0) {
    promises.push(store.dispatch('steps/categories/fetchCategories'))
  }

  if(store.getters['steps/steps/steps'].length === 0) {
    promises.push(store.dispatch('steps/steps/fetchSteps'))
  }

  await Promise.all(promises)

  if(store.getters['steps/categories/categories'].length === 0) {
    return error({statusCode: 500, message: 'No categories could be found!'})
  }

  if(store.getters['steps/steps/steps'].length === 0) {
    return error({statusCode: 500, message: 'No steps could be found!'})
  }
}