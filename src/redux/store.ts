import {configureStore} from "@reduxjs/toolkit";
import {fakeStoreAPI} from "../services/fakeStore";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [fakeStoreAPI.reducerPath]: fakeStoreAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(fakeStoreAPI.middleware),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
