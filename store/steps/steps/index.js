import { commonStore } from '~/helpers'
import Step from '~/decorators/step'

export const state = commonStore.createState

export const actions = {
  ...commonStore.createActions({path: 'steps/steps'})
}

export const mutations = {
  ...commonStore.mutations
}

export const getters = {
  ...commonStore.createGetters({ Decorator: Step }),
  itemsByCategory: (_, getters) => category => {
    return getters.items.filter(item => item.category.id === category)
  },
  itemsByCountry: (_, getters) => country => getters.itemsByKey('country', country),
  itemBySlug: (_, getters) => slug => getters.itemByKey('slug', slug),
  itemByUrl: (_, g, __, rootGetters) => ({ country, category, step }) => {
    const thisCountry = rootGetters['countries/itemBySlug'](country)
    const thisCategory = thisCountry.categories.find(cat => cat.slug === category)
    const thisStep = g.items.find(item => (
      item.category.id === thisCategory.id &&
      item.country.id === thisCountry.id &&
      item.slug === step
    ))
    return thisStep
  }
}