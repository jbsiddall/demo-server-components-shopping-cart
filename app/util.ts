
export const formDataToMap = (data: FormData) => {
    return ([...data.keys()]).reduce((results, key) => ({...results, [key]: data.get(key)}), {})
}