import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import Button from './Button'
import { setCurrentFeedback, getFolderId } from '../redux/sounds'
import { fetchSubFolders, fetchSounds } from '../utils/google'

import style from './FindAmplitude.module.scss'
import byName from '../utils/sortByName'

import DefineUnilateralBilateral from './DefineUnilateralBilateral'

const FindAmplitude = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [isFetching, setFetching] = useState(true)
  const [files, setFiles] = useState([])

  const folderId = useSelector(getFolderId)

  useEffect(() => {
    fetchSubFolders(folderId)
      .then(folders => folders.find(f => f.name === 'Balancing'))
      .then(folder => {
        console.log('folder', folder)
        return fetchSounds(folder.id)
      })
      .then(files => {
        console.log('files', files)
        setFiles(files)
        setFetching(false)
      })
  }, [])

  const onClick = amplitude => event => {
    event.preventDefault()

    dispatch(setCurrentFeedback({ amplitude }))
    history.push(DefineUnilateralBilateral.route)
  }

  return (
    <Layout>
      <div className={style.detected}>{isFetching ? 'Fetching...' : ''}</div>
      {files.sort(byName).map(file => (
        <div className={style.sound} key={file.id}>
          <audio controls src={file.webContentLink} type='audio/wav'>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <Button
            className={style.button}
            type='submit'
            onClick={onClick(file.name.replace('V.wav', ''))}
          >
            {file.name.replace('.wav', '')}
          </Button>
        </div>
      ))}
    </Layout>
  )
}

FindAmplitude.route = '/findAmplitude'

export default FindAmplitude
