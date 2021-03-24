import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import Layout from './Layout'
import Loader from './Loader'
import { getSound, setCurrentFeedback } from '../redux/sounds'
import getTime from '../utils/date'

import style from './Vibration.module.scss'

const Vibration = () => {
  const [countDown, setCountDown] = useState(3)
  const [isPlaying, play] = useState(false)
  const audio = useRef()

  const interval = useRef()
  const history = useHistory()

  const { index } = useParams()

  const sound = useSelector(getSound(parseInt(index, 10) - 1))

  const dispatch = useDispatch()

  useEffect(() => {
    if (!sound?.name) return

    audio.current = new Audio(sound?.url)

    audio.current.addEventListener('ended', event => {
      dispatch(
        setCurrentFeedback({
          vibration: sound?.name,
          endAudioTime: getTime(),
          index,
        })
      )
      history.push(`/vibration/${index}/feel`)
    })

    audio.current.addEventListener('error', event => {
      console.log('error')
    })

    interval.current = setTimeout(() => {
      if (countDown === 1) {
        clearInterval(interval.current)
        play(true)

        audio.current
          .play()
          .then(() => {})
          .catch(error => {
            console.log('error', error)
          })
      } else {
        setCountDown(countDown - 1)
      }
    }, 1000)

    return () => clearInterval(interval.current)
  }, [sound?.name, countDown])

  if (!sound) {
    return (
      <Layout title={`Vibration Number ${index}`}>
        <div className={style.countDown}>Oups sound doesn't exist</div>
      </Layout>
    )
  }

  return (
    <Layout title={`Vibration Number ${index}`}>
      <div className={style.countDown}>
        {isPlaying ? <Loader /> : countDown}
      </div>
    </Layout>
  )
}

export default Vibration
