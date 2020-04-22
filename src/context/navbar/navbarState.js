import React, {useReducer} from 'react'
import {NavbarContext} from './navbarContext'
import {navbarReducer} from './navbarReducer'
import {
    DISABLED_BUTTON,
    ENABLED_BUTTON,
    HIDE_ALERT,
    SHOW_ALERT
} from '../types'

export const NavbarState = ({children}) => {
    const initialState = {
        alert: null,
        button: 'disabled'
    }

    const [state, dispatch] = useReducer(navbarReducer, initialState)

    const hide = () => dispatch({type: HIDE_ALERT, payload: { ...state, alert: null }})

    const show = (text, type) => dispatch({type: SHOW_ALERT, payload: {...state, alert: {text, type}}})

    const enable = () => dispatch({type: ENABLED_BUTTON, payload: {...state, button: ''}})

    const disable = () => dispatch({type: DISABLED_BUTTON, payload: {...state, button: 'disabled'} })

    return (
        <NavbarContext.Provider value={{
            hide, show, enable, disable, alert: state.alert, button: state.button
        }}>
            {children}
        </NavbarContext.Provider>
    )
}
