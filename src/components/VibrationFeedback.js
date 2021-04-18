import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  setCurrentFeedback,
  sendFeedback,
  getSoundCount,
} from '../redux/sounds'
import Layout from './Layout'
import Button from './Button'
import getTime from '../utils/date'

import style from './VibrationFeedback.module.scss'

const VibrationFeedback = () => {
  const history = useHistory()

  const { index } = useParams()

  const dispatch = useDispatch()
  const soundCount = useSelector(getSoundCount)

  const giveFeedback = direction => async () => {
    dispatch(setCurrentFeedback({ selectionTime: getTime(), direction }))
    await dispatch(sendFeedback())

    const newIndex = parseInt(index, 10) + 1

    if (newIndex > soundCount) {
      history.push(`/confidence`)
      history.push(`/confidence`)
    } else {
      history.push(`/vibration/${newIndex}`)
    }
  }

  return (
    <Layout title='What direction did you feel?'>
      <div className={style.buttons}>
        <div className={style.left}>
          <Button className={style.button} onClick={giveFeedback('left')}>
            <i className='fas fa-arrow-left'></i>
          </Button>
          <div className={style.label}>Left</div>
        </div>
        <div className={style.right}>
          <Button className={style.button} onClick={giveFeedback('right')}>
            <i className='fas fa-arrow-right'></i>
          </Button>
          <div className={style.label}>Right</div>
        </div>
      </div>
    </Layout>
  )
}

export default VibrationFeedback
