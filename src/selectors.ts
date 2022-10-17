import { RootState } from './store/rootReducer'

export const selectAuth = (state: RootState) => state.auth
export const selectDesktop = (state: RootState) => state.desktop