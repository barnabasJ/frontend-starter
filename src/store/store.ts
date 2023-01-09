import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counter from '@/counter/slice'
import { api } from '@/films/allFilms.generated'

export const createStore = () => configureStore({
  reducer: {
    counter,
    [api.reducerPath]: api.reducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)

})



export type Store = ReturnType<typeof createStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<Store['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = Store['dispatch']
