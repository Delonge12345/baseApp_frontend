import { useEffect, useState } from 'react'
import {debounce} from "../utils/debounce";


const useWindowSizes = () => {
    const [windowWidth, setWindowWidth] = useState(null)
    const [windowHeight, setWindowHeight] = useState(null)

    const monitoringDeviceWidth = debounce(() => {
        setWindowWidth(window.innerWidth)
    }, 70)

    const monitoringDeviceHeight = debounce(() => {
        setWindowHeight(window.innerHeight)
    }, 70)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        window.addEventListener('resize', monitoringDeviceWidth)

        return () => window.removeEventListener('resize', monitoringDeviceWidth)
    }, [])

    useEffect(() => {
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize', monitoringDeviceHeight)

        return () => window.removeEventListener('resize', monitoringDeviceHeight)
    }, [])

    return { windowWidth, windowHeight }
}

export default useWindowSizes
