import { commonStore } from '~/helpers'

export const state = commonStore.createState

export const actions = {
  ...commonStore.createActions({path: 'countries'})
}

export const mutations = {
  ...commonStore.mutations
}

export const getters = {
  ...commonStore.getters
}
