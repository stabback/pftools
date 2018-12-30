export const state = () => ({
  categories: []
})

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
  categories: s => s.categories,
  categoryById: s => id => {
    return s.categories.find(c => c.id === id)
  }
}