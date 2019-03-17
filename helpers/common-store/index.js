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
      s.items = items
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

  getters: {
    fetching: s => s.meta.fetching,
    failed: s => s.meta.failed,
    errors: s => s.meta.errors,
    items: s => Object.values(s.items),
    itemById: s => id => s.items[id],
    itemsByKey: s => (key, value) => Object.values(s.items).filter(item => item[key] === value),
    itemByKey: s => (key, value) => Object.values(s.items).find(item => item[key] === value)
  }
}