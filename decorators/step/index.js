import Country from '../country'
import Category from '../category'

class Step {
  constructor(step, { categories, countries}) {
    this._obj = step
    this._categories = categories
    this._countries = countries
  }

  get content () {
    return this._obj.content
  }

  get id () {
    return this._obj.id
  }

  get slug () {
    return this._obj.slug
  }

  get title () {
    return this._obj.title
  }

  get country () {
    const country = this._countries.find(country => country.id === this._obj.country)
    if(!country) {
      throw new Error("Country [" + this._obj.country + "] not found for step [" + this.id + "]")
    }
    return new Country(country, {
      categories: this.categories
    })
  }

  get category () {
    const category = this._categories.find(category => category.id === this._obj.category)
    if(!category) {
      throw new Error("Category [" + this._obj.category + "] not found for step [" + this.id + "]")
    }
    return new Category(category)
  }
}

export default Step