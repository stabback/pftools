export default async function ({ store, error }) {
  if(store.getters['steps/steps/items'].length === 0) {
    await store.dispatch('steps/steps/fetchAll')
  }

  if(store.getters['steps/steps/items'].length === 0) {
    return error({statusCode: 500, message: 'No steps could be found!'})
  }
}