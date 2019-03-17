import { commonStore } from '~/helpers'
import Category from '~/decorators/country'

export const state = commonStore.createState

export const actions = {
  ...commonStore.createActions({path: 'steps/categories'})
}

export const mutations = {
  ...commonStore.mutations
}

export const getters = {
  ...commonStore.createGetters({ Decorator: Category }),
  itemBySlug: (_, getters) => slug => getters.itemByKey('slug', slug),
  itemByUrl: (_, getters, __, rootGetters) => ({ country, category }) => {
    const thisCountry = rootGetters['countries/itemBySlug'](country)
    const thisCategory = thisCountry.categories.find(cat => cat.slug === category)

    return thisCategory
  }
}
