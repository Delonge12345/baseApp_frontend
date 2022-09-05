export const hexToRgb = (hex, opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
        const r = parseInt(result[1], 16)
        const g = parseInt(result[2], 16)
        const b = parseInt(result[3], 16)

        return [r, g, b, opacity && opacity]
    }

    return null
}

export const rgbaToHex = (color) => {
    if (/^rgb/.test(color)) {
        const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',')
        let hex = `#${((1 << 24) + (parseInt(rgba[0], 10) << 16) + (parseInt(rgba[1], 10) << 8) + parseInt(rgba[2], 10))
            .toString(16)
            .slice(1)}`

        // added alpha param if exists
        if (rgba[4]) {
            const alpha = Math.round(0.1 * 255)
            const hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase()
            hex += hexAlpha
        }

        return hex
    }

    return color
}