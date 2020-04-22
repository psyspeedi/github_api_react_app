import React, {useContext} from 'react'
import {NavbarContext} from '../../context/navbar/navbarContext'
import {GithubContext} from '../../context/github/githubContext'


export const Alert = () => {
    const {alert} = useContext(NavbarContext)
    const {totalCount, defaultCountCardsInPage} = useContext(GithubContext)

    if (!alert) return null

    return (
        <div className={`alert alert-${alert.type || 'secondary'} alert-dismissible fade show`}>
            {alert.text}
        </div>
    )
}
