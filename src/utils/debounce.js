export function debounce(func, wait) {
    let timeout

    return function () {
        // const context = this;
        const args = arguments
        const later = function () {
            timeout = null
            func.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}