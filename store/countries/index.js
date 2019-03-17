import { commonStore } from '~/helpers'
import Country from '~/decorators/country'

export const state = commonStore.createState

export const actions = {
  ...commonStore.createActions({path: 'countries'})
}

export const mutations = {
  ...commonStore.mutations
}

export const getters = {
  ...commonStore.createGetters({ Decorator: Country }),
  itemBySlug: (_, getters) => slug => getters.itemByKey('slug', slug),
}
