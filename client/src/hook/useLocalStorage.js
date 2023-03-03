function useLocalStorage(key) {

    const createLocalStorage = () => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, '[]')
        }
    }

    const setLocalStorage = (value) => {
        const values = JSON.parse(localStorage.getItem(key))
        values.push(value)
        localStorage.setItem(key, JSON.stringify(values))
    }

    const getLocalStorage = () => {
        return JSON.parse(localStorage.getItem(key))
    }

    const removeLocalStorage = (id) => {
        const values = JSON.parse(localStorage.getItem(key))
        const filteredValues = values.filter(value => value.id !== id)
        localStorage.setItem(key, JSON.stringify(filteredValues))
    }

    return {
        setLocalStorage,
        createLocalStorage,
        getLocalStorage,
        removeLocalStorage
    }
}

export default useLocalStorage