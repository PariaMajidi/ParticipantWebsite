import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Layout from './Layout'
import { getFolderId } from '../redux/sounds'

import { fetchSounds } from '../utils/google'

import style from './FileList.module.scss'

const FileList = () => {
  const [files, setFiles] = useState([])

  const [loading, setLoading] = useState(true)

  const folderId = useSelector(getFolderId)

  useEffect(() => {
    fetchSounds(folderId).then(files => {
      setFiles(files)
      setLoading(false)
    })
  })

  return (
    <Layout title='Sounds'>
      {loading ? <span className={style.loading}>loading</span> : null}
      {files.map(file => (
        <div className={style.sound}>
          <div className={style.name}>{file.name}</div>

          <audio controls src={file.webContentLink} type='audio/wav'>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      ))}
    </Layout>
  )
}

export default FileList
