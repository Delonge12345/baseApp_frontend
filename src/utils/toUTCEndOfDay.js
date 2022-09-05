export function toUTCEndOfDay(m) {
    const utcM = m.clone()
    const offset = utcM.utcOffset() * 60 * 1000

    return utcM.endOf('day').valueOf() + offset
}