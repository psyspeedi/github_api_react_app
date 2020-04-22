import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GithubContext} from '../../context/github/githubContext'

export const UserCard = ({nick, avatar, url}) => {

    const {getUser} = useContext(GithubContext)

    return (
    <div className="card">
        <img src={avatar} className="card-img-top" alt={nick} />
        <div className="card-body">
            <h5 className="card-title">{nick}</h5>
            <Link to={`/detail/${nick}`} onClick={()=> getUser(nick)} className="btn btn-primary">Подробнее</Link>
        </div>
    </div>
)}


