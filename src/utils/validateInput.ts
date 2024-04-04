export const validateInput = (value: number) => {
    if (!isNaN(value) && value >= 1 && value <= 100) {
        return true
    }
    return false
}
