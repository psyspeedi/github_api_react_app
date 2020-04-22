import React from 'react'
import {Route, Switch, Redirect} from 'react-router'
import {DetailPage} from '../pages/detailPage/detailPage'
import {SearchPage} from '../pages/searchPage/searchPage'

export const useRoutes = () => {
    return (
        <Switch>
            <Route path='/search' exact component={SearchPage} />
            <Route path='/detail/:nick' component={DetailPage} />
            <Redirect to='/search'/>
        </Switch>
    )
}