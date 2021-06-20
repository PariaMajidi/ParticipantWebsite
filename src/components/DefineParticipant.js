import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import Button from './Button'
import { setCurrentFeedback } from '../redux/sounds'

import style from './DefineParticipant.module.scss'

import DefineUnilateralBilateral from './DefineUnilateralBilateral'

const DefineParticipant = () => {
  const [participant, setParticipant] = useState('FOO')

  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = event => {
    event.preventDefault()

    dispatch(setCurrentFeedback({ participant }))
    history.push(DefineUnilateralBilateral.route)
  }

  return (
    <Layout>
      <form onSubmit={onSubmit} className={style.form}>
        <input
          placeholder='Participant id'
          type='text'
          className={style.input}
          defaultValue={participant}
          onChange={e => setParticipant(e.target.value)}
        />
        <Button type='submit' disabled={!participant}>
          Start
        </Button>
      </form>
    </Layout>
  )
}

export default DefineParticipant
