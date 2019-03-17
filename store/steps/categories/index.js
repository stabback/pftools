import { commonStore } from '~/helpers'

export const state = commonStore.createState

export const actions = {
  ...commonStore.createActions({path: 'steps/categories'})
}

export const mutations = {
  ...commonStore.mutations
}

export const getters = {
  ...commonStore.getters,
  itemBySlug: (_, getters) => slug => getters.itemByKey('slug', slug),
  categoryByUrl: (_, getters) => ({ country, category }) => {
    console.log(getters.items)
    return false
  }
}
