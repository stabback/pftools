export const state = () => ({
  steps: []
})

export const actions = {
  async fetchSteps({commit})  {
    const stepsRef = this.$fireDb.ref('steps/steps')
    try {
      const snapshot = await stepsRef.once('value')
      const steps = snapshot.val()
      commit('saveSteps', Object.values(steps))
    } catch (e) {
      alert("Having some tech difficulties, try reloading")
      return
    }
  }
}

export const mutations = {
  saveSteps(s, payload) {
    s.steps = payload
  }
}

export const getters = {
  steps: s => s.steps,
  stepById: s => id => {
    return s.steps.find(step => step.id === id)
  },

  stepsByCategory: s => category =>  {
    return s.steps.filter(step => step.category === category)
  },

  stepsByCountry: s => country =>  {
    return s.steps.filter(step => step.country === country)
  },
}
