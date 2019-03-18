class Category {
  constructor (category) {
    this._obj = category
  }

  get id () {
    return this._obj.id
  }

  get name () {
    return this._obj.name
  }

  get asName () {
    return `${this.name} [${this.id}]`
  }

  get slug () {
    return this._obj.slug
  }

  get start () {
    return this._obj.start
  }

  get subtitle () {
    return this._obj.subtitle
  }

  get color () {
    return this._obj.color
  }

  get description () {
    return this._obj.description
  }
}

export default Category