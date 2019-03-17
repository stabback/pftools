export default async function ({ store, error }) {
  const promises = []
  if(store.getters['steps/categories/items'].length === 0) {
    promises.push(store.dispatch('steps/categories/fetchAll'))
  }

  if(store.getters['steps/steps/items'].length === 0) {
    promises.push(store.dispatch('steps/steps/fetchAll'))
  }

  await Promise.all(promises)

  if(store.getters['steps/categories/items'].length === 0) {
    return error({statusCode: 500, message: 'No categories could be found!'})
  }

  if(store.getters['steps/steps/items'].length === 0) {
    return error({statusCode: 500, message: 'No steps could be found!'})
  }
}