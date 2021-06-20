import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Layout from './Layout'
import Button from './Button'

import { fetchSounds, fetchDatabase } from '../utils/google'
import { getFolderId, setDatabase, setSounds, getGroup } from '../redux/sounds'
import shuffle from '../utils/shuffle'
import createPool from '../utils/pool'

import style from './ConfirmGroup.module.scss'
import byName from '../utils/sortByName'

const ConfirmGroup = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const folderId = useSelector(getFolderId)
  const group = useSelector(getGroup)

  const [files, setFiles] = useState([])
  const [isFetching, setFetching] = useState(true)

  const repetitions = parseInt(localStorage.getItem('repetitions'))

  useEffect(() => {
    fetchSounds(group.id).then(files => {
      setFiles(files)
      setFetching(false)
    })

    fetchDatabase(folderId).then(database => {
      dispatch(setDatabase(database))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId, group?.id])

  const onConfirm = event => {
    event.preventDefault()

    const pool = createPool(files, repetitions)

    dispatch(setSounds(shuffle(pool)))
    history.push('/ready')
  }

  return (
    <Layout>
      <div className={style.detected}>
        {isFetching
          ? 'Fetching...'
          : `${files.length} sounds detected x ${repetitions} repetitions`}
      </div>
      {files.sort(byName).map(file => (
        <div className={style.sound} key={file.id}>
          <div className={style.name}>{file.name}</div>

          <audio controls src={file.webContentLink} type='audio/wav'>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      ))}

      <Button onClick={onConfirm}>Start</Button>
    </Layout>
  )
}

ConfirmGroup.route = '/confirmGroup'

export default ConfirmGroup
