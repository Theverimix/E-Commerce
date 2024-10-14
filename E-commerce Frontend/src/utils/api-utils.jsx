export const handleApiPromise = async (promise) => {
    return await promise
        .then(({ data }) => {
            return data
        })
        .catch(({ response }) => {
            return response.data
        })
}
