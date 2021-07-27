import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Layout from './Layout'
import Button from './Button'
import ButtonList from './ButtonList'
import ConfirmGroup from './ConfirmGroup'

import { fetchSubFolders } from '../utils/google'
import { setGroup, getFolderId, getFeedback } from '../redux/sounds'
import { nothingFound } from '../utils/message'

const DefineGroup = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const folderId = useSelector(getFolderId)
  const { amplitude } = useSelector(getFeedback)

  const [subFolders, setSubFolders] = useState([])
  const [isFetching, setFetching] = useState(true)

  useEffect(() => {
    fetchSubFolders(folderId)
      .then(folders =>
        folders.filter(
          f => f.name !== 'Balancing' && f.name.includes(amplitude)
        )
      )
      .then(folders => {
        setSubFolders(folders)
        setFetching(false)
      })
  }, [folderId])

  return (
    <Layout>
      {isFetching ? 'Fetching...' : nothingFound(subFolders)}
      <ButtonList>
        {subFolders.map(subFolder => (
          <Button
            key={subFolder.id}
            onClick={() => {
              dispatch(setGroup(subFolder))
              history.push(ConfirmGroup.route)
            }}
          >
            {subFolder.name}
          </Button>
        ))}
      </ButtonList>
    </Layout>
  )
}

DefineGroup.route = '/defineGroup'

export default DefineGroup
