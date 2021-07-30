import React from 'react'
import { useHistory } from 'react-router-dom'
import { saveAs } from 'file-saver'

import * as google from '../utils/google'

import Layout from './Layout'
import Button from './Button'

import ButtonList from './ButtonList'

const Menu = () => {
  const history = useHistory()

  const download = () => {
    const logs = JSON.parse(localStorage.getItem('logs') || 'null') || []

    var blob = new Blob([logs.join(',\n')], {
      type: 'text/plain;charset=utf-8',
    })

    saveAs(blob, 'data.csv')
  }

  return (
    <Layout>
      <ButtonList>
        <Button.Link to='/select-folder'>Start</Button.Link>
        {/* <Button onClick={() => google.writeSheet()}>Test</Button> */}
        <Button
          onClick={() => {
            google.signOut()
            history.push('/')
          }}
        >
          Logout
        </Button>
        <Button onClick={download}>Download backup data</Button>
      </ButtonList>
    </Layout>
  )
}

export default Menu
