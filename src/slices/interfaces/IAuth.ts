interface User {
    email: string | null
}

export interface IAuthState {
    isLoading: boolean;
    isAuth: boolean;
    user: User,
    avatar:string

}

export interface IUsersState {
    usersData: Array<User>,
    isLoading: boolean
}