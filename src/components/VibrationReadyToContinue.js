import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Layout from './Layout'
import Button from './Button'

import style from './Ready.module.scss'

import Game from './Game'

const VibrationReadyToContinue = () => {
  const history = useHistory()

  const { index } = useParams()

  const [seconds, setSeconds] = useState(2)

  useEffect(() => {
    let tempSeconds = seconds
    const interval = setInterval(() => {
      tempSeconds -= 1
      setSeconds(tempSeconds)

      if (tempSeconds === 0) {
        history.push(Game.route.replace(':index', index))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <Layout title='Game will restart in'>{seconds}s</Layout>
}

VibrationReadyToContinue.route = '/vibration/:index/ready'

export default VibrationReadyToContinue
