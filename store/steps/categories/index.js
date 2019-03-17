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
  categoryByUrl: (_, getters) => ({ country, category }) => {
    return false
  }
}
