import { commonStore } from '~/helpers'

export const state = commonStore.createState

export const actions = {
  ...commonStore.createActions({path: 'steps/steps'})
}

export const mutations = {
  ...commonStore.mutations
}

export const getters = {
  ...commonStore.getters,
  itemsByCategory: (_, getters) => category => getters.itemsByKey('category', category),
  itemBySlug: (_, getters) => slug => getters.itemByKey('slug', slug)
}