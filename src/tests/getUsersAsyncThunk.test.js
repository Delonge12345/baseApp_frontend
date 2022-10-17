// import {getUsers} from "../slices/desktopSlice";
//
// global.fetch = jest.fn();
//
// describe('getUsersThunk', () => {
//     it('should fetch with resolved response', async () => {
//         const mockUsers = [{
//             "user_id": 10,
//             "email": "lala",
//             "password": "lala",
//             "isactivated": false,
//             "activationlink": "lala",
//             "username": "Max",
//             "created_at": "2022-09-26T21:00:00.000Z",
//             "phone": "lala",
//             "avatar": ""
//         }]
//         // @ts-ignore
//         fetch.mockResolvedValue({
//             json: () => Promise.resolve(mockUsers)
//         })
//
//         const dispatch = jest.fn();
//         const thunk = getUsers()
//         // @ts-ignore
//         await thunk(dispatch)
//
//         const {calls} = dispatch.mock
//
//         const [start, end] = calls
//         // @ts-ignore
//         expect(start[0].type).toBe(getUsers.pending().type)
//         // @ts-ignore
//         expect(end[0].type).toBe(getUsers.fulfilled().type)
//         expect(end[0].type).toBe(mockUsers)
//     });
//
//     it('rejected response',  async() => {
//         const dispatch = jest.fn();
//         const thunk = getUsers()
//         // @ts-ignore
//         await thunk(dispatch)
//
//         const {calls} = dispatch.mock
//
//         const [start, end] = calls
//         // @ts-ignore
//         expect(start[0].type).toBe(getUsers.pending().type)
//         // @ts-ignore
//         expect(end[0].type).toBe(getUsers.rejected().type)
//         expect(end[0].meta.rejectedWithValue).toBe(true)
//
//
//     });
//
// });