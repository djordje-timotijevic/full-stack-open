const searchForName = (personsArray, name) => {
    let nameExists
    personsArray.forEach((person) => {
        if (person.name === name) {
            nameExists = true
        }
    })

    if (nameExists === true) {
        return true
    } else {
        return false
    }
}

export default searchForName