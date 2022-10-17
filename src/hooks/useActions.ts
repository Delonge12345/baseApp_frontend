import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as auth } from '../slices/authSlice'
import { actions as desktop } from '../slices/desktopSlice'
const actions = {
    ...auth,
    ...desktop
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}