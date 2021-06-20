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
import VibrationReadyToContinue from './VibrationReadyToContinue'
import style from './VibrationDirection.module.scss'
import NotificationDifference from './NotificationDifference'

const VibrationDirection = () => {
  const history = useHistory()

  const { index } = useParams()

  const dispatch = useDispatch()
  const soundCount = useSelector(getSoundCount)

  const giveFeedback = signal => async () => {
    dispatch(setCurrentFeedback({ selectionTime: getTime(), signal }))
    await dispatch(sendFeedback())

    const newIndex = parseInt(index, 10) + 1

    if (newIndex > soundCount) {
      history.push(NotificationDifference.route)
    } else {
      history.push(VibrationReadyToContinue.route.replace(':index', newIndex))
    }
  }

  return (
    <Layout title='What did you feel?'>
      <div className={style.buttons}>
        <div className={style.column}>
          <Button className={style.button} onClick={giveFeedback('left')}>
            <i className='fas fa-arrow-left'></i>
          </Button>
          <div className={style.label}>Left</div>
        </div>
        <div className={style.column}>
          <Button className={style.button} onClick={giveFeedback('right')}>
            <i className='fas fa-arrow-right'></i>
          </Button>
          <div className={style.label}>Right</div>
        </div>
        <div className={style.column}>
          <Button
            className={style.button}
            onClick={giveFeedback('notification')}
          >
            <i className='fas fa-bell'></i>
          </Button>
          <div className={style.label}>Notification</div>
        </div>
      </div>
    </Layout>
  )
}

VibrationDirection.route = '/vibration/:index/direction'

export default VibrationDirection
