import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setCurrentFeedback } from '../redux/sounds'
import Layout from './Layout'
import Button from './Button'
import getTime from '../utils/date'

import style from './VibrationFeedback.module.scss'

const VibrationFeedback = () => {
  const history = useHistory()

  const { index } = useParams()

  const dispatch = useDispatch()

  const giveFeedback = direction => () => {
    dispatch(setCurrentFeedback({ selectionTime: getTime(), direction }))
    history.push(`/vibration/${index}/confidence`)
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
