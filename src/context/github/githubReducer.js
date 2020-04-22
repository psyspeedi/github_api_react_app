import {GET_USER, GET_USERS, RESET_USERS, SET_LOADING, GET_MORE_USERS} from '../types'

const handlers = {
    [GET_USERS]: (state, {payload}) => ({ ...state, users: payload.users, searchValue: payload.searchValue, totalCount: payload.totalCount, page: 1, loading: false }),
    [GET_MORE_USERS]: (state, {payload}) => ({...state, users: payload.users, page: payload.page, loading: false}),
    [GET_USER]: (state, {payload}) => ({...state, user: payload, loading: false}),
    [SET_LOADING]: state => ({...state, loading: true}),
    [RESET_USERS]: state => ({...state, users: []}),
    DEFAULT: state => state
}

export const githubReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}