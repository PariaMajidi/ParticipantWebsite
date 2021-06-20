import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import { setCurrentFeedback } from '../redux/sounds'
import style from './DirectionClarity.module.scss'

import DirectionClarity from './DirectionClarity'

const choices = [
  'Very confusing',
  'Confusing',
  'Neutral',
  'Clear',
  'Very clear',
]

const NotificationDifference = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onClick = (choice, likertScaleIndex) => async () => {
    const toUpdate = { notificationDifferenceLikertScale: likertScaleIndex + 1 }
    dispatch(setCurrentFeedback(toUpdate))
    history.push(DirectionClarity.route)
  }

  return (
    <Layout
      title='How clear was the difference between the notifications and directional signals?
    '
    >
      <div className={style.choices}>
        <div className={style.bar} />
        {choices.map((choice, index) => (
          <button
            className={style.choice}
            key={choice}
            onClick={onClick(choice, index)}
          >
            <div className={style.disk}></div>
            <div className={style.label}>{choice}</div>
          </button>
        ))}
      </div>
      <div className={style.buttons}>...</div>
    </Layout>
  )
}

NotificationDifference.route = '/notificationDifference'

export default NotificationDifference
