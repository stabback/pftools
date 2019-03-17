export default async function ({ store, error }) {
  if(store.getters['steps/categories/items'].length === 0) {
    await store.dispatch('steps/categories/fetchAll')
  }

  if(store.getters['steps/categories/items'].length === 0) {
    return error({statusCode: 500, message: 'No categories could be found!'})
  }
}