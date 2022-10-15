interface User {
    email: string | null
    username: string | null,
    avatar: string | null
}

export interface IAuthState {
    isLoading: boolean;
    isAuth: boolean;
    user: User,
    avatar: string | null

}

export interface IUsersState {
    usersData: Array<User>,
    isLoading: boolean
}