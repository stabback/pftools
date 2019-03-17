import { commonStore } from '~/helpers'
import Step from '~/decorators/step'

export const state = commonStore.createState

export const actions = {
  ...commonStore.createActions({path: 'steps/steps'})
}

export const mutations = {
  ...commonStore.mutations
}

export const getters = {
  ...commonStore.createGetters({ Decorator: Step }),
  itemsByCategory: (_, getters) => category => getters.itemsByKey('category', category),
  itemsByCountry: (_, getters) => country => getters.itemsByKey('country', country),
  itemBySlug: (_, getters) => slug => getters.itemByKey('slug', slug),
  stepByUrl: (_, getters) => ({ country, category, step }) => { 
    return getters.items.find(thisStep => {
      return (
        thisStep.country === country && 
        thisStep.category === category && 
        thisStep.slug === step
      )
    })
  }
}