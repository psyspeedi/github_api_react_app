import React, {useContext, useEffect} from 'react'
import {UserCard} from '../../components/UserCard/UserCard'
import {GithubContext} from '../../context/github/githubContext'
import {Loading} from '../../UI/Loading/Loading'

export const SearchPage = () => {

    const {users, totalCount, defaultCountCardsInPage, getMoreUsers, page, loading} = useContext(GithubContext)


    return (
        <>
            {
                totalCount / defaultCountCardsInPage > 1
                ?
                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block mb-3"
                    onClick={() => getMoreUsers()}
                >
                    Показать следующие 6 найденных (не просмотрено {(totalCount - defaultCountCardsInPage * page) < 0 ? 0 : (totalCount - defaultCountCardsInPage * page)} из {totalCount})
                </button>
                :
                null
            }

            {
                loading
                ?
                <Loading />
                :
                <>
                    {
                        users.length
                        ?
                        <div className='row'>
                            {users.map((card) =>
                                <div className='col-sm-4 mb-4' key={card.node_id}>
                                    <UserCard
                                        nick={card.login}
                                        avatar={card.avatar_url}
                                        url={card.url}
                                    />
                                </div>
                            )}
                        </div>
                        :
                        <>
                            {
                                totalCount !== null && users.length === 0
                                ?
                                <h1 style={{textAlign: 'center'}}>НЕ НАЙДЕНО</h1>
                                :
                                <h1 style={{textAlign: 'center'}}>Ищите пользователей Github по нику</h1>
                            }
                        </>


                    }

                </>
            }
        </>
    )
}
