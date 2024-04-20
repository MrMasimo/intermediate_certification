import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {geocoderApi} from '../services/geocoder'
import {openWeatherMapApi} from "../services/openweathermap";
import {useDispatch} from "react-redux";
import pollutionsSlice from "./pollutionsSlice";

export const store = configureStore({
    reducer: {
        [geocoderApi.reducerPath]: geocoderApi.reducer,
        [openWeatherMapApi.reducerPath]: openWeatherMapApi.reducer,
        pollutions: pollutionsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(geocoderApi.middleware)
            .concat(openWeatherMapApi.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>
