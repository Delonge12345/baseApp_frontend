export interface IUser {
    email: string | null
    username: string | null,
    avatar: string | null
}

export interface IAuthState {
    isLoading: boolean;
    isAuth: boolean;
    user: IUser,
    avatar: string | null

}

export interface IUsersState {
    usersData: Array<IUser>,
    isLoading: boolean
}