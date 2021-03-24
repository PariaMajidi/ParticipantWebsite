import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Layout from './Layout'
import { getFolderId } from '../redux/sounds'

import { fetchSounds, downloadFile } from '../utils/google'

import style from './FileList.module.scss'

const byName = (a, b) => {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

const FileList = () => {
  const [files, setFiles] = useState([])

  const [loading, setLoading] = useState(true)

  const folderId = useSelector(getFolderId) || localStorage.getItem('folderId')

  useEffect(() => {
    fetchSounds(folderId).then(newFiles => {
      const newFilesWithSound = []

      setLoading(false)

      newFiles.forEach(file => {
        downloadFile(file.id).then(base64 => {
          newFilesWithSound.push({
            ...file,
            dataUrl: `data:audio/wav;base64,${base64}`,
          })

          setFiles([...newFilesWithSound])
        })
      })
    })
  }, [])
  return (
    <Layout title='Sounds'>
      {loading ? <span className={style.loading}>loading</span> : null}
      {files.sort(byName).map(file => (
        <div className={style.sound} key={file.id}>
          <div className={style.name}>{file.name}</div>

          <audio controls src={file.dataUrl} type='audio/wav'>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      ))}
    </Layout>
  )
}

export default FileList
