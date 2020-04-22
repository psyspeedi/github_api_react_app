import React, {useContext, useEffect} from 'react'
import {GithubContext} from '../../context/github/githubContext'
import {Redirect} from 'react-router'
import {Loading} from '../../UI/Loading/Loading'

export const DetailPage = (props) => {

    const {user, getUser, loading} = useContext(GithubContext)

    useEffect(() => {
        getUser(props.match.params.nick)
    }, [props.match.params.nick])

    return (
        <>
            {
                loading
                ?
                    <Loading />
                :
                user.login
                ?
                    <h1>{user.login}</h1>
                :
                    <h1>НЕ НАЙДЕНО</h1>
            }
        </>
    )
}