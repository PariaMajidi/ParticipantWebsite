import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Layout from './Layout'
import Button from './Button'

import style from './Ready.module.scss'

import Game from './Game'

const VibrationReadyToContinue = () => {
  const history = useHistory()

  const { index } = useParams()

  return (
    <Layout title='Are you ready to continue?'>
      <Button
        className={style.button}
        onClick={() => history.push(Game.route.replace(':index', index))}
      >
        Yes
      </Button>
    </Layout>
  )
}

VibrationReadyToContinue.route = '/vibration/:index/ready'

export default VibrationReadyToContinue
