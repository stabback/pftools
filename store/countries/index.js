export const state = () => ({
  countries: [
    {
      id: 'canada',
      name: 'Canada',
      start: 'create-budget',
      categories: [
        'budget',
        'emergency',
        'employer',
        'high-interest-debt',
        'personal-investment',
        'retirement',
        'other-goals'
      ]
    }
  ]
})

export const getters = {
  countryById: s => id => {
    return s.countries.find(c => c.id === id)
  }
}