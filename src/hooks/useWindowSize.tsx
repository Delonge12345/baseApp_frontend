import { useEffect, useState } from 'react'
import {debounce} from "../utils/debounce";


const useWindowSizes = () => {
    const [windowWidth, setWindowWidth] = useState(null)
    const [windowHeight, setWindowHeight] = useState(null)

    const monitoringDeviceWidth = debounce(() => {
        // @ts-ignore
        setWindowWidth(window.innerWidth)
    }, 70)

    const monitoringDeviceHeight = debounce(() => {
        // @ts-ignore
        setWindowHeight(window.innerHeight)
    }, 70)

    useEffect(() => {
        // @ts-ignore
        setWindowWidth(window.innerWidth)
        window.addEventListener('resize', monitoringDeviceWidth)

        return () => window.removeEventListener('resize', monitoringDeviceWidth)
    }, [])

    useEffect(() => {
        // @ts-ignore
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize', monitoringDeviceHeight)

        return () => window.removeEventListener('resize', monitoringDeviceHeight)
    }, [])

    return { windowWidth, windowHeight }
}

export default useWindowSizes
