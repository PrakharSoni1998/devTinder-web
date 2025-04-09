import { configureStore } from "@reduxjs/toolkit"
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionsReducer from './conectionsSlice'
import connectionsRequestReducer from './connectionRequestSlice'

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections: connectionsReducer,
        requests : connectionsRequestReducer
    }
})

export default appStore