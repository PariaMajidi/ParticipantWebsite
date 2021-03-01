import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import Layout from './Layout'
import { getFolderId } from '../redux/sounds'

import { fetchSounds, downloadFile } from '../utils/google'

import style from './FileList.module.scss'

const FileList = () => {
  // const files = useRef([])
  // const [sounds, setSounds] = useState({})
  const [files, setFiles] = useState([])

  const [loading, setLoading] = useState(true)

  const folderId = localStorage.getItem('folderId')
  console.log('folderId', folderId)

  useEffect(() => {
    fetchSounds(folderId).then(newFiles => {
      const newFilesWithSound = []

      setLoading(false)

      for (const index in newFiles) {
        const file = newFiles[index]
        console.log('file')
        downloadFile(file.id).then(base64 => {
          newFilesWithSound.push({
            ...file,
            dataUrl: `data:audio/wav;base64,${base64}`,
          })

          console.log('newFiles')

          setFiles([...newFilesWithSound])
        })
      }

      newFiles.forEach(file => {
        console.log('file')
        downloadFile(file.id).then(base64 => {
          newFilesWithSound.push({
            ...file,
            dataUrl: `data:audio/wav;base64,${base64}`,
          })

          console.log('newFiles')

          setFiles([...newFilesWithSound])
        })
      })
    })
  }, [])
  return (
    <Layout title='Sounds'>
      {loading ? <span className={style.loading}>loading</span> : null}
      {files.map(file => (
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
