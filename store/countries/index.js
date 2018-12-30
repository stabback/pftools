export const state = () => ({
  countries: []
})

export const actions = {
  async fetchCountries({commit})  {
    const countriesRef = this.$fireDb.ref('countries')
    try {
      const snapshot = await countriesRef.once('value')
      const countries = snapshot.val()
    } catch (e) {
      alert("Having some tech difficulties, try reloading")
      return
    }
  }
}

export const mutations = {
  saveCountries(s, payload) {
    console.log("Saving countries", payload)
    s.countries = payload
  }
}

export const getters = {
  countryById: s => id => {
    return s.countries.find(c => c.id === id)
  },
  countries: s => s.countries
}