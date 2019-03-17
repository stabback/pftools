import Category from '../category'

class Country {
  constructor (country, { categories }) {
    console.log("Creating a country", country, categories)
    this._obj = country
    this._categories = categories
  }

  get id () {
    return this._obj.id
  }

  get name () {
    return this._obj.name
  }

  get slug () {
    return this._obj.slug
  }

  get start () {
    return this._obj.start
  }

  get categories () {
    return this._obj.categories.map(catId => {
      const category = this._categories.find(c => c.id === catId)
      if(!category) {
        throw new Error("Category [" + catId + "] not found for country [" + this.id + "]")
      }
      return new Category(category)
    })
  }
}

export default Country