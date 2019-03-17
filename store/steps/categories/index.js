import { commonStore } from '~/helpers'

export const state = commonStore.createState

export const actions = {
  ...commonStore.createActions({path: 'steps/categories'})
}

export const mutations = {
  ...commonStore.mutations
}

export const actions = {
  async fetchCategories({commit})  {
    const categoriesRef = this.$fireDb.ref('steps/categories')
    try {
      const snapshot = await categoriesRef.once('value')
      const categories = snapshot.val()
      commit('saveCategories', Object.values(categories))
    } catch (e) {
      alert("Having some tech difficulties, try reloading")
      return
    }
  }
}

export const mutations = {
  saveCategories(s, payload) {
    s.categories = payload
  }
}

export const getters = {
  ...commonStore.getters,
  itemBySlug: (_, getters) => slug => getters.itemByKey('slug', slug)
}
