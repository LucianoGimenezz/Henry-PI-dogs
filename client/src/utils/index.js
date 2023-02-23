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
    return filteredDogs
}

