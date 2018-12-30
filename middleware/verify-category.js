export default function ({ route, store, error }) {
  const country = store.getters['steps/categories/categoryById'](route.params.category)

  if (!country) {
    return error({ statusCode: 404, message: 'Category not found' })
  }
}