export default function ({ route, store, error }) {
  const country = store.getters['countries/itemById'](route.params.country)

  if (!country) {
    return error({ statusCode: 404, message: 'Country not found' })
  }
}