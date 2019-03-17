export default function ({ route, store, error }) {
  const category = store.getters['steps/categories/itemBySlug'](route.params.category)

  if (!category) {
    return error({ statusCode: 404, message: 'Category not found' })
  }
}