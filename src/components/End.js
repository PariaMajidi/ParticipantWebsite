import React from 'react'

import Layout from './Layout'
import ButtonList from './ButtonList'
import Button from './Button'

const End = () => (
  <Layout
    title='Please raise your hand to the window and wait until the moderator come to
  the room. Thanks for your participation'
  >
    <ButtonList>
      <Button.Link to='/menu'>Menu</Button.Link>
      <Button.Link to='/start'>New Participant</Button.Link>
    </ButtonList>
  </Layout>
)

export default End
