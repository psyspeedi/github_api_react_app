import React from 'react'
import {NavBar} from '../components/NavBar/NavBar'
import {useRoutes} from '../router/routes'
import {Alert} from '../components/Alert/Alert'

export const Layout = () => {

    const routes = useRoutes()

    return (
        <div className='container'>
            <NavBar />
            <Alert />
            {routes}
        </div>
    )
}
