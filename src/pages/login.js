import { useHistory, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../auth'

import { Loader } from '../components/loader/loader'

export default function LoginPage () {
  let history = useHistory()
  let location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  let { from } = location.state || { from: { pathname: '/' } }
  const auth = useAuth()

  useEffect(() => {
    if (auth.isAutorised()) {
      history.replace(from)
    }
  })
  let login = (e) => {
    e.preventDefault()
    setLoading(true)
    auth.login(username, password).then(() => {
      history.replace(from)
      setLoading(false)
    }).catch(e => {
      setError('You login or password is incorrect')
      setLoading(false)
    })
    return false
  }

  return (
    <div className="content form">
      { /* Here is from path: */}
      <form onSubmit={login}>
        <p>You must log in to view the page <b>{from.pathname}</b></p>
        <input type="text" placeholder="login" onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <input type="password" placeholder="password" onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        {error && <div className="error">{error}</div>}
        {!loading ? <button>Log in</button> : <Loader text='Logging in...'/>}
      </form>
    </div>
  )
}