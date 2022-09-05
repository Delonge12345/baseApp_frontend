export function toUTCStartOfDay(m) {
    const utcM = m.clone()
    const offset = utcM.utcOffset() * 60 * 1000

    return utcM.startOf('day').valueOf() + offset
}