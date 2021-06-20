import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import {
  sendGlobalFeedback,
  setCurrentFeedback,
  incrementGroup,
} from '../redux/sounds'
import style from './DirectionClarity.module.scss'

import EndMenu from './EndMenu'

const choices = [
  'Very confusing',
  'Confusing',
  'Neutral',
  'Clear',
  'Very clear',
]

const DirectionClarity = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onClick = (choice, likertScaleIndex) => async () => {
    const toUpdate = { directionClarityLikertScale: likertScaleIndex + 1 }
    dispatch(setCurrentFeedback(toUpdate))
    await dispatch(sendGlobalFeedback())
    await dispatch(incrementGroup())
    history.push(EndMenu.route)
  }

  return (
    <Layout title='How clearly did the vibrations show the direction?'>
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

DirectionClarity.route = '/directionClarity'

export default DirectionClarity
