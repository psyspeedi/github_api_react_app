import React from 'react'
import {Layout} from './Layout/Layout'
import {BrowserRouter} from 'react-router-dom'
import {NavbarState} from './context/navbar/navbarState'
import {GithubState} from './context/github/githubState'


function App() {

  return (
      <GithubState>
          <NavbarState>
              <BrowserRouter>
                  <Layout/>
              </BrowserRouter>
          </NavbarState>
      </GithubState>
    )
}

export default App
