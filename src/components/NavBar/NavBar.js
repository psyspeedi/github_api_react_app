import React, {useContext, useState} from 'react'
import {NavbarContext} from '../../context/navbar/navbarContext'
import {GithubContext} from '../../context/github/githubContext'
import {Link, useHistory} from 'react-router-dom'
import {Loading} from '../../UI/Loading/Loading'

export const NavBar = () => {
    const { show, hide } = useContext(NavbarContext)
    const { getUsers } = useContext(GithubContext)
    const [ value, setValue ] = useState('')
    const [ error, setError ] = useState(true)
    const history = useHistory()

    const checkInput = (value) => {
        if (value.trim() === '' & value.length !== 0) {
            show('Введите ник пользователя', 'warning')
            setError(true)
        } else if (value.length >= 1) {
            hide()
            setError(false)
        } else {
            setError(false)
        }

    }

    const fetchUsers = () => {
        if (!error) {
            history.push('/search')
            getUsers(value.trim())
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary mb-3">
            <Link to='/search' className="navbar-brand text-white">Github Поиск</Link>
            <div className="collapse navbar-collapse">
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Поиск"
                    value={value}
                    onBlur={() => checkInput(value)}
                    onKeyPress={(event) => {
                        checkInput(value)
                        if(event.key !== 'Enter') {
                            return
                        }
                        fetchUsers()
                    }}
                    onChange={event => setValue(event.target.value)}
                />
                <button
                    onClick={() => {
                        checkInput(value)
                        fetchUsers()
                    }}
                    className="btn btn-light my-2 my-sm-0"
                    disabled={error ? 'disabled' : ''}
                >
                    Поиск
                </button>
            </div>
        </nav>

    )
}
