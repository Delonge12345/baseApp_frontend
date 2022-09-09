import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as auth } from '../slices/authSlice'

const actions = {
    ...auth,
}

export const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(actions, dispatch)
}