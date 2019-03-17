import { commonStore } from '~/helpers'

export const state = commonStore.createState

export const actions = {
  ...commonStore.createActions({path: 'countries'})
}

export const mutations = {
  ...commonStore.mutations
}

export const actions = {
  async fetchCountries({commit})  {
    const countriesRef = this.$fireDb.ref('countries')
    try {
      const snapshot = await countriesRef.once('value')
      const countries = snapshot.val()
      commit('saveCountries', Object.values(countries))
    } catch (e) {
      alert("Having some tech difficulties, try reloading")
      return
    }
  }
}

export const mutations = {
  saveCountries(s, payload) {
    s.countries = payload
  }
}

export const getters = {
  ...commonStore.getters
}
