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
        weight: item.weight.metric,
        height: item.height.metric
      }
    })
  }

  dataFormatterDB () {
    return this.db.map((item) => {
      return {
        id: item.dataValues.id,
        name: item.dataValues.name,
        image: item.dataValues.image,
        life_span: item.dataValues.life_span
      }
    })
  }
}

module.exports = Formatter
