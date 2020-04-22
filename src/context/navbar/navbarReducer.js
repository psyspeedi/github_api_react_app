import {DISABLED_BUTTON, ENABLED_BUTTON, HIDE_ALERT, SHOW_ALERT} from '../types'

const handlers = {
    [SHOW_ALERT]: (state, action) => action.payload,
    [HIDE_ALERT]: (state, action) => action.payload,
    [DISABLED_BUTTON]: (state, action) => action.payload,
    [ENABLED_BUTTON]: (state, action) => action.payload,
    DEFAULT: state => state
}

export const navbarReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
