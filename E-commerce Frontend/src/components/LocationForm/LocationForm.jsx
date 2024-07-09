import React, { useState, useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown'
import axios from 'axios' // Iconos de PrimeReact

const LocationForm = ({ onCountryChange, onStateChange, onCityChange, validationErrors }) => {
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [states, setStates] = useState([])
    const [selectedState, setSelectedState] = useState(null)
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState(null)

    useEffect(() => {
        axios
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
                setCountries(countriesData)
            })
            .catch((error) => {
                console.error('Error fetching countries:', error)
                alert('Error fetching countries: ' + error.message)
            })
    }, [])

    const fetchStates = (countryGeonameId) => {
        // Fetch states based on selected country
        axios
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
                setStates(statesData)
            })
            .catch((error) => {
                console.error('Error fetching states:', error)
                alert('Error fetching states: ' + error.message)
            })
    }

    const fetchCities = (countryCode, stateCode) => {
        axios
            .get('http://api.geonames.org/searchJSON', {
                params: {
                    country: countryCode,
                    adminCode1: stateCode,
                    featureCode: 'PPL',
                    username: 'daga.team',
                },
            })
            .then((response) => {
                const citiesData = response.data.geonames.map((city) => ({
                    name: city.name,
                    geonameId: city.geonameId,
                }))
                setCities(citiesData)
            })
            .catch((error) => {
                console.error('Error fetching cities:', error)
                alert('Error fetching cities: ' + error.message)
            })
    }

    return (
        <div className='grid grid-nogutter gap-3'>
            <Dropdown
                className='col'
                invalid={validationErrors.selectedCountry}
                filter
                value={selectedCountry}
                options={countries}
                optionLabel='name'
                onChange={(e) => {
                    setSelectedCountry(e.value)
                    setSelectedState(null)
                    setSelectedCity(null)
                    if (onCountryChange) {
                        onCountryChange(e.value)
                    }
                    fetchStates(e.value.geonameId)
                }}
                placeholder='Select a country'
            />
            <Dropdown
                className='col'
                invalid={validationErrors.selectedState}
                filter
                value={selectedState}
                options={states}
                optionLabel='name'
                onChange={(e) => {
                    setSelectedState(e.value)
                    setSelectedCity(null)
                    if (onStateChange) {
                        onStateChange(e.value)
                    }
                    fetchCities(selectedCountry.code, e.value.code)
                }}
                placeholder='Select a state'
                disabled={!selectedCountry}
            />
            <Dropdown
                className='col'
                invalid={validationErrors.selectedCity}
                filter
                value={selectedCity}
                options={cities}
                optionLabel='name'
                onChange={(e) => {
                    setSelectedCity(e.value)
                    if (onCityChange) {
                        onCityChange(e.value)
                    }
                }}
                placeholder='Select a city'
                disabled={!selectedState}
            />
        </div>
    )
}

export default LocationForm
