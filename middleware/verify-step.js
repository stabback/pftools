export default function ({ route, store, error }) {
  const country = store.getters['steps/steps/stepById'](route.params.step)

  if (!country) {
    return error({ statusCode: 404, message: 'Step not found' })
  }
}