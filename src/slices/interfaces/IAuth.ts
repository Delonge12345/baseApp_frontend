interface User {
    email: string | null
}

export interface IAuthState {
    isLoading: boolean;
    isAuth: boolean;
    user: User,

}