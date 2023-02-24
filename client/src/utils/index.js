export function filter (options, dogs) {
    let filteredDogs = [...dogs]
    if (Object.values(options).every((item) => item === null) ||
        !Object.keys(options).length ) {
        return dogs
    }

    if (options.temperament) {
        filteredDogs = dogs?.filter((item) => {
            return item.temperaments?.includes(options.temperament)
        })
    }

    if (options.origin) {
       filteredDogs = filteredDogs.filter((item) => {
         if (options.origin === 'bd') {
            return /\D/.test(item.id)
         }
         return !/\D/.test(item.id)
       })
    }

    if (options.order) {
        filteredDogs = filteredDogs.sort((a, b) => {
            if (/^a/.test(options.order)) {
               if (a.name < b.name) return -1
               if (a.name > b.name) return 1
               return 0
            }
            if (a.name < b.name) return 1
            if (a.name > b.name) return -1
            return 0
        })
    }

    if (options.weight) {
        filteredDogs = filteredDogs.sort((a, b) => {
            if (options.weight === 'menor') {
                let weightA = isNaN(parseInt(a.weight[0])) ? a.weight[1] : a.weight[0]
                let weightB = isNaN(parseInt(b.weight[0])) ? b.weight[1] : b.weight[0]
                return parseInt(weightA) - parseInt(weightB)
            }
            let weightA = a.weight.length === 2 ? a.weight[1] : a.weight[0]
            let weightB = b.weight.length === 2 ? b.weight[1] : b.weight[0]
            return parseInt(weightB) - parseInt(weightA)
        })
    }
    return filteredDogs
}


export function paginate (dogs) {
    let currentPage = 1
    const pagination = {}
    pagination[currentPage] = []
    for(let i = 0; i < dogs.length; i++) {
      if(pagination[currentPage].length < 8) pagination[currentPage].push(dogs[i])
      else {
        currentPage++
        pagination[currentPage] = []
        pagination[currentPage].push(dogs[i])
      }

    }
    return pagination
}
