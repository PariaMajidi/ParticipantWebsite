import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import Layout from './Layout'
import { sendGlobalFeedback, setCurrentFeedback } from '../redux/sounds'
import style from './Confidence.module.scss'

const choices = [
  'Very confusing',
  'Confusing',
  'Neutral',
  'Clear',
  'Very clear',
]

const Confidence = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onClick = (choice, likertScaleIndex) => async () => {
    dispatch(setCurrentFeedback({ likertScale: likertScaleIndex + 1 }))
    await dispatch(sendGlobalFeedback())
    history.push(`/end`)
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

export default Confidence
