import React from 'react'
import { useHistory } from 'react-router-dom'

import * as google from '../utils/google'

import Layout from './Layout'
import Button from './Button'

import ButtonList from './ButtonList'

const Menu = () => {
  const history = useHistory()

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
      </ButtonList>
    </Layout>
  )
}

export default Menu
