import React, {useReducer} from 'react'
import {GithubContext} from './githubContext'
import {githubReducer} from './githubReducer'
import axios from 'axios'
import {GET_MORE_USERS, GET_REPOS, GET_USER, GET_USERS, RESET_USERS, SET_LOADING} from '../types'

export const GithubState = ({children}) => {
    const initialState = {
        user: {},
        users: [],
        loading: false,
        repos: [],
        totalCount: null,
        searchValue: null,
        page: 1,
        defaultCountCardsInPage: 6
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
    const authParams = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

    const setLoading = () => dispatch({type: SET_LOADING})

    const resetUsers = () => dispatch({type: RESET_USERS})

    const getUsers = async name => {
        setLoading()
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${name}&per_page=${state.defaultCountCardsInPage}&page=1&${authParams}`)
            dispatch({type: GET_USERS, payload: { users: [...response.data.items], searchValue: name, totalCount: response.data.total_count }})
        } catch (e) {
            throw new Error(e)
        }
    }

    const getMoreUsers = async () => {
        setLoading()
        resetUsers()
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${state.searchValue}&per_page=${state.defaultCountCardsInPage}&page=${state.page + 1}&${authParams}`)
            dispatch({type: GET_MORE_USERS, payload: { ...state, users: [...response.data.items], page: state.page + 1 }})
        } catch (e) {
            throw new Error(e)
        }
    }

    const getUser = async name => {
        try {
            setLoading()
            const response = await axios.get(`https://api.github.com/users/${name}?${authParams}`)
            dispatch({type: GET_USER, payload: {...response.data} })
        } catch (e) {
            if (e.response.status === 404) {
                return dispatch({type: GET_USER, payload: { ...state, user: {}}})
            }
            throw new Error(e.response.statusText)
        }
    }

    const getRepos = async name => {
        setLoading()
        try {
            const response = await axios.get(`https://api.github.com/users/${name}/repos?${authParams}`)
            dispatch({type: GET_REPOS, payload: { ...state, repos: [...response], loading: false }})
        } catch (e) {
            throw new Error(e)
        }
    }

    return (
        <GithubContext.Provider value={{
            getUsers,
            totalCount: state.totalCount,
            defaultCountCardsInPage: state.defaultCountCardsInPage,
            getRepos,
            getUser,
            getMoreUsers,
            setLoading,
            resetUsers,
            loading: state.loading,
            page: state.page,
            users: state.users,
            user: state.user
        }}>
            {children}
        </GithubContext.Provider>
    )
}