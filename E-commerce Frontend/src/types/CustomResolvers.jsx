import { superstructResolver } from '@hookform/resolvers/superstruct'

export const customResolvers = (schema) => {
    return async (data, context, options) => {
        try {
            const result = await superstructResolver(schema)(data, context, options)
            console.log(result)
            if (result.errors) {
                const newErrors = {}
                for (const [key, error] of Object.entries(result.errors)) {
                    newErrors[key] = {
                        ...error,
                        message: getCustomErrorMessage(key, error.message),
                    }
                }
                result.errors = newErrors
            }
            return result
        } catch (error) {
            console.error('Error in resolver:', error)
            throw error
        }
    }
}

const getCustomErrorMessage = (fieldName, defaultMessage) => {
    const customMessages = {
        fullName: 'Please enter your full name as it appears on your ID.',
        country: 'Please select a country.',
        region: 'Region is required.',
        city: 'City is required.',
        addressLine: 'Please write the name of the street or avenue and the number if you have one.',
        zip: 'Please enter a valid zip code.',
        phone: 'Phone number is required.',
    }
    return customMessages[fieldName] || defaultMessage
}
