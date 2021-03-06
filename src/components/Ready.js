import React from 'react'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import Button from './Button'

import style from './Ready.module.scss'

import Game from './Game'

const Ready = () => {
  const history = useHistory()

  const start = () => history.push(Game.route.replace(':index', 1))

  return (
    <Layout title='Are you ready?'>
      <Button className={style.button} onClick={start}>
        Yes
      </Button>
    </Layout>
  )
}

export default Ready
