import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import Button from './Button'

import style from './SetRepetitions.module.scss'

const SetRepetitions = () => {
  const [repetitions, setRepetitions] = useState(
    parseInt(localStorage.getItem('repetitions')) || 6
  )

  const history = useHistory()

  const onSubmit = event => {
    event.preventDefault()

    localStorage.setItem('repetitions', repetitions)
    history.push('/defineParticipant')
  }

  return (
    <Layout>
      <form onSubmit={onSubmit} className={style.form}>
        <input
          placeholder='Repetitions'
          type='number'
          defaultValue={repetitions || 0}
          className={style.input}
          onChange={e => setRepetitions(parseInt(e.target.value))}
        />
        <Button type='submit'>Select repetitions</Button>
      </form>
    </Layout>
  )
}

export default SetRepetitions
