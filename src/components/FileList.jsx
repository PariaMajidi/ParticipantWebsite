import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import Layout from './Layout'
import { getFolderId } from '../redux/sounds'

import { fetchSounds, downloadFile } from '../utils/google'

import style from './FileList.module.scss'

// const toDataURL = url =>
//   fetch(url, {
//     mode: 'cors',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     },
//   })
//     .then(response => {
//       console.log('response', response)
//       return response.blob()
//     })
//     .then(
//       blob =>
//         new Promise((resolve, reject) => {
//           const reader = new FileReader()
//           reader.onloadend = () => resolve(reader.result)
//           reader.onerror = reject
//           reader.readAsDataURL(blob)
//         })
//     )

const FileList = () => {
  // const files = useRef([])
  // const [sounds, setSounds] = useState({})
  const [files, setFiles] = useState([])

  const [loading, setLoading] = useState(true)

  const folderId = localStorage.getItem('folderId')
  console.log('folderId', folderId)

  useEffect(() => {
    setTimeout(() => {
      fetchSounds(folderId).then(newFiles => {
        // const newFilesWithSound = [...newFiles]

        // const
        // files.current = newFiles
        // setFiles(files)

        const promises = newFiles.map(async file => {
          const base64 = await downloadFile(file.id)

          return {
            ...file,
            dataUrl: `data:audio/wav;base64,${base64}`,
          }
        })

        Promise.all(promises).then(filesWithDataUrl => {
          setLoading(false)
          setFiles(filesWithDataUrl)
        })

        // newFiles.forEach((file, index) => {
        //   downloadFile(file.id).then(base64 => {
        //     newFilesWithSound[index] = {
        //       ...file,
        //       dataUrl: `data:audio/wav;base64,${base64}`,
        //     }

        //     console.log('newFiles')

        //     setFiles(newFilesWithSound)
        //   })

        // toDataURL(file.webContentLink)
        //   .then(dataUrl => {
        //     console.log('dataUrl', dataUrl)
        //     newFilesWithSound[index] = {
        //       ...file,
        //       dataUrl,
        //     }

        //     setFiles(newFilesWithSound)
        //   })
        //   .catch(error => {
        //     console.log('error', error)
        //   })
        // })
      })
    }, 1000)
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
