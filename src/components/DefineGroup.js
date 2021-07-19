import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Layout from './Layout'
import Button from './Button'
import ButtonList from './ButtonList'
import ConfirmGroup from './ConfirmGroup'

import { fetchSubFolders } from '../utils/google'
import { setGroup, getFolderId } from '../redux/sounds'

const DefineGroup = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const folderId = useSelector(getFolderId)

  const [subFolders, setSubFolders] = useState([])
  const [isFetching, setFetching] = useState(true)

  useEffect(() => {
    fetchSubFolders(folderId)
      .then(folders => folders.filter(f => f.name !== 'Balancing'))
      .then(folders => {
        setSubFolders(folders)
        setFetching(false)
      })
  }, [folderId])

  return (
    <Layout>
      {isFetching ? 'Fetching...' : ''}
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
