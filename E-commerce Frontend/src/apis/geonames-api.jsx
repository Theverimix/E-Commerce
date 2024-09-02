import axios from 'axios'

export const getCountries = async () => {
    return axios
        .get('http://api.geonames.org/countryInfoJSON', {
            params: {
                username: 'daga.team',
            },
        })
        .then((response) => {
            const countriesData = response.data.geonames.map((country) => ({
                name: country.countryName,
                code: country.countryCode,
                geonameId: country.geonameId,
            }))
            return countriesData
        })
        .catch((error) => {
            console.error('Error fetching countries:', error)
            alert('Error fetching countries: ' + error.message)
        })
}

export const getStates = async (countryGeonameId) => {
    return axios
        .get('http://api.geonames.org/childrenJSON', {
            params: {
                geonameId: countryGeonameId,
                username: 'daga.team',
            },
        })
        .then((response) => {
            const statesData = response.data.geonames.map((state) => ({
                name: state.name,
                code: state.adminCode1,
                geonameId: state.geonameId,
            }))
            return statesData
        })
        .catch((error) => {
            console.error('Error fetching states:', error)
            alert('Error fetching states: ' + error.message)
        })
}

export const getCities = async (countryCode, stateCode) => {
    return axios
        .get('http://api.geonames.org/searchJSON', {
            params: {
                country: countryCode,
                adminCode1: stateCode,
                featureCode: 'PPL',
                username: 'daga.team',
            },
        })
        .then((response) => {
            console.log(response)
            const citiesData = response.data.geonames.map((city) => ({
                name: city.name,
                geonameId: city.geonameId,
            }))
            return citiesData
        })
        .catch((error) => {
            console.error('Error fetching cities:', error)
            alert('Error fetching cities: ' + error.message)
        })
}
