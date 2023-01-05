import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counter from '../counter/slice'
import { api } from '../films/allFilms.generated'

export const store = configureStore({
  reducer: {
    counter,
    [api.reducerPath]: api.reducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)

})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
