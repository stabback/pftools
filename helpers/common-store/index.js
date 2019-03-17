import Vue from 'vue'

export default {
  createState() {
    return {
      items: [],
      meta: {
        fetching: false,
        failed: false,
        errors: []
      }
    }
  },

  createActions({path}) {
    return {
      async fetchAll({commit}) {
        commit('fetching')
        try {
          const ref = this.$fireDb.ref(path)
          const snapshot = await ref.once('value')
          const items = snapshot.val()
          commit('saveItems', items)
        } catch (e) {
          commit('failed', e)
        }
  
        commit('fetched')
      },

      async fetchByKey({commit}, {key, value}) {
        commit('fetching')
        try {
          const ref = this.$fireDb.ref(path)
          const snapshot = await ref.orderByChild(key).equalTo(value).once('value')
          const items = snapshot.val()
          commit('saveItems', items)
        } catch (e) {
          commit('failed', e)
        }
  
        commit('fetched')
      },

      async update({commit}, item) {
        commit('fetching')
        try {
          const ref = this.$fireDb.ref(path + '/' + item.id)
          const result = await ref.set(item)
          commit('saveItem', item)
        } catch (e) {
          commit('failed', e)
        }
  
        commit('fetched')
      },

      async create({dispatch}, item) {
        dispatch('update', item)
      },

      async delete({commit}, id) {
        commit('fetching')
        try {
          const ref = this.$fireDb.ref(path + '/' + id)
          await ref.remove()
          commit('deleteItem', id)
        } catch (e) {
          commit('failed', e)
        }
  
        commit('fetched')
      }
    }
  },

  mutations: {
    fetching: s => {
      s.meta.fetching = true
      s.meta.failed = false
    },
  
    fetched: s => {
      s.meta.fetching = false
    },
  
    saveItems: (s, items) => {
      s.items = items ? items : []
    },

    saveItem: (s, item) => {
      Vue.set(s.items, item.id, item)
    },

    deleteItem: (s, id) => {
      Vue.delete(s.items, id)
    },

    failed: (s, errors) => {
      console.error(errors)
      s.meta.failed = true
      s.meta.errors = errors
    }
  },

  createGetters({Decorator}) {
    return {
      fetching: (s, g) => s.meta.fetching,
      failed: (s, g) => s.meta.failed,
      errors: (s, g) => s.meta.errors,
      rawItems: s => Object.values(s.items),
      items: (s, _, __, rootGetters) => {
        const countries = rootGetters['countries/rawItems']
        const steps = rootGetters['steps/steps/rawItems']
        const categories = rootGetters['steps/categories/rawItems']

        const data = {
          countries, steps, categories
        }

        return Object.values(s.items).map(item => new Decorator(item, data))
      },
      itemById: (_, g) => id => g.items.find(item => item.id === id),
      itemsByKey: (_, g) => (key, value) => g.items.filter(item => item[key] === value),
      itemByKey: (_, g) => (key, value) => g.items.find(item => item[key] === value)
    }
  }
}