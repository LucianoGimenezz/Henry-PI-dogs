import { useState } from "react"

function useLocalStorage(key) {
    const [favs, setFavs] = useState([])

    const createLocalStorage = () => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, '[]')
            return true
        }
        return false
    }

    const setLocalStorage = (value) => {
        const values = JSON.parse(localStorage.getItem(key))
        values.push(value)
        setFavs(values)
        localStorage.setItem(key, JSON.stringify(values))
    }

    const getLocalStorage = () => {
        const data = JSON.parse(localStorage.getItem(key))
        setFavs(data)
        return data
    }

    const removeLocalStorage = (id) => {
        const values = JSON.parse(localStorage.getItem(key))
        const filteredValues = values.filter(value => value.id !== id)
        setFavs(filteredValues)
        localStorage.setItem(key, JSON.stringify(filteredValues))
    }

    const createDic = () => {
        const values = JSON.parse(localStorage.getItem(key))
        const dictonary = {}
        for (let i = 0; i < values.length; i++) {
            dictonary[values[i].id] = true
        }
        return dictonary
    }

    return {
        setLocalStorage,
        createLocalStorage,
        getLocalStorage,
        removeLocalStorage,
        createDic,
        favs
    }
}

export default useLocalStorage