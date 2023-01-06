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



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof createStore>['dispatch']
