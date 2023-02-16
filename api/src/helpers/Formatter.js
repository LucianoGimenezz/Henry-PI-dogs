class Formatter {
  constructor (api, db) {
    this.api = api
    this.db = db
  }

  setAPI (value) {
    this.api = value
  }

  setDB (value) {
    this.db = value
  }

  dataFormatterApi () {
    return this.api.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.image.url,
        life_span: item.life_span,
        weight: item.weight.metric?.split('-'),
        height: item.height.metric?.split('-'),
        temperaments: item.temperament?.split(',')
      }
    })
  }

  dataFormatterDB () {
    return this.db.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.image,
        life_span: item.life_span,
        weight: item.weight.split('-'),
        height: item.height.split('-'),
        temperaments: item.temperaments.map((item) => item.name)
      }
    })
  }
}

module.exports = Formatter
